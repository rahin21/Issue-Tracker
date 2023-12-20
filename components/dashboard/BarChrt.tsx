"use client";

import useDisclosure from "@/hooks/useDisclosure";
import { issuesTypeI } from "@/types/types";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { statusCount } from "./statusCounts";

export function BarChrt() {

  
  const {data, setData} = useDisclosure();
 
  const {open, close, process} = statusCount(data);

  
    console.log(open, close, process)

  const status = [
    {
      name: "Open",
      total: open,
    },
    {
      name: "Closed",
      total: close,
    },
    {
      name: "In Progress",
      total: process,
    },
  ];
  const total: number = open+ close+ process
  return (
    <div className="border-4 py-10 border-slate rounded-lg">
      <h1 className="text-xl font-semibold"> Status Chart</h1>
      <ResponsiveContainer width="30%" height={350}>
        <BarChart data={status}>
          <XAxis
            dataKey="name"
            stroke="#6b4caa"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip />
          <YAxis
          type="number"
            dataKey="total"
            stroke="#6b4caa"
            autoReverse
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Bar dataKey={"total"} radius={[6, 6, 0, 0]} fill="#c084fc" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
