import { prisma } from "database";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { ERoutes } from "schemas";

import { getServerSession } from "@/lib/auth.options";

/**
 * Get all user folders
 * @returns  {status:string}
 */
export async function GET() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect(`/${ERoutes.SIGN}`);
  }
  try {
    const folders = await prisma.folder.findMany({
      where: { userId: session.user.id },
      include: { Course: true },
    });

    const json_response = {
      status: "success",
      data: folders,
    };

    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const error_response = {
      status: "error",
      message: error.message,
    };

    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
/**
 * Add folder
 * @param request
 * @returns
 */
export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect(`/${ERoutes.SIGN}`);
  }

  try {
    const json = await request.json();

    const folder = await prisma.folder.create({
      data: json,
    });
    const json_response = {
      status: "success",
      data: { ...folder },
    };

    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const error_response = {
      status: "error",
      message: error.message,
    };

    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
