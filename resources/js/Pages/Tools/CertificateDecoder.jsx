// resources/js/Pages/Tools/CertificateDecoder.jsx

import { useState } from 'react';
import axios from 'axios';
import ToolLayout from "@/components/Layout/ToolLayout";

export default function CertificateDecoder() {
  const [certificate, setCertificate] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const decodeCertificate = async () => {
    setError('');
    setResult(null);
    try {
      const response = await axios.post('/tools/certificate-decoder', { certificate });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <ToolLayout title="Certificate Decoder" description="Decode SSL/TLS certificates and view detailed certificate information instantly." keywords="certificate decoder, SSL certificate, TLS certificate, decode certificate">
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Certificate Decoder</h1>

        <textarea
          rows={10}
          value={certificate}
          onChange={(e) => setCertificate(e.target.value)}
          placeholder="Paste PEM certificate here..."
          className="w-full border rounded p-2 font-mono text-sm"
        />

        <button
          onClick={decodeCertificate}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Decode
        </button>

        {error && <p className="mt-4 text-red-600">{error}</p>}

        {result && (
          <div className="mt-6 bg-gray-100 border rounded p-4 overflow-auto">
            <h2 className="font-semibold mb-2">Decoded Output</h2>
            <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
