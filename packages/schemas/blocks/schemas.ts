import { ActivityBlockType } from "./activity";
import { LogicBlockType } from "./logic";
import { MediaBlockType } from "./media";
import { TextBlockType } from "./text";

export type BlockType =
  | TextBlockType
  | MediaBlockType
  | LogicBlockType
  | ActivityBlockType;

export type DraggableBlockType =
  | TextBlockType
  | MediaBlockType
  | LogicBlockType
  | ActivityBlockType;

export type DraggableBlock =
  | TextBlockType
  | MediaBlockType
  | LogicBlockType
  | ActivityBlockType;

export enum BlockCategories {
  "text" = "text",
  "media" = "media",
  "activity" = "activity",
  "logic" = "logic",
}

/*----------------------------------------------------------------
/** we can unlock the Blocks At Each End Of Development Of This 
----------------------------------------------------------------*/
export const isBlockIsDev = [
  "title",
  "paragraph",
  "subhead",
  "image",
  "conclusion",
  "alert",
  "definition",
  "remind",
  "theorem",
  "audio",
  "drawing",
  "video",
  "wheel",
];
