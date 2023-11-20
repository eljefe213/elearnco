"use client"
import { Button, Input } from "@nextui-org/react";
import { motion } from "framer-motion";
import  { ChangeEvent, useCallback, useMemo, useState } from "react";
import { IconUI } from "ui/icon/IconUI";
import { nanoid } from "nanoid";
/**
 * It takes a center point, a radius, and an angle in degrees, and returns the point on the
 * circumference of a circle that corresponds to that angle
 * @param {number} centerX - The x-coordinate of the center of the circle.
 * @param {number} centerY - The y-coordinate of the center of the circle.
 * @param {number} radius - The radius of the circle.
 * @param {number} angleInDegrees - The angle of the point, in degrees, starting from the x-axis and
 * moving clockwise.
 * @returns An object with two properties, x and y.
 */
const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};
export const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    arcSweep,
    0,
    end.x,
    end.y,
    "L",
    x,
    y,
    "L",
    start.x,
    start.y,
  ].join(" ");

  return d;
};
export const enum EPosition {
  "top-start" = "top-start",
  "top-end" = "top-end",
  "bottom-end" = "bottom-end",
}
export const DIM = 500;
export const MAX_SECTORS = 9;
export const MIN_SECTORS = 3;

const TOOLBAR_DATAS = [
  {
    label: "delete.media",
    icon: "palette",
    action: "",
    type: "button",
    id: "83f1778e-fr7gt-11ed-b5ea-0242ze7485",
  },
  {
    label: "bot.help",
    icon: "bot",
    action: "",
    type: "button",
    id: "83f1778e-fr7gt-11ed-b5ea-0242ze7485",
  },
];
export type TTimestamp = {
  index: number;
  time: number;
  title: string;
  id: string;
};

export interface ITimestamp {
  timestamp: TTimestamp[];
  mode: string;
  updateSector: (val: TTimestamp[]) => void;
}
// Fonction pour interpoler une valeur entre deux valeurs
function interpolate(start: number, end: number, t: number): number {
  return Math.round(start + (end - start) * t);
}
export function hexToRgb(hex: string): {
  r: number;
  g: number;
  b: number;
} | null {
  const hexValue = hex.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (m, r, g, b) => {
      return r + r + g + g + b + b;
    }
  );
  const rgbValues = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);
  return rgbValues
    ? {
        r: parseInt(rgbValues[1], 16),
        g: parseInt(rgbValues[2], 16),
        b: parseInt(rgbValues[3], 16),
      }
    : null;
}
function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

export function generateColorPalette(
  baseColor: { r: number; g: number; b: number } | null,
  numColors: number
): string[] {
  const colorPalette = [] as string[];
  const step = 1 / numColors;
  if (baseColor)
    for (let i = 0; i < numColors; i++) {
      const t = i * step;
      const r = interpolate(baseColor.r, 255, t);
      const g = interpolate(baseColor.g, 255, t);
      const b = interpolate(baseColor.b, 255, t);
      const color = rgbToHex(r, g, b);
      colorPalette.push(color);
    }

  return colorPalette;
}
const baseColorHex = "#d34418";

const propsButton = { fill: "transparent", size: 22 };
const Sectors = (props: ITimestamp): JSX.Element => {
  const { timestamp = [], updateSector, mode } = props;

  const _addTimeStep = useCallback((): void => {
    if (timestamp.length < MAX_SECTORS) {
      const newTimestamp = {
        index: timestamp.length + 1,
        time: 0,
        title: `Section ${timestamp.length + 1}`,
        id: nanoid(7),
      };

      updateSector([...timestamp, newTimestamp]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timestamp]);

  const _removeTimeStep = useCallback(
    (id: string): void => {
      if (timestamp.length > MIN_SECTORS) {
        const _newState = [...timestamp].filter(
          (timeStep: TTimestamp) => timeStep.id !== id
        );
        [..._newState].forEach((timeStep: TTimestamp, i: number) => {
          timeStep.index = i + 1;
        });
        updateSector(_newState);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [timestamp]
  );

  const _updateTimeStep = useCallback(
    (event: ChangeEvent<HTMLInputElement>, id: string): void => {
      const _target = event.currentTarget as HTMLInputElement;
      const _value = _target.value as string;
      const _newState = [...timestamp].filter(
        (timeStep: TTimestamp) => timeStep.id === id
      );
      if (_newState.length) {
        Object.assign(_newState[0], {
          ..._newState[0],
          title: _value === "" ? "section" : _value,
        });

        updateSector([...timestamp]);
      }
    },

    [timestamp, updateSector]
  );

  return (
    <>
      <div className="flex flex-row justify-end items-center gap-3 mb-3 mt-5 w-full">
        {mode === "edition" ? (
          <Button
            startContent={<IconUI name="plus" {...propsButton} />}
            color="primary"
            variant="solid"
            onClick={_addTimeStep}
          >
            Ajouter un secteur
          </Button>
        ) : null}
      </div>
      <div style={{display:'grid'}} className="grid-cols-4 gap-4 w-full bg-default-50">
        {timestamp?.map((step) => {
          return (
            
              <div key={step.id} className="flex justify-start items-center gap-2">
                <div>
                  <Input
                    onChange={(event): void => _updateTimeStep(event, step.id)}
                    placeholder={step.title}
                    value={step.title}
                    type="text"
                    label=""
                    size="sm"
                  />
                </div>

                <div className="flex gap-1 justify-center">
                  <Button
                    isIconOnly
                    onClick={(): void => _removeTimeStep(step.id)}
                    aria-label=""
                    startContent={<IconUI name="delete" {...propsButton} />}
                  />
                </div>
              </div>
           
          );
        })}
      </div>
    </>
  );
};
const createDatas = () => {
  const datas = [];
  for (let pas = 0; pas < MIN_SECTORS; pas++) {
    datas.push({
      index: pas + 1,
      time: 0,
      title: "Section",
      id: nanoid(7),
    });
  }

  return datas;
};
export const Wheel = (): JSX.Element => {
  const data = createDatas();
  const [angle, setAngle] = useState<number>(0);
  const [secteur, setSecteur] = useState<TTimestamp[]>(data);
  const [media, setMedia] = useState<{ bgColor: string }>({
    bgColor: baseColorHex,
  });

  const colorPalette = useMemo(
    () => generateColorPalette(hexToRgb(media.bgColor), secteur.length),

    [media.bgColor, secteur.length]
  );
  const handleRotate = (): void => {
    const _n = secteur.length % 2 === 0 ? 2 : 1;
    setAngle((angle) => angle + (360 / _n) * Math.floor(Math.random() * 100));
  };

  const handleSecteur = (val: TTimestamp[]): void => {
    setSecteur(val);
  };

  return (
    <>
      <div className="relative h-10">
        {/* color */}
        {/* <ToolbarUI
          type=""
          media={media}
          position={EPosition["top-end"]}
          isVertical={false}
          datas={TOOLBAR_DATAS as TButton[]}
          callback={(action, val) => setMedia({ bgColor: val })}
        /> */}
      </div>
      <div className="flex flex-column items-center justify-center w-full">
        <div className="relative flex flex-column items-center justify-center m-10">
          <motion.div
            animate={{
              rotate: angle,
            }}
            style={{
              transition: "transform 20s curveLinear 0s",
              transform: "rotate(45deg)",
              width: DIM,
              height: DIM,
              borderRadius: "full",
              position: "relative",
              //   background: "white",
            }}
          >
            {secteur?.map((sector, index) => {
              const _n = secteur.length % 2 === 0 ? 2 : 1;
              return (
                <div
                  key={sector.id}
                  style={{
                    position: "absolute",
                    transform: `rotate(${
                      (360 / secteur.length) * index +
                      (-90 + 360 / secteur.length / _n)
                    }deg)`,
                    width: DIM,
                    height: DIM,
                    //background: colorPalette[index],
                    pointerEvents: "none",
                    overflow: "hidden",
                    borderRadius: "100%",
                  }}
                >
                  <svg pointerEvents="none" width={DIM} height={DIM}>
                    <path
                      fill={colorPalette[index]}
                      d={describeArc(
                        DIM / 2,
                        DIM / 2,
                        DIM / 2,
                        0,
                        360 / secteur.length
                      )}
                    />
                  </svg>

                  <div
                    className=""
                    style={{
                      position: "absolute",
                      transformOrigin: "left top",
                      top: DIM / 2,
                      left: DIM / 2,
                      width: DIM / 2,
                      display: "block",
                      transform: `rotate(${
                        -90 + 360 / secteur.length / 2
                      }deg) translateY(-50%)`,
                      padding: "0 2% 0 10%",
                    }}
                  >
                    <p>{sector.title}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          <div
            style={{
              backdropFilter: "blur(8px)",
              alignItems: "center",
              borderRadius: "100%",
              position: "absolute",
              backgroundColor: "#fff",
              zIndex: 10,
              background: "white",
              width: "72px",
              height: "72px",
              minHeight: "72px",
              minWidth: "72px",
              opacity: 0.4,
              /* _after={{
              content: `" "`,
              position: "absolute",
              right: "-6px",
              width: "16px",
              height: "16px",
              backgroundColor: "#fff",
              transform: "rotate(45deg)",
            }} */
            }}
          />
          <div className="absolute rounded-full w-14 h-14 min-h-14 min-w-14">
            <p>+</p>
          </div>
        </div>
      </div>
      <div className="flex gap-10 items-center justify-center mt-2">
        <Button onClick={handleRotate}>Lancer la roue</Button>
      </div>
      <Sectors
        timestamp={secteur}
        mode="edition"
        updateSector={handleSecteur}
      />
    </>
  );
};

export default Wheel;
