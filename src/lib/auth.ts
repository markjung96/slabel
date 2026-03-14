import { cookies } from "next/headers"
import crypto from "crypto"

const COOKIE_NAME = "slabel-admin-token"
const TOKEN_MAX_AGE = 60 * 60 * 24 // 24 hours

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET
  if (!secret) throw new Error("ADMIN_SECRET environment variable is not set")
  return secret
}

function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD
  if (!password) throw new Error("ADMIN_PASSWORD environment variable is not set")
  return password
}

function safeCompare(a: string, b: string): boolean {
  const aBuf = Buffer.from(a, "utf8")
  const bBuf = Buffer.from(b, "utf8")
  if (aBuf.length !== bBuf.length) {
    crypto.timingSafeEqual(aBuf, aBuf)
    return false
  }
  return crypto.timingSafeEqual(aBuf, bBuf)
}

function createToken(): string {
  const payload = `admin:${Date.now()}`
  const hmac = crypto.createHmac("sha256", getSecret())
  hmac.update(payload)
  const signature = hmac.digest("hex")
  return Buffer.from(`${payload}:${signature}`).toString("base64")
}

function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8")
    const parts = decoded.split(":")
    if (parts.length < 3) return false

    const signature = parts.pop()!
    const payload = parts.join(":")

    const hmac = crypto.createHmac("sha256", getSecret())
    hmac.update(payload)
    const expectedSignature = hmac.digest("hex")

    if (!safeCompare(signature, expectedSignature)) return false

    const timestamp = parseInt(parts[1], 10)
    const elapsed = (Date.now() - timestamp) / 1000
    return elapsed < TOKEN_MAX_AGE
  } catch {
    return false
  }
}

export async function login(password: string): Promise<boolean> {
  if (!safeCompare(password, getAdminPassword())) return false

  const token = createToken()
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: TOKEN_MAX_AGE,
    path: "/",
  })

  return true
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return false
  return verifyToken(token)
}

export function verifyTokenFromHeader(authCookie: string | undefined): boolean {
  if (!authCookie) return false
  return verifyToken(authCookie)
}
