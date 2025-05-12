"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, CalendarIcon } from "lucide-react"
import { EventForm } from "@/components/event-form"
import { EventList } from "@/components/event-list"

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)

  // Datos simulados de eventos
  const events = [
    {
      id: "1",
      title: "Seguimiento a Juan Pérez",
      date: new Date(),
      time: "10:00 AM",
      type: "follow-up",
      description: "Llamar para verificar satisfacción con el servicio",
    },
    {
      id: "2",
      title: "Legalización María Gómez",
      date: new Date(),
      time: "2:30 PM",
      type: "legalization",
      description: "Completar proceso de legalización pendiente",
    },
    {
      id: "3",
      title: "Reunión de equipo",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      time: "9:00 AM",
      type: "meeting",
      description: "Revisión de metas semanales",
    },
  ]

  // Filtrar eventos para la fecha seleccionada
  const filteredEvents = events.filter(
    (event) =>
      date &&
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear(),
  )

  return (
    <main className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Calendario</h1>
        <p className="text-muted-foreground">Gestiona tus citas y recordatorios</p>
      </div>

      <div className="flex justify-end mb-6">
        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Evento</DialogTitle>
              <DialogDescription>Crea un nuevo evento o recordatorio en tu calendario</DialogDescription>
            </DialogHeader>
            <EventForm onSubmit={() => setIsAddEventOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Calendario</CardTitle>
            <CardDescription>Selecciona una fecha para ver eventos</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Eventos para {date?.toLocaleDateString()}</CardTitle>
              <CardDescription>Listado de eventos y recordatorios programados</CardDescription>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>{date?.toLocaleDateString()}</span>
            </div>
          </CardHeader>
          <CardContent>
            {filteredEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No hay eventos programados para esta fecha</div>
            ) : (
              <EventList events={filteredEvents} />
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
