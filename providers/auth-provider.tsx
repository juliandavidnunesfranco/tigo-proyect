"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  role: string
  tenants: string[]
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, tenantId: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Recuperar usuario de localStorage al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, tenantId: string) => {
    setIsLoading(true)

    try {
      // Simulamos autenticación con datos de prueba
      let userData: User | null = null

      if (email === "vendedor@tigo.com" && password === "password") {
        userData = {
          id: "1",
          name: "Juan Pérez",
          email: "vendedor@tigo.com",
          role: "SELLER",
          tenants: [tenantId],
        }
      } else if (email === "admin@tigo.com" && password === "password") {
        userData = {
          id: "2",
          name: "María Gómez",
          email: "admin@tigo.com",
          role: "STORE_ADMIN",
          tenants: [tenantId],
        }
      } else if (email === "gerente@tigo.com" && password === "password") {
        userData = {
          id: "3",
          name: "Carlos Rodríguez",
          email: "gerente@tigo.com",
          role: "MANAGER",
          tenants: [],
        }
      } else {
        throw new Error("Credenciales incorrectas")
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
