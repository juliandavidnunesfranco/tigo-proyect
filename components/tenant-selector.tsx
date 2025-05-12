"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useTenant } from "@/providers/tenant-provider"
import { getTenants } from "@/lib/data-service"

export function TenantSelector() {
  const [open, setOpen] = useState(false)
  const [tenants, setTenants] = useState([])
  const { currentTenant, setCurrentTenant } = useTenant()

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const data = await getTenants()
        setTenants(data)

        // Si no hay tenant seleccionado, seleccionar el primero
        if (!currentTenant && data.length > 0) {
          setCurrentTenant(data[0])
        }
      } catch (error) {
        console.error("Error fetching tenants:", error)
      }
    }

    fetchTenants()
  }, [currentTenant, setCurrentTenant])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {currentTenant ? `${currentTenant.name} (${currentTenant.city})` : "Seleccionar tienda..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Buscar tienda..." />
          <CommandList>
            <CommandEmpty>No se encontraron tiendas.</CommandEmpty>
            <CommandGroup>
              {tenants.map((tenant) => (
                <CommandItem
                  key={tenant.id}
                  value={tenant.id}
                  onSelect={() => {
                    setCurrentTenant(tenant)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4", currentTenant?.id === tenant.id ? "opacity-100" : "opacity-0")}
                  />
                  {tenant.name} ({tenant.city})
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
