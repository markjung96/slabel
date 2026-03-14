import { NextRequest, NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"
import { listImages, deleteImage } from "@/lib/storage"

export async function GET(request: NextRequest) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ success: false, error: "인증이 필요합니다." }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")

  if (!category) {
    return NextResponse.json({ success: false, error: "카테고리가 필요합니다." }, { status: 400 })
  }

  const images = await listImages(category)
  return NextResponse.json({ success: true, images })
}

export async function DELETE(request: NextRequest) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ success: false, error: "인증이 필요합니다." }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const imagePath = searchParams.get("path")

  if (!imagePath) {
    return NextResponse.json({ success: false, error: "경로가 필요합니다." }, { status: 400 })
  }

  await deleteImage(imagePath)
  return NextResponse.json({ success: true })
}
