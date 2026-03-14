import Image from "next/image"
import Link from "next/link"

import { navigationItems } from "@/data/navigation"
import { siteConfig } from "@/data/site"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={120}
                height={36}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-background/60 text-sm leading-relaxed">
              체계적인 PT 시스템과 타이머 관리로 학생 개개인에게 최적화된 수학 교육을 제공합니다.
            </p>
            <address className="not-italic text-sm mt-6 space-y-2 text-background/70">
              <p>{siteConfig.address}</p>
              <p>
                <a 
                  href={`tel:${siteConfig.phone}`} 
                  className="hover:text-background transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </p>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              메뉴
            </h3>
            <ul className="space-y-3">
              {navigationItems.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Chat Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              상담
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={siteConfig.kakaoChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm text-background/60 hover:text-background transition-colors"
                >
                  <span className="inline-flex size-6 items-center justify-center rounded bg-[#FEE500]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#000000" aria-hidden="true">
                      <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.555 1.47 4.813 3.727 6.237L4.5 21l4.763-2.5C10.01 18.826 11 18.966 12 18.966c5.523 0 10-3.477 10-7.966C22 6.477 17.523 3 12 3z" />
                    </svg>
                  </span>
                  카카오톡 채널
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.naverTalkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm text-background/60 hover:text-background transition-colors"
                >
                  <span className="inline-flex size-6 items-center justify-center rounded bg-[#03C75A]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
                      <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
                    </svg>
                  </span>
                  네이버 톡톡
                </a>
              </li>
              <li>
                <Link
                  href="/consultation"
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  상담 신청하기
                </Link>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              오시는 길
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={siteConfig.naverMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  네이버 지도
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.kakaoMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  카카오 지도
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-background/10">
          <p className="text-center text-sm text-background/50">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
