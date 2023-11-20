import React, { type SVGProps } from "react";
export const IconUI = ({
  name,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: string;
}) => {
  return (
    <svg {...props}>
      <use xlinkHref={`/sprite.svg#${name}`} />
    </svg>
  );
};
