import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

/**
 * 아이콘 카드 3개를 걷어내면서 우측 컬럼이 통째로 비어
 * 좌우 균형이 무너졌던 섹션. 2단 구성을 복구하되,
 * 오른쪽은 아이콘이 아니라 실제 주간 리포트 형태로 채운다.
 *
 * 주장("데이터로 관리합니다") 대신 결과물을 보여주는 자리다.
 * 실제 리포트 사진(QUESTIONS.md Q8)이 도착하면 이 목업을 사진으로 교체한다.
 */
const reportRows = [
  { label: "이번 주 학습", value: "420분" },
  { label: "과제 수행률", value: "85%" },
  { label: "방정식 정답률", value: "62% → 81%" },
  { label: "시간 부족 문항", value: "7개 → 3개" },
]

export function PtHighlight() {
  return (
    <section className="w-full bg-foreground section-y-lg">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* 왼쪽 — 설명 */}
          <div>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-background md:text-4xl lg:text-5xl">
              시간을 재지 않으면
              <br />
              무엇이 느린지 알 수 없습니다
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-background/70">
              스라밸의 PT 시스템은 문제당 풀이시간을 기록합니다. 어느 유형에서
              막히는지, 어디서 시간을 잃는지를 숫자로 확인하고 그 부분만 다시
              시킵니다.
            </p>

            <div className="mt-10">
              <Link
                href="/pt-system"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group gap-2 bg-background px-8 text-foreground hover:bg-background/90"
                )}
              >
                PT 시스템 자세히 보기
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* 오른쪽 — 주간 리포트 */}
          <div className="rounded-2xl border border-background/15 bg-background/5 p-6 md:p-8">
            <div className="flex items-baseline justify-between border-b border-background/15 pb-4">
              <p className="font-semibold text-background">주간 학습 리포트</p>
              <p className="text-sm text-background/50">중2 · 8주 과정</p>
            </div>

            <dl className="mt-2 divide-y divide-background/10">
              {reportRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between py-3.5"
                >
                  <dt className="text-background/70">{row.label}</dt>
                  <dd className="font-semibold tabular-nums text-background">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-4 border-t border-background/15 pt-4 text-sm text-background/60">
              다음 주 보완 단원: 일차함수 그래프
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
