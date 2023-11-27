import { prisma } from "database";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ERoutes } from "schemas";

export async function GET(request) {
  const session = await getServerSession();
  if (!session?.user) {
    redirect(`/${ERoutes.SIGN}`);
  }
  const pathname = request.nextUrl.pathname as string;
  const n = pathname.lastIndexOf("/");
  const idPage = pathname.substring(n + 1);

  const page = await prisma.page.findMany({
    where: {
      id: idPage,
    },
    include: {
      blocks: true,
    },
  });

  return NextResponse.json(page);
}
export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user) {
    redirect(`/${ERoutes.SIGN}`);
  }

  try {
    const json = await request.json();
    const page = await prisma.page.create({
      data: json,
    });

    const json_response = {
      status: "success",
      data: { page },
    };

    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const error_response = {
      status: "fail",
      message: "",
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 409,
      headers: { "Content-Type": "application/json" },
    });
  }
}
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  if (!session?.user) {
    redirect(`/${ERoutes.SIGN}`);
  }

  try {
    const id = params.id;
    const json = await request.json();

    const updated_feedback = await prisma.page.update({
      where: { id },
      data: json,
    });

    const json_response = {
      status: "success",
      data: {
        feedback: updated_feedback,
      },
    };
    return NextResponse.json(json_response);
  } catch (error: any) {
    if (error.code === "P2025") {
      const error_response = {
        status: "fail",
        message: "",
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
  if (!session?.user) {
    redirect(`/${ERoutes.SIGN}`);
  }

  try {
    const id = params.id;
    await prisma.page.delete({
      where: { id: id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    if (error.code === "P2025") {
      const error_response = {
        status: "fail",
        message: "",
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
