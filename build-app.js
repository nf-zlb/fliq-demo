/* Build en/app.html + zh/app.html — v2 stage architecture, 4 stories, voice matrix.
   Run: node build-app.js */
const fs = require("fs");
const H = require("./src/harvest.js");
const C = require("./src/cards.js");

/* CES=1 swaps the typhoon story into slot 1 in place of Hormuz, for the CES
   film build only — output goes to ces/en|zh/, the public en/app.html and
   zh/app.html (and their ORDER) are never touched by this flag. */
const CES = !!process.env.CES;
const STORIES = {
  s01: require("./src/content/s01.js"),
  s02: require("./src/content/s02.js"),
  s03: require("./src/content/s03.js"),
  s04: require("./src/content/s04.js"),
  s05: require("./src/content/s05.js"),
};
const ORDER = CES ? ["s05", "s02", "s03", "s04"] : ["s01", "s02", "s03", "s04"];
const NEWS_COUNTS = [15, 14, 13, 12];
const HERO_TYPE = { s01: "s2story", s02: "story", s03: "s2story", s04: "s2story", s05: "s2story" };

const FEED_TEXT = {
  en: {
    greeting: "Hello, Michelle 👋",
    lede: "One closed strait, one landmark ban, one tariff wall and one overheating market are quietly repricing daily life. None are new; all are landing now.",
    bullets: [
      "Hormuz shut → oil past $140, day 12 of strikes",
      "France draws the under-16 line → all of Europe watches",
      "50% tariffs land on Canada → prices follow",
      "HK rents → steepest summer climb in a decade"],
    sources: "Across 17 sources", openSnap: "Open full snap", now: "What’s happening now",
    snapTitle: "Current snapshot", cue: "Scroll to feed", section: "Essential",
    ago: "1h ago", cardsWord: "cards", track: "Track",
    descs: {
      s01: "Twelve days of strikes have shut the Strait of Hormuz for the first time in history — and no briefing will say how this ends.",
      s02: "France passes the EU's first blanket under-16 ban. Supporters cite mental health; critics say it just moves the risk.",
      s03: "The steepest tariff wall between two allied economies in modern history — and prices move before the politics settle.",
      s04: "Rents rose almost 4% in six months. The squeeze is real, measurable — and mapped, district by district.",
      s05: "Dolphin has already crossed the coast further north. It is eight hours from Hong Kong, two forecast models disagree by 90km — and a fake MTR shutdown notice is going viral."
    },
    tags: { s01: ["Essential", "World"], s02: ["Essential", "Society"], s03: ["Essential", "Economy"], s04: ["Local", "Housing"], s05: ["Essential", "Local"] },
    titles: { s01: "The strait that prices the world is closed", s02: "Should under-16s be banned from social media?", s03: "50% tariffs, between allies", s04: "The steepest summer climb in a decade", s05: "Typhoon Dolphin is eight hours out" },
    /* The third voice is shown as "Friend" — "ELI5" is jargon to a reader who
       hasn't seen the acronym. The data-voice key stays "ELI5 friend" because
       the engine, the tour and the film scripts all address voices by that key;
       only the displayed name changes. */
    vsheet: {
      title: "Choose a voice", sub: "Same facts, same numbers — only the way it's told changes.",
      rows: [["Plain", "Plain", "Neutral, factual. The default voice."],
             ["Calm explainer", "Calm explainer", "Measured and reassuring, in a softer serif."],
             ["ELI5 friend", "Friend", "Warm and playful, like a friend explaining it."]]
    }
  },
  zh: {
    greeting: "哈囉，Michelle 👋",
    lede: "一條封鎖的海峽、一道破天荒的禁令、一堵關稅牆、一個過熱的市場，正悄悄為日常生活重新定價。全部都不是新事，全部都在此刻埋單。",
    bullets: [
      "霍爾木茲封鎖 → 油價升穿140美元，空襲第12日",
      "法國劃下16歲界線 → 全歐洲都在看",
      "50%關稅落在加拿大 → 物價隨後就到",
      "香港租金 → 十年最急夏季升浪"],
    sources: "綜合17個來源", openSnap: "開啟完整概覽", now: "現正發生",
    snapTitle: "即時概覽", cue: "向下看報道", section: "必讀",
    ago: "1小時前", cardsWord: "張卡", track: "追蹤",
    descs: {
      s01: "十二日空襲令霍爾木茲海峽史上首次封鎖——而沒有一場簡報肯講這一切如何收科。",
      s02: "法國通過歐盟首個16歲以下全面禁令。支持者談精神健康；反對者話風險只係搬咗位。",
      s03: "近代史上盟友之間最高的關稅牆——價格效應比政治結果更快到埗。",
      s04: "半年租金升近4%。壓力真實、有數可計——而且逐區畫在地圖上。",
      s05: "海豚颱風尚餘八小時登陸。兩個預測模型相差90公里——一張假嘅港鐵停駛通知已經瘋傳緊。"
    },
    tags: { s01: ["必讀", "國際"], s02: ["必讀", "社會"], s03: ["必讀", "經濟"], s04: ["本地", "房屋"], s05: ["必讀", "本地"] },
    titles: { s01: "為全球定價的海峽，封了", s02: "16歲以下應否禁用社交媒體？", s03: "盟友之間，50%關稅", s04: "十年來最急的夏季升浪", s05: "海豚颱風尚餘八小時登陸" },
    vsheet: {
      title: "選擇聲線", sub: "同一批事實、同一批數字——只是講法不同。",
      rows: [["Plain", "平實", "中性、直述事實。預設聲線。"],
             ["Calm explainer", "淡定解說", "從容安定，配襯柔和襯線字體。"],
             ["ELI5 friend", "朋友仔", "親切好玩，像朋友解釋給你聽。"]]
    }
  }
};

const IMG = { s01: "../assets/img/hero-strait.jpg", s02: "../assets/img/hero-teens.jpg", s03: "../assets/img/hero-tariff.jpg", s04: "../assets/img/hero-rent.jpg", s05: "../assets/img/hero-typhoon.jpg" };

/* CES snapshot copy: same lede/bullets shape as the public feed, describing
   the CES-only 4-story set (typhoon replacing Hormuz) instead. */
if (CES) {
  Object.assign(FEED_TEXT.en, {
    lede: "One typhoon eight hours out, one landmark ban, one tariff wall and one overheating market are quietly repricing tonight. None are new; all are landing now.",
    bullets: [
      "Typhoon Dolphin → No. 8 window named, models disagree by 90km",
      "France draws the under-16 line → all of Europe watches",
      "50% tariffs land on Canada → prices follow",
      "HK rents → steepest summer climb in a decade"]
  });
  Object.assign(FEED_TEXT.zh, {
    lede: "一個尚餘八小時嘅颱風、一道破天荒的禁令、一堵關稅牆、一個過熱的市場，正悄悄為今晚重新定價。全部都不是新事，全部都在此刻埋單。",
    bullets: [
      "海豚颱風 → 八號風球窗口已預告，模型相差90公里",
      "法國劃下16歲界線 → 全歐洲都在看",
      "50%關稅落在加拿大 → 物價隨後就到",
      "香港租金 → 十年最急夏季升浪"]
  });
}

/* ---------- kit: map data (lifted from build-stories.js) + per-lang config ---------- */
const MAPS = {
  gulf: {
    center: [30.8, 53.6], zoom: 5,
    zones: {
      en: [
        [[33.72, 51.72], 60, "Natanz province", "Repeated strikes on enrichment-linked sites through the first week."],
        [[32.65, 51.67], 50, "Isfahan province", "Industrial and air-defence targets; heaviest single night on day 9."],
        [[27.18, 56.28], 45, "Bandar Abbas", "Port facilities hit today — the closest strikes yet to the strait."],
        [[29.6, 52.5], 55, "Fars province", "Command and radar infrastructure struck across days 4–11."],
        [[35.7, 51.4], 50, "Tehran province", "Leadership and communications targets from day one."]],
      zh: [
        [[33.72, 51.72], 60, "納坦茲一帶", "首週起多次空襲濃縮相關設施。"],
        [[32.65, 51.67], 50, "伊斯法罕省", "工業及防空目標；第9晚攻勢最猛烈。"],
        [[27.18, 56.28], 45, "阿巴斯港", "今日港口設施被擊中——迄今最貼近海峽的一輪。"],
        [[29.6, 52.5], 55, "法爾斯省", "第4至11日間指揮及雷達設施接連被擊中。"],
        [[35.7, 51.4], 50, "德黑蘭省", "首日起針對指揮及通訊目標。"]]
    },
    points: {
      en: [[[26.6, 56.25], "Strait of Hormuz", "Closed to commercial shipping. A fifth of the world's oil normally passes through this channel."]],
      zh: [[[26.6, 56.25], "霍爾木茲海峽", "已對商船封閉。全球五分之一的石油平日取道此處。"]]
    }
  },
  hk: {
    center: [22.36, 114.13], zoom: 10,
    zones: {
      en: [
        [[22.306, 114.185], 2.2, "Hung Hom / Ho Man Tin", "+6.2% H1 — student influx around the universities; queues at walk-up viewings."],
        [[22.312, 114.263], 2.5, "Tseung Kwan O", "+5.3% H1 — new-town supply absorbed faster than completions."],
        [[22.382, 114.19], 2.5, "Sha Tin / Tai Wai", "+4.8% H1 — rail-line demand from cross-boundary commuters."],
        [[22.284, 114.22], 2.2, "Island East", "+4.1% H1 — returning expat leases concentrated here."],
        [[22.39, 113.973], 2.6, "Tuen Mun", "+2.9% H1 — the lagging district agents expect to move next."]],
      zh: [
        [[22.306, 114.185], 2.2, "紅磡／何文田", "上半年+6.2%——大學周邊學生湧入，唐樓睇樓要排隊。"],
        [[22.312, 114.263], 2.5, "將軍澳", "上半年+5.3%——新市鎮供應被吸納的速度快過落成。"],
        [[22.382, 114.19], 2.5, "沙田／大圍", "上半年+4.8%——鐵路沿線受跨境通勤需求帶動。"],
        [[22.284, 114.22], 2.2, "港島東", "上半年+4.1%——回流外派租約集中於此。"],
        [[22.39, 113.973], 2.6, "屯門", "上半年+2.9%——暫時落後，代理估計下一浪到此。"]]
    },
    points: {
      en: [[[22.306, 114.185], "Steepest: Hung Hom", "+6.2% in six months — the fastest district climb since 2016."]],
      zh: [[[22.306, 114.185], "升幅最急：紅磡", "半年+6.2%——2016年以來最快的地區升幅。"]]
    }
  },
  typhoon: {
    center: [22.28, 114.17], zoom: 10,
    zones: {
      en: [
        [[22.309, 113.915], 3.0, "Hong Kong International Airport", "Low-lying and exposed on reclaimed land — among the first to feel a storm surge."],
        [[22.285, 114.16], 2.4, "Central & harbourfront", "The waterfront promenade is where a 3-metre surge first reaches a public road."],
        [[22.284, 114.22], 2.4, "Island East", "Low-lying streets behind the seawall; the district's own drainage is the limiting factor."]],
      zh: [
        [[22.309, 113.915], 3.0, "香港國際機場", "填海地勢低、暴露在外——風暴潮最先感受到嘅地方之一。"],
        [[22.285, 114.16], 2.4, "中環及海濱一帶", "海濱長廊係3米風暴潮最先湧上公路嘅地方。"],
        [[22.284, 114.22], 2.4, "港島東", "海堤後方地勢低嘅街道；區內排水能力係關鍵所在。"]]
    },
    points: {
      en: [[[22.30, 114.05], "Projected landfall", "The current best estimate — with a roughly 90km margin either way, per the two disagreeing forecast models."]],
      zh: [[[22.30, 114.05], "預測登陸點", "目前最佳估計——按兩個分歧模型計算，兩邊誤差範圍約90公里。"]]
    }
  }
};
/* Popover keys are authored against the Plain voice. Calm/ELI5 rewrites may
   reword a chip ("has closed to shipping" -> "is closed to ships"), which would
   orphan the tap in those voices — so alias each variant's i-th token to the
   Plain token's entry. Token extraction mirrors md()'s mini-markup. */
function tokensOf(text) {
  const out = [];
  if (typeof text !== "string") return out;
  const re = /\[kw:([^\]]+)\]|\[[gob]:([^|\]]*)\|([^\]]+)\]|\[i:([^\]]+)\]/g;
  let m;
  while ((m = re.exec(text))) out.push(m[1] != null ? m[1] : m[4] != null ? m[4] : m[2] + m[3]);
  return out;
}
const normKey = s => s.replace(/\s+/g, " ").trim().toLowerCase().replace(/[.,;:。，；：]+$/, "");
function aliasVoices(node, pop) {
  if (node == null || typeof node !== "object") return;
  if (typeof node.p === "string") {
    const base = tokensOf(node.p).map(normKey);
    for (const v of ["c", "e"]) {
      if (typeof node[v] !== "string") continue;
      tokensOf(node[v]).map(normKey).forEach((k, i) => {
        if (pop[k] == null && base[i] != null && pop[base[i]] != null) pop[k] = pop[base[i]];
      });
    }
    return;
  }
  for (const key of Object.keys(node)) aliasVoices(node[key], pop);
}

function kitConfig(lang) {
  const maps = {};
  for (const key of Object.keys(MAPS)) {
    const m = MAPS[key];
    maps[key] = { center: m.center, zoom: m.zoom, zones: m.zones[lang], points: m.points[lang] };
  }
  const pop = {};
  for (const sid of ORDER) Object.assign(pop, STORIES[sid][lang].pop || {});
  for (const sid of ORDER) aliasVoices(STORIES[sid][lang], pop);
  return { maps, pop };
}
const LEAFLET_TAGS = `<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">\n<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script>`;

/* ---------- feed ---------- */
function mcard(lang, sid, idx, cardCount) {
  const F = FEED_TEXT[lang];
  const dots = Array.from({ length: Math.min(cardCount, 5) }, (_, i) => `<span class="dot ${i === 0 ? "on" : ""}"></span>`).join("");
  /* harvest the first mcard as a template */
  const tmplStart = H.FEED_STAGE.indexOf('<article class="mcard"');
  let t = H.element(H.FEED_STAGE, tmplStart);
  t = t.replace(/data-story="\d+"/, `data-story="${idx}"`);
  t = t.replace(/(background-image:url\(')[^']+('\))/, `$1${IMG[sid]}$2`);
  t = t.replace(/(<h3 class="mc-title">)[^<]*(<\/h3>)/, `$1${F.titles[sid]}$2`);
  t = t.replace(/(<p class="mc-desc">)[^<]*(<\/p>)/, `$1${F.descs[sid]}$2`);
  t = t.replace(/(<span class="tag-t">)Essential(<\/span>)/, `$1${F.tags[sid][0]}$2`);
  t = t.replace(/(<span class="tag-t">)(Society|Housing|Energy)(<\/span>)/, `$1${F.tags[sid][1]}$3`);
  t = t.replace(/(<span>)\d+ cards(<\/span>)/, `$1${cardCount} ${F.cardsWord}$2`);
  t = t.replace(/(<span>)1h ago(<\/span>)/, `$1${F.ago}$2`);
  t = t.replace(/(<span class="track-t">)Track(<\/span>)/, `$1${F.track}$2`);
  t = t.replace(/<div class="pagedots">[\s\S]*?<\/div>/, `<div class="pagedots">${dots}</div>`);
  const conf = STORIES[sid][lang].conf;
  t = t.replace(/(<span class="conf-word">)[^<]*(<\/span>)/, `$1${conf}$2`);
  if (conf === "Medium" || conf === "中") t = t.replace('conf-high', 'conf-med').replace('b-low on', 'b-low off');
  return t;
}
function feedStage(lang) {
  const F = FEED_TEXT[lang];
  let h = H.FEED_STAGE;
  h = h.replace(/(<div class="greeting"><h1>)[^<]*(<\/h1><div class="date">)[^<]*(<\/div>)/,
    `$1${F.greeting}$2<span data-today></span>$3`);
  h = h.replace(/(<div class="snap-head"><p>)[^<]*(<\/p>)/, `$1${F.snapTitle}$2`);
  h = h.replace(/(<span class="liveDot"><\/span><span>)[^<]*(<\/span>)/, `$1${F.now}$2`);
  h = h.replace(/(<p class="snap-lede">)[\s\S]*?(<\/p>)/, `$1${F.lede}$2`);
  h = h.replace(/<ul class="snap-list">[\s\S]*?<\/ul>/, `<ul class="snap-list">${F.bullets.map(b => `<li>${b}</li>`).join("")}</ul>`);
  h = h.replace(/(<span class="l">)[^<]*(<\/span><span class="r">)[^<]*(<\/span>)/, `$1${F.sources}$2${F.openSnap}$3`);
  h = h.replace(/(<div class="scrollcue" role="button">)([\s\S]*?)(<span>)[^<]*(<\/span>)/, `$1$2$3${F.cue}$4`);
  h = h.replace(/(<div class="section-title">)[^<]*(<\/div>)/, `$1${F.section}$2`);
  /* swap the 3 mcards for 4 generated ones */
  const first = h.indexOf('<article class="mcard"');
  let last = first, probe = first;
  while ((probe = h.indexOf('<article class="mcard"', probe + 1)) !== -1) last = probe;
  const lastEl = H.element(h, last);
  const cardsHtml = ORDER.map((sid, k) => {
    const story = STORIES[sid][lang];
    return mcard(lang, sid, k + 1, story.cards.length + 1);
  }).join("");
  h = h.slice(0, first) + cardsHtml + h.slice(last + lastEl.length);
  return h;
}

/* ---------- stages + overlays ---------- */
function storyStage(i, sid, lang) {
  const d = STORIES[sid][lang];
  const cards = [{ type: HERO_TYPE[sid], data: d.hero, conn: d.heroConn }].concat(d.cards);
  const next = i === 4 ? 1 : i + 1;
  const prev = i - 1; /* stage 1's prev is the feed (0) */
  /* The bottom "up next" pill always names whichever story actually occupies the
     next ORDER slot — derived, not the story's own static nextTitle field, so a
     story swapped into a different slot (e.g. the CES build) can't show a stale
     title for a neighbour it no longer has. */
  const nextTitle = STORIES[ORDER[next - 1]][lang].hero.title
    .replace(/\s*\[he:[^\]]+\]\s*/g, " ").replace(/\s+/g, " ").trim();
  return C.stage(i, {
    tag: d.tag, conf: d.conf, story: sid, voices: d.voices,
    tabs: d.tabs, nextTitle, next, prev,
    cards, newsCount: NEWS_COUNTS[i - 1]
  });
}
function overlayFor(i, lang) {
  const nextIdx = i === 4 ? 1 : i + 1;
  const nsid = ORDER[nextIdx - 1];
  const n = STORIES[nsid][lang];
  const after = STORIES[ORDER[(nextIdx === 4 ? 1 : nextIdx + 1) - 1]][lang];
  return C.overlay(i, {
    img: n.hero.img, title: n.hero.title.replace(/\s*\[he:[^\]]+\]\s*/g, " ").replace(/\s+/g, " ").trim(),
    paras: n.hero.paras, conn: n.ovConn || n.heroConn,
    tag: n.tag, conf: n.conf, count: NEWS_COUNTS[nextIdx - 1],
    tabs: n.tabs, nextTitle: n.nextTitle, story: nsid, voices: n.voices
  });
}

/* ---------- vsheet ---------- */
function vsheet(lang) {
  let h = H.SCRIM + H.VSHEET_FULL;
  const V = FEED_TEXT[lang].vsheet;
  if (!V) return h;
  h = h.replace(/(<div class="vs-title">)[^<]*(<\/div>)/, `$1${V.title}$2`);
  h = h.replace(/(<div class="vs-sub">)[^<]*(<\/div>)/, `$1${V.sub}$2`);
  for (const [key, name, desc] of V.rows) {
    h = h.replace(new RegExp(`(data-voice="${key}"[^>]*>\\s*<span class="vs-rt"><span class="vs-name">)[^<]*(</span><span class="vs-desc">)[^<]*(</span>)`),
      `$1${name}$2${desc}$3`);
  }
  return h;
}

/* ---------- appendix script: sheets + clock + date ---------- */
const APPENDIX = `
(function(){
  function openSheet(kind, sid){
    var fr = document.getElementById(kind);
    if(fr.getAttribute('data-for') !== sid){ fr.src = kind + '-' + sid + '.html?b=__NF_BUILD__'; fr.setAttribute('data-for', sid); }
    document.getElementById('layer-' + kind).classList.add('on');
  }
  document.querySelectorAll('.nf-conf[data-story]').forEach(function(el){
    el.style.cursor = 'pointer';
    el.addEventListener('click', function(){ openSheet('confidence', el.getAttribute('data-story')); });
  });
  document.querySelectorAll('[data-social][data-story]').forEach(function(el){
    el.addEventListener('click', function(){ openSheet('pulse', el.getAttribute('data-story')); });
  });
  window.addEventListener('message', function(e){
    var m = e.data || {};
    if(m.nf === 'close' && m.sheet) document.getElementById('layer-' + m.sheet).classList.remove('on');
  });
  var ZH = /^zh/i.test(document.documentElement.lang || '');
  function tick(){
    var d = new Date(), h = d.getHours(), m = d.getMinutes(), x = h % 12 === 0 ? 12 : h % 12;
    var s = x + ':' + (m < 10 ? '0' : '') + m;
    document.querySelectorAll('.time,.nf-time').forEach(function(n){ n.textContent = s; });
  }
  tick(); setInterval(tick, 10000); document.addEventListener('visibilitychange', tick);
  var W_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      W_ZH = ['日','一','二','三','四','五','六'],
      M_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var now = new Date();
  document.querySelectorAll('[data-today]').forEach(function(e){
    e.textContent = ZH ? (now.getMonth()+1) + '月' + now.getDate() + '日 星期' + W_ZH[now.getDay()]
                       : W_EN[now.getDay()] + ', ' + now.getDate() + ' ' + M_EN[now.getMonth()];
  });
})();`;

/* ---------- assemble ---------- */
const SPRITE = H.S.slice(0, H.S.indexOf('<div class="nf-frame"'));
const ENGINE = fs.readFileSync("src/engine.js", "utf8");
const APP_CSS = fs.readFileSync("src/app.css", "utf8");
const KIT_CSS = fs.readFileSync("src/kit.css", "utf8");
const KIT_JS = fs.readFileSync("src/kit.js", "utf8");
const TOUR_CSS = fs.readFileSync("src/tour.css", "utf8");
const TOUR_JS = fs.readFileSync("src/tour.js", "utf8");

const COUNTER_CSS = lang => `
/* 4-story counter overrides */
${[1, 2, 3, 4].map(i => `#stage-${i} .conn.end::after{content:"${lang === "zh" ? `第 ${i} / 15 篇讀畢` : `Story ${i} / 15 read`}"}`).join("\n")}
`;

function head(lang) {
  const zh = lang === "zh";
  return `<!DOCTYPE html>
<html lang="${zh ? "zh-Hant-HK" : "en"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Fliq</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Inter:wght@100..900&family=Noto+Sans+HK:wght@300..900&family=Noto+Serif+HK:wght@400..700&family=Source+Serif+4:opsz,wght@8..60,400..700&display=swap" rel="stylesheet">
${LEAFLET_TAGS}
<style>${APP_CSS}
${KIT_CSS}
${TOUR_CSS}
${COUNTER_CSS(lang)}
/* nf-flush: inside the shell iframe the frame sits at 0,0 with no page chrome —
   v2 centered itself with body padding, which made the document 48px taller than
   the viewport and produced a root scrollbar on classic-scrollbar platforms */
html,body{height:100%;overflow:hidden}
body{display:block;padding:0;min-height:0}
.nf-frame{margin:0;border-radius:0;box-shadow:none}
/* tariff hero is portrait with a caption baked into its lower third:
   anchor its crop to the top so the subject shows and the caption crops away */
.mcard[data-story="3"] .media{background-position:center top!important}
#stage-3 .c-s2story-hero{background-position:center top!important}
#ov-src-2 .s2-hero{background-position:center top!important}
/* conf pill: Medium variant matches the feed's conf-med palette; third bar dims */
.nf-conf--med{background:#ab5c2b}
.nf-conf--med .cbars path:last-of-type{fill-opacity:.3;stroke-opacity:.3}
/* Hero emoji are a Friend-voice flourish only. app.css gates them inside
   .hero-title, but that class belongs to the "story" hero type alone — the
   s2story heroes (every story except the France one) title with
   .c-s2story-title, which no rule covered, so their emoji showed in Plain and
   Calm too. Gate all three title classes the same way. */
.c-s2story-title .he,.s2-title .he{display:none;font-size:20px;line-height:28px;vertical-align:-1px}
.voice-eli5 .c-s2story-title .he,.voice-eli5 .s2-title .he{display:inline}
/* nf-noscrollbars: simulated phone — never show scrollbars anywhere */
*{scrollbar-width:none;-ms-overflow-style:none}
*::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}
${zh ? `/* CJK: extend stacks */
body,.nf-frame{font-family:'Inter','Noto Sans HK',sans-serif}
/* Noto Serif HK must precede the generic serif keyword or CJK never reaches it */
.voice-calm .para,.voice-calm .conn-t{font-family:'New York','Source Serif 4','Noto Serif HK',serif!important}` : ""}
</style>
</head>
<body>`;
}

function buildApp(lang) {
  const stages = ORDER.map((sid, k) => storyStage(k + 1, sid, lang)).join("\n");
  const overlays = [1, 2, 3, 4].map(i => overlayFor(i, lang)).join("\n");
  return head(lang) +
    SPRITE +
    `<div class="nf-frame" id="nf-frame">\n` +
    feedStage(lang) + "\n" + stages + "\n" + overlays + "\n" +
    vsheet(lang) + "\n" +
    `<div class="sheet-layer" id="layer-confidence"><iframe id="confidence"></iframe></div>\n` +
    `<div class="sheet-layer" id="layer-pulse"><iframe id="pulse"></iframe></div>\n` +
    `</div>\n<script>${ENGINE}</scr` + `ipt>\n<script>${APPENDIX}</scr` + `ipt>\n` +
    (lang === "zh" ? `<script>window.NF_VOICE_SHORT=${JSON.stringify({ "Plain": "平實", "Calm explainer": "淡定", "ELI5 friend": "朋友仔" })};</scr` + `ipt>\n` : "") +
    `<script>window.NF_KIT=${JSON.stringify(kitConfig(lang))};</scr` + `ipt>\n<script>${KIT_JS}</scr` + `ipt>\n<script>${TOUR_JS}</scr` + `ipt>\n</body></html>`;
}

/* build stamp: gives every deploy fresh URLs for the app and sheet documents,
   so GitHub Pages' 10-minute edge cache can't serve a stale app once the shell
   itself has refreshed (query strings are distinct cache keys on the CDN) */
const STAMP = Date.now().toString(36);
const OUT = CES ? "ces" : ".";
/* The CES film is English-only, so that build emits just en/ — shipping a
   zh edition nobody maintains behind a language toggle on a public URL is
   worse than not shipping one. The public demo stays bilingual. */
const LANGS = CES ? ["en"] : ["en", "zh"];
if (CES) {
  for (const lang of LANGS) fs.mkdirSync(`${OUT}/${lang}`, { recursive: true });
}
for (const lang of LANGS) {
  let html = buildApp(lang).split("__NF_BUILD__").join(STAMP);
  /* ces/en/app.html sits one directory deeper than the public en/app.html,
     so every "../assets/..." reference (hero images, harvested sprite icons)
     needs an extra "../" to still reach the shared assets/ folder. Sheets
     don't need this — they carry no raster refs (avatars are inline SVG). */
  if (CES) html = html.replace(/\.\.\/assets\//g, "../../assets/");
  fs.writeFileSync(`${OUT}/${lang}/app.html`, html);
  console.log(`${OUT}/${lang}/app.html`, Math.round(html.length / 1024) + "KB");
}
/* CES build reuses the same shell (splash + scale-to-fit); only the app
   iframes underneath it differ, so the public index.html is never touched
   in CES mode — the CES shell is a thin copy pointed at ces/en|zh/. */
if (CES) {
  /* ces/index.html sits one directory deeper than the public shell, so its
     root-relative asset refs (assets/img/...) need a ../ prefix; the app
     src (lang+"/app.html") is already correct as-is, relative to ces/.
     English-only, so the language chooser and the EN/中 rail toggle come out
     and the stored nf-lang preference is ignored — otherwise a visitor who
     last picked 中 on the public demo would land on a zh app that this build
     doesn't emit. */
  const shell = fs.readFileSync("index.html", "utf8")
    .replace(/var NF_BUILD="[^"]*"/, `var NF_BUILD="${STAMP}"`)
    .replace(/(href|src)="assets\//g, `$1="../assets/`)
    .replace(/<button class="langbig langbig--zh"[\s\S]*?<\/button>/, "")
    .replace(/<div class="langbtn"[\s\S]*?<\/div>/, "")
    .replace(/var stored=localStorage\.getItem\("nf-lang"\);/, 'var stored="en";');
  fs.writeFileSync(`${OUT}/index.html`, shell);
  console.log(`${OUT}/index.html stamped`, STAMP, "(English only)");
} else {
  const shell = fs.readFileSync("index.html", "utf8")
    .replace(/var NF_BUILD="[^"]*"/, `var NF_BUILD="${STAMP}"`);
  fs.writeFileSync("index.html", shell);
  console.log("index.html stamped", STAMP);
}
