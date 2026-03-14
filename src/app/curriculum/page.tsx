import type { Metadata } from "next"
import { BookOpenIcon } from "lucide-react"

import { CurriculumGallery } from "@/components/curriculum/curriculum-gallery"
import type { CurriculumItem } from "@/types"

export const metadata: Metadata = {
  title: "커리큘럼",
  description: "스라밸학원의 체계적인 수학 커리큘럼을 확인하세요. 중등부·고등부 단계별 학습 로드맵을 제공합니다.",
}

const curriculumItems: CurriculumItem[] = []

export default function CurriculumPage() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold md:text-4xl">커리큘럼</h1>
        <p className="text-muted-foreground">
          S-Label의 체계적인 수학 커리큘럼을 소개합니다.
        </p>
      </div>

      {curriculumItems.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-muted/30 text-muted-foreground">
          <BookOpenIcon className="size-12 opacity-40" />
          <p className="text-base font-medium">커리큘럼을 준비 중입니다.</p>
          <p className="text-sm">곧 업데이트될 예정입니다.</p>
        </div>
      ) : (
        <CurriculumGallery items={curriculumItems} />
      )}
    </main>
  )
}
