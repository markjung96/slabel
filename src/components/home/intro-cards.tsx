"use client"

import { GraduationCap, Timer, TrendingUp, Users, type LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { featureCards } from "@/data/home"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Timer,
  TrendingUp,
  Users,
}

export function IntroCards() {
  return (
    <section className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">왜 스라밸학원인가요?</h2>
        <p className="mt-3 text-muted-foreground md:text-lg">
          학생 한 명 한 명에게 집중하는 체계적인 교육 시스템
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {featureCards.map((card, index) => {
          const Icon = iconMap[card.icon] ?? GraduationCap
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="text-base font-semibold">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{card.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
