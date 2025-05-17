<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use phpseclib3\File\X509;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Str;

class ToolController extends Controller
{
    public function decodeCertificate(Request $request)
    {
        $request->validate([
            'certificate' => 'required|string',
        ]);

        try {
            $x509 = new X509();
            $cert = $x509->loadX509($request->certificate);

            return response()->json([
                'subject' => $cert['tbsCertificate']['subject'] ?? null,
                'issuer' => $cert['tbsCertificate']['issuer'] ?? null,
                'validFrom' => $cert['tbsCertificate']['validity']['notBefore']['utcTime'] ?? null,
                'validTo' => $cert['tbsCertificate']['validity']['notAfter']['utcTime'] ?? null,
                'serialNumber' => $cert['tbsCertificate']['serialNumber']->toString() ?? null,
                'signatureAlgorithm' => $cert['tbsCertificate']['signature']['algorithm']['algorithm'] ?? null,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Invalid certificate format or parsing failed.',
                'message' => $e->getMessage()
            ], 422);
        }
    }

    public function convert(Request $request)
    {
        $request->validate([
            'image' => 'required|file|image|max:5120',
            'format' => 'required|string|in:jpg,png,webp',
        ]);

        $file = $request->file('image');
        $format = $request->input('format');

        $image = Image::make($file)->encode($format);

        $filename = Str::uuid() . '.' . $format;
        $path = 'converted/' . $filename;

        Storage::disk('public')->put($path, $image);

        return response()->json([
            'url' => Storage::url($path),
            'name' => $filename
        ]);
    }
}
