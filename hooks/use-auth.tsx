"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "firebase/auth"
import { useRouter } from "next/navigation"
import { auth, loginUser, logoutUser, registerUser } from "@/services/firebase"
import { onAuthStateChanged } from "firebase/auth"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, userData: any) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Usar onAuthStateChanged para monitorar mudanças no estado de autenticação
  useEffect(() => {
    if (!auth) {
      console.error("Firebase Auth não está inicializado")
      setLoading(false)
      return
    }

    console.log("Configurando listener de autenticação")
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        console.log("Usuário autenticado:", authUser.uid)
        setUser(authUser)
      } else {
        console.log("Usuário não autenticado")
        setUser(null)
      }
      setLoading(false)
    })

    // Cleanup function
    return () => {
      console.log("Removendo listener de autenticação")
      unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      console.log("Iniciando processo de login")
      const userCredential = await loginUser(email, password)
      console.log("Login bem-sucedido, redirecionando")
      router.push("/dashboard")
      return userCredential
    } catch (error) {
      console.error("Erro no login:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, userData: any) => {
    try {
      setLoading(true)
      console.log("Iniciando processo de registro")
      const user = await registerUser(email, password, userData)
      console.log("Registro bem-sucedido, redirecionando")
      router.push("/dashboard")
      return user
    } catch (error) {
      console.error("Erro no registro:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      console.log("Iniciando processo de logout")
      await logoutUser()
      console.log("Logout bem-sucedido, redirecionando")
      router.push("/")
    } catch (error) {
      console.error("Erro no logout:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
