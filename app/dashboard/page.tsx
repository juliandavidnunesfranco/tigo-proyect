/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useEffect, useState } from "react"
import { DashboardStats } from "@/components/dashboard-stats"
import { ClientsTable } from "@/components/clients-table"
import { PendingLegalizations } from "@/components/pending-legalizations"
import { RecentActivity } from "@/components/recent-activity"
import { useAuth } from "@/providers/auth-provider"
import { useTenant } from "@/providers/tenant-provider"
import { Skeleton } from "@/components/ui/skeleton"
import { getTenantData } from "@/lib/data-service"

export default function Dashboard() {
 /*  const { user } = useAuth()
  const { currentTenant } = useTenant()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (currentTenant) {
        setIsLoading(true)
        try {
          // Obtener datos específicos del tenant
          const tenantData = await getTenantData(currentTenant.id)
          setData(tenantData)
        } catch (error) {
          console.error("Error fetching tenant data:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchData()
  }, [currentTenant]) */

 /*  if (isLoading) {
    return <DashboardSkeleton />
  } */

  return (
    <div>
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Dashboard TIGO CRM</h1>
        <p className="text-muted-foreground">
        {/*   Tienda: {currentTenant?.name} | Usuario: {user?.name} ({user?.role}) */}
        tienda la tienda  / usuario uno rol uno
        </p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <PendingLegalizations />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      <div className="mt-6">
        <ClientsTable />
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div>
      <div className="flex flex-col gap-2 mb-8">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5">
                <Skeleton className="h-5 w-1/3" />
              </div>
              <div className="p-6 pt-0 grid gap-2">
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <Skeleton className="h-[300px] w-full" />
        </div>
        <div>
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>

      <div className="mt-6">
        <Skeleton className="h-[400px] w-full" />
      </div>
    </div>
  )
}
