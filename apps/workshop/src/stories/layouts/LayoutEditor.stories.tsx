import type { Meta, StoryObj } from "@storybook/react";
import { LayoutEditorUI } from "ui";

const meta = {
  title: "Components/Layout",
  component: LayoutEditorUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LayoutEditorUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LayoutEditor: Story = {
  render: () => <LayoutEditorUI />,
};
