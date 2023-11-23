"use client";
import useLockedBody from "customhooks/use-locked-body";
import CourseEditor from "./components/course";

const FeatureCourseEditor = () => {
  const [_] = useLockedBody(true, "body");
  return <CourseEditor />;
};

export default FeatureCourseEditor;
