import React, { useMemo } from "react";
import { CardSkeletonUI } from "ui";
const numberOfCards = 10;
const CourseLoading = () => {
  const skeletonCards = useMemo(
    () =>
      Array.from({ length: numberOfCards }, (_, index) => (
        <CardSkeletonUI key={`CardSkeletonUI_${index}`} />
      )),
    [numberOfCards]
  );

  return <>{skeletonCards}</>;
};

export default React.memo(CourseLoading);
