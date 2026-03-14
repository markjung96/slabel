"use client"

import { useState } from "react"
import Image from "next/image"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImageZoomModal } from "@/components/timetable/image-zoom-modal"
import type { TimetableGrade } from "@/types"

interface TimetableViewerProps {
  grades: TimetableGrade[]
}

export function TimetableViewer({ grades }: TimetableViewerProps) {
  const [selectedGrade, setSelectedGrade] = useState(grades[0]?.id ?? "")
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSrc, setModalSrc] = useState("")
  const [modalAlt, setModalAlt] = useState("")

  const currentGrade = grades.find((g) => g.id === selectedGrade)

  function handleImageClick(src: string, alt: string) {
    setModalSrc(src)
    setModalAlt(alt)
    setModalOpen(true)
  }

  return (
    <div className="w-full">
      <div className="hidden md:block">
        <Tabs value={selectedGrade} onValueChange={setSelectedGrade}>
          <TabsList className="mb-6 h-auto w-full flex-wrap gap-1 bg-muted p-1">
            {grades.map((grade) => (
              <TabsTrigger key={grade.id} value={grade.id} className="flex-1">
                {grade.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {grades.map((grade) => (
            <TabsContent key={grade.id} value={grade.id}>
              <GradeDisplay grade={grade} onImageClick={handleImageClick} />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="md:hidden">
        <Select value={selectedGrade} onValueChange={(v) => v !== null && setSelectedGrade(v)}>
          <SelectTrigger className="mb-6 w-full">
            <SelectValue placeholder="학년 선택" />
          </SelectTrigger>
          <SelectContent>
            {grades.map((grade) => (
              <SelectItem key={grade.id} value={grade.id}>
                {grade.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {currentGrade && (
          <GradeDisplay grade={currentGrade} onImageClick={handleImageClick} />
        )}
      </div>

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

interface GradeDisplayProps {
  grade: TimetableGrade
  onImageClick: (src: string, alt: string) => void
}

function GradeDisplay({ grade, onImageClick }: GradeDisplayProps) {
  const [loaded, setLoaded] = useState(false)

  if (!grade.image) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-muted/30 text-muted-foreground">
        <CalendarIcon className="size-12 opacity-40" />
        <p className="text-base font-medium">준비 중입니다</p>
        <p className="text-sm">{grade.label} 시간표를 준비하고 있습니다.</p>
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse rounded-xl bg-muted" />
      )}
      <button
        type="button"
        className={cn(
          "block w-full cursor-zoom-in transition-opacity",
          !loaded && "opacity-0"
        )}
        onClick={() => onImageClick(grade.image!, grade.label)}
        aria-label={`${grade.label} 시간표 크게 보기`}
      >
        <Image
          src={grade.image}
          alt={`${grade.label} 시간표`}
          width={1200}
          height={900}
          className="h-auto w-full rounded-xl object-contain"
          onLoad={() => setLoaded(true)}
        />
      </button>
    </div>
  )
}
