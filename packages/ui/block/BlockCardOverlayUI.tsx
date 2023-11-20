import { Chip } from "@nextui-org/react";
import { getBlockColor } from "lib";
import React, { useMemo } from "react";
import { DraggableBlockType } from "schemas";
import { IconUI } from "../icon/IconUI";

export const BlockCardOverlayUI = ({
  type,
  onMouseUp,
  ...props
}: { style } & { onMouseUp: () => void } & {
  type: DraggableBlockType | undefined;
}) => {
  const BACKGROUND_COLOR = useMemo(
    () => getBlockColor(type as string).backgroundColor,
    []
  );
  const ICON = type?.toLocaleLowerCase().trim().replace(/\s/g, "");

  return (
    <Chip
      startContent={<IconUI name={ICON ? ICON : ""} width={20} height={20} />}
      style={{ ...props.style }}
      className="fixed top-0 left-0 select-none pointer-events-none"
      size="lg"
      radius="sm"
      color={BACKGROUND_COLOR}
    >
      {type}
    </Chip>
  );
};
