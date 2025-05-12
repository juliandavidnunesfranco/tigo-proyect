"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { getCommissionsTableData } from "@/lib/reports-service"

type CommissionsTableProps = {
  period: string
}

export function CommissionsTable({ period }: CommissionsTableProps) {
  const [data, setData] = useState([])
  const [totals, setTotals] = useState({
    totalSales: 0,
    totalCommission: 0,
    commissionRate: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data, totals } = await getCommissionsTableData(period)
      setData(data)
      setTotals(totals)
    }

    fetchData()
  }, [period])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-muted-foreground">Ventas Totales</div>
          <div className="text-2xl font-bold">${totals.totalSales.toLocaleString()}</div>
        </div>
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-muted-foreground">Comisión Total</div>
          <div className="text-2xl font-bold">${totals.totalCommission.toLocaleString()}</div>
        </div>
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-muted-foreground">Tasa de Comisión</div>
          <div className="text-2xl font-bold">{totals.commissionRate}%</div>
          <Progress value={totals.commissionRate} className="h-2 mt-2" />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo de Producto</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Ventas</TableHead>
              <TableHead>Deserción</TableHead>
              <TableHead className="text-right">Comisión</TableHead>
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
              data.map((item) => (
                <TableRow key={item.type}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.count}</TableCell>
                  <TableCell>${item.sales.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{item.desertionRate}%</span>
                      <Progress value={item.desertionRate} className="h-2 w-20" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">${item.commission.toLocaleString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
