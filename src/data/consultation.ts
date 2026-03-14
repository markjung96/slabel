import type { SelectOption } from "@/types"

export const consultationTypes: SelectOption[] = [
  { value: "parent", label: "학부모" },
  { value: "student", label: "학생" },
  { value: "other", label: "기타" },
]

export const gradeOptions: SelectOption[] = [
  { value: "middle-1", label: "중1" },
  { value: "middle-2", label: "중2" },
  { value: "middle-3", label: "중3" },
  { value: "high-1", label: "고1" },
  { value: "high-2", label: "고2" },
  { value: "high-3", label: "고3" },
]

export const subjectOptions: SelectOption[] = [
  { value: "math-common", label: "수학 (공통)" },
  { value: "math-1", label: "수학 I" },
  { value: "math-2", label: "수학 II" },
  { value: "calculus", label: "미적분" },
  { value: "probability", label: "확률과 통계" },
  { value: "geometry", label: "기하" },
]

export const referralOptions: SelectOption[] = [
  { value: "search", label: "인터넷 검색" },
  { value: "recommendation", label: "지인 추천" },
  { value: "blog", label: "블로그" },
  { value: "flyer", label: "전단지" },
  { value: "other", label: "기타" },
]
