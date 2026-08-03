import type {
  TargetProfile,
  ProgramStep,
  Evidence,
  ClassOffer,
  Instructor,
} from "@/types"

/* ═══════════════════════════════════════════════════════════════════
 *  ⚠️  현재 이 파일의 내용은 전부 임시 데이터입니다.
 *
 *  레이아웃을 먼저 완성해 두려고 넣은 가짜 내용이며,
 *  성적 사례·후기·수강료는 실제 사실이 아닙니다.
 *  이대로 배포하면 허위·과장 광고가 됩니다.
 *
 *  원장님 답변(QUESTIONS.md)으로 교체한 뒤 IS_PLACEHOLDER를 false로
 *  바꾸면 화면 상단의 경고 배너가 사라집니다.
 * ═══════════════════════════════════════════════════════════════════ */
export const IS_PLACEHOLDER = true

/**
 * 작성 규칙 (REDESIGN.md 2장)
 *  1. 금지어 — 체계적 / 최적화 / 맞춤형 / 전문적 / 독자적 / 진정한
 *  2. 형용사 대신 숫자와 명사로. "체계적 관리" → "주 1회 리포트"
 *  3. 사진으로 보여줄 수 없는 강점은 쓰지 않는다
 */

// ── 1. 이런 학생이라면 (QUESTIONS.md Q1) ──────────────────────────
export const targetProfiles: TargetProfile[] = [
  {
    id: "time-shortage",
    situation: "아는 문제인데 시간이 모자랍니다",
    detail:
      "시험지 뒷장을 늘 못 끝냅니다. 채점해 보면 틀린 게 아니라 손도 못 댄 문항입니다.",
    image: null,
  },
  {
    id: "same-mistakes",
    situation: "숙제는 하는데 점수가 그대로입니다",
    detail:
      "문제집은 다 풀었는데 틀리는 유형이 매번 같습니다. 오답을 넘어간 채 진도만 나갑니다.",
    image: null,
  },
  {
    id: "concept-gap",
    situation: "앞 학년 개념이 비어 있습니다",
    detail:
      "지금 단원이 안 되는 게 아니라 이전 학년 내용이 빠져 있습니다. 진도를 나갈수록 벌어집니다.",
    image: null,
  },
]

// ── 2. 8주 동안 일어나는 일 (Q4·Q5·Q6) ────────────────────────────
export const programSteps: ProgramStep[] = [
  {
    week: "1주차",
    title: "진단 90분",
    whatWeDo: [
      "최근 학교 시험지를 문항별로 분석 (30분)",
      "진단 테스트 40문항 — 문제당 걸린 시간을 각각 기록",
      "틀린 문제를 개념 부족 / 계산 실수 / 시간 부족으로 분류",
    ],
    whatStudentGets: ["진단 결과지 1장", "8주 계획표 1장"],
    artifact: null,
  },
  {
    week: "2~7주차",
    title: "타이머 학습과 오답 재시험",
    whatWeDo: [
      "유형별 목표 풀이시간을 정하고 타이머로 측정",
      "목표 시간을 넘긴 문항은 표시해 다음 주에 다시 출제",
      "주 1회 학부모 리포트 발송",
    ],
    whatStudentGets: [
      "주간 리포트 (학습시간·정답률·시간 부족 문항 수)",
      "오답 재시험지",
    ],
    artifact: null,
  },
  {
    week: "8주차",
    title: "점검과 다음 계획",
    whatWeDo: [
      "1주차 진단과 같은 형식으로 다시 측정",
      "정답률과 풀이시간 변화를 한 장으로 정리",
      "학부모 상담 30분",
    ],
    whatStudentGets: ["8주 변화 비교표", "다음 8주 계획표"],
    artifact: null,
  },
]

// ── 3. 결과 (Q9·Q10) ──────────────────────────────────────────────
export const evidence: Evidence[] = [
  {
    id: "case-1",
    kind: "case",
    grade: "중2",
    school: null,
    before: "학교 시험 54점 · 시간 부족 7문항",
    after: "78점 · 시간 부족 2문항",
    period: "8주",
    image: null,
    quote: "시험 끝나고 처음으로 다 풀었다고 하더라고요.",
  },
  {
    id: "case-2",
    kind: "case",
    grade: "고1",
    school: null,
    before: "단원 정답률 62% · 계산 실수 11회",
    after: "정답률 81% · 계산 실수 4회",
    period: "8주",
    image: null,
    quote: null,
  },
]

// ── 4. 반 · 시간 · 비용 (Q11~Q13) ─────────────────────────────────
export const classOffers: ClassOffer[] = [
  {
    id: "m2",
    target: "중2 내신",
    schedule: "화·목 19:00~22:00",
    minutesPerMonth: 1680,
    monthlyFee: 360000,
    includes: ["주간 리포트", "오답 재시험", "자습실"],
    seatsLeft: 3,
  },
  {
    id: "m3",
    target: "중3 내신 · 고등 대비",
    schedule: "월·수·금 19:00~22:00",
    minutesPerMonth: 2520,
    monthlyFee: 480000,
    includes: ["주간 리포트", "오답 재시험", "자습실", "월 1회 학부모 상담"],
    seatsLeft: 2,
  },
  {
    id: "h1",
    target: "고1 내신",
    schedule: "화·목·토 19:00~22:00",
    minutesPerMonth: 2520,
    monthlyFee: 580000,
    includes: ["주간 리포트", "오답 재시험", "자습실", "월 1회 학부모 상담"],
    seatsLeft: null,
  },
]

// ── 5. 강사 (Q14·Q15) ─────────────────────────────────────────────
export const instructors: Instructor[] = [
  {
    name: "이태윤",
    role: "원장",
    subjects: ["수학"],
    grades: ["중1~고3"],
    career: ["강의 경력 10년", "중등·고등 수학 직접 지도"],
    photo: null,
  },
]
