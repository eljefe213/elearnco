"use client";
import { Button, Image, Tooltip } from "@nextui-org/react";
import { useWindowSize } from "customhooks";
import { checkHttps, getAspectRatio, getParamsFromUrlImage } from "lib";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  DATAS_MENU_IMAGE,
  DATAS_MENU_MEDIA,
  EActionsMedia,
  POINT,
  TPoint,
} from "schemas";
import { useCourseStore, useGlobalModalStore } from "store";

import { GoupeButtonUI } from "../button/groupeButton/GroupeButtonUI";
import { IconUI } from "../icon/IconUI";

interface IProps {
  isHidden: boolean;
  bannerT?: string | null;
  setBanner?: (path: string) => void;
}

const BACKGROUND_NO_IMAGE = {
  backgroundColor: "#c084fc1a",
  backgroundImage:
    "linear-gradient(135deg,#a855f780 10%,#0000 0,#0000 50%,#a855f780 0,#a855f780 60%,#0000 0,#0000)",
  backgroundSize: "7.07px 7.07px",
};

type mode = "fill" | "fit";

export const BannerUI = (props: IProps) => {
  const { isHidden = false, bannerT, setBanner } = props;
  const { onOpen } = useGlobalModalStore();
  const { banner, updateBanner } = useCourseStore();
  const { width } = useWindowSize();

  const [position, setPosition] = useState<TPoint>(POINT);
  const [mode, setMode] = useState<mode>("fill");
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const RefH = useRef<number>(width);
  const RefContainer = useRef<HTMLDivElement>(null);
  const RefImage = useRef<HTMLImageElement>(null);
  const refClick = useRef<DOMRect>();
  const isDragging = useRef<boolean>(false);
  const relativeCoordinates = useRef<TPoint>(POINT);

  const _removeAllListeners = (): void => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("touchmove", handleMouseMove);
    document.removeEventListener("touchend", handleMouseUp);
  };

  const setHeight = (): void => {
    if (RefImage.current) {
      const _refCon = RefContainer.current?.getBoundingClientRect().width;
      const _ratio = getAspectRatio(RefImage.current) | 1;

      if (_refCon) {
        RefH.current = _refCon / _ratio / 2 >= 390 ? 390 : _refCon / _ratio / 2;
      }
    }
  };

  const onError = (): void => {};

  const onLoad = (): void => {
    setHeight();
  };

  const handleMouseDown = (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>
  ): void => {
    const element = event.currentTarget as HTMLDivElement;
    const rect = element.getBoundingClientRect();
    refClick.current = rect;

    if (isDragging.current || !isMoving) return;
    isDragging.current = true;
    //setIsDraging(isDraging=>!isDraging)
    let _event;
    let clientY = 0;
    event.preventDefault();

    if (event.type === "mousedown") {
      _event = event as React.MouseEvent;
      clientY = _event.clientY;
    } else {
      _event = event as React.TouchEvent;
      clientY = _event.touches[0].clientY;
    }

    setPosition({ x: 0, y: position.y });
    const y = clientY - rect.top;
    relativeCoordinates.current = { x: 0, y };
    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("touchend", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent): void => {
    if (!isDragging.current || !RefImage.current) return;
    event.preventDefault();

    let _event;
    let clientY = 0;
    if (event.type === "mousemove") {
      _event = event;
      clientY = _event.clientY;
    } else {
      _event = event as unknown as TouchEvent;
      clientY = _event.touches[0].clientY;
    }

    if (
      clientY - relativeCoordinates.current.y - 124 > 0 ||
      Math.abs(clientY - relativeCoordinates.current.y - 124) -
        (RefImage.current.getBoundingClientRect().height - RefH.current) >
        0
    )
      return;
    setPosition({
      ...position,
      y: clientY - relativeCoordinates.current.y - 124,
    });
  };

  const handleMouseUp = (event): void => {
    if (!isDragging.current || !isMoving) return;
    isDragging.current = false;
    let _event;
    let clientY = 0;
    if (event.type === "mouseup") {
      _event = event;
      clientY = _event.clientY;
    } else {
      _event = event as unknown as TouchEvent;
      clientY = _event.touches[0].clientY;
    }

    if (RefImage.current) {
      if (
        clientY - relativeCoordinates.current.y - 124 > 0 ||
        Math.abs(clientY - relativeCoordinates.current.y - 124) -
          (RefImage.current.getBoundingClientRect().height - RefH.current) >
          0
      )
        return;
      setPosition({
        ...position,
        y: clientY - relativeCoordinates.current.y - 124,
      });
    }
    _removeAllListeners();
  };

  /** ACTIONS MENU */

  const clickHandler = useCallback((action: string): void => {
    if (action === (EActionsMedia.UPATE_POSITION as string)) {
      setIsMoving((prev) => !prev);
      return;
    }
    if (action === (EActionsMedia.EDIT as string)) {
      return;
    }
    if (action === (EActionsMedia.DELETE as string)) {
      updateBanner("");
      setBanner?.("");
      return;
    }
    if (action === (EActionsMedia.FILL_IMAGE as string)) {
      setMode("fill");
      return;
    }
    if (action === (EActionsMedia.FIT_IMAGE as string)) {
      setMode("fit");
      return;
    }

    onOpen(action, {});
  }, []);

  useEffect(() => {
    setHeight();
  }, [width]);

  useEffect(() => {
    return () => {
      _removeAllListeners();
    };
  }, []);

  useEffect(() => {
    setBanner?.(banner);
    const BANNER_PARAMS = getParamsFromUrlImage(banner);
    setPosition({ x: BANNER_PARAMS.x, y: BANNER_PARAMS.y });
    setMode(BANNER_PARAMS.mode as mode);
  }, [banner]);

  const _banner = bannerT || banner;
  const BANNER_COURSE = checkHttps(_banner)
    ? _banner
    : `/patterns/${_banner}.svg`;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: "100%",
        width: "100%",
        ...(_banner !== "" ? {} : BACKGROUND_NO_IMAGE),
      }}
    >
      {!isMoving ? (
        <div
          style={{ zIndex: 99, right: 0 }}
          className="absolute top-0 w-full right-0 z-50 p-4"
        >
          {_banner === "" ? (
            <GoupeButtonUI
              isDisabled={false}
              data={DATAS_MENU_MEDIA}
              orientation="horizontal"
              onClickHandler={clickHandler}
            />
          ) : (
            <GoupeButtonUI
              isDisabled={false}
              data={
                mode === "fit"
                  ? DATAS_MENU_IMAGE.filter(
                      (item) => item.label !== EActionsMedia.UPATE_POSITION
                    )
                  : DATAS_MENU_IMAGE
              }
              orientation="horizontal"
              onClickHandler={clickHandler}
            />
          )}
        </div>
      ) : (
        <div className="absolute z-50 flex justify-end w-full p-4 gap-2">
          <Tooltip content="Valid">
            <Button
              size="sm"
              onClick={(): void => setIsMoving((isMoving) => !isMoving)}
              isIconOnly
              aria-label="Valid"
            >
              <IconUI name="check" width={20} height={20} />
            </Button>
          </Tooltip>
          <Tooltip content="Close">
            <Button
              size="sm"
              onClick={(): void => setIsMoving((isMoving) => !isMoving)}
              isIconOnly
              aria-label="close"
            >
              <IconUI name="close" width={20} height={20} />
            </Button>
          </Tooltip>
        </div>
      )}

      <div
        className="banner-wrapper w-full relative overflow-hidden"
        style={{
          height: RefH.current ? RefH.current : "100%",
        }}
      >
        <span className="photo-wrapper w-full h-full">
          <span className="photo-container flex items-center justify-center h-full w-full relative">
            {/* MODE FIT */}

            {mode === "fit" && _banner !== "" && (
              <>
                <span
                  className="photo-background absolute h-full w-full"
                  style={{
                    opacity: 0.4,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundImage: `url(${BANNER_COURSE})`,
                    filter: "blur(16px)",
                  }}
                />
                <img
                  style={{
                    height: "calc(100% - 32px)",
                   /*  objectFit: "contain",
                    maxWidth: "unset", */
                  }}
                  src={BANNER_COURSE}
                  className="photo-image absolute w-full top-0 bottom-0 object-contain max-w-fit left-auto"
                />
              </>
            )}
            <span
              ref={RefContainer}
              className="drag-wrapper w-full static"
              style={{
                height: "auto",
                objectFit: "unset",
                visibility: mode === "fit" ? "hidden" : "visible",
              }}
            >
              <div className="drag-inner" style={{ display: "contents" }}>
                <button
                  style={{
                    cursor:
                      isMoving && !isDragging.current
                        ? "grab"
                        : isDragging.current
                        ? "grabbing"
                        : "inherit",
                    height: "auto",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                  onMouseDown={(e) =>
                    handleMouseDown(
                      e as unknown as
                        | React.MouseEvent<HTMLDivElement, MouseEvent>
                        | React.TouchEvent<HTMLDivElement>
                    )
                  }
                >
                  <Image
                    ref={RefImage}
                    onLoad={onLoad}
                    onError={onError}
                    draggable={false}
                    width="100%"
                    height={mode === "fill" ? "auto" : "calc(100% - 32px)"}
                    removeWrapper
                    alt=""
                    src={BANNER_COURSE}
                    style={{
                      objectFit: "unset",
                      position: "static",
                      userSelect: "none",
                    }}
                  />
                </button>
              </div>
            </span>
          </span>
        </span>
      </div>
    </div>
  );
};
