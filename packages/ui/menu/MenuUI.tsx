"use client";
import { Button, Divider, Tooltip } from "@nextui-org/react";
import { matchRoute } from "lib/utils";
import { usePathname } from "next/navigation";
import { useRouter } from "next13-progressbar";
import React, { useMemo } from "react";
import {  TFixedInPosition, TPosition } from "schemas/global";

import { IconUI } from "../icon/IconUI";
import BarUI from "./BarUI";

interface IProps {
  fixedInPosition: TFixedInPosition;
  data: IItem[];
  classnames?: string;
  position?: TPosition;
}

interface IItem {
  id: string;
  label: string;
  route: string;
  shortcut: {
    name: string;
    action: () => void;
  };
  description: string;
  icon?: string;
  hastooltip: boolean;
}

const ButtonWithIcon = React.forwardRef<HTMLElement, IItem>(
  (props, ref): JSX.Element => {
    const router = useRouter();
    const pathname = usePathname();
    const handleClick = (e: React.MouseEvent): void => {
      e.preventDefault();
      router.push(`/${props.route}`);
    };

    const isActive =
      matchRoute(pathname, props.route) ||
      (pathname.includes("editor") && props.route.includes("courses"));

    return (
      <span ref={ref} {...props} {...{ hastooltip: String(props.hastooltip) }}>
        <Button
          size="sm"
          variant="solid"
          isIconOnly
          className={`rounded-full ${isActive ? "bg-primary" : ""}`}
          onClick={(e) => handleClick(e)}
        >
          <div className="flex flex-col items-center">
            <IconUI
              color={isActive ? "white" : "black"}
              width={18}
              height={18}
              name={props.icon ? props.icon : "home"}
            />
          </div>
        </Button>
      </span>
    );
  }
);
ButtonWithIcon.displayName = "ButtonWithIcon";
export const MenuUI = (props: IProps): JSX.Element => {
  const { data, classnames = "", fixedInPosition, position = "fixed" } = props;

  const setChildren = (item: IItem): JSX.Element => {
    if (item.label === "divider")
      return <Divider orientation="vertical" className="auto" />;
    if (item.hastooltip)
      return (
        <Tooltip
          showArrow
          shouldCloseOnBlur
          shouldFlip
          placement={
            fixedInPosition === "top"
              ? "bottom"
              : fixedInPosition === "bottom"
              ? "top"
              : "left"
          }
          offset={5}
          content={item.label}
          color="foreground"
        >
          <ButtonWithIcon {...item} />
        </Tooltip>
      );

    return <ButtonWithIcon {...item} />;
  };

  const DATA_MEMO = useMemo(
    () =>
      data.map((item: IItem) => <span key={item.id}>{setChildren(item)}</span>),
    []
  );

  return (
    <BarUI
      position={position}
      classnames={classnames}
      fixedInPosition={fixedInPosition}
    >
      {DATA_MEMO}
    </BarUI>
  );
};
