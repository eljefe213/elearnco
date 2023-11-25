import { getBlockColor } from "lib";
import React from "react";

const MORE_SYLES = {
  backgroundColor: "#c084fc1a",
  backgroundSize: "7.07px 7.07px",
  marginTop: "4px",
  marginBottom: "4px",
  
};

type Props = {
  isVisible: boolean;
  isExpanded: boolean;
  onRef: (ref: HTMLDivElement) => void;
  index?: number;
  type:string;
};

export const PlaceholderNodeUI = ({ type,isVisible, isExpanded, onRef }: Props) => {
 
  const backgroundColor= getBlockColor(type)

  const setStyle = () => {
    return {
      height: isExpanded ? "50px" : "0px",
      visibible: isVisible ? "visible" : "hidden",
      transition: isVisible ? "height 200ms" : "none",
      backgroundImage: `linear-gradient(135deg, ${backgroundColor.color} 10%, #0000 0, #0000 50%, ${backgroundColor.color} 0, ${backgroundColor.color} 60%, #0000 0, #0000)`,
      ...MORE_SYLES,
    };
  };

  return <div className="rounded-md" ref={onRef} style={setStyle()} />;
};
