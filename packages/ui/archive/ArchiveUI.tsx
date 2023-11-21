"use client";
import { Course,Folder } from "database";
import {
  createCourseFromApi,
  deleteCourseFromApi,
  updateCourseFromApi,
} from "lib";
import React, { FormEvent, useEffect } from "react";
import { CourseStatus, EActionsCourse, EActionsCourseInDrop } from "schemas";
import { useCoursesStore, useDisabledStore } from "store";

const MessageToArchiveCourse = ({
  title,
  id,
  action,
  onClose,
}: {
  title: string;
  id: string;
  action: string;
  onClose: () => void;
}) => {
  const courses = useCoursesStore();
  const { onStopDisabled, onBeginDisabled } = useDisabledStore();

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    await updateCourseFromApi({
      id: id,
      status: CourseStatus.ARCHIVED,
    });

    courses.updateCourse(id, { status: CourseStatus.ARCHIVED });
    onBeginDisabled();
    onClose();
  };

  useEffect(() => {
    onStopDisabled();
  }, []);

  return (
    <form noValidate id={action} onSubmit={onSubmit}>
      <p>You would like to archive this course :</p>
      <div>
        <p className="bg-default-100 p-2 rounded-small mb-2 mt-2">{title}</p>
      </div>
      <p>
        This content will no longer be accessible and you can unarchive it at
        any time to make it available.
      </p>
    </form>
  );
};

const MessageToUnArchiveCourse = ({
  title,
  id,
  action,
  onClose,
}: {
  title: string;
  id: string;
  action: string;
  onClose: () => void;
}) => {
  const courses = useCoursesStore();
  const { onStopDisabled, onBeginDisabled } = useDisabledStore();

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    await updateCourseFromApi({
      id: id,
      status: CourseStatus.DRAFT,
    });

    courses.updateCourse(id, { status: CourseStatus.DRAFT });
    onBeginDisabled();
    onClose();
  };

  useEffect(() => {
    onStopDisabled();
  }, []);

  return (
    <form noValidate id={action} onSubmit={onSubmit}>
      <p>You would like to unarchive this course :</p>
      <div>
        <p className="bg-default-100 p-2 rounded-small mb-2 mt-2">{title}</p>
      </div>
      <p>
        This content will no longer be accessible and you can unarchive it at
        any time to make it available.
      </p>
    </form>
  );
};

const MessageToDeleteCourse = ({
  title,
  id,
  action,
  onClose,
}: {
  title: string;
  id: string;
  action: string;
  onClose: () => void;
}) => {
  const courses = useCoursesStore();
  const { onStopDisabled, onBeginDisabled } = useDisabledStore();

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    await deleteCourseFromApi(id);
    courses.deleteCourse(id);
    onBeginDisabled();
    onClose();
  };

  useEffect(() => {
    onStopDisabled();
  }, []);

  return (
    <form noValidate id={action} onSubmit={onSubmit}>
      <p>You would like to delete this course :</p>
      <div>
        <p className="bg-default-100 p-2 rounded-small mb-2 mt-2">{title}</p>
      </div>
      <p>This content will no longer be accessible !</p>
    </form>
  );
};

const MessageToDuplicateCourse = ({
  title,
  id,
  action,
  onClose,
}: {
  title: string;
  id: string;
  action: string;
  onClose: () => void;
}) => {
  const courses = useCoursesStore();
  const { onStopDisabled, onBeginDisabled } = useDisabledStore();
  const _id = id;

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const data = courses.courses.find((c) => c.id === _id);
   // const { id, folder, updatedAt, createdAt, author, ...rest } = data as unknown as Course & Folder;
   // const newCourse = await createCourseFromApi(rest);
   // const { course } = newCourse as Course;
   // courses.addCourse(course);
    onBeginDisabled();
    onClose();
  };

  useEffect(() => {
    onStopDisabled();
  }, []);

  return (
    <form noValidate id={action} onSubmit={onSubmit}>
      <p>You would like to duplicate this course :</p>
      <div>
        <p className="bg-default-100 p-2 rounded-small mb-2 mt-2">{title}</p>
      </div>
      <p>
        This course will be duplicate in the same folder.
       
      </p>
    </form>
  );
};

const ArchiveUI = (course) => {
  const { title, id, action, onClose } = course;

  return action === EActionsCourse.UNARCHIVE ? (
    <MessageToUnArchiveCourse
      onClose={onClose}
      id={id}
      action={action}
      title={title}
    />
  ) : action === EActionsCourseInDrop.DELETE ? (
    <MessageToDeleteCourse
      onClose={onClose}
      id={id}
      action={action}
      title={title}
    />
  ) : action === EActionsCourseInDrop.DUPLICATE ? (
    <MessageToDuplicateCourse
      onClose={onClose}
      id={id}
      action={action}
      title={title}
    />
  ) : (
    <MessageToArchiveCourse
      onClose={onClose}
      id={id}
      action={action}
      title={title}
    />
  );
};

export default ArchiveUI;
