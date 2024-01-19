// @ts-nocheck
import prisma from "@/prisma"
import { NextRequest, NextResponse } from "next/server"
export const dynamic = 'force-dynamic';
export const GET = async (req:NextRequest) => {
    const url = new URL(req.url)
    try {
        const getUniqueIssue = await prisma.issue.findUnique({
            where:{
                id: url.searchParams.get('id')
            }
        })
        return NextResponse.json(getUniqueIssue)
    } catch (error) {
        console.log(error)
    } finally {
        prisma.$disconnect
    }
}
