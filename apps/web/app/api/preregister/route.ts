import { prisma } from "database";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { ERoutes } from "schemas";

import { getServerSession } from "@/lib/auth.options";

export async function GET() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect(`/${ERoutes.SIGN}`);
  }

  if (session.user.role !== "ADMIN") {
    redirect(`/${ERoutes.DASHBOARD}`);
  }
  const _prismaPreregister = prisma.preregisteredUser;
  const preregisteredUser = await prisma.$transaction([
    _prismaPreregister.findMany(),
    _prismaPreregister.count(),
  ]);

  return NextResponse.json(preregisteredUser);
}
