"use client"

import { motion } from "framer-motion"
import { Phone } from "lucide-react"

export default function WhatsAppButton() {
  const phoneNumber = "88994853377"
  const whatsappUrl = `https://wa.me/${phoneNumber}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Phone className="h-6 w-6" />
      <span className="sr-only">Contact via WhatsApp</span>
    </motion.a>
  )
}
