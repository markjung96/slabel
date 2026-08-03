import fs from "fs/promises"
import path from "path"
import { put, del, list } from "@vercel/blob"

/**
 * 이미지 저장소.
 *
 * 기존에는 public/images/uploads/ 아래 파일시스템에만 저장했는데,
 * Vercel은 파일시스템이 읽기 전용이고 배포할 때마다 초기화된다.
 * 즉 프로덕션에서는 업로드가 실패하거나, 성공해도 다음 배포에 사라졌다.
 *
 * BLOB_READ_WRITE_TOKEN이 있으면 Vercel Blob을,
 * 없으면 로컬 파일시스템을 쓴다. 로컬 개발은 토큰 없이도 그대로 동작한다.
 */
const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN)

const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "uploads")
/** Blob 안에서 이미지들이 사는 접두사 */
const BLOB_PREFIX = "uploads"

const VALID_GRADES = ["middle1", "middle2", "middle3", "high1", "high2", "high3"]
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"]

function validateGrade(grade: string) {
  if (!VALID_GRADES.includes(grade)) {
    throw new Error("Invalid grade value")
  }
}

/** category가 경로를 벗어나지 못하게 막는다 */
function validateCategory(category: string) {
  if (!/^[a-z0-9-]+$/.test(category)) {
    throw new Error("Invalid category value")
  }
}

function safeExtension(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  return IMAGE_EXTENSIONS.includes(ext) ? ext : ".jpg"
}

// ── 로컬 파일시스템 ────────────────────────────────────────────────

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true })
}

function assertWithinUploadDir(fullPath: string) {
  const resolved = path.resolve(fullPath)
  const base = path.resolve(UPLOAD_DIR)
  if (!resolved.startsWith(base + path.sep) && resolved !== base) {
    throw new Error("Path traversal attempt detected")
  }
}

// ── 공개 API ──────────────────────────────────────────────────────

export async function uploadImage(
  buffer: Buffer,
  category: string,
  filename: string
): Promise<string> {
  validateCategory(category)
  const name = `${Date.now()}${safeExtension(filename)}`

  if (useBlob) {
    const blob = await put(`${BLOB_PREFIX}/${category}/${name}`, buffer, {
      access: "public",
      addRandomSuffix: false,
    })
    return blob.url
  }

  const dir = path.join(UPLOAD_DIR, category)
  assertWithinUploadDir(dir)
  await ensureDir(dir)

  const filePath = path.join(dir, name)
  assertWithinUploadDir(filePath)
  await fs.writeFile(filePath, buffer)

  return `/images/uploads/${category}/${name}`
}

export async function deleteImage(imagePath: string): Promise<void> {
  if (useBlob) {
    /* Blob은 전체 URL로 삭제한다 */
    await del(imagePath).catch(() => {})
    return
  }

  const fullPath = path.resolve(process.cwd(), "public", imagePath.replace(/^\//, ""))
  assertWithinUploadDir(fullPath)
  await fs.unlink(fullPath).catch(() => {})
}

export async function listImages(category: string): Promise<string[]> {
  validateCategory(category)

  if (useBlob) {
    const { blobs } = await list({ prefix: `${BLOB_PREFIX}/${category}/` })
    return blobs
      .filter((b) => IMAGE_EXTENSIONS.includes(path.extname(b.pathname).toLowerCase()))
      .sort((a, b) => a.pathname.localeCompare(b.pathname))
      .map((b) => b.url)
  }

  const dir = path.join(UPLOAD_DIR, category)
  assertWithinUploadDir(dir)
  await ensureDir(dir)

  const files = await fs.readdir(dir)
  return files
    .filter((f) => IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => `/images/uploads/${category}/${f}`)
}

export async function uploadTimetableImage(
  buffer: Buffer,
  grade: string,
  filename: string
): Promise<string> {
  validateGrade(grade)
  const name = `${grade}-${Date.now()}${safeExtension(filename)}`

  if (useBlob) {
    /* 같은 학년의 이전 시간표는 지운다 (학년당 1장 유지) */
    const { blobs } = await list({ prefix: `${BLOB_PREFIX}/timetable/${grade}-` })
    await Promise.all(blobs.map((b) => del(b.url).catch(() => {})))

    const blob = await put(`${BLOB_PREFIX}/timetable/${name}`, buffer, {
      access: "public",
      addRandomSuffix: false,
    })
    return blob.url
  }

  const dir = path.join(UPLOAD_DIR, "timetable")
  assertWithinUploadDir(dir)
  await ensureDir(dir)

  const files = await fs.readdir(dir)
  for (const f of files) {
    if (f.startsWith(`${grade}-`) || f.startsWith(`${grade}.`)) {
      await fs.unlink(path.join(dir, f)).catch(() => {})
    }
  }

  const filePath = path.join(dir, name)
  assertWithinUploadDir(filePath)
  await fs.writeFile(filePath, buffer)

  return `/images/uploads/timetable/${name}`
}

export async function getImageForGrade(grade: string): Promise<string | null> {
  validateGrade(grade)

  if (useBlob) {
    const { blobs } = await list({ prefix: `${BLOB_PREFIX}/timetable/${grade}-` })
    return blobs[0]?.url ?? null
  }

  const dir = path.join(UPLOAD_DIR, "timetable")
  assertWithinUploadDir(dir)
  await ensureDir(dir)

  const files = await fs.readdir(dir)
  const match = files.find((f) => f.startsWith(`${grade}-`) || f.startsWith(`${grade}.`))

  return match ? `/images/uploads/timetable/${match}` : null
}

/** 관리자 화면에서 현재 어떤 저장소를 쓰는지 보여주기 위한 값 */
export function storageMode(): "blob" | "local" {
  return useBlob ? "blob" : "local"
}
