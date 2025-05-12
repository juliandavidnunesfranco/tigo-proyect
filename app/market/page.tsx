"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CompetitorComparison } from "@/components/competitor-comparison"
import { PromotionsList } from "@/components/promotions-list"

export default function MarketPage() {
  const [productType, setProductType] = useState("mobile")

  return (
    <main className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Análisis de Mercado</h1>
        <p className="text-muted-foreground">Comparativa de planes y ofertas de la competencia</p>
      </div>

      <div className="flex justify-end mb-6">
        <Select value={productType} onValueChange={setProductType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo de producto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mobile">Planes Móviles</SelectItem>
            <SelectItem value="home">Planes Hogar</SelectItem>
            <SelectItem value="tv">Televisión</SelectItem>
            <SelectItem value="combo">Planes Combo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="comparison">
        <TabsList className="mb-4">
          <TabsTrigger value="comparison">Comparativa</TabsTrigger>
          <TabsTrigger value="promotions">Promociones</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>
                Comparativa de Planes{" "}
                {productType === "mobile"
                  ? "Móviles"
                  : productType === "home"
                    ? "Hogar"
                    : productType === "tv"
                      ? "Televisión"
                      : "Combo"}
              </CardTitle>
              <CardDescription>Análisis comparativo de planes similares en el mercado</CardDescription>
            </CardHeader>
            <CardContent>
              <CompetitorComparison productType={productType} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promotions">
          <Card>
            <CardHeader>
              <CardTitle>Promociones Vigentes</CardTitle>
              <CardDescription>Promociones actuales de TIGO y la competencia</CardDescription>
            </CardHeader>
            <CardContent>
              <PromotionsList productType={productType} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
