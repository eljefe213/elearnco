import { prisma } from "database";
import { NextResponse } from "next/server";

import { sendEmail } from "@/emails";
import PregisterEmail from "@/emails/preregister-email";

export async function POST(request: Request) {
  const { data } = await request.json();

  const defaultLocale = request.headers.get("x-default-locale") || "fr";

  const new_registered = {
    email: data.email as string,
    locale: defaultLocale,
  };

  try {
    await prisma.preregisteredUser.create({ data: new_registered });

    
    await sendEmail({
      email: data.email,
      subject: "Pre-registerd to Elearnco",
      react: PregisterEmail({
        email: data.email,
      }),
      marketing: false,
      test: false,
    });

    const json_response = {
      status: "success",
      data: { email: data.email },
    };

    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error.code === "P2002") {
      const error_response = {
        status: "fail",
        message: "user_exist",
      };

      return new NextResponse(JSON.stringify(error_response), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      const error_response = {
        status: "fail",
        message: "error server",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}
