import type { Meta } from "@storybook/react";
import { MenuUI } from "ui";
import { data } from "./mock";

const meta = {
  title: "Components/Menu",
  component: MenuUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    fixedInPosition: {
      options: ["top", "bottom", "left", "right"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof MenuUI>;

export default meta;

export const Menu = {
  render: (args: any) => (
    <MenuUI data={data} fixedInPosition={args.fixedInPosition} />
  ),
};
