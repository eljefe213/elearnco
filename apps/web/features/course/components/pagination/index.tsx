import {
  PaginationGeneric,
  PaginationWithCollaboration,
} from "./navigateGeneric";
const CoursePagination = ({
  isCollaboration,
  id,
}: {
  isCollaboration: boolean;
  id: string;
}) => {
  return isCollaboration ? (
    <PaginationWithCollaboration
      isCollaboration={isCollaboration}
      courseID={id}
    />
  ) : (
    <PaginationGeneric isCollaboration={isCollaboration} courseID={id} />
  );
};

export default CoursePagination;
