"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Check, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/providers/auth-provider"
import { getAllTenants } from "@/lib/data-service"
import { TenantForm } from "@/components/tenant-form"

export default function TenantsAdminPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [tenants, setTenants] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTenants = async () => {
      setIsLoading(true)
      try {
        const data = await getAllTenants()
        setTenants(data)
      } catch (error) {
        console.error("Error fetching tenants:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar las tiendas",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTenants()
  }, [toast])

 /*  // Verificar si el usuario tiene permisos de administrador
  if (user?.role !== "SYSTEM_ADMIN" && user?.role !== "MANAGER") {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h1 className="text-2xl font-bold mb-2">Acceso Restringido</h1>
        <p className="text-muted-foreground">No tienes permisos para acceder a esta sección.</p>
      </div>
    )
  } */

  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.city.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddTenant = (tenantData) => {
    // Simulamos la adición de un nuevo tenant
    const newTenant = {
      id: Math.random().toString(36).substring(2, 9),
      ...tenantData,
      status: "ACTIVE",
      createdAt: new Date(),
    }

    setTenants([...tenants, newTenant])
    setIsAddDialogOpen(false)

    toast({
      title: "Tienda agregada",
      description: "La tienda ha sido agregada correctamente.",
    })
  }

  return (
    <div>
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestión de Tiendas</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Tienda
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Agregar Nueva Tienda</DialogTitle>
                <DialogDescription>Ingresa los datos de la nueva tienda</DialogDescription>
              </DialogHeader>
              <TenantForm onSubmit={handleAddTenant} />
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-muted-foreground">Administra las tiendas del sistema</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tiendas</CardTitle>
          <CardDescription>Listado de todas las tiendas registradas en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, código o ciudad..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Ciudad</TableHead>
                  <TableHead>Región</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                      Cargando tiendas...
                    </TableCell>
                  </TableRow>
                ) : filteredTenants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                      No se encontraron tiendas
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTenants.map((tenant) => (
                    <TableRow key={tenant.id}>
                      <TableCell className="font-medium">{tenant.code}</TableCell>
                      <TableCell>{tenant.name}</TableCell>
                      <TableCell>{tenant.city}</TableCell>
                      <TableCell>{tenant.region}</TableCell>
                      <TableCell>
                        {tenant.status === "ACTIVE" ? (
                          <Badge className="bg-green-500">Activa</Badge>
                        ) : (
                          <Badge variant="outline" className="text-red-500 border-red-500">
                            Inactiva
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            {tenant.status === "ACTIVE" ? (
                              <X className="h-4 w-4 text-red-500" />
                            ) : (
                              <Check className="h-4 w-4 text-green-500" />
                            )}
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
