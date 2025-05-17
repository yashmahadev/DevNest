import { useState } from "react";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from "sql-formatter";

export default function SqlFormatterTool() {
  const [sql, setSql] = useState("");
  const [formattedSql, setFormattedSql] = useState("");
  const [error, setError] = useState(null);
  const config = {
    language: 'spark',
    tabWidth: 4,
    keywordCase: 'upper',
    linesBetweenQueries: 2,
  };

  const formatSQL = () => {
    setError(null);
    try {
      const result = format(sql, config);
      setFormattedSql(result);
    } catch (e) {
      setError("Invalid SQL or formatting error: " + e.message);
    }
  };

  const clear = () => {
    setSql("");
    setFormattedSql("");
    setError(null);
  };

  return (
    <ToolLayout title="SQL Formatter" description="Format and beautify SQL queries for improved readability and debugging." keywords="SQL formatter, format SQL, beautify SQL, SQL pretty print">
      <Card className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">SQL Formatter</h1>

        <div>
          <label className="block font-medium mb-1">Raw SQL</label>
          <Textarea
            placeholder="Enter raw SQL query"
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="flex space-x-4">
          <Button onClick={formatSQL} disabled={!sql.trim()}>
            Format SQL
          </Button>
          <Button variant="secondary" onClick={clear}>
            Clear
          </Button>
        </div>

        {error && <p className="text-red-600 mt-2">{error}</p>}

        {formattedSql && (
          <div>
            <label className="block font-medium mt-4 mb-1">Formatted SQL</label>
            <Textarea
              readOnly
              value={formattedSql}
              className="min-h-[120px] bg-gray-50"
            />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
