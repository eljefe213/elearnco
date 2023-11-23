import type { Meta } from "@storybook/react";

import { DarkModeUI } from "ui";

const meta = {
  title: "Components/SwitchDarkTheme",
  component: DarkModeUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DarkModeUI>;

export default meta;

export const Select = {
  render: () => <DarkModeUI />,
};
