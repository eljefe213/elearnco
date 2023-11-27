"use client";

import { checkHttps } from "lib/utils";
import { useRouter } from "next13-progressbar";
import React, { useCallback } from "react";
import { EActionsCourseInFooterCard, ERoutes, TotalCourse } from "schemas";

import { useGlobalModalStore } from "../../store";
import { CardContentUI } from "./CardContentUI";

//TODO: USE UI DROPDOWN !!
export const CardUI = (props: TotalCourse) => {
  const { image, title = "Title", id = "id" } = props;

  const router = useRouter();
  const modalStore = useGlobalModalStore();

  const actionHandler = useCallback((action: string): void => {
    if (action === (EActionsCourseInFooterCard.EDIT as string)) {
      router.push(`/${ERoutes.EDITOR}/${id}?page=${1}`);
      return;
    }
    if (action === (EActionsCourseInFooterCard.PREVIEW as string)) {
      router.push(`/${ERoutes.PREVIEW} /${id}?page=${1}`);
      return;
    }

    modalStore.onOpen(action, { id: id, title: title, action: action });
  }, []);

  const BANNER_COURSE = checkHttps(image) ? image : `/patterns/${image}.svg`;

  return (
    <CardContentUI
      banner={BANNER_COURSE}
      actionHandler={actionHandler}
      {...props}
    />
  );
};
