import React from "react";
import "../../globals.css";
import { Metadata } from "next";
import Image from "next/image";
import bgImage from "@/public/sign-in/backgroup.jpg";

export const metadata: Metadata = {
  title: "Issue Tracker | Sign In",
  description: "Generated by create next app",
};

function SignInLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-screen bg-foreground">
      <Image
        src={bgImage}
        alt="Background Image"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <main className="relative z-10">{children}</main>
    </div>
  );
}

export default SignInLayout;
