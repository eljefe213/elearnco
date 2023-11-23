import { Chip } from "@nextui-org/react";
import { changeCursor, getBlockColor, resetCursor } from "lib/utils";
import React, { useMemo } from "react";
import { BlockType } from "schemas";
import { IconUI } from "../icon/IconUI";

type IProps = {
  draggedBlockType;
  type: string;
  category: string;
  onMouseDown: (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>,
    type: BlockType
  ) => void;
};
export const BlocCardTextUI = (props: IProps) => {
  const { onMouseDown, type, category, draggedBlockType } = props;

  const _handleMouseDown = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>
  ): void => onMouseDown(e, type as BlockType);

  const BACKGROUND_COLOR = useMemo(
    () => getBlockColor(category).backgroundColor,
    []
  );

  const ICON = type?.toLocaleLowerCase().trim().replace(/\s/g, "");
  return (
    <Chip
      onMouseDown={_handleMouseDown}
      onMouseEnter={()=>  changeCursor('grab')}
      onMouseLeave={resetCursor}
      className="select-none h-10"
      startContent={<IconUI name={ICON} width={20} height={20} />}
      size="lg"
      radius="sm"
      color={BACKGROUND_COLOR}
      style={{
        maxWidth: "100%",
        opacity: draggedBlockType === type ? "0.5" : "1",
      }}
    >
      {draggedBlockType === type ? "" : type}
    </Chip>
  );
};
