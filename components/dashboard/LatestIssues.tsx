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

const LatestIssues = () => {
  const { data } = useDisclosure();
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Latest Issue</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.slice(-5).map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>{issue.title}</TableCell>
              <TableCell>
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
