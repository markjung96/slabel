"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function HeroCarousel() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/50" />
      
      <div className="container relative mx-auto px-4">
        <div className="flex min-h-[85vh] flex-col items-center justify-center py-20 lg:py-32">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent ring-1 ring-accent/20">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              2025 신규 등록 상담 진행 중
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl text-balance text-center text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl xl:text-7xl"
          >
            체계적인 수학 교육으로
            <br />
            <span className="text-accent">성적 향상</span>을 이끌어냅니다
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-2xl text-pretty text-center text-lg text-muted-foreground md:text-xl"
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
                "group gap-2 bg-foreground px-8 text-background hover:bg-foreground/90"
              )}
            >
              상담 신청하기
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/pt-system"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2 border-foreground/20 px-8"
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
            className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12"
          >
            {[
              { value: "10+", label: "년 교육 경력" },
              { value: "1:1", label: "맞춤 PT 지도" },
              { value: "98%", label: "학부모 만족도" },
              { value: "소수정예", label: "집중 관리" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-foreground md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary/50 to-transparent" />
    </section>
  )
}
