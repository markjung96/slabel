import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

/**
 * 제거한 것들:
 * - 영어 eyebrow "Our System"
 * - 배경 radial-gradient 블롭
 * - 우측 아이콘 카드 3개 (시계·과녁·막대그래프)
 * - 스크롤 fade-in / slide-in
 *
 * 남은 과제: 이 섹션이 이 학원의 핵심 무기를 설명하는 자리인데
 * 아직 "분석합니다 / 극대화합니다" 같은 추상 동사뿐이다.
 * QUESTIONS.md Q5(타이머를 정확히 어떻게 쓰는가) 답변과
 * Q8(타이머 화면·시간 기록지 사진)이 오면 실물로 교체한다.
 */
const benefits = [
  "학습 패턴 분석을 통한 최적의 학습 시간 설계",
  "타이머 관리로 집중력과 자기주도 학습 능력 강화",
  "실시간 피드백으로 즉각적인 학습 방향 조정",
  "체계적인 복습 시스템으로 장기 기억 정착",
]

export function PtHighlight() {
  return (
    <section className="w-full bg-foreground py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-background md:text-4xl lg:text-5xl">
            독자적 PT 시스템
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-background/70">
            스라밸학원만의 PT(Personal Training) 시스템은 학생의 학습 패턴을 분석하고
            타이머 관리를 통해 집중력과 자기주도 학습 능력을 극대화합니다.
          </p>

          <ul className="mt-8 space-y-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
                <span className="text-background/80">{benefit}</span>
              </li>
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
        </div>
      </div>
    </section>
  )
}
