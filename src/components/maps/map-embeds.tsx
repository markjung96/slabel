"use client"

import { useState } from "react"
import { Copy, Check, MapPin, ExternalLink, Phone } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { aboutContent } from "@/data/about"
import { siteConfig } from "@/data/site"
import { cn } from "@/lib/utils"

/**
 * 네이버/카카오 지도는 iframe 임베드를 허용하지 않아(X-Frame-Options)
 * 기존 iframe은 빈 회색 박스로만 보였다.
 * 실제로 동작하는 "지도 앱으로 열기" 링크 + 주소 복사로 대체한다.
 */
export function MapEmbeds() {
  const [copied, setCopied] = useState(false)
  const { address, landmark } = aboutContent.location

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full space-y-4">
      <div className="rounded-xl border border-border bg-muted/30 p-6">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
          <div className="space-y-1">
            <p className="text-base font-semibold">{address}</p>
            <p className="text-sm text-muted-foreground">{landmark}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={siteConfig.naverMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
          >
            <ExternalLink className="size-3.5" />
            네이버 지도로 열기
          </a>
          <a
            href={siteConfig.kakaoMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
          >
            <ExternalLink className="size-3.5" />
            카카오맵으로 열기
          </a>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className={cn(
              "gap-1.5 transition-colors",
              copied && "border-green-600/30 text-green-600"
            )}
            aria-label="주소 복사"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "복사됨" : "주소 복사"}
          </Button>
          <a
            href={`tel:${siteConfig.phone}`}
            className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
          >
            <Phone className="size-3.5" />
            {siteConfig.phone}
          </a>
        </div>
      </div>

      {copied && (
        <p
          className="text-xs font-medium text-green-600"
          role="status"
          aria-live="polite"
        >
          주소가 복사되었습니다
        </p>
      )}
    </div>
  )
}
