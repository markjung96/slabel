"use client"

import { useState, useCallback } from "react"

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11)

  if (digits.length <= 3) return digits
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
}

export function usePhoneFormat(initialValue = "") {
  const [value, setValue] = useState(formatPhoneNumber(initialValue))

  const onChange = useCallback((input: string) => {
    setValue(formatPhoneNumber(input))
  }, [])

  const rawDigits = value.replace(/\D/g, "")

  return { value, rawDigits, onChange }
}
