import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

import { getServerSession } from "@/lib/auth.options";

export default async function AuthLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }
  return <>{children}</>;
}
