import type { Metadata } from "next"
import { HeroCarousel } from "@/components/home/hero-carousel"
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
   *   2. 뭘 어떻게 하는데?   → PtHighlight, ProgramSteps
   *   3. 진짜 되나?          → EvidenceSection
   *   4. 얼마고 언제?        → ClassOffers, TimetablePreview
   *   5. 누가 가르치나?      → Instructors
   *
   * IntroCards("맞춤형 커리큘럼 / 소수 정예" 4개 카드)는 제거했다.
   * 경쟁 학원이 전부 쓰는 문구라 차별점이 없고, 위 섹션들이 같은 질문에
   * 훨씬 구체적으로 답하게 되면서 남겨둘 이유가 없어졌다.
   *
   * 배경색은 밝게/어둡게를 번갈아 두어 섹션 경계가 읽히게 한다.
   */
  return (
    <>
      <HeroCarousel />
      <TargetProfiles />
      <PtHighlight />
      <ProgramSteps />
      <EvidenceSection />
      <ClassOffers />
      <TimetablePreview middleImage={middleImage} highImage={highImage} />
      <Instructors />
      <ConsultationCta />
    </>
  )
}
