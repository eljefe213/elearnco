"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Image,
  Input,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { useUser } from "lib/providers/auth.provider";
import { createCourseFromApi } from "lib/requests/course/course";
import { patternsObjects } from "lib/utils";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CourseMode, CourseStatus, CourseType } from "schemas";
import { newCourseSchema, TFolder, TotalCourse } from "schemas/courses";
import { useCoursesStore, useFoldersStore } from "store";
import * as z from "zod";

import { SelectUI } from "../../select/SelecUI";


const DynamicAddFolderUI = dynamic(() => import("./AddFolderFormUI"), {
  loading: () => <Spinner />,
});

interface IProps {
  title: string;
  description: string;
  folder: TFolder[];
  id?: string;
  onClose: () => void;
  switchView: () => void;
}

//We need data folder if exist else default folder name is default
type FormData = z.infer<typeof newCourseSchema>;

export const AddCourseUI = (props: IProps) => {
  const user = useUser();
  const { id, onClose, switchView } = props;
  const [selected, setSelected] = React.useState<string>(CourseType.CLASSIC);
  const [banner, setBanner] = useState<string>("default");
  const folders = useFoldersStore((state) => state.folders);
  const courses = useCoursesStore();
  const folderIdRef = useRef<string>(folders?.[0]?.id || "");
  const imageIdRef = useRef<string>("");

  const isInvalid = false;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(newCourseSchema),
  });

  const changeHandlerFolders = (value: string): void => {
    folderIdRef.current = value;
  };
  const changeHandlerBanner = (value: string): void => {
    const _banner = patternsObjects.filter((pattern) => pattern.id === value);
    if (_banner.length) {
      imageIdRef.current = value;
      setBanner(_banner[0].name);
    }
  };

  const onSubmit = async (data: FormData): Promise<void> => {
    const image_name = patternsObjects.filter(
      (pattern) => pattern.id === imageIdRef.current
    );

    const newCourse = await createCourseFromApi({
      ...data,
      userId: user.id,
      folderId: folderIdRef.current,
      status: CourseStatus.DRAFT,
      type: selected,
      mode: CourseMode.PRIVATE,
      image: image_name?.[0]?.name || "Aare",
      authorId: "cln4kv8xl000j0989p42rcs3i",
    });
    
    courses.addCourse(newCourse as TotalCourse);
    onClose();
  };

  return folders?.length === 0 ? (
    <>
      <p>
        You have no folder. Before creating a course, create a defaut folder
        name.
      </p>
      <DynamicAddFolderUI formId={id as string} />
    </>
  ) : (
    <>
      <div
        style={{ width: "100%", height: "80px" }}
        className="flex justify-start items-center"
      >
        <div className="absolute z-20 p-2">
          <SelectUI
            data={patternsObjects}
            label=""
            placeholder="Default"
            labelPlacement="inside"
            onChange={changeHandlerBanner}
            variant="flat"
            hasAvatar
            selectedKey=""
          />
        </div>
        <Image
          removeWrapper
          alt=""
          className="z-0 w-full h-full object-cover"
          src={`/patterns/${banner}.svg`}
        />
      </div>
      <form
        noValidate
        id={id}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              isRequired
              label="Title"
              id="title"
              aria-label="title"
              placeholder="Enter your title"
              type="text"
              description="Enter your title"
              autoCorrect="off"
              color={errors?.title ? "danger" : "default"}
              autoCapitalize="none"
              errorMessage={
                errors?.title ? (errors.title.message as unknown as string) : ""
              }
              {...field}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Textarea
              isRequired
              label="Description"
              id="description"
              aria-label="description"
              placeholder="Enter your description"
              type="text"
              description="Enter your description"
              autoCorrect="off"
              color={errors?.description ? "danger" : "default"}
              autoCapitalize="none"
              errorMessage={
                errors?.description
                  ? (errors.description.message as unknown as string)
                  : ""
              }
              {...field}
            />
          )}
        />
       {/*  <RadioGroup
          defaultValue="author"
          label="Select the course type"
          orientation="vertical"
          onValueChange={setSelected}
          value={selected}
          isInvalid={isInvalid}
        >
          <div className="flex gap-2 items-center">
            <Radio  value={CourseType.CLASSIC}>You are the author</Radio>
            <Popover placement="top" color="primary" showArrow backdrop="blur">
              <PopoverTrigger>
                <div
                  style={{ width: "1rem", height: "1rem", fontSize: "0.75rem" }}
                  className="flex items-center justify-center bg-primary rounded-full select-none cursor-pointer"
                >
                  i
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <div className="text-small font-bold">You are the author</div>
                <div className="text-tiny">
                  You are the author and you can share your learning with others
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-2 items-center">
            <Radio  value={CourseType.WORK}>Learner is the author</Radio>
            <Popover placement="top" color="primary" showArrow backdrop="blur">
              <PopoverTrigger>
                <div
                  style={{ width: "1rem", height: "1rem", fontSize: "0.75rem" }}
                  className="flex items-center justify-center bg-primary rounded-full select-none cursor-pointer"
                >
                  i
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <div className="text-small font-bold">
                  Learner is the author
                </div>
                <div className="text-tiny">
                  You are the author and you can share your learning with others
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-2 items-center">
            <Radio  value={CourseType.LIVE}>Learners are the authors</Radio>
            <Popover
              style={{ width: "240px" }}
              placement="top"
              color="primary"
              showArrow
              backdrop="blur"
            >
              <PopoverTrigger>
                <div
                  style={{ width: "1rem", height: "1rem", fontSize: "0.75rem" }}
                  className="flex items-center justify-center bg-primary rounded-full select-none cursor-pointer"
                >
                  i
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <div className="text-small font-bold">
                  Learners are the authors
                </div>
                <div className="text-tiny">Learners are the authors...</div>
              </PopoverContent>
            </Popover>
          </div>
        </RadioGroup> */}

        <SelectUI
          data={folders}
          label="Select your folder"
          placeholder="Default"
          labelPlacement="inside"
          onChange={changeHandlerFolders}
          variant="flat"
          selectedKey={folders?.[0].id}
        />
      </form>
      <Button size="sm" className="cursor-pointer" onClick={switchView}>
        Add folder
      </Button>
    </>
  );
};
export default AddCourseUI;
