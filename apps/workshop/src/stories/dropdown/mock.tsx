export const data = [
  {
    key: "new",
    label: "New file",
    shortcut: {
      name: "mod+J",
      action: () => {
        alert("action");
      },
    },
    description: "Description",
    startContent: <></>,
  },
  {
    key: "copy",
    label: "Copy link",
    shortcut: {},
    description: "",
    startContent: <></>,
  },
  {
    key: "edit",
    label: "Edit file",
    shortcut: {},
    description: "",
  },
  {
    key: "delete",
    label: "Delete file",
    shortcut: {},
    description: "",
  },
];

export const dataWithSection = [
  {
    data: data,
    title: "Section 1",
    key: "sdmlmd-sqsd-sdsd",
  },
  {
    data: data,
    title: "Section 2",
    key: "sdmkllmd-smlqsd-sdmlsd",
  },
];
export const dataWithNoSection = [
  {
    data: data,
    title: "",
    key: "sdmkllmd-smlqsd-sdmlsd",
  },
];
