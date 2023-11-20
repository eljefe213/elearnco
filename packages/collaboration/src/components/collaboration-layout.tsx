import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useAwarenessState } from "../hooks/useAwareness";
import { AwarenessState } from "../types";

export type CollaborationLayoutProps = {
  collaboratorElement?: (state: AwarenessState, clientID: number) => ReactNode;
};

export const CollaborationLayout = ({
  collaboratorElement,
}: CollaborationLayoutProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [states] = useAwarenessState<AwarenessState>();

  useEffect(() => {
    if (typeof window == "undefined") return;

    const _container = document.createElement("div");
    _container.classList.add("collaboration-layout");
    document.body.appendChild(_container);

    setContainer(_container);
    return () => {
      if (document.body && _container) {
        document.body.removeChild(_container);
      }
    };
  }, []);

  return (
    container &&
    createPortal(
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 999999,
          pointerEvents: "none",
        }}
      >
        {collaboratorElement &&
          Object.entries(states).map(([clientID, state]) => (
            <React.Fragment key={clientID}>
              {collaboratorElement(state, +clientID)}
            </React.Fragment>
          ))}
      </div>,
      container
    )
  );
};
