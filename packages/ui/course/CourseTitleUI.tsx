"use client";
import { useCourseStore } from "store";

export const CourseTitleUI = (): JSX.Element => {
  const { course } = useCourseStore();

  return <span className="select-none">{course.title}</span>;
};
