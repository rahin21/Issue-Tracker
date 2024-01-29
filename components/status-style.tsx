import { cn } from "@/lib/utils";
import React from "react";

const StatusStyle = ({className,status}:{className?:string, status: string}) => {
  return (
    <span
    
      className={cn(`${
        status == `In Progress`
          ? `bg-purple-400/50 text-purple-700 p-2 dark:border-2 border-purple-700`
          : status == `Closed`
          ? `p-2 bg-green-400/50 text-green-700 dark:border-2 border-green-700`
          : `p-2 bg-rose-400/50 text-rose-700 dark:border-2 border-rose-700`
      } rounded-xl font-semibold dark:bg-transparent `, className) }
    >
      {status}
    </span>
  );
};

export default StatusStyle;
