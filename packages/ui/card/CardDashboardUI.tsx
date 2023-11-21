import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
} from "@nextui-org/react";

interface IProps {
  headerChildren?: React.ReactNode;
  footerChildren?: React.ReactNode;
  bodyChildren?: React.ReactNode;
}
export const CardDashboardUI = (props: IProps) => {
  const {
    headerChildren = null,
    footerChildren = null,
    bodyChildren = null,
  } = props;

  return (
    <Card className="h-full" radius="lg">
      {headerChildren && (
        <CardHeader className="z-10 pb-0">{headerChildren}</CardHeader>
      )}

      {bodyChildren && <CardBody className="p-3">{bodyChildren}</CardBody>}
      {footerChildren && (
        <CardFooter className="absolute bg-black/20 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          {footerChildren}
        </CardFooter>
      )}
    </Card>
  );
};
