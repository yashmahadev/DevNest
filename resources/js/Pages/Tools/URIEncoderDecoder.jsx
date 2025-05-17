import { useState, useEffect } from "react";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function URIEncoderDecoder() {
  const [input, setInput] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const [decodeError, setDecodeError] = useState(null);

  useEffect(() => {
    setEncoded(encodeURIComponent(input));
    try {
      setDecoded(decodeURIComponent(input));
      setDecodeError(null);
    } catch (e) {
      setDecodeError("Invalid encoded URI component");
      setDecoded("");
    }
  }, [input]);

  return (
    <ToolLayout title="URI Component Encoder/Decoder" description="Encode or decode URI components safely for use in URLs and web requests." keywords="URI encoder, URI decoder, encode URI, decode URI, URL encoding">
      <Card className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">URI Component Encoder/Decoder</h1>

        <div>
          <label className="block mb-1 font-medium">Enter Text</label>
          <Textarea
            placeholder="Type or paste your string here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Encoded Result (encodeURIComponent)</label>
          <Input
            readOnly
            value={encoded}
            className="bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Decoded Result (decodeURIComponent)</label>
          {decodeError ? (
            <p className="text-red-600">{decodeError}</p>
          ) : (
            <Input
              readOnly
              value={decoded}
              className="bg-gray-100"
            />
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
