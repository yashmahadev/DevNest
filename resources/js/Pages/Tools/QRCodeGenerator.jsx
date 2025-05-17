import { useState } from "react";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import QRCode from "qrcode";

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQRCode = async () => {
    if (!text.trim()) {
      alert("Please enter some text or URL");
      return;
    }
    setLoading(true);
    try {
      const url = await QRCode.toDataURL(text);
      setQrCodeUrl(url);
    } catch (err) {
      alert("Failed to generate QR code: " + err.message);
    }
    setLoading(false);
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Text copied to clipboard!");
    } catch {
      alert("Failed to copy.");
    }
  };

  return (
    <ToolLayout title="QR Code Generator" description="Generate customizable QR codes for URLs, texts, and contact information." keywords="QR code generator, generate QR code, QR code maker, QR code online">
      <Card className="max-w-md mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">QR Code Generator</h1>

        <div>
          <label className="block mb-1 font-medium">Enter Text or URL</label>
          <Input
            type="text"
            placeholder="Enter text or URL"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="flex space-x-4">
          <Button onClick={generateQRCode} disabled={loading}>
            {loading ? "Generating..." : "Generate QR Code"}
          </Button>
          <Button variant="secondary" onClick={copyText} disabled={!text.trim()}>
            Copy Text
          </Button>
        </div>

        {qrCodeUrl && (
          <div className="mt-4 flex justify-center">
            <img src={qrCodeUrl} alt="Generated QR Code" className="border p-2 rounded" />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
