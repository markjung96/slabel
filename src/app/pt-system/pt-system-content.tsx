"use client"

import { Check } from "lucide-react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { ptSystemIntro, timerManagement, ptSteps, ptFeatures } from "@/data/pt-system"

export function PtSystemContent() {
  return (
    <main className="min-h-screen">
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">
              {ptSystemIntro.subtitle}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold">{ptSystemIntro.title}</h1>
            <div className="h-1 w-16 rounded-full bg-primary" />
            <p className="text-base text-muted-foreground leading-relaxed">
              {ptSystemIntro.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold">
                {timerManagement.title}
              </h2>
              <div className="h-1 w-12 rounded-full bg-primary mx-auto" />
            </div>
            <p className="text-base text-muted-foreground leading-relaxed text-center">
              {timerManagement.description}
            </p>
            <ul className="space-y-3">
              {timerManagement.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="flex items-center justify-center shrink-0 w-5 h-5 rounded-full bg-primary/10 mt-0.5">
                    <Check className="size-3 text-primary" />
                  </span>
                  <span className="text-sm leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold">학습 프로세스</h2>
            <div className="h-1 w-12 rounded-full bg-primary mx-auto" />
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-2">
            {ptSteps.map((step, index) => (
              <div
                key={step.step}
                className="flex md:flex-col flex-1 items-start md:items-center gap-4 md:gap-3 relative"
              >
                {index < ptSteps.length - 1 && (
                  <div
                    className="hidden md:block absolute left-[calc(50%+20px)] top-5 h-0.5 bg-border"
                    style={{ right: "calc(-50% + 20px)" }}
                    aria-hidden
                  />
                )}
                <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-sm z-10">
                  {step.step}
                </div>
                <div className="md:text-center space-y-1">
                  <p className="text-sm font-semibold">{step.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold">시스템 특징</h2>
            <div className="h-1 w-12 rounded-full bg-primary mx-auto" />
          </div>

          <div>
            <Accordion>
              {ptFeatures.map((feature) => (
                <AccordionItem key={feature.title} value={feature.title}>
                  <AccordionTrigger>
                    <div className="space-y-0.5 text-left">
                      <p className="text-sm font-semibold">{feature.title}</p>
                      <p className="text-xs text-muted-foreground font-normal">
                        {feature.description}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 pt-1">
                      {feature.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2">
                          <span className="flex items-center justify-center shrink-0 w-4 h-4 rounded-full bg-primary/10 mt-0.5">
                            <Check className="size-2.5 text-primary" />
                          </span>
                          <span className="text-sm text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  )
}
