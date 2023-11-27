"use client";
import useLockedBody from "customhooks/use-locked-body";
import CourseEditor from "./components/courseEditor";

//TODO - We can not use this hook with the wrapper ; so check it and delete the hook if really not needed
const FeatureCourseEditor = () => {
  const [_] = useLockedBody(true, "body");
  return <CourseEditor />;
};

export default FeatureCourseEditor;
