<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PortCheckerController;
use App\Http\Controllers\ToolController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// require __DIR__.'/auth.php';


Route::get('/', fn () => Inertia::render('Home'))->name('home');
Route::get('/tools/base64', function () {
return Inertia::render('Tools/Base64');
})->name('tools.base64');

Route::get('/tools/jwt', function () {
    return Inertia::render('Tools/JWT');
})->name('tools.jwt-decoder');

Route::get('/tools/json-formatter', function () {
    return Inertia::render('Tools/JSONFormatter');
})->name('tools.json-formatter');

Route::get('/tools/regex-tester', function () {
    return Inertia::render('Tools/RegexTester');
})->name('tools.regex-tester');

Route::get('/tools/url-parser', function () {
    return Inertia::render('Tools/URLParser');
})->name('tools.url-parser');

Route::get('/tools/uri-encoder-decoder', function () {
    return Inertia::render('Tools/URIEncoderDecoder');
})->name('tools.uri-component');

Route::get('/tools/uuid-generator', function () {
    return Inertia::render('Tools/UUIDGenerator');
})->name('tools.uuid-generator');

Route::get('/tools/ulid-generator', function () {
    return Inertia::render('Tools/ULIDGenerator');
})->name('tools.ulid-generator');

Route::get('/tools/rsa-key-generator', function () {
    return Inertia::render('Tools/RSAKeyGenerator');
})->name('tools.rsa-key-generator');

Route::get('/tools/aes-encrypt-decrypt', function () {
    return Inertia::render('Tools/AesEncryptDecrypt');
})->name('tools.aes-encrypt-decrypt');

Route::get('/tools/sha-hasher', function () {
    return Inertia::render('Tools/ShaHasher');
})->name('tools.sha-hasher');

Route::get('/tools/md5-hasher', function () {
    return Inertia::render('Tools/MD5Hasher');
})->name('tools.md5-hasher');

Route::get('/tools/hmac-sha-generator', function () {
    return Inertia::render('Tools/HmacShaGenerator');
})->name('tools.hmac-sha-generator');

Route::get('/tools/sql-formatter', function () {
    return Inertia::render('Tools/SqlFormatterTool');
})->name('tools.sql-formatter');

Route::get('/tools/cron-parser', function () {
    return Inertia::render('Tools/CronParser');
})->name('tools.cron-parser');

Route::get('/tools/qr-code-generator', function () {
    return Inertia::render('Tools/QRCodeGenerator');
})->name('tools.qr-code-generator');

Route::get('/tools/json-compare', function () {
    return Inertia::render('Tools/JSONCompareTool');
})->name('tools.json-compare');

Route::get('/tools/html-preview', function () {
    return Inertia::render('Tools/HTMLPreviewTool');
})->name('tools.html-preview');

Route::get('/tools/pgp-tool', function () {
    return Inertia::render('Tools/PGPTool');
})->name('tools.pgp-tool');

Route::get('/tools/timestamp-converter', function () {
    return Inertia::render('Tools/TimestampConverter');
})->name('tools.timestamp-converter');

Route::get('/tools/port-checker', function () {
    return Inertia::render('Tools/PortChecker');
})->name('tools.port-checker');

Route::get('/tools/text-diff', function () {
    return Inertia::render('Tools/TextDiff');
})->name('tools.text-diff');

Route::get('/tools/markdown-preview', function () {
    return Inertia::render('Tools/MarkdownPreview');
})->name('tools.markdown-preview');

Route::get('/tools/curl-to-code', function () {
    return Inertia::render('Tools/CurlToCode');
})->name('tools.curl-to-code');

Route::get('/tools/certificate-decoder', function () {
    return Inertia::render('Tools/CertificateDecoder');
})->name('tools.certificate-decoder');

Route::get('/tools/image-converter', function () {
    return Inertia::render('Tools/ImageConverter');
})->name('tools.image-converter');




Route::post('/check-port', [PortCheckerController::class, 'check'])->name('check-port');
Route::post('/tools/certificate-decoder', [ToolController::class, 'decodeCertificate']);
Route::post('/api/convert-image', [ToolController::class, 'convert']);


// {
//     "name": "Snippet Manager",
//     "slug": "/tools/snippet-manager",
//     "icon": "ClipboardList",
//     "routeName": "tools.snippet-manager"
//   },
//   {
//     "name": "Image Converter",
//     "slug": "/tools/image-converter",
//     "icon": "Image",
//     "routeName": "tools.image-converter"
//   }

