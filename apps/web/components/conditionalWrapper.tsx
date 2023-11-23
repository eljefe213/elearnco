import { ReactElement, ReactNode } from "react";

export const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: {
  condition: boolean;
  wrapper: (children?: ReactNode) => ReactElement;
  children?: ReactNode;
}) => (condition ? wrapper(children) : (children as ReactElement));
