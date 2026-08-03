import type { Metadata } from "next"
import Link from "next/link"
import { BookOpenIcon, Phone } from "lucide-react"

import { CurriculumGallery } from "@/components/curriculum/curriculum-gallery"
import { buttonVariants } from "@/components/ui/button"
import { listImages } from "@/lib/storage"
import { siteConfig } from "@/data/site"
import { cn } from "@/lib/utils"
import type { CurriculumItem } from "@/types"

export const metadata: Metadata = {
  title: "커리큘럼",
  description:
    "스라밸학원의 체계적인 수학 커리큘럼을 확인하세요. 중등부·고등부 단계별 학습 로드맵을 제공합니다.",
}

/** 관리자가 커리큘럼을 새로 올리면 바로 반영되어야 한다 */
export const dynamic = "force-dynamic"

const SECTIONS = [
  { category: "middle" as const, storageKey: "curriculum-middle", label: "중등부" },
  { category: "high" as const, storageKey: "curriculum-high", label: "고등부" },
]

/**
 * 이전에는 curriculumItems가 빈 배열로 하드코딩돼 있어서
 * 관리자 페이지에 무엇을 올려도 공개 페이지는 항상 "준비 중"이었다.
 */
async function loadCurriculum(): Promise<CurriculumItem[]> {
  const groups = await Promise.all(
    SECTIONS.map(async (section) => {
      const paths = await listImages(section.storageKey).catch(() => [])
      return paths.map((image, index) => ({
        id: `${section.storageKey}-${index}`,
        category: section.category,
        label: section.label,
        image,
        order: index,
      }))
    })
  )
  return groups.flat()
}

export default async function CurriculumPage() {
  const curriculumItems = await loadCurriculum()

  return (
    <main className="container mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold md:text-4xl">커리큘럼</h1>
        <p className="text-muted-foreground">
          스라밸학원의 체계적인 수학 커리큘럼을 소개합니다.
        </p>
      </div>

      {curriculumItems.length === 0 ? (
        /* 막다른 길로 끝내지 않고 다음 행동으로 연결한다 */
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-muted/30 px-6 text-center text-muted-foreground">
          <BookOpenIcon className="size-12 opacity-40" />
          <p className="text-base font-medium text-foreground">
            커리큘럼은 학생별 진단 후 개별 설계됩니다
          </p>
          <p className="max-w-md text-sm">
            학년·현재 성적·취약 단원에 따라 8주 학습 계획을 따로 만들어 드립니다.
            상담 시 진단 결과와 함께 계획표를 보여드립니다.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            <Link
              href="/consultation"
              className={cn(buttonVariants({ size: "sm" }))}
            >
              진단 상담 신청하기
            </Link>
            <a
              href={`tel:${siteConfig.phone}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "gap-1.5"
              )}
            >
              <Phone className="size-3.5" />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      ) : (
        <CurriculumGallery items={curriculumItems} />
      )}
    </main>
  )
}
