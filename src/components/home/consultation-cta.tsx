import Link from "next/link"
import { Phone, ArrowRight, MessageCircle } from "lucide-react"
import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/data/site"

export function ConsultationCta() {
  return (
    <section className="relative w-full overflow-hidden bg-secondary py-section-lg">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* 영어 eyebrow "Get Started"와 스크롤 모션 제거 */}
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            지금 바로 상담 신청하세요
          </h2>

          <p className="mt-6 text-pretty text-lg text-muted-foreground">
            학생에게 맞는 최적의 학습 계획을 설계해드립니다.
            <br className="hidden sm:block" />
            부담 없이 문의해 주세요.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/consultation"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group gap-2 bg-foreground px-8 text-background hover:bg-foreground/90"
              )}
            >
              상담 신청하기
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            {/* 카톡 채널이 없으면 전화로 대체한다 — 죽은 링크를 CTA에 두지 않는다 */}
            {siteConfig.kakaoChannelUrl ? (
              <a
                href={siteConfig.kakaoChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "gap-2 border-foreground/20 px-8"
                )}
              >
                <MessageCircle className="size-4" />
                카카오톡 상담
              </a>
            ) : (
              <a
                href={`tel:${siteConfig.phone}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "gap-2 border-foreground/20 px-8"
                )}
              >
                <Phone className="size-4" />
                {siteConfig.phone}
              </a>
            )}
          </div>

          {/* Contact Info */}
          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
            <a
              href={`tel:${siteConfig.phone}`}
              className="group flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-foreground/5 transition-colors group-hover:bg-foreground/10">
                <Phone className="size-4" />
              </div>
              <div className="text-left">
                <p className="text-xs uppercase tracking-wider">전화 문의</p>
                <p className="font-semibold text-foreground">{siteConfig.phone}</p>
              </div>
            </a>
            <div className="hidden h-8 w-px bg-border sm:block" />
            <div className="text-center sm:text-left">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">위치</p>
              <p className="font-medium text-foreground">{siteConfig.address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
