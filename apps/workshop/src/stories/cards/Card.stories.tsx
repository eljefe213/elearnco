import type { Meta, StoryObj } from "@storybook/react";
import { CardUI } from "ui";

const meta = {
  title: "Components/Card",
  component: CardUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
    },
    description: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof CardUI>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Card = {
  render: (args) => (
    <div className="flex gap-4">
      <CardUI
        title={args.title}
        description={args.description}
        image={undefined}
        folder={undefined}
        author={undefined}
      />
    </div>
  ),
} as unknown as Story;
