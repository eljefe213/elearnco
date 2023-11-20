import React from "react";
import { CardSkeletonUI } from "ui";

const CourseLoading = () => {
  return (
    <>
      <CardSkeletonUI />
      <CardSkeletonUI />
      <CardSkeletonUI />
      <CardSkeletonUI />
      <CardSkeletonUI />
      <CardSkeletonUI />
      <CardSkeletonUI />
      <CardSkeletonUI />
      <CardSkeletonUI />
      <CardSkeletonUI />
    </>
  );
};

export default React.memo(CourseLoading);
