/** MEDIA */
export enum EActionsMedia {
  PREVIEW = "Preview",
  ADD_FROM_USER = "Add from user",
  ADD_FROM_SERVICE = "Add from service",
  ADD_FROM_LIBRARY = "Add from library",
  DELETE = "Delete",
  UPDATE_IMAGE_BANNER = "Update image banner",
  FILL_IMAGE = "Fill image",
  FIT_IMAGE = "Fit image",
  UPATE_POSITION = "Updating position",
  EDIT = "Edit",
}

export enum EActionskeysMedia {
  EDIT = "",
  PREVIEW = "",
  ADD_FROM_USER = "",
  ADD_FROM_SERVICE = "",
  ADD_FROM_LIBRARY = "",
  DELETE = "",
}
/** COURSE */
const EActionsCommunCourse = {
  EDIT: "Edit",
  PREVIEW: "Preview",
  SHARE: "Share",
} as const;

export const EActionsCourse = {
  ...EActionsCommunCourse,
  ADD: "Add",
  UNARCHIVE: "Unarchive",
} as const;

export const EActionsCourseInFooterCard = {
  ...EActionsCommunCourse,
} as const;

export const EActionsMenuShortcuts={
  FEATURES : "Features",
  TIPS : "Tips",
} as const


export enum EActionskeysCourse {
  EDIT = "ctrl+E",
  PREVIEW = "ctrl+P",
  SHARE = "ctrl+S",
  ADD = "ctrl+A",
  DELETE = "ctrl+D",
}
export enum EActionsCourseInDrop {
  DUPLICATE = "Duplicate course",
  ARCHIVE = "Archive course",
  DELETE = "Delete course",
}

export enum EActionsFolder {
  ADD = "Add folder",
  RENAME = "Rename folder",
}

/** USER */
export enum EActionsUser {
  EDIT_PROFIL = "Edit profil",
  HELP = "Help",
  DELETE = "Delete",
  LOGOUT = "Log out",
  SETTINGS = "Settings",
}
export enum EActionskeysUser {
  EDIT_PROFIL = "ctrl+P",
  HELP = "ctrl+H",
  DELETE = "",
  LOGOUT = "ctrl+D",
  SETTINGS = "ctrl+S",
}

/** PAGE */
export enum EActionsPage {
  PREVIEW = "Preview page",
  VALIDATE= "Validate page",
  DELETE = "Delete page",
  DUPLICATE = "Duplicate page",
  REORDER="Reorder pages",
}
export enum EActionskeysPage {
  DELETE = "E+P",
  DUPLICATE = "D+P",
}

/** BLOCK */
export const EActionsBloc = {
  DELETE: "Delete block",
  DUPLICATE: "Duplicate block",
  MOVEUP: "Move up",
  MOVEDOWN: "Move down"
 
} as const;
export enum EActionskeysBloc {
  DELETE = "E+B",
  DUPLICATE = "D+B",
  MOVEUP = "M+U",
  MOVEDOWN = "M+D",

}
