"use client";
import { Button, ButtonGroup, Tooltip } from "@nextui-org/react";
import React from "react";
import { IconUI } from "../../icon/IconUI";
import { GenericObject } from "schemas";


type TOrientation = "horizontal" | "vertical";

interface IProps {
  data:GenericObject;
  isDisabled: boolean;
  orientation: TOrientation;
  onClickHandler: (action: string, id: string) => void;
  blockID?: string;
}
export const GoupeButtonUI = React.memo((props: IProps) => {
  const { data = [], isDisabled = false, onClickHandler, blockID = "" } = props;

  return (
    <ButtonGroup  size="sm" radius="full" className="flex justify-end">
      {data.map((item) => (
        <Tooltip key={item.id} content={item.label}>
          <Button
            isDisabled={item.isdisabled || isDisabled}
            onClick={(): void => onClickHandler(item.shortcut.action, blockID)}
            isIconOnly
            aria-label={item.label}
          >
            <IconUI name={item.icon} width={20} height={20} />
          </Button>
        </Tooltip>
      ))}
    </ButtonGroup>
  );
});
