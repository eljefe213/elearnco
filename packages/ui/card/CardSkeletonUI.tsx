"use client";
import { Card, Skeleton } from "@nextui-org/react";
import React from "react";

export const CardSkeletonUI = () => {
  return (
    <Card className="w-[300px] h-[350px] p-4 gap-2" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-[200px] w-full rounded-lg bg-default-300" />
      </Skeleton>

      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg my-3">
          <div className="h-6 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg my-3">
          <div className="h-6 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
      </div>
    </Card>
  );
};
