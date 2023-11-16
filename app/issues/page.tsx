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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MarkdownPreview from '@uiw/react-markdown-preview';
import axios, { AxiosResponse } from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import StatusStyle from "@/components/status-style";

interface issuesTypeI {
  id: string;
  title: string;
  status: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function IssuePage() {
  const [data, setData] = useState<issuesTypeI[]>([]);
  useEffect(() => {
    const issues = async () => {
      await axios
        .get("/api/auth/getIssue")
        .then((res: AxiosResponse) => {
          setData(res.data);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    issues();
  }, []);

  return (
    <div className="">
      <Link href={"/issues/create-Issue"}>
        <Button>Create Issue</Button>
      </Link>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40rem]">Issues</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Created At</TableHead>
            <TableHead className="text-center w-[5rem]">View</TableHead>
            <TableHead className="text-center w-[5rem]">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>{issue.title}</TableCell>
              <TableCell className="text-center">
                <StatusStyle status={issue.status} />
              </TableCell>
              <TableCell className="text-center">
                {String(new Date(issue.createdAt)).slice(0, -45)}
              </TableCell>
              <TableCell className="text-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>View</Button>
                  </DialogTrigger>
                  <DialogContent >
                    <DialogHeader>
                      <DialogTitle>{issue.title}</DialogTitle>
                    </DialogHeader>
                    <div className=" space-x-2">
                      <DialogTitle>Description: </DialogTitle>
                      <DialogDescription>
                      <MarkdownPreview source={issue.description} />
                      </DialogDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DialogTitle>Status: </DialogTitle>
                      <StatusStyle status={issue.status} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <DialogTitle>Created At: </DialogTitle>
                      <DialogDescription>
                        {String(new Date(issue.createdAt)).slice(0, -35)}
                      </DialogDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DialogTitle>Updated At: </DialogTitle>
                      <DialogDescription>
                        {String(new Date(issue.updatedAt)).slice(0, -35)}
                      </DialogDescription>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell className="text-center">
                <Button>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
