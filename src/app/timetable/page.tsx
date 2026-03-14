import type { Metadata } from "next"

import { TimetableViewer } from "@/components/timetable/timetable-viewer"
import type { TimetableGrade } from "@/types"

export const metadata: Metadata = {
  title: "시간표",
  description: "스라밸학원 중등부·고등부 학년별 수업 시간표를 확인하세요.",
}

const timetableGrades: TimetableGrade[] = [
  { id: "middle-1", label: "중1", category: "middle", image: null },
  { id: "middle-2", label: "중2", category: "middle", image: null },
  { id: "middle-3", label: "중3", category: "middle", image: null },
  { id: "high-1", label: "고1", category: "high", image: null },
  { id: "high-2", label: "고2", category: "high", image: null },
  { id: "high-3", label: "고3", category: "high", image: null },
]

export default function TimetablePage() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold md:text-4xl">시간표</h1>
        <p className="text-muted-foreground">
          학년별 수업 시간표를 확인하세요.
        </p>
      </div>
      <TimetableViewer grades={timetableGrades} />
    </main>
  )
}
