/* s01 — Strait of Hormuz closure. P1 starter: Plain strings (voices fall back);
   P2 adds map/timeline/risk/signal kit cards + Calm/ELI5 triples. */
module.exports = {
  en: {
    story: "s01", tag: "Essential", conf: "Medium", voices: "54",
    nextTitle: "Should under-16s be banned from social media?",
    tabs: ["The Story", "Key Facts", "Why This Matters", "What's Next"],
    hero: {
      img: "../assets/img/hero-strait.jpg",
      title: "The strait that [he:🌊] prices the world [he:🛢️] is closed. [he:🚫]",
      paras: [
        { p: "Twelve days of strikes have hit **more than 5,000 targets** across Iran, and the response has shut the [kw:Strait of Hormuz] — the channel a fifth of the world's oil passes through.",
          c: "Here's where things stand: twelve days of strikes, **more than 5,000 targets** hit — and in response, the [kw:Strait of Hormuz] has been closed. A fifth of the world's oil normally sails through it.",
          e: "For twelve days, one side has been striking targets — **over 5,000** so far. The other side answered by closing the [kw:Strait of Hormuz], the sea lane a fifth of the world's oil travels through." },
        { p: "Officials describe the campaign as pressure. What no briefing has offered is **any description of how it ends**.",
          c: "Officials keep calling the campaign 'pressure'. What nobody has offered yet is **any picture of how it ends**.",
          e: "The people in charge call it 'pressure'. But nobody — not one briefing — has said **how this is supposed to end**." }
      ]
    },
    heroConn: { def: "Start with where. Five provinces struck, and one channel that prices the world.",
                e5: "🗺️ Let's start with WHERE. Five provinces hit — and one channel that prices the world. 🌍" },
    cards: [
      { type: "keyfacts", data: {
          tiles: [{ fig: "5,000+", lab: "targets struck" }, { fig: "$140", lab: "Brent crude, past" }],
          paras: [
            { p: "The [g:Strait of Hormuz has closed to |shipping] — the first full closure in its history. Tanker transits have been at zero for seven days, and insurers have withdrawn cover entirely.",
              c: "The headline fact: the [g:Strait of Hormuz has closed to |shipping] — the first full closure ever. Tankers have made zero transits for seven days, and insurers have pulled cover completely.",
              e: "The big fact: the [g:Strait of Hormuz is closed to |ships] — that has never happened before. No tankers for seven days, and insurers won't cover the trip at all." },
            { p: "The death toll is [o:disputed by three thousand |lives] between the two sides' counts, and the stated objective has shifted from nuclear sites to [kw:restoring deterrence].",
              c: "The two sides' casualty counts are [o:three thousand lives |apart], and the stated goal has drifted — from nuclear sites to [kw:restoring deterrence].",
              e: "The two sides can't agree how many people have died — their counts are [o:three thousand |apart]. And the goal keeps changing: first nuclear sites, now [kw:restoring deterrence]." }
          ] },
        conn: { def: "Those are the facts on the record. Here's what could still go wrong.",
                e5: "📋 Those are the facts. Now — what could still go wrong? ⚠️" } },
      { type: "why", data: {
          boxes: [
            { vis: "⛽", lab: "Your fuel",
              para: { p: "A fifth of the world's oil normally transits the strait. With it shut, **every barrel everywhere reprices** — including the one in your tank.",
                      c: "A fifth of the world's oil normally passes through. With the strait shut, **every barrel reprices** — including the one in your tank.",
                      e: "A fifth of the world's oil goes through this one channel. Close it, and **every drop of petrol costs more** — yours too." } },
            { vis: "🛒", lab: "Your shelf",
              para: { p: "Shipping surcharges are already appearing in freight quotes; they reach **retail prices within weeks**.",
                      c: "Shipping surcharges are already showing up in freight quotes — and they reach **shelf prices within weeks**.",
                      e: "Shipping is already getting pricier. In a few weeks, **things in shops cost more** because of it." } },
            { vis: "📈", lab: "Your bills",
              para: { p: "Oil past $140 feeds into electricity, plastics and food logistics — the rise **spreads far beyond the pump**.",
                      c: "With oil past $140, the rise feeds into electricity, plastics and food logistics — it **spreads far beyond the pump**.",
                      e: "Oil over $140 makes electricity, plastic and food delivery dearer too — it's **not just petrol**." } }
          ],
          para: { p: "A closed strait seven thousand kilometres away lands on your receipts before any diplomat lands on a runway.",
                  c: "A closed strait seven thousand kilometres away reaches your receipts before any diplomat reaches a runway.",
                  e: "A blocked sea lane far, far away shows up on your receipts before the politicians even get on a plane." } },
        conn: { def: "That's the cost to you. Here's what could move it next.",
                e5: "💸 That's the cost to you. Here's what could change it next. ⏭️" } },
      { type: "next", data: {
          rows: [
            { vis: "🚢", lab: "Insurance is the signal",
              para: { p: "Insurers withdrew cover before every previous price spike. A single insured transit would mark the turn.",
                      c: "Insurers pulled cover before every previous spike. One insured tanker transit would mark the turn.",
                      e: "Watch the insurers. The moment one covered ship sails through, things are turning around." } },
            { vis: "🕊️", lab: "The Oman channel",
              para: { p: "Oman has hosted three quiet contacts. Collapsed is not the same as over.",
                      c: "Oman has hosted three quiet contacts already. Collapsed is not the same as over.",
                      e: "Oman keeps quietly passing messages between the two sides. The talks aren't dead — just sleeping." } },
            { vis: "🛰️", lab: "The target list",
              para: { p: "Strikes have drifted toward infrastructure over four days — the drift tells you more than the briefings.",
                      c: "Strikes have drifted toward infrastructure over the past four days — the drift says more than the briefings do.",
                      e: "The strikes keep moving toward power stations and ports. Where they land tells you more than what anyone says." } }
          ],
          para: { p: "No historical precedent exists for a full closure — which is why every forecast, including this one, is provisional.",
                  c: "There's no precedent for a full closure — which is why every forecast, including this one, is provisional.",
                  e: "This has never happened before. So every guess about what's next — even this one — is just a guess." } },
        conn: { def: "That's the strait. The next fight is over who your kids talk to online.",
                e5: "🌊 That's the strait. Next up: who your kids get to talk to online. 📵" } }
    ],
    ovConn: { def: "Nothing about being a teenager online changed overnight. What changed was the appetite to act.",
              e5: "⚠️ Nothing about being a teenager online 🌐 changed overnight — the grown-ups just decided to act. 🤯" }
  },
  zh: {
    story: "s01", tag: "必讀", conf: "中", voices: "54",
    nextTitle: "16歲以下應否禁用社交媒體？",
    tabs: ["本篇", "關鍵事實", "為何重要", "下一步"],
    hero: {
      img: "../assets/img/hero-strait.jpg",
      title: "為全球定價的 [he:🌊] 海峽，[he:🛢️] 封了。[he:🚫]",
      paras: [
        "十二日空襲，擊中伊朗境內**逾5,000個目標**；報復之下，[kw:霍爾木茲海峽]宣告封鎖——全球五分之一的石油，平日正是取道這條水道。",
        "官員把行動形容為「施壓」。但十二日以來，沒有任何一場簡報講過**這一切如何收科**。"
      ]
    },
    heroConn: { def: "先由地點講起。五個省份被襲，一條為全球定價的水道。" },
    cards: [
      { type: "keyfacts", data: {
          tiles: [{ fig: "5,000+", lab: "個目標被擊中" }, { fig: "$140", lab: "布蘭特期油升穿" }],
          paras: [
            "[g:霍爾木茲海峽已對商船|封閉]——歷史上首次全面封鎖。油輪通航量連續七日歸零，保險商已全面撤保。",
            "死亡數字[o:雙方統計相差|三千]，而宣稱目標已由核設施轉為[kw:重建威懾]。"
          ] },
        conn: { def: "這些是紀錄在案的事實。接下來看還有甚麼可以出錯。" } },
      { type: "why", data: {
          boxes: [
            { vis: "⛽", lab: "你的燃油", para: "全球五分之一的石油平日取道此峽。一旦封鎖，**每一桶油都要重新定價**——包括你油缸裏那一桶。" },
            { vis: "🛒", lab: "你的貨架", para: "航運附加費已出現在運費報價；數星期內就會**傳到零售價**。" },
            { vis: "📈", lab: "你的帳單", para: "油價升穿140美元，電力、塑膠、食品物流全部受累——升幅**遠不止於油站**。" }
          ],
          para: "七千公里外一條封鎖的海峽，先落在你的單據上，然後才有外交官落在停機坪上。" },
        conn: { def: "這是你的代價。接下來看甚麼可以改變它。" } },
      { type: "next", data: {
          rows: [
            { vis: "🚢", lab: "保險是訊號", para: "過往每次油價急升之前，保險商都先行撤保。只要有一艘獲承保的油輪通過，就是轉勢的標記。" },
            { vis: "🕊️", lab: "阿曼渠道", para: "阿曼已促成三次低調接觸。破裂不等於玩完。" },
            { vis: "🛰️", lab: "打擊目標的走向", para: "過去四日，空襲明顯移向基礎設施——目標的漂移，比簡報講得更多。" }
          ],
          para: "全面封鎖史無前例——所以每一個預測，包括這一個，都只屬暫定。" },
        conn: { def: "海峽講完。下一場爭議：你的孩子在網上可以跟誰說話。" } }
    ],
    ovConn: { def: "青少年上網的處境並非一夜改變，改變的是社會出手處理的決心。" }
  }
};

/* ===== P2: interactive kit cards ===== */
const SCH = require("../schematics.js");
const en = module.exports.en, zh = module.exports.zh;
en.cards.splice(0, 0,
  { type: "map", data: { title: "Map", mapKey: "gulf", schem: SCH.gulf,
      legend: [["#800080", "Strike zones"], ["#ec4837", "Chokepoint"]],
      para: { p: "Strikes cluster across five provinces. The pivotal point is the Strait of Hormuz, [g:now |closed].",
              c: "The strikes cluster across five provinces — and the pivot of it all is the Strait of Hormuz, [g:now |closed].",
              e: "The strikes hit five different regions. But the spot that matters most is the Strait of Hormuz — [g:now |closed]." } },
    conn: { def: "That is where. Here is when — today, hour by hour.", e5: "🗺️ That's WHERE. Now here's WHEN — today, hour by hour. ⏰" } },
  { type: "timeline", data: { title: "Timeline", chips: ["Breaking", "Developing"], rows: [
      ["06:40", "Tanker traffic at zero for a seventh day; insurers suspend Gulf transit cover entirely."],
      ["09:15", "Strikes reported near Bandar Abbas port facilities — the closest yet to the strait itself."],
      ["11:52", "Oman confirms a third round of quiet mediation \"remains open\"."],
      ["14:30", "Brent crude passes $140; surcharges appear in retail freight quotes."]] },
    conn: { def: "That is the day so far. Step back for the ledger of what is known.", e5: "🕐 That's today so far. Now zoom out for the big picture. 🔭" } });
en.cards.splice(3, 0,
  { type: "risk2", data: { title: "Risk", rows: [
      ["high", "High", "A prolonged closure", "Supply strain spreads to nearby markets within weeks; surcharges reach shelf prices."],
      ["med", "Medium", "The conflict widens", "One miscalculation pulls in a third party; the risk does not stay inside a border."],
      ["low", "Low", "Fuel disruption at home", "Strategic reserves cover the near term."]],
      para: { p: "Risk levels reflect what is known now and may change.", c: "These levels reflect what's known right now — they can and will move.", e: "These are today's best guesses. They can change fast." } },
    conn: { def: "Those are the risks. These are the dials to watch move.", e5: "⚠️ Those are the risks. Now watch these dials. 🎛️" } },
  { type: "signal", data: { title: "Signal", rows: [
      [72, "Pressure on shipping routes", "Insurance withdrawal is the leading indicator — it moved before every previous spike.", true],
      [38, "Talks resume via Oman", "The channel has produced three quiet contacts; collapsed is not the same as over.", false],
      [55, "Further strikes near nuclear sites", "The target list has drifted toward infrastructure over the past four days.", false]],
      para: { p: "Tap a signal to see why it is moving. Probabilities are model estimates, not predictions.",
              c: "Tap any signal to see why it's moving. The percentages are model estimates, not promises.",
              e: "Tap a dial to see why it's moving. The numbers are smart guesses, not promises." } },
    conn: { def: "Those are the dials. Here is why they reach your wallet.", e5: "🎛️ Those are the dials. Here's why they reach YOUR wallet. 👛" } });
en.tabs = ["The Story", "Map", "Timeline", "Key Facts", "Risk", "Signal", "Why This Matters", "What's Next"];
zh.cards.splice(0, 0,
  { type: "map", data: { title: "地圖", mapKey: "gulf", schem: SCH.gulf,
      legend: [["#800080", "空襲區"], ["#ec4837", "咽喉要道"]],
      para: "空襲集中於五個省份。整場危機的支點，是[g:已經|封鎖]的霍爾木茲海峽。" },
    conn: { def: "這是地點。接下來是時間——今日，逐個鐘看。" } },
  { type: "timeline", data: { title: "時序", chips: ["突發", "發展中"], rows: [
      ["06:40", "油輪通航量連續第七日歸零；保險商全面暫停波斯灣航運承保。"],
      ["09:15", "阿巴斯港港口設施附近傳出空襲——迄今最貼近海峽的一輪。"],
      ["11:52", "阿曼證實第三輪低調斡旋「渠道仍然打開」。"],
      ["14:30", "布蘭特期油升穿140美元；附加費現身零售運費報價。"]] },
    conn: { def: "這是今日的進度。退一步，看看已知的帳目。" } });
zh.cards.splice(3, 0,
  { type: "risk2", data: { title: "風險", rows: [
      ["high", "高", "封鎖持續", "供應壓力數星期內波及鄰近市場；附加費直達零售價。"],
      ["med", "中", "衝突擴大", "一次誤判就足以捲入第三方；風險不會乖乖留在國界之內。"],
      ["low", "低", "本地燃料中斷", "戰略儲備足以應付短期。"]],
      para: "風險等級按現時所知評估，隨時或會改變。" },
    conn: { def: "這些是風險。接下來是值得盯住的錶盤。" } },
  { type: "signal", data: { title: "訊號", rows: [
      [72, "航運路線壓力升溫", "保險商撤保是領先指標——過往每次急升之前，它都先行變動。", true],
      [38, "阿曼渠道重啟談判", "渠道已促成三次低調接觸；破裂不等於玩完。", false],
      [55, "再有核設施附近遭空襲", "過去四日，打擊目標明顯移向基礎設施。", false]],
      para: "輕按訊號可查看變動原因。百分比屬模型估算，並非預測。" },
    conn: { def: "錶盤講完。接下來是它們為何摸到你的錢包。" } });
zh.tabs = ["本篇", "地圖", "時序", "關鍵事實", "風險", "訊號", "為何重要", "下一步"];
en.pop = {
  "strait of hormuz": "A 33km-wide channel between Iran and Oman — the only sea route out of the Persian Gulf. About a fifth of global oil normally passes through it. It has never been fully closed before now.",
  "now closed": "Tanker-transit data has shown zero transits for seven days, and both governments acknowledge the closure. It is one of the few points on which all parties agree.",
  "restoring deterrence": "The campaign's stated aim since week two — a posture, not a target list. The language shift from 'nuclear sites' is documented; what it means about intent is interpretation.",
  "disputed by three thousand lives": "Officials on each side publish figures that serve their case; independent monitors cannot reach the strike zones, so nobody can settle the number.",
  "strait of hormuz has closed to shipping": "Measured independently of either government: transit trackers show zero tanker passages for seven consecutive days."
};
zh.pop = {
  "霍爾木茲海峽": "伊朗與阿曼之間一條闊33公里的水道，是波斯灣唯一出海口。全球約五分之一的石油平日取道於此。此前從未全面封鎖。",
  "已經封鎖": "油輪通航數據連續七日歸零，兩國政府均承認封鎖——這是各方罕有一致同意的事實。",
  "重建威懾": "行動方自第二週起的官方說法——是姿態，不是目標清單。措辭由「核設施」轉變有紀錄可查；意圖為何則屬解讀。",
  "雙方統計相差三千": "兩邊官方各自公布對己有利的數字；獨立監察無法進入空襲區，數字無從釐清。",
  "霍爾木茲海峽已對商船封閉": "由第三方獨立量度：航運追蹤顯示油輪連續七日零通過。"
};

/* ===== P3: zh Calm/ELI5 voice matrix ===== */
{
const zh = module.exports.zh;
const by = t => zh.cards.find(c => c.type === t);
const tr = (o, k, c, e) => { o[k] = { p: o[k], c: c, e: e }; };

tr(zh.hero.paras, 0,
  "先講清楚發生了甚麼：十二日空襲，伊朗境內**逾5,000個目標**被擊中；作為報復，[kw:霍爾木茲海峽]宣告封鎖。全球五分之一的石油，平日正是取道這條水道。",
  "簡單講：打咗十二日，伊朗境內**超過5,000個目標**中招；跟住對方反手一招——[kw:霍爾木茲海峽]封咗。全世界五分一嘅石油，平時就係行呢條水道㗎。");
tr(zh.hero.paras, 1,
  "官員口中，這是一場「施壓」行動。只是十二日下來，沒有一場簡報談過**這一切如何收科**。",
  "啲官員話呢啲叫「施壓」。但係打足十二日，冇一場簡報肯講**呢件事點收科**。");
zh.heroConn.e5 = "🔢 行動背後啲數字冇得拗。其餘嘅嘢？乜都拗緊。🤷";

const mp = by("map");
tr(mp.data, "para",
  "空襲集中在五個省份。而整場危機的支點，是[g:已經|封鎖]的霍爾木茲海峽。",
  "空襲主要集中喺五個省。但成件事最關鍵嘅位，係[g:已經|封鎖]嘅霍爾木茲海峽。");
mp.conn.e5 = "🗺️ 呢度係「邊度」。跟住睇「幾時」——今日，逐個鐘睇。⏰";

by("timeline").conn.e5 = "🕐 今日去到呢度。退後一步，睇吓大局。🔭";

const kf = by("keyfacts");
tr(kf.data.paras, 0,
  "[g:霍爾木茲海峽已對商船|封閉]——歷史上首次全面封鎖。油輪通航量已連續七日歸零，保險商亦全面撤保。",
  "[g:霍爾木茲海峽已對商船|封閉]——史上第一次封到咁盡。油輪連續七日一隻都冇過，保險公司全部縮沙。");
tr(kf.data.paras, 1,
  "死亡數字[o:雙方統計相差|三千]；而官方宣稱的目標，也由核設施轉為[kw:重建威懾]。",
  "死亡數字[o:雙方統計相差|三千]，而佢哋把口講嘅目標，亦由核設施變咗做[kw:重建威懾]。");
kf.conn.e5 = "📋 呢啲係白紙黑字嘅事實。跟住睇吓佢哋點樣摸到你個銀包。👛";

const rk = by("risk2");
tr(rk.data, "para",
  "這些風險等級，反映的是此刻所知——它們可以變，也將會變。",
  "呢啲等級係而家最好嘅估算。變起上嚟可以好快㗎。");
rk.conn.e5 = "⚠️ 風險講完。跟住盯實呢幾個錶盤。🎛️";

const sg = by("signal");
tr(sg.data, "para",
  "輕按任何一個訊號，可看到它變動的原因。百分比是模型估算，不是承諾。",
  "㩒一下個訊號，就知佢點解郁。啲百分比係模型估算，唔係預言。");
sg.conn.e5 = "🎛️ 錶盤講完。跟住講點解佢哋摸得到你個錢包。👛";

const wy = by("why");
tr(wy.data.boxes[0], "para",
  "全球五分之一的石油，平日都取道這條海峽。一旦封鎖，**每一桶油都要重新定價**——你油缸裏那桶也不例外。",
  "全世界五分一嘅油平時都行呢條峽。一封咗，**桶桶油都要重新開價**——連你油缸嗰桶都計埋。");
tr(wy.data.boxes[1], "para",
  "航運附加費已經出現在運費報價上；再過數星期，就會**傳到零售價**。",
  "運費報價已經加咗附加費；幾個禮拜之內就會**去到零售價**。");
tr(wy.data.boxes[2], "para",
  "油價升穿140美元後，電力、塑膠、食品物流全都受累——升幅**遠不止於油站**。",
  "油價衝過140美元，電費、塑膠、送貨樣樣中招——加價**唔止係油站**。");
tr(wy.data, "para",
  "七千公里外一條封鎖的海峽，會先落在你的單據上——然後，外交官才落在停機坪上。",
  "七千公里外封咗條海峽，最先落嘅係你張單——之後先到外交官落飛機。");
wy.conn.e5 = "💸 呢個係你嘅代價。跟住睇吓乜嘢可以改變佢。👀";

const nx = by("next");
tr(nx.data.rows[0], "para",
  "過往每一次油價急升，保險商都先一步撤保。所以只要有一艘獲承保的油輪通過，就是轉勢的標記。",
  "以前每次油價飆之前，保險公司都係最快閃嗰個。所以幾時有一隻買到保險嘅油輪過到海峽，就係轉勢嘅信號。");
tr(nx.data.rows[1], "para",
  "阿曼已促成三次低調接觸——談判破裂，不等於一切告終。",
  "阿曼已經搭咗三次低調嘅路。傾唔攏，唔代表玩完。");
tr(nx.data.rows[2], "para",
  "過去四日，空襲明顯移向基礎設施。目標的漂移，往往比簡報透露得更多。",
  "呢四日，空襲明顯轉咗去打基建——個目標點樣移，講嘅嘢多過場簡報。");
tr(nx.data, "para",
  "全面封鎖史無前例——所以每一個預測，包括這一個在內，都只屬暫定。",
  "封到咁盡係史上第一次——所以所有預測，包括呢一個，都係暫定㗎咋。");
nx.conn.e5 = "🌊 海峽講完。下一單嘢：你屋企細路上網可以同邊個傾偈。📵";

zh.ovConn.e5 = "📱 細路上網嘅世界唔係一夜之間變咗——變咗嘅，係大人終於落場處理。🤯";
}

/* ===== typed inline-transparency entries (design from the single-file demo) ===== */
{
const en = module.exports.en, zh = module.exports.zh;
const CLOSED_EN = { rows: [
  ["Who confirmed it", "Transit trackers show zero tanker passages for seven straight days, and both governments acknowledge the closure."],
  ["Why we're sure", "The tracking data is measured independently of either side."],
  ["Why it matters", "It is one of the few points in this story every party agrees on."]],
  src: ["Independent transit trackers", "Frontline Wire"] };
en.pop = {
  "strait of hormuz": { def: "A 33km-wide channel between Iran and Oman — the only sea route out of the Persian Gulf. About a fifth of global oil normally passes through it. It has never been fully closed before now." },
  "restoring deterrence": { def: "The campaign's stated aim since week two — a posture, not a target list. The language shift from 'nuclear sites' is documented; what it means about intent is interpretation." },
  "now closed": CLOSED_EN,
  "strait of hormuz has closed to shipping": CLOSED_EN,
  "disputed by three thousand lives": { rows: [
    ["What's disputed", "How many people the campaign has killed."],
    ["Who says what", "Officials on each side publish figures that serve their case — the counts differ by roughly three thousand."],
    ["Why the gap exists", "No independent monitor can reach the strike zones, so nobody can settle the number."]],
    src: ["Frontline Wire"] }
};
const CLOSED_ZH = { rows: [
  ["誰證實", "航運追蹤數據連續七日錄得零通航，兩國政府均承認封鎖。"],
  ["為何可信", "數據由第三方獨立量度，不受任何一方左右。"],
  ["為何重要", "這是全篇報道中，各方罕有一致同意的事實。"]],
  src: ["獨立航運追蹤機構", "Frontline Wire"] };
zh.pop = {
  "霍爾木茲海峽": { def: "伊朗與阿曼之間一條闊33公里的水道，是波斯灣唯一出海口。全球約五分之一的石油平日取道於此。此前從未全面封鎖。" },
  "重建威懾": { def: "行動方自第二週起的官方說法——是姿態，不是目標清單。措辭由「核設施」轉變有紀錄可查；意圖為何則屬解讀。" },
  "已經封鎖": CLOSED_ZH,
  "霍爾木茲海峽已對商船封閉": CLOSED_ZH,
  "雙方統計相差三千": { rows: [
    ["爭議所在", "這場行動到底造成多少人死亡。"],
    ["各方說法", "兩邊官方各自公布對己有利的數字——相差約三千。"],
    ["分歧因何而生", "獨立監察無法進入空襲區，數字無從釐清。"]],
    src: ["Frontline Wire"] }
};
}
