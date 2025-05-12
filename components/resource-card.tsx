import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"

type ResourceCardProps = {
  title: string
  type: string
  date: string
  description: string
}

export function ResourceCard({ title, type, date, description }: ResourceCardProps) {
  const getIcon = () => {
    switch (type) {
      case "PDF":
        return <div className="bg-red-100 text-red-600 p-2 rounded-md">PDF</div>
      case "DOCX":
        return <div className="bg-blue-100 text-blue-600 p-2 rounded-md">DOC</div>
      case "XLSX":
        return <div className="bg-green-100 text-green-600 p-2 rounded-md">XLS</div>
      default:
        return <div className="bg-gray-100 text-gray-600 p-2 rounded-md">{type}</div>
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 flex gap-4">
          <div className="mt-1">{getIcon()}</div>
          <div className="flex-1">
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
            <p className="text-xs text-muted-foreground mt-1">Actualizado: {date}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-2 flex justify-end">
        <Button variant="ghost" size="sm">
          <FileText className="h-4 w-4 mr-1" />
          Ver
        </Button>
        <Button variant="ghost" size="sm">
          <Download className="h-4 w-4 mr-1" />
          Descargar
        </Button>
      </CardFooter>
    </Card>
  )
}
