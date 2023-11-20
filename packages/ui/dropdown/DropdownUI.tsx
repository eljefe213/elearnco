"use client";
import { OverlayPlacement } from "@nextui-org/aria-utils";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { useCallback } from "react";
import React from "react";
import { IconUI } from "../icon/IconUI";

type TColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

interface IShortcut {
  name: string;
  action: () => void;
}

interface IClassNamesDropdown {
  base: string;
  arrow: string;
}

interface IDropdownItem {
  id: string;
  shortcut?: IShortcut;
  description: string;
  startContent?: string;
  label: string;
  action: string;
  color?: TColor;
}

export interface IData {
  data: IDropdownItem[];
  id: string;
  title: string;
}

interface IProps {
  children?: React.ReactNode;
  showArrow?: boolean;
  placement?: OverlayPlacement | undefined;
  classNamesDropdown?: IClassNamesDropdown;
  data: IData[];
  actionHandler?: (action: string) => void;
  color?: TColor;
}

export const DropdownUI = (props: IProps): JSX.Element => {
  const {
    children = null,
    showArrow = true,
    data = [],
    placement = "bottom-end",
    actionHandler,
    color = "",
  } = props;

  const showDivider = useCallback((index: number) => {
    return data.length !== 1 && data.length !== index + 1;
  }, []);

  return (
    <Dropdown showArrow={showArrow} placement={placement}>
      <DropdownTrigger>{children}</DropdownTrigger>
      <DropdownMenu aria-label="Menu" variant="faded">
        {data.map((section: IData, index: number): JSX.Element => {
          return (
            <DropdownSection
              title={section.title}
              showDivider={showDivider(index)}
              id={section.id}
              key={section.id}
            >
              {section.data.map((item: IDropdownItem): JSX.Element => {
                return (
                  <DropdownItem
                    onClick={() => actionHandler?.(item.action)}
                    id={item.id}
                    key={item.id}
                    description={item.description}
                    shortcut={item?.shortcut?.name}
                    startContent={
                      item.startContent ? (
                        <IconUI
                          name={item.startContent}
                          width={20}
                          height={20}
                        />
                      ) : (
                        <></>
                      )
                    }
                    color={item.color}
                  >
                    {item.label}
                  </DropdownItem>
                );
              })}
            </DropdownSection>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};
