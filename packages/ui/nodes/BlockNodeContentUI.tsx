import dynamic from "next/dynamic";
import React from "react";
import { ActivityBlockType, BLOCK_ACTIVITY_LIST } from "schemas";
import { BLOCK_TEXT_LIST, TextBlockType } from "schemas/blocks/text";

import { LoadingSpinnerUI } from "../loading";

//TODO:PASSE ID BLOCK

const DynamicWriterEditor = dynamic(() => import("../writeEditor"), {
  loading: ()=> <LoadingSpinnerUI />,
});

const DynamicDrawingEditor = dynamic(() => import("../drawingEditor"), {
  loading: () => <LoadingSpinnerUI />,
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
BlockNodeContentUI.displayName="BlocNodeContentUI";
export default BlockNodeContentUI;
