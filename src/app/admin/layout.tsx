import Link from "next/link"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Clock, BookOpen, LogOut } from "lucide-react"

const navItems = [
  { href: "/admin", label: "대시보드", icon: LayoutDashboard },
  { href: "/admin/timetable", label: "시간표 관리", icon: Clock },
  { href: "/admin/curriculum", label: "커리큘럼 관리", icon: BookOpen },
]

async function handleLogout() {
  "use server"
  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/admin/logout`, {
    method: "POST",
  })
  redirect("/admin/login")
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r bg-background">
        <div className="flex h-14 items-center border-b px-4">
          <span className="font-semibold text-sm">스라밸 관리자</span>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t p-3">
          <form action={handleLogout}>
            <Button variant="ghost" size="sm" type="submit" className="w-full justify-start gap-2.5 text-muted-foreground hover:text-foreground">
              <LogOut className="size-4 shrink-0" />
              로그아웃
            </Button>
          </form>
        </div>
      </aside>

      <main className="ml-56 flex-1 p-6">
        {children}
      </main>
    </div>
  )
}
