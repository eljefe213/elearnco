import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmUI } from "ui";

const meta = {
  title: "Components/Auth/Confirm",
  component: ConfirmUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    authValidate: { action: "Auth-Validate" },
  },
} satisfies Meta<typeof ConfirmUI>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Confirm: Story = {
  render: (args) => <ConfirmUI authValidate={args.authValidate} />,
};
