"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  FileText,
  Send,
  Trash2,
  Search,
  FileCheck,
} from "lucide-react";
import { getClients, deleteClient } from "@/lib/data-service";
import { toast } from "@/hooks/use-toast";
import { useTenant } from "@/providers/tenant-provider";

type Client = {
  id: string;
  name: string;
  documentId: string;
  phone: string;
  email: string;
  productType: string;
  status: "active" | "pending" | "cancelled";
  saleDate: Date;
};

export function ClientsTable() {
  const { currentTenant } = useTenant();
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      if (currentTenant) {
        const data = await getClients(currentTenant.id);
        setClients(data);
      }
    };

    fetchClients();
  }, [currentTenant]);

  const handleDeleteClient = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este cliente?")) {
      try {
        if (currentTenant) {
          await deleteClient(currentTenant.id, id);
        }
        setClients(clients.filter((client) => client.id !== id));
        toast({
          title: "Cliente eliminado",
          description: "El cliente ha sido eliminado correctamente.",
        });
      } catch{
        toast({
          title: "Error",
          description: "No se pudo eliminar el cliente.",
          variant: "destructive",
        });
      }
    }
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.documentId.includes(searchTerm) ||
      client.phone?.includes(searchTerm)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Activo</Badge>;
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            Pendiente
          </Badge>
        );
      case "cancelled":
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Clientes</CardTitle>
          <CardDescription>
            Gestiona tus clientes y sus productos
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, cédula o teléfono..."
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
                <TableHead>Cliente</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center h-24 text-muted-foreground"
                  >
                    No se encontraron clientes
                  </TableCell>
                </TableRow>
              ) : (
                filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-muted-foreground">
                        CC: {client.documentId}
                      </div>
                    </TableCell>
                    <TableCell>{client.productType}</TableCell>
                    <TableCell>{getStatusBadge(client.status)}</TableCell>
                    <TableCell>
                      {new Date(client.saleDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Abrir menú</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileCheck className="h-4 w-4 mr-2" />
                            Marcar como legalizado
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="h-4 w-4 mr-2" />
                            Enviar recordatorio
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteClient(client.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
