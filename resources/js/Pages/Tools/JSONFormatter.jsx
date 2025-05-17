import { useState } from "react";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);

  const formatJSON = () => {
    setError(null);
    try {
      const parsed = JSON.parse(input);
      const pretty = JSON.stringify(parsed, null, 2);
      setOutput(pretty);
    } catch (err) {
      setError("Invalid JSON: " + err.message);
      setOutput("");
    }
  };

  const minifyJSON = () => {
    setError(null);
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (err) {
      setError("Invalid JSON: " + err.message);
      setOutput("");
    }
  };

  const validateJSON = () => {
    setError(null);
    try {
      JSON.parse(input);
      setError("✅ Valid JSON");
      setOutput("");
    } catch (err) {
      setError("Invalid JSON: " + err.message);
      setOutput("");
    }
  };

  return (
    <ToolLayout title="JSON Formatter & Validator" description="Beautify and format JSON data for better readability and debugging." keywords="JSON formatter, format JSON, beautify JSON, JSON pretty print">
      <Card className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">JSON Formatter & Validator</h1>

        <Textarea
          placeholder="Paste your JSON here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[180px]"
        />

        <div className="flex gap-3">
          <Button onClick={formatJSON}>Format JSON</Button>
          <Button onClick={minifyJSON}>Minify JSON</Button>
          <Button onClick={validateJSON}>Validate JSON</Button>
        </div>

        {error && (
          <div
            className={`${
              error.startsWith("✅") ? "text-green-600" : "text-red-600"
            } font-semibold mt-3`}
          >
            {error}
          </div>
        )}

        {output && (
          <>
            <h2 className="mt-4 font-semibold">Output:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-80 whitespace-pre-wrap break-words">
              {output}
            </pre>
          </>
        )}
      </Card>
    </ToolLayout>
  );
}
