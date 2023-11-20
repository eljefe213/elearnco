"use client";
import { Kbd, Modal, ModalContent } from "@nextui-org/react";
import { isWebKit } from "@react-aria/utils";
import { Command } from "cmdk";
import { isEmpty } from "lodash";
import React, { useCallback, useMemo, useRef, useState } from "react";
import MultiRef from "react-multi-ref";
import { tv } from "tailwind-variants";

import { useSearchStore } from "../../store";
import { IconUI } from "../icon/IconUI";
const cmdk = tv({
  slots: {
    base: "max-h-full overflow-y-auto",
    header: [
      "flex",
      "items-center",
      "w-full",
      "px-4",
      "border-b",
      "border-default-400/50",
      "dark:border-default-100",
    ],
    searchIcon: "text-default-400 text-lg",
    input: [
      "w-full",
      "px-2",
      "h-14",
      "font-sans",
      "text-lg",
      "outline-none",
      "rounded-none",
      "bg-transparent",
      "text-default-700",
      "placeholder-default-500",
      "dark:text-default-500",
      "dark:placeholder:text-default-300",
    ],
    list: ["px-4", "mt-2", "pb-4", "overflow-y-auto", "max-h-[50vh]"],
    itemWrapper: [
      "px-4",
      "mt-2",
      "group",
      "flex",
      "h-16",
      "justify-between",
      "items-center",
      "rounded-lg",
      "shadow",
      "bg-content2/50",
      "active:opacity-70",
      "cursor-pointer",
      "transition-opacity",
      "data-[active=true]:bg-primary",
      "data-[active=true]:text-primary-foreground",
    ],
    leftWrapper: ["flex", "gap-3", "items-center", "w-full", "max-w-full"],
    leftIcon: [
      "text-default-500 dark:text-default-300",
      "group-data-[active=true]:text-primary-foreground",
    ],
    itemContent: ["flex", "flex-col", "gap-0", "justify-center", "max-w-[80%]"],
    itemParentTitle: [
      "text-default-400",
      "text-xs",
      "group-data-[active=true]:text-primary-foreground",
      "select-none",
    ],
    itemTitle: [
      "truncate",
      "text-default-500",
      "group-data-[active=true]:text-primary-foreground",
      "select-none",
    ],
    emptyWrapper: [
      "flex",
      "flex-col",
      "text-center",
      "items-center",
      "justify-center",
      "h-32",
    ],
  },
});

interface SearchResultItem {
  content: string;
  objectID: string;
  url: string;
  type: "lvl1" | "lvl2" | "lvl3";
  hierarchy: {
    lvl1: string | null;
    lvl2?: string | null;
    lvl3?: string | null;
  };
}
export const SearchModalUI = () => {
  const [query, setQuery] = useState("");
  const { isOpen, onClose, onOpen } = useSearchStore();
  const [menuNodes] = useState(() => new MultiRef<number, HTMLElement>());
  const slots = useMemo(() => cmdk(), []);
  const eventRef = useRef<"mouse" | "keyboard">();
  const listRef = useRef<HTMLDivElement>(null);

  const recentSearches = []; //useLocalStorage<SearchResultItem[]>(RECENT_SEARCHES_KEY);

  const results = useMemo<SearchResultItem[]>(
    function getResults() {
      if (query.length < 2) return [];

      const data = [] as SearchResultItem[];

      const words = query.split(" ");

      /* if (words.length === 1) {
        return matchSorter(data, query, {
          keys: MATCH_KEYS,
        }).slice(0, MAX_RESULTS);
      }
 */
      /*  const matchesForEachWord = words.map((word) =>
        matchSorter(data, word, {
          keys: MATCH_KEYS,
        }),
      ); */

      const matches = []; //intersectionBy(...matchesForEachWord, "objectID").slice(0, MAX_RESULTS);

      return matches;
    },
    [query]
  );
  const onInputKeyDown = useCallback((e: React.KeyboardEvent) => {
    eventRef.current = "keyboard";
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        //if (activeItem + 1 < items.length) {
        // setActiveItem(activeItem + 1);
        // }
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        //if (activeItem - 1 >= 0) {
        // setActiveItem(activeItem - 1);
        //}
        break;
      }
      case "Control":
      case "Alt":
      case "Shift": {
        e.preventDefault();
        break;
      }
      case "Enter": {
        if (items?.length <= 0) {
          break;
        }

        //onItemSelect(items[activeItem]);

        break;
      }
    }
  }, []);

  const renderItem = useCallback(
    (item: SearchResultItem, index: number, isRecent = false) => {
      const isLvl1 = item.type === "lvl1";

      const mainIcon = isRecent ? (
        <IconUI
          className="text-base text-default-400 pointer-events-none flex-shrink-0"
          name="search"
          width={18}
          height={18}
        />
      ) : isLvl1 ? (
        <IconUI
          className="text-base text-default-400 pointer-events-none flex-shrink-0"
          name="search"
          width={18}
          height={18}
        />
      ) : (
        <IconUI
          className="text-base text-default-400 pointer-events-none flex-shrink-0"
          name="search"
          width={18}
          height={18}
        />
      );

      return (
        <Command.Item
          key={item.objectID}
          ref={menuNodes.ref(index)}
          className={slots.itemWrapper()}
          data-active={index === 0}
          value={item.content}
          onMouseEnter={() => {
            eventRef.current = "mouse";

            //setActiveItem(index);
          }}
          onSelect={() => {
            if (eventRef.current === "keyboard") {
              return;
            }

            //onItemSelect(item);
          }}
        >
          <div className={slots.leftWrapper()}>
            {mainIcon}
            <div className={slots.itemContent()}>
              {!isLvl1 && (
                <span className={slots.itemParentTitle()}>
                  {item.hierarchy.lvl1}
                </span>
              )}
              <p className={slots.itemTitle()}>{item.content}</p>
            </div>
          </div>

          {/* <ChevronRightLinearIcon size={14} /> */}
        </Command.Item>
      );
    },
    []
  );

  const shouldOpen = true;
  return (
    <Modal
      hideCloseButton
      backdrop="opaque"
      /* classNames={{
        base: [
          "mt-[20vh]",
          "border-small",
          "dark:border-default-100",
          "supports-[backdrop-filter]:bg-background/80",
          "dark:supports-[backdrop-filter]:bg-background/30",
          "supports-[backdrop-filter]:backdrop-blur-md",
          "supports-[backdrop-filter]:backdrop-saturate-150",
        ],
        backdrop: ["bg-black/80"],
      }} */
      isOpen={isOpen && shouldOpen}
      motionProps={{
        onAnimationComplete: () => {
          if (!isOpen) {
            setQuery("");
          }
        },
      }}
      placement="top-center"
      scrollBehavior="inside"
      size="xl"
      onClose={() => onClose()}
    >
      <ModalContent>
        <Command
          className={slots.base()}
          label="Quick search command"
          shouldFilter={false}
        >
          <div className={slots.header()}>
            <IconUI
              className="text-base text-default-400 pointer-events-none flex-shrink-0"
              name="search"
              width={18}
              height={18}
            />

            <Command.Input
              autoFocus={!isWebKit()}
              className={slots.input()}
              placeholder="Search documentation"
              value={query}
              onKeyDown={onInputKeyDown}
              onValueChange={setQuery}
            />
            {/* {query.length > 0 && <CloseButton onPress={() => setQuery("")} />} */}
            <Kbd className="md:block border-none px-2 py-1 ml-2 font-medium text-[0.6rem]">
              ESC
            </Kbd>
          </div>
          <Command.List ref={listRef} className={slots.list()} role="listbox">
            {query.length > 0 && (
              <Command.Empty>
                <div className={slots.emptyWrapper()}>
                  <div>
                    <p>No results for &quot;{query}&quot;</p>
                    {query.length === 1 ? (
                      <p className="text-default-400">
                        Try adding more characters to your search term.
                      </p>
                    ) : (
                      <p className="text-default-400">
                        Try searching for something else.
                      </p>
                    )}
                  </div>
                </div>
              </Command.Empty>
            )}

            {isEmpty(query) &&
              (isEmpty(recentSearches) ? (
                <div className={slots.emptyWrapper()}>
                  <p className="text-default-400">No recent searches</p>
                </div>
              ) : (
                recentSearches &&
                recentSearches.length > 0 && (
                  <Command.Group
                    heading={
                      <div className="flex items-center justify-between">
                        <p className="text-default-600">Recent</p>
                      </div>
                    }
                  >
                    {recentSearches.map((item, index) =>
                      renderItem(item, index, true)
                    )}
                  </Command.Group>
                )
              ))}

            {results.map((item, index) => renderItem(item, index))}
          </Command.List>
        </Command>
      </ModalContent>
    </Modal>
  );
};
