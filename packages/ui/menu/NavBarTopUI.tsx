"use client";
import { Link, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { useHotkeys } from "customhooks/use-hotkeys/use-hotkeys";
import { useRouter, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { ERoutes } from "schemas";
import {
  EActionskeysUser,
  EActionsMenuShortcuts,
  EActionsUser,
} from "schemas/actions/enums";
import { DATA_MENU_UI, DATA_USER } from "schemas/mocks";
import { useGlobalModalStore } from "../../store/modal/useModalStore";
import { DropdownUI } from "../dropdown/DropdownUI";
import { LogoSymbolUI } from "ui/logo/LogoSymbolUI";
import { UserUI } from "../user/UserUI";
import { SafeUser } from "schemas/auth/Auth";
import { MenuUI } from "./MenuUI";
import { LAYOUT } from "../const";
import { CourseTitleUI } from "../course/CourseTitleUI";

export const NavBarTopUI = () => {
  const { data: user } = useSession();
  const _user = user?.user as unknown as SafeUser;

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || `/${ERoutes.SIGN}`;
  const modalStore = useGlobalModalStore();

  useHotkeys([
    ["mod+K", (): void => modalStore.onOpen(EActionsMenuShortcuts.TIPS)],
    [
      EActionskeysUser.EDIT_PROFIL,
      (): void => modalStore.onOpen(EActionsUser.EDIT_PROFIL, { data: user }),
    ],
    [
      EActionskeysUser.HELP,
      (): void => modalStore.onOpen(EActionsUser.HELP, { data: null }),
    ],
    [EActionskeysUser.LOGOUT, (): Promise<void> => signoutUser()],
  ]);

  const signoutUser = async (): Promise<void> => {
    await signOut({
      redirect: false,
      callbackUrl,
    });
    router.push(callbackUrl);
  };

  const _actionHandler = async (action: string): Promise<void> => {
    if (action === (EActionsUser.LOGOUT as string)) {
      signoutUser();
    } else if (
      action === (EActionsUser.SETTINGS as string) ||
      action === (EActionsUser.HELP as string)
    ) {
      modalStore.onOpen(action);
    } else if (action === (EActionsUser.EDIT_PROFIL as string)) {
      if (user) modalStore.onOpen(action, { data: user });
    }
  };

  return (
    <Navbar height={LAYOUT.HEADER.height} maxWidth="full">
      <NavbarContent justify="start">
        <Link href="/dashboard">
          <NavbarBrand className="flex items-center">
            <LogoSymbolUI width={50} height={50} />
            {/* <LogoTextUI isBlack width={80} /> */}
          </NavbarBrand>
        </Link>
        <div className="flex justify-start ml-4">
          <CourseTitleUI />
        </div>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="center">
        <MenuUI
          classnames="z-50"
          fixedInPosition="top"
          data={DATA_MENU_UI}
          position="relative"
        />
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <DropdownUI
          actionHandler={_actionHandler}
          data={DATA_USER}
          placement="bottom-end"
        >
          <span role="button" className="flex">
            <UserUI
              name={_user?.name as string}
              description={_user?.role as string}
              image={_user?.image as string}
            />
          </span>
        </DropdownUI>
      </NavbarContent>
    </Navbar>
  );
};
