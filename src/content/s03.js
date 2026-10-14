/* s03 — US 50% tariffs on Canada. P1 starter (Plain; voices fall back).
   P2 adds the animated c-numbers chart + whos/args + Calm/ELI5 triples. */
module.exports = {
  en: {
    story: "s03", tag: "Essential", conf: "High", voices: "61",
    nextTitle: "The steepest summer climb in a decade",
    tabs: ["The Story", "Key Facts", "How It Works", "Then vs Now", "Why This Matters", "What's Next"],
    hero: {
      img: "../assets/img/hero-tariff.jpg",
      title: "50% tariffs, [he:📦] between allies. [he:🧾]",
      paras: [
        { p: "The order is signed: **50% tariffs on most Canadian goods**, citing autos, alcohol and dairy. It is the steepest tariff wall between two allied economies in modern history.",
          c: "It's official: **50% tariffs on most Canadian goods** — autos, alcohol and dairy singled out. No two allied economies have ever raised a wall this steep.",
          e: "A new rule just switched on: **most things from Canada now carry a 50% tax** at the US border. Allies have never done this to each other before." },
        { p: "Ottawa calls it 'economic coercion' and is drafting retaliation. The price effects will not wait for the [kw:politics].",
          c: "Ottawa calls it 'economic coercion' and is writing up its response. The price effects won't wait for the [kw:politics] to settle.",
          e: "Canada is angry and planning to hit back. But prices start moving long before the [kw:politics] gets sorted out." }
      ]
    },
    heroConn: { def: "The scale of what just changed, in three numbers.",
                e5: "📏 Here's how big this really is — in three numbers. 🔢" },
    cards: [
      { type: "keyfacts", data: {
          tiles: [{ fig: "50%", lab: "tariff rate" }, { fig: "$3.6B", lab: "daily trade" }],
          paras: [
            "The rate applies to [g:most goods |categories], with energy carved out — for now. 77% of Canada's exports normally head south.",
            "Whether USMCA's dispute process even applies is [o:contested by both |capitals], and retailers say shelf-price effects land [b:within six to eight |weeks]."
          ] },
        conn: { def: "Those are the numbers. Here's the machinery that moves them to your receipt.",
                e5: "🔢 Those are the numbers. Now the machine that moves them onto YOUR receipt. 🧾" } },
      { type: "hiw", data: {
          chain: ["Tariff", "Importer", "Retailer", "Your price"],
          sub: "paid at the border · passed down the chain",
          out: "the same cart costs more at the same store",
          para: { p: "The importer pays the tariff at the border, and 2018's round showed the cost **passes through near-completely** — the [kw:pass-through] lands on households, not exporters.",
                  c: "The importer pays at the border — and 2018 showed the cost **passes through almost entirely**. The [kw:pass-through] lands on households, not exporters.",
                  e: "The company importing the goods pays the tax — then passes it along. Last time, **nearly all of it** ended up on shoppers. That's what [kw:pass-through] means." } },
        conn: { def: "That's the mechanism. Compare the border before and after.",
                e5: "⚙️ That's the machine. Now look at the border, before vs after. 🪞" } },
      { type: "thennow", data: {
          then: { lab: "JAN", fig: "2%", desc: "average tariff — goods crossed the border almost untaxed" },
          now: { lab: "NOW", fig: "50%", desc: "a wall steeper than the 2018 steel dispute's 25% peak, doubled" },
          para: { p: "Supply chains built over thirty years cross this border **seven times** to make one car — they [b:cannot re-shore in a |season].",
                  c: "The supply chains built over thirty years cross this border **seven times** for one car — they [b:can't re-shore in a |season].",
                  e: "A single car crosses the border **seven times** before it's finished. Factories can't just [b:move home in a |season]." } },
        conn: { def: "If the chains can't move, the cost must. Here's where it lands.",
                e5: "🔗 The chains can't move, so the cost does. Guess where it lands. 🫵" } },
      { type: "why", data: {
          boxes: [
            { vis: "🧺", lab: "Your basket", para: "Dairy, beer and winter produce reprice first — an estimated **$2,400 a year** per US household." },
            { vis: "🚗", lab: "Your car", para: "Every crossing adds tariff cost, so **new-car prices climb** even for 'American' models." },
            { vis: "💼", lab: "Your job", para: "Border-state factories and retailers absorb the shock first — **both directions**." }
          ],
          para: "Tariff walls between integrated economies relocate margins, not factories — from households to customs receipts." },
        conn: { def: "That's the cost. Here's what to watch next.",
                e5: "💸 That's the bill. Here's what to keep an eye on. 👀" } },
      { type: "next", data: {
          rows: [
            { vis: "🇨🇦", lab: "The counter-list", para: "Ottawa's draft covers $30B in US goods; nothing is law until gazetted — and provinces want more." },
            { vis: "📊", lab: "The first CPI prints", para: "Two months of data will show the pass-through rate directly. Groceries and autos move first." },
            { vis: "🤝", lab: "Emergency talks", para: "Mexico has quietly offered to host. Neither principal has agreed — yet." }
          ],
          para: "The record is strong and public. What remains open is the response — and the response has a [i:deadline of its own]." },
        conn: { def: "Tariffs press from outside. In Hong Kong, the squeeze is coming from inside the housing market.",
                e5: "🌏 That's pressure from outside. In Hong Kong, the squeeze comes from inside. 🏠" } }
    ],
    ovConn: { def: "The queue on the tenement stairs shows up before any index does.",
              e5: "🪜 The queue on the stairs shows up 👀 before any index does. 📈" }
  },
  zh: {
    story: "s03", tag: "必讀", conf: "高", voices: "61",
    nextTitle: "十年來最急的夏季升浪",
    tabs: ["本篇", "關鍵事實", "運作機制", "今昔對比", "為何重要", "下一步"],
    hero: {
      img: "../assets/img/hero-tariff.jpg",
      title: "盟友之間，[he:📦] 50%關稅。[he:🧾]",
      paras: [
        "行政命令已簽署：**對大部分加拿大貨品徵收50%關稅**，點名汽車、酒類及乳製品。這是近代史上兩個盟友經濟體之間最高的關稅牆。",
        "渥太華斥之為「經濟脅迫」，正草擬反制。但價格效應不會等[kw:政治]先埋單。"
      ]
    },
    heroConn: { def: "剛剛改變的規模有多大？三個數字講清楚。" },
    cards: [
      { type: "keyfacts", data: {
          tiles: [{ fig: "50%", lab: "關稅稅率" }, { fig: "36億", lab: "美元日均貿易額" }],
          paras: [
            "稅率適用於[g:絕大部分貨品|類別]，能源暫獲豁免——暫時而已。加拿大77%的出口平日輸往美國。",
            "《美墨加協定》的爭端機制是否適用，[o:兩國各執|一詞]；零售商估計，貨架價格效應[b:六至八星期內|浮現]。"
          ] },
        conn: { def: "數字講完。接下來是把數字搬到你單據上的機器。" } },
      { type: "hiw", data: {
          chain: ["關稅", "進口商", "零售商", "你的價錢"],
          sub: "在邊境繳付 · 沿鏈條轉嫁",
          out: "同一車貨品，在同一間店變貴",
          para: "進口商在邊境繳稅，2018年那一輪顯示成本**近乎完全轉嫁**——[kw:轉嫁]最終落在家庭身上，不在出口商。" },
        conn: { def: "機制講完。對比一下邊境的今與昔。" } },
      { type: "thennow", data: {
          then: { lab: "1月", fig: "2%", desc: "平均關稅——貨品過境幾乎免稅" },
          now: { lab: "現在", fig: "50%", desc: "比2018年鋼鋁爭端25%高位再翻一倍的關稅牆" },
          para: "三十年建成的供應鏈，一架車要**過境七次**才完工——[b:不可能一季之內|搬回本土]。" },
        conn: { def: "鏈條搬不動，成本就要動。看看它落在哪裏。" } },
      { type: "why", data: {
          boxes: [
            { vis: "🧺", lab: "你的餸籃", para: "乳製品、啤酒和冬季蔬果最先加價——估計每個美國家庭每年多付**2,400美元**。" },
            { vis: "🚗", lab: "你的車", para: "每過境一次就多一層稅，**新車價格照升**——「美國車」也不例外。" },
            { vis: "💼", lab: "你的工作", para: "邊境州份的工廠和零售商首當其衝——**兩個方向都是**。" }
          ],
          para: "深度融合經濟體之間的關稅牆，搬得動的是利潤，不是工廠——由家庭荷包搬去海關帳目。" },
        conn: { def: "這是代價。接下來看要盯住甚麼。" } },
      { type: "next", data: {
          rows: [
            { vis: "🇨🇦", lab: "反制清單", para: "渥太華草案涵蓋300億美元美國貨品；刊憲前未成法律——各省還想加碼。" },
            { vis: "📊", lab: "頭兩期CPI", para: "兩個月數據將直接顯示轉嫁比率。食品與汽車最先變動。" },
            { vis: "🤝", lab: "緊急會談", para: "墨西哥已暗示願意作東。兩位主角，暫時未有一位點頭。" }
          ],
          para: "紀錄扎實且公開。未定的是回應——而回應有[i:自己的死線]。" },
        conn: { def: "關稅是外來的壓力。在香港，擠壓來自住屋市場內部。" } }
    ],
    ovConn: { def: "唐樓樓梯上的人龍，比任何指數都先出現。" }
  }
};

/* ===== P2: animated chart + popovers ===== */
{
const en = module.exports.en, zh = module.exports.zh;
en.cards.splice(0, 0, { type: "numbers2", data: { title: "Numbers",
    banner: { fig: "50%", lab: "Average tariff on Canadian goods — up from 2% in January." },
    cols: [["2%", 6, "Jan"], ["10%", 18, "Mar"], ["22%", 32, "May"], ["25%", 36, "Jun"], ["50%", 62, "Jul", "50% — the new blanket order", true]],
    para: { p: "For scale: the 2018 steel dispute peaked at 25%. This week's order [b:doubles |it] in one step.",
            c: "For scale: the 2018 steel dispute peaked at 25%. This week's order [b:doubles |it] in a single step.",
            e: "The last big fight, in 2018, topped out at 25%. This new rule [b:doubles |it] in one go." } },
  conn: { def: "That is the climb. Now the ledger — what the order actually covers.",
          e5: "📈 That's the climb. Now the ledger — what this order actually covers. 📋" } });
en.tabs.splice(1, 0, "Numbers");
zh.cards.splice(0, 0, { type: "numbers2", data: { title: "數字",
    banner: { fig: "50%", lab: "對加拿大貨品的平均關稅——1月時僅為2%。" },
    cols: [["2%", 6, "1月"], ["10%", 18, "3月"], ["22%", 32, "5月"], ["25%", 36, "6月"], ["50%", 62, "7月", "50%——全面關稅令生效", true]],
    para: "作個對比：2018年鋼鋁爭端高位是25%。本週的命令一步[b:翻|倍]。" },
  conn: { def: "升勢講完。接下來看帳目——這道命令實際涵蓋甚麼。" } });
zh.tabs.splice(1, 0, "數字");
en.pop = {
  "politics": "Retaliation lists, USMCA panels, emergency talks — the formal machinery. It moves in months; supply chains reprice in weeks.",
  "most goods categories": "The published schedule covers the large majority of trade lines, with energy carved out. A near-blanket rate behaves differently from targeted tariffs — there is nowhere to reroute.",
  "contested by both capitals": "Ottawa says the USMCA pact plainly applies; Washington says the security carve-out puts the order outside it. The carve-out has never been tested at this scale.",
  "within six to eight weeks": "Retail analysts' estimate based on inventory cycles — how long current stock lasts before tariffed goods hit shelves.",
  "pass-through": "How much of a tariff shows up in consumer prices. Studies of the 2018 round found pass-through was near-complete within months.",
  "doubles it": "From 25% to 50% — the steepest single tariff step between allied economies on record.",
  "cannot re-shore in a season": "Re-shoring timelines are projections from past cases: plants take years to site, permit and build — not months."
};
zh.pop = {
  "政治": "反制清單、《美墨加》仲裁、緊急會談——正式的機器。它以月計運轉；供應鏈以週計重新定價。",
  "絕大部分貨品類別": "命令附表覆蓋絕大多數貿易項目，能源獲豁免。近乎全面的稅率與針對性關稅性質迥異——根本無路可繞。",
  "兩國各執一詞": "渥太華指協定明顯適用；華府稱安全豁免令命令置身協定之外。這條豁免從未在此規模下受考驗。",
  "六至八星期內浮現": "零售分析師按庫存周期估算——現貨賣完、關稅貨上架，大約就是這個時間。",
  "轉嫁": "關稅有多少反映在消費物價上。2018年一輪的研究發現，數月內轉嫁近乎完全。",
  "翻倍": "由25%到50%——盟友經濟體之間有紀錄以來最陡的一步。",
  "不可能一季之內搬回本土": "回流時間表按過往案例推算：建廠選址、審批、施工以年計，不是以月計。"
};
}

/* ===== P3: zh Calm/ELI5 voice matrix ===== */
{
const zh = module.exports.zh;
const by = t => zh.cards.find(c => c.type === t);
const tr = (o, k, c, e) => { o[k] = { p: o[k], c: c, e: e }; };

tr(zh.hero.paras, 0,
  "正式落實了：**大部分加拿大貨品，將被徵收50%關稅**——汽車、酒類及乳製品被點名。兩個盟友經濟體之間，從未築過這麼高的牆。",
  "新規矩開咗掣：**大部分加拿大貨嚟到美國關口，都要抽50%稅**。盟友之間，未試過去到咁盡。");
tr(zh.hero.paras, 1,
  "渥太華斥之為「經濟脅迫」，正在草擬回應。但價格效應，不會等[kw:政治]先埋單。",
  "加拿大好嬲，話係「經濟脅迫」，諗緊點反擊。但係價格唔會等[kw:政治]搞掂先郁㗎。");
zh.heroConn.e5 = "📏 呢單嘢有幾大鑊？三個數字話你知。🔢";

const kf = by("keyfacts");
tr(kf.data.paras, 0,
  "稅率適用於[g:絕大部分貨品|類別]，能源獲豁免——但只是暫時。加拿大77%的出口，平日都輸往美國。",
  "稅係抽[g:絕大部分貨品|類別]嘅，能源暫時甩身——係暫時咋。加拿大77%嘅出口，平時都係落去美國。");
tr(kf.data.paras, 1,
  "《美墨加協定》的爭端機制是否適用，[o:兩國各執|一詞]。零售商估計，貨架上的價格效應，會在[b:六至八星期內|浮現]。",
  "《美墨加協定》搞唔搞得掂呢單嘢，[o:兩國各執|一詞]。零售商估，貨架價錢[b:六至八星期內|浮現]變化。");
kf.conn.e5 = "🔢 數字講完。跟住睇部機器，點樣將啲數搬上你張單。🧾";

const nb = by("numbers2");
tr(nb.data, "para",
  "作個對比：2018年鋼鋁爭端的高位是25%。本週的命令，一步就[b:翻|倍]。",
  "畀個對比你：2018年嗰單鋼鋁大戰，最高先25%。今個禮拜呢條命令，一嘢[b:翻|倍]。");
nb.conn.e5 = "📈 升勢係咁。跟住睇部機器點搬佢上你張單。🧾";

const hw = by("hiw");
tr(hw.data, "para",
  "進口商在邊境繳稅——而2018年那一輪顯示，成本**近乎完全轉嫁**。[kw:轉嫁]最終落在家庭身上，不在出口商。",
  "入口商喺關口交稅，跟住層層推落去。上次2018年，**差唔多成筆數**最後都係消費者找——呢樣嘢就叫[kw:轉嫁]。");
hw.conn.e5 = "⚙️ 部機器係咁運作。跟住對比吓個關口，以前同而家。🪞";

const tn = by("thennow");
tr(tn.data, "para",
  "用三十年建成的供應鏈，一架車要**過境七次**才完工——[b:不可能一季之內|搬回本土]。",
  "一架車埋尾之前要**過境七次**。啲廠[b:不可能一季之內|搬回本土]㗎。");
tn.conn.e5 = "🔗 條鏈搬唔郁，啲錢就要郁。估吓落喺邊個度？🫵";

const wy = by("why");
tr(wy.data.boxes[0], "para",
  "乳製品、啤酒和冬季蔬果會最先加價——估計每個美國家庭，每年要多付**2,400美元**。",
  "奶製品、啤酒同冬天嘅菜最快加——估計每個美國家庭一年多畀**2,400美元**。");
tr(wy.data.boxes[1], "para",
  "每過境一次，就多一層稅——**新車價格照升**，「美國車」也不例外。",
  "過一次境就疊一層稅，**新車一樣加價**——就算「美國車」都走唔甩。");
tr(wy.data.boxes[2], "para",
  "邊境州份的工廠和零售商首當其衝——而且**兩個方向都是**。",
  "邊境州份啲工廠同舖頭最先食嘢——**兩邊都係**。");
tr(wy.data, "para",
  "深度融合的經濟體之間築關稅牆，搬得動的是利潤，不是工廠——由家庭荷包，搬去海關帳目。",
  "行到咁埋嘅兩個經濟體打稅戰，搬得郁嘅係錢，唔係工廠——由你荷包搬去海關數簿。");
wy.conn.e5 = "💸 呢張係帳單。跟住睇要盯實乜。👀";

const nx = by("next");
tr(nx.data.rows[0], "para",
  "渥太華的草案涵蓋300億美元美國貨品。刊憲之前，一切未成法律——而各省還想加碼。",
  "加拿大張反制清單涵蓋300億美元美國貨；未刊憲都未算數——啲省仲想加辣。");
tr(nx.data.rows[1], "para",
  "兩個月的數據，將直接顯示轉嫁比率——食品與汽車最先變動。",
  "兩個月嘅數據就會直接話你知轉嫁咗幾多。食品同車最先郁。");
tr(nx.data.rows[2], "para",
  "墨西哥已暗示願意作東。只是兩位主角，暫時未有一位點頭。",
  "墨西哥靜靜雞話可以做東道主。兩位主角就暫時邊個都未點頭。");
tr(nx.data, "para",
  "紀錄扎實且公開。未定的是回應——而回應，有[i:自己的死線]。",
  "啲紀錄清清楚楚放晒喺度。未知嘅係點回應——而回應有[i:自己的死線]。");
nx.conn.e5 = "🌏 關稅係出面嚟嘅壓力。喺香港，擠壓係由樓市入面嚟。🏠";

zh.ovConn.e5 = "🪜 唐樓樓梯嗰條人龍 👀 比任何指數都出現得早。📈";
}

/* ===== typed inline-transparency entries (design from the single-file demo) ===== */
{
const en = module.exports.en, zh = module.exports.zh;
en.pop = {
  "politics": { def: "Retaliation lists, USMCA panels, emergency talks — the formal machinery. It moves in months; supply chains reprice in weeks." },
  "pass-through": { def: "How much of a tariff shows up in consumer prices. Studies of the 2018 round found pass-through was near-complete within months." },
  "most goods categories": { rows: [
    ["Who confirmed it", "The published schedule in the Federal Register lists the covered categories, with energy carved out."],
    ["Why we're sure", "The order and its schedule are public text."],
    ["Why it matters", "A near-blanket rate behaves differently from targeted tariffs — there is nowhere to reroute."]],
    src: ["Federal Register"] },
  "contested by both capitals": { rows: [
    ["What's disputed", "Whether USMCA's dispute process applies to this order at all."],
    ["Who says what", "Ottawa says the pact plainly applies; Washington says the security carve-out puts the order outside it."],
    ["Why the gap exists", "The carve-out has never been tested at this scale, so there is no precedent to point to."]],
    src: ["Frontline Wire"] },
  "within six to eight weeks": { rows: [
    ["Whose view this is", "Retail analysts estimating from inventory cycles."],
    ["Why it's analysis, not fact", "It projects how long current stock lasts before tariffed goods reach shelves — an estimate, not a measurement."]],
    src: ["Retail inventory analysts"] },
  "doubles it": { rows: [
    ["Whose view this is", "A comparison against the 2018 steel round's 25% peak."],
    ["Why it's analysis, not fact", "From 25% to 50% is arithmetic; calling it the steepest step on record is a judgement about which precedents count."]],
    src: ["Frontline Wire"] },
  "cannot re-shore in a season": { rows: [
    ["Whose view this is", "Supply-chain economists projecting from past re-shoring attempts."],
    ["Why it's analysis, not fact", "Plants take years to site, permit and build — the timeline is a projection from precedent, not a law."]],
    src: ["Frontline Wire"] }
};
zh.pop = {
  "政治": { def: "反制清單、《美墨加》仲裁、緊急會談——正式的機器。它以月計運轉；供應鏈以週計重新定價。" },
  "轉嫁": { def: "關稅有多少反映在消費物價上。2018年一輪的研究發現，數月內轉嫁近乎完全。" },
  "絕大部分貨品類別": { rows: [
    ["誰證實", "聯邦公報刊載的附表列明涵蓋類別，能源獲豁免。"],
    ["為何可信", "命令及附表均屬公開文本。"],
    ["為何重要", "近乎全面的稅率與針對性關稅性質迥異——根本無路可繞。"]],
    src: ["聯邦公報"] },
  "兩國各執一詞": { rows: [
    ["爭議所在", "《美墨加協定》的爭端機制是否適用於這道命令。"],
    ["各方說法", "渥太華指協定明顯適用；華府稱安全豁免令命令置身協定之外。"],
    ["分歧因何而生", "這條豁免從未在此規模下受考驗，無先例可援。"]],
    src: ["Frontline Wire"] },
  "六至八星期內浮現": { rows: [
    ["這是誰的觀點", "零售分析師按庫存周期推算。"],
    ["為何屬分析而非事實", "推算現貨賣完、關稅貨上架所需時間——是估算，不是量度。"]],
    src: ["零售業分析師"] },
  "翻倍": { rows: [
    ["這是誰的觀點", "把今次稅率與2018年鋼鋁爭端25%高位直接比較。"],
    ["為何屬分析而非事實", "由25%到50%是算術；「有紀錄以來最陡一步」則取決於把哪些先例計算在內。"]],
    src: ["Frontline Wire"] },
  "不可能一季之內搬回本土": { rows: [
    ["這是誰的觀點", "供應鏈經濟學者按過往回流案例推算。"],
    ["為何屬分析而非事實", "建廠選址、審批、施工以年計——時間表是按先例推算，不是定律。"]],
    src: ["Frontline Wire"] }
};
}
