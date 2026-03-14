"use client"

import Link from "next/link"
import { CalendarDays } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function TimetablePreview() {
  return (
    <section className="container mx-auto px-4">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">시간표</h2>
        <p className="mt-3 text-muted-foreground md:text-lg">
          학년별 맞춤 시간표로 효율적인 학습 일정을 확인하세요
        </p>
      </div>

      <Tabs defaultValue="middle" className="mx-auto max-w-2xl">
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="middle">중등부</TabsTrigger>
            <TabsTrigger value="high">고등부</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="middle">
          <div className="mt-6 flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-muted-foreground/30 bg-muted/30 py-16 text-center">
            <CalendarDays className="size-10 text-muted-foreground/50" />
            <p className="text-muted-foreground">중등부 시간표 이미지가 이곳에 표시됩니다.</p>
          </div>
        </TabsContent>

        <TabsContent value="high">
          <div className="mt-6 flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-muted-foreground/30 bg-muted/30 py-16 text-center">
            <CalendarDays className="size-10 text-muted-foreground/50" />
            <p className="text-muted-foreground">고등부 시간표 이미지가 이곳에 표시됩니다.</p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-center">
        <Link href="/timetable" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
          전체 시간표 보기
        </Link>
      </div>
    </section>
  )
}
