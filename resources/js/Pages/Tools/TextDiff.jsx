import { useState } from "react";
import { diff_match_patch, DIFF_INSERT, DIFF_DELETE } from "diff-match-patch";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function TextDiff() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diffHtml, setDiffHtml] = useState("");

  const generateDiff = () => {
    const dmp = new diff_match_patch();
    const diffs = dmp.diff_main(text1, text2);
    dmp.diff_cleanupSemantic(diffs);

    const html = diffs.map(([op, data], i) => {
      let className = "";
      if (op === DIFF_INSERT) className = "bg-green-200 text-green-900";
      if (op === DIFF_DELETE) className = "bg-red-200 text-red-900 line-through";
      return `<span key=${i} class="${className}">${data}</span>`;
    }).join("");

    setDiffHtml(html);
  };

  return (
    <ToolLayout title="Text Diff Tool" description="Compare two text inputs and highlight differences with clear visual representation." keywords="text diff, text compare, compare texts, diff checker">
      <Card className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Text Diff Tool</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium block mb-1">Original Text</label>
            <Textarea value={text1} onChange={e => setText1(e.target.value)} rows={10} />
          </div>
          <div>
            <label className="font-medium block mb-1">Modified Text</label>
            <Textarea value={text2} onChange={e => setText2(e.target.value)} rows={10} />
          </div>
        </div>
        <Button onClick={generateDiff} disabled={!text1 && !text2}>Compare</Button>
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Diff Result:</h2>
          <div
            className="p-4 bg-gray-100 rounded whitespace-pre-wrap border text-sm overflow-auto"
            dangerouslySetInnerHTML={{ __html: diffHtml }}
          />
        </div>
      </Card>
    </ToolLayout>
  );
}
