export enum LogicBlockType {
    REDIRECT = "Redirect",
    CONDITION= "Condition",
    WAIT = "Wait",
    JUMP = "Jump",
  }
  export const BLOCK_LOGIC_LIST = Object.values(LogicBlockType);