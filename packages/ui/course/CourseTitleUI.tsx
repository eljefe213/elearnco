"use client";
import React from "react";
import { useCourseStore } from "store";

export const CourseTitleUI = () => {
  const { course } = useCourseStore();

  return <span className="select-none">{course.title}</span>;
};
