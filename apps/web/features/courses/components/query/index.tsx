import { useCoursesParams } from "customhooks";
import { useEffect, useRef } from "react";
import { CourseDate, CourseStatus, CourseTitle } from "schemas/menus/dropdown";
import { useCoursesStore } from "store";


import CourseAdd from "../add";
import CourseLoading from "../loading";
import CoursesCollectionList from "../list";


const CoursesQuery = () => {
  const { courses, isLoading, error, fetchData } = useCoursesStore();
  const {
    getCurrentPage,
    getCurrentStatus,
    getCurrentFolder,
    getCurrentDate,
    getCurrentOrder,
  } = useCoursesParams();

  const isMonted = useRef<boolean>(false);
  const currentPage = getCurrentPage();
  const currentStatus = getCurrentStatus();
  const currentFolder = getCurrentFolder();
  const currentDate = getCurrentDate();
  const currentOrder = getCurrentOrder();

  useEffect(() => {
    fetchData(
      currentPage,
      currentStatus as CourseStatus,
      currentOrder as CourseTitle,
      currentFolder,
      currentDate as CourseDate
    );
    isMonted.current = true;
  }, [currentPage, currentStatus, currentOrder, currentFolder, currentDate]);

  if (isLoading) return <CourseLoading />;
  if (error) return <>{error}</>;
  if (
    (courses && courses.length === 0 && isMonted.current) ||
    (!courses && isMonted.current)
  )
    return <CourseAdd />;

  return courses?.length > 0 ? (
    <>
      <CourseAdd />
      <CoursesCollectionList courses={courses} />
    </>
  ) : (
    <CourseLoading />
  );
};


export default CoursesQuery;
