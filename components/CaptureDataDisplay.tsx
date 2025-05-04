"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Globe, Monitor, Calendar, Flag } from "lucide-react"
import { CaptureData } from "@/services/telegram"

interface CaptureDataDisplayProps {
  data: CaptureData
}

export function CaptureDataDisplay({ data }: CaptureDataDisplayProps) {
  const { deviceInfo, location, image } = data

  // Get country from IP
  const getCountryFromIP = async (ip: string) => {
    try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`)
      const data = await response.json()
      return {
        country: data.country_name,
        city: data.city,
        region: data.region,
        flag: data.country_code?.toLowerCase()
      }
    } catch (error) {
      return {
        country: "Unknown",
        city: "Unknown",
        region: "Unknown",
        flag: "xx"
      }
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl gradient-text">Captured Data</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Image */}
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <img
            src={image}
            alt="Captured image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-400" />
            <h3 className="font-semibold">Location</h3>
          </div>
          <div className="pl-7 space-y-1">
            <p className="text-sm text-gray-400">
              Latitude: {location.latitude}
            </p>
            <p className="text-sm text-gray-400">
              Longitude: {location.longitude}
            </p>
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${location.latitude},${location.longitude}`}
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Device Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-red-400" />
            <h3 className="font-semibold">Device Information</h3>
          </div>
          <div className="pl-7 space-y-1">
            <p className="text-sm text-gray-400">
              IP: {deviceInfo.ip}
            </p>
            <p className="text-sm text-gray-400">
              Browser: {deviceInfo.browser}
            </p>
            <p className="text-sm text-gray-400">
              OS: {deviceInfo.os}
            </p>
          </div>
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(deviceInfo.timestamp)}</span>
        </div>
      </CardContent>
    </Card>
  )
} 