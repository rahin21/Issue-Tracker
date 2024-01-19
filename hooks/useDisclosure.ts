"use client"
import { issuesTypeI } from "@/types/types";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { unstable_noStore as noStore } from 'next/cache';

const useDisclosure = () => {
  useEffect(() => {
    const issues = async () => {
      // await axios
      //   .get("/api/auth/getIssue")
      //   .then((res: AxiosResponse) => {
      //     setData(res.data.reverse());
      //   })
      //   .catch((err: Error) => {
      //     console.log(err);
      //   });
      noStore();
      await fetch("/api/auth/getIssue", {
        cache: "no-store",
        next: {revalidate:0}
      })
        .then((res) => res.json())
        .then((data: any) => {
          setData(data.reverse());
        });
    };
    issues();
  }, []);
  const [data, setData] = useState<issuesTypeI[]>([]);
  return { data, setData };
};

export const fetchCache = 'force-no-store';
export default useDisclosure;