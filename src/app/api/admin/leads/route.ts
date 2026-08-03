import { NextRequest, NextResponse } from "next/server"

import { isAuthenticated } from "@/lib/auth"
import { deleteLead } from "@/lib/leads"

/**
 * 상담 신청 파기.
 * 개인정보처리방침에 "6개월이 지나면 파기"라고 고지했으므로
 * 실제로 지울 수 있는 수단이 있어야 한다.
 */
export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { success: false, error: "인증이 필요합니다." },
      { status: 401 }
    )
  }

  const id = new URL(request.url).searchParams.get("id")
  if (!id) {
    return NextResponse.json(
      { success: false, error: "id가 필요합니다." },
      { status: 400 }
    )
  }

  try {
    await deleteLead(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, error: "파기 중 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}
