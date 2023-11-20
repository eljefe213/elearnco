import type { Meta, StoryObj } from "@storybook/react";
import { BlockNodesListUI, WorkspaceDndProvider } from "ui";

const meta = {
  title: "Components/Nodes",
  component: BlockNodesListUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    addBlock: { action: "addBlock" },
  },
} satisfies Meta<typeof BlockNodesListUI>;

export default meta;
type Story = StoryObj<typeof meta>;
export const BlockNodesList: Story = {
  render: (args) => (
    <WorkspaceDndProvider>
      <BlockNodesListUI addBlock={args.addBlock} />
    </WorkspaceDndProvider>
  ),
};
