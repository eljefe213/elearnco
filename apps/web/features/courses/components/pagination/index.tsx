import { MAX_CARDS } from "@/const";
import useCoursesParams from "customhooks/use-courses-params";
import { useCoursesStore } from "store/courses/useCoursesStore";
import { PaginationUI } from "ui/pagination/PaginationUI";

const Pagination = () => {
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

export default Pagination;
