"use client"

import { MessageCircle, MessageSquare } from "lucide-react"

import { siteConfig } from "@/data/site"
import { cn } from "@/lib/utils"

export function FloatingButtons() {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden border-t bg-white">
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium transition-opacity hover:opacity-80"
          style={{ backgroundColor: "#FEE500", color: "#000000" }}
        >
          <MessageCircle className="size-5" />
          카카오톡 상담
        </a>
        <a
          href={siteConfig.naverTalkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80"
          style={{ backgroundColor: "#03C75A" }}
        >
          <MessageSquare className="size-5" />
          네이버 톡톡
        </a>
      </div>

      <div className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col gap-3">
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center justify-center size-14 rounded-full shadow-lg transition-transform hover:scale-110",
          )}
          style={{ backgroundColor: "#FEE500", color: "#000000" }}
          aria-label="카카오톡 채널 상담"
        >
          <MessageCircle className="size-6" />
        </a>
        <a
          href={siteConfig.naverTalkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center justify-center size-14 rounded-full shadow-lg text-white transition-transform hover:scale-110",
          )}
          style={{ backgroundColor: "#03C75A" }}
          aria-label="네이버 톡톡 상담"
        >
          <MessageSquare className="size-6" />
        </a>
      </div>
    </>
  )
}
