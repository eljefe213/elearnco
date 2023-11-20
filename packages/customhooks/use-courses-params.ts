"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next13-progressbar";
import { CourseDate, CourseStatus, CourseTitle, ERoutes } from "schemas";
export function useCoursesParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentStatus = searchParams.get("status") || CourseStatus.ACTIVE;
  const currentFolder = searchParams.get("folder") || "Default";
  const currentDate = searchParams.get("date") || CourseDate.RECENT;
  const currentOrder = searchParams.get("order") || CourseTitle.AZ;

  const getCurrentStatus = (): string => currentStatus || CourseStatus.ACTIVE;
  const getCurrentFolder = (): string => currentFolder || "Default";
  const getCurrentDate = (): string => currentDate || CourseDate.RECENT;
  const getCurrentOrder = (): string => currentOrder || CourseTitle.AZ;
  const getCurrentPage = (): number => currentPage || 1;

  const setNewSearchParamsInCurrentPage = (
    statusParam: string,
    folderParam: string,
    dateParam: string,
    orderParam: string
  ) => {
    router.push(
      `/${ERoutes.COURSES}/?page=${currentPage}&status=${statusParam}&folder=${folderParam}&date=${dateParam}&order=${orderParam}`
    );
  };

  const setNewSearchParams = (pageParam: string) => {
    router.push(
      `/${
        ERoutes.COURSES
      }/?page=${pageParam}&status=${getCurrentStatus()}&folder=${getCurrentFolder()}&date=${getCurrentDate()}&order=${getCurrentOrder()}`
    );
  };

  return {
    currentPage,
    currentStatus,
    currentFolder,
    currentDate,
    currentOrder,
    setNewSearchParamsInCurrentPage,
    setNewSearchParams,
    getCurrentPage,
    getCurrentStatus,
    getCurrentFolder,
    getCurrentDate,
    getCurrentOrder,
  };
}

export default useCoursesParams;
