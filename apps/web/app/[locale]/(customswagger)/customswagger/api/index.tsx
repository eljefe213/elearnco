"use client";
import "react-json-editor-ui/dist/react-json-editor-ui.cjs.development.css";

import { Spinner, Tab, Tabs } from "@nextui-org/react";
import dynamic from "next/dynamic";

const DynamicFolders = dynamic(
  () => import("@/components/swaggerApi/folders"),
  {
    loading: () => <Spinner />,
  }
);

const DynamicCourses = dynamic(
  () => import("@/components/swaggerApi/courses"),
  {
    loading: () => <Spinner />,
  }
);
const DynamicUsers = dynamic(() => import("@/components/swaggerApi/users"), {
  loading: () => <Spinner />,
});

const CustomSwagger = () => {
  return (
    <div className="bg-white p-4 min-h-screen">
      <Tabs aria-label="Api">
        <Tab key="User" title="User">
          <DynamicUsers />
        </Tab>
        <Tab key="Courses" title="Courses">
          <DynamicCourses />
        </Tab>
        <Tab key="Pages" title="Pages" />
        <Tab key="Blocks" title="Blocks" />
        <Tab key="Folders" title="Folders">
          <DynamicFolders />
        </Tab>
        <Tab key="Images" title="Images" />
      </Tabs>
    </div>
  );
};

export default CustomSwagger;
