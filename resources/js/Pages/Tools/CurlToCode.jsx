import { useState, useEffect } from "react";
import ToolLayout from "@/components/Layout/ToolLayout";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Use a lightweight alternative approach instead of curlconverter
const parseCurlCommand = (curlCommand) => {
    // Basic curl command parsing
    let method = "GET";
    let url = "";
    let headers = {};
    let data = null;

    // Extract URL
    const urlMatch = curlCommand.match(/curl\s+['"]?([^'">\s]+)['"]?/i);
    if (urlMatch && urlMatch[1]) {
        url = urlMatch[1];
    }

    // Check for method
    if (curlCommand.includes("-X ")) {
        const methodMatch = curlCommand.match(/-X\s+([A-Z]+)/i);
        if (methodMatch && methodMatch[1]) {
            method = methodMatch[1].toUpperCase();
        }
    } else if (curlCommand.includes("--request ")) {
        const methodMatch = curlCommand.match(/--request\s+([A-Z]+)/i);
        if (methodMatch && methodMatch[1]) {
            method = methodMatch[1].toUpperCase();
        }
    } else if (curlCommand.includes("-d ") || curlCommand.includes("--data ")) {
        method = "POST"; // If data is provided without explicit method, it's typically POST
    }

    // Extract headers
    const headerMatches = curlCommand.matchAll(/-H\s+['"]([^'"]+)['"]|--header\s+['"]([^'"]+)['"]|--header=(['"])([^'"]+)\3/gi);
    for (const match of headerMatches) {
        const headerStr = match[1] || match[2] || match[4];
        if (headerStr) {
            const separatorIndex = headerStr.indexOf(':');
            if (separatorIndex !== -1) {
                const key = headerStr.substring(0, separatorIndex).trim();
                const value = headerStr.substring(separatorIndex + 1).trim();
                headers[key] = value;
            }
        }
    }

    // Extract data
    const dataMatch = curlCommand.match(/-d\s+['"]([^'"]+)['"]|--data\s+['"]([^'"]+)['"]|--data=(['"])([^'"]+)\3/i);
    if (dataMatch) {
        data = dataMatch[1] || dataMatch[2] || dataMatch[4];
    }

    return { method, url, headers, data };
};

// Convert the parsed curl to different languages
const generateCode = (parsedCurl, language) => {
    const { method, url, headers, data } = parsedCurl;

    switch (language) {
        case "javascript":
            return generateJavaScriptCode(method, url, headers, data);
        case "python":
            return generatePythonCode(method, url, headers, data);
        case "php":
            return generatePhpCode(method, url, headers, data);
        case "java":
            return generateJavaCode(method, url, headers, data);
        case "bash":
            return generateBashCode(method, url, headers, data);
        default:
            return generateJavaScriptCode(method, url, headers, data);
    }
};

const generateJavaScriptCode = (method, url, headers, data) => {
    let code = `// JavaScript (fetch)\n`;
    code += `fetch("${url}", {\n`;
    code += `  method: "${method}",\n`;

    if (Object.keys(headers).length > 0) {
        code += `  headers: {\n`;
        for (const [key, value] of Object.entries(headers)) {
            code += `    "${key}": "${value}",\n`;
        }
        code += `  },\n`;
    }

    if (data) {
        // Check if data is JSON
        if (headers["Content-Type"]?.includes("application/json")) {
            try {
                // Try to format as proper JSON if possible
                const jsonData = JSON.parse(data);
                code += `  body: JSON.stringify(${JSON.stringify(jsonData, null, 4).replace(/^/gm, '  ')})\n`;
            } catch {
                code += `  body: "${data}"\n`;
            }
        } else {
            code += `  body: "${data}"\n`;
        }
    }

    code += `})\n`;
    code += `.then(response => response.json())\n`;
    code += `.then(data => console.log(data))\n`;
    code += `.catch(error => console.error('Error:', error));`;

    return code;
};

const generatePythonCode = (method, url, headers, data) => {
    let code = `# Python (requests)\n`;
    code += `import requests\n\n`;

    if (Object.keys(headers).length > 0) {
        code += `headers = {\n`;
        for (const [key, value] of Object.entries(headers)) {
            code += `    "${key}": "${value}",\n`;
        }
        code += `}\n\n`;
    } else {
        code += `headers = {}\n\n`;
    }

    if (data) {
        if (headers["Content-Type"]?.includes("application/json")) {
            try {
                const jsonData = JSON.parse(data);
                code += `data = ${JSON.stringify(jsonData, null, 4).replace(/^/gm, '')}\n\n`;
                code += `response = requests.${method.toLowerCase()}("${url}", headers=headers, json=data)\n`;
            } catch {
                code += `data = '${data}'\n\n`;
                code += `response = requests.${method.toLowerCase()}("${url}", headers=headers, data=data)\n`;
            }
        } else {
            code += `data = '${data}'\n\n`;
            code += `response = requests.${method.toLowerCase()}("${url}", headers=headers, data=data)\n`;
        }
    } else {
        code += `response = requests.${method.toLowerCase()}("${url}", headers=headers)\n`;
    }

    code += `print(response.json())`;

    return code;
};

const generatePhpCode = (method, url, headers, data) => {
    let code = `<?php\n`;
    code += `// PHP (curl)\n`;
    code += `$curl = curl_init();\n\n`;

    code += `curl_setopt_array($curl, [\n`;
    code += `    CURLOPT_URL => "${url}",\n`;
    code += `    CURLOPT_RETURNTRANSFER => true,\n`;
    code += `    CURLOPT_CUSTOMREQUEST => "${method}",\n`;

    if (Object.keys(headers).length > 0) {
        code += `    CURLOPT_HTTPHEADER => [\n`;
        for (const [key, value] of Object.entries(headers)) {
            code += `        "${key}: ${value}",\n`;
        }
        code += `    ],\n`;
    }

    if (data) {
        code += `    CURLOPT_POSTFIELDS => '${data}',\n`;
    }

    code += `]);\n\n`;

    code += `$response = curl_exec($curl);\n`;
    code += `$err = curl_error($curl);\n\n`;

    code += `curl_close($curl);\n\n`;

    code += `if ($err) {\n`;
    code += `    echo "cURL Error: " . $err;\n`;
    code += `} else {\n`;
    code += `    echo $response;\n`;
    code += `}\n`;

    return code;
};

const generateJavaCode = (method, url, headers, data) => {
    let code = `// Java (HttpClient - Java 11+)\n`;
    code += `import java.net.URI;\n`;
    code += `import java.net.http.HttpClient;\n`;
    code += `import java.net.http.HttpRequest;\n`;
    code += `import java.net.http.HttpResponse;\n\n`;

    code += `public class HttpClientExample {\n`;
    code += `    public static void main(String[] args) {\n`;
    code += `        try {\n`;
    code += `            HttpClient client = HttpClient.newHttpClient();\n\n`;

    code += `            HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()\n`;
    code += `                .uri(URI.create("${url}"))\n`;

    for (const [key, value] of Object.entries(headers)) {
        code += `                .header("${key}", "${value}")\n`;
    }

    if (data && method !== "GET") {
        code += `                .method("${method}", HttpRequest.BodyPublishers.ofString("${data}"));\n\n`;
    } else {
        code += `                .method("${method}", HttpRequest.BodyPublishers.noBody());\n\n`;
    }

    code += `            HttpRequest request = requestBuilder.build();\n\n`;
    code += `            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());\n\n`;
    code += `            System.out.println("Status code: " + response.statusCode());\n`;
    code += `            System.out.println("Response body: " + response.body());\n`;

    code += `        } catch (Exception e) {\n`;
    code += `            e.printStackTrace();\n`;
    code += `        }\n`;
    code += `    }\n`;
    code += `}`;

    return code;
};

const generateBashCode = (method, url, headers, data) => {
    // For bash, we'll just return the original command with some formatting
    let code = `# Original cURL command\n`;

    let bashCommand = `curl -X ${method} "${url}"`;

    for (const [key, value] of Object.entries(headers)) {
        bashCommand += ` \\\n  -H "${key}: ${value}"`;
    }

    if (data) {
        bashCommand += ` \\\n  -d '${data}'`;
    }

    code += bashCommand;

    return code;
};

export default function CurlToCode() {
    const [curlCommand, setCurlCommand] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [codeOutput, setCodeOutput] = useState("");
    const [error, setError] = useState(null);

    const convertCurl = () => {
        setError(null);
        try {
            if (!curlCommand.trim().toLowerCase().startsWith('curl ')) {
                throw new Error("Command must start with 'curl'");
            }

            const parsedCurl = parseCurlCommand(curlCommand);
            const code = generateCode(parsedCurl, language);
            setCodeOutput(code);
        } catch (err) {
            console.error("Conversion error:", err);
            setError(`Invalid cURL command or conversion error: ${err.message}`);
            setCodeOutput("");
        }
    }

    return (
        <ToolLayout title="Curl to Code Converter" description="Convert cURL commands to ready-to-use code snippets in multiple programming languages." keywords="cURL to code, curl converter, generate code from curl, HTTP request, API call">
            <Card className="max-w-4xl mx-auto p-6 space-y-6">
                <h1 className="text-2xl font-semibold">Curl to Code</h1>
                <div>
                    <label className="block font-medium mb-1">Enter cURL Command</label>
                    <Textarea
                        rows={6}
                        placeholder="Paste your cURL command here... (e.g., curl -X GET https://api.example.com -H 'Authorization: Bearer token')"
                        value={curlCommand}
                        onChange={(e) => setCurlCommand(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <label className="font-medium">Select Language:</label>
                    <select
                        className="border rounded p-2"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="javascript">JavaScript (fetch)</option>
                        <option value="python">Python (requests)</option>
                        <option value="php">PHP (curl)</option>
                        <option value="java">Java (HttpClient)</option>
                        <option value="bash">Bash (cURL)</option>
                    </select>
                    <Button onClick={convertCurl} disabled={!curlCommand.trim()}>
                        Convert
                    </Button>
                </div>
                {error && <p className="text-red-600 font-semibold mt-2">{error}</p>}
                {codeOutput && (
                    <div>
                        <label className="block font-medium mb-1">Generated Code:</label>
                        <pre className="bg-gray-100 p-4 rounded overflow-auto whitespace-pre-wrap max-h-96">
                            {codeOutput}
                        </pre>
                    </div>
                )}
            </Card>
        </ToolLayout>
    );
}
