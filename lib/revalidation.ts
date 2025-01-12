"use server";
import { revalidateTag } from "next/cache";

export async function revalidateIssues() {
  revalidateTag("issues");
}
