import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
