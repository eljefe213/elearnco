import { Button } from "@nextui-org/react";
import { Course } from "database";
import {
  createCourseFromApi,
  deleteCourseFromApi,
  getCourseFromApi,
  getCourseMoreRecentFromApi,
  getCoursesFromApi,
  pathApiCourse,
  pathApiCourses,
  updateCourseFromApi,
} from "lib";
import { useState } from "react";
import { CourseMode, CourseStatus, CourseType } from "schemas";

import { generateTitle, setBlock, setSchema } from "../components";
import { CLASSNAME_BLOCK } from "../const";



const CoursesApi = () => {
  // GET COURSES
  const [getParametersCourses, setParametersCourses] = useState<{
    userId: string;
  }>({
    userId: "cln4kv8xc000h0989bop6u7k8",
  });
  const [getResultCourses, setResultCourses] = useState<Course[] | null>(
    [] as Course[]
  );

  // GET A COURSE
  const [getParametersACourse, setParametersACourse] = useState<{
    id: string;
  }>({
    id: "",
  });
  const [getResultACourse, setResultACourse] = useState<Course | null>(
    {} as Course
  );

  const [getResultMoreRecentCourse, setMoreRecentCourse] =
    useState<Course | null>({} as Course);

  // CREATE COURSE
  const [getResultCourse, setResultCourse] = useState<Course | null>(
    {} as Course
  );
  const [getParametersCourse, setParametersCourse] = useState<
    Omit<Course, "id" | "updatedAt" | "createdAt">
  >({
    userId: getParametersCourses.userId,
    title: "",
    description: "",
    folderId: "",
    status: CourseStatus.DRAFT,
    type: CourseType.CLASSIC,
    mode: CourseMode.PRIVATE,
    image: "",
    authorId: "",
  });

  // UPDATE COURSE
  const [getResultUpdateCourse, setResultUpdateCourse] =
    useState<Course | null>({} as Course);
  const [getParametersUpdateCourse, setParametersUpdateCourse] = useState<
    Partial<Course>
  >({
    id: "",
    title: "",
    description: "",
    status: CourseStatus.DRAFT,
    type: CourseType.CLASSIC,
    mode: CourseMode.PRIVATE,
    image: "",
  });
  // DELETE COURSE
  const [getResultDeleteCourse, setResultDeleteCourse] =
    useState<Course | null>({} as Course);
  const [getParametersDeleteCourse, setParametersDeleteCourse] = useState<{
    id: string;
  }>({ id: "" });

  const _getCourses = async (): Promise<void> => {
    const courses = await getCoursesFromApi();
    if (courses) setResultCourses(courses);
  };
  const _getCourse = async (): Promise<void> => {
    const course = await getCourseFromApi(getParametersACourse.id);
    if (course) setResultACourse(course);
  };
  const _getCourseMoreRecent = async (): Promise<void> => {
    const course = await getCourseMoreRecentFromApi();
    if (course) setMoreRecentCourse(course);
  };
  const _createCourse = async (): Promise<void> => {
    const course = await createCourseFromApi(getParametersCourse);
    if (course) setResultCourse(course);
  };
  const _updateCourse = async (): Promise<void> => {
    const course = await updateCourseFromApi(getParametersUpdateCourse);
    if (course) setResultUpdateCourse(course);
  };

  const _deleteCourse = async (): Promise<void> => {
    const course = await deleteCourseFromApi(getParametersDeleteCourse.id);
    if (course) setResultDeleteCourse(course);
  };

  return (
    <>
      {/* GET COURSES */}
      {generateTitle("GET", "Return all user courses", pathApiCourses)}
      
      <div className={CLASSNAME_BLOCK}>
       {/*  {setBlock("Model", getParametersCourses, Course)} */}
        {setSchema("FormData", getParametersCourses, setParametersCourses)}
        {setBlock("Parameters", getParametersCourses)}
        {setBlock("Result", getResultCourses)}

        <Button onClick={_getCourses}>Get courses</Button>
      </div>
      {/* GET A COURSE */}
      {generateTitle("GET", "Return a course", `${pathApiCourse}/{id}`)}
      <div className={CLASSNAME_BLOCK}>
        {setSchema("Schema", getParametersACourse, setParametersACourse)}
        {setBlock("Parameters", getParametersACourse)}
        {setBlock("Result", getResultACourse)}
        <Button onClick={_getCourse}>Get course</Button>
      </div>
      {/* GET A COURSE MORE RECENT */}
      {generateTitle(
        "GET",
        "Return the more recent course",
        `${pathApiCourses}/latest`
      )}
      <div className={CLASSNAME_BLOCK}>
        {setSchema("Schema", getParametersCourses, setParametersCourses)}
        {setBlock("Parameters", getParametersCourses)}
        {setBlock("Result", getResultMoreRecentCourse)}
        <Button onClick={_getCourseMoreRecent}>Get recent course</Button>
      </div>
      {/* CREATE A COURSE */}
      {generateTitle("POST", "Create a course", pathApiCourses)}
      <div className={CLASSNAME_BLOCK}>
        {setSchema("Schema", getParametersCourse, setParametersCourse)}
        {setBlock("Parameters", getParametersCourse)}
        {setBlock("Result", getResultCourse)}

        <Button onClick={_createCourse}>Add course</Button>
      </div>
      {/* UPDATE A COURSE */}
      {generateTitle("PATCH", "Update a course", `${pathApiCourse}/{id}`)}
      <div className={CLASSNAME_BLOCK}>
        {setSchema(
          "Schema",
          getParametersUpdateCourse,
          setParametersUpdateCourse
        )}
        {setBlock("Parameters", getParametersUpdateCourse)}
        {setBlock("Result", getResultUpdateCourse)}
        <Button onClick={_updateCourse}>Update course</Button>
      </div>
      {/* DELETE A COURSE */}
      {generateTitle("DELETE", "Delete a course", `${pathApiCourse}/{id}`)}
      <div className={CLASSNAME_BLOCK}>
        {setSchema(
          "Schema",
          getParametersDeleteCourse,
          setParametersDeleteCourse
        )}
        {setBlock("Parameters", getParametersDeleteCourse)}
        {setBlock("Result", getResultDeleteCourse)}
        <Button onClick={_deleteCourse}>Delete course</Button>
      </div>
    </>
  );
};

export default CoursesApi;
