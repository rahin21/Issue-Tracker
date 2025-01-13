"use client";
import useSWR from "swr";
import { issuesTypeI } from "@/types/types";
// Create a fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useDisclosure = () => {
  // Use SWR to fetch data
  const { data, error, isLoading, mutate, isValidating } = useSWR<issuesTypeI[]>(
    "/api/auth/getIssue",
    fetcher,
    { revalidateOnFocus: true,
      revalidateOnReconnect: true,}
  );

  return { 
    data: data?.reverse() || [], 
    error, 
    isLoading, 
    mutate,
    isValidating 
  };
};

export default useDisclosure;
