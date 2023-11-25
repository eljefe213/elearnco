"use client";
import dynamic from "next/dynamic";
import React, { useCallback } from "react";
import {
  EActionsCourse,
  EActionsCourseInDrop,
  EActionsMedia,
  EActionsMenuShortcuts,
  EActionsPage,
  EActionsUser,
} from "schemas";
import { useGlobalModalStore } from "store";
import { LoadingSpinnerUI, ModalFooterUI } from "ui";
import { Ebackdrop, EPlacement, GlobalModalUI } from "ui/modals/GlobalModalUI";

const DynamicProfil = dynamic(() => import("ui/forms/auth/ProfilUI"), {
  loading: () => <LoadingSpinnerUI />,
});

const DynamicTips = dynamic(() => import("./tips"), {
  loading: () => <LoadingSpinnerUI />,
});

const DynamicHelp = dynamic(() => import("ui/help/HelpUI"), {
  loading: () => <LoadingSpinnerUI />,
});

const DynamicShareWith = dynamic(() => import("../features/share"), {
  loading: () => <LoadingSpinnerUI />,
});

const DynamicAddCourse = dynamic(() => import("ui/forms/course/AddCourseUI"), {
  loading: () => <LoadingSpinnerUI />,
});

const DynamicArchive = dynamic(() => import("ui/course/CourseActionsUI"), {
  loading: () => <LoadingSpinnerUI />,
});

const DynamicSettings = dynamic(() => import("ui/settings/SettingsUI"), {
  loading: () => <LoadingSpinnerUI />,
});

//
const DynamicMediaFomService = dynamic(
  () => import("ui/media/fromservice/LibraryUI"),
  {
    loading: () => <LoadingSpinnerUI />,
  }
);
export const ParentModalUI = () => {
  const { isOpen, onClose, action, data } = useGlobalModalStore();

  const getBody = useCallback((): JSX.Element => {
    // USER
    if (action === (EActionsUser.EDIT_PROFIL as string)) {
      return <DynamicProfil action={EActionsUser.EDIT_PROFIL} />;
    }

    // COURSE
    if (action === (EActionsCourse.SHARE as string)) {
      return <DynamicShareWith />;
    }
    if (action === (EActionsCourse.ADD as string)) {
      return (
        <DynamicAddCourse
          id={EActionsCourse.ADD}
          onClose={onClose}
          title=""
          description=""
          folder={[]}
        />
      );
    }

    if (
      action === (EActionsCourseInDrop.ARCHIVE as string) ||
      action === (EActionsCourseInDrop.DELETE as string) ||
      action === (EActionsCourseInDrop.DUPLICATE as string) ||
      action === (EActionsCourse.UNARCHIVE as string)
    ) {
      return <DynamicArchive onClose={onClose} {...data} />;
    }
    // TIPS
    if (action === EActionsMenuShortcuts.TIPS) {
      return <DynamicTips onClose={onClose} />;
    }
    // FEATURES
    if (action === EActionsMenuShortcuts.FEATURES) {
      return <>{action}</>;
    }
    // HELP
    if (action === (EActionsUser.HELP as string)) {
      return <DynamicHelp />;
    }
    //SETTGINS
    if (action === (EActionsUser.SETTINGS as string)) {
      return <DynamicSettings />;
    }
    // MEDIAS
    if (action === (EActionsMedia.ADD_FROM_SERVICE as string)) {
      return (
        <DynamicMediaFomService
          onClose={onClose}
          action={EActionsMedia.UPDATE_IMAGE_BANNER as string}
        />
      );
    }
    if (action === (EActionsMedia.ADD_FROM_LIBRARY as string)) {
      return <>{action}</>;
    }
    if (action === (EActionsMedia.ADD_FROM_USER as string)) {
      return <>{action}</>;
    }
    return <></>;
  }, [action, data, onClose]);

  const getFooter = useCallback((): JSX.Element | null => {
    if (action === EActionsMenuShortcuts.TIPS) {
      return null;
    }
    return <ModalFooterUI {...data} action={action} onClose={onClose} />;
  }, [action, data, onClose]);

  const getClassNames = useCallback((): string => {
    if (action === (EActionsMedia.ADD_FROM_SERVICE as string)) {
      return "py-0";
    }
    return "";
  }, [action]);

  const getSize = useCallback(() => {
    if (action === (EActionsMedia.ADD_FROM_SERVICE as string)) {
      return "2xl";
    }
    if (
      action === (EActionsPage.PREVIEW as string) ||
      action === (EActionsPage.REORDER as string)
    ) {
      return "full";
    }
    return "md";
  }, [action]);

  return (
    <GlobalModalUI
      isDismissable
      isOpen={isOpen}
      placement={EPlacement.AUTO}
      body={<>{getBody()}</>}
      footer={<>{getFooter()}</>}
      title={action}
      backdrop={Ebackdrop.BLUR}
      onOpenChange={onClose}
      size={getSize()}
      classNames={`no-scrollbar ${getClassNames()}`}
    />
  );
};
