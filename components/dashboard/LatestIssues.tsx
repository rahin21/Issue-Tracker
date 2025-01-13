"use client";

import React from "react";
import useSWR from "swr";
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

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const LatestIssues = () => {
  // Use SWR to fetch the latest issues
  const { data, error, isLoading } = useSWR("/api/auth/getIssue", fetcher);

  const skeletonArray = Array.from({ length: 5 }, (_, i) => i + 1);

  // Handle loading state
  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Latest Issue</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skeletonArray.map((item) => (
            <TableRow key={item}>
              <TableCell>
                <Skeleton className="w-[100px] h-[25px] rounded-full" />
              </TableCell>
              <TableCell className="pl-[8rem]">
                <Skeleton className="w-[100px] h-[25px] rounded-full my-[7.25px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[80px] h-[25px] rounded-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  // Handle error state
  if (error) {
    return <div>Error loading issues. Please try again later.</div>;
  }

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
          {data.length > 0
            ? data.slice(0, 5).map((issue: any) => (
                <TableRow key={issue.id}>
                  <TableCell>{issue.title}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <StatusStyle status={issue.status} />
                  </TableCell>
                  <TableCell className="text-center">
                    <ViewButton issue={issue} />
                  </TableCell>
                </TableRow>
              ))
            : skeletonArray.map((item) => (
                <TableRow key={item}>
                  <TableCell>
                    <Skeleton className="w-[100px] h-[25px] rounded-full" />
                  </TableCell>
                  <TableCell className="pl-[8rem]">
                    <Skeleton className="w-[100px] h-[25px] rounded-full my-[7.25px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[80px] h-[25px] rounded-full" />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LatestIssues;
