import type { Meta, StoryObj } from "@storybook/react";
import { BreadcrumbUI } from "ui";

const meta = {
  title: "Components/Breadcrumb",
  component: BreadcrumbUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof BreadcrumbUI>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Breadcrumb = {
  render: () => (
    <div className="flex gap-4">{/* <BreadcrumbUI><></></BreadcrumbUI> */}</div>
  ),
} as unknown as Story;
