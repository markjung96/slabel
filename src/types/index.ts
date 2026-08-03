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

/* ────────────────────────────────────────────────────────────────
 * 리뉴얼용 콘텐츠 스키마 (REDESIGN.md 4장)
 *
 * 원장님 답변(QUESTIONS.md)이 오는 대로 바로 꽂을 수 있도록 틀을 먼저 정의한다.
 *
 * 설계 의도:
 * artifact / image / before / after 같은 필드는 추상적인 문장으로는 채울 수 없다.
 * 실물이나 숫자가 있어야만 채워지므로, 스키마 자체가
 * "체계적인 관리" 같은 일반론이 다시 들어오는 것을 막는 장치다.
 *
 * 빈 배열이면 해당 섹션은 렌더링하지 않는다.
 * ──────────────────────────────────────────────────────────────── */

/** 1번 페이지: 우리가 받는 학생을 명확히 한다 (QUESTIONS.md Q1) */
export interface TargetProfile {
  id: string
  /** 학부모가 자기 아이를 알아볼 수 있는 한 문장 */
  situation: string
  /** 구체적 증상 서술 */
  detail: string
  /** 실제 시험지·오답노트 사진 (QUESTIONS.md Q8) */
  image: string | null
}

/** 2번 페이지: 8주 동안 실제로 일어나는 일 (QUESTIONS.md Q4·Q5·Q6) */
export interface ProgramStep {
  /** "1주차" | "2~7주차" | "8주차" */
  week: string
  /** "진단 90분" 처럼 무엇을 하는 시간인지 */
  title: string
  /** 원장이 하는 일. 추상 동사 말고 구체적으로. */
  whatWeDo: string[]
  /** 학생이 받는 것. 실물 명사로. */
  whatStudentGets: string[]
  /** 그 주에 나오는 산출물 사진 */
  artifact: string | null
}

/** 3번 페이지: 증거 (QUESTIONS.md Q9·Q10) */
export interface Evidence {
  id: string
  kind: "report" | "case" | "review"
  grade: string
  /** 공개 동의를 받은 경우에만 */
  school: string | null
  /** "정답률 62%, 시간 부족 7문항" */
  before: string
  /** "정답률 81%, 시간 부족 3문항" */
  after: string
  period: string
  /** 이름을 가린 리포트 실물 */
  image: string | null
  quote: string | null
}

/** 4번 페이지: 반과 비용 — 가격 장벽을 미리 제거한다 (QUESTIONS.md Q11~Q13) */
export interface ClassOffer {
  id: string
  target: string
  schedule: string
  minutesPerMonth: number
  monthlyFee: number
  includes: string[]
  seatsLeft: number | null
}

/** 5번: 강사 — 얼굴과 실명 이력이 "10년 경력"보다 훨씬 강하다 (QUESTIONS.md Q14·Q15) */
export interface Instructor {
  name: string
  role: string
  subjects: string[]
  grades: string[]
  career: string[]
  photo: string | null
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
