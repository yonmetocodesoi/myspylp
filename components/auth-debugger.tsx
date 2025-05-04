"use client"

import { useAuth } from "@/hooks/use-auth"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function AuthDebugger() {
  const { user, loading } = useAuth()
  const [showDebug, setShowDebug] = useState(false)

  if (!showDebug) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          className="bg-gray-800/70 border-gray-700 text-gray-400"
          onClick={() => setShowDebug(true)}
        >
          Debug Auth
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 p-4 bg-gray-900/90 border border-gray-800 rounded-lg shadow-lg max-w-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-bold text-gray-300">Auth Debugger</h3>
        <Button variant="ghost" size="sm" className="text-gray-400 h-6 w-6 p-0" onClick={() => setShowDebug(false)}>
          ×
        </Button>
      </div>
      <div className="text-xs text-gray-400 space-y-1">
        <p>Loading: {loading ? "true" : "false"}</p>
        <p>User: {user ? "Authenticated" : "Not authenticated"}</p>
        {user && (
          <>
            <p>UID: {user.uid}</p>
            <p>Email: {user.email}</p>
            <p>Email verified: {user.emailVerified ? "Yes" : "No"}</p>
            <p>Authentication method: {user.providerData[0]?.providerId}</p>
          </>
        )}
      </div>
    </div>
  )
}
