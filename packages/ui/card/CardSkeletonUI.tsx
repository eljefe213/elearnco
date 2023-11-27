"use client";
import { Card, Skeleton } from "@nextui-org/react";
import React from "react";

const CARD = {
  width: 300,
  height: 350,
};

export const CardSkeletonUI = () => {
  return (
    <Card
      style={{ width: CARD.width, height: CARD.height }}
      className="p-4 gap-2"
      radius="lg"
    >
      <Skeleton className="rounded-lg">
        <div
          style={{ height: CARD.height }}
          className="w-full rounded-lg bg-default-300"
        />
      </Skeleton>

      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg my-3 mb-2">
          <div className="h-6 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg my-3">
          <div className="h-6 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
      </div>
    </Card>
  );
};
