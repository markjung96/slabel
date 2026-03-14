import Image from "next/image"
import Link from "next/link"

import { navigationItems } from "@/data/navigation"
import { siteConfig } from "@/data/site"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={120}
                height={36}
                className="brightness-0 invert"
              />
            </Link>
            <p className="text-lg font-semibold text-white mb-3">{siteConfig.name}</p>
            <address className="not-italic text-sm space-y-1.5 text-gray-400">
              <p>{siteConfig.address}</p>
              <p>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </p>
            </address>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              빠른 링크
            </h3>
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mt-1 ml-3 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="text-sm text-gray-500 hover:text-white transition-colors"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              채팅 상담
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={siteConfig.kakaoChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <span className="inline-flex size-5 items-center justify-center rounded bg-[#FEE500]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#000000" aria-hidden="true">
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
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <span className="inline-flex size-5 items-center justify-center rounded bg-[#03C75A]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
                      <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
                    </svg>
                  </span>
                  네이버 톡톡
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              오시는 길
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={siteConfig.naverMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  네이버 지도
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.kakaoMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  카카오 지도
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <p className="text-center text-sm text-gray-500">
          © {currentYear} 스라밸학원. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
