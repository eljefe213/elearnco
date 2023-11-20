"use client";
import { LayoutGridUI } from "ui";
import CourseFilters from "./components/courseFilters";
import CourseList from "./components/courseList";
import useLockedBody from "customhooks/use-locked-body";

const FeatureCourses = () => {
  const [_] = useLockedBody(true, "body");

  return (
    <div className="p-5">
      <CourseFilters />
      <LayoutGridUI classnames="pt-5 pb-5">
        <CourseList />
      </LayoutGridUI>
    </div>
  );
};
export default FeatureCourses;
