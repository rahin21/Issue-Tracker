import React from "react";
import { CardTitle } from "../ui/card";
import { FaBug } from "react-icons/fa";

function TransparentLeftSide() {
  return (
    <div className="w-1/2 h-full lg:flex flex-col items-center justify-center border-8 border-white rounded-l-2xl hidden">
      <CardTitle className="bg-white rounded-full text-black w-fit p-4">
        <FaBug size={60} />
      </CardTitle>
      <h1 className="text-white text-3xl font-medium text-center mt-3">
        Issue Tracker
      </h1>
      <h1 className="text-white text-lg font-medium text-center mt-1">
        Deal with your Issues like a Pro
      </h1>
    </div>
  );
}

export default TransparentLeftSide;
