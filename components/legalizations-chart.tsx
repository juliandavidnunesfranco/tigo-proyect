"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { getLegalizationsData } from "@/lib/reports-service"

type LegalizationsChartProps = {
  period: string
}

export function LegalizationsChart({ period }: LegalizationsChartProps) {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const legalizationsData = await getLegalizationsData(period)
      setData(legalizationsData)
    }

    fetchData()
  }, [period])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
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
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" name="Ventas" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line yAxisId="left" type="monotone" name="Legalizaciones" dataKey="legalizations" stroke="#82ca9d" />
        <Line yAxisId="right" type="monotone" name="Tiempo Promedio (horas)" dataKey="avgTime" stroke="#ff8042" />
      </LineChart>
    </ResponsiveContainer>
  )
}
