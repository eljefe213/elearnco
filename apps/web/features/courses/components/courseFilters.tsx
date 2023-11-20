import { Input } from "@nextui-org/react";
import { useCoursesParams } from "customhooks";
import { getId } from "lib";
import { useCallback, useState } from "react";
import { SelectUI } from "ui";
import { IconUI } from "ui/icon/IconUI";

import { DATA_DATE, DATA_STATUS, DATA_TITLE } from "@/const";

import FolderFilter from "./folderFilter";

const CourseFilters = () => {
  const {
    currentPage,
    currentStatus,
    currentFolder,
    currentDate,
    currentOrder,
    setNewSearchParamsInCurrentPage,
  } = useCoursesParams();
  const [value, setValue] = useState<string>("");

  const updateSearchParams = useCallback(
    (
      newStatus: string | null,
      newFolder: string | null,
      newDate: string | null,
      newOrder: string | null
    ) => {
      const statusParam = newStatus !== null ? newStatus : "";
      const folderParam = newFolder !== null ? newFolder : "";
      const dateParam = newDate !== null ? newDate : "";
      const orderParam = newOrder !== null ? newOrder : "";
      setNewSearchParamsInCurrentPage(
        statusParam,
        folderParam,
        dateParam,
        orderParam
      );
    },
    [currentPage, currentStatus, currentFolder, currentDate, currentOrder]
  );

  const changeHandlerStatus = useCallback(
    (value: string) => {
      const course = DATA_STATUS.filter((item) => value === item.id);
      if (course.length > 0) {
        updateSearchParams(
          course[0].value,
          currentFolder,
          currentDate,
          currentOrder
        );
      }
    },
    [currentFolder, currentDate, currentOrder]
  );

  const changeHandlerFolder = useCallback(
    (value: string) => {
      updateSearchParams(currentStatus, value, currentDate, currentOrder);
    },
    [currentStatus, currentDate, currentOrder, value]
  );

  const changeHandlerOrder = useCallback(
    (value: string) => {
      const course = DATA_TITLE.filter((item) => value === item.id);
      if (course.length > 0) {
        updateSearchParams(
          currentStatus,
          currentFolder,
          currentDate,
          course[0].value
        );
      }
    },
    [currentStatus, currentFolder, currentDate]
  );

  const changeHandlerDate = useCallback((value: string) => {
    const course = DATA_DATE.filter((item) => value === item.id);
    if (course.length > 0) {
      updateSearchParams(
        currentStatus,
        currentFolder,
        course[0].value,
        currentOrder
      );
    }
  }, []);

  return (
    <div className="flex items-center justify-between w-full h-16 sticky top-0 z-50 backdrop-blur-sm">
      <div className="flex gap-2 items-center justify-start">
        <SelectUI
          data={DATA_STATUS}
          variant="flat"
          label="Filter by status"
          placeholder="Published courses"
          labelPlacement="inside"
          onChange={changeHandlerStatus}
          selectedKey={getId(DATA_STATUS, currentStatus)}
        />
        <FolderFilter
          currentFolder={currentFolder ? currentFolder : "Default"}
          onChange={changeHandlerFolder}
        />
        <SelectUI
          data={DATA_DATE}
          label="Filter by date"
          placeholder="Recently updated"
          labelPlacement="inside"
          onChange={changeHandlerDate}
          variant="flat"
          selectedKey={getId(DATA_DATE, currentDate)}
        />
        <SelectUI
          data={DATA_TITLE}
          label="Filter by title"
          placeholder="Title (A-Z)"
          labelPlacement="inside"
          variant="flat"
          onChange={changeHandlerOrder}
          selectedKey={getId(DATA_TITLE, currentOrder)}
        />
      </div>
      <div className="w-[240px] flex justify-center items-center bg-default-50 rounded-xl">
        <Input
          label="Search"
          isClearable
          radius="lg"
          value={value}
          variant="bordered"
          onValueChange={setValue}
          placeholder="Type to search a title lesson..."
          startContent={<IconUI width={20} height={20} name="search" />}
        />
      </div>
    </div>
  );
};

export default CourseFilters;
