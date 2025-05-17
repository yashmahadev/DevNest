import { useState } from "react";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function arrayBufferToBase64(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for(let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

export default function AesEncryptDecrypt() {
  const [keyHex, setKeyHex] = useState("");
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Generate random 256-bit AES key in hex
  const generateKey = () => {
    const array = new Uint8Array(32); // 256 bits
    window.crypto.getRandomValues(array);
    setKeyHex(Array.from(array).map(b => b.toString(16).padStart(2, "0")).join(""));
  };

  // Convert hex string to ArrayBuffer
  const hexToArrayBuffer = (hex) => {
    if (hex.length % 2 !== 0) throw new Error("Invalid key hex length");
    const bytes = new Uint8Array(hex.length / 2);
    for(let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes.buffer;
  };

  // Encrypt plaintext using AES-GCM
  const encrypt = async () => {
    setError("");
    setLoading(true);
    try {
      if (!keyHex) throw new Error("Enter AES key or generate one");
      const keyBuffer = hexToArrayBuffer(keyHex);
      const cryptoKey = await window.crypto.subtle.importKey(
        "raw",
        keyBuffer,
        "AES-GCM",
        false,
        ["encrypt"]
      );

      const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV
      const encodedText = new TextEncoder().encode(plaintext);
      const encryptedBuffer = await window.crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv,
        },
        cryptoKey,
        encodedText
      );

      // Combine IV + ciphertext, then encode base64
      const combined = new Uint8Array(iv.byteLength + encryptedBuffer.byteLength);
      combined.set(iv, 0);
      combined.set(new Uint8Array(encryptedBuffer), iv.byteLength);
      setCiphertext(arrayBufferToBase64(combined.buffer));
      setDecryptedText("");
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  // Decrypt ciphertext using AES-GCM
  const decrypt = async () => {
    setError("");
    setLoading(true);
    try {
      if (!keyHex) throw new Error("Enter AES key to decrypt");
      if (!ciphertext) throw new Error("Enter ciphertext to decrypt");

      const keyBuffer = hexToArrayBuffer(keyHex);
      const cryptoKey = await window.crypto.subtle.importKey(
        "raw",
        keyBuffer,
        "AES-GCM",
        false,
        ["decrypt"]
      );

      const combined = base64ToArrayBuffer(ciphertext);
      const combinedBytes = new Uint8Array(combined);
      const iv = combinedBytes.slice(0, 12); // first 12 bytes IV
      const data = combinedBytes.slice(12); // rest is ciphertext

      const decryptedBuffer = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv,
        },
        cryptoKey,
        data
      );

      const decoded = new TextDecoder().decode(decryptedBuffer);
      setDecryptedText(decoded);
    } catch (e) {
      setError("Decryption failed: " + e.message);
      setDecryptedText("");
    }
    setLoading(false);
  };

  return (
    <ToolLayout title="AES Encrypt/Decrypt" description="Encrypt or decrypt data using AES encryption online for free. Secure and easy to use." keywords="AES encryption, decrypt data, encrypt data, online AES tool, data security">
      <Card className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">AES Encrypt / Decrypt Tool</h1>

        <div>
          <label className="block font-medium mb-1">AES Key (hex, 64 chars for 256-bit):</label>
          <Input
            placeholder="Enter AES key in hex or generate one"
            value={keyHex}
            onChange={e => setKeyHex(e.target.value.trim())}
            className="mb-2"
          />
          <Button variant="secondary" onClick={generateKey}>Generate Random Key</Button>
        </div>

        <div>
          <label className="block font-medium mb-1">Plaintext:</label>
          <Textarea
            placeholder="Enter text to encrypt"
            value={plaintext}
            onChange={e => setPlaintext(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-x-4 mt-2">
          <Button onClick={encrypt} disabled={loading}>
            {loading ? "Encrypting..." : "Encrypt"}
          </Button>
          <Button onClick={decrypt} disabled={loading}>
            {loading ? "Decrypting..." : "Decrypt"}
          </Button>
        </div>

        {error && <p className="text-red-600 font-semibold mt-2">{error}</p>}

        {ciphertext && (
          <div>
            <label className="block font-medium mt-4 mb-1">Ciphertext (base64, includes IV):</label>
            <Textarea readOnly className="min-h-[100px]" value={ciphertext} />
          </div>
        )}

        {decryptedText && (
          <div>
            <label className="block font-medium mt-4 mb-1">Decrypted Text:</label>
            <Textarea readOnly className="min-h-[100px]" value={decryptedText} />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
