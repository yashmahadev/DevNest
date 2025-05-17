import { useState, useEffect } from "react";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function JSONCompareTool() {
  const [leftJson, setLeftJson] = useState("");
  const [rightJson, setRightJson] = useState("");
  const [diffHtml, setDiffHtml] = useState("");
  const [error, setError] = useState("");
  const [jsondiffpatch, setJsondiffpatch] = useState(null);

  // Load dependencies dynamically on client-side only
  useEffect(() => {
    // Load jsondiffpatch from CDN to avoid build issues
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jsondiffpatch/0.4.1/jsondiffpatch.umd.min.js";
    script.async = true;

    script.onload = () => {
      // Once loaded, the library is available as window.jsondiffpatch
      const diffpatcher = window.jsondiffpatch.create({
        objectHash: (obj) => JSON.stringify(obj),
        textDiff: { minLength: 60 },
      });
      setJsondiffpatch(diffpatcher);

      // Load the formatter styles
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/jsondiffpatch/0.4.1/formatters-styles/html.css";
      document.head.appendChild(link);

      // Add custom styles for better visualization
      const customStyles = document.createElement("style");
      customStyles.textContent = `
        .jsondiffpatch-delta {
          font-family: Menlo, Consolas, monospace;
          line-height: 1.5;
        }
        .jsondiffpatch-added .jsondiffpatch-property-name,
        .jsondiffpatch-added .jsondiffpatch-value pre,
        .jsondiffpatch-modified .jsondiffpatch-right-value pre {
          background-color: rgba(0, 128, 0, 0.15);
        }
        .jsondiffpatch-deleted .jsondiffpatch-property-name,
        .jsondiffpatch-deleted .jsondiffpatch-value pre,
        .jsondiffpatch-modified .jsondiffpatch-left-value pre {
          background-color: rgba(255, 0, 0, 0.15);
        }
        .jsondiffpatch-delta ul {
          padding-left: 20px;
        }
        /* Make nested objects more distinguishable */
        .jsondiffpatch-delta > ul > li {
          margin-bottom: 8px;
          padding-bottom: 8px;
          border-bottom: 1px dashed #e5e7eb;
        }
        .jsondiffpatch-delta > ul > li:last-child {
          border-bottom: none;
        }
      `;
      document.head.appendChild(customStyles);
    };

    script.onerror = () => {
      setError("Failed to load comparison library. Please try again later.");
    };

    document.body.appendChild(script);

    // Clean up
    return () => {
      document.body.removeChild(script);
      const customStyles = document.querySelector('style[data-jsondiffpatch-styles]');
      if (customStyles) {
        document.head.removeChild(customStyles);
      }
    };
  }, []);

  const compareJSON = () => {
    setError("");
    setDiffHtml("");

    if (!jsondiffpatch) {
      setError("Comparison library not loaded yet. Please try again in a moment.");
      return;
    }

    try {
      // Parse JSON inputs
      let left, right;

      try {
        left = JSON.parse(leftJson.trim());
      } catch (err) {
        setError("Invalid JSON in left panel: " + err.message);
        return;
      }

      try {
        right = JSON.parse(rightJson.trim());
      } catch (err) {
        setError("Invalid JSON in right panel: " + err.message);
        return;
      }

      // Generate diff
      const delta = jsondiffpatch.diff(left, right);
      if (!delta) {
        setDiffHtml("<p class='text-green-600 font-medium text-center py-4'>The two JSON objects are identical.</p>");
        return;
      }

      // Format the diff as HTML
      const html = window.jsondiffpatch.formatters.html.format(delta, left);
      setDiffHtml(html);
    } catch (err) {
      setError("Error comparing JSON: " + err.message);
    }
  };

  return (
    <ToolLayout title="JSON Compare Tool" description="Quickly compare and highlight differences between two JSON objects or files." keywords="JSON compare, JSON diff, JSON difference, compare JSON files">
      <Card className="max-w-6xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center mb-4">JSON Compare Tool</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block mb-1 font-medium">Original JSON</label>
            <Textarea
              value={leftJson}
              onChange={(e) => setLeftJson(e.target.value)}
              placeholder="Paste original JSON here"
              className="min-h-64 font-mono"
            />
          </div>
          <div className="space-y-2">
            <label className="block mb-1 font-medium">Modified JSON</label>
            <Textarea
              value={rightJson}
              onChange={(e) => setRightJson(e.target.value)}
              placeholder="Paste modified JSON here"
              className="min-h-64 font-mono"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={compareJSON}
            disabled={!jsondiffpatch || !leftJson.trim() || !rightJson.trim()}
            className="px-8"
          >
            {!jsondiffpatch ? "Loading..." : "Compare"}
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {diffHtml && (
          <div className="diff-result mt-6">
            <h2 className="text-xl font-medium mb-3">Comparison Results</h2>
            <div className="flex flex-wrap gap-4 items-center mb-4 bg-gray-50 p-3 rounded text-sm border">
              <div><span className="inline-block w-3 h-3 bg-green-200 mr-2"></span> Added</div>
              <div><span className="inline-block w-3 h-3 bg-red-200 mr-2"></span> Removed</div>
              <div><span className="inline-block w-3 h-3 bg-yellow-200 mr-2"></span> Changed</div>
              <div><span className="inline-block w-3 h-3 mr-2 border border-gray-400"></span> Unchanged</div>
            </div>
            <div
              className="jsondiffpatch-delta w-full border rounded-md shadow-sm p-4 bg-white overflow-x-auto text-sm"
              dangerouslySetInnerHTML={{ __html: diffHtml }}
            />

            <div className="mt-4 text-right">
              <button
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                onClick={() => {
                  if (window.jsondiffpatch?.formatters?.html) {
                    if (document.querySelector('.jsondiffpatch-delta .jsondiffpatch-unchanged')) {
                      window.jsondiffpatch.formatters.html.hideUnchanged();
                      event.target.textContent = "Show Unchanged Properties";
                    } else {
                      window.jsondiffpatch.formatters.html.showUnchanged();
                      event.target.textContent = "Hide Unchanged Properties";
                    }
                  }
                }}
              >
                Hide Unchanged Properties
              </button>
            </div>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
