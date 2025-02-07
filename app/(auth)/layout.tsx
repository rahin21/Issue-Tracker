import React from "react";
import "../globals.css";
import { Metadata } from "next";
import Image from "next/image";
import bgImage from "@/public/sign-in/backgroup.jpg";
import { SessionProvider } from "next-auth/react";
import Provider from "@/components/unAuth/Provider";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Issue Tracker | Sign In",
  description: "Deal with your Issues like a Pro",
};
const inter = Inter({ subsets: ["latin"] });

function AuthInLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative w-full h-screen bg-foreground">
          <Image
            src={bgImage}
            alt="Background Image"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <main className="relative z-10">{children}</main>
        </div>
      </body>
    </html>
  );
}

export default AuthInLayout;
