import type { Metadata } from "next"
import { HeroCarousel } from "@/components/home/hero-carousel"
import { IntroCards } from "@/components/home/intro-cards"
import { PtHighlight } from "@/components/home/pt-highlight"
import { TimetablePreview } from "@/components/home/timetable-preview"
import { ConsultationCta } from "@/components/home/consultation-cta"

export const metadata: Metadata = {
  title: "스라밸학원 - 체계적인 수학 교육",
  description: "학생 개개인에게 최적화된 맞춤형 커리큘럼과 독자적 PT 시스템으로 성적을 향상시켜 드립니다.",
}

export default function HomePage() {
  return (
    <main>
      <HeroCarousel />
      <section className="py-20">
        <IntroCards />
      </section>
      <PtHighlight />
      <section className="py-20">
        <TimetablePreview />
      </section>
      <ConsultationCta />
    </main>
  )
}
