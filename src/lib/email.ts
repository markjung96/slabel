import type { ConsultationFormData } from "@/types"

interface EmailResult {
  success: boolean
  error?: string
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
}

export async function sendConsultationEmail(data: ConsultationFormData): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY
  const recipientEmail = process.env.NOTIFICATION_EMAIL

  /**
   * 예전에는 키가 없으면 콘솔에만 찍고 success: true를 돌려줬다.
   * 그 결과 학부모에게는 "상담 신청이 완료되었습니다"가 뜨지만
   * 원장에게는 아무것도 도착하지 않는 상태로 문의가 통째로 유실됐다.
   * 설정이 안 됐으면 조용히 성공하지 말고 반드시 실패시킨다.
   */
  if (!apiKey || !recipientEmail) {
    console.error(
      "[Email] RESEND_API_KEY 또는 NOTIFICATION_EMAIL 미설정 — 상담 신청이 전달되지 않습니다.",
      { hasApiKey: Boolean(apiKey), hasRecipient: Boolean(recipientEmail) }
    )
    if (process.env.NODE_ENV !== "production") {
      console.warn("[Email][dev] 접수된 내용:", JSON.stringify(data, null, 2))
    }
    return {
      success: false,
      error: "상담 접수 시스템 점검 중입니다. 번거로우시겠지만 전화로 문의해주세요.",
    }
  }

  const htmlContent = `
    <h2>새로운 상담 신청이 접수되었습니다</h2>
    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">구분</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.type)}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">이름</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">전화번호</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.phone)}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">학년</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.grade)}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">관심 과목</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.subject)}</td></tr>
      ${data.school ? `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">학교명</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.school)}</td></tr>` : ""}
      ${data.content ? `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">상담 내용</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.content)}</td></tr>` : ""}
      ${data.referral ? `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">알게된 경로</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.referral)}</td></tr>` : ""}
    </table>
    <p style="color: #666; font-size: 12px; margin-top: 16px;">이 메일은 스라밸학원 홈페이지 상담신청 폼에서 자동 발송되었습니다.</p>
  `

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      /**
       * Resend는 발신 도메인이 검증돼 있어야만 발송된다.
       * 검증되지 않은 도메인을 쓰면 403으로 전부 실패한다.
       * 도메인 인증 전에는 Resend가 제공하는 onboarding@resend.dev를 쓴다.
       */
      from: process.env.EMAIL_FROM || "스라밸학원 <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: `[상담신청] ${escapeHtml(data.name)}님의 상담 신청이 접수되었습니다`,
      html: htmlContent,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error("[Email Error]", response.status, error)
    return {
      success: false,
      error: "상담 접수에 실패했습니다. 번거로우시겠지만 전화로 문의해주세요.",
    }
  }

  return { success: true }
}
