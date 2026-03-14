"use client"

import Link from "next/link"
import { Clock, Target, BarChart2, ArrowRight, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const keyPoints = [
  { icon: Clock, label: "타이머 기반 집중 학습", description: "시간 관리를 통한 효율적 학습" },
  { icon: Target, label: "1:1 맞춤 지도", description: "개인별 취약점 집중 보완" },
  { icon: BarChart2, label: "실시간 성취도 추적", description: "데이터 기반 학습 분석" },
]

const benefits = [
  "학습 패턴 분석을 통한 최적의 학습 시간 설계",
  "타이머 관리로 집중력과 자기주도 학습 능력 강화",
  "실시간 피드백으로 즉각적인 학습 방향 조정",
  "체계적인 복습 시스템으로 장기 기억 정착",
]

export function PtHighlight() {
  return (
    <section className="relative w-full overflow-hidden bg-foreground py-24 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--tw-gradient-from)_0%,_transparent_50%)] from-background" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
              Our System
            </span>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-background md:text-4xl lg:text-5xl">
              독자적 PT 시스템
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-background/70">
              스라밸학원만의 PT(Personal Training) 시스템은 학생의 학습 패턴을 분석하고
              타이머 관리를 통해 집중력과 자기주도 학습 능력을 극대화합니다.
            </p>

            {/* Benefits List */}
            <ul className="mt-8 space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
                  <span className="text-background/80">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                href="/pt-system"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group gap-2 bg-background px-8 text-foreground hover:bg-background/90"
                )}
              >
                자세히 알아보기
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Right Content - Key Points Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-4"
          >
            {keyPoints.map(({ icon: Icon, label, description }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="group flex items-start gap-5 rounded-2xl border border-background/10 bg-background/5 p-6 backdrop-blur-sm transition-colors hover:bg-background/10"
              >
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Icon className="size-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-background">{label}</h3>
                  <p className="mt-1 text-background/60">{description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
