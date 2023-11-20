import AuthProvider from "lib/providers/auth.provider";
import { redirect } from "next/navigation";
import { ERoutes } from "schemas";
import { NavBarTopUI } from "ui";
import { ParentModalUI } from "@/components/parentModalUI";
import { getServerSession } from "@/lib/auth.options";
import WrapperChild from "@/components/wrapperChild";

export default async function Layout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (!session) {
    redirect(`/${ERoutes.SIGN}`);
  }

  return (
    <AuthProvider session={session}>
      <ParentModalUI />
      <div className="flex h-full">
        <div className="relative flex grow max-w-full rounded-[1.25rem] md:rounded-none">
          <div className="relative flex flex-col grow max-w-full min-h-screen">
            <NavBarTopUI />
            <div
              style={{ height: `calc(100% - 93px` }}
              className="ml-3 mr-3 mb-3 overflow-hidden rounded-e-3xl rounded-s-3xl bg-default-100"
            >
              <WrapperChild>{children}</WrapperChild>
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
