"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, BarChart3, Bell, Settings, Menu, X, LogOut, Building2, UserCog } from "lucide-react"
import { useState } from "react"
import { TenantSelector } from "@/components/tenant-selector"
import { useAuth } from "@/providers/auth-provider"
import { useTenant } from "@/providers/tenant-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
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
    <>
      <div className="flex h-16 items-center px-4 border-b">
        <div className="flex items-center gap-2 font-bold text-xl">
          <span className="text-primary">TIGO</span>
          <span>CRM</span>
        </div>

        <div className="ml-4 w-[200px]">
          <TenantSelector />
        </div>

        <nav className="hidden md:flex items-center ml-auto space-x-1">
          {routes.map((route) => (
            <Button key={route.href} variant={pathname === route.href ? "default" : "ghost"} asChild>
              <Link href={route.href} className="flex items-center gap-2">
                {route.icon}
                {route.label}
              </Link>
            </Button>
          ))}

          {adminRoutes.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={pathname.includes("/dashboard/admin") ? "default" : "ghost"}>
                  <Settings className="h-5 w-5 mr-2" />
                  Administración
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {adminRoutes.map((route) => (
                  <DropdownMenuItem key={route.href} asChild>
                    <Link href={route.href} className="flex items-center gap-2 cursor-pointer">
                      {route.icon}
                      {route.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>

        <div className="ml-auto md:ml-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button variant="ghost" size="icon" className="ml-2 md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-background">
          <nav className="flex flex-col p-4 space-y-2">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={pathname === route.href ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setIsOpen(false)}
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
                <div className="pt-2 pb-1 px-2 text-sm font-medium text-muted-foreground">Administración</div>
                {adminRoutes.map((route) => (
                  <Button
                    key={route.href}
                    variant={pathname === route.href ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setIsOpen(false)}
                    asChild
                  >
                    <Link href={route.href} className="flex items-center gap-2">
                      {route.icon}
                      {route.label}
                    </Link>
                  </Button>
                ))}
              </>
            )}

            <Button
              variant="ghost"
              className="justify-start text-red-500 hover:text-red-500 hover:bg-red-50 mt-4"
              onClick={logout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Cerrar sesión
            </Button>
          </nav>
        </div>
      )}
    </>
  )
}
