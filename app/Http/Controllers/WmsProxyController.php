<?php

namespace App\App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;

class WmsProxyController extends Controller
{
    public function getTile(Request $request)
    {
        // Define your WMS server details
        $wmsUrl = 'https://ringerike.geminisuite.com/portal/api/proxy/map/va-basis.wms';

        // Define your username and password
        $username = env('VITE_WMS_USER');
        $password = env('VITE_WMS_PASS');

        try {
            // Initialize Guzzle client
            $client = new Client();

            // Make the request to the WMS server with the basic authentication credentials
            $response = $client->get($wmsUrl, [
                'headers' => [
                    'Authorization' => 'Basic ' . base64_encode($username . ':' . $password),
                ],
                'query' => $request->query(), // Forward all query parameters
            ]);

            // Get the image content and content type from the response
            $imageContent = $response->getBody()->getContents();
            $contentType = $response->getHeaderLine('Content-Type');

            // Return the image to the client
            return response($imageContent)->header('Content-Type', $contentType);

        } catch (RequestException $e) {
            Log::error('WMS proxy error', ['exception' => $e->getMessage()]);
            return response('WMS proxy error', 500);
        }
    }
}