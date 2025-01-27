
import prisma from "@/prisma"
import { NextRequest, NextResponse } from "next/server"
export const dynamic = 'force-dynamic';

interface ParamsI{
    id:string;
}
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
