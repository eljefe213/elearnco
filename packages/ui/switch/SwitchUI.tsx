"use client";
import React, {  useEffect } from "react";
import { Switch } from "@nextui-org/react";


interface IProps {
  initialState: boolean;
  children?: React.ReactNode | null;
  setHandler: (state: boolean) => void;
  startContent?: React.ReactNode | null;
  endContent?: React.ReactNode | null;
}

export const SwitchUI = (props: IProps) => {
  const {
    initialState = false,
    children = null,
    setHandler = null,
    startContent = null,
    endContent = null,
  } = props;

  const [isSelected, setIsSelected] = React.useState<boolean>(false);

  const _setIsSelected = (): void => {
    const _state = !isSelected;
    setIsSelected(_state);
    setHandler?.(_state);
  };

  useEffect(() => {
    setIsSelected(initialState);
  }, [initialState]);

  return (
    <Switch
      isSelected={isSelected}
      onValueChange={_setIsSelected}
      defaultSelected={isSelected}
      size="lg"
      color="primary"
      startContent={startContent}
      endContent={endContent}
    >
      {children && children}
    </Switch>
  );
};
