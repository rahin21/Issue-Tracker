
import axios from "axios";
import useSWR, { mutate } from "swr";

// Fetcher function
const fetchIssues = async () => {
  const { data } = await axios.get("/api/issue");
  return data.reverse(); // Adjust data as per your requirements
};

// Hook to fetch issues using SWR
export const useIssues = () => {
  return useSWR("/api/issue", fetchIssues);
};

// Function to delete an issue and update SWR cache
export const DeleteIssue = async (id: string) => {
  try {
    // Call the delete API
    await axios.delete(`/api/issue`, { params: { id } });

    // Optimistically update the cache
    mutate("/api/issue", async (currentData: any[] | undefined) => {
      if (!currentData) return [];
      return currentData.filter((issue) => issue.id !== id);
    }, false); // `false` avoids refetching automatically

    // Optionally revalidate the data from the server
    mutate("/api/issue");
  } catch (error) {
    console.error(error);
  }
};
