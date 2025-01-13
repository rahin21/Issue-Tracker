import prisma from "@/prisma";
import { NextResponse } from "next/server";

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
