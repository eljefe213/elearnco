import { useEffect } from "react";

import { useAwarenessStateField } from "../hooks/useAwareness";
import { AwarenessState } from "../types";

export const CollaborationMouseUpdater = () => {
  const [mouses, mouse, setMouse] =
    useAwarenessStateField<AwarenessState["mouse"]>("mouse");

  useEffect(() => {
    const current: NonNullable<AwarenessState["mouse"]> = {
      x: 0,
      y: 0,
      style: "auto",
      clicking: false,
      grabbing: false,
    };

    function update() {
      setMouse(current);
    }

    function handleMousemove(e: MouseEvent) {
      current.x = e.x;
      current.y = e.y;

      if (e.target instanceof HTMLElement) {
        const computed = window.getComputedStyle(e.target)["cursor"];
        current.style = computed;

        if (e.target.isContentEditable) {
          current.style = "text";
        }
      }

      update();
    }

    function handleMousedown(e: MouseEvent) {
      if (current.style === "text") return;

      current.style === "grab"
        ? (current.grabbing = true)
        : (current.clicking = true);
      update();
    }

    function handleMouseup(e: MouseEvent) {
      current.clicking = false;
      current.grabbing = false;
      update();
    }

    window.addEventListener("mousemove", handleMousemove);
    window.addEventListener("mousedown", handleMousedown);
    window.addEventListener("mouseup", handleMouseup);
    //TODO: WHAT APPENED HERE ???

    return () => {
      //window.removeEventListener('mousemove', handleMousemove);
      // window.removeEventListener('mousedown', handleMousedown);
      //window.removeEventListener('mouseup', handleMouseup);
    };
  }, [setMouse, mouse]);

  return <></>;
};
