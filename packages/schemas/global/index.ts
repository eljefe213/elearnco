export type TPoint = { x: number; y: number };
export const POINT = { x: 0, y: 0 };
export type IdMap<T> = { [id: string]: T };
export interface GenericObject {
  [key: string]: any;
}
export type TFixedInPosition = "top" | "bottom" | "left" | "right";
export enum EColor {
  default = "default",
  primary = "primary",
  secondary = "secondary",
  success = "success",
  warning = "warning",
  danger = "danger",
}

export type TColor = keyof typeof EColor;
export type TPosition = "relative" | "fixed";
