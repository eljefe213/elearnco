"use client";
import { Spinner } from "@nextui-org/react";
import React from "react";

export const LoadingSpinnerUI = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <Spinner />
    </div>
  );
};
