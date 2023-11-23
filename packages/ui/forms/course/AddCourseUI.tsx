"use client";
import React from "react";
import dynamic from "next/dynamic";
import {  Spinner } from "@nextui-org/react";
import { useEffect } from "react";
import { useState } from "react";
import { TFolder } from "schemas/courses";
import { useDisabledStore, useFoldersStore } from "store";

const DynamicAddFolderUI = dynamic(() => import("./AddFolderFormUI"), {
  loading: () => <Spinner />,
});

const DynamicAddCourseUI = dynamic(() => import("./AddCourseFormUI"), {
  loading: () => <Spinner />,
});

interface IProps {
  title: string;
  description: string;
  folder: TFolder[];
  id?: string;
  onClose: () => void;
}

export const AddCourseUI = (props: IProps) => {
  const { id} = props;
  const [addNewFolder, setNewFolder] = useState<boolean>(false);
  const folders = useFoldersStore((state) => state.folders);
  const { onStopDisabled } = useDisabledStore();
  

  const switchView = (): void => {
    setNewFolder((state) => !state);
  };

  useEffect(() => {
    onStopDisabled();
  }, []);

  return folders?.length === 0 || addNewFolder ? (
    <>
      {folders?.length === 0 ? (
        <>
          {folders?.length === 0 ? (
            <></>
          ) : (
            <span className="cursor-pointer text-tiny" onClick={switchView}>
              Retour
            </span>
          )}
          <p>
            You have no folder. Before creating a course, create a defaut folder
            name.
          </p>
        </>
      ) : (
        <>
          <span className="cursor-pointer text-tiny" onClick={switchView}>
            Back
          </span>
          <p>Enter you name folder.</p>
        </>
      )}
      <>
        <DynamicAddFolderUI formId={id as string} />
      </>
    </>
  ) : (
    <>
      <DynamicAddCourseUI {...props} switchView={switchView} />
    </>
  );
};
export default AddCourseUI;
