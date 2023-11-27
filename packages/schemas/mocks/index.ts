import {
  EActionsBloc,
  EActionsCourse,
  EActionsMedia,
  EActionsPage,
  EActionsUser,
  EActionskeysMedia,
  EActionskeysUser,
} from "../actions/enums";
import {EColor} from "../../schemas/global"
import { CourseDate, CourseStatus, CourseTitle } from "../menus";
import { ERoutes } from "../routes";

export const DATAS_MENU_MEDIA = [
  {
    id: "ab6c49c2-8273-11ee-b962-0242ac120002",
    label: EActionsMedia.ADD_FROM_USER,
    shortcut: {
      name: EActionskeysMedia.ADD_FROM_USER,
      action: EActionsMedia.ADD_FROM_USER,
    },
    description: "",
    icon: "imageupload",
    hastooltip: true,
    isdisabled: "false",
    isvisible: "true",
  },
  {
    id: "a6e2898e-8273-11ee-b962-0242ac120002",
    label: EActionsMedia.ADD_FROM_SERVICE,
    shortcut: {
      name: EActionskeysMedia.ADD_FROM_SERVICE,
      action: EActionsMedia.ADD_FROM_SERVICE,
    },
    description: "",
    icon: "imageservice",
    hastooltip: true,
    isdisabled: "false",
    isvisible: "true",
  },
  {
    id: "a2d61694-8273-11ee-b962-0242ac120002",
    label: EActionsMedia.ADD_FROM_LIBRARY,
    shortcut: {
      name: EActionskeysMedia.ADD_FROM_LIBRARY,
      action: EActionsMedia.ADD_FROM_LIBRARY,
    },
    description: "",
    icon: "imagelib",
    hastooltip: true,
    isdisabled: "false",
    isvisible: "true",
  },
];

export const DATAS_MENU_IMAGE = [
  {
    id: "8b34c0e4-8273-11ee-b962-0242ac120002",
    label: EActionsMedia.FILL_IMAGE,
    shortcut: {
      name: "",
      action: EActionsMedia.FILL_IMAGE,
    },
    description: "",
    icon: "resizemax",
    hastooltip: true,
    isdisabled: "false",
    isvisible: "true",
  },
  {
    id: "90dc0b88-8273-11ee-b962-0242ac120002",
    label: EActionsMedia.FIT_IMAGE,
    shortcut: {
      name: "",
      action: EActionsMedia.FIT_IMAGE,
    },
    description: "",
    icon: "resizemin",
    hastooltip: true,
    isdisabled: "false",
    isvisible: "true",
  },
  {
    id: "950c505a-8273-11ee-b962-0242ac120002",
    label: EActionsMedia.UPATE_POSITION,
    shortcut: {
      name: "",
      action: EActionsMedia.UPATE_POSITION,
    },
    description: "",
    icon: "movev",
    hastooltip: true,
    isdisabled: "false",
    isvisible: "true",
  },
  {
    id: "9882c124-8273-11ee-b962-0242ac120002",
    label: EActionsMedia.EDIT,
    shortcut: {
      name: "",
      action: EActionsMedia.EDIT,
    },
    description: "",
    icon: "imageedit",
    hastooltip: true,
    isdisabled: "false",
    isvisible: "true",
  },
  {
    id: "9b86daa4-8273-11ee-b962-0242ac120002",
    label: EActionsMedia.DELETE,
    shortcut: {
      name: "",
      action: EActionsMedia.DELETE,
    },
    description: "",
    icon: "delete",
    hastooltip: true,
    isdisabled: "false",
    isvisible: "true",
  },
];

export const DATA_MENU_BLOCK = [
  {
    id: "3da350c0-8273-11ee-b962-0242ac120002",
    label: EActionsBloc.MOVEUP,
    shortcut: {
      name: "mod+J",
      action: EActionsBloc.MOVEUP,
    },
    description: "",
    icon: "blockup",
    hastooltip: true,
    isdisabled: "false",
    isvisible: "true",
  },
  {
    id: "458cfffc-8273-11ee-b962-0242ac120002",
    label: EActionsBloc.MOVEDOWN,
    shortcut: {
      name: "mod+J",
      action: EActionsBloc.MOVEDOWN,
    },
    description: "",
    icon: "blockdown",
    hastooltip: true,
    isdisabled: "false",
    isvisible: "true",
  },
  {
    id: "4c5f9b96-8273-11ee-b962-0242ac120002",
    label: EActionsBloc.DUPLICATE,
    shortcut: {
      name: "mod+J",
      action: EActionsBloc.DUPLICATE,
    },
    description: "",
    icon: "blockduplicate",
    hastooltip: true,
    isdisabled: "false",
    isvisible: "true",
  },
  {
    id: "5344d0de-8273-11ee-b962-0242ac120002",
    label: EActionsBloc.DELETE,
    shortcut: {
      name: "mod+J",
      action: EActionsBloc.DELETE,
    },
    description: "",
    icon: "delete",
    hastooltip: true,
    isdisabled: "false",
    isvisible: "true",
  },
];

export const DATA_MENU_UI = [
  {
    id: "58df463c-8273-11ee-b962-0242ac120002",
    label: "Home",
    shortcut: {
      name: "mod+J",
      action: "",
    },
    route: "dashboard",
    description: "",
    icon: "home",
    hastooltip: true,
    isdisabled: "false",
    isvisible: "true",
  },
  {
    id: "618bb022-8273-11ee-b962-0242ac120002",
    label: "My courses",
    shortcut: {
      name: "mod+J",
      action: "",
    },
    route: `${ERoutes.COURSES}?page=1&status=${CourseStatus.DRAFT}&folder=all&date=${CourseDate.RECENT}&order=${CourseTitle.AZ}`,
    description: "",
    icon: "cards",
    hastooltip: true,
    isdisabled: "false",
    isvisible: "true",
  },
  {
    id: "68ef9126-8273-11ee-b962-0242ac120002",
    label: "Learners",
    shortcut: { name: "", action: "" },
    route: "learners",
    description: "",
    icon: "users",
    hastooltip: true,
    isdisabled: "false",
    isvisible: "true",
  },

  {
    id: "70e1e668-8273-11ee-b962-0242ac120002",
    label: "Reports",
    route: "reports",
    shortcut: { name: "", action: "" },
    description: "",
    icon: "chart",
    hastooltip: true,
    isdisabled: "false",
    isvisible: "true",
  },
];




export const DATA_SECTION_1 = [
  {
    id: "76331b28-8273-11ee-b962-0242ac120002",
    label: "My profile",
    shortcut: {
      name: EActionskeysUser.EDIT_PROFIL,
      action: EActionsUser.EDIT_PROFIL,
    },
    description: "",
    startContent: "profil",
    action: EActionsUser.EDIT_PROFIL,
    color:  EColor.default,
    isdisabled: "false",
    isvisible: "true",
    route: "",
  },
  {
    id: "79a56fd6-8273-11ee-b962-0242ac120002",
    label: "Log out",
    shortcut: {
      name: EActionskeysUser.LOGOUT,
      action: EActionsUser.LOGOUT,
    },
    description: "",
    action: EActionsUser.LOGOUT,
    startContent: "logout",
    color:  EColor.danger,
    isdisabled: "false",
    isvisible: "true",
    route: "",
  },
];
export const DATA_SECTION_2 = [
  {
    id: "7d86d09a-8273-11ee-b962-0242ac120002",
    label: "Help",

    shortcut: {
      name: EActionskeysUser.HELP,
      action: EActionsUser.HELP,
    },
    description: "",
    startContent: "help",
    action: EActionsUser.HELP,
    color:  EColor.default,
    isdisabled: "false",
    isvisible: "true",
    route: "",
  },
  {
    id: "8329da60-8273-11ee-b962-0242ac120002",
    label: "Settings",
    shortcut: {
      name: EActionskeysUser.SETTINGS,
      action: EActionsUser.SETTINGS,
    },
    description: "",
    startContent: "setting",
    action: EActionsUser.SETTINGS,
    color:  EColor.default,
    isdisabled: "false",
    isvisible: "true",
    route: "",
  },
];
export const DATA_USER = [
  {
    data: DATA_SECTION_1,
    title: "Me",
    id: "be82312a-820f-11ee-b962-0242ac120002",
  },
  {
    data: DATA_SECTION_2,
    title: "App",
    id: "b5bc9d50-820f-11ee-b962-0242ac120002",
  },
];



const DATA_MENU_PAGES_SECTION_1 = [
  {
    id: "49b15a2c-da97-4a5d-bedc-a33ae64e2588",
    label: "Preview",
    shortcut: { name: "", action: "" },
    description: "",
    startContent: "preview",
    action: EActionsPage.PREVIEW,
    color:  EColor.default,
    isdisabled: "false",
    isvisible: "true",
    route: "",
  },
  {
    id: "19e58ff2-8211-11ee-b962-0242ac120002",
    label: "Duplicate",
    shortcut: { name: "", action: "" },
    description: "",
    startContent: "duplicate",
    action: EActionsPage.DUPLICATE,
    color:  EColor.default,
    isdisabled: "false",
    isvisible: "true",
    route: "",
  },
  {
    id: "1e815460-8211-11ee-b962-0242ac120002",
    label: "Validate",
    shortcut: { name: "", action: "" },
    description: "",
    startContent: "checkbadge",
    action: EActionsPage.VALIDATE,
    color:  EColor.default,
    isdisabled: "false",
    isvisible: "true",
    route: "",
  },
  {
    id: "ea204064-821f-11ee-b962-0242ac120002",
    label: "Reorder",
    shortcut: { name: "", action: "" },
    description: "",
    startContent: "scrollist",
    action: EActionsPage.REORDER,
    color:  EColor.default,
    isdisabled: "false",
    isvisible: "true",
    route: "",
  },
  {
    id: "22c55c7e-8211-11ee-b962-0242ac120002",
    label: "Delete",
    shortcut: { name: "", action: "" },
    description: "",
    startContent: "delete",
    action: EActionsPage.DELETE,
    color:  EColor.default,
    isdisabled: "false",
    isvisible: "true",
    route: "",
  },
];
const DATA_MENU_PAGES_SECTION_2 = [
  {
    id: "ea204064-821f-11ee-b962-0242ac120002",
    label: "Preview as student",
    shortcut: { name: "", action: "" },
    description: "",
    startContent: "preview",
    action: EActionsCourse.PREVIEW,
    color:  EColor.default,
    isdisabled: "false",
    isvisible: "true",
    route: "",
  },

  {
    id: "63ad7b18-8211-11ee-b962-0242ac120002",
    label: "Share",
    shortcut: { name: "", action: "" },
    description: "",
    startContent: "share",
    action: EActionsCourse.SHARE,
    color:  EColor.default,
    isdisabled: "false",
    isvisible: "true",
    route: "",
  },
  {
    id: "cbba7db6-82be-11ee-b962-0242ac120002",
    label: "Preview path",
    shortcut: { name: "", action: "" },
    description: "",
    startContent: "share",
    action: EActionsCourse.SHARE,
    color:  EColor.default,
    isdisabled: "false",
    isvisible: "true",
    route: "",
  },
];

export const DATA_MENU_PAGES = [
  {
    data: DATA_MENU_PAGES_SECTION_1,
    title: "Page",
    id: "b01c74ce-820f-11ee-b962-0242ac120002",
  },
  {
    data: DATA_MENU_PAGES_SECTION_2,
    title: "Course",
    id: "b5bc9d50-820f-11ee-b962-0242ac120002",
  },
];
