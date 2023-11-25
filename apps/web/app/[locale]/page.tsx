import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { ERoutes } from "schemas";

export default async function IndexPage() {
  const session = await getServerSession();
  if (session) {
    redirect(`/${ERoutes.DASHBOARD}`);
  }

  redirect(`/${ERoutes.WELCOME}`);
}
