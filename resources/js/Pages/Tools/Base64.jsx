
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToolLayout from "@/components/Layout/ToolLayout";

export default function Base64() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');

  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (e) {
      setOutput('Invalid Base64 input!');
    }
  };

  return (
    <ToolLayout title="Base64 Tool" description="Encode and decode Base64 strings quickly with this simple and free online tool." keywords="Base64 encoder, Base64 decoder, online Base64 tool, encode Base64, decode Base64">
      <Card className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Base64 {mode === 'encode' ? 'Encoder' : 'Decoder'}</h1>

        <Textarea
          placeholder="Enter your text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[120px]"
        />

        <div className="flex items-center gap-2">
          <Button
            variant={mode === 'encode' ? 'default' : 'outline'}
            onClick={() => setMode('encode')}
          >
            Encode
          </Button>
          <Button
            variant={mode === 'decode' ? 'default' : 'outline'}
            onClick={() => setMode('decode')}
          >
            Decode
          </Button>
          <Button onClick={handleConvert}>
            Convert
          </Button>
        </div>

        <Textarea
          readOnly
          placeholder="Result will appear here..."
          value={output}
          className="bg-muted min-h-[120px]"
        />
      </Card>
    </ToolLayout>
  );
}
