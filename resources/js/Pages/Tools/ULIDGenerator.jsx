import { useState } from "react";
import { ulid } from "ulid";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ULIDGenerator() {
  const [ulidValue, setUlidValue] = useState(ulid());

  const generateULID = () => {
    setUlidValue(ulid());
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(ulidValue);
      alert("ULID copied to clipboard!");
    } catch (err) {
      alert("Failed to copy ULID.");
    }
  };

  return (
    <ToolLayout title="ULID Generator" description="Generate universally unique lexicographically sortable identifiers with ULID standard." keywords="ULID generator, unique ID generator, lexicographically sortable ID">
      <Card className="max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">ULID Generator</h1>

        <div className="space-y-4">
          <Input readOnly value={ulidValue} className="bg-gray-100" />

          <div className="flex gap-4">
            <Button onClick={generateULID}>Generate New ULID</Button>
            <Button variant="secondary" onClick={copyToClipboard}>Copy</Button>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
