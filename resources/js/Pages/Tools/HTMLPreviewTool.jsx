import { useState } from "react";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function HTMLPreviewTool() {
  const [html, setHtml] = useState("<h1>Hello, World!</h1>");
  const [previewKey, setPreviewKey] = useState(0);

  const refreshPreview = () => {
    // Force iframe refresh
    setPreviewKey((prev) => prev + 1);
  };

  return (
    <ToolLayout title="HTML Preview Tool" description="Live preview your HTML code instantly with this easy-to-use HTML renderer." keywords="HTML preview, HTML renderer, live HTML preview, online HTML editor">
      <Card className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">HTML Preview Tool</h1>

        <Textarea
          className="min-h-[200px]"
          placeholder="<h1>Type your HTML here</h1>"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
        />

        <Button onClick={refreshPreview}>Render Preview</Button>

        <div className="border rounded-lg overflow-hidden min-h-[300px]">
          <iframe
            key={previewKey}
            srcDoc={html}
            sandbox="allow-scripts allow-same-origin"
            title="HTML Preview"
            className="w-full h-[300px]"
          />
        </div>
      </Card>
    </ToolLayout>
  );
}
