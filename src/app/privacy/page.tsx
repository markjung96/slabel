import type { Metadata } from "next"
import { siteConfig } from "@/data/site"

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "스라밸학원 개인정보처리방침 - 이용자의 개인정보 수집·이용·보관에 관한 방침을 안내합니다.",
}

export default function PrivacyPage() {
  return (
    <main className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight mb-10">개인정보처리방침</h1>

          <div className="space-y-10 text-sm leading-relaxed text-foreground">
            <p className="text-muted-foreground">
              스라밸학원(이하 &ldquo;학원&rdquo;)은 이용자의 개인정보를 소중히 여기며, 「개인정보 보호법」 등 관련 법령을 준수합니다.
              본 방침은 학원 홈페이지의 상담 신청 서비스에 적용됩니다.
            </p>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">1. 개인정보의 수집 및 이용 목적</h2>
              <p>학원은 다음의 목적으로 개인정보를 수집·이용합니다.</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>상담 신청 접수 및 상담 일정 안내</li>
                <li>수강 상담 및 학습 관련 안내 연락</li>
                <li>서비스 이용에 관한 문의 응대</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">2. 수집하는 개인정보 항목</h2>
              <p>학원은 상담 신청 시 아래의 개인정보를 수집합니다.</p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-2 text-left font-medium">항목</th>
                      <th className="px-4 py-2 text-left font-medium">수집 여부</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-2">이름</td>
                      <td className="px-4 py-2">필수</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">전화번호</td>
                      <td className="px-4 py-2">필수</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">학년</td>
                      <td className="px-4 py-2">필수</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">학교명</td>
                      <td className="px-4 py-2">선택</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">상담 내용</td>
                      <td className="px-4 py-2">선택</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">3. 개인정보의 보유 및 이용기간</h2>
              <p>
                수집된 개인정보는 상담 목적이 달성된 후 <strong>6개월</strong> 이내에 파기합니다.
                단, 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보유합니다.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">4. 개인정보의 제3자 제공</h2>
              <p>
                학원은 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
                다만, 법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우에는 예외로 합니다.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">5. 정보주체의 권리</h2>
              <p>이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다.</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>개인정보 열람 요청</li>
                <li>개인정보 정정·삭제 요청</li>
                <li>개인정보 처리정지 요청</li>
              </ul>
              <p>
                권리 행사는 아래 개인정보 보호책임자에게 서면, 전화, 이메일 등을 통해 요청하시면 지체 없이 조치하겠습니다.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">6. 개인정보 보호책임자</h2>
              <p>개인정보 처리에 관한 문의는 아래 담당자에게 연락해 주시기 바랍니다.</p>
              <ul className="list-none space-y-1 text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">책임자:</span> 학원 대표
                </li>
                <li>
                  <span className="font-medium text-foreground">전화:</span> {siteConfig.phone}
                </li>
                <li>
                  <span className="font-medium text-foreground">이메일:</span> {siteConfig.email}
                </li>
              </ul>
            </section>

            <p className="text-xs text-muted-foreground border-t pt-6">
              본 개인정보처리방침은 2026년 3월 14일부터 시행됩니다.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
