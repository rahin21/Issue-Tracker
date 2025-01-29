import React from "react";
import { CardHeader, CardTitle } from "../ui/card";
import { FaBug } from "react-icons/fa";

function UnAuthTitle({title}:{title:string}) {
  return (
    <CardHeader className="flex flex-col items-center">
      <CardTitle className="bg-foreground rounded-full text-white w-fit p-4">
        <FaBug size={30} />
      </CardTitle>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
  );
}

export default UnAuthTitle;
