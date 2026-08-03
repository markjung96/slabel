import Link from "next/link"

import { classOffers } from "@/data/content"
import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

/**
 * "반 · 시간 · 비용" (REDESIGN.md 3-2의 4번)
 *
 * 가격을 숨기면 학부모는 "비싸겠구나" 하고 그냥 나간다.
 * 분당 단가로 보면 인근 학원과 비슷한 수준이므로 공개하는 편이 유리하다.
 * 숨겨야 할 이유가 있다면 그건 가격이 아니라 가치 설명의 문제다.
 *
 * QUESTIONS.md Q11~Q13 답변 대기 중.
 */
export function ClassOffers() {
  if (classOffers.length === 0) return null

  const won = new Intl.NumberFormat("ko-KR")

  return (
    <section className="bg-background section-y">
      <div className="container mx-auto px-4">
        <div className="section-head mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            반 · 시간 · 비용
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {classOffers.map((offer) => (
            <div
              key={offer.id}
              className="flex flex-col rounded-2xl border border-border bg-background p-6"
            >
              <p className="text-lg font-semibold">{offer.target}</p>
              <p className="mt-1 text-sm text-muted-foreground">{offer.schedule}</p>

              <p className="mt-5 text-3xl font-bold tabular-nums">
                {won.format(offer.monthlyFee)}
                <span className="ml-1 text-base font-medium text-muted-foreground">
                  원 / 월
                </span>
              </p>
              <p className="mt-1 text-sm tabular-nums text-muted-foreground">
                월 {won.format(offer.minutesPerMonth)}분
              </p>

              {offer.includes.length > 0 && (
                <ul className="mt-5 space-y-1.5 text-sm text-muted-foreground">
                  {offer.includes.map((item) => (
                    <li key={item}>· {item}</li>
                  ))}
                </ul>
              )}

              {offer.seatsLeft !== null && (
                <p className="mt-5 text-sm font-medium text-accent">
                  잔여 {offer.seatsLeft}자리
                </p>
              )}

              {/*
                카드는 flex flex-col이므로 mt-auto가 버튼을 바닥으로 민다.
                내용 길이가 달라도 버튼 줄이 맞는다.
              */}
              <div className="mt-auto pt-6">
                <Link
                  href="/consultation"
                  className={cn(buttonVariants({ size: "sm" }), "w-full")}
                >
                  이 반 상담 신청
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
