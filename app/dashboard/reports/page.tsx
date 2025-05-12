"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, Calendar } from "lucide-react"
import { SalesChart } from "@/components/sales-chart"
import { CommissionsChart } from "@/components/commissions-chart"
import { LegalizationsChart } from "@/components/legalizations-chart"
import { SalesTable } from "@/components/sales-table"
import { CommissionsTable } from "@/components/commissions-table"
import { useTenant } from "@/providers/tenant-provider"

export default function ReportsPage() {
  const { currentTenant } = useTenant()
  const [period, setPeriod] = useState("current")

  return (
    <div>
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Reportes y Análisis</h1>
        <p className="text-muted-foreground">
          Visualiza el rendimiento de ventas y comisiones para {currentTenant?.name}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Mes actual</SelectItem>
              <SelectItem value="previous">Mes anterior</SelectItem>
              <SelectItem value="last3">Últimos 3 meses</SelectItem>
              <SelectItem value="last6">Últimos 6 meses</SelectItem>
              <SelectItem value="year">Año actual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar datos
        </Button>
      </div>

      <Tabs defaultValue="sales">
        <TabsList className="mb-4">
          <TabsTrigger value="sales">Ventas</TabsTrigger>
          <TabsTrigger value="commissions">Comisiones</TabsTrigger>
          <TabsTrigger value="legalizations">Legalizaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Reporte de Ventas</CardTitle>
                <CardDescription>Análisis de ventas por tipo de producto y período</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <SalesChart period={period} tenantId={currentTenant?.id} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalle de Ventas</CardTitle>
                <CardDescription>Listado de ventas realizadas en el período</CardDescription>
              </CardHeader>
              <CardContent>
                <SalesTable period={period} tenantId={currentTenant?.id} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="commissions">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Reporte de Comisiones</CardTitle>
                <CardDescription>Análisis de comisiones ganadas y proyectadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <CommissionsChart period={period} tenantId={currentTenant?.id} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalle de Comisiones</CardTitle>
                <CardDescription>Desglose de comisiones por tipo de producto</CardDescription>
              </CardHeader>
              <CardContent>
                <CommissionsTable period={period} tenantId={currentTenant?.id} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="legalizations">
          <Card>
            <CardHeader>
              <CardTitle>Reporte de Legalizaciones</CardTitle>
              <CardDescription>Análisis de tiempos de legalización y eficiencia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <LegalizationsChart period={period} tenantId={currentTenant?.id} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
