import { useState } from "react";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ShaHasher() {
  const [inputText, setInputText] = useState("");
  const [hashAlgorithm, setHashAlgorithm] = useState("SHA-256");
  const [hashResult, setHashResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Convert ArrayBuffer to hex string
  const bufferToHex = (buffer) => {
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const generateHash = async () => {
    setLoading(true);
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(inputText);
      const hashBuffer = await window.crypto.subtle.digest(hashAlgorithm, data);
      const hashHex = bufferToHex(hashBuffer);
      setHashResult(hashHex);
    } catch (e) {
      setHashResult("Error hashing input.");
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <ToolLayout title="SHA Hasher" description="Compute SHA-1, SHA-256, and SHA-512 hashes for your data securely and efficiently." keywords="SHA hasher, SHA hash generator, SHA-1, SHA-256, SHA-512">
      <Card className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">SHA Hasher</h1>

        <div>
          <label className="block font-medium mb-1">Input Text</label>
          <Textarea
            placeholder="Enter text to hash"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Select Hash Algorithm</label>
          <select
            value={hashAlgorithm}
            onChange={(e) => setHashAlgorithm(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-1">SHA-1</option>
            <option value="SHA-512">SHA-512</option>
          </select>
        </div>

        <Button onClick={generateHash} disabled={loading || !inputText.trim()}>
          {loading ? "Hashing..." : "Generate Hash"}
        </Button>

        {hashResult && (
          <div>
            <label className="block font-medium mt-4 mb-1">Hash Result (hex)</label>
            <Textarea readOnly className="min-h-[120px]" value={hashResult} />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
