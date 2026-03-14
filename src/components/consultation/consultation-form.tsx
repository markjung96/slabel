"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { consultationSchema } from "@/lib/validators"
import { usePhoneFormat } from "@/hooks/use-phone-format"
import {
  consultationTypes,
  gradeOptions,
  subjectOptions,
  referralOptions,
} from "@/data/consultation"

type FormFields = {
  type: string
  name: string
  phone: string
  grade: string
  subject: string
  school: string
  content: string
  referral: string
  privacyConsent: boolean
  _honey: string
}

type FormErrors = Partial<Record<keyof FormFields, string>>

const initialFields: FormFields = {
  type: "",
  name: "",
  phone: "",
  grade: "",
  subject: "",
  school: "",
  content: "",
  referral: "",
  privacyConsent: false,
  _honey: "",
}

export function ConsultationForm() {
  const [fields, setFields] = useState<FormFields>(initialFields)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  const phone = usePhoneFormat("")

  const setField = useCallback(<K extends keyof FormFields>(key: K, value: FormFields[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (fields._honey) {
        setSubmitResult({ success: true, message: "상담 신청이 완료되었습니다." })
        return
      }

      const payload = {
        type: fields.type,
        name: fields.name,
        phone: phone.value,
        grade: fields.grade,
        subject: fields.subject,
        school: fields.school,
        content: fields.content,
        referral: fields.referral,
        privacyConsent: fields.privacyConsent,
      }

      const result = consultationSchema.safeParse(payload)
      if (!result.success) {
        const fieldErrors: FormErrors = {}
        for (const issue of result.error.issues) {
          const key = issue.path[0] as keyof FormFields
          if (!fieldErrors[key]) {
            fieldErrors[key] = issue.message
          }
        }
        setErrors(fieldErrors)
        return
      }

      setIsLoading(true)
      setSubmitResult(null)

      try {
        const res = await fetch("/api/consultation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, _honey: fields._honey }),
        })

        const data = await res.json()

        if (res.ok && data.success) {
          setSubmitResult({ success: true, message: data.message ?? "상담 신청이 완료되었습니다." })
          setFields(initialFields)
          phone.onChange("")
        } else {
          setSubmitResult({ success: false, message: data.error ?? "오류가 발생했습니다. 다시 시도해주세요." })
        }
      } catch {
        setSubmitResult({ success: false, message: "네트워크 오류가 발생했습니다. 다시 시도해주세요." })
      } finally {
        setIsLoading(false)
      }
    },
    [fields, phone]
  )

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <input
        type="text"
        name="_honey"
        value={fields._honey}
        onChange={(e) => setField("_honey", e.target.value)}
        tabIndex={-1}
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden"
        autoComplete="off"
      />

      <div className="space-y-2">
        <Label htmlFor="type">
          구분 <span className="text-destructive">*</span>
        </Label>
        <Select value={fields.type} onValueChange={(val) => setField("type", val as string)}>
          <SelectTrigger id="type" className="w-full" aria-invalid={!!errors.type}>
            <SelectValue placeholder="구분을 선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            {consultationTypes.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">
          이름 <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          placeholder="이름을 입력해주세요"
          value={fields.name}
          onChange={(e) => setField("name", e.target.value)}
          aria-invalid={!!errors.name}
          maxLength={20}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">
          전화번호 <span className="text-destructive">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="010-0000-0000"
          value={phone.value}
          onChange={(e) => phone.onChange(e.target.value)}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="grade">
          학년 <span className="text-destructive">*</span>
        </Label>
        <Select value={fields.grade} onValueChange={(val) => setField("grade", val as string)}>
          <SelectTrigger id="grade" className="w-full" aria-invalid={!!errors.grade}>
            <SelectValue placeholder="학년을 선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            {gradeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.grade && <p className="text-sm text-destructive">{errors.grade}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">
          관심 과목 <span className="text-destructive">*</span>
        </Label>
        <Select value={fields.subject} onValueChange={(val) => setField("subject", val as string)}>
          <SelectTrigger id="subject" className="w-full" aria-invalid={!!errors.subject}>
            <SelectValue placeholder="관심 과목을 선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            {subjectOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="school">학교명</Label>
        <Input
          id="school"
          placeholder="학교명을 입력해주세요 (선택)"
          value={fields.school}
          onChange={(e) => setField("school", e.target.value)}
          maxLength={50}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">상담 내용</Label>
        <Textarea
          id="content"
          placeholder="상담하고 싶은 내용을 입력해주세요 (선택)"
          value={fields.content}
          onChange={(e) => setField("content", e.target.value)}
          maxLength={500}
          rows={5}
        />
        <p className="text-xs text-muted-foreground text-right">{fields.content.length} / 500</p>
        {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="referral">알게된 경로</Label>
        <Select value={fields.referral} onValueChange={(val) => setField("referral", val as string)}>
          <SelectTrigger id="referral" className="w-full">
            <SelectValue placeholder="알게된 경로를 선택해주세요 (선택)" />
          </SelectTrigger>
          <SelectContent>
            {referralOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <input
            id="privacyConsent"
            type="checkbox"
            checked={fields.privacyConsent}
            onChange={(e) => setField("privacyConsent", e.target.checked)}
            className="mt-0.5 h-4 w-4 cursor-pointer rounded border-input accent-primary"
            aria-invalid={!!errors.privacyConsent}
          />
          <Label htmlFor="privacyConsent" className="cursor-pointer font-normal leading-snug">
            <span className="text-destructive mr-0.5">*</span>
            <Link href="/privacy" target="_blank" className="underline underline-offset-2 hover:text-primary">
              개인정보 수집 및 이용
            </Link>
            에 동의합니다.
          </Label>
        </div>
        {errors.privacyConsent && <p className="text-sm text-destructive">{errors.privacyConsent}</p>}
      </div>

      {submitResult && (
        <div
          className={cn(
            "rounded-lg border px-4 py-3 text-sm",
            submitResult.success
              ? "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200"
              : "border-destructive/30 bg-destructive/5 text-destructive"
          )}
        >
          {submitResult.message}
        </div>
      )}

      <Button type="submit" size="lg" disabled={isLoading} className="w-full">
        {isLoading && <Loader2 className="animate-spin" />}
        {isLoading ? "신청 중..." : "상담 신청하기"}
      </Button>
    </form>
  )
}
