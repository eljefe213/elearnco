import { Preview } from '@storybook/react';
import { NextUIProvider } from "@nextui-org/react";
import React from 'react';
import { themes } from '@storybook/theming';
import { useDarkMode } from 'storybook-dark-mode';
import '../src/tailwind.css'; 

const preview: Preview = {
  decorators: [(Story)=> <NextUIProvider><main className="dark text-foreground bg-background"><Story/></main></NextUIProvider>],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    darkMode: {
      stylePreview: true,
      darkClass: 'dark',
      lightClass: 'light',
      dark: {
        ...themes.dark,
        // accent0, accent1
        appBg: '#161616',
        barBg: '#262626',
        background: '#161616',
        appContentBg: '#161616',
        // radii xs
        appBorderRadius: 7
      },
      light: {
        ...themes.normal,
        // accent0, accent1
        appBg: '#F5F5F5',
        barBg: '#EDEDED',
        background: '#F5F5F5',
        appContentBg: '#F5F5F5',
        // radii xs
        appBorderRadius: 7
      }
    },
    backgrounds: {
      default: 'dark'
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
