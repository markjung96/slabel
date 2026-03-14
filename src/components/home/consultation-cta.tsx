"use client"

import Link from "next/link"
import { Phone } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ConsultationCta() {
  return (
    <section className="w-full bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            지금 바로 상담 신청하세요
          </h2>
          <p className="mt-4 text-primary-foreground/80 md:text-lg">
            학생에게 맞는 최적의 학습 계획을 설계해드립니다.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/consultation"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white text-white hover:bg-white hover:text-primary")}
            >
              상담 신청하기
            </Link>
            <a
              href="tel:010-3977-1695"
              className="flex items-center gap-2 text-primary-foreground/80 transition-colors hover:text-primary-foreground"
            >
              <Phone className="size-4" />
              <span className="font-medium">010-3977-1695</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
