import type { Metadata } from "next"
import { HeroCarousel } from "@/components/home/hero-carousel"
import { IntroCards } from "@/components/home/intro-cards"
import { PtHighlight } from "@/components/home/pt-highlight"
import { TimetablePreview } from "@/components/home/timetable-preview"
import { ConsultationCta } from "@/components/home/consultation-cta"
import { TargetProfiles } from "@/components/sections/target-profiles"
import { ProgramSteps } from "@/components/sections/program-steps"
import { EvidenceSection } from "@/components/sections/evidence-section"
import { ClassOffers } from "@/components/sections/class-offers"
import { Instructors } from "@/components/sections/instructors"
import { getImageForGrade } from "@/lib/storage"

export const metadata: Metadata = {
  title: "스라밸학원 - 체계적인 수학 교육",
  description: "학생 개개인에게 최적화된 맞춤형 커리큘럼과 독자적 PT 시스템으로 성적을 향상시켜 드립니다.",
}

/** 시간표 미리보기가 실제 업로드분을 반영해야 한다 */
export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [middleImage, highImage] = await Promise.all([
    getImageForGrade("middle1").catch(() => null),
    getImageForGrade("high1").catch(() => null),
  ])

  /*
   * 섹션 순서는 학부모의 질문 순서를 따른다 (REDESIGN.md 3-3).
   *   1. 우리 애한테 맞나?   → TargetProfiles
   *   2. 뭘 어떻게 하는데?   → ProgramSteps
   *   3. 진짜 되나?          → EvidenceSection
   *   4. 얼마고 언제?        → ClassOffers
   *   5. 누가 가르치나?      → Instructors
   *
   * 새 섹션들은 데이터가 비어 있으면 스스로 null을 반환한다.
   * 원장님 답변이 src/data/content.ts에 채워지는 순간 자동으로 나타나고,
   * 그때 아래 IntroCards / PtHighlight의 일반론 카피를 걷어낸다.
   */
  return (
    <>
      <HeroCarousel />
      <TargetProfiles />
      <ProgramSteps />
      <EvidenceSection />

      {/* 아래 두 섹션은 위 섹션들이 채워지면 교체 대상이다 */}
      <IntroCards />
      <PtHighlight />

      <ClassOffers />
      <TimetablePreview middleImage={middleImage} highImage={highImage} />
      <Instructors />
      <ConsultationCta />
    </>
  )
}
