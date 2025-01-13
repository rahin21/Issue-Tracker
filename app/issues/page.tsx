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
import { useMemo, useState } from "react";
import StatusStyle from "@/components/status-style";
import ViewButton from "@/components/view-button";
import useDisclosure from "@/hooks/useDisclosure";
import { Skeleton } from "@/components/ui/skeleton";
import PaginationControls from "@/components/PaginationControls";
import { Delete, Edit, Trash } from "lucide-react";
import { DeleteIssue } from "@/lib/apiCalls";
import { format } from "date-fns";

// A separate component for each table row
const IssueRow = ({
  issue,
  handleDelete,
}: {
  issue: {
    id: string;
    title: string;
    status: string;
    createdAt: string;
    description:string;
    updatedAt:string;
  };
  handleDelete: (id: string) => void;
}) => (
  <TableRow>
    <TableCell>{issue.title}</TableCell>
    <TableCell className="text-center">
      <StatusStyle status={issue.status} />
    </TableCell>
    <TableCell className="text-center lg:flex justify-center items-center py-6 hidden">
      {format(new Date(issue.createdAt), "EEEE, yyyy-MM-dd")}
    </TableCell>
    <TableCell className="text-center">
      <ViewButton issue={issue} />
    </TableCell>
    <TableCell className="text-center">
      <Link
        href={{
          pathname: "/issues/edit-issue",
          query: { id: issue.id },
        }}
      >
        <Button title="Edit" className="px-3">
          <Edit />
        </Button>
      </Link>
    </TableCell>
    <TableCell className="text-center">
      <Button
        title="Delete"
        className="bg-rose-600 px-3"
        onClick={() => handleDelete(issue.id)}
      >
        <Trash />
      </Button>
    </TableCell>
  </TableRow>
);

export default function IssuePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { data = [], mutate, isValidating } = useDisclosure();
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const page = Number(searchParams["page"] ?? "1");
  const perPage = Number(searchParams["per_page"] ?? "7");

  // Filter the issues based on the selected status
  const filteredEntries = useMemo(() => {
    return data.filter(
      (issue) => selectedStatus === issue.status || selectedStatus === "All"
    );
  }, [data, selectedStatus]);

  // Paginate the filtered issues
  const paginatedEntries = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredEntries.slice(start, start + perPage);
  }, [filteredEntries, page, perPage]);

  const handleDelete = async (id: string) => {
    try {
      await DeleteIssue(id);
      mutate(); // Revalidate data using SWR
    } catch (error) {
      console.error("Error deleting issue:", error);
    }
  };

  const skeletonArray = Array.from({ length: perPage }, (_, i) => i + 1);

  return (
    <div>
      {/* Header with filter, pagination controls, and create button */}
      <div className="flex justify-between py-5 md:py-10">
        <Select onValueChange={(value) => setSelectedStatus(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Open">
              <StatusStyle status="Open" className="dark:border-0" />
            </SelectItem>
            <SelectItem value="Closed">
              <StatusStyle status="Closed" className="dark:border-0" />
            </SelectItem>
            <SelectItem value="In Progress">
              <StatusStyle status="In Progress" className="dark:border-0" />
            </SelectItem>
          </SelectContent>
        </Select>
        <PaginationControls
          totalData={filteredEntries.length}
        />
        <Link href="/issues/create-issue">
          <Button>Create Issue</Button>
        </Link>
      </div>

      {/* Table displaying issues */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Issues</TableHead>
            <TableHead className="text-center w-40">Status</TableHead>
            <TableHead className="text-center lg:flex justify-center items-center hidden ">Created At</TableHead>
            <TableHead className="text-center w-10">View</TableHead>
            <TableHead className="text-center w-10">Edit</TableHead>
            <TableHead className="text-center w-10">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isValidating
            ? skeletonArray.map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="w-[150px] h-[20px] rounded-full" />
                  </TableCell>
                  <TableCell className="">
                    <Skeleton className="w-[120px] h-[20px] rounded-full" />
                  </TableCell>
                  <TableCell className="lg:flex justify-center items-center hidden">
                    <Skeleton className="w-[120px] h-[20px] rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[50px] h-[20px] rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[50px] h-[20px] rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-[50px] h-[20px] rounded-full" />
                  </TableCell>
                </TableRow>
              ))
            : paginatedEntries.length > 0
            ? paginatedEntries.map((issue) => (
                <IssueRow key={issue.id} issue={issue} handleDelete={handleDelete} />
              ))
            : !isValidating && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No issues found
                  </TableCell>
                </TableRow>
              )}
        </TableBody>
      </Table>

      {/* Mobile Pagination Controls */}
      <div className="flex justify-center mb-4 md:hidden">
        <PaginationControls
          totalData={filteredEntries.length}
        />
      </div>
    </div>
  );
}
