"use client"

import { useState } from "react"
import { ClientsTable } from "@/components/clients-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ClientForm } from "@/components/client-form"
import { useTenant } from "@/providers/tenant-provider"
import { useToast } from "@/hooks/use-toast"
import { addClient } from "@/lib/data-service"

export default function ClientsPage() {
  const { currentTenant } = useTenant()
  const { toast } = useToast()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleAddClient = async (clientData) => {
    try {
      await addClient(currentTenant.id, clientData)
      setIsAddDialogOpen(false)
      setRefreshKey((prev) => prev + 1)
      toast({
        title: "Cliente agregado",
        description: "El cliente ha sido agregado correctamente.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo agregar el cliente.",
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestión de Clientes</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Cliente</DialogTitle>
                <DialogDescription>Ingresa los datos del nuevo cliente y su producto</DialogDescription>
              </DialogHeader>
              <ClientForm onSubmit={handleAddClient} />
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-muted-foreground">Administra tus clientes y sus productos</p>
      </div>

      <ClientsTable key={refreshKey} />
    </div>
  )
}
