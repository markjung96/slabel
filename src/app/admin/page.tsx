"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen, ImageIcon } from "lucide-react"

interface Counts {
  timetable: number
  curriculum: number
}

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<Counts>({ timetable: 0, curriculum: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [timetableRes, curriculumRes] = await Promise.all([
          fetch("/api/admin/images?category=timetable"),
          fetch("/api/admin/images?category=curriculum"),
        ])

        const [timetableData, curriculumData] = await Promise.all([
          timetableRes.json(),
          curriculumRes.json(),
        ])

        setCounts({
          timetable: timetableData.images?.length ?? 0,
          curriculum: curriculumData.images?.length ?? 0,
        })
      } catch {
        // silent
      } finally {
        setLoading(false)
      }
    }

    fetchCounts()
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">대시보드</h1>
        <p className="mt-1 text-sm text-muted-foreground">스라밸학원 관리 시스템</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-muted-foreground" />
              <CardTitle>시간표 이미지</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {loading ? "-" : counts.timetable}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">등록된 학년 시간표</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="size-4 text-muted-foreground" />
              <CardTitle>커리큘럼 이미지</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {loading ? "-" : counts.curriculum}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">등록된 커리큘럼 이미지</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ImageIcon className="size-4 text-muted-foreground" />
              <CardTitle>전체 이미지</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {loading ? "-" : counts.timetable + counts.curriculum}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">업로드된 이미지 합계</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button render={<Link href="/admin/timetable" />}>
          시간표 관리
        </Button>
        <Button variant="outline" render={<Link href="/admin/curriculum" />}>
          커리큘럼 관리
        </Button>
      </div>
    </div>
  )
}
