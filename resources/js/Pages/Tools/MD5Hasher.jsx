import { useState } from "react";
import SparkMD5 from "spark-md5";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function MD5Hasher() {
  const [inputText, setInputText] = useState("");
  const [hashResult, setHashResult] = useState("");

  const generateMD5 = () => {
    const hash = SparkMD5.hash(inputText);
    setHashResult(hash);
  };

  return (
    <ToolLayout title="MD5 Hasher" description="Generate MD5 hashes of any text string quickly for checksums and integrity validation." keywords="MD5 hasher, hash generator, MD5 checksum, text hash">
      <Card className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">MD5 Hasher</h1>

        <div>
          <label className="block font-medium mb-1">Input Text</label>
          <Textarea
            placeholder="Enter text to hash"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <Button
          onClick={generateMD5}
          disabled={!inputText.trim()}
        >
          Generate MD5 Hash
        </Button>

        {hashResult && (
          <div>
            <label className="block font-medium mt-4 mb-1">MD5 Hash Result</label>
            <Textarea readOnly className="min-h-[80px]" value={hashResult} />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
