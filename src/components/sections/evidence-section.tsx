import Image from "next/image"

import { evidence } from "@/data/content"

/**
 * "결과" (REDESIGN.md 3-2의 3번)
 *
 * 리뉴얼 원칙 1: 주장하지 말고 보여준다.
 * "성적이 향상됩니다"는 아무나 쓸 수 있고, before → after 숫자는 아무나 못 낸다.
 *
 * 리포트 실물 사진은 가공하지 않는다. 이름만 가리고 날것으로 올리는 편이
 * 예쁘게 다시 그린 것보다 신뢰를 준다.
 *
 * QUESTIONS.md Q9·Q10 답변 대기 중.
 */
export function EvidenceSection() {
  if (evidence.length === 0) return null

  return (
    <section className="bg-card section-y-lg">
      <div className="container mx-auto px-4">
        <div className="section-head mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            결과
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {evidence.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt="학습 리포트"
                  width={800}
                  height={600}
                  className="h-auto w-full border-b border-border"
                />
              )}

              <div className="p-6">
                <p className="text-sm text-muted-foreground">
                  {item.grade}
                  {item.school && ` · ${item.school}`} · {item.period}
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex gap-3">
                    <span className="w-12 shrink-0 text-sm text-muted-foreground">
                      전
                    </span>
                    <span className="text-sm tabular-nums">{item.before}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-12 shrink-0 text-sm text-muted-foreground">
                      후
                    </span>
                    <span className="text-sm font-semibold tabular-nums text-primary">
                      {item.after}
                    </span>
                  </div>
                </div>

                {item.quote && (
                  <blockquote className="mt-5 border-l-2 border-border pl-4 text-sm leading-relaxed text-muted-foreground">
                    {item.quote}
                  </blockquote>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
