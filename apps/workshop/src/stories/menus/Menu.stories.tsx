import type { Meta } from "@storybook/react";
import { MenuUI } from "ui";
import {  data } from "./mock";
import { TFixedInPosition } from "schemas/global";

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
  render: (args: { fixedInPosition: TFixedInPosition }) => (
    <MenuUI data={data} fixedInPosition={args.fixedInPosition} />
  ),
};
