import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ResourceCard } from "@/components/resource-card"
import { TrainingCard } from "@/components/training-card"

export default function ResourcesPage() {
  return (
    <main className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Recursos y Capacitación</h1>
        <p className="text-muted-foreground">Materiales de apoyo para tu gestión comercial</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar recursos..." className="pl-8" />
      </div>

      <Tabs defaultValue="resources">
        <TabsList className="mb-4">
          <TabsTrigger value="resources">Documentos</TabsTrigger>
          <TabsTrigger value="training">Capacitaciones</TabsTrigger>
          <TabsTrigger value="scripts">Scripts de Venta</TabsTrigger>
        </TabsList>

        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResourceCard
              title="Catálogo de Planes Móviles 2023"
              type="PDF"
              date="15/03/2023"
              description="Catálogo actualizado con todos los planes móviles disponibles"
            />
            <ResourceCard
              title="Manual de Legalización"
              type="PDF"
              date="10/01/2023"
              description="Guía completa del proceso de legalización de ventas"
            />
            <ResourceCard
              title="Políticas de Comisiones"
              type="DOCX"
              date="05/02/2023"
              description="Documento con las políticas actualizadas de comisiones"
            />
            <ResourceCard
              title="Preguntas Frecuentes"
              type="PDF"
              date="20/04/2023"
              description="Respuestas a las preguntas más comunes de los clientes"
            />
            <ResourceCard
              title="Comparativa de Competencia"
              type="XLSX"
              date="01/05/2023"
              description="Análisis comparativo de planes de la competencia"
            />
            <ResourceCard
              title="Promociones Vigentes"
              type="PDF"
              date="01/06/2023"
              description="Listado de promociones vigentes para este mes"
            />
          </div>
        </TabsContent>

        <TabsContent value="training">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TrainingCard
              title="Técnicas de Venta Avanzadas"
              duration="45 minutos"
              completed={true}
              date="10/05/2023"
              description="Aprende técnicas avanzadas para cerrar más ventas"
            />
            <TrainingCard
              title="Nuevos Planes Hogar"
              duration="30 minutos"
              completed={true}
              date="15/05/2023"
              description="Capacitación sobre los nuevos planes de hogar"
            />
            <TrainingCard
              title="Manejo de Objeciones"
              duration="60 minutos"
              completed={false}
              date="20/05/2023"
              description="Aprende a manejar las objeciones más comunes de los clientes"
            />
            <TrainingCard
              title="Sistema de Legalización"
              duration="25 minutos"
              completed={false}
              date="25/05/2023"
              description="Tutorial sobre el nuevo sistema de legalización"
            />
          </div>
        </TabsContent>

        <TabsContent value="scripts">
          <Card>
            <CardHeader>
              <CardTitle>Scripts de Venta</CardTitle>
              <CardDescription>Guiones recomendados para diferentes situaciones de venta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Presentación Inicial</h3>
                  <p className="text-sm text-muted-foreground">
                    "Buenos días/tardes, mi nombre es [tu nombre] y soy asesor comercial de TIGO. Me gustaría hablarle
                    sobre nuestros nuevos planes que podrían interesarle. ¿Tiene unos minutos para conversar?"
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Manejo de Objeciones de Precio</h3>
                  <p className="text-sm text-muted-foreground">
                    "Entiendo su preocupación por el precio. Lo que hace especial a nuestro plan es [beneficio
                    principal]. Además, actualmente tenemos una promoción que le permite [describir promoción]. ¿Le
                    gustaría conocer más detalles?"
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Cierre de Venta</h3>
                  <p className="text-sm text-muted-foreground">
                    "Basado en lo que me ha comentado, el plan [nombre del plan] sería perfecto para usted porque
                    [razones]. ¿Le gustaría proceder con la activación ahora mismo? Puedo ayudarle con todo el proceso."
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Seguimiento Post-Venta</h3>
                  <p className="text-sm text-muted-foreground">
                    "Buenos días/tardes, soy [tu nombre] de TIGO. Quería verificar que todo esté funcionando
                    correctamente con su nuevo servicio y saber si tiene alguna pregunta adicional que pueda
                    responderle."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
