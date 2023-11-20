"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import BreadcrumbItemsUI from "./BreadcrumbItemsUI";
import BreadcrumbItemUI from "./BreadcrumbItemUI";

interface IBreadcrumbItem {
  href: string;
  label: string;
  isCurrent: boolean;
}

export const BreadcrumbUI = () => {
  const router = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumbItem[]>([]);

  useEffect(() => {
    const pathWithoutQuery = router.split("?")[0];

    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");

      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
        isCurrent: index === pathArray.length - 1,
      };
    });

    setBreadcrumbs(breadcrumbs);
  }, [router]);
  return (
    <BreadcrumbItemsUI>
      <>
        <BreadcrumbItemUI isCurrent={router === "/"} href="/">
          Home
        </BreadcrumbItemUI>
        {breadcrumbs &&
          breadcrumbs.map((breadcrumb) => (
            <BreadcrumbItemUI
              key={breadcrumb.href}
              href={breadcrumb.href}
              isCurrent={breadcrumb.isCurrent}
            >
              <span className="px-2">/</span>
              {breadcrumb.label}
            </BreadcrumbItemUI>
          ))}
      </>
    </BreadcrumbItemsUI>
  );
};

export default BreadcrumbUI;
