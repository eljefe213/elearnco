import { useCoursesParams } from "customhooks";
import { useEffect, useRef } from "react";
import { CourseDate, CourseStatus, CourseTitle } from "schemas/menus/dropdown";
import { useCoursesStore } from "store";
import { PaginationUI } from "ui";
import { CardUI } from "ui/card/CardUI";

import { MAX_CARDS } from "@/const";

import CourseAdd from "./courseAdd";
import CourseLoading from "./courseLoading";

const Paginate = () => {
  const { totalCourses } = useCoursesStore();
  const { getCurrentPage, setNewSearchParams } = useCoursesParams();
  const currentPage = getCurrentPage();
  const onChange = (page: number): void => {
    const newPage = page;
    setNewSearchParams(String(newPage));
  };

  return totalCourses > 0 &&
    currentPage > 0 &&
    currentPage < Math.ceil(totalCourses / MAX_CARDS) + 1 ? (
    <PaginationUI
      total={Math.ceil(totalCourses / MAX_CARDS)}
      activePage={currentPage}
      fixedInPosition="bottom"
      onChange={onChange}
    />
  ) : (
    <></>
  );
};

const CoursesQuery = () => {
  const { courses, isLoading, error, fetchData, totalCourses } =
    useCoursesStore();
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
      {[...courses]?.map((course) => (
        <CardUI
          key={course.id}
          title={course.title}
          status={course.status}
          description={course.description}
          folder={course.folder}
          author={course.author}
          id={course.id}
          image={course.image}
          userId={course.userId}
          type={course.type}
          updatedAt={course.updatedAt}
          createdAt={course.createdAt}
          authorId={course.authorId}
          mode={course.mode}
        />
      ))}
    </>
  ) : (
    <CourseLoading />
  );
};
const CoursesList = () => {
  return (
    <>
      <CoursesQuery />
      <Paginate />
    </>
  );
};

export default CoursesList;
