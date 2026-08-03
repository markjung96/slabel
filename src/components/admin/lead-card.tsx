"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { LeadWithStatus } from "@/lib/leads"

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

/**
 * 파기는 되돌릴 수 없으므로 한 번 더 확인받는다.
 * 확인 절차 없이 지워지면 실수로 문의를 잃는다.
 */
export function LeadCard({ lead }: { lead: LeadWithStatus }) {
  const [confirming, setConfirming] = useState(false)
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  function handleDelete() {
    startTransition(async () => {
      await fetch(`/api/admin/leads?id=${encodeURIComponent(lead.id)}`, {
        method: "DELETE",
      })
      setConfirming(false)
      router.refresh()
    })
  }

  return (
    <Card className={lead.expired ? "border-amber-500/40" : undefined}>
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
          {!lead.notified && <Badge variant="destructive">알림 미발송</Badge>}
          {lead.expired && <Badge variant="destructive">보관기간 경과</Badge>}
          <span className="ml-auto text-xs tabular-nums text-muted-foreground">
            {formatDate(lead.createdAt)}
          </span>
        </div>

        {lead.content && (
          <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">
            {lead.content}
          </p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span>구분: {lead.type}</span>
          {lead.referral && <span>유입: {lead.referral}</span>}

          <div className="ml-auto flex items-center gap-2">
            {confirming ? (
              <>
                <span className="text-destructive">되돌릴 수 없습니다.</span>
                <Button
                  size="xs"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={pending}
                >
                  {pending ? "파기 중…" : "파기"}
                </Button>
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => setConfirming(false)}
                  disabled={pending}
                >
                  취소
                </Button>
              </>
            ) : (
              <Button
                size="xs"
                variant="ghost"
                onClick={() => setConfirming(true)}
                aria-label={`${lead.name} 상담 신청 파기`}
              >
                <Trash2 className="size-3.5" />
                파기
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
