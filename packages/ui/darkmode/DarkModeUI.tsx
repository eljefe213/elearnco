"use client";
import { useTheme } from "next-themes";
import { SwitchUI } from "../switch/SwitchUI";
import { useState } from "react";
import { IconUI } from "../icon/IconUI";

export const DarkModeUI = (): JSX.Element => {
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = useState<boolean>(
    theme === "light" ? true : false
  );

  const _setSelectedTheme = (val: boolean): void => {
    setIsSelected(val);
    setTheme(val ? "light" : "dark");
  };

  return (
    <SwitchUI
      initialState={isSelected}
      children={null}
      setHandler={(val: boolean): void => {
        _setSelectedTheme(val);
      }}
      startContent={<IconUI name="sun" width={20} height={20} />}
      endContent={<IconUI name="moon" width={20} height={20} />}
    />
  );
};
