import Image from "next/image"

import { instructors } from "@/data/content"

/**
 * "강사" (REDESIGN.md 3-2의 5번)
 *
 * 학부모는 "10년 이상 교육 경력"이라는 문구보다
 * 얼굴 사진과 실명 이력을 훨씬 신뢰한다.
 * 특히 "원장이 직접 지도하는 학년"이 어디인지를 가장 궁금해한다.
 *
 * QUESTIONS.md Q14·Q15 답변 대기 중.
 */
export function Instructors() {
  if (instructors.length === 0) return null

  return (
    <section className="bg-background section-y">
      <div className="container mx-auto px-4">
        <div className="section-head mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            가르치는 사람
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {instructors.map((person) => (
            <div
              key={person.name}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              {person.photo && (
                <Image
                  src={person.photo}
                  alt={person.name}
                  width={600}
                  height={600}
                  className="aspect-square w-full object-cover"
                />
              )}

              <div className="p-6">
                <p className="text-lg font-semibold">{person.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {person.role}
                </p>

                <p className="mt-3 text-sm">
                  {person.subjects.join(" · ")}
                  {person.grades.length > 0 && ` / ${person.grades.join(", ")}`}
                </p>

                {person.career.length > 0 && (
                  <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                    {person.career.map((item) => (
                      <li key={item}>· {item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
