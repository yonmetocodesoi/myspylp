export interface DeviceInfo {
  ip: string
  browser: string
  os: string
  timestamp: string
  visitorId: string
}

export interface LocationInfo {
  latitude: number
  longitude: number
}

export interface CaptureData {
  image: string
  location: LocationInfo
  deviceInfo: DeviceInfo
} 