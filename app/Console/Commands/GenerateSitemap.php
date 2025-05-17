<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class GenerateSitemap extends Command
{
    protected $signature = 'generate:sitemap';

    protected $description = 'Generate sitemap for DevNest tools';

    public function handle()
    {
        $sitemap = Sitemap::create();

        $tools = [
            'base64',
            'jwt-decoder',
            'json-formatter',
            'regex-tester',
            'url-parser',
            'uri-component',
            'uuid-generator',
            'ulid-generator',
            'rsa-key-generator',
            'aes-encrypt-decrypt',
            'sha-hasher',
            'md5-hasher',
            'hmac-sha-generator',
            'sql-formatter',
            'cron-parser',
            'qr-code-generator',
            'json-compare',
            'html-preview',
            'pgp-tool',
            'timestamp-converter',
            'port-checker',
            'text-diff',
            'markdown-preview',
            'curl-to-code',
            'certificate-decoder',
        ];

        foreach ($tools as $tool) {
            $sitemap->add(Url::create("/tools/{$tool}"));
        }

        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap generated successfully.');
    }
}
