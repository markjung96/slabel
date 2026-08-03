"use client"

import { usePathname } from "next/navigation"

/**
 * 공개 사이트 전용 껍데기(헤더/푸터/플로팅 버튼)를 감싼다.
 *
 * 관리자 페이지는 루트 레이아웃 아래에 중첩되어 있어서
 * 학부모용 헤더·푸터·"카카오톡 상담" 플로팅 버튼이 관리자 화면에도
 * 그대로 겹쳐 나오고 있었다. /admin 경로에서는 렌더링하지 않는다.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith("/admin")) return null
  return <>{children}</>
}
