"use client";
import React from "react";
interface IProps {
  className?: string;
}

export const LayoutUI = (props: React.PropsWithChildren<IProps>) => {
  const { children, className } = props;

  return (
    <div className="background">
      <div className="flex h-screen w-full h-screen-ios">
        <div
          className={`relative flex grow max-w-full pt-16 bg-n-1 rounded-xl scroll-smooth scrollbar-none w-full md:rounded-none ${className}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutUI;
