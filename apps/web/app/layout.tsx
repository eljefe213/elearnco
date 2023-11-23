import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
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
