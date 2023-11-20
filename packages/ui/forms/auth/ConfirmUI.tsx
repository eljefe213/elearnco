"use client";
import { Card, CardBody, Spacer } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React, { useCallback } from "react";

import { AuthValidationFormData, ValidateUI } from "./ValidateUI";
import { LogoSymbolUI } from "../../logo/LogoSymbolUI";
interface IProps {
  children?: React.ReactNode | null;
  authValidate?: (data: AuthValidationFormData) => void;
  className?: string;
}

export const ConfirmUI = (props: IProps): JSX.Element => {
  const { className, authValidate } = props;
  const t = useTranslations("auth");
  const getSmiley = useCallback((): JSX.Element => {
    return <>🥳 </>;
  }, []);
  const TITLE = t("validation.message");
  const INFO = t("validation.info");

  return (
    <div className={`flex flex-col ${className}`}>
      <Card className="h-full w-full items-center">
        <CardBody className="overflow-hidden w-full justify-center">
          <div className="w-full flex justify-center">
            <LogoSymbolUI width={80} height={80} />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight py-4 text-center">
            {getSmiley()} {TITLE}
          </h1>
          <p className="text-center">{INFO}</p>
          <Spacer y={4} />
          <ValidateUI authValidate={authValidate} />
        </CardBody>
      </Card>
    </div>
  );
};
