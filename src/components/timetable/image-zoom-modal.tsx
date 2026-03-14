"use client"

import Image from "next/image"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogPortal,
} from "@/components/ui/dialog"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { Button } from "@/components/ui/button"

interface ImageZoomModalProps {
  src: string
  alt: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ImageZoomModal({ src, alt, open, onOpenChange }: ImageZoomModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogPrimitive.Backdrop
          data-slot="dialog-overlay"
          className={cn(
            "fixed inset-0 isolate z-50 bg-black/90 duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
          )}
        />
        <DialogPrimitive.Popup
          data-slot="dialog-content"
          className="fixed inset-0 z-50 flex items-center justify-center outline-none data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
        >
          <div
            className="relative flex h-full w-full items-center justify-center overflow-auto"
            style={{ touchAction: "manipulation" }}
          >
            <div className="relative max-h-[90vh] max-w-[90vw]">
              <Image
                src={src}
                alt={alt}
                width={1200}
                height={900}
                className="h-auto max-h-[90vh] w-auto max-w-[90vw] rounded-lg object-contain"
              />
            </div>
          </div>
          <DialogPrimitive.Close
            render={
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20 hover:text-white"
              />
            }
          >
            <XIcon className="size-5" />
            <span className="sr-only">닫기</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  )
}
