/* Harvest reusable markup fragments from the extracted v2 stage markup.
   Everything visual (SVG icons, chrome blocks) is lifted verbatim so the build
   stays pixel-identical to fliq_demo_v2 — nothing is retyped by hand. */
const fs = require("fs");
const path = require("path");
const S = fs.readFileSync(path.join(__dirname, "v2-stages.html"), "utf8");

/* balanced matcher: returns the whole element starting at `openIdx` (a "<div"/"<span"/... position) */
function element(src, openIdx) {
  const tag = src.slice(openIdx + 1).match(/^[a-z0-9]+/i)[0];
  const re = new RegExp("<" + tag + "\\b|</" + tag + ">", "g");
  re.lastIndex = openIdx + 1;
  let depth = 1, m;
  while ((m = re.exec(src))) {
    depth += m[0][1] === "/" ? -1 : 1;
    if (depth === 0) return src.slice(openIdx, m.index + m[0].length);
  }
  throw new Error("unbalanced <" + tag + "> at " + openIdx);
}
function elAt(marker, from) {
  const i = S.indexOf(marker, from || 0);
  if (i < 0) throw new Error("marker not found: " + marker);
  return element(S, i);
}
/* first <svg>…</svg> inside a fragment / after a marker */
function svgIn(frag) {
  const i = frag.indexOf("<svg");
  const j = frag.indexOf("</svg>", i);
  return frag.slice(i, j + 6);
}
function svgAfter(marker, from) {
  const i = S.indexOf(marker, from || 0);
  if (i < 0) throw new Error("marker not found: " + marker);
  const a = S.indexOf("<svg", i);
  return S.slice(a, S.indexOf("</svg>", a) + 6);
}

const stage1 = S.indexOf('id="stage-1"');
const stage2 = S.indexOf('id="stage-2"');

/* ---- chrome blocks (verbatim) ---- */
const STATUSBAR = elAt('<div class="nf-status">', stage1);            // status bar w/ white icons
const NAVROW_RAW = elAt('<div class="nf-navrow">', stage1);           // tag + conf pill + news pill
const ACTIONBAR = elAt('<div class="nf-actionbar">', stage1);         // back / social / voice / save / share
const CONN_DOT = elAt('<span class="conn-dot">', stage1);             // arrow + check icons
const VSHEET = elAt('<div class="nf-vsheet"', 0).replace(/^<div class="nf-vsheet"/, '<div class="nf-vsheet" id="nf-vsheet"');

/* the vsheet in v2 sits with ids; harvest as-is if it already carries them */
const VSHEET_FULL = (() => {
  const i = S.indexOf('id="nf-vsheet"');
  if (i >= 0) { const a = S.lastIndexOf("<div", i); return element(S, a); }
  return VSHEET;
})();
const SCRIM = (() => {
  const i = S.indexOf('id="nf-scrim"');
  const a = S.lastIndexOf("<div", i);
  return element(S, a);
})();

/* ---- icons ---- */
const ICON = {
  chipCheck: svgAfter('class="chip chip-g chip-end"', stage1),
  connArrow: svgIn(elAt('<span class="ci ci-arrow">', stage1)),
  connCheck: svgIn(elAt('<span class="ci ci-check">', stage1)),
  tag: svgIn(elAt('<span class="nf-tag-ic">', stage1)),
  cbars: svgIn(elAt('<span class="cbars">', stage1)),
  news: svgIn(elAt('<span class="nf-news-ic">', stage1)),
  nextPill: svgIn(elAt('<span class="nf-next-ic">', stage1)),
};
/* per-card header icons, harvested from the card instance that uses them */
function hdIcon(cardClass, from) {
  const i = S.indexOf('class="card ' + cardClass + '"', from || 0);
  if (i < 0) throw new Error("card not found: " + cardClass);
  return svgAfter('hd-ic', i);
}
ICON.keyfacts = svgAfter('hd-ic', S.indexOf('id="sec-0-1"'));   // Key Facts (story 1 card 1)
ICON.whos = hdIcon("c-whos", stage1);
ICON.args = hdIcon("c-arguments", stage1);
ICON.dreads = hdIcon("c-dreads", stage1);
ICON.expert = hdIcon("c-expert", stage1);
ICON.impact = hdIcon("c-impact", stage1);
ICON.why = hdIcon("c-why", stage1);
ICON.next = hdIcon("c-next", stage1);
ICON.numbers = hdIcon("c-numbers", stage2);
ICON.thennow = hdIcon("c-thennow", stage2);
ICON.hiw = hdIcon("c-hiw", S.indexOf('id="stage-3"'));
/* mech chain arrow + divider bolt (harvest whole mech for its inner svgs) */
const MECH_RAW = elAt('<div class="mech">', S.indexOf('id="stage-3"'));
{
  const svgs = [...MECH_RAW.matchAll(/<svg[\s\S]*?<\/svg>/g)].map(m => m[0]);
  ICON.mechArrow = svgs[0];          // between mtags
  ICON.mechBolt = svgs[svgs.length - 1] === svgs[0] ? svgs[3] : svgs[3]; // divider icon (4th svg)
}
/* dreads outlet avatars + expert avatar are images per-story; not harvested */

/* feed skeleton (whole stage-0) for templating */
const FEED_STAGE = (() => {
  const a = S.indexOf('<div class="stage feedwrap');
  return element(S, a);
})();

/* one overlay, as a structural template */
const OVERLAY_1 = (() => {
  const a = S.indexOf('id="ov-src-1"');
  const open = S.lastIndexOf("<div", a);
  return element(S, open);
})();

/* navrow template: swap tag label, conf level, count, logos */
function navrow({ tagLabel, conf, count, story }) {
  let h = NAVROW_RAW;
  h = h.replace(/(<span class="nf-tag-t">)[^<]*(<\/span>)/, `$1${tagLabel}$2`);
  h = h.replace(/(<span class="nf-conf-t">)[^<]*(<\/span>)/, `$1${conf}$2`);
  h = h.replace(/(<span class="nf-news-t">)[^<]*(<\/span>)/, `$1${count}$2`);
  h = h.replace('data-conf="1"', `data-conf="1" data-story="${story}"`);
  return h;
}

module.exports = { S, element, elAt, ICON, STATUSBAR, NAVROW_RAW, navrow, ACTIONBAR, CONN_DOT, VSHEET_FULL, SCRIM, FEED_STAGE, OVERLAY_1, MECH_RAW };
