import { useState } from "react";
import { v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5 } from "uuid";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const NAMESPACE_DNS = uuidv5.DNS;
const NAMESPACE_URL = uuidv5.URL;

export default function UUIDGenerator() {
  const [version, setVersion] = useState("v4");
  const [uuid, setUuid] = useState(uuidv4());
  const [name, setName] = useState("");
  const [namespaceType, setNamespaceType] = useState("DNS");

  const generateUUID = () => {
    try {
      let result = "";

      switch (version) {
        case "v1":
          result = uuidv1();
          break;
        case "v3":
          result = uuidv3(name, namespaceType === "DNS" ? NAMESPACE_DNS : NAMESPACE_URL);
          break;
        case "v4":
          result = uuidv4();
          break;
        case "v5":
          result = uuidv5(name, namespaceType === "DNS" ? NAMESPACE_DNS : NAMESPACE_URL);
          break;
        default:
          result = "Invalid version selected";
      }

      setUuid(result);
    } catch (err) {
      setUuid("Error generating UUID: " + err.message);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(uuid);
      alert("UUID copied to clipboard!");
    } catch {
      alert("Failed to copy.");
    }
  };

  return (
    <ToolLayout title="UUID Generator" description="Generate RFC-compliant UUIDs (v1, v4) for unique identification in software systems." keywords="UUID generator, generate UUID, unique ID, UUID v4, UUID v1">
      <Card className="max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">UUID Generator</h1>

        <div className="space-y-4">
          <div>
            {/* <Select value={version} onValueChange={setVersion}> */}
            {/* <Label>UUID Version</Label> */}
            {/* <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select UUID Version" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="v1">v1 - Timestamp</SelectItem>
                <SelectItem value="v3">v3 - Name-based (MD5)</SelectItem>
                <SelectItem value="v4">v4 - Random</SelectItem>
                <SelectItem value="v5">v5 - Name-based (SHA1)</SelectItem>
            </SelectContent>
            </Select> */}
          </div>

          {(version === "v3" || version === "v5") && (
            <>
              <div>
                <Label>Name</Label>
                <Input
                  placeholder="Enter name for UUID generation"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <Label>Namespace</Label>
                <Select value={namespaceType} onValueChange={setNamespaceType}>
                  <SelectItem value="DNS">DNS (default)</SelectItem>
                  <SelectItem value="URL">URL</SelectItem>
                </Select>
              </div>
            </>
          )}

          <div>
            <Label>Generated UUID</Label>
            <Input readOnly value={uuid} className="bg-gray-100" />
          </div>

          <div className="flex gap-4">
            <Button onClick={generateUUID}>Generate UUID</Button>
            <Button variant="secondary" onClick={copyToClipboard}>
              Copy
            </Button>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
