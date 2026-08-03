export interface NavigationItem {
  label: string
  href: string
  children?: NavigationItem[]
}

export interface HeroSlide {
  id: string
  image: string
  alt: string
  title: string
  subtitle: string
}

export interface FeatureCard {
  icon: string
  title: string
  description: string
}

export interface PtSystemStep {
  step: number
  title: string
  description: string
}

export interface PtSystemFeature {
  title: string
  description: string
  details: string[]
}

export interface ProgramInfo {
  title: string
  description: string
  grades: string[]
  features: string[]
  strengths: string[]
}

export interface BlogCard {
  id: string
  title: string
  description: string
  thumbnail: string
  url: string
  date: string
}

export interface TimetableGrade {
  id: string
  label: string
  category: "middle" | "high"
  image: string | null
}

export interface CurriculumItem {
  id: string
  category: "middle" | "high"
  label: string
  image: string
  order: number
}

export interface ConsultationFormData {
  type: string
  name: string
  phone: string
  grade: string
  subject: string
  school: string
  content: string
  referral: string
  privacyConsent: boolean
}

/**
 * 아직 실제 값이 준비되지 않은 채널은 null로 둔다.
 * null인 채널은 UI에서 렌더링하지 않는다 (죽은 링크 노출 방지).
 */
export interface SiteConfig {
  name: string
  description: string
  url: string
  logo: string
  address: string
  phone: string
  email: string | null
  kakaoChannelUrl: string | null
  naverTalkUrl: string | null
  blogUrl: string | null
  naverMapUrl: string
  kakaoMapUrl: string
}

export interface SelectOption {
  value: string
  label: string
}
