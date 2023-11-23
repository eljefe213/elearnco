import type { Meta, StoryObj } from "@storybook/react";
import { HeaderUI, UserUI } from "ui";

const meta = {
  title: "Components/Header",
  component: HeaderUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof HeaderUI>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Header: Story = {
  render: () => (
    <HeaderUI>
      
      <div className="relative z-10 mr-2">
        <UserUI name="Name" description="Teacher" image="" />
      </div>
    </HeaderUI>
  ),
};
