import { useState } from "react";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function HmacShaGenerator() {
  const [message, setMessage] = useState("");
  const [secret, setSecret] = useState("");
  const [algorithm, setAlgorithm] = useState("SHA-256");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateHMAC = async () => {
    setError(null);
    setLoading(true);
    setResult("");
    try {
      const enc = new TextEncoder();
      const keyData = enc.encode(secret);
      const msgData = enc.encode(message);

      const cryptoKey = await window.crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: { name: algorithm } },
        false,
        ["sign"]
      );

      const signature = await window.crypto.subtle.sign(
        "HMAC",
        cryptoKey,
        msgData
      );

      setResult(toHex(signature));
    } catch (e) {
      setError("Error generating HMAC: " + e.message);
    }
    setLoading(false);
  };

  return (
    <ToolLayout title="HMAC SHA Generator" description="Generate HMAC SHA hashes for secure data authentication and integrity verification." keywords="HMAC SHA generator, hash generator, data authentication, SHA hashing">
      <Card className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">HMAC SHA Generator</h1>

        <div>
          <label className="block font-medium mb-1">Message</label>
          <Textarea
            placeholder="Enter message to hash"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Secret Key</label>
          <Input
            type="text"
            placeholder="Enter secret key"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Algorithm</label>
          <select
            className="w-full border border-gray-300 rounded p-2"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="SHA-1">SHA-1</option>
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-384">SHA-384</option>
            <option value="SHA-512">SHA-512</option>
          </select>
        </div>

        <Button
          onClick={generateHMAC}
          disabled={!message.trim() || !secret.trim() || loading}
        >
          {loading ? "Generating..." : "Generate HMAC"}
        </Button>

        {error && <p className="text-red-600 mt-2">{error}</p>}

        {result && (
          <div>
            <label className="block font-medium mt-4 mb-1">HMAC Result (hex)</label>
            <Textarea readOnly className="min-h-[80px]" value={result} />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
