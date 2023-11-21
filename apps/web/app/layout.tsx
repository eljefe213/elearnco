import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css";
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
