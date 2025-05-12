"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, Users, BarChart3, Bell, Building2, UserCog, ChevronRight } from "lucide-react"
import { useAuth } from "@/providers/auth-provider"
import { useTenant } from "@/providers/tenant-provider"

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()
  const { currentTenant } = useTenant()

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      href: "/dashboard/clients",
      label: "Clientes",
      icon: <Users className="h-5 w-5" />,
    },
    {
      href: "/dashboard/reports",
      label: "Reportes",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      href: "/dashboard/notifications",
      label: "Notificaciones",
      icon: <Bell className="h-5 w-5" />,
    },
  ]

  // Rutas de administración solo para roles específicos
  const adminRoutes = []

  if (user?.role === "SYSTEM_ADMIN" || user?.role === "MANAGER") {
    adminRoutes.push({
      href: "/dashboard/admin/tenants",
      label: "Tiendas",
      icon: <Building2 className="h-5 w-5" />,
    })
  }

  if (user?.role === "SYSTEM_ADMIN" || user?.role === "STORE_ADMIN") {
    adminRoutes.push({
      href: "/dashboard/admin/users",
      label: "Usuarios",
      icon: <UserCog className="h-5 w-5" />,
    })
  }

  return (
    <div className="hidden md:flex h-full w-64 flex-col border-r bg-muted/40">
      <div className="p-4">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <span className="text-primary">Tienda:</span>
          <span className="truncate">{currentTenant?.name}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {currentTenant?.city}, {currentTenant?.region}
        </div>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="flex flex-col gap-1 py-2">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn("justify-start", pathname === route.href && "bg-primary/10 font-medium")}
              asChild
            >
              <Link href={route.href} className="flex items-center gap-2">
                {route.icon}
                {route.label}
              </Link>
            </Button>
          ))}

          {adminRoutes.length > 0 && (
            <>
              <div className="pt-4 pb-2 px-4 text-xs font-medium text-muted-foreground">ADMINISTRACIÓN</div>
              {adminRoutes.map((route) => (
                <Button
                  key={route.href}
                  variant={pathname === route.href ? "secondary" : "ghost"}
                  className={cn("justify-start", pathname === route.href && "bg-primary/10 font-medium")}
                  asChild
                >
                  <Link href={route.href} className="flex items-center gap-2">
                    {route.icon}
                    {route.label}
                    {pathname === route.href && <ChevronRight className="ml-auto h-4 w-4" />}
                  </Link>
                </Button>
              ))}
            </>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex flex-col">
          <div className="font-medium">{user?.name}</div>
          <div className="text-xs text-muted-foreground">{user?.role}</div>
        </div>
      </div>
    </div>
  )
}
