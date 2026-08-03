import { AlertTriangle } from "lucide-react"

import { storageMode } from "@/lib/storage"

/**
 * Vercel은 파일시스템이 읽기 전용이고 배포마다 초기화된다.
 * BLOB_READ_WRITE_TOKEN이 없으면 업로드한 이미지가 사라지는데,
 * 화면에는 성공한 것처럼 보여서 원인을 알기 어렵다.
 * 그래서 저장소 상태를 관리자에게 명시적으로 알린다.
 */
export function StorageNotice() {
  if (storageMode() === "blob") return null

  return (
    <div className="flex items-start gap-3 rounded-lg border border-amber-500/40 bg-amber-500/5 p-4">
      <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
      <div className="text-sm">
        <p className="font-medium">
          이미지 저장소가 연결되지 않았습니다
        </p>
        <p className="mt-1 text-muted-foreground">
          지금은 서버 파일시스템에 저장합니다. 로컬 개발에서는 정상이지만,
          배포 환경에서는 <strong>업로드한 이미지가 다음 배포 때 사라집니다.</strong>
        </p>
        <p className="mt-2 text-muted-foreground">
          Vercel 대시보드 &gt; Storage &gt; Create Blob Store로 스토어를 만들고
          프로젝트에 연결하면 <code>BLOB_READ_WRITE_TOKEN</code>이 자동으로 주입됩니다.
        </p>
      </div>
    </div>
  )
}
