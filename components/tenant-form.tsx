"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogFooter } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

type TenantFormProps = {
  onSubmit: (tenant: any) => void
  tenant?: any
}

export function TenantForm({ onSubmit, tenant }: TenantFormProps) {
  const [formData, setFormData] = useState({
    name: tenant?.name || "",
    code: tenant?.code || "",
    address: tenant?.address || "",
    city: tenant?.city || "",
    region: tenant?.region || "",
    features: tenant?.features || {
      reports: true,
      notifications: true,
      multiUser: true,
      api: false,
      whatsapp: false,
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: checked,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      onSubmit(formData)
    } catch (error) {
      console.error("Error al guardar tienda:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre de la tienda</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="code">Código</Label>
            <Input id="code" name="code" value={formData.code} onChange={handleChange} required />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="address">Dirección</Label>
          <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="city">Ciudad</Label>
            <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="region">Región</Label>
            <Input id="region" name="region" value={formData.region} onChange={handleChange} required />
          </div>
        </div>

        <div className="grid gap-2 mt-2">
          <Label>Características habilitadas</Label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="reports"
                checked={formData.features.reports}
                onCheckedChange={(checked) => handleFeatureChange("reports", !!checked)}
              />
              <Label htmlFor="reports" className="font-normal">
                Reportes avanzados
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="notifications"
                checked={formData.features.notifications}
                onCheckedChange={(checked) => handleFeatureChange("notifications", !!checked)}
              />
              <Label htmlFor="notifications" className="font-normal">
                Notificaciones
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="multiUser"
                checked={formData.features.multiUser}
                onCheckedChange={(checked) => handleFeatureChange("multiUser", !!checked)}
              />
              <Label htmlFor="multiUser" className="font-normal">
                Múltiples usuarios
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="api"
                checked={formData.features.api}
                onCheckedChange={(checked) => handleFeatureChange("api", !!checked)}
              />
              <Label htmlFor="api" className="font-normal">
                Acceso API
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="whatsapp"
                checked={formData.features.whatsapp}
                onCheckedChange={(checked) => handleFeatureChange("whatsapp", !!checked)}
              />
              <Label htmlFor="whatsapp" className="font-normal">
                Integración WhatsApp
              </Label>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : tenant ? "Actualizar Tienda" : "Crear Tienda"}
        </Button>
      </DialogFooter>
    </form>
  )
}
