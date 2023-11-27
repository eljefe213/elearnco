"use client";
import React from "react";
import {
  ActivityBlockType,
  DraggableBlockType,
  LogicBlockType,
  MediaBlockType,
  TextBlockType,
} from "schemas";

import { BlocCardTextUI } from "./BlockCardLabelUI";

type IProps = {
  draggedBlockType: DraggableBlockType | undefined;
  type: string;
  tooltip?: string;
  isDisabled?: boolean;
  children?: React.ReactNode;
  category: string;
  onMouseDown: (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>,
    type: TextBlockType | MediaBlockType | LogicBlockType | ActivityBlockType
  ) => void;
};

export const BlockCardUI = (props: IProps) => {
  const { type, onMouseDown, category, draggedBlockType } = props;

  return (
    <BlocCardTextUI
      draggedBlockType={draggedBlockType}
      category={category}
      type={type}
      onMouseDown={onMouseDown}
    />
  );
};
