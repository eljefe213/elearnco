"use client";
import { Tabs, Tab, Spinner } from "@nextui-org/react";
import dynamic from "next/dynamic";
import "react-json-editor-ui/dist/react-json-editor-ui.cjs.development.css";

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

const CustomSwager = () => {
  return (
    <div className="bg-white p-4 min-h-screen">
      <Tabs aria-label="Api">
        <Tab key="User" title="User">
          <DynamicUsers />
        </Tab>
        <Tab key="Courses" title="Courses">
          <DynamicCourses />
        </Tab>
        <Tab key="Pages" title="Pages"></Tab>
        <Tab key="Blocks" title="Blocks"></Tab>
        <Tab key="Folders" title="Folders">
          <DynamicFolders />
        </Tab>
        <Tab key="Images" title="Images"></Tab>
      </Tabs>
    </div>
  );
};

export default CustomSwager;
