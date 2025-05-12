"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getSalesTableData } from "@/lib/reports-service"

type SalesTableProps = {
  period: string
}

export function SalesTable({ period }: SalesTableProps) {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const salesData = await getSalesTableData(period)
      setData(salesData)
    }

    fetchData()
  }, [period])

  const getProductTypeBadge = (type: string) => {
    switch (type) {
      case "mobile":
        return <Badge className="bg-[#8884d8]">Plan Móvil</Badge>
      case "home":
        return <Badge className="bg-[#82ca9d]">Plan Hogar</Badge>
      case "prepaid":
        return <Badge className="bg-[#ffc658]">Prepago</Badge>
      case "chip":
        return <Badge className="bg-[#ff8042]">Reposición Chip</Badge>
      default:
        return <Badge variant="outline">Otro</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Producto</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                No hay datos para el período seleccionado
              </TableCell>
            </TableRow>
          ) : (
            data.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="font-medium">{sale.clientName}</div>
                  <div className="text-sm text-muted-foreground">CC: {sale.documentId}</div>
                </TableCell>
                <TableCell>{getProductTypeBadge(sale.productType)}</TableCell>
                <TableCell>
                  {sale.legalizationStatus === "completed" ? (
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      Legalizado
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-amber-500 border-amber-500">
                      Pendiente
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">${sale.value.toLocaleString()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
