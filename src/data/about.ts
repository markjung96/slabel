import { siteConfig } from "@/data/site"

export const aboutContent = {
  intro: {
    title: "스라밸학원 (S-Label)",
    description:
      "스라밸학원은 체계적인 PT 시스템과 타이머 관리를 통해 학생 개개인에게 최적화된 수학 교육을 제공하는 중·고등 수학 전문학원입니다. 무작정 오래 앉아 있는 공부가 아니라, 정해진 시간 안에 문제를 풀고 오답을 끝내는 학습 습관을 만듭니다.",
  },
  features: [
    {
      title: "체계적인 학습 관리",
      description: "PT 시스템과 타이머 관리를 통한 철저한 학습 시간 관리",
    },
    {
      title: "맞춤형 교육",
      description: "학생의 수준과 목표에 맞는 개인별 커리큘럼 설계",
    },
    {
      title: "소수 정예 수업",
      description: "소수 인원으로 밀도 높은 수업과 개별 피드백 제공",
    },
    {
      title: "꾸준한 성적 향상",
      description: "체계적인 복습과 테스트를 통한 지속적인 성적 관리",
    },
  ],
  location: {
    /** 연락처·주소는 siteConfig 하나만 고쳐도 전 페이지에 반영되도록 참조한다 */
    address: siteConfig.address,
    phone: siteConfig.phone,
    /** 건물을 못 찾는 것이 방문 상담 이탈의 흔한 원인이라 랜드마크를 명시한다 */
    landmark: "우연프라자 6층 606호 (이마트 건너편)",
    /**
     * TODO(원장): 실제 정보 확인 후 채울 것. null이면 해당 카드는 표시되지 않는다.
     * 추측으로 채우면 안 된다 — 잘못된 안내는 없는 것보다 나쁘다.
     */
    transportation: {
      subway: null as string | null, // 예: "청명역 O번 출구에서 도보 O분"
      bus: null as string | null, // 예: "OO번, OO번 버스 흥덕지구 하차"
      parking: null as string | null, // 예: "건물 지하주차장 이용 (O시간 무료)"
    },
  },
}
