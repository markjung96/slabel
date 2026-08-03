import { redirect } from "next/navigation"
import { AlertTriangle, Inbox } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { isAuthenticated } from "@/lib/auth"
import { listLeads } from "@/lib/leads"

export const dynamic = "force-dynamic"

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default async function LeadsPage() {
  if (!(await isAuthenticated())) redirect("/admin/login")

  const leads = await listLeads().catch(() => [])
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
        <div className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
          <div className="text-sm">
            <p className="font-medium text-amber-900 dark:text-amber-200">
              알림 메일이 발송되지 않은 신청이 {unnotified}건 있습니다
            </p>
            <p className="mt-1 text-muted-foreground">
              RESEND_API_KEY와 NOTIFICATION_EMAIL 환경변수를 확인해주세요.
              신청 내용은 아래에 그대로 보관되어 있습니다.
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
            <Card key={lead.id}>
              <CardContent className="pt-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-semibold">{lead.name}</span>
                  <a
                    href={`tel:${lead.phone}`}
                    className="text-sm font-medium text-primary underline"
                  >
                    {lead.phone}
                  </a>
                  <Badge variant="secondary">{lead.grade}</Badge>
                  <Badge variant="secondary">{lead.subject}</Badge>
                  {lead.school && <Badge variant="outline">{lead.school}</Badge>}
                  {!lead.notified && (
                    <Badge variant="destructive">알림 미발송</Badge>
                  )}
                  <span className="ml-auto text-xs text-muted-foreground">
                    {formatDate(lead.createdAt)}
                  </span>
                </div>

                {lead.content && (
                  <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">
                    {lead.content}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>구분: {lead.type}</span>
                  {lead.referral && <span>유입: {lead.referral}</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
