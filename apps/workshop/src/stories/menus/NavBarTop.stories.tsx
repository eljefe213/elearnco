import type { Meta } from "@storybook/react";
import { NavBarTopUI } from "ui";

const meta = {
  title: "Components/Menu",
  component: NavBarTopUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    fixedInPosition: {
      options: ["top", "bottom"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof NavBarTopUI>;

export default meta;

export const NavBarTop = {
  render: () => (
    <> </>
  ),
};
