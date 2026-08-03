"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * 색상을 전부 테마 토큰으로 교체했다.
 *
 * 이전에는 히어로만 #22577a / #3b8275 (블루·틸) 계열을 하드코딩해서 쓰고,
 * 나머지 사이트는 globals.css의 웜 크림 + 그린 토큰을 쓰고 있었다.
 * 사이트의 첫 화면과 나머지 화면의 팔레트가 서로 달랐던 셈이다.
 * "뭔가 안 맞는다"는 인상의 가장 큰 원인이었다.
 *
 * 모션은 이 컴포넌트에만 남긴다 (진입 1회).
 */
export function HeroCarousel() {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div className="container relative mx-auto px-4">
        <div className="flex min-h-[85vh] flex-col items-center justify-center py-section lg:py-section-lg">
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
              {/* 연도를 하드코딩하면 해가 바뀌는 순간 방치된 사이트처럼 보인다 */}
              {new Date().getFullYear()} 신규 등록 상담 진행 중
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
            {/* 그라디언트 텍스트(bg-clip-text) 제거 — 템플릿 티가 가장 크게 나는 요소다 */}
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
            {/* 강조색은 "지금 해야 할 행동" 하나에만 쓴다 */}
            <Link
              href="/consultation"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group gap-2 bg-accent px-8 text-accent-foreground hover:bg-accent/90"
              )}
            >
              상담 신청하기
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/pt-system"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2 px-8"
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
            className="mt-16 grid grid-cols-2 gap-8 rounded-2xl bg-card px-8 py-6 ring-1 ring-border md:grid-cols-4 md:gap-12 md:px-12"
          >
            {/*
              근거를 댈 수 없는 수치("학부모 만족도 98%")는 신뢰를 얻는 게 아니라 깎는다.
              검증 가능한 사실만 남긴다. 실제 설문/성적 데이터가 쌓이면
              "2026년 재원 학부모 42명 설문, 만족 이상 41명"처럼 근거와 함께 교체할 것.
            */}
            {[
              { value: "중1–고3", label: "수학 전문" },
              { value: "1:1", label: "맞춤 PT 지도" },
              { value: "타이머", label: "학습시간 관리" },
              { value: "소수정예", label: "집중 관리" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                {/* 이 학원의 정체성은 시간·정답률·문항 수다. 숫자는 tabular-nums로 고정폭. */}
                <p className="whitespace-nowrap text-2xl font-bold tabular-nums text-foreground md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
