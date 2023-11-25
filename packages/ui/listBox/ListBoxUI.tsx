import { Listbox } from "@nextui-org/react";
import React from "react";
export const ListBoxUI = (props) => {
  const { children } = props;
  return (
    <Listbox
      aria-label="User Menu"
      onAction={(key) => alert(key)}
      className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 max-w-[300px] overflow-visible shadow-small"
      itemClasses={{
        base: "px-3 gap-3 data-[hover=true]:bg-default-100/80",
      }}
    >
      {children}
    </Listbox>
  );
};
