"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploaderProps {
  category: string
  grade?: string
  onUpload: (url: string) => void
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_SIZE = 5 * 1024 * 1024

export function ImageUploader({ category, grade, onUpload }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function validateFile(file: File): string | null {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "JPG, PNG, WebP 형식만 업로드 가능합니다."
    }
    if (file.size > MAX_SIZE) {
      return "파일 크기는 5MB 이하여야 합니다."
    }
    return null
  }

  function handleFileSelect(file: File) {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }
    setError("")
    setSelectedFile(file)
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave() {
    setIsDragging(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFileSelect(file)
  }

  function clearSelection() {
    setSelectedFile(null)
    setPreview(null)
    setError("")
    if (inputRef.current) inputRef.current.value = ""
  }

  async function handleUpload() {
    if (!selectedFile) return

    setUploading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)
      formData.append("category", category)
      if (grade) formData.append("grade", grade)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (data.success) {
        onUpload(data.url)
        clearSelection()
      } else {
        setError(data.error || "업로드에 실패했습니다.")
      }
    } catch {
      setError("네트워크 오류가 발생했습니다.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {!preview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <Upload className="size-8 text-muted-foreground" />
          <div className="text-center">
            <p className="text-sm font-medium">클릭하거나 파일을 드래그하세요</p>
            <p className="mt-0.5 text-xs text-muted-foreground">JPG, PNG, WebP · 최대 5MB</p>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-lg border">
          <div className="relative aspect-video w-full bg-muted">
            <Image
              src={preview}
              alt="미리보기"
              fill
              className="object-contain"
            />
          </div>
          <button
            onClick={clearSelection}
            className="absolute right-2 top-2 rounded-md bg-background/80 p-1 hover:bg-background"
          >
            <X className="size-4" />
            <span className="sr-only">선택 취소</span>
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        onChange={handleInputChange}
        className="hidden"
      />

      {error && <p className="text-sm text-destructive">{error}</p>}

      {selectedFile && (
        <Button onClick={handleUpload} disabled={uploading}>
          {uploading ? "업로드 중..." : "업로드"}
        </Button>
      )}
    </div>
  )
}
