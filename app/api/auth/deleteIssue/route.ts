// @ts-nocheck
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
    try {
        const url = new URL(req.url)
        const deleteIssue = await prisma.issue.delete({
            where:{
                id: url.searchParams.get('id')
            }
        })
        return NextResponse.json(deleteIssue);
    } catch (error) {
        console.log(error)
    } finally {
        prisma.$disconnect()
    }
}