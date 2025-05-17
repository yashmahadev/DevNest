import { useState, useMemo } from "react";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

function highlightMatches(testString, regex) {
  if (!regex) return testString;

  const elements = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(testString)) !== null) {
    const [fullMatch] = match;
    const start = match.index;
    const end = start + fullMatch.length;

    // Push text before match
    if (lastIndex < start) {
      elements.push(
        <span key={lastIndex}>{testString.slice(lastIndex, start)}</span>
      );
    }

    // Push matched text with highlight
    elements.push(
      <mark key={start} className="bg-yellow-300 text-black">
        {testString.slice(start, end)}
      </mark>
    );

    lastIndex = end;

    // To avoid infinite loops with zero-length matches
    if (regex.lastIndex === start) {
      regex.lastIndex++;
    }
  }

  // Push remaining text
  if (lastIndex < testString.length) {
    elements.push(<span key={lastIndex}>{testString.slice(lastIndex)}</span>);
  }

  return elements;
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [error, setError] = useState(null);

  // Memoize regex object to avoid recalculations
  const regex = useMemo(() => {
    setError(null);
    if (!pattern) return null;
    try {
      return new RegExp(pattern, flags);
    } catch (e) {
      setError("Invalid regex pattern or flags: " + e.message);
      return null;
    }
  }, [pattern, flags]);

  // Get matches info
  const matches = useMemo(() => {
    if (!regex || !testString) return [];
    const results = [];
    let match;
    // Reset lastIndex for global matching
    regex.lastIndex = 0;
    while ((match = regex.exec(testString)) !== null) {
      results.push({
        match: match[0],
        groups: match.slice(1),
        index: match.index,
        length: match[0].length,
      });
      if (match[0].length === 0) {
        regex.lastIndex++;
      }
    }
    return results;
  }, [regex, testString]);

  return (
    <ToolLayout title="Regex Tester" description="Test and debug regular expressions with live match results and explanation." keywords="regex tester, regular expression tester, regex match, test regex">
      <Card className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Regex Tester</h1>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Pattern</label>
            <Input
              type="text"
              placeholder="Enter regex pattern"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Flags</label>
            <Input
              type="text"
              placeholder="e.g. g, i, m, s, u, y"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Test String</label>
            <Textarea
              placeholder="Enter text to test against"
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          {error && (
            <div className="text-red-600 font-semibold mt-2">{error}</div>
          )}

          {!error && regex && (
            <>
              <div>
                <h2 className="font-semibold mb-1">Highlighted Matches:</h2>
                <div className="p-4 border rounded whitespace-pre-wrap break-words bg-gray-50 min-h-[100px]">
                  {highlightMatches(testString, new RegExp(pattern, flags))}
                </div>
              </div>

              <div>
                <h2 className="font-semibold mt-4 mb-2">Matches List:</h2>
                {matches.length === 0 && (
                  <p className="italic text-gray-600">No matches found</p>
                )}
                {matches.length > 0 && (
                  <ol className="list-decimal list-inside space-y-2 max-h-48 overflow-auto">
                    {matches.map((m, i) => (
                      <li key={i} className="text-sm">
                        <span className="font-semibold">Match:</span> "{m.match}"{" "}
                        at index {m.index}, length {m.length}
                        {m.groups.length > 0 ? (
                          <>
                            <br />
                            <span className="font-semibold">Groups:</span>
                            <ul className="list-disc list-inside ml-5">
                              {m.groups.map((g, gi) => (
                                <li key={gi}>
                                  {g === undefined || g === null
                                    ? "<undefined>"
                                    : `"${g}"`}
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <>
                            <br />
                            <span className="italic text-gray-500">
                              No capturing groups
                            </span>
                          </>
                        )}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
