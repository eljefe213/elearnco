import { redirect } from "next/navigation";
import { ERoutes } from "schemas";

export default async function IndexPage() {
  redirect(`/${ERoutes.DASHBOARD}`);
}
