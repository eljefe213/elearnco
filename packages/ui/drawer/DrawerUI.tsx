"use client";
import { motion, Variants } from "framer-motion";
import { useImperativeHandle, useState } from "react";
import React from "react";

import { TRANSITION } from "./Const";
import {
  IDimensionConfig,
  IPlaceConfig,
  IPlacementConfig,
  IPlacementToggleConfig,
  IProps,
} from "./Interfaces";
export const DrawerUI = React.forwardRef<any, IProps>((props, ref) => {
  const {
    children,
    width = 360,
    placeIn = "left",
    position = "fixed",
    classnames,
    actionHandler,
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(true);

  function onClose() {
    setIsOpen(false);
    actionHandler?.(false);
  }

  function onOpen() {
    setIsOpen(true);
    actionHandler?.(true);
  }

  function onToggle() {
    actionHandler?.(!isOpen);
    setIsOpen((isOpen) => !isOpen);
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        onClose: onClose,
        onOpen: onOpen,
        onToggle: onToggle,
      };
    },
    []
  );

  const getPlaceIn = (): IPlaceConfig[string] => {
    const config: IPlaceConfig = {
      left: { left: 0, height: "100vh", width: width, top: 0 },
      right: { right: 0, height: "100vh", width: width, top: 0 },
      top: { top: 0, height: width, width: "100%", left: 0 },
      bottom: { bottom: -Number(width), height: width, width: "100%", left: 0 },
    };

    return config[placeIn] || {};
  };

  const getPlacementToggle = (): IPlacementToggleConfig[string] => {
    const config: IPlacementToggleConfig = {
      left: { right: -30, width: 30, height: "100vh" },
      right: { right: Number(width), width: 30, height: "100vh" },
      top: { left: 0, width: "100%", height: 50, top: Number(width) },
      bottom: { left: 0, width: "100%", height: 50, bottom: Number(width) },
    };

    return config[placeIn] || { left: 0, right: 0, top: 0, bottom: 0 };
  };
  const getPlacementDrawer = (): number => {
    const config: IPlacementConfig = {
      left: -Number(width),
      right: Number(width),
      top: -Number(width),
      bottom: -Number(width),
    };

    return config[placeIn] || 0;
  };

  const getPlacementIcons = (): IDimensionConfig => {
    if (placeIn === "left" || placeIn === "right")
      return { width: 4, height: 50 };
    if (placeIn === "top" || placeIn === "bottom")
      return { height: 4, width: 50 };

    return { height: 0, width: 0 };
  };

  const getVariant = (): Variants => {
    const _getPlacementDrawer = getPlacementDrawer();

    if (placeIn === "left" || placeIn === "right")
      return {
        visible: { x: 0 },
        closed: { x: _getPlacementDrawer },
      };

    if (placeIn === "top" || placeIn === "bottom")
      return {
        visible: { y: 0 },
        closed: { y: _getPlacementDrawer },
      };

    return { visible: {}, closed: {} };
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate={isOpen ? "visible" : "closed"}
        transition={TRANSITION}
        variants={getVariant()}
        style={{
          position: position,
          zIndex: 10,
          ...getPlaceIn(),
        }}
      >
        <div
          onClick={onToggle}
          className="absolute flex justify-center items-center z-1000 cursor-pointer"
          style={{ ...getPlacementToggle() }}
        >
          <div
            className="bg-foreground/10 rounded-full"
            style={{
              ...getPlacementIcons(),
            }}
          />
        </div>
        <div
           style={{ height: `calc(100% - 93px` }}
          className="no-scrollbar overflow-x-hidden overflow-y-auto bg-background shadow-lg z-auto w-full"
        >
          <div className={classnames}> {children}</div>
        </div>
      </motion.div>
      {isOpen && <div className="fixed z-999 h-full w-full" />}
    </>
  );
});

DrawerUI.displayName = "DrawerUI";
export default DrawerUI;
