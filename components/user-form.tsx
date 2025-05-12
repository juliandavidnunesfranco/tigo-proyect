"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogFooter } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { getTenants } from "@/lib/data-service"

type UserFormProps = {
  onSubmit: (user: any) => void
  user?: any
}

export function UserForm({ onSubmit, user }: UserFormProps) {
  const [tenants, setTenants] = useState([])
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    role: user?.role || "SELLER",
    tenantAccess: user?.tenantAccess || "specific",
    selectedTenants: user?.tenants || [],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const data = await getTenants()
        setTenants(data)
      } catch (error) {
        console.error("Error fetching tenants:", error)
      }
    }

    fetchTenants()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTenantToggle = (tenantId: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          selectedTenants: [...prev.selectedTenants, tenantId],
        }
      } else {
        return {
          ...prev,
          selectedTenants: prev.selectedTenants.filter((id) => id !== tenantId),
        }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Preparar datos para enviar
      const userData = {
        ...formData,
        tenants: formData.tenantAccess === "all" ? [] : formData.selectedTenants,
      }

      onSubmit(userData)
    } catch (error) {
      console.error("Error al guardar usuario:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nombre completo</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Contraseña {user ? "(dejar en blanco para mantener)" : ""}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required={!user}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="role">Rol</Label>
          <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SELLER">Vendedor</SelectItem>
              <SelectItem value="STORE_ADMIN">Administrador de Tienda</SelectItem>
              <SelectItem value="MANAGER">Gerente</SelectItem>
              <SelectItem value="SYSTEM_ADMIN">Administrador del Sistema</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2 mt-2">
          <Label>Acceso a tiendas</Label>
          <Select value={formData.tenantAccess} onValueChange={(value) => handleSelectChange("tenantAccess", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar acceso" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las tiendas</SelectItem>
              <SelectItem value="specific">Tiendas específicas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.tenantAccess === "specific" && (
          <div className="grid gap-2 mt-2 border rounded-md p-4">
            <Label className="mb-2">Seleccionar tiendas</Label>
            <div className="grid grid-cols-2 gap-4">
              {tenants.map((tenant) => (
                <div key={tenant.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tenant-${tenant.id}`}
                    checked={formData.selectedTenants.includes(tenant.id)}
                    onCheckedChange={(checked) => handleTenantToggle(tenant.id, !!checked)}
                  />
                  <Label htmlFor={`tenant-${tenant.id}`} className="font-normal">
                    {tenant.name} ({tenant.city})
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <DialogFooter>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : user ? "Actualizar Usuario" : "Crear Usuario"}
        </Button>
      </DialogFooter>
    </form>
  )
}
