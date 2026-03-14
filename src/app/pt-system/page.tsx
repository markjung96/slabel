import type { Metadata } from "next"
import { PtSystemContent } from "./pt-system-content"

export const metadata: Metadata = {
  title: "PT 시스템",
  description: "스라밸학원의 개인별 맞춤 PT 시스템으로 학생 스스로 학습 계획을 세우고 실천하는 자기주도 수학 학습을 경험하세요.",
}

export default function PtSystemPage() {
  return <PtSystemContent />
}
