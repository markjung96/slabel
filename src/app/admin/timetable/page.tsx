"use client"

import { useEffect, useState, useCallback } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUploader } from "@/components/admin/image-uploader"
import Image from "next/image"

const GRADES = [
  { id: "middle1", label: "중1" },
  { id: "middle2", label: "중2" },
  { id: "middle3", label: "중3" },
  { id: "high1", label: "고1" },
  { id: "high2", label: "고2" },
  { id: "high3", label: "고3" },
]

export default function TimetablePage() {
  const [images, setImages] = useState<Record<string, string | null>>({})
  const [loading, setLoading] = useState(true)

  const fetchImages = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/images?category=timetable")
      const data = await res.json()

      const imageMap: Record<string, string | null> = {}
      for (const grade of GRADES) {
        const match = (data.images as string[])?.find(
          (p) =>
            p.includes(`/${grade.id}-`) ||
            p.includes(`/${grade.id}.`)
        )
        imageMap[grade.id] = match ?? null
      }
      setImages(imageMap)
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  function handleUpload(gradeId: string, url: string) {
    setImages((prev) => ({ ...prev, [gradeId]: url }))
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">시간표 관리</h1>
        <p className="mt-1 text-sm text-muted-foreground">학년별 시간표 이미지를 업로드하세요.</p>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">불러오는 중...</p>
      ) : (
        <Tabs defaultValue="middle1">
          <TabsList>
            {GRADES.map((grade) => (
              <TabsTrigger key={grade.id} value={grade.id}>
                {grade.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {GRADES.map((grade) => (
            <TabsContent key={grade.id} value={grade.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{grade.label} 시간표</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {images[grade.id] ? (
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium text-muted-foreground">현재 등록된 이미지</p>
                      <div className="relative aspect-video w-full max-w-lg overflow-hidden rounded-lg border bg-muted">
                        <Image
                          src={images[grade.id]!}
                          alt={`${grade.label} 시간표`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center rounded-lg border border-dashed py-8 text-sm text-muted-foreground">
                      미등록
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5">
                    <p className="text-sm font-medium">
                      {images[grade.id] ? "이미지 교체" : "이미지 업로드"}
                    </p>
                    <ImageUploader
                      category="timetable"
                      grade={grade.id}
                      onUpload={(url) => handleUpload(grade.id, url)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  )
}
