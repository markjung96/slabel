import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircleIcon, TrophyIcon, CalendarIcon, BookOpenIcon } from "lucide-react"

import { highSchoolProgram } from "@/data/programs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "고등부",
  description: "스라밸학원 고등부 프로그램 - 수능·내신 대비 체계적인 수학 커리큘럼으로 목표 대학을 향한 실력을 키웁니다.",
}

export default function HighSchoolPage() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <div className="mb-12 space-y-4">
        <div className="flex flex-wrap gap-2">
          {highSchoolProgram.grades.map((grade) => (
            <Badge key={grade} variant="secondary">
              {grade}
            </Badge>
          ))}
        </div>
        <h1 className="text-3xl font-bold md:text-4xl">{highSchoolProgram.title}</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {highSchoolProgram.description}
        </p>
      </div>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">프로그램 특징</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {highSchoolProgram.features.map((feature) => (
            <Card key={feature}>
              <CardContent className="flex items-start gap-3 pt-4">
                <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed">{feature}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">S-Label의 강점</h2>
        <div className="space-y-4">
          {highSchoolProgram.strengths.map((strength) => (
            <div key={strength} className="flex items-start gap-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <TrophyIcon className="size-4 text-primary" />
              </div>
              <div className="pt-1.5">
                <p className="text-sm leading-relaxed">{strength}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap gap-4">
        <Button size="lg" render={<Link href="/timetable" />}>
          <CalendarIcon className="size-4" />
          시간표 확인
        </Button>
        <Button variant="outline" size="lg" render={<Link href="/curriculum" />}>
          <BookOpenIcon className="size-4" />
          커리큘럼 보기
        </Button>
      </section>
    </main>
  )
}
