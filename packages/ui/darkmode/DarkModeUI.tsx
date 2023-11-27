"use client";
import { useTheme } from "next-themes";
import { useState } from "react";

import { IconUI } from "../icon/IconUI";
import { SwitchUI } from "../switch/SwitchUI";
import React from "react";

export const DarkModeUI = () => {
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = useState<boolean>(theme === "light");

  const _setSelectedTheme = (val: boolean): void => {
    setIsSelected(val);
    setTheme(val ? "light" : "dark");
  };

  return (
    <SwitchUI
      initialState={isSelected}
      content={null}
      setHandler={(val: boolean): void => {
        _setSelectedTheme(val);
      }}
      startContent={<IconUI name="sun" width={20} height={20} />}
      endContent={<IconUI name="moon" width={20} height={20} />}
    />
  );
};
