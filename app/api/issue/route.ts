import prisma from "@/prisma";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    // Connect to Prisma
    await prisma.$connect();

    // Fetch data from the database
    const issues = await prisma.issue.findMany();

    // Return response with no-cache headers
    return NextResponse.json(issues, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },  
    });
  } catch (error) {
    console.error("Error fetching issues:", error);

    // Return error response
    return NextResponse.json(
      { error: "Failed to fetch issues" },
      { status: 500 }
    );
  } finally {
    // Ensure Prisma connection is closed
    await prisma.$disconnect();
  }
};

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