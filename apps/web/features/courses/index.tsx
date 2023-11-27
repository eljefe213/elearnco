"use client";
import { LayoutGridUI } from "ui";
import CourseFilters from "./components/filters";
import CoursesQuery from "./components/query";
import Pagination from "./components/pagination";


const FeatureCourses = () => {
  return (
    <div className="p-5">
      <CourseFilters />
      <LayoutGridUI classnames="pt-5 pb-5">
      <CoursesQuery />
      <Pagination />
      </LayoutGridUI>
    </div>
  );
};
export default FeatureCourses;
