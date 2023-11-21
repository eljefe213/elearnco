type TShortcut = {
  name: string;
  action: () => void;
};

export interface IData {
  id: string;
  label: string;
  shortcut: TShortcut;
  description: string;
  icon: React.Component;
  hastooltip: boolean;
}

export const data = [
  {
    id: "home",
    label: "Home",
    shortcut: {
      name: "mod+J",
      action: () => {
        alert("Go to home");
      },
    },
    description: "Description",
    icon: <></>,
    hastooltip: true,
  },
  {
    id: "copy",
    label: "Copy link",
    shortcut: {},
    description: "",
    icon: <></>,
    hastooltip: false,
  },
  {
    id: "edit",
    label: "Edit file",
    shortcut: {},
    description: "",
    icon: <></>,
    hastooltip: false,
  },
  {
    id: "divider-tools",
    label: "divider",
    shortcut: {},
    description: "",
    icon: <></>,
    hastooltip: false,
  },
  {
    id: "delete",
    label: "Delete file",
    shortcut: {},
    description: "",
    icon: <></>,
    hastooltip: false,
  },
];
