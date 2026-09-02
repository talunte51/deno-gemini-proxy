const GEMINI_API_HOST = "generativelanguage.googleapis.com";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization,x-goog-api-key",
  "Access-Control-Max-Age": "86400",
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  const url = new URL(request.url);
  url.hostname = GEMINI_API_HOST;
  url.protocol = "https";

  const newHeaders = new Headers(request.headers);
  
  // 从 Authorization header 提取 API Key
  const auth = request.headers.get("Authorization");
  if (auth) {
    const apiKey = auth.replace("Bearer ", "");
    url.searchParams.set("key", apiKey);
    newHeaders.set("x-goog-api-key", apiKey);
  }

  const newRequest = new Request(url.toString(), {
    method: request.method,
    headers: newHeaders,
    body: request.body,
    redirect: "follow",
  });

  return await fetch(newRequest);
});
