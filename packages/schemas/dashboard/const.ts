import { cva } from "class-variance-authority";
import { GridItemInterface } from ".";
export const variants = cva(
  "shadow-grid rounded-3xl bg-white dark:bg-neutral-900 flex flex-col justify-center @container",
  {
    variants: {
      size: {
        "1x2": "md:col-span-1 col-span-2 row-span-2 ",
        "2x1": "md:col-span-2 col-span-full row-span-1",
        "2x2": "md:col-span-2 col-span-full row-span-2 ",
        "2x4":
          "md:col-span-2 col-span-full row-span-4 relative overflow-hidden",
      },
    },
    defaultVariants: {
      size: "1x2",
    },
  }
);
export const GridItems: GridItemInterface[] = [
  {
    id: "5bd6bcd0-8552-11ee-b9d1-0242ac120002",
    layout: "1x2",
    type: "news",
    title: "Elearnco 1.0",
    description:
      "Edulearnco has finally arrived, redesigned and rebuilt from the ground up.",
    classNameImage: "",
    className: "",
    icon: "",
    username: "",
    buttonTitle: "",
    buttonSecondaryText: "",
    buttonLink: "",
    color: "",
  },
  {
    id: "5hy6bcd0-8752-11ee-b9d1-0442ac120002",
    layout: "1x2",
    type: "user",
    title: "",
    description: "",
    classNameImage: "",
    className: "",
    icon: "",
    username: "",
    buttonTitle: "",
    buttonSecondaryText: "",
    buttonLink: "",
    color: "",
  },
  {
    id: "5f6d4cec-8552-11ee-b9d1-0242ac120002",
    layout: "1x2",
    type: "tips",
    title: "Tips",
    description: "To quickly access sections, you can use the command ⌘ + K",
    classNameImage: "",
    className: "",
    icon: "",
    username: "",
    buttonTitle: "",
    buttonSecondaryText: "",
    buttonLink: "",
    color: "",
  },
  {
    id: "62b8c87c-8552-11ee-b9d1-0242ac120002",
    layout: "1x2",
    type: "course",
    title: "",
    icon: "",
    username: "",
    description: "",
    color: "",
    buttonTitle: "",
    buttonLink: "",
    buttonSecondaryText: "",
  },

  {
    id: "49a77c66-8552-11ee-b9d1-0242ac120002",
    layout: "2x2",
    type: "news",
    title: "New news section",
    icon: "",
    username: "",
    description: "This is a new news section",
    color: "",
    buttonTitle: "",
    buttonLink: "",
    buttonSecondaryText: "",
  },
];
