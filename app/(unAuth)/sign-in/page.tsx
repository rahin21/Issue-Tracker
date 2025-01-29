"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { FaBug } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdLogIn } from "react-icons/io";

function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-1/2 h-3/4 flex bg-transparent border-none rounded-2xl">
        {/* Transparent Left Side */}
        <div className="w-1/2 h-full flex flex-col items-center justify-center border-8 border-white rounded-l-2xl">
          <CardTitle className="bg-white rounded-full text-black w-fit p-4">
            <FaBug size={60} />
          </CardTitle>
						<h1 className="text-white text-3xl font-medium text-center mt-3">Issue Tracker</h1>
						<h1 className="text-white text-lg font-medium text-center mt-1">Deal with your Issues like a Pro</h1>
        </div>

        {/* Right Side (Sign In Form) */}
        <div className="w-1/2 flex flex-col justify-center bg-white rounded-r-xl p-6 h-full">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="bg-foreground rounded-full text-white w-fit p-4">
              <FaBug size={30} />
            </CardTitle>
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label className="text-base">Email</Label>
                <Input type="email" />
              </div>
              <div>
                <Label className="text-base">Password</Label>
                <Input type="password" />
              </div>
              <div className="flex justify-center py-4">
                <Button>
                  Sign In <IoMdLogIn className="ms-2" />
                </Button>
              </div>
            </form>
            <div className="flex flex-col items-center">
              <CardDescription className="text-center text-foreground font-medium">
                {`Don't`} have an account?{" "}
                <Link href={`#`} className="text-blue-700 underline">
                  Sign Up
                </Link>
              </CardDescription>
              <Button className="border-2 mt-3" variant={"outline"}>
                <FcGoogle className="me-2 text-2xl " /> Continue with Google
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default SignInPage;
