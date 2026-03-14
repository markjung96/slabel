"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { heroSlides } from "@/data/home"
import { cn } from "@/lib/utils"

const slideGradients = [
  "from-blue-900 to-indigo-800",
  "from-emerald-900 to-teal-800",
  "from-violet-900 to-purple-800",
]

export function HeroCarousel() {
  const autoplay = Autoplay({ delay: 4500, stopOnInteraction: true })
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay])
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on("select", onSelect)
    return () => { emblaApi.off("select", onSelect) }
  }, [emblaApi])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  )

  const handleMouseLeave = useCallback(() => {
    autoplay.reset()
    autoplay.play()
  }, [autoplay])

  return (
    <section
      className="relative w-full overflow-hidden h-[60vh] md:h-[70vh]"
      onMouseLeave={handleMouseLeave}
    >
      <div ref={emblaRef} className="h-full">
        <div className="flex h-full">
          {heroSlides.map((slide, index) => (
            <div key={slide.id} className="relative flex-none w-full h-full">
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br",
                  slideGradients[index % slideGradients.length]
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
                <h1
                  className="text-4xl font-bold tracking-tight md:text-6xl"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
                >
                  {slide.title}
                </h1>
                <p
                  className="mt-4 text-lg md:text-2xl text-white/90"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
                >
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
        aria-label="이전 슬라이드"
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
        aria-label="다음 슬라이드"
      >
        <ChevronRight className="size-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={cn(
              "h-2 rounded-full transition-all",
              i === selectedIndex ? "w-6 bg-white" : "w-2 bg-white/50"
            )}
            aria-label={`슬라이드 ${i + 1}로 이동`}
          />
        ))}
      </div>
    </section>
  )
}
