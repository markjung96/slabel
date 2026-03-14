"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, ArrowRight } from "lucide-react"

import { navigationItems } from "@/data/navigation"
import { siteConfig } from "@/data/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const mainItems = navigationItems.filter((item) => item.label !== "상담신청")
  const consultationItem = navigationItems.find((item) => item.label === "상담신청")

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between lg:h-20">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={120}
            height={36}
            priority
            className="h-8 w-auto lg:h-9"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              {mainItems.map((item) =>
                item.children ? (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuTrigger
                      className={cn(
                        "bg-transparent text-foreground/70 hover:text-foreground transition-colors",
                        pathname.startsWith(item.href) && item.href !== "#" && "text-foreground font-medium"
                      )}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="flex flex-col w-44 p-2">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <NavigationMenuLink
                              href={child.href}
                              className={cn(
                                "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted",
                                pathname === child.href && "bg-muted font-medium"
                              )}
                            >
                              {child.label}
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      href={item.href}
                      className={cn(
                        "inline-flex h-9 w-max items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground hover:bg-muted/50",
                        pathname === item.href && "text-foreground bg-muted/50"
                      )}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {consultationItem && (
            <Link
              href={consultationItem.href}
              className="ml-4 group inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-all hover:bg-foreground/90"
            >
              {consultationItem.label}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-muted" />
            }
          >
            <Menu className="size-5" />
            <span className="sr-only">메뉴 열기</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-background px-0">
            <SheetHeader className="px-6 pb-4 border-b border-border">
              <SheetTitle>
                <Link href="/" onClick={() => setOpen(false)}>
                  <Image
                    src={siteConfig.logo}
                    alt={siteConfig.name}
                    width={100}
                    height={30}
                    className="h-7 w-auto"
                  />
                </Link>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col px-4 py-4 gap-1">
              {navigationItems.map((item) => {
                if (item.children) {
                  return (
                    <div key={item.href} className="py-2">
                      <span className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {item.label}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-muted",
                              pathname === child.href && "bg-muted font-medium"
                            )}
                            onClick={() => setOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                }

                if (item.label === "상담신청") {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="mt-4 group flex h-11 items-center justify-center gap-2 rounded-lg bg-foreground text-sm font-medium text-background transition-all hover:bg-foreground/90"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-muted",
                      pathname === item.href && "bg-muted font-medium"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
