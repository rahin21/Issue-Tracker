// @ts-nocheck
import prisma from "@/prisma";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deletedIssue = await prisma.issue.delete({
      where: {
        id,
      },
    });
    revalidateTag("issues");
    return NextResponse.json(deletedIssue, { status: 200 });
  } catch (error) {
    console.error("Error deleting issue:", error);
    return NextResponse.json({ error: "Failed to delete issue" }, { status: 500 });
  }
};
