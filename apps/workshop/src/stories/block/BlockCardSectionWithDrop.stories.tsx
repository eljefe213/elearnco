import type { Meta, StoryObj } from "@storybook/react";
import { BlockCardSectionsUI } from "ui";
import { DndWithDrop } from ".";

const meta = {
  title: "Components/BlockCard",
  component: BlockCardSectionsUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof BlockCardSectionsUI>;

export default meta;
type Story = StoryObj<typeof meta>;
export const BlockCardSectionWithDrop = {
  render: () => <DndWithDrop />,
} as unknown as Story;
