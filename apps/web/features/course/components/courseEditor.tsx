"use client";
import { useIsCollaboration } from "customhooks";
import { usePathname } from "next/navigation";
import React from "react";

import CoursePagination from "./pagination";
import CourseCore from "./editor";

const CourseEditor = () => {
  const pathname = usePathname();
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);
  const isCollaboration = useIsCollaboration("/collaboration");

  return (
    <>
      <CourseCore isCollaboration={isCollaboration} id={id} />
      <CoursePagination isCollaboration={isCollaboration} id={id} />
    </>
  );
};

export default CourseEditor;
