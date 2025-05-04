"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    setIsClient(true)

    // Check if the user is authenticated after initial loading
    if (!loading) {
      if (!user) {
        console.log("User not authenticated, redirecting to login")
        router.push("/login")
      } else {
        console.log("User authenticated, allowing access to protected route")
      }
      setIsChecking(false)
    }
  }, [loading, user, router])

  // Show loading indicator while checking authentication
  if (loading || isChecking || !isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, don't render anything (redirection has already been done)
  if (!user) {
    return null
  }

  // If authenticated, render the protected content
  return <>{children}</>
}
