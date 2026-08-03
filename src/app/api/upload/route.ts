import { NextRequest, NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"
import { uploadImage, uploadTimetableImage } from "@/lib/storage"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_SIZE = 5 * 1024 * 1024
const ALLOWED_CATEGORIES = [
  "timetable",
  "curriculum",
  "curriculum-middle",
  "curriculum-high",
]

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

    /**
     * 관리자 커리큘럼 페이지는 "curriculum-middle"/"curriculum-high"로 업로드하는데
     * 여기서는 "curriculum"만 허용하고 있어 커리큘럼 업로드가 전부 400으로 거절됐다.
     * 관리자 화면이 실제로 쓰는 카테고리를 허용한다.
     */
    if (!category || !ALLOWED_CATEGORIES.includes(category)) {
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
