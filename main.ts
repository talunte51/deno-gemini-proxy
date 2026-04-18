import { GoogleGenAI } from "npm:@google/genai"

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Max-Age": "86400",
};

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(null, {
      status: 204,
      headers,
    });
  }

  const ai = new GoogleGenAI({ apiKey: Deno.env.get("GEMINI_API_KEY") })
  try {
    const response = await ai.models.generateContent(await req.json())
    console.log(response)
    return new Response(JSON.stringify(response, null, 2), { headers: { ...headers, 'Content-Type': 'application/json' } })
  } catch (e) {
    console.error(e)
    return new Response(e.message, { status: e.status, headers: { ...headers, 'Content-Type': 'application/json' } })
  }
})
