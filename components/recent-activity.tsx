"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getRecentActivity } from "@/lib/data-service"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { useTenant } from "@/providers/tenant-provider"

type Activity = {
  id: string
  type: "sale" | "legalization" | "cancellation"
  clientName: string
  timestamp: Date
  details: string
}

export function RecentActivity() {
  const { currentTenant } = useTenant()
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    const fetchActivities = async () => {
      if (currentTenant) {
        const data = await getRecentActivity(currentTenant.id)
        setActivities(data)
      }
    }

    fetchActivities()
  }, [currentTenant])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <span className="text-green-500 text-lg">●</span>
      case "legalization":
        return <span className="text-blue-500 text-lg">●</span>
      case "cancellation":
        return <span className="text-red-500 text-lg">●</span>
      default:
        return <span className="text-gray-500 text-lg">●</span>
    }
  }

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case "sale":
        return `Nueva venta: ${activity.details}`
      case "legalization":
        return `Legalización completada`
      case "cancellation":
        return `Cancelación: ${activity.details}`
      default:
        return activity.details
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
        <CardDescription>Últimas acciones registradas en el sistema</CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">No hay actividad reciente</div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                <div className="space-y-1">
                  <div className="font-medium">{activity.clientName}</div>
                  <div className="text-sm text-muted-foreground">{getActivityText(activity)}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(activity.timestamp), {
                      addSuffix: true,
                      locale: es,
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
