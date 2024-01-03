"use client";
import useDisclosure from "@/hooks/useDisclosure";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusStyle from "../status-style";
import ViewButton from "../view-button";
import { Skeleton } from "../ui/skeleton";

const LatestIssues = () => {
  const { data } = useDisclosure();
  const array = [1, 2, 3, 4, 5];
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Latest Issue</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0
            ? array.map((arr) => (
                <TableRow key={arr}>
                  <TableCell>
                    <Skeleton className="w-[100px] h-[25px] rounded-full" />
                  </TableCell>
                  <TableCell className="pl-[8rem]">
                    <Skeleton className="w-[100px] h-[25px] rounded-full my-[7.25px]" />
                  </TableCell>
                  <TableCell className="">
                    <Skeleton className="w-[80px] h-[25px] rounded-full" />
                  </TableCell>
                  
                </TableRow>
              ))
          :data.slice(0,5-data.length).map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>{issue.title}</TableCell>
              <TableCell className="whitespace-nowrap">
                <StatusStyle status={issue.status} />
              </TableCell>
              <TableCell className="text-center">
                <ViewButton issue={issue}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LatestIssues;
