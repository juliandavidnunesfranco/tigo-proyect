"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { getSalesData } from "@/lib/reports-service"

type SalesChartProps = {
  period: string
}

export function SalesChart({ period }: SalesChartProps) {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const salesData = await getSalesData(period)
      setData(salesData)
    }

    fetchData()
  }, [period])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar name="Plan Móvil" dataKey="mobile" fill="#8884d8" />
        <Bar name="Plan Hogar" dataKey="home" fill="#82ca9d" />
        <Bar name="Prepago" dataKey="prepaid" fill="#ffc658" />
        <Bar name="Reposición Chip" dataKey="chip" fill="#ff8042" />
      </BarChart>
    </ResponsiveContainer>
  )
}
