import { ReactElement, ReactNode } from "react";

interface IConditionalWrapper {
  condition: boolean;
  wrapper: (children?: ReactNode) => ReactElement;
}

export const ConditionalWrapper = (
  props: React.PropsWithChildren<IConditionalWrapper>
) =>
  props.condition
    ? props.wrapper(props.children)
    : (props.children as ReactElement);
