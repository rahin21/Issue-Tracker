
import prisma from "@/prisma"
import { ParamsI } from "@/types/types";
import { NextRequest, NextResponse } from "next/server"
export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest,{ params }: { params: ParamsI }) => {
    const id  = params.id;
    try {
        const getUniqueIssue = await prisma.issue.findUnique({
            where:{
                id: id || '',
            }
        })
        return NextResponse.json(getUniqueIssue, {status:200})
    } catch (error) {
        return NextResponse.json({error: "Server Error"}, {status:500})
    } finally {
        prisma.$disconnect
    }
}

export const PUT = async (req: NextRequest, {params}:{params:ParamsI}) => {
  try {
      const { title, description, status } = await req.json();
      const id = params.id
      if(!title || !description || !status) return NextResponse.json({message: "Invalid Data"}, {status: 422})
      const newIssue = await prisma.issue.update({
          where:{
              id: id || '',
          },
          data:{
              title,
              description,
              updatedAt: new Date(),
              status
          }
      })
      return NextResponse?.json(newIssue, {status:201})
  } catch(error) {
      console.log(error)
  } finally {
      prisma.$disconnect();
  }
}


export const DELETE = async (req: NextRequest, { params }: { params: ParamsI }) => {
    try {
      const id = params.id;
  
      if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
      }
  
      const deletedIssue = await prisma.issue.delete({
        where: {
          id,
        },
      });
      return NextResponse.json(deletedIssue, { status: 200 });
    } catch (error) {
      console.error("Error deleting issue:", error);
      return NextResponse.json({ error: "Failed to delete issue" }, { status: 500 });
    }
  };
