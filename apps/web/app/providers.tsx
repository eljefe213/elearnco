"use client";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Next13ProgressBar } from "next13-progressbar";
import { Toaster } from "sonner";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}
export function Providers({
  children,
  themeProps,
}: ProvidersProps): JSX.Element {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark" {...themeProps}>
        <SessionProvider>
          <Toaster richColors position="bottom-right" />
          <Next13ProgressBar
            height="4px"
            color="#0A2FFF"
            options={{ showSpinner: true }}
            showOnShallow
          />
          {children}
        </SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}