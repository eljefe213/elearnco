import React from "react";
import {
  ActivityBlockType,
  DraggableBlockType,
  LogicBlockType,
  MediaBlockType,
  TextBlockType,
} from "schemas";

import { BlockCardUI } from "./BlockCardUI";

type IProps = {
  draggedBlockType: DraggableBlockType | undefined;
  blockType:
    | TextBlockType
    | MediaBlockType
    | LogicBlockType
    | ActivityBlockType;
  tooltip?: string;
  isDisabled?: boolean;
  children?: React.ReactNode;
  section: string;
  category: string;
  onMouseDown: (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>,
    type: string
  ) => void;
};
export const BlockCardList = (props: IProps) => {
  const { blockType, onMouseDown, section, category, draggedBlockType } = props;

  return (
    <>
      <h2 className="font-semibold tracking-tight py-2 px-2 text-left text-sm">
        {section}
      </h2>
      <div className="grid grid-cols-2 gap-3 p-2">
        {Object.values(blockType).map((type) => (
          <BlockCardUI
            key={type}
            type={type}
            onMouseDown={onMouseDown}
            category={category}
            draggedBlockType={draggedBlockType}
          />
        ))}
      </div>
    </>
  );
};
