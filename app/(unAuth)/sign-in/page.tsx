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
import TransparentLeftSide from "@/components/unAuth/TransparentLeftSide";
import UnAuthTitle from "@/components/unAuth/UnAuthTitle";
import { googleSignIn } from "@/lib/signInLogic";
import Link from "next/link";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { IoMdLogIn } from "react-icons/io";

function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-1/2 h-3/4 flex bg-transparent border-none rounded-2xl">
        {/* Transparent Left Side */}
        <TransparentLeftSide />

        {/* Right Side (Sign In Form) */}
        <div className="lg:w-1/2 w-full flex flex-col justify-center bg-white lg:rounded-r-xl lg:rounded-l-none rounded-l-xl rounded-r-xl p-6 h-full">
          <UnAuthTitle title="Sign In" />
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label className="text-base">Email</Label>
                <Input type="email" placeholder="example@gmail.com" />
              </div>
              <div>
                <Label className="text-base">Password</Label>
                <Input type="password" placeholder="*******" />
              </div>
              <div className="flex justify-center pt-4">
                <Button>
                  Sign In <IoMdLogIn className="ms-2" />
                </Button>
              </div>
            </form>
            <div className="flex flex-col items-center">
              <CardDescription className="text-center text-foreground font-medium">
                {`Don't`} have an account?{" "}
                <Link href={`/sign-up`} className="text-blue-700 underline">
                  Sign Up
                </Link>
              </CardDescription>
              <form action={googleSignIn}>
                <Button className="border-2 mt-3" >
                  <FcGoogle className="me-2 text-2xl " /> Continue with Google
                </Button>
              </form>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default SignInPage;
