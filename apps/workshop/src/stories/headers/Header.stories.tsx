import type { Meta, StoryObj } from "@storybook/react";
import { HeaderUI, UserUI } from "ui";
import logo from "../assets/logo_edukeasy.svg";
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
      <div className="flex shrink-0 opacity-100 justify-center items-center mr-2">
        <img alt="" width={152} height={48} src={logo} />
      </div>
      <div className="relative z-10 mr-2">
        <UserUI name="Name" description="Teacher" image="" />
      </div>
    </HeaderUI>
  ),
};
