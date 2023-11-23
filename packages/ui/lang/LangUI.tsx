"use client";
import { Avatar, Select, Selection, SelectItem } from "@nextui-org/react";

import React, { useTransition } from "react";
import { useRouter, usePathname } from "next-intl/client";
import { useLocale } from "next-intl";
import { useCoursesParams } from "customhooks";

const DATA_FLAG = [
  {
    id: "england",
    key: "england",
    name: "England",
    flag: "https://flagcdn.com/gb.svg",
    locale: "en",
  },
  {
    id: "france",
    key: "france",
    name: "France",
    flag: "https://flagcdn.com/fr.svg",
    locale: "fr",
  },
  {
    id: "spain",
    key: "spain",
    name: "Spain",
    flag: "https://flagcdn.com/es.svg",
    locale: "es",
  },
];

export const LangUI = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    currentPage,
    currentStatus,
    currentFolder,
    currentDate,
    currentOrder,
  } = useCoursesParams();

  const [_, startTransition] = useTransition();
  const locale = useLocale();
  const lg = DATA_FLAG.filter((flag) => flag.locale === locale);
  const [value, setValue] = React.useState<Selection>(new Set([lg[0].id]));
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lg = DATA_FLAG.filter((flag) => flag.id === e.target.value);
    setValue(new Set([e.target.value]));
  
    startTransition(() => {
      if (!pathname.includes("dashboard")) {
        router.replace(pathname, { locale: lg[0].locale });
      } else {
        router.replace(
          pathname +
            `?page=${currentPage}&status=${currentStatus}&folder=${currentFolder}&date=${currentDate}&order=${currentOrder}`,
          { locale: lg[0].locale }
        );
      }
    });
  };
  return (
    <Select
      items={DATA_FLAG}
      onChange={handleSelectionChange}
      label="Language"
      className="max-w-xs min-w-full"
      variant="bordered"
      color="default"
      size="sm"
      selectedKeys={value}
      defaultSelectedKeys={value}
      classNames={{
        trigger: "min-h-unit-12",
        listboxWrapper: "max-h-[400px]",
      }}
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <Avatar
              alt={item?.data?.name}
              className="flex-shrink-0"
              size="sm"
              src={item.data?.flag}
              style={{ width: 16, height: 16 }}
            />
            <div className="flex flex-col">
              <span>{item?.data?.name}</span>
            </div>
          </div>
        ));
      }}
    >
      {(flag) => (
        <SelectItem key={flag.id} textValue={flag.name}>
          <div className="flex gap-2 items-center">
            <Avatar
              alt={flag.name}
              className="flex-shrink-0"
              size="sm"
              src={flag.flag}
              style={{ width: 16, height: 16 }}
            />
            <div className="flex flex-col">
              <span className="text-small">{flag.name}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};
