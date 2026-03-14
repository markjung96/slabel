import type { NavigationItem } from "@/types"

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
  { label: "블로그", href: "/blog" },
  { label: "상담신청", href: "/consultation" },
]
