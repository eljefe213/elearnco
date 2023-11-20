import React, { useMemo } from "react";

type TPosition = "top" | "bottom" | "left" | "right";

interface IProps {
  position: string;
  fixedInPosition: TPosition;
  classnames?: string;
  children?: React.ReactNode;
}

export const BarUI = (props: IProps): JSX.Element => {
  const { fixedInPosition = "top", children, position = "fixed" } = props;

  const getPosition = useMemo((): string => {
    if (fixedInPosition === "top") return "top-0";
    if (fixedInPosition === "bottom") return "bottom-0";
    if (fixedInPosition === "left") return "left-0";
    if (fixedInPosition === "right") return "right-0";
    return "top-0";
  }, []);
  const orientation = useMemo((): string => {
    if (fixedInPosition === "top" || fixedInPosition === "bottom")
      return "flex-row";
    if (fixedInPosition === "left" || fixedInPosition === "right")
      return "flex-col";
    return "row";
  }, []);

  const dimension = useMemo((): string => {
    if (fixedInPosition === "top" || fixedInPosition === "bottom")
      return "w-full justify-center";
    if (fixedInPosition === "left" || fixedInPosition === "right")
      return "h-full items-center";
    return "w-full";
  }, []);

  return (
    <div className={`${position} ${getPosition} ${dimension} px-2 z-50`}>
      <div className={`flex py-2 ${dimension}`}>
        <div
          className={`flex bg-background rounded-full p-2 gap-2 ${orientation}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BarUI;
