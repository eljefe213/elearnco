import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["fr", "en", "es"],
  defaultLocale: "en",
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
