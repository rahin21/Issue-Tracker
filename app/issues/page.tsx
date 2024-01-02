"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense, useState } from "react";
import StatusStyle from "@/components/status-style";
import ViewButton from "@/components/view-button";
import useDisclosure from "@/hooks/useDisclosure";
import { Skeleton } from "@/components/ui/skeleton";

export default function IssuePage() {
  const { data, setData } = useDisclosure();
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const array = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="">
      <div className="flex justify-between py-10 ">
        <Select onValueChange={(value) => setSelectedStatus(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Open">
              <StatusStyle status="Open" />{" "}
            </SelectItem>
            <SelectItem value="Closed">
              <StatusStyle status="Closed" />{" "}
            </SelectItem>
            <SelectItem value="In Progress">
              <StatusStyle status="In Progress" />{" "}
            </SelectItem>
          </SelectContent>
        </Select>
        <Link href={"/issues/create-issue"}>
          <Button>Create Issue</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="lg:text-xl text-xs">
            <TableHead className="lg:w-[40rem] sm:w-[40%]">Issues</TableHead>
            <TableHead className="text-center ">Status</TableHead>
            <TableHead className="text-center lg:flex lg:items-center lg:justify-center hidden">
              Created At
            </TableHead>
            <TableHead className="text-center lg:w-[5rem] w-0">View</TableHead>
            <TableHead className="text-center lg:w-[5rem] w-0">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0
            ? array.map((arr) => (
                <TableRow key={arr}>
                  <TableCell>
                    <Skeleton className="w-[100px] h-[20px] rounded-full" />
                  </TableCell>
                  <TableCell className="pl-20">
                    <Skeleton className="w-[80px] h-[20px] rounded-full" />
                  </TableCell>
                  <TableCell className="pl-[4.25rem]">
                    <Skeleton className="w-[90px] h-[20px] rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[80px] h-[20px] rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[80px] h-[20px] rounded-full" />
                  </TableCell>
                </TableRow>
              ))
            : data.reverse().map((issue) =>
                selectedStatus === issue.status || selectedStatus === "All" ? (
                  <TableRow
                    key={issue.id}
                    className="lg:text-xl sm:text-sm text-xs"
                  >
                    <TableCell>{issue.title}</TableCell>
                    <TableCell className="text-center whitespace-nowrap ">
                      <StatusStyle status={issue.status} />
                    </TableCell>
                    <TableCell className="text-center lg:block hidden">
                      {String(new Date(issue.createdAt)).slice(0, -45)}
                    </TableCell>
                    <TableCell className="text-center">
                      <ViewButton issue={issue} />
                    </TableCell>
                    <TableCell className="text-center">
                      <Link
                        href={{
                          pathname: "/issues/edit-issue",
                          query: {
                            id: issue.id,
                          },
                        }}
                      >
                        <Button>Edit</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ) : (
                  <div key={issue.id}></div>
                )
              )}
        </TableBody>
      </Table>
    </div>
  );
}
