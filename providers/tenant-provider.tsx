"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Tenant = {
  id: string
  name: string
  code: string
  city: string
  region: string
}

type TenantContextType = {
  currentTenant: Tenant | null
  setCurrentTenant: (tenant: Tenant | null) => void
}

const TenantContext = createContext<TenantContextType | undefined>(undefined)

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null)

  // Recuperar tenant de localStorage al cargar
  useEffect(() => {
    const storedTenant = localStorage.getItem("currentTenant")
    if (storedTenant) {
      try {
        setCurrentTenant(JSON.parse(storedTenant))
      } catch (error) {
        console.error("Error parsing stored tenant:", error)
        localStorage.removeItem("currentTenant")
      }
    }
  }, [])

  // Guardar tenant en localStorage cuando cambie
  useEffect(() => {
    if (currentTenant) {
      localStorage.setItem("currentTenant", JSON.stringify(currentTenant))
    } else {
      localStorage.removeItem("currentTenant")
    }
  }, [currentTenant])

  return <TenantContext.Provider value={{ currentTenant, setCurrentTenant }}>{children}</TenantContext.Provider>
}

export function useTenant() {
  const context = useContext(TenantContext)
  if (context === undefined) {
    throw new Error("useTenant must be used within a TenantProvider")
  }
  return context
}
