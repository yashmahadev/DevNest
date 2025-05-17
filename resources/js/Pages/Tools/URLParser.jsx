import { useState } from "react";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

function parseQueryParams(queryString) {
  if (!queryString) return {};
  return Object.fromEntries(new URLSearchParams(queryString));
}

export default function URLParser() {
  const [url, setUrl] = useState("");
  const [parsed, setParsed] = useState(null);
  const [error, setError] = useState(null);

  const handleParse = () => {
    setError(null);
    setParsed(null);
    if (!url) {
      setError("Please enter a URL");
      return;
    }
    try {
      const urlObj = new URL(url);
      setParsed({
        protocol: urlObj.protocol,
        host: urlObj.hostname,
        port: urlObj.port || "(none)",
        path: urlObj.pathname,
        query: parseQueryParams(urlObj.search),
        hash: urlObj.hash || "(none)",
      });
    } catch (e) {
      setError("Invalid URL: " + e.message);
    }
  };

  return (
    <ToolLayout title="URL Parser" description="Parse URLs into components like protocol, host, path, query, and fragment." keywords="URL parser, parse URL, URL components, URL analysis">
      <Card className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">URL Parser</h1>

        <div>
          <label className="block mb-1 font-medium">Enter URL</label>
          <Input
            type="text"
            placeholder="https://example.com/path?foo=bar#section"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleParse()}
          />
        </div>

        <button
          onClick={handleParse}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Parse URL
        </button>

        {error && (
          <p className="mt-4 text-red-600 font-semibold">{error}</p>
        )}

        {parsed && (
          <div className="mt-6 bg-gray-50 p-4 rounded border">
            <h2 className="font-semibold text-lg mb-2">Parsed Components:</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Protocol:</strong> {parsed.protocol}</li>
              <li><strong>Host:</strong> {parsed.host}</li>
              <li><strong>Port:</strong> {parsed.port}</li>
              <li><strong>Path:</strong> {parsed.path}</li>
              <li>
                <strong>Query Parameters:</strong>
                {Object.keys(parsed.query).length === 0 ? (
                  <span> (none)</span>
                ) : (
                  <ul className="list-disc list-inside ml-5">
                    {Object.entries(parsed.query).map(([key, value]) => (
                      <li key={key}>
                        <code>{key}</code>: <code>{value}</code>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li><strong>Hash:</strong> {parsed.hash}</li>
            </ul>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
