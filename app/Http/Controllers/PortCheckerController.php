<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PortCheckerController extends Controller
{
    public function check(Request $request)
    {
        $request->validate([
            'host' => 'required|string',
            'port' => 'required|integer',
        ]);

        $host = $request->input('host');
        $port = $request->input('port');

        $timeout = 2; // seconds
        $status = false;

        try {
            $connection = @fsockopen($host, $port, $errno, $errstr, $timeout);
            if (is_resource($connection)) {
                fclose($connection);
                $status = true;
            }
        } catch (\Exception $e) {
            // Optional: log error
        }

        return response()->json([
            'host' => $host,
            'port' => $port,
            'open' => $status,
        ]);
    }
}
