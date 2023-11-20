import type { Meta, StoryObj } from "@storybook/react";
import { MediaBlockType, TextBlockType } from "schemas";
import { BlockCardUI } from "ui";

const meta = {
  title: "Components/BlockCard",
  component: BlockCardUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      options: [
        TextBlockType.TITLE,
        TextBlockType.CITATION,
        MediaBlockType.VIDEO,
      ],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof BlockCardUI>;

export default meta;
type Story = StoryObj<typeof meta>;
export const BlockCard: Story = {
  render: (args) => <BlockCardUI type={args.type} onMouseDown={() => void 0} />,
} as unknown as Story;
