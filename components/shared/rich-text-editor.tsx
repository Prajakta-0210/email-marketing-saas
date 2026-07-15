"use client";

import { useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  Heading2,
  Quote,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

const toolbarActions = [
  { command: "bold", icon: Bold, label: "Bold" },
  { command: "italic", icon: Italic, label: "Italic" },
  { command: "underline", icon: Underline, label: "Underline" },
  { command: "formatBlock:h2", icon: Heading2, label: "Heading" },
  { command: "insertUnorderedList", icon: List, label: "Bulleted list" },
  { command: "insertOrderedList", icon: ListOrdered, label: "Numbered list" },
  { command: "formatBlock:blockquote", icon: Quote, label: "Quote" },
  { command: "createLink", icon: Link2, label: "Insert link" },
] as const;

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your email…",
  className,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const didInit = useRef(false);

  useEffect(() => {
    if (!didInit.current && editorRef.current) {
      editorRef.current.innerHTML = value;
      didInit.current = true;
    }
    // Only runs once on mount — the editor is intentionally uncontrolled
    // after that so typing doesn't reset the cursor position.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function exec(command: string) {
    editorRef.current?.focus();
    if (command === "createLink") {
      const url = window.prompt("Enter a URL");
      if (url) document.execCommand("createLink", false, url);
    } else if (command.startsWith("formatBlock:")) {
      const tag = command.split(":")[1];
      document.execCommand("formatBlock", false, tag);
    } else {
      document.execCommand(command, false);
    }
    onChange(editorRef.current?.innerHTML ?? "");
  }

  return (
    <div className={cn("overflow-hidden rounded-lg border border-input bg-background", className)}>
      <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-100 bg-gray-50/60 p-1.5">
        {toolbarActions.map(({ command, icon: Icon, label }) => (
          <button
            key={command}
            type="button"
            onClick={() => exec(command)}
            title={label}
            aria-label={label}
            className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-gray-200/70 hover:text-gray-900"
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        data-placeholder={placeholder}
        className={cn(
          "min-h-[220px] px-4 py-3 text-sm leading-relaxed text-gray-800 focus:outline-none",
          "[&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-2 [&_h2]:mb-1",
          "[&_blockquote]:border-l-2 [&_blockquote]:border-primary-300 [&_blockquote]:pl-3 [&_blockquote]:text-gray-500 [&_blockquote]:italic",
          "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
          "[&_a]:text-primary-600 [&_a]:underline",
          "empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground"
        )}
      />
    </div>
  );
}
