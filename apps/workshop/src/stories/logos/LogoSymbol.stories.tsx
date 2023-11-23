import type { Meta, StoryObj } from "@storybook/react";
import { LogoSymbolUI, IProps, LogoTextUI } from "ui/logo/index";
import { Divider } from "@nextui-org/react";
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
      <LogoSymbolUI color="currentColor" className="top-0 left-10 relative" />
      <Divider />
      <p className="top-10 left-10 relative">Word branding :</p>
      <LogoTextUI isBlack={!args.isBlack} className="top-5 left-10 relative" />
      <Divider />
      <p className="top-0 p-10">Vertical branding :</p>
      <div className="flex flex-col left-10 relative">
        <LogoSymbolUI width={80} height={80} />
        <LogoTextUI isBlack={!args.isBlack} width={80} height={40} />
      </div>
      <Divider />
      <p className="top-0 p-10">Horizontal branding:</p>
      <div className="flex gap-2 relative left-0 items-center">
        <LogoSymbolUI width={80} height={80} />
        <LogoTextUI isBlack={!args.isBlack} />
      </div>
    </>
  ),
};
