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

export const POST = async (req: NextRequest) => {
  try {
    // Connect to Prisma
    await prisma.$connect();

    // Extract data from the request body
    const { title, description, status } = await req.json();

    // Validate data
    if (!title || !description || !status) {
      return NextResponse.json(
        { message: "Title, description, and status are required" },
        { status: 422 }
      );
    }

    // Create a new issue in the database
    const newIssue = await prisma.issue.create({
      data: {
        title,
        description,
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Invalidate cache for the issues list
    revalidateTag("issues");

    // Return success response
    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    console.error("Error creating issue:", error);

    // Return error response
    return NextResponse.json(
      { error: "Failed to create issue" },
      { status: 500 }
    );
  } finally {
    // Ensure Prisma connection is closed
    await prisma.$disconnect();
  }
};