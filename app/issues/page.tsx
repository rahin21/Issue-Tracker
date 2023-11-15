"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function IssuePage() {
  return (
    <div className="">
      <Link href={"/issues/create-Issue"}>
        <Button>Create Issue</Button>
      </Link>
    </div>
  );
}
