import Image from "next/image"

import { targetProfiles } from "@/data/content"

/**
 * "이런 학생을 위한 곳입니다" (REDESIGN.md 3-2의 1번)
 *
 * 학부모가 가장 먼저 묻는 것은 "우리 애한테 맞는 곳인가?"다.
 * 여기서 일부러 좁힌다. 해당하는 학부모는 반드시 전화하고,
 * 해당하지 않는 학부모는 걸러진다. 둘 다 이득이다.
 *
 * 데이터가 없으면 렌더링하지 않는다 — QUESTIONS.md Q1 답변 대기 중.
 */
export function TargetProfiles() {
  if (targetProfiles.length === 0) return null

  return (
    <section className="bg-background py-section">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            이런 학생이라면
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {targetProfiles.map((profile) => (
            <div
              key={profile.id}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              {profile.image && (
                <Image
                  src={profile.image}
                  alt=""
                  width={600}
                  height={400}
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="p-6">
                <p className="text-lg font-semibold leading-snug">
                  {profile.situation}
                </p>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {profile.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
