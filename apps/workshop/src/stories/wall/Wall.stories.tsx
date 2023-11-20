import { WallUI } from "ui";

const meta = {
  title: "Components/Wall",
  component: WallUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      options: ["100%", "80%", "60%", "50%"],
      control: { type: "select" },
    },
  },
};

export default meta;

export const WallUsers = {
  decorators: [],
  name: "Wall",
  parameters: {},
  args: {
    width: "50%",
    className: "test"
  },
};
