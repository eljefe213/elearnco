"use client";
import { useEventListener } from "customhooks";
import {
  changeCursor,
  computeNearestPlaceholderIndex,
  getBlockColor,
} from "lib/utils";
import React, { useMemo, useRef, useState } from "react";
import { IconUI } from "../icon/IconUI";
import { useBlockDnd } from "../providers/WorkspaceDndProvider";
import { BlockNodeUI } from "./BlockNodeUI";
import { PlaceholderNodeUI } from "./PlaceholderNodeUI";
import { usePageStore } from "store";
import { Block } from "database";
import { TPoint } from "schemas";

interface IProps {
  data: Partial<Block>[];
}

export const BlockNodesListUI = (props: IProps): JSX.Element => {
  const { data } = props;
  const { addBlock, reorderBlock } = usePageStore();

  const [mousePositionInElement, setMousePositionInElement] = useState({
    x: 0,
    y: 0,
  });
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const {
    draggedBlock,
    setDraggedBlock,
    draggedBlockType,
    setDraggedBlockType,
  } = useBlockDnd();

  const [expandedPlaceholderIndex, setExpandedPlaceholderIndex] = useState<
    number | undefined
  >();
  const placeholderRefs = useRef<HTMLDivElement[]>([]);
  const groupRef = useRef<HTMLDivElement>(null);
  const showSortPlaceholders = !!(draggedBlockType || draggedBlock);
  const isDraggingOnCurrentGroup = draggedBlock || draggedBlockType;

  const handlePushElementRef =
    (idx: number) =>
    (elem: HTMLDivElement | null): void => {
      elem && (placeholderRefs.current[idx] = elem);
    };
  const handleMouseMoveGlobal = (event: MouseEvent): void => {
    if (!draggedBlock) return;

    const { clientX, clientY } = event;
    setPosition({
      x: clientX - mousePositionInElement.x,
      y: clientY - mousePositionInElement.y,
    });
  };

  const handleBlockMouseDown =
    (blockIndex: number) =>
    (
      { relative, absolute }: { absolute: TPoint; relative: TPoint },
      block: Partial<Block>
    ) => {
      placeholderRefs.current.splice(blockIndex + 1, 1);
      setMousePositionInElement(relative);
      setPosition({
        x: absolute.x - relative.x,
        y: absolute.y - relative.y,
      });

      setDraggedBlock(block);
    };

  const handleMouseMoveOnGroup = (event: MouseEvent): void => {
    const index = computeNearestPlaceholderIndex(event.pageY, placeholderRefs);

    setExpandedPlaceholderIndex(index);
  };
  const handleMouseUpOnGroup = (event: MouseEvent): void => {
    setExpandedPlaceholderIndex(undefined);
    if (!isDraggingOnCurrentGroup) return;
    const blockIndex = computeNearestPlaceholderIndex(
      event.clientY,
      placeholderRefs
    );
    //Reorder group
    if (draggedBlock && draggedBlock.index !== undefined) {
      const _index =
        draggedBlock.index > blockIndex ? blockIndex : blockIndex - 1;
      reorderBlock(_index, draggedBlock);
    }

    //Add in group
    if (draggedBlockType && !draggedBlock) {
      //TODO - WHY UNKNOW ?
      addBlock?.(blockIndex, draggedBlockType as unknown as Block);
    }

    setDraggedBlock(undefined);
    setDraggedBlockType(undefined);
  };

  //EVENT MOUSE FOR A BLOCK IN A GROUP BLOCKS
  useEventListener("mousemove", handleMouseMoveGlobal);
  useEventListener("mouseup", () => {
    setDraggedBlock(undefined);
    setDraggedBlockType(undefined);
  });
  // Detect mousemove event when dragging label from drawer component (groupeRef is the super parent of group)
  useEventListener("mousemove", handleMouseMoveOnGroup, groupRef);
  useEventListener("mouseup", handleMouseUpOnGroup, groupRef, {
    capture: true,
  });
  useEventListener(
    "mouseleave",
    () => {
      setExpandedPlaceholderIndex(undefined);
    },
    groupRef
  );

  const totalBlocks = useMemo(() => data.length, [data]);

  if (draggedBlock) {
    changeCursor("grabbing");
  }

  //TODO - Refacto Cognitive Complexity
  return (
    <>
      <div className="w-full bg-black" ref={groupRef}>
        {data?.map((bloc: Partial<Block>, index: number) => {
          return (
            <React.Fragment key={bloc.uuid}>
              {index === 0 ? (
                <>
                  {draggedBlock && draggedBlock.index === bloc.index ? (
                    <></>
                  ) : (
                    <>
                      <PlaceholderNodeUI
                        index={index}
                        type={
                          (draggedBlockType as string) ||
                          (draggedBlock?.type as string)
                        }
                        isVisible={showSortPlaceholders}
                        isExpanded={
                          (expandedPlaceholderIndex === bloc.index &&
                            (draggedBlockType || draggedBlock)) as boolean
                        }
                        onRef={handlePushElementRef(bloc.index as number)}
                      />
                      <BlockNodeUI
                        bloc={bloc}
                        onMouseDown={handleBlockMouseDown(bloc.index as number)}
                        showSortPlaceholders={showSortPlaceholders}
                        totalBlocks={totalBlocks}
                      />
                    </>
                  )}
                </>
              ) : index === totalBlocks - 1 ? (
                <>
                  <PlaceholderNodeUI
                    type={
                      (draggedBlockType as string) ||
                      (draggedBlock?.type as string)
                    }
                    index={index}
                    isVisible={showSortPlaceholders}
                    isExpanded={
                      (expandedPlaceholderIndex === bloc.index &&
                        (draggedBlockType || draggedBlock)) as boolean
                    }
                    onRef={handlePushElementRef(bloc.index as number)}
                  />
                  {draggedBlock && draggedBlock.index === bloc.index ? (
                    <></>
                  ) : (
                    <>
                      <BlockNodeUI
                        bloc={bloc}
                        onMouseDown={handleBlockMouseDown(bloc.index as number)}
                        showSortPlaceholders={showSortPlaceholders}
                        totalBlocks={totalBlocks}
                      />
                      <PlaceholderNodeUI
                        type={
                          (draggedBlockType as string) ||
                          (draggedBlock?.type as string)
                        }
                        index={index + 1}
                        isVisible={showSortPlaceholders}
                        isExpanded={
                          (expandedPlaceholderIndex ===
                            (bloc.index as number) + 1 &&
                            (draggedBlockType || draggedBlock)) as boolean
                        }
                        onRef={handlePushElementRef((bloc.index as number) + 1)}
                      />
                    </>
                  )}
                </>
              ) : draggedBlock && draggedBlock.index === bloc.index ? (
                <></>
              ) : (
                <span>
                  <PlaceholderNodeUI
                    index={index}
                    type={
                      (draggedBlockType as string) ||
                      (draggedBlock?.type as string)
                    }
                    isVisible={showSortPlaceholders}
                    isExpanded={
                      (expandedPlaceholderIndex === bloc.index &&
                        (draggedBlockType || draggedBlock)) as boolean
                    }
                    onRef={handlePushElementRef(bloc.index as number)}
                  />
                  <BlockNodeUI
                    bloc={bloc}
                    onMouseDown={handleBlockMouseDown(bloc.index as number)}
                    showSortPlaceholders={showSortPlaceholders}
                    totalBlocks={totalBlocks}
                  />
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
      {draggedBlock && (
        <div
          className="flex items-start"
          style={{
            zIndex: 500,
            position: "fixed",
            userSelect: "none",
            top: 0,
            left: 0,
            maxWidth: "500px",
            width: "100%",
            height: "67px",
            pointerEvents: "none",
            transform: `translate(${position.x}px, ${position.y}px) rotate(-2deg) scale(1)`,
          }}
        >
          <div
            style={{
              backgroundColor: getBlockColor(draggedBlock.type as string).color,
            }}
          >
            <IconUI name="drag" width={20} height={20} />
          </div>
          <div
            className="rounded-md flex p-5"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "5px",
              backgroundColor: getBlockColor(draggedBlock.type as string).color,
            }}
          >
            <span style={{ userSelect: "none" }}>
              {draggedBlock ? JSON.stringify(draggedBlock.content) : ""}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
