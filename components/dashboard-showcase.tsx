"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  {
    src: "/images/dashboard-1.jpg",
    alt: "Dashboard MySpy - Visão Geral",
  },
  {
    src: "/images/dashboard-2.jpg",
    alt: "Dashboard MySpy - Gerador de Links",
  },
  {
    src: "/images/dashboard-3.jpg",
    alt: "Dashboard MySpy - Tutorial",
  },
  {
    src: "/images/dashboard-4.jpg",
    alt: "Dashboard MySpy - Como Usar",
  },
]

export default function DashboardShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-800 shadow-xl">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          <Image
            src={images[currentIndex].src || "/placeholder.svg"}
            alt={images[currentIndex].alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="font-medium">{images[currentIndex].alt}</p>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-black/50 border-gray-700 text-white hover:bg-black/70"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Anterior</span>
        </Button>
      </div>

      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-black/50 border-gray-700 text-white hover:bg-black/70"
          onClick={nextSlide}
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Próximo</span>
        </Button>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-red-500" : "bg-gray-600"}`}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">Slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
