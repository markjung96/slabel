import type { Metadata } from "next"
import { Phone, Mail } from "lucide-react"

import { ConsultationForm } from "@/components/consultation/consultation-form"
import { siteConfig } from "@/data/site"

export const metadata: Metadata = {
  title: "상담신청",
  description: "스라밸학원 입학 상담을 신청하세요. 학생 개개인에게 맞는 최적의 수학 학습 플랜을 안내해드립니다.",
}

export default function ConsultationPage() {
  return (
    <main className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">상담 신청</h1>
            <p className="mt-3 text-muted-foreground">
              궁금한 점이 있으시면 편하게 상담 신청해주세요. 빠른 시일 내에 연락드리겠습니다.
            </p>
          </div>

          <ConsultationForm />

          <div className="mt-12 flex flex-col items-center gap-4 border-t pt-8 text-sm text-muted-foreground sm:flex-row sm:justify-center">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Phone className="size-4" />
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Mail className="size-4" />
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
