import FeatureHome from "@/features/home";
import { getMessages } from "@/lib/messages";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { ERoutes } from "schemas/routes";

export async function generateMetadata({ params }) {
  const { locale } = params;
  const messages = (await getMessages(locale)) as {
    seo: {
      default: {
        title: string;
        description: string;
      };
    };
  };

  return {
    title: messages.seo.default.title,
    description: messages.seo.default.description,
  };
}

export default async function HomedPage() {
  const session = await getServerSession();
  if (session) {
    redirect(`/${ERoutes.DASHBOARD}`);
  }

  return <FeatureHome />;
}
