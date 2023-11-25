"use client";
import { changeCursor } from "lib";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BlockCategories, BlockType, POINT, TextBlockType, TPoint } from "schemas";
import { ActivityBlockType } from "schemas/blocks/activity";
import {LogicBlockType } from "schemas/blocks/logic"
import { MediaBlockType } from "schemas/blocks/media";

import { useBlockDnd } from "../providers/WorkspaceDndProvider";
import { BlockCardList } from "./BlockCardListUI";
import { BlockCardOverlayUI } from "./BlockCardOverlayUI";

export const BlockCardSectionsUI = () => {
  const { setDraggedBlockType, draggedBlockType } = useBlockDnd();
  const [position, setPosition] = useState<TPoint>(POINT);
  const relativeCoordinates = useRef<TPoint>(POINT);
  const isDragging = useRef<boolean>(false);

  const _removeAllListeners = (): void => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("touchmove", handleMouseMove);
    document.removeEventListener("touchend", handleMouseUp);
  };
  const handleMouseDown = (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>,
    type: TextBlockType | MediaBlockType
  ): void => {
    changeCursor('grab')
    if (isDragging.current) return;
    isDragging.current = true;
    let _event;
    let clientX = 0;
    let clientY = 0;
    event.preventDefault();
    const element = event.currentTarget as HTMLDivElement;
    const rect = element.getBoundingClientRect();

    if (event.type === "mousedown") {
      _event = event as React.MouseEvent;
      clientX = _event.clientX;
      clientY = _event.clientY;
    } else {
      _event = event as React.TouchEvent;
      clientX = _event.touches[0].clientX;
      clientY = _event.touches[0].clientY;
    }
    setPosition({ x: rect.left, y: rect.top });
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    relativeCoordinates.current = { x, y };
    setDraggedBlockType(type);

    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("touchend", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent): void => {
    if (!isDragging.current) return;
    event.preventDefault();
    changeCursor('grabbing')
    let _event;
    let clientX = 0;
    let clientY = 0;
    if (event.type === "mousemove") {
      _event = event;
      clientX = _event.clientX;
      clientY = _event.clientY;
    } else {
      _event = event as unknown as TouchEvent;
      clientX = _event.touches[0].clientX;
      clientY = _event.touches[0].clientY;
    }

    setPosition({
      ...position,
      x: clientX - relativeCoordinates.current.x,
      y: clientY - relativeCoordinates.current.y,
    });
  };

  const handleMouseUp = (): void => {
    
    if (!isDragging.current) return;
    isDragging.current = false;
    setDraggedBlockType(undefined);
    setPosition({
      x: 0,
      y: 0,
    });
    _removeAllListeners();
  };
  useEffect(() => {
    return () => {
      _removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <>
      <BlockCardList
        draggedBlockType={draggedBlockType}
        blockType={TextBlockType as unknown as BlockType}
        onMouseDown={handleMouseDown}
        section="Textes"
        category={BlockCategories.text}
      />
      <BlockCardList
       draggedBlockType={draggedBlockType}
        blockType={MediaBlockType as unknown as MediaBlockType}
        onMouseDown={handleMouseDown}
        section="Medias"
        category={BlockCategories.media}
      />
      <BlockCardList
       draggedBlockType={draggedBlockType}
        blockType={ActivityBlockType as unknown as ActivityBlockType}
        onMouseDown={handleMouseDown}
        section="Activity"
        category={BlockCategories.activity}
      />
      <BlockCardList
        draggedBlockType={draggedBlockType}
        blockType={LogicBlockType as unknown as LogicBlockType}
        onMouseDown={handleMouseDown}
        section="Logic"
        category={BlockCategories.logic}
      /> 
      {draggedBlockType &&
        createPortal(
          <BlockCardOverlayUI
            type={draggedBlockType}
            onMouseUp={handleMouseUp}
            style={{
              cursor: "grabbing",
              transform: `translate(${position.x}px, ${position.y}px) rotate(-2deg)`,
              zIndex: 100000,
              width: "160px",
              maxWidth: "160px",
              height: "40px",
            }}
          />,
          document.body
        )}
    </>
  );
};
