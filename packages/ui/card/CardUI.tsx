"use client";

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next13-progressbar";
import React, { useCallback } from "react";
import {
  CourseMode,
  CourseStatus,
  CourseType,
  EActionsCourse,
  EActionsCourseInDrop,
  EActionsCourseInFooterCard,
  ERoutes,
  TotalCourse,
} from "schemas";

import { useGlobalModalStore } from "../../store";
import { IconUI } from "../icon/IconUI";
import { checkHttps } from "lib/utils";

//TODO: USE UI DROPDOWN !!
export const CardUI = (props: TotalCourse): JSX.Element => {
  const {
    image,
    title = "Title",
    description = "Description",
    status,
    id = "id",
    author,
    updatedAt,
    mode,
    type,
  } = props;

  const router = useRouter();
  const modalStore = useGlobalModalStore();

  const actionHandler = useCallback((action) => {
    if (action === EActionsCourseInFooterCard.EDIT) {
      router.push(`/${ERoutes.EDITOR}/${id}?page=${1}`);
      return;
    }
    if (action === EActionsCourseInFooterCard.PREVIEW) {
      router.push(`/${ERoutes.PREVIEW} /${id}?page=${1}`);
      return;
    }

    modalStore.onOpen(action, { id: id, title: title, action: action });
  }, []);

  const BANNER_COURSE = checkHttps(image) ? image : `/patterns/${image}.svg`;

  return (
    <div className="relative flex justify-center items-center">
      {status === CourseStatus.ARCHIVED ? (
        <div className="absolute z-20">
          <Button
            onClick={(): void => actionHandler(EActionsCourse.UNARCHIVE)}
            color="default"
            variant="solid"
          >
            Unarchive
          </Button>
        </div>
      ) : (
        <></>
      )}
      <Card
        isDisabled={status === CourseStatus.ARCHIVED}
        className="py-0 w-[300px] h-[350px]"
      >
        <CardBody className="p-0">
          <Image
            alt="Course image"
            className="object-cover h-[120px]"
            src={`${BANNER_COURSE}?x=200&y=200&mode=fill`}
            width="100%"
            radius="none"
          />
          <div className="pt-4 px-4 flex-col items-start">
            <h4 className="font-bold text-large line-clamp-1">{title}</h4>
            <p className="pt-2 text-tiny uppercase font-bold line-clamp-2">
              {description}
            </p>

            <div className="flex py-4 gap-2 flex-wrap">
              <Chip
                size="sm"
                variant="flat"
                color={
                  status === CourseStatus.ACTIVE
                    ? "success"
                    : status === CourseStatus.ARCHIVED
                    ? "default"
                    : "warning"
                }
              >
                {status}
              </Chip>
              <Chip
                size="sm"
                variant="flat"
                color={mode === CourseMode.PRIVATE ? "danger" : "secondary"}
              >
                {mode}
              </Chip>
              <Chip
                size="sm"
                variant="flat"
                color={
                  type === CourseType.LIVE
                    ? "success"
                    : type === CourseType.CLASSIC
                    ? "primary"
                    : "default"
                }
              >
                {type?.toUpperCase() || "Status"}
              </Chip>
            </div>
            <div className="flex justify-end  w-full ">
              <small className="text-default-500">
                {new Date(updatedAt).toLocaleDateString()}
              </small>
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="text-small justify-between">
          <div className="flex gap-2 items-center">
            {Object.values(EActionsCourseInFooterCard).map((action) => (
              <Tooltip key={action} color="foreground" content={action}>
                <Button
                  size="sm"
                  radius="full"
                  isIconOnly
                  color="default"
                  aria-label={action}
                  onClick={(): void => actionHandler(action)}
                >
                  <IconUI name={action.toLowerCase()} width={20} height={20} />
                </Button>
              </Tooltip>
            ))}

            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  size="sm"
                  radius="full"
                  isIconOnly
                  color="default"
                  aria-label=""
                >
                  <IconUI name="more" width={20} height={20} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                {Object.values(EActionsCourseInDrop).map((action) => (
                  <DropdownItem
                    startContent={
                      <IconUI
                        name={action.toLowerCase()}
                        width={20}
                        height={20}
                      />
                    }
                    onClick={(): void => actionHandler(action)}
                    key={action}
                  >
                    {action}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="flex gap-4 items-center" />

          <Tooltip color="foreground" content={author?.name}>
            <Avatar
              size="sm"
              fallback={
                <IconUI
                  name={author?.name ? author.name : "E"}
                  width={20}
                  height={20}
                />
              }
              isBordered
              src={`/avatars/${author?.image}.svg`}
            />
          </Tooltip>
        </CardFooter>
      </Card>
    </div>
  );
};
