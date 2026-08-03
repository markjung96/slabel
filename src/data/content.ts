import type {
  TargetProfile,
  ProgramStep,
  Evidence,
  ClassOffer,
  Instructor,
} from "@/types"

/**
 * 리뉴얼 콘텐츠 (REDESIGN.md 4장)
 *
 * 원장님 답변(QUESTIONS.md)이 오면 이 파일만 채우면 된다.
 * 각 배열 위 주석에 대응하는 질문 번호와 작성 규칙을 적어뒀다.
 *
 * 규칙 1. 빈 배열이면 해당 섹션은 렌더링되지 않는다.
 *         내용 없이 섹션만 띄우는 것이 지금 홈페이지의 문제였다.
 *
 * 규칙 2. 금지어 — 체계적 / 최적화 / 맞춤형 / 전문적 / 독자적 / 진정한
 *         이 단어를 쓰고 싶어지면, 그 자리에 넣을 구체적 사실이 없다는 신호다.
 *
 * 규칙 3. 형용사 대신 숫자와 명사로 쓴다.
 *         "체계적인 학습 관리" → "주 1회 리포트, 4주마다 학부모 상담"
 */

// ── 1. 이런 학생을 위한 곳입니다 ──────────────────────────────────
/**
 * QUESTIONS.md Q1 (주력 타깃 1개) + Q8 (실제 시험지·오답노트 사진)
 *
 * "모든 학생 환영"은 아무에게도 안 꽂힌다. 일부러 좁힌다.
 * 학부모가 읽고 "우리 애 얘기네"라고 느껴야 전화가 온다.
 *
 * 예시:
 * {
 *   id: "time-shortage",
 *   situation: "문제는 푸는데 시험시간이 부족합니다",
 *   detail: "아는 문제인데 시간이 없어서 못 푼 게 매번 5문항 이상입니다.",
 *   image: null,
 * }
 */
export const targetProfiles: TargetProfile[] = []

// ── 2. 8주 동안 일어나는 일 ───────────────────────────────────────
/**
 * QUESTIONS.md Q4 (첫날 실제로 하는 일), Q5 (타이머 사용법), Q6 (오답 처리)
 *
 * 지금 홈페이지의 PT 5단계는 "정밀하게 진단합니다", "최적화된 계획을
 * 수립합니다" 같은 추상 동사뿐이라 학부모가 아무것도 알 수 없다.
 * 무엇을 몇 분 동안 어떻게 하는지 적는다.
 *
 * 예시:
 * {
 *   week: "1주차",
 *   title: "진단 90분",
 *   whatWeDo: [
 *     "최근 학교 시험지를 문항별로 분석 (30분)",
 *     "진단 테스트 40문항 — 문제당 걸린 시간을 각각 기록",
 *     "틀린 문제를 개념 부족 / 계산 실수 / 시간 부족으로 분류",
 *   ],
 *   whatStudentGets: ["진단 결과지 1장", "8주 계획표 1장"],
 *   artifact: null,
 * }
 */
export const programSteps: ProgramStep[] = []

// ── 3. 결과 ───────────────────────────────────────────────────────
/**
 * QUESTIONS.md Q9 (성적 향상 사례), Q10 (학부모·학생의 말)
 *
 * "성적이 향상됩니다"는 주장이고, before/after 숫자는 증거다.
 * 이름은 넣지 않는다. 학교명은 공개 동의를 받은 경우에만.
 *
 * 예시:
 * {
 *   id: "case-1",
 *   kind: "case",
 *   grade: "중2",
 *   school: "흥덕중",
 *   before: "학교 시험 54점, 시간 부족 7문항",
 *   after: "78점, 시간 부족 2문항",
 *   period: "8주",
 *   image: null,
 *   quote: null,
 * }
 */
export const evidence: Evidence[] = []

// ── 4. 반 · 시간 · 비용 ───────────────────────────────────────────
/**
 * QUESTIONS.md Q11~Q13
 *
 * 가격을 숨기면 학부모는 "비싸겠구나" 하고 그냥 나간다.
 * 공개하는 편이 전환에 유리하다. (분당 단가로는 인근 학원과 비슷한 수준이다)
 *
 * 예시:
 * {
 *   id: "middle2",
 *   target: "중2 내신",
 *   schedule: "화·목 19:00~22:00",
 *   minutesPerMonth: 1680,
 *   monthlyFee: 360000,
 *   includes: ["주간 리포트", "오답 재시험", "자습실"],
 *   seatsLeft: 3,
 * }
 */
export const classOffers: ClassOffer[] = []

// ── 5. 강사 ───────────────────────────────────────────────────────
/**
 * QUESTIONS.md Q14 (원장 소개), Q15 (강사진)
 *
 * 학부모는 "10년 이상 경력"이라는 문구보다 얼굴과 실명 이력을 훨씬 신뢰한다.
 * 특히 "원장이 직접 지도하는 학년"이 어디인지를 궁금해한다.
 */
export const instructors: Instructor[] = []

/** 채워진 섹션만 렌더링하기 위한 플래그 */
export const contentReady = {
  targets: targetProfiles.length > 0,
  program: programSteps.length > 0,
  evidence: evidence.length > 0,
  offers: classOffers.length > 0,
  instructors: instructors.length > 0,
} as const
