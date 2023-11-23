"use client";
import { useIsCollaboration } from "customhooks";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { BlockCardSectionsUI, DrawerUI, WorkspaceDndProvider } from "ui";
import {
  CourseQueryGeneric,
  CourseQueryWithCollaboration,
} from "./courseQueryGeneric";
import {
  PaginationGeneric,
  PaginationWithCollaboration,
} from "./navigateGeneric";
import { PARENT_CSS, WIDTH_SIDEBAR } from "@/const";

const CoursePagination = ({
  isCollaboration,
  id,
}: {
  isCollaboration: boolean;
  id: string;
}) => {
  return isCollaboration ? (
    <PaginationWithCollaboration
      isCollaboration={isCollaboration}
      courseID={id}
    />
  ) : (
    <PaginationGeneric isCollaboration={isCollaboration} courseID={id} />
  );
};

const CourseCore = ({
  isCollaboration,
  id,
}: {
  isCollaboration: boolean;
  id: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const _callback = (state: boolean): void => {
    setIsOpen(state);
  };

  return (
    <div style={{ ...PARENT_CSS }}>
      <WorkspaceDndProvider>
        <DrawerUI
          position="absolute"
          width={WIDTH_SIDEBAR}
          placeIn="right"
          classnames="h-full"
          hasOverlay={false}
          actionHandler={_callback}
        >
          <BlockCardSectionsUI />
        </DrawerUI>
        {isCollaboration ? (
          <CourseQueryWithCollaboration courseID={id} />
        ) : (
          <CourseQueryGeneric courseID={id} />
        )}
      </WorkspaceDndProvider>

      <div
        className="relative  left-full"
        style={{
          flex: "0 0 auto",
          width: isOpen ? `${WIDTH_SIDEBAR}px` : "0",
          transition: "width .35s cubic-bezier(.22, 1, .36, 1)",
        }}
      />
    </div>
  );
};

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
