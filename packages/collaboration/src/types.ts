export type MouseStyle = "auto" | "grab" | "text";

export type MouseState = {
  x: number;
  y: number;
  style: CSSStyleDeclaration["cursor"];
  clicking: boolean;
  grabbing: boolean;
};

export type AwarenessState = {
  mouse?: MouseState;
  username?: string;
  leader?: boolean;
  connected?: boolean;
};
