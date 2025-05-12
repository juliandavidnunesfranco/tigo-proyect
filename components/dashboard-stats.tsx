"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, Users, AlertTriangle, DollarSign } from "lucide-react"
import { useEffect, useState } from "react"
import { getStats } from "@/lib/data-service"
import { useTenant } from "@/providers/tenant-provider"

type Stats = {
  totalClients: number
  pendingLegalizations: number
  completedLegalizations: number
  desertion: number
  commissionRate: number
  totalSales: number
}

export function DashboardStats() {
  const { currentTenant } = useTenant()
  const [stats, setStats] = useState<Stats>({
    totalClients: 0,
    pendingLegalizations: 0,
    completedLegalizations: 0,
    desertion: 0,
    commissionRate: 100,
    totalSales: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      if (currentTenant) {
        const data = await getStats(currentTenant.id)
        setStats(data)
      }
    }

    fetchStats()
  }, [currentTenant])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalClients}</div>
          <p className="text-xs text-muted-foreground">Clientes registrados en el sistema</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Legalizaciones Pendientes</CardTitle>
          <AlertTriangle className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pendingLegalizations}</div>
          <p className="text-xs text-muted-foreground">Requieren atención inmediata</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Tasa de Deserción</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.desertion}%</div>
          <div className="mt-2">
            <Progress value={stats.desertion} className="h-2" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {stats.desertion < 20 ? "Dentro del objetivo" : "Por encima del objetivo"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Comisión Proyectada</CardTitle>
          <DollarSign className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.commissionRate}%</div>
          <div className="mt-2">
            <Progress value={stats.commissionRate} className="h-2" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Basado en tasa de deserción actual</p>
        </CardContent>
      </Card>
    </div>
  )
}
