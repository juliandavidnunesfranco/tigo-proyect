"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogFooter } from "@/components/ui/dialog"
import { useTenant } from "@/providers/tenant-provider"

type ClientFormProps = {
  onSubmit: (client: any) => void
}

export function ClientForm({ onSubmit }: ClientFormProps) {
  const { currentTenant } = useTenant()
  const [formData, setFormData] = useState({
    name: "",
    documentId: "",
    birthDate: "",
    documentIssueDate: "",
    phone: "",
    portedPhone: "",
    nip: "",
    msid: "",
    iccid: "",
    imei: "",
    email: "",
    address: "",
    productType: "mobile",
    status: "pending",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulamos la adición de un cliente
      const newClient = {
        id: Math.random().toString(36).substring(2, 9),
        ...formData,
        tenantId: currentTenant?.id,
        saleDate: new Date(),
      }

      onSubmit(newClient)
    } catch (error) {
      console.error("Error al agregar cliente:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nombre completo</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="documentId">Cédula</Label>
          <Input id="documentId" name="documentId" value={formData.documentId} onChange={handleChange} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="birthDate">Fecha de nacimiento</Label>
          <Input
            id="birthDate"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="documentIssueDate">Fecha de expedición</Label>
          <Input
            id="documentIssueDate"
            name="documentIssueDate"
            type="date"
            value={formData.documentIssueDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">Número de línea</Label>
          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="portedPhone">Número portado</Label>
          <Input id="portedPhone" name="portedPhone" value={formData.portedPhone} onChange={handleChange} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="address">Dirección</Label>
          <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="productType">Tipo de producto</Label>
          <Select value={formData.productType} onValueChange={(value) => handleSelectChange("productType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mobile">Plan Móvil</SelectItem>
              <SelectItem value="home">Plan Hogar</SelectItem>
              <SelectItem value="prepaid">Prepago</SelectItem>
              <SelectItem value="chip">Reposición Chip</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="status">Estado</Label>
          <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pendiente</SelectItem>
              <SelectItem value="active">Activo</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="nip">NIP</Label>
          <Input id="nip" name="nip" value={formData.nip} onChange={handleChange} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="msid">MSID</Label>
          <Input id="msid" name="msid" value={formData.msid} onChange={handleChange} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="iccid">ICCID</Label>
          <Input id="iccid" name="iccid" value={formData.iccid} onChange={handleChange} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="imei">IMEI</Label>
          <Input id="imei" name="imei" value={formData.imei} onChange={handleChange} />
        </div>
      </div>

      <DialogFooter>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar Cliente"}
        </Button>
      </DialogFooter>
    </form>
  )
}
