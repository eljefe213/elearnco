import type { Meta, StoryObj } from "@storybook/react";
import { BlockCardSectionsUI, WorkspaceDndProvider } from "ui";

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
export const BlockCardSection = {
  render: () => (
    <WorkspaceDndProvider>
      <BlockCardSectionsUI />
    </WorkspaceDndProvider>
  ),
} as unknown as Story;
