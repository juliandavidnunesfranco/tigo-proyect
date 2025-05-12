"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type PromotionsListProps = {
  productType: string
}

export function PromotionsList({ productType }: PromotionsListProps) {
  const [promotions, setPromotions] = useState([])

  useEffect(() => {
    // Simulamos datos de promociones según el tipo de producto
    let promotionsData = []

    if (productType === "mobile") {
      promotionsData = [
        {
          id: "1",
          company: "TIGO",
          title: "50% de descuento por 3 meses en planes pospago",
          description: "Aplica para nuevos clientes que adquieran planes pospago de 25GB o más",
          validUntil: "30/06/2023",
          isExclusive: true,
        },
        {
          id: "2",
          company: "Claro",
          title: "Doble de datos por 6 meses",
          description: "En todos los planes pospago nuevos",
          validUntil: "15/06/2023",
          isExclusive: false,
        },
        {
          id: "3",
          company: "TIGO",
          title: "Smartphone gratis en planes de alto valor",
          description: "Llévate un smartphone de gama media al adquirir un plan de $79.900 o superior",
          validUntil: "30/05/2023",
          isExclusive: true,
        },
        {
          id: "4",
          company: "Movistar",
          title: "Netflix incluido por 12 meses",
          description: "En planes de $59.900 o superior",
          validUntil: "31/07/2023",
          isExclusive: false,
        },
      ]
    } else if (productType === "home") {
      promotionsData = [
        {
          id: "1",
          company: "TIGO",
          title: "Internet 300MB a precio de 200MB por 6 meses",
          description: "Aplica para nuevas instalaciones en zonas de cobertura",
          validUntil: "30/06/2023",
          isExclusive: true,
        },
        {
          id: "2",
          company: "Claro",
          title: "Instalación gratuita + 2 meses al 50%",
          description: "En todos los planes de internet hogar",
          validUntil: "15/06/2023",
          isExclusive: false,
        },
        {
          id: "3",
          company: "TIGO",
          title: "Router WiFi 6 gratis",
          description: "En planes de 200MB o superior",
          validUntil: "30/05/2023",
          isExclusive: true,
        },
      ]
    } else {
      // Datos por defecto para otros tipos de productos
      promotionsData = [
        {
          id: "1",
          company: "TIGO",
          title: "3 meses gratis de HBO y Disney+",
          description: "En planes de TV digital avanzada",
          validUntil: "30/06/2023",
          isExclusive: true,
        },
        {
          id: "2",
          company: "DirecTV",
          title: "50% de descuento en paquete deportivo",
          description: "Por 6 meses en nuevas suscripciones",
          validUntil: "15/06/2023",
          isExclusive: false,
        },
        {
          id: "3",
          company: "TIGO",
          title: "Decodificador 4K sin costo adicional",
          description: "En planes premium",
          validUntil: "30/05/2023",
          isExclusive: true,
        },
      ]
    }

    setPromotions(promotionsData)
  }, [productType])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {promotions.map((promo) => (
        <Card key={promo.id} className={`overflow-hidden ${promo.company === "TIGO" ? "border-blue-200" : ""}`}>
          <CardContent className="p-0">
            <div
              className={`p-1 text-center text-sm font-medium ${promo.company === "TIGO" ? "bg-blue-100 text-blue-700" : "bg-muted text-muted-foreground"}`}
            >
              {promo.company}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{promo.title}</h3>
                {promo.isExclusive && promo.company === "TIGO" && <Badge className="bg-blue-500">Exclusivo</Badge>}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{promo.description}</p>
              <p className="text-xs text-muted-foreground">Válido hasta: {promo.validUntil}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
