import React, { type SVGProps } from "react";

export const IconAvatarUI = ({
  name,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: string;
}) => {
  return (
    <svg {...props}>
      <use xlinkHref={`/avatar.svg#${name}`} />
    </svg>
  );
};
