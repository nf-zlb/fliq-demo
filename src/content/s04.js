/* s04 — HK rents: steepest summer climb in a decade. P1 starter (Plain; voices fall back).
   Structure borrows v2's story 2 (flatsharing). P2 adds HK Leaflet map + chart + ground. */
module.exports = {
  en: {
    story: "s04", tag: "Local", conf: "High", voices: "58",
    nextTitle: "The strait that prices the world is closed",
    tabs: ["The Story", "Key Facts", "Then vs Now", "Why This Matters", "What's Next"],
    hero: {
      img: "../assets/img/hero-rent.jpg",
      title: "The steepest [he:🏠] summer climb [he:📈] in a decade. [he:🇭🇰]",
      paras: [
        { p: "Hong Kong rents rose **almost 4% in the first half** — on pace for the biggest summer gain since 2016. The drivers are measurable: mainland professionals and students, returning expats, and thin supply.",
          c: "Hong Kong rents are up **almost 4% this half-year** — the fastest summer pace since 2016. The drivers are all measurable: mainland professionals and students arriving, expats returning, and very little new supply.",
          e: "Rents in Hong Kong jumped **almost 4% in six months** — the fastest summer rise in ten years. More people arriving, hardly any new flats. That's the whole recipe." },
        { p: "Whether this is recovery or squeeze depends on [kw:which side of a lease you sit].",
          c: "Whether you call it a recovery or a squeeze depends on [kw:which side of the lease you're on].",
          e: "Good news or bad news? Depends whether [kw:you own the flat or rent it]." }
      ]
    },
    heroConn: { def: "Start with where. The squeeze has a shape, district by district.",
                e5: "🗺️ Start with WHERE — the squeeze has a shape, district by district. 🏙️" },
    cards: [
      { type: "keyfacts", data: {
          tiles: [{ fig: "+3.8%", lab: "rents, H1" }, { fig: "$18.9K", lab: "median 1-bed, urban" }],
          paras: [
            "The Rating and Valuation Department's index has risen [g:seven months |straight], cross-checked against Centaline's leading index — they agree within 0.3 points.",
            "Analysts see prices [b:rebounding up to 19% over two |years] on the back of rental growth, though how much is policy-driven inflow versus cycle is [o:still |debated]."
          ] },
        conn: { def: "Those are this summer's numbers. Put them beside 2016's.",
                e5: "🗓️ Those are this summer's numbers. Now put them next to 2016. 🪞" } },
      { type: "thennow", data: {
          then: { lab: "2016", fig: "124.9", desc: "the index peak — the last time landlords repriced mid-week" },
          now: { lab: "NOW", fig: "124.5", desc: "within one normal month's move of the record, after seven straight rises" },
          para: { p: "The pattern is district-led: **Hung Hom is up 6.2%**, fastest since 2016 — universities first, then the [b:rail |lines].",
                  c: "It's district-led: **Hung Hom leads at +6.2%**, the fastest since 2016 — university areas first, then the [b:rail |lines].",
                  e: "Some districts move first: **Hung Hom is up 6.2%**, the fastest anywhere. First near the universities, then along the [b:train |lines]." } },
        conn: { def: "A number at a record is one thing. What it does to you is another.",
                e5: "📈 A record number is one thing. What it does to YOU is another. 🫵" } },
      { type: "why", data: {
          boxes: [
            { vis: "✍️", lab: "Your lease", para: "Renewal letters now open **$1,500–2,000 higher**; agents call waiting 'paying'." },
            { vis: "🎓", lab: "Your district", para: "University areas move first — **Hung Hom +6.2%** — then the pressure rolls down the rail lines." },
            { vis: "💰", lab: "Your savings", para: "Wage growth runs at roughly **half the rental pace**; the gap compounds every renewal." }
          ],
          para: "A rental market can run ahead of incomes for a while, but not ahead of arithmetic — the question is who absorbs the gap." },
        conn: { def: "That's the squeeze today. Here's what decides the next six months.",
                e5: "🤏 That's the squeeze today. Here's what decides the next six months. 🗓️" } },
      { type: "next", data: {
          rows: [
            { vis: "🚄", lab: "The New Territories follow?", para: "Tuen Mun and Yuen Long lagged in H1 — agents report inquiry volume doubling." },
            { vis: "🏦", lab: "Renting converts to buying", para: "The 19% two-year price-rebound case rests entirely on this handover." },
            { vis: "🏗️", lab: "Student housing policy", para: "Hostel expansion has been floated by universities and government; nothing is funded yet." }
          ],
          para: "Q3 data lands within two months — it decides whether 2016's record [i:finally falls]." },
        conn: { def: "Story 4 / 4 read — you've completed today's essentials.",
                e5: "🏁 Story 4 of 4 — you've finished today's essentials! 🎉" } }
    ],
    ovConn: { def: "The numbers behind the campaign are not in dispute. Almost everything else is.",
              e5: "🔢 The numbers aren't in doubt — almost everything else is. 🤷" }
  },
  zh: {
    story: "s04", tag: "本地", conf: "高", voices: "58",
    nextTitle: "為全球定價的海峽，封了",
    tabs: ["本篇", "關鍵事實", "今昔對比", "為何重要", "下一步"],
    hero: {
      img: "../assets/img/hero-rent.jpg",
      title: "十年來最急的 [he:🏠] 夏季升浪。[he:📈][he:🇭🇰]",
      paras: [
        "香港住宅租金上半年**升近4%**——有望創2016年以來最大的夏季升幅。推手有數可依：內地專才與學生、回流外派人員，加上供應緊絀。",
        "這是復甦還是壓力，視乎你[kw:坐在租約的哪一邊]。"
      ]
    },
    heroConn: { def: "先由地點講起。這股壓力，逐區有形有狀。" },
    cards: [
      { type: "keyfacts", data: {
          tiles: [{ fig: "+3.8%", lab: "上半年租金" }, { fig: "$18.9K", lab: "市區一房月租中位數" }],
          paras: [
            "差餉物業估價署指數已[g:連升七個|月]，並與中原領先指數互相核對——兩者相差不足0.3點。",
            "有分析預期樓價受租金帶動[b:兩年內反彈最多|19%]；至於幾多來自政策輸入人才、幾多屬周期回升，[o:仍有|爭論]。"
          ] },
        conn: { def: "這是今個夏天的數字。放到2016年旁邊看看。" } },
      { type: "thennow", data: {
          then: { lab: "2016", fig: "124.9", desc: "指數高位——上一次業主週中改價的年份" },
          now: { lab: "現在", fig: "124.5", desc: "連升七個月後，距離紀錄只差一個普通月份的升幅" },
          para: "格局由地區帶動：**紅磡升6.2%**、全港最快——大學周邊先行，然後沿[b:鐵路|線]擴散。" },
        conn: { def: "數字迫近紀錄是一回事，它對你有甚麼影響，是另一回事。" } },
      { type: "why", data: {
          boxes: [
            { vis: "✍️", lab: "你的租約", para: "續約信開價**貴$1,500至2,000**；代理話：等，就係付鈔。" },
            { vis: "🎓", lab: "你的地區", para: "大學周邊先行——**紅磡+6.2%**——然後壓力沿鐵路線滾落。" },
            { vis: "💰", lab: "你的積蓄", para: "工資增速大約只及**租金升速一半**；落差每次續約都在滾大。" }
          ],
          para: "租金可以跑贏收入一段時間，但跑不贏數學——問題是條數最後由誰埋單。" },
        conn: { def: "這是今日的擠壓。接下來看甚麼決定往後六個月。" } },
      { type: "next", data: {
          rows: [
            { vis: "🚄", lab: "新界接唔接力？", para: "屯門、元朗上半年落後——代理反映查詢量倍增。" },
            { vis: "🏦", lab: "租轉買", para: "兩年反彈19%的推算，正正建基於這一步接力。" },
            { vis: "🏗️", lab: "學生宿舍政策", para: "大學與政府都放過風擴建宿舍；至今未有一項落實撥款。" }
          ],
          para: "第三季數據兩個月內公布——它決定2016年的紀錄[i:破唔破]。" },
        conn: { def: "四篇讀完——今日的必讀，到此為止。" } }
    ],
    ovConn: { def: "行動背後的數字並無爭議。其餘幾乎一切都有。" }
  }
};

/* ===== P2: HK map + chart + ground + popovers ===== */
{
const SCH = require("../schematics.js");
const en = module.exports.en, zh = module.exports.zh;
en.cards.splice(0, 0,
  { type: "map", data: { title: "Map", mapKey: "hk", schem: SCH.hk,
      legend: [["#800080", "Rent change, H1"], ["#ec4837", "Steepest district"]],
      para: { p: "The squeeze is not even. Districts near universities climb fastest, led by [g:Hung Hom at |+6.2%].",
              c: "The squeeze isn't even. University districts climb fastest — led by [g:Hung Hom at |+6.2%].",
              e: "Not every district feels it the same. Areas near universities rise fastest — [g:Hung Hom leads at |+6.2%]." } },
    conn: { def: "That is the where. Here is the climb, month by month.", e5: "🗺️ That's WHERE. Now the climb, month by month. 📆" } },
  { type: "numbers2", data: { title: "Numbers",
      banner: { fig: "+3.8%", lab: "Residential rental index, January to July." },
      cols: [["118", 30, "Jan"], ["120", 38, "Mar"], ["122", 46, "May"], ["123", 52, "Jun"], ["124.5", 58, "Jul", "124.5 — within a whisker of 2016", true]],
      para: { p: "Seven straight monthly rises. The 2016 record of 124.9 sits [b:one normal month |away].",
              c: "Seven straight monthly rises — and the 2016 record of 124.9 now sits [b:one normal month |away].",
              e: "Seven months up in a row. The all-time record from 2016 is [b:one ordinary month |away]." } },
    conn: { def: "Numbers meet the street here. Three scenes from the queue.", e5: "🔢 Now the numbers hit the street. Three scenes from the queue. 🎬" } },
  { type: "ground", data: { title: "On the Ground", disps: [
      ["Hung Hom · Saturday 2PM", "Fifteen viewers queue on the stairs of a walk-up for a 280 sq ft one-bed. It goes over asking within the hour."],
      ["Sha Tin · Thursday 7PM", "An agent's window reprices twice in one week. Landlords are waiting — every week of waiting has been paying."],
      ["To Kwa Wan · Sunday 11AM", "A student WhatsApp group with 800 members trades leads on flats before they are listed."]],
      tiles: ["url('../assets/img/hero-flatshare.jpg') left center/cover", "url('../assets/img/card-flatshare.jpg') center/cover", "url('../assets/img/hero-flatshare.jpg') right center/cover", "url('../assets/img/card-flatshare.jpg') left top/cover"] },
    conn: { def: "That is the street. The ledger of what is measured comes next.", e5: "🎬 That's the street. Now the measured facts. 📋" } });
en.tabs = ["The Story", "Map", "Numbers", "On the Ground", "Key Facts", "Then vs Now", "Why This Matters", "What's Next"];
zh.cards.splice(0, 0,
  { type: "map", data: { title: "地圖", mapKey: "hk", schem: SCH.hk,
      legend: [["#800080", "上半年租金變動"], ["#ec4837", "升幅最急地區"]],
      para: "壓力並不平均。大學周邊地區升得最快，[g:紅磡以+6.2%|領先]。" },
    conn: { def: "地點講完。接下來是逐月攀升的軌跡。" } },
  { type: "numbers2", data: { title: "數字",
      banner: { fig: "+3.8%", lab: "住宅租金指數，1月至7月。" },
      cols: [["118", 30, "1月"], ["120", 38, "3月"], ["122", 46, "5月"], ["123", 52, "6月"], ["124.5", 58, "7月", "124.5——距2016年高位一步之遙", true]],
      para: "連升七個月。2016年的紀錄124.9，只差[b:一個普通月份的|升幅]。" },
    conn: { def: "數字在這裏落地。排隊現場，三個鏡頭。" } },
  { type: "ground", data: { title: "現場直擊", disps: [
      ["紅磡 · 星期六 2PM", "一個280呎一房唐樓單位，十五個準租客喺樓梯排隊睇樓。一個鐘之內，高過叫價成交。"],
      ["沙田 · 星期四 7PM", "地產舖櫥窗一星期改價兩次。經紀話：「業主家陣識得等——等一個禮拜，賺一個禮拜。」"],
      ["土瓜灣 · 星期日 11AM", "一個800人嘅學生WhatsApp群組，盤未上網先喺群入面流轉。"]],
      tiles: ["url('../assets/img/hero-flatshare.jpg') left center/cover", "url('../assets/img/card-flatshare.jpg') center/cover", "url('../assets/img/hero-flatshare.jpg') right center/cover", "url('../assets/img/card-flatshare.jpg') left top/cover"] },
    conn: { def: "現場講完。接下來是量度得到的事實。" } });
zh.tabs = ["本篇", "地圖", "數字", "現場", "關鍵事實", "今昔對比", "為何重要", "下一步"];
en.pop = {
  "which side of a lease you sit": "The same index reads as recovery to owners and squeeze to tenants. The number is one fact; good or bad is a position.",
  "seven months straight": "Directly readable from the Rating and Valuation Department's published monthly table. Duration separates a trend from a blip.",
  "rebounding up to 19% over two years": "A widely-cited analyst scenario (Bloomberg Intelligence), not an official forecast — it depends on rental demand converting to purchases.",
  "still debated": "Government points to talent-scheme approvals; independent economists note regional cycles moved the same way. The two effects arrived together and cannot be cleanly separated yet.",
  "hung hom at +6.2%": "District-level leasing data compiled by two competing agencies — both publish the same ranking. Universities-first identifies the marginal renter driving the market.",
  "hung hom leads at +6.2%": "District-level leasing data compiled by two competing agencies — both publish the same ranking.",
  "one normal month away": "The index has averaged +0.9 points a month since January; the record sits 0.4 above July's print.",
  "rail lines": "Sha Tin and Tai Wai track cross-boundary commuter demand; Tseung Kwan O absorbs new-town supply faster than completions arrive."
};
zh.pop = {
  "坐在租約的哪一邊": "同一個指數，業主讀作復甦，租客讀作壓力。數字是事實；「好事定壞事」是立場。",
  "連升七個月": "差餉物業估價署按月數表直接可讀。持續時間，正是趨勢與雜音的分界。",
  "兩年內反彈最多19%": "被廣泛引用的分析員情景推算（彭博行業研究），並非官方預測——前提是租務需求轉化為置業。",
  "仍有爭論": "政府引用人才計劃批核；獨立經濟學者指區內周期同步向上。兩股力量同時出現，暫難乾淨分割。",
  "紅磡以+6.2%領先": "兩間互相競爭的代理行編製的分區租務數據——排名一致。「大學周邊先行」點出推動市場的邊際租客。",
  "一個普通月份的升幅": "指數自1月起平均每月升0.9點；紀錄只比7月讀數高0.4點。",
  "鐵路線": "沙田大圍反映跨境通勤需求；將軍澳的新供應被吸納的速度快過落成。"
};
}

/* ===== P3: zh Calm/ELI5 voice matrix ===== */
{
const zh = module.exports.zh;
const by = t => zh.cards.find(c => c.type === t);
const tr = (o, k, c, e) => { o[k] = { p: o[k], c: c, e: e }; };

tr(zh.hero.paras, 0,
  "香港住宅租金這半年**升了近4%**——是2016年以來最快的夏季步伐。推手全都有數可依：內地專才與學生到港、外派人員回流，加上新供應少之又少。",
  "香港啲租六個月**升咗成4%**——十年嚟最快嘅夏天。多咗人嚟，又冇乜新樓——成個配方就係咁簡單。");
tr(zh.hero.paras, 1,
  "說它是復甦還是壓力，視乎你[kw:坐在租約的哪一邊]。",
  "好消息定壞消息？睇你[kw:坐在租約的哪一邊]囉。");
zh.heroConn.e5 = "📏 啲數字——用兩把唔同嘅尺，度咗兩次。📊";

const kf = by("keyfacts");
tr(kf.data.paras, 0,
  "差餉物業估價署的指數已[g:連升七個|月]，並與中原領先指數互相核對——兩者相差不足0.3點。",
  "差估署個指數[g:連升七個|月]，仲同中原個指數夾過——差極都唔夠0.3點。");
tr(kf.data.paras, 1,
  "有分析預期，樓價受租金帶動，[b:兩年內反彈最多|19%]。至於幾多來自政策輸入人才、幾多屬周期回升，[o:仍有|爭論]。",
  "有分析估樓價會跟住租金[b:兩年內反彈最多|19%]。至於幾多係搶人才搶返嚟、幾多係個市自己轉角，[o:仍有|爭論]。");
kf.conn.e5 = "🗓️ 呢啲係今個夏天嘅數。擺埋2016年嗰啲一齊睇。🪞";

const mp = by("map");
tr(mp.data, "para",
  "壓力並不平均——大學周邊的地區升得最快，[g:紅磡以+6.2%|領先]。",
  "唔係區區一樣㗎。大學隔籬嗰啲區升得最快——[g:紅磡以+6.2%|領先]。");
mp.conn.e5 = "🗺️ 呢度係「邊度」。跟住睇逐個月點爬上去。📆";

const nb = by("numbers2");
tr(nb.data, "para",
  "連升七個月——2016年的紀錄124.9，如今只差[b:一個普通月份的|升幅]。",
  "連升七個月。距離2016年個紀錄124.9，仲爭[b:一個普通月份的|升幅]咋。");
nb.conn.e5 = "🔢 啲數喺呢度落地。排隊現場，三個鏡頭。🎬";

by("ground").conn.e5 = "🎬 現場睇完。跟住係度得出嚟嘅事實。📋";

const tn = by("thennow");
tr(tn.data, "para",
  "格局由地區帶動：**紅磡領先，升6.2%**，是2016年以來最快——大學周邊先行，然後沿[b:鐵路|線]擴散。",
  "有啲區行先：**紅磡升咗6.2%**，全港最快。大學隔籬先升，之後沿[b:鐵路|線]一路傳落去。");
tn.conn.e5 = "📈 個數字破唔破紀錄係一回事，喺條樓梯度排隊睇樓又係另一回事。🪜";

const wy = by("why");
tr(wy.data.boxes[0], "para",
  "續約信的開價，**貴了$1,500至2,000**。代理們說：等，就是付鈔。",
  "封續約信一開價就**貴咗$1,500至2,000**。啲經紀話：你等，就係畀緊錢。");
tr(wy.data.boxes[1], "para",
  "大學周邊先行——**紅磡+6.2%**——然後，壓力沿鐵路線滾落。",
  "大學隔籬行先——**紅磡+6.2%**——之後壓力沿鐵路線碌落嚟。");
tr(wy.data.boxes[2], "para",
  "工資的增速，大約只及**租金升速的一半**——而落差，每次續約都在滾大。",
  "人工升極都係**租金一半**左右；條數每次續約都滾大一截。");
tr(wy.data, "para",
  "租金可以跑贏收入一段時間，卻跑不贏數學——問題是，條數最後由誰埋單。",
  "租金可以跑贏人工一排，但跑唔贏條數——問題係最後邊個埋單。");
wy.conn.e5 = "🤏 今日嘅擠壓係咁。跟住睇乜嘢決定往後六個月。🗓️";

const nx = by("next");
tr(nx.data.rows[0], "para",
  "屯門、元朗在上半年落後——但代理反映，查詢量已經倍增。",
  "屯門元朗上半年跑輸——但係啲經紀話，查詢多咗一倍。");
tr(nx.data.rows[1], "para",
  "兩年反彈19%的推算，正正建基於這一步接力之上。",
  "話兩年反彈19%嗰條數，靠嘅正正就係呢一步接力。");
tr(nx.data.rows[2], "para",
  "大學與政府都放過風要擴建宿舍——至今，未有一項落實撥款。",
  "大學同政府都放過風話起多啲宿舍；到而家，一蚊都未批。");
tr(nx.data, "para",
  "第三季數據會在兩個月內公布——2016年的紀錄[i:破唔破]，由它決定。",
  "第三季條數兩個月內出——2016年個紀錄[i:破唔破]，就睇佢。");
nx.conn.e5 = "🏁 四篇讀晒——今日嘅必讀，收工！🎉";

zh.ovConn.e5 = "🔢 啲數字冇得拗——其餘樣樣都拗緊。🤷";
}

/* ===== typed inline-transparency entries (design from the single-file demo) ===== */
{
const en = module.exports.en, zh = module.exports.zh;
const HUNGHOM_EN = { rows: [
  ["Who confirmed it", "District-level leasing data compiled by two competing agencies — both publish the same ranking."],
  ["Why we're sure", "Rivals with no reason to agree, agreeing."],
  ["Why it matters", "Universities-first identifies the marginal renter driving the market."]],
  src: ["District leasing reports"] };
en.pop = {
  "which side of a lease you sit": { def: "The same index reads as recovery to owners and squeeze to tenants. The number is one fact; good or bad is a position." },
  "seven months straight": { rows: [
    ["Who confirmed it", "The Rating and Valuation Department's published monthly table shows seven consecutive rises."],
    ["Why we're sure", "Directly readable from the official series, cross-checked against Centaline's leading index."],
    ["Why it matters", "Duration is what separates a trend from a blip."]],
    src: ["RVD monthly index", "Centaline leading index"] },
  "rebounding up to 19% over two years": { rows: [
    ["Whose view this is", "A widely cited analyst scenario (Bloomberg Intelligence), not an official forecast."],
    ["Why it's analysis, not fact", "It depends entirely on rental demand converting into purchases — a handover that has not happened yet."]],
    src: ["Bloomberg Intelligence"] },
  "still debated": { rows: [
    ["What's disputed", "How much of the rise comes from policy-driven inflow versus the regional cycle."],
    ["Who says what", "Government points to talent-scheme approvals; independent economists note regional markets moved the same way."],
    ["Why the gap exists", "The two effects arrived together and cannot be cleanly separated yet."]],
    src: ["Government statements", "Independent economists"] },
  "hung hom at +6.2%": HUNGHOM_EN,
  "hung hom leads at +6.2%": HUNGHOM_EN,
  "one normal month away": { rows: [
    ["Whose view this is", "Simple arithmetic on the official series."],
    ["Why it's analysis, not fact", "The index has averaged +0.9 points a month since January; the record sits 0.4 above July's print. 'The average holds' is the assumption."]],
    src: ["RVD monthly index"] },
  "rail lines": { rows: [
    ["Whose view this is", "District agents reading where demand lands next."],
    ["Why it's analysis, not fact", "Sha Tin and Tai Wai track commuter demand, Tseung Kwan O absorbs new supply — the sequence is observed, the extrapolation is not."]],
    src: ["District leasing reports"] }
};
const HUNGHOM_ZH = { rows: [
  ["誰證實", "兩間互相競爭的代理行編製的分區租務數據——排名一致。"],
  ["為何可信", "無理由夾口供的對手，得出同一結論。"],
  ["為何重要", "「大學周邊先行」點出推動市場的邊際租客。"]],
  src: ["分區租務報告"] };
zh.pop = {
  "坐在租約的哪一邊": { def: "同一個指數，業主讀作復甦，租客讀作壓力。數字是事實；「好事定壞事」是立場。" },
  "連升七個月": { rows: [
    ["誰證實", "差餉物業估價署按月數表錄得連升七個月。"],
    ["為何可信", "官方數列直接可讀，並與中原領先指數互相核對。"],
    ["為何重要", "持續時間，正是趨勢與雜音的分界。"]],
    src: ["差估署按月指數", "中原領先指數"] },
  "兩年內反彈最多19%": { rows: [
    ["這是誰的觀點", "被廣泛引用的分析員情景推算（彭博行業研究），並非官方預測。"],
    ["為何屬分析而非事實", "前提是租務需求轉化為置業——這一步接力至今未發生。"]],
    src: ["彭博行業研究"] },
  "仍有爭論": { rows: [
    ["爭議所在", "升幅有幾多來自政策輸入人才、幾多屬區域周期。"],
    ["各方說法", "政府引用人才計劃批核；獨立經濟學者指區內市場同步向上。"],
    ["分歧因何而生", "兩股力量同時出現，暫難乾淨分割。"]],
    src: ["政府聲明", "獨立經濟學者"] },
  "紅磡以+6.2%領先": HUNGHOM_ZH,
  "一個普通月份的升幅": { rows: [
    ["這是誰的觀點", "對官方數列的簡單算術。"],
    ["為何屬分析而非事實", "指數自1月起平均每月升0.9點；紀錄只比7月讀數高0.4點。「平均持續」正是假設所在。"]],
    src: ["差估署按月指數"] },
  "鐵路線": { rows: [
    ["這是誰的觀點", "地區代理按需求落點推斷下一浪去向。"],
    ["為何屬分析而非事實", "沙田大圍反映通勤需求、將軍澳吸納新供應——排序是觀察，外推不是。"]],
    src: ["分區租務報告"] }
};
}
