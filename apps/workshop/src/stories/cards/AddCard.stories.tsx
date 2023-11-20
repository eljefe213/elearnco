import type { Meta, StoryObj } from "@storybook/react";
import { AddCardUI } from "ui";

const meta = {
  title: "Components/Card",
  component: AddCardUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AddCardUI>;

export default meta;
type Story = StoryObj<typeof meta>;
export const AddCard = {
  render: () => (
    <div className="flex gap-4">
      <AddCardUI />
    </div>
  ),
} as unknown as Story;
