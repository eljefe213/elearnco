import type { Meta } from "@storybook/react";
import { DropdownUI } from "ui";
import { Button } from "@nextui-org/react";
import { dataWithNoSection, dataWithSection } from "./mock";
const meta = {
  title: "Components/Dropdown",
  component: DropdownUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DropdownUI>;

export default meta;

const defaultChild = (
  <Button as="button" variant="bordered">
    Open Menu
  </Button>
);

export const Dropdown = {
  render: () => (
    <div className="p-2">
      <DropdownUI showArrow data={dataWithSection}>
        {defaultChild}
      </DropdownUI>
      <DropdownUI showArrow data={dataWithNoSection}>
        {defaultChild}
      </DropdownUI>
    </div>
  ),
};
