"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";


interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalData:number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  totalData
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "7";

  return (
    <div className="flex items-center gap-4">
      <Button
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/issues?page=${Number(page) - 1}&per_page=${per_page}`);
        }}
      >
        {'<'}
      </Button>

      <h1 className="text-xl font-semibold">
        {page} of {Math.ceil(totalData / Number(per_page))}
      </h1>

      <Button
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/issues?page=${Number(page) + 1}&per_page=${per_page}`);
        }}
      >
        {'>'}
      </Button>
    </div>
  );
};

export default PaginationControls;
