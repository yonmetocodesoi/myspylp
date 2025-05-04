"use client"

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, MapPin } from 'lucide-react';
import { DeviceInfo, LocationInfo, CaptureData } from '@/services/telegram';

interface CaptureComponentProps {
  onCapture: (data: CaptureData) => void;
}

export function CaptureComponent({ onCapture }: CaptureComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);

  useEffect(() => {
    // Get device info
    const getDeviceInfo = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const { ip } = await response.json();
        
        setDeviceInfo({
          ip,
          browser: navigator.userAgent,
          os: navigator.platform,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error getting device info:', error);
      }
    };

    getDeviceInfo();
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const captureImage = () => {
    if (videoRef.current && stream && location && deviceInfo) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        
        onCapture({
          image: imageData,
          location,
          deviceInfo
        });

        // Stop the camera stream
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="space-y-4">
        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
          {stream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Camera preview
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={startCamera}
            className="flex-1"
            disabled={!!stream}
          >
            <Camera className="mr-2 h-4 w-4" />
            Enable Camera
          </Button>

          <Button
            onClick={getLocation}
            className="flex-1"
            disabled={!!location}
          >
            <MapPin className="mr-2 h-4 w-4" />
            Get Location
          </Button>
        </div>

        <Button
          onClick={captureImage}
          className="w-full"
          disabled={!stream || !location || !deviceInfo}
        >
          Capture
        </Button>
      </div>
    </Card>
  );
} 