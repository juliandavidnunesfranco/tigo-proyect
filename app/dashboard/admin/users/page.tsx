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
import { getAllUsers } from "@/lib/data-service"
import { UserForm } from "@/components/user-form"

export default function UsersAdminPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      try {
        const data = await getAllUsers()
        setUsers(data)
      } catch (error) {
        console.error("Error fetching users:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar los usuarios",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [toast])

  // Verificar si el usuario tiene permisos de administrador
 /*  if (user?.role !== "SYSTEM_ADMIN" && user?.role !== "STORE_ADMIN") {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h1 className="text-2xl font-bold mb-2">Acceso Restringido</h1>
        <p className="text-muted-foreground">No tienes permisos para acceder a esta sección.</p>
      </div>
    )
  } */

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddUser = (userData) => {
    // Simulamos la adición de un nuevo usuario
    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      ...userData,
      status: "ACTIVE",
      createdAt: new Date(),
    }

    setUsers([...users, newUser])
    setIsAddDialogOpen(false)

    toast({
      title: "Usuario agregado",
      description: "El usuario ha sido agregado correctamente.",
    })
  }

  const getRoleBadge = (role) => {
    switch (role) {
      case "SELLER":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            Vendedor
          </Badge>
        )
      case "STORE_ADMIN":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
            Admin Tienda
          </Badge>
        )
      case "MANAGER":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
            Gerente
          </Badge>
        )
      case "SYSTEM_ADMIN":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            Admin Sistema
          </Badge>
        )
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                <DialogDescription>Ingresa los datos del nuevo usuario</DialogDescription>
              </DialogHeader>
              <UserForm onSubmit={handleAddUser} />
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-muted-foreground">Administra los usuarios del sistema</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usuarios</CardTitle>
          <CardDescription>Listado de todos los usuarios registrados en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, email o rol..."
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
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Tiendas</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                      Cargando usuarios...
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                      No se encontraron usuarios
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{getRoleBadge(u.role)}</TableCell>
                      <TableCell>
                        {u.tenants?.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {u.tenants.map((tenant, index) => (
                              <Badge key={index} variant="outline" className="bg-gray-100">
                                {tenant}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Todas las tiendas</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {u.status === "ACTIVE" ? (
                          <Badge className="bg-green-500">Activo</Badge>
                        ) : (
                          <Badge variant="outline" className="text-red-500 border-red-500">
                            Inactivo
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            {u.status === "ACTIVE" ? (
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
