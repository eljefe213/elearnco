import { useCoursesParams, useHotkeys } from "customhooks";
import { useCallback } from "react";
import React from "react";
import { CourseStatus } from "schemas";
import { EActionsCourse, EActionskeysCourse } from "schemas/actions";
import { useGlobalModalStore } from "store";
import { AddCardUI } from "ui";

const CourseAdd = () => {
  const modalStore = useGlobalModalStore();
  const { getCurrentStatus } = useCoursesParams();
  useHotkeys([[EActionskeysCourse.ADD, (): void => openModal()]]);

  const STATUS = getCurrentStatus();

  const openModal = useCallback(
    () => modalStore.onOpen(EActionsCourse.ADD),
    []
  );

  return STATUS === (CourseStatus.ARCHIVED as string) ? (
    <p>Nothing</p>
  ) : (
    <AddCardUI clickHandler={openModal} />
  );
};

export default React.memo(CourseAdd);
