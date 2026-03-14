import type { PtSystemStep, PtSystemFeature } from "@/types"

export const ptSystemIntro = {
  title: "S-Label PT 시스템",
  subtitle: "체계적인 1:1 맞춤 학습 관리",
  description:
    "S-Label만의 독자적인 PT 시스템은 학생 개개인의 학습 상태를 정밀하게 진단하고, 타이머 기반의 체계적인 학습 관리를 통해 최적의 학습 효과를 이끌어냅니다.",
}

export const timerManagement = {
  title: "타이머 관리 시스템",
  description:
    "S-Label의 타이머 관리 시스템은 학생의 학습 시간을 체계적으로 관리합니다. 문제 풀이 시간, 복습 시간, 테스트 시간을 정밀하게 측정하고 관리하여 효율적인 학습 습관을 형성합니다.",
  benefits: [
    "학습 시간의 체계적 관리로 집중력 향상",
    "문제 풀이 속도 향상을 위한 시간 측정",
    "개인별 최적 학습 패턴 분석",
    "시험 시간 관리 능력 배양",
  ],
}

export const ptSteps: PtSystemStep[] = [
  {
    step: 1,
    title: "진단 테스트",
    description: "학생의 현재 수준과 취약 단원을 정밀하게 진단합니다.",
  },
  {
    step: 2,
    title: "맞춤 커리큘럼 설계",
    description: "진단 결과를 바탕으로 학생에게 최적화된 학습 계획을 수립합니다.",
  },
  {
    step: 3,
    title: "타이머 기반 학습",
    description: "타이머 관리를 통해 효율적인 문제 풀이와 학습을 진행합니다.",
  },
  {
    step: 4,
    title: "1:1 피드백",
    description: "학습 결과를 분석하고 개인별 맞춤 피드백을 제공합니다.",
  },
  {
    step: 5,
    title: "반복 학습 & 테스트",
    description: "취약 부분을 집중 보완하고 정기 테스트로 성취도를 확인합니다.",
  },
]

export const ptFeatures: PtSystemFeature[] = [
  {
    title: "1:1 맞춤 지도",
    description: "학생 개개인의 수준과 학습 스타일에 맞는 개별 지도",
    details: [
      "학생별 취약 단원 집중 관리",
      "개인별 학습 속도에 맞춘 진도 조절",
      "수시 상담을 통한 학습 동기 부여",
    ],
  },
  {
    title: "체계적 시간 관리",
    description: "타이머를 활용한 효율적인 학습 시간 관리",
    details: [
      "문제 풀이 시간 측정 및 분석",
      "시험 시간 배분 연습",
      "학습 집중도 향상 훈련",
    ],
  },
  {
    title: "정기 테스트 & 분석",
    description: "주기적인 테스트와 결과 분석을 통한 학습 성취도 관리",
    details: [
      "주간/월간 단원별 테스트",
      "오답 분석 및 취약점 보완",
      "성적 추이 분석 리포트",
    ],
  },
]
