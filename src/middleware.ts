import { NextRequest, NextResponse } from "next/server"

const COOKIE_NAME = "slabel-admin-token"
const TOKEN_MAX_AGE = 60 * 60 * 24

function hexToUint8Array(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16)
  }
  return bytes
}

async function verifyTokenEdge(token: string): Promise<boolean> {
  try {
    const secret = process.env.ADMIN_SECRET
    if (!secret) return false

    const decoded = atob(token)
    const parts = decoded.split(":")
    if (parts.length < 3) return false

    const signature = parts.pop()!
    const payload = parts.join(":")

    const encoder = new TextEncoder()
    const keyData = encoder.encode(secret)
    const messageData = encoder.encode(payload)

    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    )

    const sigBytes = hexToUint8Array(signature)
    const isValid = await crypto.subtle.verify(
      "HMAC",
      cryptoKey,
      sigBytes.buffer as ArrayBuffer,
      messageData
    )

    if (!isValid) return false

    const timestamp = parseInt(parts[1], 10)
    const elapsed = (Date.now() - timestamp) / 1000
    return elapsed < TOKEN_MAX_AGE
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  const valid = await verifyTokenEdge(token)
  if (!valid) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/((?!login).*)"],
}
