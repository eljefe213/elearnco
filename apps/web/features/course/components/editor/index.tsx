import { BlockCardSectionsUI, DrawerUI, WorkspaceDndProvider } from "ui";
import {
  CourseQueryGeneric,
  CourseQueryWithCollaboration,
} from "../query/courseQueryGeneric";

import { PARENT_CSS, WIDTH_SIDEBAR } from "@/const";
import { useState } from "react";
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


  export default CourseCore