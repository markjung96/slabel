"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { aboutContent } from "@/data/about"
import { cn } from "@/lib/utils"

export function MapEmbeds() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(aboutContent.location.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full space-y-4">
      <Tabs defaultValue="naver">
        <TabsList>
          <TabsTrigger value="naver">네이버 지도</TabsTrigger>
          <TabsTrigger value="kakao">카카오 지도</TabsTrigger>
        </TabsList>

        <TabsContent value="naver" className="mt-3">
          <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
            <iframe
              src={aboutContent.location.naverMapEmbed}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="네이버 지도"
            />
          </div>
        </TabsContent>

        <TabsContent value="kakao" className="mt-3">
          <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
            <iframe
              src={aboutContent.location.kakaoMapEmbed}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="카카오 지도"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center gap-2">
        <p className="text-sm text-muted-foreground flex-1">
          {aboutContent.location.address}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className={cn(
            "shrink-0 gap-1.5 transition-colors",
            copied && "text-green-600 border-green-600/30"
          )}
          aria-label="주소 복사"
        >
          {copied ? (
            <>
              <Check className="size-3.5" />
              복사됨
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              주소 복사
            </>
          )}
        </Button>
      </div>

      {copied && (
        <p className="text-xs text-green-600 font-medium" role="status" aria-live="polite">
          주소가 복사되었습니다
        </p>
      )}
    </div>
  )
}
