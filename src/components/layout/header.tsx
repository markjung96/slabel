"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu } from "lucide-react"

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

  const mainItems = navigationItems.filter((item) => item.label !== "상담신청")
  const consultationItem = navigationItems.find((item) => item.label === "상담신청")

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={120}
            height={36}
            priority
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
                        pathname.startsWith(item.href) && item.href !== "#" && "bg-muted"
                      )}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="flex flex-col w-36 p-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <NavigationMenuLink
                              href={child.href}
                              active={pathname === child.href}
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
                      active={pathname === item.href}
                      className="inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all hover:bg-muted"
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
              className={cn(
                "ml-2 inline-flex h-8 items-center justify-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80"
              )}
            >
              {consultationItem.label}
            </Link>
          )}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" />
            }
          >
            <Menu className="size-5" />
            <span className="sr-only">메뉴 열기</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 px-0">
            <SheetHeader className="px-6 pb-2">
              <SheetTitle>
                <Link href="/" onClick={() => setOpen(false)}>
                  <Image
                    src={siteConfig.logo}
                    alt={siteConfig.name}
                    width={100}
                    height={30}
                  />
                </Link>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col px-4 gap-1">
              {navigationItems.map((item) => {
                if (item.children) {
                  return (
                    <div key={item.href}>
                      <span className="block px-3 py-2 text-sm font-medium text-muted-foreground">
                        {item.label}
                      </span>
                      <div className="flex flex-col pl-3 gap-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block px-3 py-2 rounded-lg text-sm transition-colors hover:bg-muted",
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
                      className="mt-2 inline-flex h-8 items-center justify-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 rounded-lg text-sm transition-colors hover:bg-muted",
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
