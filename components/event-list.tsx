import { Button } from "@/components/ui/button"
import { Edit, Trash2, UserCheck, FileCheck, Users, Bell } from "lucide-react"

type Event = {
  id: string
  title: string
  date: Date
  time: string
  type: string
  description: string
}

type EventListProps = {
  events: Event[]
}

export function EventList({ events }: EventListProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "follow-up":
        return <UserCheck className="h-5 w-5 text-blue-500" />
      case "legalization":
        return <FileCheck className="h-5 w-5 text-green-500" />
      case "meeting":
        return <Users className="h-5 w-5 text-purple-500" />
      case "reminder":
        return <Bell className="h-5 w-5 text-amber-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getEventTypeName = (type: string) => {
    switch (type) {
      case "follow-up":
        return "Seguimiento"
      case "legalization":
        return "Legalización"
      case "meeting":
        return "Reunión"
      case "reminder":
        return "Recordatorio"
      default:
        return "Evento"
    }
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg">
          <div className="mt-1">{getEventIcon(event.type)}</div>
          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className="font-medium">{event.title}</h3>
              <div className="text-sm font-medium">{event.time}</div>
            </div>
            <div className="text-sm text-muted-foreground mt-1">{event.description}</div>
            <div className="flex items-center mt-2 text-xs text-muted-foreground">
              <span className="bg-muted px-2 py-0.5 rounded">{getEventTypeName(event.type)}</span>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
