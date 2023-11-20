import FeatureHome from "@/features/home";
import { getMessages } from "@/lib/messages";

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

export default function HomedPage() {
  return <FeatureHome />;
}
