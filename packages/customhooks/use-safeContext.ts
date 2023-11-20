import { Context, useContext } from "react";

export const useSafeContext = <T>(context: Context<T>, name: string) => {
  const state = useContext(context);

  if (!state) {
    throw new Error(
      `No ${name} was found. Did you forget to wrap your component with CollaborationProvider?`
    );
  }

  return state;
};
