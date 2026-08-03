import { NextRequest, NextResponse } from "next/server"

import { consultationSchema } from "@/lib/validators"
import { sendConsultationEmail } from "@/lib/email"
import { saveLead } from "@/lib/leads"
import type { ConsultationFormData } from "@/types"

const rateLimitMap = new Map<string, number[]>()

const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 3

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }
  return request.headers.get("x-real-ip") ?? "unknown"
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = rateLimitMap.get(ip) ?? []
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }
  recent.push(now)
  rateLimitMap.set(ip, recent)
  return false
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (body._honey) {
      return NextResponse.json({ success: true, message: "상담 신청이 완료되었습니다." })
    }

    const ip = getClientIp(request)
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." },
        { status: 429 }
      )
    }

    const result = consultationSchema.safeParse(body)
    if (!result.success) {
      const firstIssue = result.error.issues[0]
      return NextResponse.json(
        { success: false, error: firstIssue?.message ?? "입력값을 확인해주세요." },
        { status: 400 }
      )
    }

    const data: ConsultationFormData = {
      type: result.data.type,
      name: result.data.name,
      phone: result.data.phone,
      grade: result.data.grade,
      subject: result.data.subject,
      school: result.data.school ?? "",
      content: result.data.content ?? "",
      referral: result.data.referral ?? "",
      privacyConsent: result.data.privacyConsent,
    }

    /*
     * 순서가 중요하다. 메일보다 저장이 먼저다.
     * 메일 발송은 언제든 실패할 수 있는데(키 만료, 도메인 인증, 스팸함),
     * 저장을 먼저 해두면 알림을 놓쳐도 관리자 화면에서 문의를 되찾을 수 있다.
     */
    const emailResult = await sendConsultationEmail(data)
    const saved = await saveLead(data, emailResult.success).catch((err) => {
      console.error("[Lead] 저장 실패", err)
      return null
    })

    /* 저장도 실패하고 메일도 실패했으면 문의가 사라진다. 이때만 에러를 낸다. */
    if (!saved && !emailResult.success) {
      return NextResponse.json(
        { success: false, error: emailResult.error ?? "상담 신청 처리 중 오류가 발생했습니다." },
        { status: 500 }
      )
    }

    if (!emailResult.success) {
      /* 알림은 못 갔지만 신청은 보관됐다. 학부모에게는 정상 접수로 안내한다. */
      console.error("[Lead] 알림 메일 실패 — 관리자 화면에서 확인 필요", saved?.id)
    }

    return NextResponse.json({ success: true, message: "상담 신청이 완료되었습니다." })
  } catch {
    return NextResponse.json(
      { success: false, error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    )
  }
}
