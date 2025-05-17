import { useState } from "react";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function RSAKeyGenerator() {
  const [publicKeyPem, setPublicKeyPem] = useState("");
  const [privateKeyPem, setPrivateKeyPem] = useState("");
  const [loading, setLoading] = useState(false);

  const generateRSAKeys = async () => {
    setLoading(true);
    setPublicKeyPem("");
    setPrivateKeyPem("");
    try {
      const keyPair = await window.crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: 2048,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
      );

      const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
      const privateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

      setPublicKeyPem(pemFormat(publicKey, "PUBLIC KEY"));
      setPrivateKeyPem(pemFormat(privateKey, "PRIVATE KEY"));
    } catch (error) {
      console.error("RSA generation error:", error);
    }
    setLoading(false);
  };

  const pemFormat = (binaryData, label) => {
    const base64 = window.btoa(String.fromCharCode(...new Uint8Array(binaryData)));
    const formatted = base64.match(/.{1,64}/g).join("\n");
    return `-----BEGIN ${label}-----\n${formatted}\n-----END ${label}-----`;
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch {
      alert("Failed to copy.");
    }
  };

  return (
    <ToolLayout title="RSA Key Generator" description="Generate secure RSA public/private key pairs for encryption and digital signatures." keywords="RSA key generator, generate RSA keys, public key, private key">
      <Card className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">RSA Key Generator</h1>

        <Button onClick={generateRSAKeys} disabled={loading}>
          {loading ? "Generating..." : "Generate RSA Keys"}
        </Button>

        {publicKeyPem && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <h2 className="font-semibold">Public Key</h2>
              <Button variant="secondary" onClick={() => copy(publicKeyPem)}>Copy</Button>
            </div>
            <Textarea readOnly className="min-h-[180px]">{publicKeyPem}</Textarea>
          </div>
        )}

        {privateKeyPem && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <h2 className="font-semibold">Private Key</h2>
              <Button variant="secondary" onClick={() => copy(privateKeyPem)}>Copy</Button>
            </div>
            <Textarea readOnly className="min-h-[180px]">{privateKeyPem}</Textarea>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
