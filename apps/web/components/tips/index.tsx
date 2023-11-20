import { ListboxItem, Input, Listbox } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from "react";
import { EActionsUser, ERoutes } from "schemas";
import { useGlobalModalStore } from "store";
import { IconUI } from "ui/icon/IconUI";

//TODO - Translation


export interface MenuOption {
  icon: React.ReactNode;
  name: string;
  searchableName?: string;
  label?: string;
  action: (ctrl: boolean) => void | Promise<void>;
  sortableDate?: Date;
  shouldShow?: () => boolean;
  loadable?: boolean;
  isLoading?: boolean;
}

const Tips = ({onClose}:{onClose:()=>void}) => {
  const modalStore = useGlobalModalStore();
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [selectionIndex, setSelectionIndex] = useState<number>(0);
  const [options, setOptions] = React.useState<MenuOption[]>([]);
  const openLink = (link: string, ctrl: boolean) => {
    void (async () => {
      if (ctrl) {
        window.open(link, "_blank");
      } else {
        onClose()
        await router.push(link);
      }
    })();
  };
  const total: MenuOption[] = useMemo(
    () => [
      {
        icon: <IconUI name="home" width={18} />,
        name: "Dashboard",
        label: "Navigate dashboard",
        action: (ctrl: boolean): void => openLink(`/dashboard`, ctrl),
        shouldShow: (): boolean => window.location.pathname !== "/dashboard",
      },
      {
        icon: <IconUI name="user" width={18} />,
        name: "Profile",
        label: "Navigate to your profile",
        action: (ctrl: boolean): void =>
          modalStore.onOpen(EActionsUser.EDIT_PROFIL),
        shouldShow: (): boolean => window.location.pathname !== "/profile",
      },
      {
        icon: <IconUI name="setting" width={18} />,
        name: "Settings",
        label: "Navigate to settings",
        action: (ctrl: boolean): void => modalStore.onOpen(EActionsUser.SETTINGS),
        shouldShow: (): boolean => window.location.pathname !== ERoutes.SETTINGS,
      },
      {
        icon: <IconUI name="users" width={18} />,
        name: "Learners",
        label: "Navigate to learners",
        action: (ctrl: boolean): void => openLink(`/learners`, ctrl),
        shouldShow: (): boolean => window.location.pathname !== `/${ERoutes.LEARNERS}`,
      },
      {
        icon: <IconUI name="cards" width={18} />,
        name: "Courses",
        label: "Navigate to courses",
        action: (ctrl: boolean): void => openLink(`/courses`, ctrl),
        shouldShow: (): boolean => window.location.pathname !== "/courses",
      },
      
    ],
    []
  );

  const filteredOptions: MenuOption[] = options
    .filter((o) => (!!o.shouldShow ? o.shouldShow() : true))
    .filter((e) =>
      (e.searchableName ?? e.name).toLowerCase().includes(query.toLowerCase())
    );

  const onActionHandler = (i: number) => filteredOptions[i].action(false);

  useEffect(() => {
    setQuery("");
    setSelectionIndex(0);
    setOptions(total);
  }, []);

  return (
    <div className="relative">
      <Input
        classNames={{
          base: "max-w-full h-10 mb-2",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder="Where do you want to go ?"
        size="sm"
        startContent={<IconUI name="search" width={18} />}
        type="search"
        value={query}
        onValueChange={setQuery}
      />

      <div className="relative">
        {!!filteredOptions.length && (
          <div
            className="absolute h-12 w-full top-0 left-0 z-10 pointer-events-none"
            style={{
              transition: "transform cubic-bezier(.4,0,.2,1) 200ms",
              transform: `translateY(${selectionIndex * 49}px)`,
            }}
          >
            <div className="w-full h-full bg-primary/10" />
          </div>
        )}
        <Listbox
          aria-label="User Menu"
          className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 overflow-visible shadow-small"
          itemClasses={{
            base: "px-3 gap-3 data-[hover=true]:bg-default-100/0 rounded-none",
          }}
          onAction={(key) => onActionHandler(key as number)}
        >
          {filteredOptions.map((o, i) => (
            <ListboxItem
              key={i}
              onMouseEnter={() => setSelectionIndex(i)}
              description={o.label}
              startContent={
                <div className="bg-primary/10 flex items-center rounded-small justify-center w-7 h-7">
                  {o.icon}
                </div>
              }
            >
              {o.name}
            </ListboxItem>
          ))}
        </Listbox>
      </div>
    </div>
  );
};

export default Tips;
