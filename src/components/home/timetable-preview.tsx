"use client"

import Link from "next/link"
import { CalendarDays, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function TimetablePreview() {
  return (
    <section className="relative overflow-hidden bg-card py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent"
          >
            Schedule
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            학년별 시간표
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-pretty text-muted-foreground md:text-lg"
          >
            학년별 맞춤 시간표로 효율적인 학습 일정을 확인하세요
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="middle" className="mx-auto max-w-3xl">
            <div className="flex justify-center">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="middle" className="data-[state=active]:bg-background">
                  중등부
                </TabsTrigger>
                <TabsTrigger value="high" className="data-[state=active]:bg-background">
                  고등부
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="middle">
              <div className="mt-8 flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-background py-20 text-center shadow-sm">
                <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                  <CalendarDays className="size-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">중등부 시간표 이미지가 이곳에 표시됩니다.</p>
              </div>
            </TabsContent>

            <TabsContent value="high">
              <div className="mt-8 flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-background py-20 text-center shadow-sm">
                <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                  <CalendarDays className="size-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">고등부 시간표 이미지가 이곳에 표시됩니다.</p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-10 flex justify-center">
            <Link
              href="/timetable"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "group gap-2 border-foreground/20"
              )}
            >
              전체 시간표 보기
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
