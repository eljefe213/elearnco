import Link from "next/link";
import React from "react";

const BreadcrumbItemUI = ({
  children,
  href,
  isCurrent,
  ...props
}: {
  children: any;
  href: string;
  isCurrent: boolean;
}) => {
  return (
    <li {...props}>
      <Link
        href={href}
        passHref
        className={isCurrent ? "text-blue-500" : ""}
        aria-current={isCurrent ? "page" : "false"}
      >
        {children}
      </Link>
    </li>
  );
};

export default BreadcrumbItemUI;
