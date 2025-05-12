"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

type CompetitorComparisonProps = {
  productType: string
}

export function CompetitorComparison({ productType }: CompetitorComparisonProps) {
  const [data, setData] = useState([])

  useEffect(() => {
    // Simulamos datos de comparación según el tipo de producto
    let comparisonData = []

    if (productType === "mobile") {
      comparisonData = [
        {
          feature: "Precio mensual",
          tigo: "$45,000",
          claro: "$49,900",
          movistar: "$47,900",
          wom: "$39,900",
          highlight: true,
        },
        {
          feature: "Datos incluidos",
          tigo: "25 GB",
          claro: "20 GB",
          movistar: "22 GB",
          wom: "30 GB",
          highlight: true,
        },
        {
          feature: "Minutos ilimitados",
          tigo: true,
          claro: true,
          movistar: true,
          wom: true,
          highlight: false,
        },
        {
          feature: "Redes sociales ilimitadas",
          tigo: true,
          claro: false,
          movistar: true,
          wom: true,
          highlight: true,
        },
        {
          feature: "Streaming sin consumo de datos",
          tigo: true,
          claro: true,
          movistar: false,
          wom: false,
          highlight: true,
        },
        {
          feature: "Compartir datos",
          tigo: "10 GB",
          claro: "5 GB",
          movistar: "8 GB",
          wom: "15 GB",
          highlight: false,
        },
        {
          feature: "Roaming incluido",
          tigo: "5 días",
          claro: "3 días",
          movistar: "7 días",
          wom: "No",
          highlight: true,
        },
      ]
    } else if (productType === "home") {
      comparisonData = [
        {
          feature: "Precio mensual",
          tigo: "$85,000",
          claro: "$89,900",
          movistar: "$92,900",
          etb: "$79,900",
          highlight: true,
        },
        {
          feature: "Velocidad de descarga",
          tigo: "300 Mbps",
          claro: "200 Mbps",
          movistar: "300 Mbps",
          etb: "200 Mbps",
          highlight: true,
        },
        {
          feature: "Velocidad de subida",
          tigo: "30 Mbps",
          claro: "20 Mbps",
          movistar: "30 Mbps",
          etb: "20 Mbps",
          highlight: false,
        },
        {
          feature: "WiFi 6",
          tigo: true,
          claro: false,
          movistar: true,
          etb: false,
          highlight: true,
        },
        {
          feature: "Instalación gratuita",
          tigo: true,
          claro: true,
          movistar: true,
          etb: true,
          highlight: false,
        },
        {
          feature: "Soporte 24/7",
          tigo: true,
          claro: true,
          movistar: false,
          etb: false,
          highlight: true,
        },
      ]
    } else {
      // Datos por defecto para otros tipos de productos
      comparisonData = [
        {
          feature: "Precio mensual",
          tigo: "$65,000",
          claro: "$69,900",
          movistar: "$67,900",
          directv: "$59,900",
          highlight: true,
        },
        {
          feature: "Canales HD",
          tigo: "80+",
          claro: "70+",
          movistar: "75+",
          directv: "90+",
          highlight: true,
        },
        {
          feature: "Canales Premium",
          tigo: "15",
          claro: "10",
          movistar: "12",
          directv: "20",
          highlight: true,
        },
        {
          feature: "Aplicación móvil",
          tigo: true,
          claro: true,
          movistar: true,
          directv: true,
          highlight: false,
        },
        {
          feature: "Grabación en la nube",
          tigo: true,
          claro: false,
          movistar: true,
          directv: true,
          highlight: true,
        },
      ]
    }

    setData(comparisonData)
  }, [productType])

  const renderValue = (value: any) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-red-500 mx-auto" />
      )
    }
    return value
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Característica</TableHead>
            <TableHead className="text-center bg-blue-50">TIGO</TableHead>
            {productType === "mobile" && (
              <>
                <TableHead className="text-center">Claro</TableHead>
                <TableHead className="text-center">Movistar</TableHead>
                <TableHead className="text-center">WOM</TableHead>
              </>
            )}
            {productType === "home" && (
              <>
                <TableHead className="text-center">Claro</TableHead>
                <TableHead className="text-center">Movistar</TableHead>
                <TableHead className="text-center">ETB</TableHead>
              </>
            )}
            {productType !== "mobile" && productType !== "home" && (
              <>
                <TableHead className="text-center">Claro</TableHead>
                <TableHead className="text-center">Movistar</TableHead>
                <TableHead className="text-center">DirecTV</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {row.feature}
                {row.highlight && (
                  <Badge variant="outline" className="ml-2 text-xs">
                    Destacado
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-center bg-blue-50 font-medium">{renderValue(row.tigo)}</TableCell>
              <TableCell className="text-center">{renderValue(row.claro)}</TableCell>
              <TableCell className="text-center">{renderValue(row.movistar)}</TableCell>
              <TableCell className="text-center">
                {renderValue(productType === "mobile" ? row.wom : productType === "home" ? row.etb : row.directv)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
