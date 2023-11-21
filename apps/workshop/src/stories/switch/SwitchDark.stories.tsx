import type { Meta } from "@storybook/react";

import { SelectUI } from "ui";

const meta = {
  title: "Components/SwitchDarkTheme",
  component: SelectUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SelectUI>;

export default meta;

export const Select = {
  render: () => <></>,
};
