import fs from "fs/promises"
import path from "path"
import crypto from "crypto"
import { put, list } from "@vercel/blob"

import type { ConsultationFormData } from "@/types"

/**
 * 상담 신청 영구 보관.
 *
 * 왜 필요한가:
 * 이 학원은 개설 이후 홈페이지로 들어온 상담 신청을 한 건도 받지 못했다.
 * 알림 메일 설정이 placeholder였는데 코드가 "성공"으로 처리했기 때문이다.
 * 메일은 언제든 실패한다(키 만료, 도메인 인증 해제, 스팸함, 발송 한도).
 * 그래서 메일과 무관하게 신청 내용을 먼저 저장한다.
 *
 * 왜 암호화하는가:
 * 신청서에는 이름·전화번호·학교 같은 개인정보가 들어간다.
 * Vercel Blob은 public 접근만 지원하므로 URL이 노출되면 그대로 읽힌다.
 * 저장 전에 AES-256-GCM으로 암호화해서, URL이 새더라도 내용은 읽을 수 없게 한다.
 *
 * 한계:
 * 정공법은 Postgres 같은 실제 DB에 넣고 접근을 통제하는 것이다.
 * 문의 건수가 늘면 DB로 옮겨야 한다. 지금은 "다시는 유실되지 않는 것"이 우선이다.
 */

export interface Lead extends ConsultationFormData {
  id: string
  createdAt: string
  /** 알림 메일이 실제로 발송됐는지 */
  notified: boolean
}

const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN)
const BLOB_PREFIX = "leads"
const LOCAL_DIR = path.join(process.cwd(), ".data", "leads")

/**
 * 암호화 키는 ADMIN_SECRET과 분리한다.
 * ADMIN_SECRET은 로그인 토큰 서명용이라 주기적으로 회전해야 하는데,
 * 여기에 데이터 암호화까지 묶어두면 비밀번호를 바꾸는 순간
 * 그동안 쌓인 상담 신청을 전부 못 읽게 된다.
 * LEADS_SECRET은 한 번 정하면 바꾸지 않는다.
 */
function getKey(): Buffer {
  const secret = process.env.LEADS_SECRET || process.env.ADMIN_SECRET
  if (!secret) {
    throw new Error("LEADS_SECRET (또는 ADMIN_SECRET) 환경변수가 설정되지 않았습니다")
  }
  return crypto.scryptSync(secret, "slabel-leads", 32)
}

function encrypt(plain: string): string {
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv("aes-256-gcm", getKey(), iv)
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()])
  /* iv:authTag:ciphertext */
  return [iv, cipher.getAuthTag(), enc].map((b) => b.toString("base64")).join(":")
}

function decrypt(payload: string): string {
  const [ivB64, tagB64, dataB64] = payload.split(":")
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    getKey(),
    Buffer.from(ivB64, "base64")
  )
  decipher.setAuthTag(Buffer.from(tagB64, "base64"))
  return Buffer.concat([
    decipher.update(Buffer.from(dataB64, "base64")),
    decipher.final(),
  ]).toString("utf8")
}

function makeId(createdAt: string): string {
  /* 시간순 정렬이 되도록 타임스탬프를 앞에 두고, 뒤에 추측 방지용 난수를 붙인다 */
  return `${createdAt.replace(/[:.]/g, "-")}-${crypto.randomBytes(8).toString("hex")}`
}

export async function saveLead(
  data: ConsultationFormData,
  notified: boolean
): Promise<Lead> {
  const createdAt = new Date().toISOString()
  const lead: Lead = { ...data, id: makeId(createdAt), createdAt, notified }
  const body = encrypt(JSON.stringify(lead))

  if (useBlob) {
    await put(`${BLOB_PREFIX}/${lead.id}.enc`, body, {
      access: "public",
      addRandomSuffix: false,
      contentType: "text/plain",
    })
    return lead
  }

  await fs.mkdir(LOCAL_DIR, { recursive: true })
  await fs.writeFile(path.join(LOCAL_DIR, `${lead.id}.enc`), body, "utf8")
  return lead
}

export async function listLeads(): Promise<Lead[]> {
  let contents: string[] = []

  if (useBlob) {
    const { blobs } = await list({ prefix: `${BLOB_PREFIX}/` })
    contents = await Promise.all(
      blobs.map((b) =>
        fetch(b.url, { cache: "no-store" })
          .then((r) => r.text())
          .catch(() => "")
      )
    )
  } else {
    const files = await fs.readdir(LOCAL_DIR).catch(() => [] as string[])
    contents = await Promise.all(
      files
        .filter((f) => f.endsWith(".enc"))
        .map((f) => fs.readFile(path.join(LOCAL_DIR, f), "utf8").catch(() => ""))
    )
  }

  return contents
    .map((raw) => {
      if (!raw) return null
      try {
        return JSON.parse(decrypt(raw)) as Lead
      } catch {
        /* 복호화 실패 = ADMIN_SECRET이 바뀐 이전 데이터. 조용히 건너뛴다 */
        return null
      }
    })
    .filter((l): l is Lead => l !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}
