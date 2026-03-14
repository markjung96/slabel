import type { Metadata } from "next"
import { AboutContent } from "./about-content"

export const metadata: Metadata = {
  title: "학원 소개",
  description: "스라밸학원의 교육 철학, 특징, 그리고 오시는길을 안내합니다. 경기 용인시 기흥구 흥덕2로 85 606호에 위치합니다.",
}

export default function AboutPage() {
  return <AboutContent />
}
