import { prisma } from "database";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { CourseResponse, ERoutes } from "schemas";

import { getServerSession } from "@/lib/auth.options";

/**
 * Get user last course
 * @param request
 * @returns CourseResponse
 */

export async function GET(
  request: NextRequest
): Promise<NextResponse<CourseResponse>> {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect(`/${ERoutes.SIGN}`);
  }
  try {
    const course = await prisma.course.findFirst({
      where: {
        userId: session?.user?.id,
      },
      include: {
        author: true,
        folder: true,
      },
    });

    const json_response = {
      status: "success",
      data: course,
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
