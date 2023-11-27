import { CardUI } from "ui";

const CoursesCollectionList = ({ courses }) => {
  return courses?.map((course) => <CardUI key={course.id} {...course} />);
};

export default CoursesCollectionList;
