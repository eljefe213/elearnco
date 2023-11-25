"use client";
import { Card, CardBody, Spacer, Tab, Tabs } from "@nextui-org/react";
import { useLockedBody } from "customhooks";
import { useTranslations } from "next-intl";
import React, { useCallback } from "react";
import { userAuthSigninSchema, userAuthSignupSchema } from "schemas/auth/Auth";
import { LogoSymbolUI } from "ui/logo/LogoSymbolUI";
import * as z from "zod";

import { SigninUI } from "./SigninUI";
import { SignupUI } from "./SignupUI";


type UserAuthSigninSchema = z.infer<typeof userAuthSigninSchema>;
type UserAuthSignupSchema = z.infer<typeof userAuthSignupSchema>;
interface IProps {
  children?: React.ReactNode | null;
  authSignup?: (data: UserAuthSignupSchema) => void;
  authSignin?: (data: UserAuthSigninSchema) => void;
  authForgetPassword?:() => void;
  className?: string;
}

export const AuthUI = (props: IProps): JSX.Element => {
  const [_] = useLockedBody(true, "body");
  const { authSignup, authSignin,authForgetPassword, className } = props;
  const [selected, setSelected] = React.useState<React.Key>("login");
  const t = useTranslations("auth");

  const _selected = (key: React.Key): void => setSelected(key);

  const getSmiley = useCallback((): JSX.Element => {
    if (selected === "login") return <>👋 </>;
    return <>🥳 </>;
  }, [selected]);

  const TITLE = selected === "login" ? t("signin.title") : t("signup.title");

  return (
    <div className={`flex flex-col ${className}`}>
      <Card radius='none' className="h-full w-full items-center rounded-none sm:rounded-s-3xl">
        <CardBody className="overflow-hidden w-full max-w-2xl">
          <div className="w-full flex justify-center">
            <LogoSymbolUI width={80} height={80} />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight py-4 text-center">
            {getSmiley()}
            {TITLE}
          </h1>
          <Spacer y={4} />
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={(key: React.Key): void => _selected(key)}
          >
            <Tab key="login" title="Sign in">
             <Spacer y={4} />
              <SigninUI authForgetPassword={authForgetPassword} authSignin={authSignin} switchVue={_selected} />
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <Spacer y={4} />
              <SignupUI authSignup={authSignup} switchVue={_selected} />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default AuthUI;
