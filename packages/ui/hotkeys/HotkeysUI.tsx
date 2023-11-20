"use client";
import { Kbd, KbdKey } from "@nextui-org/react";
import { filterKeysFromString } from "lib";
import React from "react";
interface IProps {
  collectionKeys: string;
}

export const HotkeysUI = (props: IProps): JSX.Element => {
  const { collectionKeys } = props;
  const keys = filterKeysFromString(collectionKeys);

  return (
    <Kbd keys={keys.accepted as KbdKey[]}>
      {keys.rejected.map((key) => (
        <React.Fragment key={key}>{key}</React.Fragment>
      ))}
    </Kbd>
  );
};

export default HotkeysUI;
