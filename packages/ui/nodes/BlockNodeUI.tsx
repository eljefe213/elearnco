"use client";
import { useCallback, useRef } from "react";
import { DATA_MENU_BLOCK, EActionsBloc, TPoint } from "schemas";
import { GoupeButtonUI } from "../button/groupeButton/GroupeButtonUI";
import { IconUI } from "../icon/IconUI";
import { useDragDistance } from "../providers/WorkspaceDndProvider";
import { usePageStore } from "store";
import { Block } from "database";
import React from "react";
import { changeCursor, getBlockColor, resetCursor } from "lib/utils";
import BlockNodeContentUI from "./BlockNodeContentUI";

interface IProps {
  onMouseDown?: (blockNodePosition: any, block: any) => void;
  bloc: Partial<Block>;
  showSortPlaceholders: boolean;
  totalBlocks: number;
}
export const BlockNodeUI = (props: IProps): JSX.Element => {
  const {
    onMouseDown,
    bloc,
    showSortPlaceholders = false,
    totalBlocks = 0,
  } = props;
  const { removeBlock, duplicateBlock, moveDown, moveUp } = usePageStore();
  const blockRef = useRef<HTMLDivElement | null>(null);

  const onDrag = (position: { absolute: TPoint; relative: TPoint }) => {
    if (bloc.type === "start" || !onMouseDown) return;

    onMouseDown?.(position, bloc);
  };

  const _onClickHandler = useCallback((action, id) => {
    if (action === EActionsBloc.DELETE) {
      removeBlock(id);
    } else if (action === EActionsBloc.DUPLICATE) {
      duplicateBlock(id);
    } else if (action === EActionsBloc.MOVEDOWN) {
      moveDown(id);
    } else if (action === EActionsBloc.MOVEUP) {
      moveUp(id);
    }
  }, []);
  const newDataMenuBlock = [...DATA_MENU_BLOCK];
  if (bloc.index === 0) {
    newDataMenuBlock[0] = { ...newDataMenuBlock[0], isdisabled: true };
  }

  if (bloc.index === totalBlocks - 1) {
    newDataMenuBlock[1] = {
      ...newDataMenuBlock[1],
      isdisabled: true,
    };
  }

  //FIXME - The render is actived on mouseOver => is this necessary ?

  const BACKGROUND_COLOR = getBlockColor(bloc.type as string).color;
  const ICON = bloc.type?.toLocaleLowerCase().trim().replace(/\s/g, "");
  useDragDistance({
    ref: blockRef,
    onDrag,
    isDisabled: !onMouseDown,
  });
  return (
    <div
      className="flex items-start h-auto"
      style={{ backgroundColor: BACKGROUND_COLOR }}
    >
      <div
        ref={blockRef}
        onMouseEnter={(): void => changeCursor("grab")}
        onMouseLeave={resetCursor}
      >
        <IconUI color="black" name="drag" width={20} height={20} />
      </div>
      <div className="flex flex-col p-2 bg-default-50 w-full h-full">
        <GoupeButtonUI
          isDisabled={showSortPlaceholders}
          data={newDataMenuBlock}
          orientation="horizontal"
          onClickHandler={_onClickHandler}
          blockID={bloc.uuid}
        />

        <div
          style={{ userSelect: showSortPlaceholders ? "none" : "auto" }}
          className="px-5"
        >
          <BlockNodeContentUI type={bloc?.type as string} />
        </div>
      </div>
      <div className="w-6 h-6 flex justify-center mt-2">
        <IconUI color="white" name={ICON || ""} width={20} height={20} />
      </div>
    </div>
  );
};
