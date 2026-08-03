import { AlertTriangle } from "lucide-react"

import { IS_PLACEHOLDER } from "@/data/content"

/**
 * 임시 데이터 경고 배너.
 *
 * 레이아웃을 먼저 완성하려고 가짜 성적 사례·후기·수강료를 넣어둔 상태다.
 * 이대로 배포되면 허위 광고가 되므로, 눈에 띄게 표시해서
 * 교체 전에 라이브로 나가는 일이 없게 한다.
 *
 * src/data/content.ts의 IS_PLACEHOLDER를 false로 바꾸면 사라진다.
 */
export function PlaceholderBanner() {
  if (!IS_PLACEHOLDER) return null

  return (
    <div className="sticky top-0 z-[60] flex items-center justify-center gap-2 bg-destructive px-4 py-2 text-center text-sm font-medium text-white">
      <AlertTriangle className="size-4 shrink-0" />
      <span>
        준비 중인 화면입니다. 성적 사례·후기·수강료는 임시 예시이며 실제 정보가
        아닙니다.
      </span>
    </div>
  )
}
