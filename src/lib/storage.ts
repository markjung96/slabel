import fs from "fs/promises"
import path from "path"

const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "uploads")

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

const VALID_GRADES = ["middle1", "middle2", "middle3", "high1", "high2", "high3"]

function validateGrade(grade: string) {
  if (!VALID_GRADES.includes(grade)) {
    throw new Error("Invalid grade value")
  }
}

export async function uploadImage(
  buffer: Buffer,
  category: string,
  filename: string
): Promise<string> {
  const dir = path.join(UPLOAD_DIR, category)
  assertWithinUploadDir(dir)
  await ensureDir(dir)

  const ext = path.extname(filename)
  const safeName = `${Date.now()}${ext}`
  const filePath = path.join(dir, safeName)
  assertWithinUploadDir(filePath)

  await fs.writeFile(filePath, buffer)

  return `/images/uploads/${category}/${safeName}`
}

export async function deleteImage(imagePath: string): Promise<void> {
  const fullPath = path.resolve(process.cwd(), "public", imagePath)
  assertWithinUploadDir(fullPath)
  await fs.unlink(fullPath).catch(() => {})
}

export async function listImages(category: string): Promise<string[]> {
  const dir = path.join(UPLOAD_DIR, category)
  assertWithinUploadDir(dir)
  await ensureDir(dir)

  const files = await fs.readdir(dir)
  const imageExtensions = [".jpg", ".jpeg", ".png", ".webp"]

  return files
    .filter((f) => imageExtensions.includes(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => `/images/uploads/${category}/${f}`)
}

export async function getImageForGrade(grade: string): Promise<string | null> {
  validateGrade(grade)
  const dir = path.join(UPLOAD_DIR, "timetable")
  assertWithinUploadDir(dir)
  await ensureDir(dir)

  const files = await fs.readdir(dir)
  const match = files.find((f) => f.startsWith(`${grade}-`) || f.startsWith(`${grade}.`))

  return match ? `/images/uploads/timetable/${match}` : null
}

export async function uploadTimetableImage(
  buffer: Buffer,
  grade: string,
  filename: string
): Promise<string> {
  validateGrade(grade)
  const dir = path.join(UPLOAD_DIR, "timetable")
  assertWithinUploadDir(dir)
  await ensureDir(dir)

  const files = await fs.readdir(dir)
  for (const f of files) {
    if (f.startsWith(`${grade}-`) || f.startsWith(`${grade}.`)) {
      await fs.unlink(path.join(dir, f)).catch(() => {})
    }
  }

  const ext = path.extname(filename)
  const safeName = `${grade}-${Date.now()}${ext}`
  const filePath = path.join(dir, safeName)
  assertWithinUploadDir(filePath)

  await fs.writeFile(filePath, buffer)

  return `/images/uploads/timetable/${safeName}`
}
