"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { getCommissionsData } from "@/lib/reports-service"

type CommissionsChartProps = {
  period: string
}

export function CommissionsChart({ period }: CommissionsChartProps) {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const commissionsData = await getCommissionsData(period)
      setData(commissionsData)
    }

    fetchData()
  }, [period])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
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
        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
        <Legend />
        <Area
          type="monotone"
          name="Ventas Totales"
          dataKey="sales"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Area
          type="monotone"
          name="Comisión"
          dataKey="commission"
          stackId="2"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.6}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
