"use client";
import { Pagination } from "@nextui-org/react";
import React, { useEffect } from "react";

import BarUI from "../menu/BarUI";

type TPosition = "top" | "bottom" | "left" | "right";

interface IProps {
  fixedInPosition: TPosition;
  onChange?: (page: number) => void;
  total: number;
  activePage: number;
}

export const PaginationUI = (props: React.PropsWithChildren<IProps>) => {
  const {
    fixedInPosition,
    onChange,
    total = 10,
    activePage = 1,
    children,
  } = props;

  useEffect(() => {
    void 0;
  }, [total]);

  return (
    <BarUI fixedInPosition={fixedInPosition} position="fixed">
      <Pagination
        onChange={(page) => onChange?.(page)}
        total={total}
        initialPage={1}
        page={activePage}
        size="sm"
        radius="full"
      />
      {children}
    </BarUI>
  );
};
