import { NextRequest, NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"
import { uploadImage, uploadTimetableImage } from "@/lib/storage"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_SIZE = 5 * 1024 * 1024

export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ success: false, error: "인증이 필요합니다." }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const category = formData.get("category") as string | null
    const grade = formData.get("grade") as string | null

    if (!file) {
      return NextResponse.json({ success: false, error: "파일이 없습니다." }, { status: 400 })
    }

    if (!category || !["timetable", "curriculum"].includes(category)) {
      return NextResponse.json({ success: false, error: "올바른 카테고리가 아닙니다." }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "JPG, PNG, WebP 형식만 업로드 가능합니다." },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "파일 크기는 5MB 이하여야 합니다." },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    let url: string
    if (category === "timetable" && grade) {
      url = await uploadTimetableImage(buffer, grade, file.name)
    } else {
      url = await uploadImage(buffer, category, file.name)
    }

    return NextResponse.json({ success: true, url })
  } catch {
    return NextResponse.json(
      { success: false, error: "업로드 중 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}
