"use client";
import { apiSignup } from "lib/requests/api.request";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ERoutes } from "schemas";
import { toast } from "sonner";
import { useLoadingStore } from "store/loading";
import { AuthUI, LayoutUI, WallUI } from "ui";

//TODO - TRANSLATION
const FeatureAuthSign = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl =
    searchParams.get("callbackUrl") || `/${ERoutes.DASHBOARD}`;
  const { onBeginLoading, onStopLoading } = useLoadingStore();
  const authSignin = async (data: {
    email: string;
    password: string;
  }): Promise<void> => {
    onBeginLoading();
    const res = await signIn("credentials", {
      redirect: false,
      ...data,
      callbackUrl,
    });

    if (!res?.error) {
      router.push(callbackUrl);
    } else {
      onStopLoading();
      toast.error(res.error);
    }
  };

  const authSignup = async (data): Promise<void> => {
    const res = await apiSignup(data);
    if (res.status === "success") {
      toast.success("An email was sent for valid credentials");
    } else {
      toast.error("Server error: try again later");
    }
  };

  return (
    <LayoutUI className="flex w-full">
      <WallUI className="hidden bg-foreground md:flex md:w-2/5" />
      <AuthUI
        authSignin={authSignin}
        authSignup={authSignup}
        className="w-full md:w-3/5 bg-foreground"
      />
    </LayoutUI>
  );
};
export default FeatureAuthSign;
