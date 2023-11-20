import type { Meta } from "@storybook/react";
import { AddCourseUI } from "ui";

const meta = {
  title: "Components/Course/Add",
  component: AddCourseUI,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    //authSignin : { action :'Signin-Submit'},
    //authSignup : { action :'Signup-Submit'}
  },
} satisfies Meta<typeof AddCourseUI>;

export default meta;

interface IProps {
  title: string;
  description: string;
  folder: [];
  onClose: () => void;
}
export const AddCourse = {
  render: (args: IProps) => (
    <AddCourseUI
      title={args.title}
      description={args.description}
      folder={[]}
      onClose={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  ),
};
