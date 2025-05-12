"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Edit, Trophy } from "lucide-react"

export default function GoalsPage() {
  const [period, setPeriod] = useState("current")

  // Datos simulados de metas
  const goals = {
    sales: {
      target: 25,
      current: 18,
      percentage: 72,
    },
    legalizations: {
      target: 22,
      current: 15,
      percentage: 68,
    },
    revenue: {
      target: 5000000,
      current: 3750000,
      percentage: 75,
    },
    retention: {
      target: 90,
      current: 85,
      percentage: 94,
    },
  }

  return (
    <main className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Metas y Objetivos</h1>
        <p className="text-muted-foreground">Seguimiento de tus metas comerciales</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">Mes actual</SelectItem>
            <SelectItem value="previous">Mes anterior</SelectItem>
            <SelectItem value="quarter">Trimestre actual</SelectItem>
            <SelectItem value="year">Año actual</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          Configurar metas
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Ventas</CardTitle>
            <Trophy
              className={`h-5 w-5 ${goals.sales.percentage >= 100 ? "text-yellow-500" : "text-muted-foreground"}`}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {goals.sales.current} / {goals.sales.target}
            </div>
            <Progress value={goals.sales.percentage} className="h-2 mt-2" />
            <p className="text-sm text-muted-foreground mt-2">{goals.sales.percentage}% completado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Legalizaciones</CardTitle>
            <Trophy
              className={`h-5 w-5 ${goals.legalizations.percentage >= 100 ? "text-yellow-500" : "text-muted-foreground"}`}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {goals.legalizations.current} / {goals.legalizations.target}
            </div>
            <Progress value={goals.legalizations.percentage} className="h-2 mt-2" />
            <p className="text-sm text-muted-foreground mt-2">{goals.legalizations.percentage}% completado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Ingresos</CardTitle>
            <Trophy
              className={`h-5 w-5 ${goals.revenue.percentage >= 100 ? "text-yellow-500" : "text-muted-foreground"}`}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(goals.revenue.current / 1000000).toFixed(1)}M / ${(goals.revenue.target / 1000000).toFixed(1)}M
            </div>
            <Progress value={goals.revenue.percentage} className="h-2 mt-2" />
            <p className="text-sm text-muted-foreground mt-2">{goals.revenue.percentage}% completado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Retención</CardTitle>
            <Trophy
              className={`h-5 w-5 ${goals.retention.percentage >= 100 ? "text-yellow-500" : "text-muted-foreground"}`}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {goals.retention.current}% / {goals.retention.target}%
            </div>
            <Progress value={goals.retention.percentage} className="h-2 mt-2" />
            <p className="text-sm text-muted-foreground mt-2">{goals.retention.percentage}% del objetivo</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Desempeño</CardTitle>
          <CardDescription>Comparativa de metas alcanzadas en períodos anteriores</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
          Aquí se mostraría un gráfico con el historial de cumplimiento de metas
        </CardContent>
      </Card>
    </main>
  )
}
