"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function HeroCarousel() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f8f6f3]">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,87,122,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,117,0.06)_0%,transparent_50%)]" />
      </div>
      
      <div className="container relative mx-auto px-4">
        <div className="flex min-h-[85vh] flex-col items-center justify-center py-20 lg:py-32">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#22577a]/10 px-4 py-2 text-sm font-medium text-[#22577a] ring-1 ring-[#22577a]/20">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#3b8275] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[#3b8275]" />
              </span>
              2025 신규 등록 상담 진행 중
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl text-balance text-center text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl lg:text-6xl xl:text-7xl"
          >
            체계적인 수학 교육으로
            <br />
            <span className="bg-gradient-to-r from-[#22577a] to-[#3b8275] bg-clip-text text-transparent">성적 향상</span>을 이끌어냅니다
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-2xl text-pretty text-center text-lg text-[#4a4a4a] md:text-xl"
          >
            학생 개개인에게 최적화된 맞춤형 커리큘럼과 독자적 PT 시스템으로
            자기주도 학습 능력을 키워드립니다.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Link
              href="/consultation"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group gap-2 bg-[#22577a] px-8 text-white hover:bg-[#1a4560] shadow-lg shadow-[#22577a]/20"
              )}
            >
              상담 신청하기
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/pt-system"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2 border-[#22577a]/30 px-8 text-[#22577a] hover:bg-[#22577a]/5"
              )}
            >
              <Play className="size-4" />
              PT 시스템 알아보기
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 gap-8 rounded-2xl bg-white/60 px-8 py-6 backdrop-blur-sm ring-1 ring-[#22577a]/10 md:grid-cols-4 md:gap-12 md:px-12"
          >
            {[
              { value: "10+", label: "년 교육 경력" },
              { value: "1:1", label: "맞춤 PT 지도" },
              { value: "98%", label: "학부모 만족도" },
              { value: "소수정예", label: "집중 관리" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-[#22577a] md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-[#4a4a4a]">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent" />
    </section>
  )
}
