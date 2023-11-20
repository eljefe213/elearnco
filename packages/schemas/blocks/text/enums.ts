export enum TextBlockType {
  TITLE = "title",
  SUBTITLE = "subtitle",
  PARAGRAH = "paragraph",
  CITATION = "citation",
  WARNING = "warning",
  CONCLUSION = "conclusion",
  DEFINITION = "definition",
  MEMORISATION = "memorisation",
  THEOREME="theoreme",
  EXAMPLE= "example",
  MATHS = 'maths',
  LINK = "link",
}
export const BLOCK_TEXT_LIST = Object.values(TextBlockType);
