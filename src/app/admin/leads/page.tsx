import { redirect } from "next/navigation"
import { AlertTriangle, Inbox, Clock } from "lucide-react"

import { LeadCard } from "@/components/admin/lead-card"
import { isAuthenticated } from "@/lib/auth"
import { listLeads, RETENTION_DAYS } from "@/lib/leads"

export const dynamic = "force-dynamic"

export default async function LeadsPage() {
  if (!(await isAuthenticated())) redirect("/admin/login")

  const leads = await listLeads().catch(() => [])
  /* 보관기간 판정은 listLeads()가 읽는 시점에 이미 끝냈다 */
  const expiredCount = leads.filter((l) => l.expired).length
  const unnotified = leads.filter((l) => !l.notified).length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">상담 신청</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          홈페이지로 접수된 상담 신청입니다. 총 {leads.length}건.
        </p>
      </div>

      {unnotified > 0 && (
        <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" />
          <div className="text-sm">
            <p className="font-medium">
              알림 메일이 발송되지 않은 신청이 {unnotified}건 있습니다
            </p>
            <p className="mt-1 text-muted-foreground">
              Vercel 환경변수의 RESEND_API_KEY와 NOTIFICATION_EMAIL을 확인해주세요.
              신청 내용은 아래에 그대로 보관되어 있습니다.
            </p>
          </div>
        </div>
      )}

      {expiredCount > 0 && (
        <div className="flex items-start gap-3 rounded-lg border border-amber-500/40 bg-amber-500/5 p-4">
          <Clock className="mt-0.5 size-5 shrink-0 text-amber-600" />
          <div className="text-sm">
            <p className="font-medium">
              보관기간({RETENTION_DAYS}일)이 지난 신청이 {expiredCount}건 있습니다
            </p>
            <p className="mt-1 text-muted-foreground">
              개인정보처리방침에 상담 신청일로부터 6개월이 지나면 파기한다고
              안내하고 있습니다. 아래에서 파기해주세요.
            </p>
          </div>
        </div>
      )}

      {leads.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed text-muted-foreground">
          <Inbox className="size-10 opacity-40" />
          <p className="text-sm">아직 접수된 상담 신청이 없습니다.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </div>
  )
}
