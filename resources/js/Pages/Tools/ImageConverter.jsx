// resources/js/Pages/Tools/ImageConverter.jsx

import { useState } from 'react';
import axios from 'axios';
import ToolLayout from "@/components/Layout/ToolLayout";

export default function ImageConverter() {
  const [image, setImage] = useState(null);
  const [format, setFormat] = useState('png');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const convertImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('format', format);

    setLoading(true);
    try {
      const { data } = await axios.post('/api/convert-image', formData);
      setResult(data);
    } catch (err) {
      alert("Conversion failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout title="Image Converter" description="Convert images between popular formats like JPG, PNG, WebP, and more with ease." keywords="image converter, convert images, JPG to PNG, PNG to JPG, WebP converter">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files[0])}
            className="block w-full text-sm text-gray-500"
          />

          <select
            value={format}
            onChange={e => setFormat(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
            <option value="webp">WEBP</option>
          </select>

          <button
            onClick={convertImage}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Converting...' : 'Convert Image'}
          </button>
        </div>

        {result && (
          <div className="mt-6 text-center space-y-2">
            <p className="font-medium">Converted Image:</p>
            <img src={result.url} alt="Converted" className="mx-auto max-w-full rounded shadow" />
            <a
              href={result.url}
              download={result.name}
              className="text-blue-600 underline"
            >
              Download {result.name}
            </a>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
