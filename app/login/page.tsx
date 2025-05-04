"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, EyeOff } from "lucide-react"
import ParticleBackground from "@/components/particle-background"
import { useAuth } from "@/hooks/use-auth"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { login, loading: authLoading, user } = useAuth()

  useEffect(() => {
    setMounted(true)

    // If the user is already authenticated, redirect to the dashboard
    if (user) {
      console.log("User already authenticated, redirecting to dashboard")
      router.push("/dashboard")
    }
  }, [user, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      console.log("Attempting to login with:", email)
      await login(email, password)
      // Redirection is done within the login function
    } catch (error: any) {
      console.error("Error caught in login component:", error)

      // More specific error messages
      if (error.code === "auth/user-not-found") {
        setError("User not found. Please check your email.")
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.")
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email format. Please check.")
      } else if (error.code === "auth/invalid-credential") {
        setError("Invalid credentials. Please check your email and password.")
      } else {
        setError(`Login failed: ${error.message}`)
      }
    }
  }

  if (!mounted) return null

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <ParticleBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-md"
      >
        <Card className="bg-gray-900/70 backdrop-blur-lg border-gray-800">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <Shield className="h-12 w-12 text-red-500" />
            </div>
            <CardTitle className="text-2xl font-bold gradient-text">MySpy Login</CardTitle>
            <CardDescription className="text-gray-400">Access the digital investigation platform</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-800/50 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-gray-800/50 border-gray-700 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm p-2 bg-red-500/10 rounded border border-red-500/20"
                >
                  {error}
                </motion.div>
              )}

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={authLoading}>
                {authLoading ? "Authenticating..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="w-full">
              <a
                href="https://buy.stripe.com/9AQ4gr1UAguA6ZydQT"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant="outline" className="w-full border-red-500 hover:bg-red-500/10">
                  Buy premium access
                </Button>
              </a>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
