"use client";
import { useEffect } from "react";
import {
  TRANSFORMERS,
  $convertToMarkdownString,
  $convertFromMarkdownString,
} from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export const LoadFilePlugin = () => {
  const sampleText = `## Title
    ### Heading 1

    This is a sample text.

    - List item 1

    - List item 2




sss
    The end.`;

  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {});
    $convertFromMarkdownString(sampleText, TRANSFORMERS);

    return;
  }, [editor]);

  return null;
};

export const initText = `## Title

### Heading 1

This is a sample text.

- List item 1
- List item 2

The end.

see [Nucleus](https://github.com/mellobacon/Nucleus)`;
