"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Trash2, RefreshCw } from "lucide-react"

interface ImageManagerProps {
  category: string
  images: string[]
  onDelete: (path: string) => void
  onRefresh: () => void
}

export function ImageManager({ images, onDelete, onRefresh }: ImageManagerProps) {
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  async function confirmDelete() {
    if (!deleteTarget) return

    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/images?path=${encodeURIComponent(deleteTarget)}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (data.success) {
        onDelete(deleteTarget)
      }
    } catch {
      // silent
    } finally {
      setDeleting(false)
      setDeleteTarget(null)
    }
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-12 text-muted-foreground">
        <p className="text-sm">등록된 이미지가 없습니다.</p>
        <Button variant="ghost" size="sm" onClick={onRefresh}>
          <RefreshCw className="size-3.5" />
          새로고침
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{images.length}개 이미지</p>
        <Button variant="ghost" size="sm" onClick={onRefresh}>
          <RefreshCw className="size-3.5" />
          새로고침
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((src) => (
          <div key={src} className="group relative overflow-hidden rounded-lg border bg-muted">
            <div className="relative aspect-video">
              <Image
                src={src}
                alt={src}
                fill
                className="object-cover"
              />
            </div>
            <button
              onClick={() => setDeleteTarget(src)}
              className="absolute right-1.5 top-1.5 rounded-md bg-background/80 p-1.5 opacity-0 transition-opacity hover:bg-destructive hover:text-white group-hover:opacity-100"
            >
              <Trash2 className="size-3.5" />
              <span className="sr-only">삭제</span>
            </button>
            <p className="truncate px-2 py-1 text-xs text-muted-foreground">
              {src.split("/").pop()}
            </p>
          </div>
        ))}
      </div>

      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>이미지 삭제</DialogTitle>
            <DialogDescription>
              이 이미지를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)} disabled={deleting}>
              취소
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={deleting}>
              {deleting ? "삭제 중..." : "삭제"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
