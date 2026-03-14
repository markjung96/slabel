"use client"

import { useState } from "react"
import Image from "next/image"
import { BookOpenIcon } from "lucide-react"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { ImageZoomModal } from "@/components/timetable/image-zoom-modal"
import type { CurriculumItem } from "@/types"

interface CurriculumGalleryProps {
  items: CurriculumItem[]
}

export function CurriculumGallery({ items }: CurriculumGalleryProps) {
  const [activeTab, setActiveTab] = useState<"middle" | "high">("middle")
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSrc, setModalSrc] = useState("")
  const [modalAlt, setModalAlt] = useState("")

  function handleImageClick(src: string, alt: string) {
    setModalSrc(src)
    setModalAlt(alt)
    setModalOpen(true)
  }

  const middleItems = items
    .filter((i) => i.category === "middle")
    .sort((a, b) => a.order - b.order)

  const highItems = items
    .filter((i) => i.category === "high")
    .sort((a, b) => a.order - b.order)

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "middle" | "high")}>
        <TabsList className="mb-8">
          <TabsTrigger value="middle">중등부</TabsTrigger>
          <TabsTrigger value="high">고등부</TabsTrigger>
        </TabsList>

        <TabsContent value="middle">
          <ItemGrid items={middleItems} onImageClick={handleImageClick} />
        </TabsContent>

        <TabsContent value="high">
          <ItemGrid items={highItems} onImageClick={handleImageClick} />
        </TabsContent>
      </Tabs>

      {modalSrc && (
        <ImageZoomModal
          src={modalSrc}
          alt={modalAlt}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      )}
    </div>
  )
}

interface ItemGridProps {
  items: CurriculumItem[]
  onImageClick: (src: string, alt: string) => void
}

function ItemGrid({ items, onImageClick }: ItemGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-muted/30 text-muted-foreground">
        <BookOpenIcon className="size-12 opacity-40" />
        <p className="text-base font-medium">등록된 커리큘럼이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden p-0">
          <button
            type="button"
            className="block w-full cursor-zoom-in"
            onClick={() => onImageClick(item.image, item.label)}
            aria-label={`${item.label} 크게 보기`}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </button>
          <div className="px-4 py-3">
            <p className="text-sm font-medium">{item.label}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
