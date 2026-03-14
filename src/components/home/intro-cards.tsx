"use client"

import { GraduationCap, Timer, TrendingUp, Users, type LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { featureCards } from "@/data/home"

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Timer,
  TrendingUp,
  Users,
}

export function IntroCards() {
  return (
    <section className="relative overflow-hidden bg-card py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            왜 스라밸학원인가요?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-pretty text-muted-foreground md:text-lg"
          >
            학생 한 명 한 명에게 집중하는 체계적인 교육 시스템으로
            <br className="hidden sm:block" />
            진정한 학습 능력 향상을 이끌어냅니다.
          </motion.p>
        </div>

        {/* Feature Cards */}
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
                <div className="group relative h-full rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                  {/* Number indicator */}
                  <span className="absolute right-6 top-6 text-5xl font-bold text-muted/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  
                  {/* Icon */}
                  <div className="mb-6 flex size-14 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="size-6" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
