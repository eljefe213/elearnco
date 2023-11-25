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
import React from "react";
import {
  CourseMode,
  CourseStatus,
  CourseType,
  EActionsCourse,
  EActionsCourseInDrop,
  EActionsCourseInFooterCard,
  TotalCourse,
} from "schemas";

import { IconUI } from "../icon/IconUI";

type ActionHandler = {
  actionHandler(action: string): void;
};
export const CardContentUI = (
  props: TotalCourse & ActionHandler & { banner: string }
) => {
  const {
    actionHandler,
    banner,
    title,
    description,
    mode,
    status,
    type,
    updatedAt,
    author,
  } = props;

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
        className="py-0"
        style={{ width: 300, height: 350 }}
      >
        <CardBody className="p-0">
          <Image
            alt="Course image"
            className="object-cover h-[120px]"
            src={`${banner}?x=200&y=200&mode=fill`}
            width="100%"
            radius="none"
            style={{ height: "120px" }}
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
