import { Preview } from "@storybook/react";
import { NextUIProvider } from "@nextui-org/react";
import { NextIntlClientProvider } from "next-intl";
import React from "react";
import { themes } from "@storybook/theming";
import Style from "./style";
import * as messages from "../../web/messages/en.json";
const preview: Preview = {
  decorators: [
    (Story, { globals: { locale } }) => {
      //const direction =locale && new Intl.Locale(locale)?.textInfo?.direction === "rtl" ? "rtl" : undefined;

      return (
        <NextUIProvider locale={locale}>
          <NextIntlClientProvider locale="en" messages={messages}>
            <div className="bg-dark" lang={locale} dir="ltr">
              <Style />
              <Story />
            </div>
          </NextIntlClientProvider>
        </NextUIProvider>
      );
    },
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Foundations", "Components"],
      },
    },
    darkMode: {
      current: "dark",
      stylePreview: true,
      darkClass: "dark",
      lightClass: "light",
      classTarget: "html",
      dark: {
        ...themes.dark,
        appBg: "#161616",
        barBg: "black",
        background: "black",
        appContentBg: "black",
        appBorderRadius: 14,
      },
      light: {
        ...themes.light,
        appBorderRadius: 14,
      },
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
