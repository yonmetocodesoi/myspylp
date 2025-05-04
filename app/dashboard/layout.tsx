"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Shield, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParticleBackground from "@/components/particle-background"
import { useAuth } from "@/hooks/use-auth"
import ProtectedRoute from "@/components/protected-route"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const { logout, user } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    try {
      console.log("Starting logout")
      await logout()
      // Redirection is done within the logout function
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  if (!mounted) return null

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen">
        <ParticleBackground />

        <div className="relative z-10">
          <header className="border-b border-gray-800 bg-gray-900/70 backdrop-blur-lg">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield className="h-8 w-8 text-red-500" />
                <h1 className="text-2xl font-bold gradient-text">MySpy</h1>
              </div>
              <div className="flex items-center gap-4">
                {user && <span className="text-gray-400 mr-2">{user.email}</span>}
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </header>

          {children}

          <footer className="border-t border-gray-800 py-6 mt-12">
            <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
              <p>© 2025 MySpy. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </ProtectedRoute>
  )
}
