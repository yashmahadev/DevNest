import { useState } from "react";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function base64UrlDecode(str) {
  // Replace URL-safe characters and pad with =
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) {
    str += "=";
  }
  try {
    return decodeURIComponent(
      atob(str)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  } catch (e) {
    return null;
  }
}

export default function JWT() {
  const [jwt, setJwt] = useState("");
  const [header, setHeader] = useState(null);
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState(null);

  const decodeJWT = () => {
    setError(null);
    setHeader(null);
    setPayload(null);

    if (!jwt) {
      setError("Please enter a JWT token.");
      return;
    }

    const parts = jwt.split(".");
    if (parts.length !== 3) {
      setError("Invalid JWT format: should have 3 parts separated by dots.");
      return;
    }

    try {
      const decodedHeader = base64UrlDecode(parts[0]);
      const decodedPayload = base64UrlDecode(parts[1]);

      if (!decodedHeader || !decodedPayload) {
        setError("Failed to decode Base64Url parts.");
        return;
      }

      setHeader(JSON.parse(decodedHeader));
      setPayload(JSON.parse(decodedPayload));
    } catch (e) {
      setError("Error parsing JWT JSON: " + e.message);
    }
  };

  return (
    <ToolLayout title="JWT Decoder & Validator" description="Create custom JSON Web Tokens (JWT) with your own payload and secret keys." keywords="JWT generator, create JWT, JSON web token, token generation">
      <Card className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">JWT Decoder & Validator</h1>

        <Textarea
          placeholder="Paste your JWT token here"
          value={jwt}
          onChange={(e) => setJwt(e.target.value.trim())}
          className="min-h-[120px]"
        />

        <div className="flex justify-end gap-2">
          <Button onClick={decodeJWT}>Decode JWT</Button>
        </div>

        {error && (
          <div className="text-red-600 font-semibold">
            ⚠️ {error}
          </div>
        )}

        {header && payload && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Header</h2>
              <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                {JSON.stringify(header, null, 2)}
              </pre>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Payload</h2>
              <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                {JSON.stringify(payload, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
