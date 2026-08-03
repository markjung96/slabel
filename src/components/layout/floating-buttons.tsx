"use client"

import Link from "next/link"
import { MessageCircle, MessageSquare, Phone, PencilLine } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

import { siteConfig } from "@/data/site"
import { cn } from "@/lib/utils"

/**
 * 모바일 하단 바는 이 사이트에서 전환율이 가장 높은 자리다.
 * 카톡 채널/톡톡이 아직 없으면 죽은 링크를 띄우는 대신
 * 실제로 연결되는 전화·상담신청으로 대체한다.
 */
export function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const actions = [
    siteConfig.kakaoChannelUrl && {
      key: "kakao",
      href: siteConfig.kakaoChannelUrl,
      external: true,
      label: "카카오톡 상담",
      Icon: MessageCircle,
      style: { backgroundColor: "#FEE500", color: "#000000" },
      textClass: "",
    },
    siteConfig.naverTalkUrl && {
      key: "naver",
      href: siteConfig.naverTalkUrl,
      external: true,
      label: "네이버 톡톡",
      Icon: MessageSquare,
      style: { backgroundColor: "#03C75A" },
      textClass: "text-white",
    },
    {
      key: "tel",
      href: `tel:${siteConfig.phone}`,
      external: false,
      label: "전화 상담",
      Icon: Phone,
      style: { backgroundColor: "#22577a" },
      textClass: "text-white",
    },
    {
      key: "form",
      href: "/consultation",
      external: false,
      label: "상담 신청",
      Icon: PencilLine,
      style: { backgroundColor: "#3b8275" },
      textClass: "text-white",
    },
  ].filter(Boolean) as {
    key: string
    href: string
    external: boolean
    label: string
    Icon: typeof Phone
    style: React.CSSProperties
    textClass: string
  }[]

  return (
    <>
      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-border bg-background/95 backdrop-blur-md md:hidden">
        {actions.map(({ key, href, external, label, Icon, style, textClass }) => {
          const className = cn(
            "flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-medium transition-opacity hover:opacity-80",
            textClass
          )
          return external ? (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
              style={style}
            >
              <Icon className="size-5" />
              {label}
            </a>
          ) : (
            <Link key={key} href={href} className={className} style={style}>
              <Icon className="size-5" />
              {label}
            </Link>
          )
        })}
      </div>

      {/* Desktop Floating Buttons */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 right-8 z-40 hidden flex-col gap-3 md:flex"
          >
            {actions.map(({ key, href, external, label, Icon, style, textClass }) => {
              const className = cn(
                "group relative flex size-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl",
                textClass
              )
              const inner = (
                <>
                  <Icon className="size-6" />
                  <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    {label}
                  </span>
                </>
              )
              return external ? (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                  style={style}
                  aria-label={label}
                >
                  {inner}
                </a>
              ) : (
                <Link
                  key={key}
                  href={href}
                  className={className}
                  style={style}
                  aria-label={label}
                >
                  {inner}
                </Link>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
