import { NextRequest, NextResponse } from "next/server"

import { consultationSchema } from "@/lib/validators"
import { sendConsultationEmail } from "@/lib/email"
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

    const emailResult = await sendConsultationEmail(data)
    if (!emailResult.success) {
      return NextResponse.json(
        { success: false, error: emailResult.error ?? "상담 신청 처리 중 오류가 발생했습니다." },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: "상담 신청이 완료되었습니다." })
  } catch {
    return NextResponse.json(
      { success: false, error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    )
  }
}
