"use client"

import { motion } from "framer-motion"
import { Building2, Target, Users, TrendingUp, Train, Bus, Car } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MapEmbeds } from "@/components/maps/map-embeds"
import { aboutContent } from "@/data/about"

const featureIcons = [Building2, Target, Users, TrendingUp]

const transportationIcons = {
  subway: Train,
  bus: Bus,
  parking: Car,
}

const transportationLabels = {
  subway: "지하철",
  bus: "버스",
  parking: "주차",
}

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

export function AboutContent() {
  return (
    <main className="min-h-screen">
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="flex flex-col items-center text-center gap-4"
          >
            <h1 className="text-3xl md:text-4xl font-bold">학원 소개</h1>
            <div className="h-1 w-16 rounded-full bg-primary" />
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
          >
            <div className="shrink-0 flex items-center justify-center w-40 h-40 rounded-2xl bg-muted ring-1 ring-foreground/10">
              <span className="text-4xl font-bold text-primary">S</span>
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold">
                {aboutContent.intro.title}
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                {aboutContent.intro.description}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl space-y-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center space-y-3"
          >
            <h2 className="text-2xl md:text-3xl font-bold">S-Label의 특징</h2>
            <div className="h-1 w-12 rounded-full bg-primary mx-auto" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {aboutContent.features.map((feature, index) => {
              const Icon = featureIcons[index]
              return (
                <motion.div key={feature.title} variants={fadeInUp}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-2">
                        <Icon className="size-5 text-primary" />
                      </div>
                      <CardTitle className="text-base font-semibold">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl space-y-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center space-y-3"
          >
            <h2 className="text-2xl md:text-3xl font-bold">오시는길</h2>
            <div className="h-1 w-12 rounded-full bg-primary mx-auto" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
          >
            <MapEmbeds />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {(
              Object.entries(aboutContent.location.transportation) as [
                keyof typeof transportationIcons,
                string,
              ][]
            ).map(([key, value]) => {
              const Icon = transportationIcons[key]
              return (
                <motion.div key={key} variants={fadeInUp}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                          <Icon className="size-4 text-primary" />
                        </div>
                        <CardTitle className="text-sm font-semibold">
                          {transportationLabels[key]}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{value}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
