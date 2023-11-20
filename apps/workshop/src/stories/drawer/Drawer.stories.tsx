import type { Meta, StoryObj } from "@storybook/react";
import { DrawerUI, UserUI } from "ui";
import { IProps } from "ui/drawer/Interfaces";

const meta = {
  title: "Components/Drawer",
  component: DrawerUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      options: ["absolute", "fixed"],
      control: { type: "select" },
    },
    width: {
      options: 100,
      control: { type: "number" },
    },
    placeIn: {
      options: ["left", "right", "top", "bottom"],
      control: { type: "select" },
    },
    classnames: {
      options: 100,
      control: { type: "text" },
    },
    hasOverlay: {
      options: false,
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof DrawerUI>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Drawer = {
  render: (args: IProps) => (
    <DrawerUI
      position={args.position}
      width={args.width}
      placeIn={args.placeIn}
      classnames={args.classnames}
      hasOverlay={false}
      actionHandler={() => void 0}
    >
      <UserUI name="Name" description="Teacher" image="" />
      <UserUI name="Name" description="Teacher" image="" />
      <UserUI name="Name" description="Teacher" image="" />
    </DrawerUI>
  ),
} as unknown as Story;
