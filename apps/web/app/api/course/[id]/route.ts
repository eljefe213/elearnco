import { prisma } from "database";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ERoutes } from "schemas";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect(`/${ERoutes.SIGN}`);
  }

  try {
    
    const id = params.id;
    const course = await prisma.course.findUnique({
      where: {
        id: id,
      },
      include: {
        pages: {
          select: { id: true, blocks: true },
        },
      },
    });
    return new NextResponse(
      JSON.stringify({
        status: "success",
        data: { ...course },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    if (error.code === "P2025") {
      const error_response = {
        status: "fail",
        message: error?.meta?.cause,
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect(`/${ERoutes.SIGN}`);
  }

  try {
    const id = params.id;
    const json = await request.json();

    const course = await prisma.course.update({
      where: { id: id },
      data: json,
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        data: { ...course },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    if (error.code === "P2025") {
      const error_response = {
        status: "fail",
        message: error?.meta?.cause,
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect(`/${ERoutes.SIGN}`);
  }
  try {
    const id = params.id;
    const course = await prisma.course.delete({
      where: { id },
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        data: { ...course },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    if (error.code === "P2025") {
      const error_response = {
        status: "fail",
        message: "No course with the Provided ID Found",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

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
