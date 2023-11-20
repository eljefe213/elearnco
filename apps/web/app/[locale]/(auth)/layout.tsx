import { redirect } from "next/navigation";
import { ReactNode } from "react";

import { getServerSession } from "@/lib/auth.options";
type Props = {
  children: ReactNode;
};

export default async function AuthLayout({ children }: Props) {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }
  return <>{children}</>;
}
