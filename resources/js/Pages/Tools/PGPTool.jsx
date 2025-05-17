import { useState } from "react";
import * as openpgp from 'openpgp';
import ToolLayout from "@/components/Layout/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function PGPTool() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [passphrase, setPassphrase] = useState("123456");

  const [message, setMessage] = useState("Hello, this is a test.");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const generateKeys = async () => {
    const { privateKey, publicKey } = await openpgp.generateKey({
      type: 'rsa',
      rsaBits: 2048,
      userIDs: [{ name, email }],
      passphrase
    });

    setPublicKey(publicKey);
    setPrivateKey(privateKey);
  };

  const encryptMessage = async () => {
    const pubKey = await openpgp.readKey({ armoredKey: publicKey });

    const encrypted = await openpgp.encrypt({
      message: await openpgp.createMessage({ text: message }),
      encryptionKeys: pubKey,
    });

    setEncrypted(encrypted);
  };

  const decryptMessage = async () => {
    const privKey = await openpgp.decryptKey({
      privateKey: await openpgp.readPrivateKey({ armoredKey: privateKey }),
      passphrase,
    });

    const messageObj = await openpgp.readMessage({
      armoredMessage: encrypted
    });

    const { data: decrypted } = await openpgp.decrypt({
      message: messageObj,
      decryptionKeys: privKey
    });

    setDecrypted(decrypted);
  };

  return (
    <ToolLayout title="PGP Tool" description="Securely encrypt and decrypt messages using PGP encryption standards." keywords="PGP encryption, encrypt messages, decrypt messages, PGP tool">
      <Card className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-semibold">PGP Encryption Tool</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Passphrase" value={passphrase} onChange={(e) => setPassphrase(e.target.value)} />
        </div>

        <Button onClick={generateKeys}>Generate Key Pair</Button>

        {publicKey && (
          <div>
            <h2 className="font-semibold mt-4 mb-1">Public Key</h2>
            <Textarea className="min-h-[150px]" readOnly value={publicKey} />
          </div>
        )}
        {privateKey && (
          <div>
            <h2 className="font-semibold mt-4 mb-1">Private Key</h2>
            <Textarea className="min-h-[150px]" readOnly value={privateKey} />
          </div>
        )}

        <div>
          <h2 className="font-semibold">Message</h2>
          <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>

        <Button onClick={encryptMessage} disabled={!publicKey}>Encrypt Message</Button>
        {encrypted && (
          <div>
            <h2 className="font-semibold mt-4 mb-1">Encrypted Message</h2>
            <Textarea className="min-h-[150px]" readOnly value={encrypted} />
          </div>
        )}

        <Button onClick={decryptMessage} disabled={!privateKey || !encrypted}>Decrypt Message</Button>
        {decrypted && (
          <div>
            <h2 className="font-semibold mt-4 mb-1">Decrypted Message</h2>
            <Textarea className="min-h-[100px]" readOnly value={decrypted} />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
