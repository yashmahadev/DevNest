import { useState } from "react";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CronExpressionParser } from "cron-parser";
import cronstrue from "cronstrue";

export default function CronParser() {
  const [cronExpr, setCronExpr] = useState("");
  const [error, setError] = useState(null);
  const [nextRuns, setNextRuns] = useState([]);
  const [description, setDescription] = useState("");

  const parseCron = () => {
    setError(null);
    setNextRuns([]);
    setDescription("");

    try {
      setError("");
      // Get human-readable description using cronstrue
      const desc = cronstrue.toString(cronExpr, { use24HourTimeFormat: true });
      setDescription(desc);

      // Get next 5 run dates using cron-parser
      const interval = CronExpressionParser.parse(cronExpr);
      const runs = [];
      for (let i = 0; i < 5; i++) {
        runs.push(interval.next().toDate());
      }
      setNextRuns(runs);
    } catch (err) {
      setError("Invalid cron expression: " + err.message);
    }
  };

  return (
    <ToolLayout title="Cron Parser" description="Parse and explain cron schedules with next run time calculation for easy cron management." keywords="cron parser, cron expression, schedule cron jobs, cron next run time">
      <Card className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Cron Parser</h1>

        <div>
          <label className="block mb-1 font-medium">Cron Expression</label>
          <Input
            type="text"
            placeholder="e.g. */5 * * * *"
            value={cronExpr}
            onChange={(e) => setCronExpr(e.target.value)}
          />
        </div>

        <Button onClick={parseCron} disabled={!cronExpr.trim()}>
          Parse Cron
        </Button>

        {error && <p className="text-red-600 font-semibold mt-2">{error}</p>}

        {description && (
          <p className="mt-4 p-3 bg-gray-100 rounded border">
            <strong>Description:</strong> {description}
          </p>
        )}

        {nextRuns.length > 0 && (
          <div className="mt-4">
            <h2 className="font-semibold mb-2">Next 5 Run Times:</h2>
            <ul className="list-disc list-inside space-y-1">
              {nextRuns.map((run, i) => (
                <li key={i}>{format(run, "yyyy-MM-dd HH:mm:ss")}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
