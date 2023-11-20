import type { Meta, StoryObj } from "@storybook/react";
import { LogoSymbolUI, IProps, LogoTextUI } from "ui/logo/index";

const meta = {
  title: "Components/Brand",
  component: LogoSymbolUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    isBlack: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof LogoSymbolUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LogoSymbo: Story = {
  render: (args: IProps) => (
    <>
      <p className="p-10">Symbol branding :</p>
      <LogoSymbolUI isBlack={args.isBlack} className="top-0 left-40 relative" />
      <p className="top-0 p-10">Word branding :</p>
      <LogoTextUI isBlack={!args.isBlack} className="left-40 relative" />
      <p className="top-0 p-10">Vertical branding :</p>
      <div className="flex flex-col left-40 relative">
        <LogoSymbolUI isBlack={args.isBlack} width={80} height={80} />
        <LogoTextUI isBlack={!args.isBlack} width={80} height={40} />
      </div>
      <p className="top-0 p-10">Horizontal branding:</p>

      <div className="flex gap-2 relative left-40 items-center">
        <LogoSymbolUI isBlack={args.isBlack} width={80} height={80} />
        <LogoTextUI isBlack={!args.isBlack} />
      </div>
    </>
  ),
};
