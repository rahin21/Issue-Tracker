"use client";
import React from "react";
import { motion } from "framer-motion";
const Loading = () => {
  return (
    <div className="flex justify-center items-center  w-full h-[80vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat:Infinity, duration:1, ease:'linear'}}
          className="border-8 border-t-[#936ce2] p-4 m-4 w-4 rounded-full"
        />
      <h1 className="text-xl md:text-4xl font-semibold">Loading...</h1>
    </div>
  );
};

export default Loading;
