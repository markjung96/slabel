import { featureCards } from "@/data/home"

/**
 * 제거한 것들 (REDESIGN.md 1-2장의 클리셰 목록):
 * - 영어 eyebrow "Why Choose Us"
 * - 우상단 대형 번호 워터마크 01 02 03 04
 * - lucide 아이콘 4개 격자 (졸업모자·타이머·상승그래프·사람)
 * - 스크롤 fade-in-up (히어로 한 곳만 남긴다)
 * - "use client" — 모션이 빠지면서 클라이언트 컴포넌트일 이유가 없어졌다
 *
 * 남은 과제: 카피 자체가 아직 일반적이다.
 * "맞춤형 커리큘럼 / PT 시스템 / 성적 향상 / 소수 정예"는 경쟁 학원도 전부 쓴다.
 * 원장님 답변(QUESTIONS.md Q4·Q5·Q6)이 오면 실제로 하는 일로 교체할 것.
 */
export function IntroCards() {
  return (
    <section className="bg-card py-section-sm">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            왜 스라밸학원인가요?
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground md:text-lg">
            학생 한 명 한 명에게 집중하는 체계적인 교육 시스템으로
            <br className="hidden sm:block" />
            진정한 학습 능력 향상을 이끌어냅니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="h-full rounded-2xl border border-border bg-background p-8"
            >
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                {card.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
