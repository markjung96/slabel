"use client"

import Link from "next/link"
import Image from "next/image"
import { CalendarDays, ArrowRight, Phone } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/data/site"
import { cn } from "@/lib/utils"

interface TimetablePreviewProps {
  middleImage: string | null
  highImage: string | null
}

/**
 * 시간표가 아직 없을 때 "이미지가 이곳에 표시됩니다" 같은
 * 개발용 문구를 메인 화면에 그대로 노출하면 안 된다.
 * 이미지가 있으면 보여주고, 없으면 문의로 연결한다.
 */
function PreviewPanel({ image, label }: { image: string | null; label: string }) {
  if (image) {
    return (
      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
        <Image
          src={image}
          alt={`${label} 시간표`}
          width={1200}
          height={900}
          className="h-auto w-full object-contain"
        />
      </div>
    )
  }

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-background px-6 py-20 text-center shadow-sm">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        <CalendarDays className="size-8 text-muted-foreground" />
      </div>
      <p className="font-medium text-foreground">
        {label} 반 편성은 학년별로 개별 안내드립니다
      </p>
      <p className="max-w-md text-sm text-muted-foreground">
        현재 개설된 반과 잔여 자리를 바로 확인해드립니다.
      </p>
      <a
        href={`tel:${siteConfig.phone}`}
        className={cn(buttonVariants({ size: "sm" }), "mt-2 gap-1.5")}
      >
        <Phone className="size-3.5" />
        {siteConfig.phone}
      </a>
    </div>
  )
}

export function TimetablePreview({ middleImage, highImage }: TimetablePreviewProps) {
  return (
    <section className="relative overflow-hidden bg-card section-y-sm">
      <div className="container mx-auto px-4">
        {/* 영어 eyebrow "Schedule"과 스크롤 모션 제거 */}
        <div className="section-head mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            학년별 시간표
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground md:text-lg">
            학년별 맞춤 시간표로 효율적인 학습 일정을 확인하세요
          </p>
        </div>

        <div>
          <Tabs defaultValue="middle" className="mx-auto max-w-3xl">
            <div className="flex justify-center">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="middle" className="data-[state=active]:bg-background">
                  중등부
                </TabsTrigger>
                <TabsTrigger value="high" className="data-[state=active]:bg-background">
                  고등부
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="middle">
              <PreviewPanel image={middleImage} label="중등부" />
            </TabsContent>

            <TabsContent value="high">
              <PreviewPanel image={highImage} label="고등부" />
            </TabsContent>
          </Tabs>

          <div className="mt-10 flex justify-center">
            <Link
              href="/timetable"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "group gap-2 border-foreground/20"
              )}
            >
              전체 시간표 보기
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
