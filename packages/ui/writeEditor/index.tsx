"use client";
import React, { KeyboardEvent } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Focus from "@tiptap/extension-focus";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Strike from "@tiptap/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import BubbleMenu from "./bubbleMenu";
import styles from "./Editor.module.scss";
import { TextBlockType } from "schemas/blocks/text";
export default function WriterEditor(props: Readonly<{
  blockID: string;
  type: string;
  editable?: boolean;
}>) {
  const { blockID, type = "paragraph", editable = true } = props;

  function handleTitleEditorKeyDown(event: KeyboardEvent<HTMLDivElement>) {  void 0}

  const titleEditor = useEditor(
    {
      extensions: [
        Document.extend({
          content: "heading",
        }),
        Text,
        Heading.configure({
          levels: [1],
        }),
        Placeholder.configure({
          placeholder: "Enter a title",
        }),
      ],

      editable,
    },
    [blockID, editable]
  );

  const contentEditor = useEditor(
    {
      extensions: [
        // Nodes
        Document,
        Text,
        Paragraph,
        Blockquote.extend({
          addInputRules: () => [],
        }),
        Heading.configure({
          levels: [1, 2, 3],
        }),

        // Format
        Bold,
        Italic,
        Strike,
        Underline,
        Highlight,
        Link,
        Code,
        Subscript,
        Superscript,

        // Extensions

        Focus,
        Dropcursor.configure({
          width: 3,
          color: "#BFE5F4",
          class: "drop-cursor",
        }),

        Placeholder.configure({
          placeholder: `Write your ${type} here...`,
        }),
      ],
      editable,
    },
    [blockID, editable]
  );

  return (
    <div className={styles.editorContainer}>
      {type === TextBlockType.TITLE ? (
        <EditorContent
          className={styles.titleEditor}
          editor={titleEditor}
          onKeyDown={handleTitleEditorKeyDown}
          spellCheck="false"
        />
      ) : (
        <EditorContent
          className={styles.contentEditor}
          editor={contentEditor}
          spellCheck="false"
        />
      )}
      {contentEditor?.isEditable && <BubbleMenu editor={contentEditor} />}
    </div>
  );
}
