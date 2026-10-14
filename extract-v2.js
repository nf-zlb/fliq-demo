/* P0: extract fliq_demo_v2.html into parts:
   - assets/img/v2-*.png|jpg  (all inline data-URI images, deduped by content hash)
   - src/app.css              (the <style> block, data URIs swapped for asset refs)
   - src/engine.js            (main engine IIFE — the script AFTER the stage markup, before sheet templates)
   - src/v2-stages.html       (stage markup with asset refs — authoring reference + harness body)
   - src/v2-sheets.html       (the two base64 sheet template tags, verbatim)
   - harness.html             (reassembled v2 — regression baseline, must behave identically)
   Run: node extract-v2.js */
const fs = require("fs");
const crypto = require("crypto");

const SRC = "C:/Users/TLP/Downloads/fliq_demo_v2.html";
let c = fs.readFileSync(SRC, "utf8");

/* ---- 1) extract + dedupe images ---- */
const seen = new Map(); // hash -> filename
let imgN = 0;
c = c.replace(/data:image\/([a-z+]+);base64,([A-Za-z0-9+/=]+)/g, (m, type, b64) => {
  const buf = Buffer.from(b64, "base64");
  const hash = crypto.createHash("md5").update(buf).digest("hex").slice(0, 10);
  if (!seen.has(hash)) {
    const ext = type === "jpeg" ? "jpg" : type;
    const name = `v2-${String(++imgN).padStart(2, "0")}-${hash}.${ext}`;
    fs.writeFileSync("assets/img/" + name, buf);
    seen.set(hash, name);
  }
  return "../assets/img/" + seen.get(hash);
});
console.log("images:", seen.size, "unique (from", imgN, "refs scanned)");

/* ---- 2) split the document ---- */
const styleStart = c.indexOf("<style>");
const styleEnd = c.indexOf("</style>") + "</style>".length;
const css = c.slice(styleStart + 7, styleEnd - 8);
fs.writeFileSync("src/app.css", css);
console.log("app.css:", css.length, "chars");

const bodyStart = c.indexOf("<body>") + 6;
// stage markup runs from body start to the first sheet template
const sheetsStart = c.indexOf('<script type="text/html" id="src-confidence-s01">');
const stages = c.slice(bodyStart, sheetsStart);
fs.writeFileSync("src/v2-stages.html", stages);
console.log("v2-stages.html:", stages.length, "chars");

// the two sheet template tags (each is one line ending </script>)
const sheetsEnd = c.indexOf("</script>", c.indexOf('id="src-pulse-s01"')) + "</script>".length;
const sheets = c.slice(sheetsStart, sheetsEnd);
fs.writeFileSync("src/v2-sheets.html", sheets);
console.log("v2-sheets.html:", sheets.length, "chars");

// remaining scripts (engine + sheet-wiring), from after the sheet templates to </body>
const bodyEnd = c.lastIndexOf("</body>");
const scriptsRaw = c.slice(sheetsEnd, bodyEnd);
// engine = first <script>...</script>; sheetwire = second
const scripts = [...scriptsRaw.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
console.log("script blocks after sheets:", scripts.length, scripts.map(s => s.length).join(","));
fs.writeFileSync("src/engine.js", scripts[0] || "");
fs.writeFileSync("src/v2-sheetwire.js", scripts[1] || "");

/* head (fonts etc.) for reference */
const head = c.slice(0, styleStart);
fs.writeFileSync("src/v2-head.html", head);

/* ---- 3) reassemble harness (must equal v2 behaviour) ---- */
const harness =
  head + "<style>" + css + "</style>\n</head>\n<body>" +
  stages + sheets +
  "<script>" + (scripts[0] || "") + "</scr" + "ipt>\n<script>" + (scripts[1] || "") + "</scr" + "ipt>\n</body></html>";
fs.writeFileSync("harness.html", harness);
console.log("harness.html:", harness.length, "chars");
