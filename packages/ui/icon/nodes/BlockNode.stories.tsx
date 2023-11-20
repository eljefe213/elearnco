import type { Meta, StoryObj } from "@storybook/react";
import { BlockNodeUI } from "ui";

const meta = {
  title: "Components/Nodes",
  component: BlockNodeUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof BlockNodeUI>;

export default meta;
type Story = StoryObj<typeof meta>;
export const BlockNode: Story = {
  render: () => <BlockNodeUI />,
};
