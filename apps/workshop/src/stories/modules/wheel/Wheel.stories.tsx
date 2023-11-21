import type { Meta } from "@storybook/react";
import WheelUI from "ui/wheel/WheelUI";

const meta = {
  title: "Components/Modules/Wheel",
  component: WheelUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof WheelUI>;

export default meta;

export const Select = {
  render: () => <WheelUI />,
};
