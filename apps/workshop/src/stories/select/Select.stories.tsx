import type { Meta } from "@storybook/react";
import { CourseStatus } from "@prisma/client";
import { SelectUI } from "ui";

const DATA_STATUS = [
  {
    id: 1,
    label: "Published courses",
    value: CourseStatus.ACTIVE,
  },
  {
    id: 2,
    label: "Archived courses",
    value: CourseStatus.ARCHIVED,
  },
  {
    id: 3,
    label: "Draft courses",
    value: CourseStatus.DRAFT,
  },
];
const DATA_FOLDERS = [
  {
    id: 1,
    label: "All",
    value: "ALL",
  },
  {
    id: 2,
    label: "Default",
    value: "DEFAULT",
  },
];

const meta = {
  title: "Components/Select",
  component: SelectUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    labelPlacement: {
      options: ["inside", "outside", "left", "outside-left"],
      control: { type: "select" },
    },
    label: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof SelectUI>;

export default meta;

interface IProps {
  onChange: () => void;
  data: [];
  label: string;
  placeholder: string;
  labelPlacement: TLabelPlacement;
  selectedKey: string;
}
type TLabelPlacement = "inside" | "outside" | "outside-left";
export const Select = {
  render: (args: IProps) => (
    <div className="p-2">
      <SelectUI
        onChange={args.onChange}
        data={DATA_STATUS}
        label={args.label}
        placeholder={args.placeholder}
        labelPlacement={args.labelPlacement}
        selectedKey={""}
      />
      <SelectUI
        data={DATA_FOLDERS}
        onChange={args.onChange}
        label={args.label}
        placeholder={args.placeholder}
        labelPlacement={args.labelPlacement}
        selectedKey={""}
      />
    </div>
  ),
};
