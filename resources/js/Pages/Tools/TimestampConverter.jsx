import { useState } from "react";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [converted, setConverted] = useState(null);

  const convertToDateDetails = () => {
    const ts = parseInt(timestamp, 10);
    if (!isNaN(ts)) {
      const date = new Date(ts * 1000);
      setConverted({
        utc: date.toUTCString(),
        local: date.toString(),
        iso: date.toISOString(),
        rfc: date.toUTCString(),
      });
    } else {
      setConverted(null);
      alert("Invalid timestamp");
    }
  };

  const convertToTimestamp = () => {
    const date = new Date(dateInput);
    if (!isNaN(date.getTime())) {
      const ts = Math.floor(date.getTime() / 1000);
      setTimestamp(ts.toString());
      convertToDateDetails();
    } else {
      alert("Invalid date format");
    }
  };

  const useCurrentTime = () => {
    const now = Math.floor(Date.now() / 1000);
    setTimestamp(now.toString());
    const nowISO = new Date().toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
    setDateInput(nowISO);
    // convertToDateDetails();
  };

  return (
    <ToolLayout title="Timestamp Converter" description="Convert Unix timestamps to readable dates and back with timezone support." keywords="timestamp converter, unix timestamp, date converter, timestamp to date">
      <Card className="max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Timestamp Converter</h1>

        <div className="space-y-2">
          <label className="block font-medium">UNIX Timestamp (Seconds)</label>
          <Input
            type="text"
            placeholder="e.g. 1715946147"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
          />
          <Button onClick={convertToDateDetails}>Convert Timestamp</Button>
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Date (to convert to timestamp)</label>
          <Input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
          <Button onClick={convertToTimestamp}>Convert Date</Button>
        </div>

        <Button variant="secondary" onClick={useCurrentTime}>
          Use Current Time
        </Button>

        {converted && (
          <div className="mt-6 space-y-2 text-sm">
            <h2 className="font-semibold text-lg">Formatted Outputs</h2>
            <p><strong>UTC:</strong> {converted.utc}</p>
            <p><strong>Local:</strong> {converted.local}</p>
            <p><strong>ISO 8601:</strong> {converted.iso}</p>
            <p><strong>RFC 2822:</strong> {converted.rfc}</p>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
