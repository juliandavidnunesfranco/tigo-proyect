import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, CheckCircle, Clock } from "lucide-react"

type TrainingCardProps = {
  title: string
  duration: string
  completed: boolean
  date: string
  description: string
}

export function TrainingCard({ title, duration, completed, date, description }: TrainingCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{title}</h3>
          {completed ? (
            <div className="flex items-center text-green-500 text-sm">
              <CheckCircle className="h-4 w-4 mr-1" />
              Completado
            </div>
          ) : (
            <div className="flex items-center text-amber-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              Pendiente
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          {duration}
          <span className="mx-2">•</span>
          Publicado: {date}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4 flex justify-end">
        <Button>
          <Play className="h-4 w-4 mr-2" />
          {completed ? "Ver de nuevo" : "Comenzar"}
        </Button>
      </CardFooter>
    </Card>
  )
}
