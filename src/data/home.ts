import type { HeroSlide, FeatureCard } from "@/types"

export const heroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    image: "/images/hero/hero-1.jpg",
    alt: "수학 교육 이미지",
    title: "체계적인 수학 교육",
    subtitle: "학생 개개인에게 최적화된 맞춤형 커리큘럼",
  },
  {
    id: "slide-2",
    image: "/images/hero/hero-2.jpg",
    alt: "PT 시스템 이미지",
    title: "독자적 PT 시스템",
    subtitle: "타이머 관리를 통한 효율적인 학습 관리",
  },
  {
    id: "slide-3",
    image: "/images/hero/hero-3.jpg",
    alt: "학습 환경 이미지",
    title: "최적의 학습 환경",
    subtitle: "집중할 수 있는 쾌적한 학습 공간",
  },
]

export const featureCards: FeatureCard[] = [
  {
    icon: "GraduationCap",
    title: "맞춤형 커리큘럼",
    description: "학생의 수준과 목표에 맞춘 개인별 학습 로드맵을 설계합니다.",
  },
  {
    icon: "Timer",
    title: "PT 시스템",
    description: "1:1 맞춤 지도와 타이머 관리를 통해 효율적인 학습을 돕습니다.",
  },
  {
    icon: "TrendingUp",
    title: "성적 향상",
    description: "체계적인 시스템으로 꾸준한 성적 향상을 이끌어냅니다.",
  },
  {
    icon: "Users",
    title: "소수 정예",
    description: "소수 인원 수업으로 학생 한 명 한 명에게 집중합니다.",
  },
]
