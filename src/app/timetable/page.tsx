import type { Metadata } from "next"

import { TimetableViewer } from "@/components/timetable/timetable-viewer"
import { getImageForGrade } from "@/lib/storage"
import { siteConfig } from "@/data/site"
import type { TimetableGrade } from "@/types"

export const metadata: Metadata = {
  title: "시간표",
  description: "스라밸학원 중등부·고등부 학년별 수업 시간표를 확인하세요.",
}

/** 관리자가 시간표를 새로 올리면 바로 반영되어야 한다 */
export const dynamic = "force-dynamic"

/**
 * storage의 grade key("middle1")와 화면 표기를 한 곳에서 매핑한다.
 * 이전에는 image가 전부 null로 하드코딩돼 있어서
 * 관리자 페이지에 아무리 업로드해도 공개 페이지에는 영원히 "준비 중"만 떴다.
 */
const GRADES = [
  { id: "middle1", label: "중1", category: "middle" as const },
  { id: "middle2", label: "중2", category: "middle" as const },
  { id: "middle3", label: "중3", category: "middle" as const },
  { id: "high1", label: "고1", category: "high" as const },
  { id: "high2", label: "고2", category: "high" as const },
  { id: "high3", label: "고3", category: "high" as const },
]

export default async function TimetablePage() {
  const timetableGrades: TimetableGrade[] = await Promise.all(
    GRADES.map(async (grade) => ({
      ...grade,
      image: await getImageForGrade(grade.id).catch(() => null),
    }))
  )

  return (
    <main className="container mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold md:text-4xl">시간표</h1>
        <p className="text-muted-foreground">
          학년별 수업 시간표를 확인하세요. 반 편성과 잔여 자리는 학년별로 다르니
          <a href={`tel:${siteConfig.phone}`} className="mx-1 font-medium underline">
            {siteConfig.phone}
          </a>
          로 문의해주세요.
        </p>
      </div>
      <TimetableViewer grades={timetableGrades} />
    </main>
  )
}
