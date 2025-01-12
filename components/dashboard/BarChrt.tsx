"use client";

import useDisclosure from "@/hooks/useDisclosure";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { statusCount } from "./statusCounts";
import StatusCard from "./StatusCard";

export function BarChrt() {

  const {data} = useDisclosure();
  const {open, close, progress} = statusCount(data);
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
      total: progress,
    },
  ];
  return (
    <div className="mb-4">
      <div className="flex space-x-4  mb-4">
        <StatusCard statusName="Open" statusNum={open}/>
        <StatusCard statusName="Closed" statusNum={close}/>
        <StatusCard statusName="In Progress" statusNum={progress}/>
      </div>
      <ResponsiveContainer height={320} className="border-2 border-muted-foreground/50 rounded-lg ">
        <BarChart 
        data={status}
        margin={{
          top: 30,
          right: 30,
          left: 0,
          bottom: 5,
        }}
        barSize={70}>
          <XAxis
            dataKey="name"
            padding={{left:10, right:10}}
            stroke="#6b4caa"
            fontSize={12}
          />
          <Tooltip />
          <YAxis
          type="number"
            dataKey="total"
            stroke="#6b4caa"
            autoReverse
            fontSize={12}
          />
          <Bar dataKey={"total"} radius={[2, 2, 0, 0]} fill="#c084fc" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
