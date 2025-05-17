import { useState } from "react";
import { marked } from "marked";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState("# Hello Markdown!");

  // Convert markdown to sanitized HTML
  const getMarkdownText = () => {
    const rawMarkup = marked.parse(markdown, { breaks: true, gfm: true });
    return { __html: rawMarkup };
  };

  return (
    <ToolLayout title="Markdown Preview Tool" description="	Render and preview Markdown files or text live for easy content formatting checks." keywords="Markdown preview, Markdown renderer, live markdown, markdown editor">
      <Card className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Markdown Preview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-medium block mb-1">Markdown Input</label>
            <Textarea
              rows={15}
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Type your markdown here..."
            />
          </div>

          <div>
            <label className="font-medium block mb-1">Preview</label>
            <div
              className="prose max-w-none p-4 border rounded bg-white overflow-auto min-h-[300px]"
              dangerouslySetInnerHTML={getMarkdownText()}
            />
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
