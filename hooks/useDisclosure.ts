import { issuesTypeI } from "@/types/types";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

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
      await fetch("/api/auth/getIssue", {
        method: "GET",
        next: { revalidate: 1 },
        cache: 'no-store'
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

export default useDisclosure;
