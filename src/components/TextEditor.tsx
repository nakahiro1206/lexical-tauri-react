"use client";

import { useEffect, useState, useRef } from "react";

/* Lexical Design System */
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import {
  TRANSFORMERS,
  $convertToMarkdownString,
  $convertFromMarkdownString,
} from "@lexical/markdown";

/* Lexical Plugins Local */
// import TreeViewPlugin from "@/components/TreeViewPlugin";
import ToolbarPlugin from "@/components/ToolbarPlugin";
import AutoLinkPlugin from "@/components/AutoLinkPlugin";
import CodeHighlightPlugin from "@/components/CodeHighlightPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

/* Lexical Plugins Remote */
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
// import { TablePlugin } from "@lexical/react/LexicalTablePlugin";

/* Lexical Others */
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import exampleTheme from "@/themes/ExampleTheme";

/* Lexical Texts */
// import { textDailyStandup } from "@/editorState/textDailyStandup";
import { initText } from "@/editorState/loadFile";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
  // The editor theme
  theme: exampleTheme,
  namespace: "daily-standup-editor",
  editorState: () => $convertFromMarkdownString(initText, TRANSFORMERS),
  // Handling of errors during update
  onError(error: unknown) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

const EditorListenerPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregisterListener = editor.registerUpdateListener(
      ({ editorState }) => {
        // An update has occurred!
        console.log(editorState);
        editor.read(() => {
          const markdown = $convertToMarkdownString(TRANSFORMERS);
          console.log("markdown", markdown);
        });
      },
    );
    // editorReadyCallback(editor);
    return () => {
      unregisterListener();
    };
  }, [editor]);
  return null;
};

export function Editor(): JSX.Element | null {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <input
        type="file"
        id="file"
        ref={inputFile}
        accept="image/png"
        // style={{ display: "none" }}
      />
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <ListPlugin />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <CodeHighlightPlugin />
            <LinkPlugin />
            <TabIndentationPlugin />
            <AutoLinkPlugin />
            {/* <TablePlugin /> */}
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            {/* <TreeViewPlugin /> */}
            {/* <EditorListenerPlugin /> */}
          </div>
        </div>
      </LexicalComposer>
    </>
  );
}
