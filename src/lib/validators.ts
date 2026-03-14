import { z } from "zod/v4"

export const consultationSchema = z.object({
  type: z.string().min(1, "구분을 선택해주세요."),
  name: z
    .string()
    .min(2, "이름은 2자 이상 입력해주세요.")
    .max(20, "이름은 20자 이하로 입력해주세요."),
  phone: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, "올바른 전화번호 형식이 아닙니다. (010-XXXX-XXXX)"),
  grade: z.string().min(1, "학년을 선택해주세요."),
  subject: z.string().min(1, "관심 과목을 선택해주세요."),
  school: z.string().max(50, "학교명은 50자 이하로 입력해주세요.").optional().default(""),
  content: z.string().max(500, "상담 내용은 500자 이하로 입력해주세요.").optional().default(""),
  referral: z.string().optional().default(""),
  privacyConsent: z.literal(true, {
    error: "개인정보 수집 및 이용에 동의해주세요.",
  }),
})

export type ConsultationSchemaType = z.infer<typeof consultationSchema>

export const adminLoginSchema = z.object({
  password: z.string().min(1, "비밀번호를 입력해주세요."),
})

export const imageUploadSchema = z.object({
  category: z.enum(["timetable", "curriculum"]),
  grade: z.string().optional(),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "파일 크기는 5MB 이하여야 합니다.")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "JPG, PNG, WebP 형식만 업로드 가능합니다."
    ),
})
