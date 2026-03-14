import type { Metadata } from "next"
import { ExternalLink } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { blogCards } from "@/data/blog"
import { siteConfig } from "@/data/site"

export const metadata: Metadata = {
  title: "블로그",
  description: "스라밸학원의 교육 이야기, 학습 팁, 수학 공부법을 담은 블로그입니다.",
}

const gradients = [
  "from-blue-100 to-blue-200",
  "from-violet-100 to-violet-200",
  "from-emerald-100 to-emerald-200",
  "from-amber-100 to-amber-200",
  "from-rose-100 to-rose-200",
  "from-cyan-100 to-cyan-200",
]

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })
}

export default function BlogPage() {
  return (
    <main className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">블로그</h1>
          <p className="mt-3 text-muted-foreground">스라밸학원의 교육 이야기를 만나보세요.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogCards.map((post, index) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
            >
              <Card className="h-full transition-shadow group-hover:shadow-md">
                <div
                  className={`bg-gradient-to-br ${gradients[index % gradients.length]} h-48 w-full`}
                />
                <CardContent className="pt-4 pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-semibold leading-snug line-clamp-2 flex-1">{post.title}</h2>
                    <ExternalLink className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.description}</p>
                  <p className="mt-3 text-xs text-muted-foreground">{formatDate(post.date)}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href={siteConfig.blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 h-9 rounded-lg border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ExternalLink className="size-4" />
            네이버 블로그 방문하기
          </a>
        </div>
      </div>
    </main>
  )
}
