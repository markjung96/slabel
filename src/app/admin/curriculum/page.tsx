"use client"

import { useEffect, useState, useCallback } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUploader } from "@/components/admin/image-uploader"
import { ImageManager } from "@/components/admin/image-manager"

const CATEGORIES = [
  { id: "curriculum-middle", label: "중등부" },
  { id: "curriculum-high", label: "고등부" },
]

export default function CurriculumPage() {
  const [images, setImages] = useState<Record<string, string[]>>({
    "curriculum-middle": [],
    "curriculum-high": [],
  })
  const [loading, setLoading] = useState(true)

  const fetchImages = useCallback(async (categoryId: string) => {
    try {
      const res = await fetch(`/api/admin/images?category=${categoryId}`)
      const data = await res.json()
      setImages((prev) => ({ ...prev, [categoryId]: data.images ?? [] }))
    } catch {
      // silent
    }
  }, [])

  useEffect(() => {
    async function loadAll() {
      setLoading(true)
      await Promise.all(CATEGORIES.map((c) => fetchImages(c.id)))
      setLoading(false)
    }
    loadAll()
  }, [fetchImages])

  function handleUpload(categoryId: string, url: string) {
    setImages((prev) => ({
      ...prev,
      [categoryId]: [...(prev[categoryId] ?? []), url],
    }))
  }

  function handleDelete(categoryId: string, path: string) {
    setImages((prev) => ({
      ...prev,
      [categoryId]: (prev[categoryId] ?? []).filter((p) => p !== path),
    }))
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">커리큘럼 관리</h1>
        <p className="mt-1 text-sm text-muted-foreground">커리큘럼 이미지를 업로드하고 관리하세요.</p>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">불러오는 중...</p>
      ) : (
        <Tabs defaultValue="curriculum-middle">
          <TabsList>
            {CATEGORIES.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {CATEGORIES.map((cat) => (
            <TabsContent key={cat.id} value={cat.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{cat.label} 커리큘럼</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5">
                    <p className="text-sm font-medium">새 이미지 추가</p>
                    <ImageUploader
                      category={cat.id}
                      onUpload={(url) => handleUpload(cat.id, url)}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-medium">등록된 이미지</p>
                    <ImageManager
                      category={cat.id}
                      images={images[cat.id] ?? []}
                      onDelete={(path) => handleDelete(cat.id, path)}
                      onRefresh={() => fetchImages(cat.id)}
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
