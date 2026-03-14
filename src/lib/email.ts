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

  if (!apiKey) {
    console.log("[Email Stub] 상담신청 알림:")
    console.log(JSON.stringify(data, null, 2))
    console.log("[Email Stub] RESEND_API_KEY가 설정되지 않아 이메일을 전송하지 않았습니다.")
    return { success: true }
  }

  const recipientEmail = process.env.NOTIFICATION_EMAIL || "slabel@example.com"

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
      from: "스라밸학원 <noreply@slabel.vercel.app>",
      to: [recipientEmail],
      subject: `[상담신청] ${escapeHtml(data.name)}님의 상담 신청이 접수되었습니다`,
      html: htmlContent,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error("[Email Error]", error)
    return { success: false, error: "이메일 발송에 실패했습니다." }
  }

  return { success: true }
}
