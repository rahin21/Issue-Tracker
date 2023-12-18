"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Open",
    total: 5,
  },
  {
    name: "Closed",
    total: 3,
  },
  {
    name: "In Progress",
    total: 2,
  },
]

export function BarChrt() {
  return (
    <ResponsiveContainer width="30%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#6b4caa"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#6b4caa"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" radius={[4, 4, 0, 0]} fill="#c084fc"/>      
      </BarChart>
    </ResponsiveContainer>
  )
}