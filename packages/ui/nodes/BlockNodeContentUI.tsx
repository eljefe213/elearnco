import React from "react";
import dynamic from "next/dynamic";
import { LoadingSpinnerUI } from "../loading";
import { BLOCK_TEXT_LIST, TextBlockType } from "schemas/blocks/text";
import { ActivityBlockType, BLOCK_ACTIVITY_LIST } from "schemas";

//TODO:PASSE ID BLOCK

const DynamicWriterEditor = dynamic(() => import("../writeEditor"), {
  loading: (): JSX.Element => <LoadingSpinnerUI />,
});

const DynamicDrawingEditor = dynamic(() => import("../drawingEditor"), {
  loading: (): JSX.Element => <LoadingSpinnerUI />,
});

const BlockNodeContentUI = React.memo(({ type }: { type: string }) => {
  const getModule = () => {
    if (BLOCK_TEXT_LIST.includes(type as TextBlockType)) {
      return <DynamicWriterEditor blockID="" type={type} />;
    }

    if (BLOCK_ACTIVITY_LIST.includes(type as ActivityBlockType)) {
      return <DynamicDrawingEditor blockID="" type={type}/>;
    }

    return <>{type}</>;
  };

  return getModule();
});

export default BlockNodeContentUI;
