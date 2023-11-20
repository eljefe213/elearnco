import type { Meta, StoryObj } from "@storybook/react";
import { AuthUI } from "ui";

const meta = {
  title: "Components/Auth/Signin",
  component: AuthUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    authSignin: { action: "Signin-Submit" },
    authSignup: { action: "Signup-Submit" },
    authForgetPassword: { action: "ForgetPassword-submit" },
  },
} satisfies Meta<typeof AuthUI>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Signin: Story = {
  render: (args) => (
    <AuthUI
      authForgetPassword={args.authForgetPassword}
      authSignup={args.authSignup}
      authSignin={args.authSignin}
    />
  ),
};
