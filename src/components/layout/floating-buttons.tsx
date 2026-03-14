"use client"

import { MessageCircle, MessageSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

import { siteConfig } from "@/data/site"
import { cn } from "@/lib/utils"

export function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden border-t border-border bg-background/95 backdrop-blur-md">
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-medium transition-opacity hover:opacity-80"
          style={{ backgroundColor: "#FEE500", color: "#000000" }}
        >
          <MessageCircle className="size-5" />
          카카오톡 상담
        </a>
        <a
          href={siteConfig.naverTalkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
          style={{ backgroundColor: "#03C75A" }}
        >
          <MessageSquare className="size-5" />
          네이버 톡톡
        </a>
      </div>

      {/* Desktop Floating Buttons */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 right-8 z-40 hidden md:flex flex-col gap-3"
          >
            <a
              href={siteConfig.kakaoChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative flex items-center justify-center size-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl",
              )}
              style={{ backgroundColor: "#FEE500", color: "#000000" }}
              aria-label="카카오톡 채널 상담"
            >
              <MessageCircle className="size-6" />
              <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                카카오톡 상담
              </span>
            </a>
            <a
              href={siteConfig.naverTalkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative flex items-center justify-center size-14 rounded-full shadow-lg text-white transition-all duration-300 hover:scale-110 hover:shadow-xl",
              )}
              style={{ backgroundColor: "#03C75A" }}
              aria-label="네이버 톡톡 상담"
            >
              <MessageSquare className="size-6" />
              <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                네이버 톡톡
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
