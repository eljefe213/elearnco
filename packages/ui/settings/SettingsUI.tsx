"use client";
import { Spacer } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

import { DarkModeUI } from "../darkmode/DarkModeUI";
import { LangUI } from "../lang/LangUI";

export const SettingsUI = () => {
  const t = useTranslations("settings");

  return (
    <>
      <p>{t("message")}</p>
      <LangUI />
      <Spacer y={2} />
      <p>Mode dark ou light ?</p>
      <DarkModeUI />
    </>
  );
};

export default SettingsUI;
