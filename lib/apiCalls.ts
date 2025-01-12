
import axios from "axios";
import useSWR, { mutate } from "swr";

// Fetcher function
const fetchIssues = async () => {
  const { data } = await axios.get("/api/auth/getIssue");
  return data.reverse(); // Adjust data as per your requirements
};

// Hook to fetch issues using SWR
export const useIssues = () => {
  return useSWR("/api/auth/getIssue", fetchIssues);
};

// Function to delete an issue and update SWR cache
export const DeleteIssue = async (id: string) => {
  try {
    // Call the delete API
    await axios.delete(`/api/auth/deleteIssue`, { params: { id } });

    // Optimistically update the cache
    mutate("/api/auth/getIssue", async (currentData: any[] | undefined) => {
      if (!currentData) return [];
      return currentData.filter((issue) => issue.id !== id);
    }, false); // `false` avoids refetching automatically

    // Optionally revalidate the data from the server
    mutate("/api/auth/getIssue");
  } catch (error) {
    console.error(error);
  }
};
