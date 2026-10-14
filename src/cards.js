/* Card render library — emits v2-exact markup from content data.
   Prose mini-markup expanded by md():
     **bold**            -> <b>bold</b>
     [kw:text]           -> <span class="kw">text</span>
     [g:body|end]        -> green two-part chip with check icon   (confirmed)
     [o:body|end]        -> orange two-part chip                  (caution)
     [b:body|end]        -> blue two-part chip                    (analysis)
     [i:text]            -> inline blue chip with icon
     [he:🙂]             -> hero emoji span (ELI5-only via CSS)
   Voice fields: string (all voices) or {p, c, e} (missing c/e fall back to p). */
const H = require("./harvest.js");
const S = H.S;

function svgAfter(marker, from) {
  const i = S.indexOf(marker, from || 0);
  if (i < 0) throw new Error("marker not found: " + marker);
  const a = S.indexOf("<svg", i);
  return S.slice(a, S.indexOf("</svg>", a) + 6);
}
const CHIP_ICON = {
  g: H.ICON.chipCheck,
  o: svgAfter('chip chip-o chip-end'),
  b: svgAfter('chip chip-b chip-end'),
  i: svgAfter('class="chip-i"'),
};

function md(t) {
  if (t == null) return "";
  return String(t)
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/\[kw:([^\]]+)\]/g, '<span class="kw">$1</span>')
    .replace(/\[([gob]):([^|\]]*)\|([^\]]+)\]/g, (m, c, body, end) =>
      (body ? `<span class="chip chip-${c}">${body}</span>` : "") +
      `<span class="chip chip-${c} chip-end">${end}${CHIP_ICON[c]}</span>`)
    .replace(/\[i:([^\]]+)\]/g, (m, t2) => `<span class="chip-i">${t2}${CHIP_ICON.i}</span>`)
    .replace(/\[he:([^\]]+)\]/g, '<span class="he">$1</span>');
}
function V(f) { return typeof f === "object" && f !== null && ("p" in f) ? f : { p: f }; }

/* inline voice para: one <p>, voice spans inside */
function vpara(f, cls) {
  const v = V(f);
  return `<p class="para${cls ? " " + cls : ""}"><span class="vv vp">${md(v.p)}</span><span class="vv vc">${md(v.c ?? v.p)}</span><span class="vv ve">${md(v.e ?? v.p)}</span></p>`;
}
/* div variant (v2 uses div.para in some cards) */
function vparaDiv(f, cls) {
  const v = V(f);
  return `<div class="para${cls ? " " + cls : ""}"><span class="vv vp">${md(v.p)}</span><span class="vv vc">${md(v.c ?? v.p)}</span><span class="vv ve">${md(v.e ?? v.p)}</span></div>`;
}
/* block voice group: whole sets of <p class="para"> per voice (hero body, keyfacts bd) */
function vblock(fields, pcls) {
  const vs = fields.map(V);
  const one = k => vs.map(v => `<p class="para${pcls ? " " + pcls : ""}">${md(v[k] ?? v.p)}</p>`).join("\n");
  return `<div class="vv vp">${one("p")}</div>\n<div class="vv vc">${one("c")}</div>\n<div class="vv ve">${one("e")}</div>`;
}
function vspan(f) {
  const v = V(f);
  return `<span class="vv vp">${md(v.p)}</span><span class="vv vc">${md(v.c ?? v.p)}</span><span class="vv ve">${md(v.e ?? v.p)}</span>`;
}

function conn(c) {
  const def = md(c.def), e5 = md(c.e5 ?? c.def);
  return `<div class="conn">${H.CONN_DOT}<p class="conn-t"><span class="cv cv-def">${def}</span><span class="cv cv-e5">${e5}</span></p></div>`;
}
function hd(iconKey, title) {
  return `<div class="hd"><div class="hd-ic">${H.ICON[iconKey]}</div><div class="hd-t">${title}</div></div>`;
}

/* ---------- cards ---------- */
const T = {
  story: d => `<div class="c-story">
  <div class="c-story-hero" style="background-image:url('${d.img}')">
    <div class="c-story-scrim"></div><div class="c-story-blend"></div>
    <div class="hero-title">${md(d.title)}</div>
  </div>
  <div class="card c-story-body">${vblock(d.paras)}</div>
</div>`,

  s2story: d => `<div class="c-s2story"><div class="c-s2story-hero" style="background-image:url('${d.img}')"><div class="sc-grad"></div><div class="sc-scrim"></div><div class="c-s2story-title">${md(d.title)}</div></div><div class="card c-s2story-body">${vblock(d.paras)}</div></div>`,

  keyfacts: d => `<div class="card">${hd("keyfacts", d.title || "Key Facts")}
<div class="stats">${(sm => d.tiles.map(t => `<div class="tile"><div class="fig${sm}">${t.fig}</div><div class="lab">${t.lab}</div></div>`).join("\n"))(figSm(d.tiles.map(t => t.fig)) ? " sm" : "")}</div>
<div class="bd">${vblock(d.paras, "block")}</div></div>`,

  whos: d => `<div class="card c-whos">${hd("whos", d.title || "Who's Involved")}
<div class="wi-body"><div class="wi-list">
${d.items.map(it => `<div class="wi-item"><div class="wi-lab">${it.lab}</div><div class="wi-row"><div class="wi-av">${it.av}</div><div class="wi-txt"><div class="wi-name">${it.name}${it.badge ? `<span class="wi-badge">${svgAfter('class="wi-badge"')}</span>` : ""}</div><div class="wi-desc">${vspan(it.desc)}</div></div></div></div>`).join("\n")}
</div>${vparaDiv(d.para)}</div></div>`,

  args: d => `<div class="card c-arguments">${hd("args", d.title || "The Arguments")}
<div class="arg-sep"></div><div class="arg-cols">
<div class="arg-col"><div class="arg-lab arg-lab-for">${svgAfter('class="arg-lab arg-lab-for"')}<span>${d.for.label}</span></div><div class="arg-cards">${d.for.cards.map(c => `<div class="arg-card arg-card-for"><div class="arg-vis">${c.vis}</div><div class="arg-txt">${vspan(c.txt)}</div></div>`).join("\n")}</div></div>
<div class="arg-col"><div class="arg-lab arg-lab-against">${svgAfter('class="arg-lab arg-lab-against"')}<span>${d.against.label}</span></div><div class="arg-cards">${d.against.cards.map(c => `<div class="arg-card arg-card-against"><div class="arg-vis">${c.vis}</div><div class="arg-txt">${vspan(c.txt)}</div></div>`).join("\n")}</div></div>
</div>${vpara(d.para, "block")}</div>`,

  dreads: d => `<div class="card c-dreads">${hd("dreads", d.title || "Different Reads")}
<div class="dr-body"><div class="dr-cards">
<div class="dr-src dr-src-a"><div class="dr-head"><div class="dr-av">${d.a.av}</div><div class="dr-lab">${d.a.lab}</div></div><div class="dr-headline">${md(d.a.headline)}</div></div>
<div class="dr-src dr-src-b"><div class="dr-head"><div class="dr-av">${d.b.av}</div><div class="dr-lab">${d.b.lab}</div></div><div class="dr-headline">${md(d.b.headline)}</div></div>
</div>${vparaDiv(d.para)}</div></div>`,

  expert: d => `<div class="card c-expert">${hd("expert", d.title || "Expert View")}
<div class="quote"><div class="qmark"><span>“</span></div><div class="qtext">${md(d.quote)}</div></div>
<div class="voice"><div class="avatar">${d.av}</div><div class="vtext"><div class="vname">${d.name}</div><div class="vrole">${d.role}</div></div></div>
<a class="src" href="#">${d.viewSource || "View source ↗"}</a><div class="sep"></div>
${vparaDiv(d.para)}</div>`,

  impact: d => `<div class="card c-impact">${hd("impact", d.title || "Impact")}
<div class="c-impact-body"><div class="c-impact-rows">
${d.rows.map(r => `<div class="c-impact-row"><div class="c-impact-h"><span class="c-impact-ring" style="width:${r.ring[0]}px;height:${r.ring[0]}px"><span class="c-impact-dot" style="width:${r.ring[1]}px;height:${r.ring[1]}px"></span></span><span class="c-impact-lab">${r.lab}</span></div>${vpara(r.para)}</div>`).join("\n")}
</div>${vpara(d.para)}</div></div>`,

  why: d => `<div class="card c-why">${hd("why", d.title || "Why This Matters")}
<div class="why-list">
${d.boxes.map(b => `<div class="why-box"><div class="why-hd"><div class="why-vis">${b.vis}</div><div class="why-lab">${b.lab}</div></div>${vparaDiv(b.para)}</div>`).join("\n")}
</div>${vparaDiv(d.para)}</div>`,

  next: d => `<div class="card c-next">${hd("next", d.title || "What's Next")}
<div class="c-next-body"><div class="c-next-rows">
${d.rows.map(r => `<div class="c-next-row"><div class="c-next-h"><span class="c-next-vis">${r.vis}</span><span class="c-next-lab">${r.lab}</span></div>${vpara(r.para)}</div>`).join("\n")}
</div>${vpara(d.para)}</div></div>`,

  thennow: d => `<div class="card c-thennow">${hd("thennow", d.title || "Then vs Now")}
<div class="stats"><div class="tile tn-then"><div class="tn-lab">${d.then.lab}</div><div class="fig">${d.then.fig}</div><div class="tn-desc">${md(d.then.desc)}</div></div><div class="tile"><div class="tn-lab tn-lab-now">${d.now.lab}</div><div class="fig">${d.now.fig}</div><div class="tn-desc">${md(d.now.desc)}</div></div></div>
${vparaDiv(d.para)}</div>`,

  /* ---- P2 kit cards ---- */
  map: d => `<div class="card c-map">${hd("numbers", d.title || "Map")}
<div class="mapbox" data-map="${d.mapKey}">${d.schem}<div class="maplive"></div></div>
<div class="leg">${d.legend.map(l => `<span><i style="background:${l[0]}"></i>${l[1]}</span>`).join("")}</div>
<p class="attr">© OpenStreetMap contributors © CARTO</p>
${vparaDiv(d.para)}</div>`,

  numbers2: d => `<div class="card c-numbers">${hd("numbers", d.title || "Numbers")}
<div class="banner"><div class="fig">${d.banner.fig}</div><p class="banner-cap">${md(d.banner.lab)}</p></div>
<div class="chart">${d.cols.map(c => `<div class="col" data-val="${c[3] || c[0]}"><span class="bval${c[4] ? " bval-p" : ""}">${c[0]}</span><span class="bar${c[4] ? " bar-p" : ""}" style="height:${c[1]}px"></span><span class="byr">${c[2]}</span></div>`).join("")}</div>
${vblock([d.para], "block")}</div>`,

  signal: d => `<div class="card c-signal">${hd("impact", d.title || "Signal")}
${d.rows.map(r => `<div class="sig${r[3] ? " hot" : ""}" data-pct="${r[0]}"><svg viewBox="0 0 44 44"><circle class="tr" cx="22" cy="22" r="18"/><circle class="vl" cx="22" cy="22" r="18"/></svg><span class="sb"><b>${r[1]}</b><span class="note">${md(r[2])}</span></span><span class="pc">${r[0]}%</span></div>`).join("\n")}
${vparaDiv(d.para)}</div>`,

  timeline: d => `<div class="card c-tl">${hd("next", d.title || "Timeline")}
<div class="schips"><span class="on"><i></i>${d.chips[0]}</span><span>${d.chips[1]}</span></div>
${d.rows.map(r => `<div class="row"><span class="t">${r[0]}</span><span class="d"></span><span class="x">${md(r[1])}</span></div>`).join("\n")}</div>`,

  risk2: d => `<div class="card c-risk2">${hd("why", d.title || "Risk")}
${d.rows.map(r => `<div class="rrow"><span class="lv lv-${r[0]}">${r[1]}</span><span class="rt"><b>${r[2]}</b><span>${md(r[3])}</span></span></div>`).join("\n")}
${vparaDiv(d.para)}</div>`,

  poll: d => `<div class="card c-poll">${hd("impact", d.title || "Where People Stand")}
${d.rows.map((r, i) => `<div class="prow${i === 1 ? " alt" : ""}" data-count="${r[3]}"><span class="pt"><span>${r[0]}</span><span class="pv">${r[1]}%</span></span><span class="tk"><i style="--v:${r[1]}%"></i></span><span class="pc2">${md(r[2])}</span></div>`).join("\n")}
${vparaDiv(d.para)}</div>`,

  ground: d => `<div class="card c-ground">${hd("whos", d.title || "On the Ground")}
${d.disps.map(x => `<div class="disp"><b>${x[0]}</b><p>${md(x[1])}</p></div>`).join("\n")}
<div class="strip">${d.tiles.map(t => `<span style="background:${t}"></span>`).join("")}</div></div>`,

  hiw: d => `<div class="card c-hiw">${hd("hiw", d.title || "How It Works")}
<div class="mech"><div class="chain">${d.chain.map((t, i) => `<div class="mtag${i === d.chain.length - 1 ? " on" : ""}"><span>${t}</span></div>`).join(H.ICON.mechArrow)}</div><div class="msub">${md(d.sub)}</div><div class="mdiv"><div class="line"></div>${H.ICON.mechBolt}<div class="line"></div></div><div class="mout"><span>${md(d.out)}</span></div></div>
${vparaDiv(d.para)}</div>`,
};

/* ---------- depth on demand ----------
   Three zones inside ONE expanded card. Generated from the same card data and the
   same claim markup, so the transparency chips are inherited rather than recomputed.
   That is the whole point: there is one set of claims, so nothing can mismatch.
     more: [voiceField]           elaboration  — same facts, fuller
     also: [voiceField]           new facts    — what did not fit on the card
     how:  [{tag, claim, note}]   evidence     — how we know this one
   Any zone may be omitted. A timeline card wants no evidence zone; a key-facts card does. */
const ZONE_LABEL = { more: "More detail", also: "Also known", how: "How we know" };

/* Zone icons — 16px stroke marks on the 32px grey disc, same weight as the card
   header icons so an opened card reads as more of the same page, not a new one. */
const DP_ICON = {
  /* text-check: three shortening lines and a tick — "the same claims, checked" */
  more: '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.667 3.333H12M2.667 6.667H10M2.667 10H5.333" stroke="#1D201D" stroke-width="1.5" stroke-linecap="round"/><path d="M7.333 10.667 9.333 12.667 13.333 8" stroke="#1D201D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  /* plus-circle: facts that did not fit on the card */
  also: '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6" stroke="#1D201D" stroke-width="1.5"/><path d="M8 5.5v5M5.5 8h5" stroke="#1D201D" stroke-width="1.5" stroke-linecap="round"/></svg>',
  /* magnifier: how we know it */
  how: '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="7.083" cy="7.083" r="4.583" stroke="#1D201D" stroke-width="1.5"/><path d="M13.5 13.5 10.9 10.9" stroke="#1D201D" stroke-width="1.5" stroke-linecap="round"/></svg>',
  chev: '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 5.75 8 10.5l4.5-4.75" stroke="#272A27" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

/* A 150px tile fits about five characters of the 44px display figure; past that
   the number spills out of its own tile. Sizing is decided per ROW, not per tile,
   so the pair still reads as a pair — two figures at different sizes side by side
   looks like a mistake, which is what "210 km/h" next to "8 hrs" was doing. */
const figSm = vals => vals.some(v => String(v).length > 5);

/* Optional headline pair for a zone: [[value, label], ...].
   Two tiles is the design; the row stays honest with one. */
function dpStats(st) {
  if (!Array.isArray(st) || !st.length) return "";
  const pair = st.slice(0, 2);
  const sm = figSm(pair.map(t => t[0])) ? " sm" : "";
  return `<div class="dp-stats">${pair.map(([n, lab]) =>
    `<div class="dp-tile"><div class="dp-num${sm}">${md(String(n))}</div>` +
    `<div class="dp-tlab">${md(lab)}</div></div>`).join("")}</div>`;
}

function deepBlock(d) {
  const body = ["more", "also", "how"].filter(k => d[k] && (Array.isArray(d[k]) ? d[k].length : true)).map(k => {
    const items = Array.isArray(d[k]) ? d[k] : [d[k]];
    const rows = k === "how"
      ? items.map(it =>
          `<div class="dp-ev"><span class="dp-ev-tag dp-ev-${it.tag}">${it.tag}</span>` +
          `<span class="dp-ev-tx"><b>${md(it.claim)}</b><span class="dp-ev-note">${vspan(it.note)}</span></span></div>`).join("\n")
      : items.map(it => vpara(it, "dp-p")).join("\n");
    /* the numbers lead the first zone — they are the reason to have opened it */
    const lead = k === "more" ? dpStats(d.stats) : "";
    return `<div class="dp-zone"><div class="dp-hd"><span class="dp-hd-ic">${DP_ICON[k]}</span>` +
           `<span class="dp-hd-t">${ZONE_LABEL[k]}</span></div>` +
           `<div class="dp-body">${lead}${rows}</div></div>`;
  }).join("\n");
  return `<div class="nf-deep"><div class="nf-deep-in">${body}</div></div>`;
}

/* The control is now a labelled bar on the card's bottom edge rather than a mute
   chevron in the header: the expansion is a named thing you choose, so it says its
   name. It sits above the panel it opens, so the control you tapped stays put. */
function deepBar() {
  return `<button class="dp-bar" type="button" aria-expanded="false">` +
         `<span class="dp-bar-t">Deep dive</span><span class="dp-bar-ic">${DP_ICON.chev}</span></button>`;
}

/* section wrapper + assemblers */
function section(storyIdx, cardIdx, type, data, connector, deep) {
  const inner = T[type](data);
  if (!deep) return `<section class="nf-card" id="sec-${storyIdx}-${cardIdx}">${inner}${connector ? conn(connector) : ""}</section>`;
  return `<section class="nf-card has-deep" id="sec-${storyIdx}-${cardIdx}" data-deep="1">${inner}` +
         `${deepBar()}${deepBlock(deep)}` +
         `${connector ? conn(connector) : ""}</section>`;
}

function bottomBar(d) {
  const tabs = d.tabs.map((t, i) =>
    `<button class="nf-tab${i === 0 ? " on" : ""}" data-tab="${i}" type="button"><span class="nf-tab-sel"></span><span class="nf-tab-lbl">${t}</span></button>`).join("");
  let ab = H.ACTIONBAR
    .replace('data-social="1"', `data-social="1" data-story="${d.story}"`)
    .replace(/(<span class="nf-pill-t">)\d+(<\/span>)/, `$1${d.voices}$2`);
  return `<div class="nf-bottom">
<div class="nf-tabs"><div class="nf-tabs-inner">${tabs}</div></div>
<div class="nf-next"><div class="nf-next-pill"><span class="nf-next-ic">${H.ICON.nextPill}</span><span class="nf-next-t">${md(d.nextTitle)}</span></div></div>
${ab}
<div class="nf-home"></div></div>`;
}

/* a story stage. cards = [{type, data, conn}] */
function stage(i, d) {
  const secs = d.cards.map((c, k) => section(i - 1, k, c.type, c.data, c.conn, c.deep)).join("\n");
  let nav = H.navrow({ tagLabel: d.tag, conf: d.conf, count: d.cards.length, story: d.story });
  if (d.conf === "Medium" || d.conf === "中") nav = nav.replace('class="nf-conf"', 'class="nf-conf nf-conf--med"');
  return `<div class="stage" id="stage-${i}" data-stage="${i}" data-next="${d.next}" data-prev="${d.prev}">
<div class="nf-phone" data-voice="Plain"><div class="nf-scroll">
<div class="nf-navwrap"><div class="nf-topnav">${H.STATUSBAR}${nav}</div></div>
<div class="cards voice-plain">
${secs}
<div class="nf-pull" aria-hidden="true"></div>
</div>
${bottomBar({ tabs: d.tabs, nextTitle: d.nextTitle, story: d.story, voices: d.voices })}
</div></div></div>`;
}

/* grow overlay for stage i: preview of the NEXT story.
   The harvested v2 overlay (ov-src-1) is used as a template — its structure and
   inert action bar are exactly what engine.js queries — and only content swapped. */
const OV_TMPL = H.OVERLAY_1;
function replaceEl(html, openMarker, replacement) {
  const a = html.indexOf(openMarker);
  if (a < 0) throw new Error("overlay marker missing: " + openMarker);
  const frag = H.element(html, a);
  return html.slice(0, a) + replacement + html.slice(a + frag.length);
}
function overlay(i, d) {
  let h = OV_TMPL;
  h = h.replace(/id="ov-src-\d+"/, `id="ov-src-${i}"`);
  h = h.replace(/(<div class="s2-hero" style="background-image:url\(')[^']+('\)")/, `$1${d.img}$2`);
  h = h.replace(/(<span class="s2-pill-t">)[^<]*(<\/span>)/, `$1${md(d.title)}$2`);
  h = h.replace(/(<div class="s2-title">)[^<]*(<\/div>)/, `$1${md(d.title)}$2`);
  h = replaceEl(h, '<div class="card s2-card">', `<div class="card s2-card">${vblock(d.paras)}</div>`);
  // the connector inside s2-below
  h = replaceEl(h, '<div class="conn">', conn(d.conn));
  // overlay topnav texts
  h = h.replace(/(<span class="nf-tag-t">)[^<]*(<\/span>)/, `$1${d.tag}$2`);
  h = h.replace(/(<span class="nf-conf-t">)[^<]*(<\/span>)/, `$1${d.conf}$2`);
  if (d.conf === "Medium" || d.conf === "中") h = h.replace('class="nf-conf"', 'class="nf-conf nf-conf--med"');
  h = h.replace(/(<span class="nf-news-t">)[^<]*(<\/span>)/, `$1${d.count}$2`);
  // tabs strip (next story's tabs)
  h = replaceEl(h, '<div class="nf-tabs-inner">',
    `<div class="nf-tabs-inner">` + d.tabs.map((t, k) =>
      `<button class="nf-tab${k === 0 ? " on" : ""}" type="button"><span class="nf-tab-sel"></span><span class="nf-tab-lbl">${t}</span></button>`).join("") + `</div>`);
  // next-pill title (the story AFTER the previewed one)
  h = h.replace(/(<span class="nf-next-t">)[^<]*(<\/span>)/, `$1${md(d.nextTitle)}$2`);
  // social count on the inert action bar
  h = h.replace(/(<span class="nf-pill-t">)\d+(<\/span>)/, `$1${d.voices}$2`);
  return h;
}

module.exports = { md, V, vpara, vparaDiv, vblock, vspan, conn, hd, T, section, stage, overlay, bottomBar, CHIP_ICON };
