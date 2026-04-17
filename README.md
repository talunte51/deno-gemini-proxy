[![Deploy on Deno](https://deno.com/button)](https://console.deno.com/new?clone=https://github.com/GitHub30/deno-gemini-proxy)

# deno-gemini-proxy

```js
const res = await fetch("https://foo.bar.deno.net", {
  method: "POST",
  body: JSON.stringify({
    model: "gemini-3.1-flash-lite-preview",
    contents: "Hello Google",
  }),
});
const obj = await res.json();
const text = obj.candidates?.[0]?.content?.parts?.[0]?.text || "Generate failed";
console.log(text);
```

