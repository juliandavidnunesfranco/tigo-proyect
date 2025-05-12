import { Suspense } from "react"
import { ClientsTable } from "@/components/clients-table"

export default function ClientsPage() {
  return (
    <main className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Gestión de Clientes</h1>
        <p className="text-muted-foreground">Administra tus clientes y sus productos</p>
      </div>

      <Suspense fallback={<div>Cargando...</div>}>
        <ClientsTable />
      </Suspense>
    </main>
  )
}
