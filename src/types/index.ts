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

export interface SiteConfig {
  name: string
  description: string
  url: string
  logo: string
  address: string
  phone: string
  email: string
  kakaoChannelUrl: string
  naverTalkUrl: string
  blogUrl: string
  naverMapUrl: string
  kakaoMapUrl: string
}

export interface SelectOption {
  value: string
  label: string
}
