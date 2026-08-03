import type { NavigationItem } from "@/types"
import { blogCards } from "@/data/blog"
import { siteConfig } from "@/data/site"

/**
 * 내용이 없는 메뉴는 노출하지 않는다.
 * "블로그"를 눌렀는데 빈 페이지가 나오면 다른 메뉴도 안 눌러본다.
 * 글을 발행하거나 blogUrl을 채우면 자동으로 메뉴가 다시 나타난다.
 */
const hasBlog = blogCards.length > 0 || Boolean(siteConfig.blogUrl)

export const navigationItems: NavigationItem[] = [
  { label: "학원 소개", href: "/about" },
  { label: "PT 시스템", href: "/pt-system" },
  { label: "시간표", href: "/timetable" },
  {
    label: "프로그램",
    href: "#",
    children: [
      { label: "고등부", href: "/high-school" },
      { label: "중등부", href: "/middle-school" },
    ],
  },
  { label: "커리큘럼", href: "/curriculum" },
  ...(hasBlog ? [{ label: "블로그", href: "/blog" }] : []),
  { label: "상담신청", href: "/consultation" },
]
