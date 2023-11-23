import { useCoursesParams } from "customhooks";
import { useEffect, useRef } from "react";
import { useCourseStore } from "store";
import { LayoutEditorUI, LoadingSpinnerUI } from "ui";

interface IProps {
  setBlock?: () => void;
  courseID: string;
}

export const CourseQueryGeneric = (props: IProps) => {
  const { courseID } = props;
  const { getCurrentPage } = useCoursesParams();
  const { course, isLoading, error, fetchData } = useCourseStore();
  const page = getCurrentPage();
  const isMonted = useRef<boolean>(false);

  useEffect(() => {
    fetchData(page, courseID);
    isMonted.current = true;
  }, [page]);

  if (isLoading) return <LoadingSpinnerUI />;

  if (error) return <p>{JSON.stringify(error)}</p>;
  if (course && isMonted.current) return <LayoutEditorUI />;
};

export const CourseQueryWithCollaboration = ({
  courseID,
}: {
  courseID: string;
}) => {
  //const { doc } = useCollaboration();
  //const [block, setBlock] = useYMapItem<any[]>(doc?.getMap("page"), "block");

  return <CourseQueryGeneric courseID={courseID} />;
};
