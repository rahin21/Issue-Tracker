
import axios from "axios";
import { revalidateIssues } from "./revalidation";

export const DeleteIssue = async (id: string) => {
  try {
    await axios.delete(`/api/auth/deleteIssue`,{params: {id}})
    revalidateIssues();
  } catch (error) {
    console.log(error);
  }
};
