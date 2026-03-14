import type { Metadata } from "next"
import localFont from "next/font/local"
import Script from "next/script"
import "./globals.css"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FloatingButtons } from "@/components/layout/floating-buttons"

const GA_ID = "G-GZ83K58NP8"

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/PretendardVariable.woff2",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
})

export const metadata: Metadata = {
  title: {
    default: "스라밸학원 | Study Life Balance",
    template: "%s | 스라밸학원",
  },
  description:
    "스라밸학원 - 체계적인 PT 시스템과 타이머 관리로 학생 개개인에게 최적화된 수학 교육을 제공합니다.",
  metadataBase: new URL("https://스라밸.com"),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "스라밸학원",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body className={`${pretendard.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "스라밸학원",
              description:
                "체계적인 PT 시스템과 타이머 관리로 학생 개개인에게 최적화된 수학 교육",
              url: "https://스라밸.com",
              telephone: "010-3977-1695",
              address: {
                "@type": "PostalAddress",
                streetAddress: "흥덕2로 85 606호",
                addressLocality: "용인시 기흥구",
                addressRegion: "경기도",
                addressCountry: "KR",
              },
            }),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black"
        >
          본문으로 건너뛰기
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  )
}
