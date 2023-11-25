import { prisma } from "database";
//import { hash256 } from "lib";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { data } = await request.json();
  const hash = data.token;

  try {
    const emailVerificationToken =
      await prisma.emailVerificationToken.findUniqueOrThrow({
        where: {
          userId_token_code: {
            userId: data.id,
            token: hash,
            code: data.code,
          },
        },
      });

    if (emailVerificationToken.expiresAt < new Date()) {
      const error_response = {
        status: "fail",
        message: "Token expired",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    await prisma.emailVerificationToken.delete({
      where: { id: emailVerificationToken.id },
    });

    const { password: _password, ...safeUser } = user;

    const json_response = {
      status: "success",
      data: { safeUser },
    };

    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error.code === "P2025") {
      const error_response = {
        status: "fail",
        message: "No user found with this data",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}
