"use client";
import React from "react";

export const HeaderUI = (props: React.PropsWithChildren) => {
  const { children } = props;
  return (
    <div className="w-full top-0 left-0 right-0 flex items-center h-16 pl-2 pr-4 border-b border-n-3 bg-n-1 rounded-t-xl justify-between px-3 bg-n-6 border-n-5 fixed z-30 rounded-none">
      {children}
    </div>
  );
};

export default HeaderUI;
