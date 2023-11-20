"use client";
import { Card, CardBody, Image } from "@nextui-org/react";
import React, { useCallback } from "react";
import { EActionskeysCourse } from "schemas";

import HotkeysUI from "../hotkeys/HotkeysUI";

interface IProps {
  clickHandler?: () => void;
}

export const AddCardUI = (props: IProps): JSX.Element => {
  const { clickHandler } = props;

  const actionHandler = useCallback(() => {
    clickHandler?.();
  }, []);

  return (
    <>
      <Card className="py-0 w-[300px] h-[350px] cursor-pointer">
        <CardBody className="p-0">
          <Image
            removeWrapper
            alt=""
            className="z-0 w-full h-full object-cover"
            src="/patterns/Mohaka.svg"
          />
          <div
            onClick={actionHandler}
            className="flex items-center justify-center w-full h-full absolute"
          >
            <div
              style={{ width: "9rem", height: "9rem" }}
              className="flex items-center justify-center w-36 h-36 bg-default-50 rounded-full"
            >
              <p className="uppercase font-bold select-none text-large text-center">
                Add new
                <br />
                course
                <br />
                <HotkeysUI collectionKeys={EActionskeysCourse.ADD} />
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
