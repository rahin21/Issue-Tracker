"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

interface PaginationControlsProps {
  totalData: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({ totalData }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse and validate query parameters
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") || "7", 10);

  // Calculate total pages
  const totalPages = Math.ceil(totalData / perPage) || 1;

  // Navigation logic
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;

  const goToPage = (targetPage: number) => {
    router.push(`/issues?page=${targetPage}&per_page=${perPage}`);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Previous Page Button */}
      <Button
        disabled={!hasPrevPage}
        aria-label="Previous Page"
        onClick={() => goToPage(page - 1)}
      >
        {"<"}
      </Button>

      {/* Page Info */}
      <h1 className="text-xl font-semibold">
        Page {page} of {totalPages}
      </h1>

      {/* Next Page Button */}
      <Button
        disabled={!hasNextPage}
        aria-label="Next Page"
        onClick={() => goToPage(page + 1)}
      >
        {">"}
      </Button>
    </div>
  );
};

export default PaginationControls;
