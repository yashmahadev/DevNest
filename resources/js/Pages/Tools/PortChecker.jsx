import { useState } from "react";
import { router } from "@inertiajs/react";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function PortChecker() {
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkPort = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(route("check-port"), { host, port });
      setResult(response.data);
    } catch (err) {
      alert("Error checking port.");
    }

    setLoading(false);
  };

  return (
    <ToolLayout title="Port Checker" description="Test if a specific port is open or closed on a remote server quickly and easily." keywords="port checker, check open ports, server port test, network port checker">
      <Card className="max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Port Checker</h1>

        <div className="space-y-2">
          <label>Hostname or IP</label>
          <Input
            placeholder="e.g. 127.0.0.1 or google.com"
            value={host}
            onChange={(e) => setHost(e.target.value)}
          />

          <label>Port</label>
          <Input
            placeholder="e.g. 80"
            value={port}
            onChange={(e) => setPort(e.target.value)}
            type="number"
          />
        </div>

        <Button onClick={checkPort} disabled={loading || !host || !port}>
          {loading ? "Checking..." : "Check Port"}
        </Button>

        {result && (
          <div className="mt-4 text-sm">
            <p>
              Host: <strong>{result.host}</strong>
            </p>
            <p>
              Port: <strong>{result.port}</strong>
            </p>
            <p>
              Status:{" "}
              <span className={result.open ? "text-green-500" : "text-red-500"}>
                {result.open ? "Open ✅" : "Closed ❌"}
              </span>
            </p>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
