"use client"

import Link from "next/link"
import { Clock, Target, BarChart2 } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const keyPoints = [
  { icon: Clock, label: "타이머 기반 집중 학습" },
  { icon: Target, label: "1:1 맞춤 지도" },
  { icon: BarChart2, label: "실시간 성취도 추적" },
]

export function PtHighlight() {
  return (
    <section className="w-full bg-muted">
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">독자적 PT 시스템</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            스라밸학원만의 PT(Personal Training) 시스템은 학생의 학습 패턴을 분석하고
            타이머 관리를 통해 집중력과 자기주도 학습 능력을 극대화합니다.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {keyPoints.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-foreground/10"
              >
                <Icon className="size-4 text-primary" />
                {label}
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/pt-system" className={cn(buttonVariants({ size: "lg" }))}>
              자세히 알아보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
