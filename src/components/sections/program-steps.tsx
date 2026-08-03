import Image from "next/image"

import { programSteps } from "@/data/content"

/**
 * "8주 동안 일어나는 일" (REDESIGN.md 3-2의 2번)
 *
 * PT 시스템을 주장이 아니라 절차로 보여주는 자리다.
 * 각 주차에 무엇을 하고(whatWeDo), 학생이 무엇을 받는지(whatStudentGets)를
 * 나눠 적는다. 학부모가 실제로 궁금한 건 후자다.
 *
 * QUESTIONS.md Q4·Q5·Q6 답변 대기 중.
 */
export function ProgramSteps() {
  if (programSteps.length === 0) return null

  return (
    <section className="bg-background section-y-lg">
      <div className="container mx-auto px-4">
        <div className="section-head mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            8주 동안 일어나는 일
          </h2>
        </div>

        <div className="mx-auto flex max-w-4xl flex-col gap-8">
          {programSteps.map((step) => (
            <div
              key={step.week}
              className="grid gap-6 rounded-2xl border border-border bg-background p-6 md:grid-cols-[10rem_1fr] md:p-8"
            >
              <div>
                {/* 이 학원의 정체성은 시간·문항 수·정답률이다. 숫자를 크게 둔다. */}
                <p className="text-2xl font-bold tabular-nums text-primary">
                  {step.week}
                </p>
                <p className="mt-1 font-medium">{step.title}</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm font-semibold text-muted-foreground">
                    수업에서 하는 것
                  </p>
                  <ul className="space-y-1.5 text-sm leading-relaxed">
                    {step.whatWeDo.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold text-muted-foreground">
                    학생이 받는 것
                  </p>
                  <ul className="space-y-1.5 text-sm leading-relaxed">
                    {step.whatStudentGets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {step.artifact && (
                <Image
                  src={step.artifact}
                  alt={`${step.week} 산출물`}
                  width={1000}
                  height={700}
                  className="h-auto w-full rounded-xl border border-border md:col-span-2"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
