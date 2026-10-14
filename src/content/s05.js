/* s05 — Typhoon Dolphin, eight hours out. CES film story only (not in the
   public 4-story loop; built via `CES=1 node build-app.js`).
   Ten cards per the design doc: hero + map, timeline, key facts (+deep),
   data chart, how it works, signal gauges, poll (+deep), why this matters,
   what's next. EN carries full Plain/Calm/ELI5 triples on the camera-critical
   cards (map, key facts, chart, gauges, poll, why); zh is a native Plain pass
   (voices fall back to Plain, same P1 pattern the four public stories shipped
   with before P3). No deaths, no destroyed homes — a big, loud, disruptive
   night, presented as a worked example. */
const SCH = require("../schematics.js");

module.exports = {
  en: {
    story: "s05", tag: "Essential", conf: "Medium", voices: "61",
    nextTitle: "Should under-16s be banned from social media?",
    tabs: ["The Story", "Map", "Timeline", "Key Facts", "Numbers", "How It Works", "Signal", "Poll", "Why This Matters", "What's Next"],
    hero: {
      img: "../assets/img/hero-typhoon.jpg",
      title: "Typhoon Dolphin is [he:🌀] eight hours out. [he:🌊]",
      paras: [
        { p: "Dolphin crossed the coast further north this morning, leaving collapsed walls behind it. It is now **eight hours from Hong Kong** — Signal No. 3 is up, and the Observatory has named around 02:00 for the No. 8 signal. Gusts at the eyewall are near 210 km/h.",
          c: "Dolphin crossed the coast further north this morning, leaving collapsed walls behind it. It is now **eight hours from Hong Kong** — Signal No. 3 is flying, and the Observatory has named around 02:00 for the No. 8 signal. Gusts at the eyewall are running near 210 km/h.",
          e: "Dolphin already hit the coast further north this morning — that's the damage in the photo. It's now **eight hours from Hong Kong**. Signal No. 3 is up, No. 8 is expected around 2am, and the wind at its core is close to 210 km/h." },
        { p: "Two major forecast models disagree about landfall by roughly [kw:ninety kilometres] — and that gap is tonight's whole story.",
          c: "Two major forecast models disagree about where it makes landfall by roughly [kw:ninety kilometres] — and that gap is what tonight actually comes down to.",
          e: "Here's the thing nobody's saying clearly: the two big weather models can't agree where it'll hit, and they're off by about [kw:ninety kilometres]. That's the real story tonight." }
      ]
    },
    heroConn: { def: "Start with where. Here is what the storm looks like on a map, right now.",
                e5: "🗺️ Let's start with WHERE. Here's what the storm looks like on a map, right now. 🌀" },
    cards: [
      { type: "map", data: { title: "Map", mapKey: "typhoon", schem: SCH.hk,
          legend: [["#800080", "Districts feeling it first"], ["#ec4837", "Projected landfall"]],
          para: { p: "The zones that feel this first: the airport, the harbourfront, and low-lying Island East. Tap the diamond for the projected landfall point.",
                  c: "The zones that will feel this first are the airport, the harbourfront and low-lying Island East. Tap the diamond to see the projected landfall point.",
                  e: "These are the spots that get hit first: the airport, the harbourfront, and the low bits of Island East. Tap the red diamond to see where it's expected to actually make landfall." } },
        conn: { def: "That is where. Here is when — today, hour by hour.",
                e5: "🗺️ That's WHERE. Now here's WHEN — today, hour by hour. ⏰" } },
      { type: "timeline", data: { title: "Timeline", chips: ["Breaking", "Developing"], rows: [
          ["06:20", "Dolphin makes its first landfall further up the coast — collapsed walls and damaged cars, no casualties reported. It turns toward Hong Kong."],
          ["14:40", "Signal No. 3 hoisted; outer rain bands reach the New Territories."],
          ["16:00", "Ferry services suspended; cross-harbour routes lash down for the night."],
          ["18:00", "Observatory update: Signal No. 8 window named as \"around 02:00\", pending the next model run."],
          ["19:30", "A screenshot claiming the MTR is suspending all service from 8pm starts circulating widely. It is fabricated."]] },
        conn: { def: "That is the day so far. Here is the ledger of what is actually known.",
                e5: "🕐 That's today so far. Now — what's actually confirmed? 📋" } },
      { type: "keyfacts", data: {
          tiles: [{ fig: "210 km/h", lab: "gusts, eyewall" }, { fig: "8 hrs", lab: "to landfall" }],
          paras: [
            { p: "The [g:No. 8 signal window is |confirmed] for around 02:00, per the Observatory's 18:00 bulletin. Where exactly the storm makes landfall is [o:still shifting |— two models disagree by 90km], and any comparison to 2018's Mangkhut is [b:analysis, not a |forecast].",
              c: "The [g:No. 8 signal window is |confirmed] for around 02:00 — that's straight from the Observatory's 18:00 bulletin. Exactly where it makes landfall is [o:still shifting |— two models disagree by 90km] — and any comparison to 2018's Mangkhut is [b:analysis, not a |forecast].",
              e: "Here's what's actually locked in: the [g:No. 8 signal is |confirmed] for around 2am. What's NOT locked in: exactly where it lands — [o:the two big forecast models disagree |by 90km]. And comparing it to the 2018 storm Mangkhut is just [b:our best guess, |not a fact]." },
            { p: "A viral screenshot claims the [kw:MTR] is suspending all service from 8pm tonight. It is [g:not real — |unverified]; the MTR's own 17:30 bulletin says normal service continues until the signal changes.",
              c: "A viral screenshot claims the [kw:MTR] is suspending all service from 8pm tonight. It's not real — [g:MTR's own 17:30 bulletin |confirms] normal service continues until the signal changes.",
              e: "That screenshot going around saying the [kw:MTR] shuts down at 8pm? Fake. The real MTR bulletin from 5:30pm says trains keep running until the signal actually changes." }
          ] },
        deep: {
          stats: [["90", "km between the two model tracks"], ["63", "km/h sustained triggers No. 8"]],
          more: { p: "The 90km gap between the two forecast models is not unusual this far out — but it is the single number every other decision tonight depends on. A school board deciding whether to call off tomorrow, an airline deciding whether to pre-cancel a flight, a family deciding whether to board windows: all of it traces back to which of the two tracks turns out to be right.",
                  c: "A 90km gap between forecast models is not unusual this many hours out — but it is the one number every other decision tonight actually depends on. Whether a school calls off tomorrow, whether an airline pre-cancels a flight, whether a family boards up windows — all of it traces back to which of the two tracks turns out right.",
                  e: "A 90km gap this far out is pretty normal, honestly — storms are hard to predict. But this ONE number is what every other decision tonight hangs on: school, flights, boarding up windows. All of it comes down to which forecast turns out true." },
          also: [
            { p: "The Observatory's Signal No. 8 threshold is sustained winds above 63 km/h expected to affect the whole territory — it is a public-safety trigger, not a measure of how strong the storm itself is." },
            { p: "The fabricated MTR screenshot uses a real MTR font and logo, lifted from an old service-update graphic — which is exactly why it spread so fast." },
            { p: "Hong Kong has raised Signal No. 8 or higher four times in the past six years; none has needed a signal above No. 9." }
          ],
          how: [
            { tag: "official", claim: "The No. 8 window, around 02:00",
              note: { p: "Published in the Observatory's 18:00 bulletin — the primary, authoritative source, not a forecast model's raw output." } },
            { tag: "unverified", claim: "The MTR 8pm suspension screenshot",
              note: { p: "No such bulletin exists on MTR's own channels. Their most recent real update, 17:30, says normal service continues until the signal changes." } },
            { tag: "analysis", claim: "The Mangkhut 2018 comparison",
              note: { p: "Our reading, built from the Observatory's own storm-intensity classification — useful for calibration, not a claim that tonight will play out the same way." } }
          ]
        },
        conn: { def: "Those are the facts on the record. Here is how fast it is climbing.",
                e5: "📋 Those are the facts. Now — how fast is this thing climbing? 📈" } },
      { type: "numbers2", data: { title: "Numbers",
          banner: { fig: "118 km/h", lab: "Gust speed, climbing through the evening." },
          cols: [["45", 18, "14:00"], ["65", 30, "16:00"], ["90", 46, "18:00"], ["105", 56, "20:00"], ["118", 68, "22:00", "118 km/h — projected overnight peak", true]],
          para: { p: "Gusts have more than doubled since early afternoon. Tap a bar for the exact reading at that hour.",
                  c: "Gusts have more than doubled since early afternoon — a genuine climb, not a spike. Tap a bar for the exact reading at that hour.",
                  e: "The wind has gotten more than twice as strong since this afternoon. Tap any bar and it'll tell you exactly how fast it was blowing at that hour." } },
        conn: { def: "That is the climb. Here is why it turns into water on your street.",
                e5: "📈 That's the climb. Now — why does this turn into water on your actual street? 🌊" } },
      { type: "hiw", data: {
          chain: ["Storm", "Surge", "Harbour", "Your street"],
          sub: "wind pushes water inland · the harbourfront has nowhere for it to go",
          out: "a 3-metre surge puts sea water on the waterfront road",
          para: "Sustained onshore wind piles water against the coastline faster than it can drain. A 3-metre surge is enough to put sea water on the harbourfront road — a mechanism, not a guess." },
        conn: { def: "That is the mechanism. Here is what the models think happens next.",
                e5: "⚙️ That's the mechanism. Now — what do the models think happens next? 🔮" } },
      { type: "signal", data: { title: "Signal", rows: [
          [85, "Signal No. 8 by 02:00", "The Observatory's own stated window; consistent across the last three bulletins.", true],
          [60, "Schools closed tomorrow", "Historically follows an overnight No. 8 in about three cases out of five — the call itself lands after midnight.", false],
          [30, "Morning flights on time", "Depends on how quickly the signal is lowered after landfall; a fast-moving storm helps here.", false]],
          para: { p: "Tap a signal to see why it is moving. These are model estimates, not promises.",
                  c: "Tap any signal to see why it's moving. The percentages are model estimates — not promises.",
                  e: "Tap a dial to see why it's moving. These are the app's best guesses, not certainties." } },
        conn: { def: "Those are the odds. Here is where the city actually disagrees.",
                e5: "🎛️ Those are the odds. Now — here's where the city actually disagrees. 🗣️" } },
      { type: "poll", data: { title: "Where People Stand", rows: [
          ["Call closures tonight", 74, "Say families need time to plan, not a 5am scramble", "1,686 of 2,278 polled"],
          ["Wait for the 22:00 data", 26, "Say a wrong early call closes a city for nothing", "592 of 2,278 polled"]],
          para: { p: "Tap a bar for raw counts. A genuine, recurring argument every typhoon season — not manufactured for tonight.",
                  c: "Tap a bar to see the raw counts. This is a genuine, recurring argument every typhoon season — not something manufactured for tonight.",
                  e: "Tap a bar to see the real numbers behind it. People argue about this every single typhoon season — it's not a new fight." } },
        deep: {
          stats: [["2,278", "people surveyed"], ["81%", "of parents of school-age kids"]],
          more: { p: "The question asked was narrow and specific: should school and work closure decisions be announced the night before, rather than at 5am on the day. It did not ask whether people wanted the storm to be taken seriously, or whether they trusted the Observatory — both of which a simpler headline number might imply.",
                  c: "The question asked was narrow and specific: whether closure decisions should come the night before rather than at 5am on the day. It did not ask whether people take the storm seriously, or whether they trust the Observatory — both things a simpler headline might quietly imply.",
                  e: "The actual question was just: should they decide tonight, not at 5am? It wasn't asking if people trust the weather service or think the storm's a big deal — a simpler headline could make you think it was." },
          also: [
            { p: "**2,278 Hong Kong residents**, online panel, fieldwork across the afternoon of this bulletin; margin of error around **±2 points** at this sample size." },
            { p: "Support for calling closures early was highest among parents of school-age children, at **81%**." },
            { p: "The poll closed before the 18:00 Observatory update — support may have shifted since the No. 8 window was named." }
          ],
          how: [
            { tag: "official", claim: "The sample size and fieldwork window",
              note: { p: "Published methodology note from the polling company — standard disclosure, independently checkable." } },
            { tag: "analysis", claim: "That the timing affects the reading",
              note: { p: "Our judgement: the poll closed before the No. 8 window was named, so tonight's real number may run higher than 74%." } },
            { tag: "unverified", claim: "Whether opinion has shifted since",
              note: { p: "No poll has run since the 18:00 update. This stays open until one does." } }
          ]
        },
        conn: { def: "That is the public mood. Here is what actually changes tonight.",
                e5: "🗳️ That's the mood. Now — what does this actually change for YOU tonight? 🫵" } },
      { type: "why", data: {
          boxes: [
            { vis: "🪟", lab: "Your window",
              para: { p: "Tape does not stop a window breaking — it only reduces flying glass if it does. What actually helps: securing loose items on balconies, and staying clear of windows once winds pick up.",
                      c: "Tape doesn't stop a window from breaking — it only reduces flying glass if it does. What actually helps is securing loose items on balconies, and staying clear of windows once the wind picks up.",
                      e: "That tape thing? It doesn't stop your window breaking — it just means less glass flies around if it does. What actually helps: bring in anything loose on your balcony, and stay away from windows once it gets windy." } },
            { vis: "✈️", lab: "Your flight",
              para: { p: "Airlines resume in a queue, not all at once — the backlog from a full-day suspension typically clears within 12 to 18 hours once the signal drops.",
                      c: "Airlines resume flights in a queue, not all at once. The backlog from a full-day suspension typically clears within 12 to 18 hours once the signal drops.",
                      e: "Flights don't all restart the second the storm passes — they go in a queue. If it's been shut down all day, expect it to take 12 to 18 hours to clear once the warning comes down." } },
            { vis: "🎒", lab: "Your Monday",
              para: { p: "The school closure call lands after midnight, once the overnight signal is confirmed — not before. There is nothing to decide tonight except getting some sleep.",
                      c: "The school closure call lands after midnight, once the overnight signal is confirmed — not before. Tonight there's nothing left to decide except getting some sleep.",
                      e: "The 'is school cancelled' call doesn't happen until after midnight, once they know for sure. Tonight there's genuinely nothing to decide — just get some sleep." } }
          ],
          para: { p: "A storm eight hours away already answered your three real questions — the rest of tonight is just waiting for the numbers to catch up.",
                  c: "A storm still eight hours out has already answered your three real questions — the rest of tonight is just waiting for the numbers to catch up.",
                  e: "Even though the storm's still eight hours away, your three real questions are already answered. The rest of tonight is just waiting for it to catch up." } },
        conn: { def: "That's tonight, sorted. Here is what to watch for tomorrow.",
                e5: "🌙 That's tonight, sorted. Here's what to watch for tomorrow. ☀️" } },
      { type: "next", data: {
          rows: [
            { vis: "📡", lab: "The 22:00 update", para: "The next Observatory bulletin either narrows the 90km landfall gap or confirms it stays open overnight." },
            { vis: "🌀", lab: "The 02:00 window", para: "If Signal No. 8 is hoisted on schedule, it typically holds for six to ten hours before any downgrade." },
            { vis: "🏫", lab: "The all-clear", para: "Schools and most offices key their decision to the signal at 6am, not the overnight peak — that call comes with daylight." }
          ],
          para: "Story 1 of 4 read — three more essentials for today." },
        conn: { def: "The storm presses from outside. Some pressure builds from inside a family instead.",
                e5: "🌀 That's pressure from outside. Next: pressure that builds from inside a family. 👨‍👩‍👧" } }
    ],
    ovConn: { def: "Nothing about being a teenager online changed overnight. What changed was the appetite to act.",
              e5: "⚠️ Nothing about being a teenager online 🌐 changed overnight — the grown-ups just decided to act. 🤯" }
  },
  zh: {
    story: "s05", tag: "必讀", conf: "中", voices: "61",
    nextTitle: "16歲以下應否禁用社交媒體？",
    tabs: ["本篇", "地圖", "時序", "關鍵事實", "數字", "運作機制", "訊號", "民意", "為何重要", "下一步"],
    hero: {
      img: "../assets/img/hero-typhoon.svg",
      title: "海豚颱風 [he:🌀] 尚餘八小時登陸。[he:🌊]",
      paras: [
        "天文台已發出三號風球，並預告——大約凌晨兩點——會考慮發出八號風球。風眼附近陣風接近時速210公里。",
        "兩大預測模型對登陸地點的分歧達[kw:九十公里]——呢個差距，就係今晚真正嘅懸念。"
      ]
    },
    heroConn: { def: "先由地點講起。睇吓風暴喺地圖上而家嘅位置。" },
    cards: [
      { type: "map", data: { title: "地圖", mapKey: "typhoon", schem: SCH.hk,
          legend: [["#800080", "最先受影響地區"], ["#ec4837", "預測登陸點"]],
          para: "最先感受到風暴嘅地區：機場、海濱一帶，同埋地勢低嘅港島東。㩒一下個紅色鑽石標記，睇吓預測登陸點。" },
        conn: { def: "地點講完。跟住睇今日逐個鐘嘅進展。" } },
      { type: "timeline", data: { title: "時序", chips: ["突發", "發展中"], rows: [
          ["14:40", "三號風球生效；外圍雨帶已經去到新界。"],
          ["16:00", "渡輪服務暫停；維港兩岸航線今晚停航。"],
          ["18:00", "天文台更新：預告八號風球窗口「大約凌晨兩點」，視乎下一次數據更新。"],
          ["19:30", "一張聲稱港鐵晚上8點起全線停駛嘅截圖開始瘋傳。呢張圖係假嘅。"]] },
        conn: { def: "今日進度講完。跟住睇已經確認嘅事實。" } },
      { type: "keyfacts", data: {
          tiles: [{ fig: "時速210公里", lab: "風眼陣風" }, { fig: "8小時", lab: "距離登陸" }],
          paras: [
            "[g:八號風球窗口已|確認]，大約凌晨兩點——出自天文台18:00嘅公告。登陸地點[o:仍在浮動——|兩個模型相差90公里]，而同2018年山竹嘅比較則屬於[b:分析，並非|預測]。",
            "一張瘋傳嘅截圖聲稱[kw:港鐵]今晚8點起全線停駛。呢張圖[g:並非真實——|未經證實]；港鐵本身17:30嘅公告話，喺風球轉波之前維持正常服務。"
          ] },
        conn: { def: "呢啲係紀錄在案嘅事實。跟住睇風力升得有幾快。" } },
      { type: "numbers2", data: { title: "數字",
          banner: { fig: "時速118公里", lab: "陣風速度，整個傍晚持續攀升。" },
          cols: [["45", 18, "14:00"], ["65", 30, "16:00"], ["90", 46, "18:00"], ["105", 56, "20:00"], ["118", 68, "22:00", "時速118公里——預測今晚高峰", true]],
          para: "陣風速度由今日下午至今已經升咗超過一倍。㩒一下條柱，即刻話你知嗰個鐘頭嘅實際數字。" },
        conn: { def: "升勢講完。跟住睇點解會變成你條街嘅海水。" } },
      { type: "hiw", data: {
          chain: ["風暴", "風暴潮", "海港", "你條街"],
          sub: "風力將海水推向岸邊 · 海濱無路可退",
          out: "3米風暴潮足以令海水湧上海濱道路",
          para: "持續嘅向岸風將海水堆向岸邊，速度快過排水。3米嘅風暴潮，足以令海水湧上海濱道路——呢個係機制，唔係估計。" },
        conn: { def: "機制講完。跟住睇模型點睇跟落嚟嘅發展。" } },
      { type: "signal", data: { title: "訊號", rows: [
          [85, "凌晨兩點前發八號風球", "天文台自己嘅公告窗口；連續三份公告都一致。", true],
          [60, "聽日停課", "過往整晚掛八號波，約五次入面有三次會停課——但決定通常凌晨後先出。", false],
          [30, "朝早航班準時", "視乎風球幾快落波；如果風暴移動得快，情況會較樂觀。", false]],
          para: "輕按訊號可查看變動原因。呢啲屬模型估算，並非承諾。" },
        conn: { def: "呢啲係機率。跟住睇全城真正嘅分歧喺邊度。" } },
      { type: "poll", data: { title: "民意所向", rows: [
          ["今晚就應該公佈停課", 74, "認為屋企人需要時間安排，而唔係朝早5點先話你知", "2,278人中1,686人"],
          ["應該等22:00嘅數據", 26, "認為過早落錯決定會累全城白等一場", "2,278人中592人"]],
          para: "輕按橫條可查看實際人數。呢個係每逢風季都會出現嘅真實爭議，唔係為今晚度身訂造。" },
        conn: { def: "民情講完。跟住睇今晚對你嚟講實際上改變咗乜嘢。" } },
      { type: "why", data: {
          boxes: [
            { vis: "🪟", lab: "你嘅窗", para: "貼玻璃膠帶唔會阻止塊玻璃爆裂——只係萬一爆咗，減少玻璃碎片飛濺。真正有用嘅係：收好露台鬆散雜物，同埋起風之後遠離窗邊。" },
            { vis: "✈️", lab: "你嘅航班", para: "航空公司恢復航班係逐架排隊，唔係一次過。成日停飛之後嘅積壓，通常喺風球落波後12至18小時內清完。" },
            { vis: "🎒", lab: "你嘅星期一", para: "停課決定通常喺凌晨後、確認咗整晚風球先會公佈——唔會提早。今晚其實冇乜好決定，早啲瞓覺就得。" }
          ],
          para: "一個仍然距離八小時嘅風暴，其實已經答咗你三個最緊要嘅問題——今晚剩低嘅，只係等數字追返上嚟。" },
        conn: { def: "今晚安頓好。跟住睇聽日要留意乜嘢。" } },
      { type: "next", data: {
          rows: [
            { vis: "📡", lab: "22:00更新", para: "天文台下一份公告，會收窄嗰90公里嘅登陸差距，定係整晚維持懸而未決。" },
            { vis: "🌀", lab: "凌晨兩點窗口", para: "如果八號風球準時掛出，一般會維持六至十小時先落波。" },
            { vis: "🏫", lab: "解除警報", para: "學校同大部分公司嘅決定，多數睇朝早6點嘅風球，而唔係整晚嘅高峰——呢個決定會伴住天光一齊嚟。" }
          ],
          para: "四篇入面嘅第一篇讀完——今日仲有三篇必讀。" },
        conn: { def: "風暴嘅壓力嚟自外面。有種壓力，反而係喺屋企入面滾起。" } }
    ],
    ovConn: { def: "青少年上網嘅處境並非一夜改變，改變嘅係社會出手處理嘅決心。" }
  }
};

/* ===== typed inline-transparency popovers ===== */
{
const en = module.exports.en, zh = module.exports.zh;
en.pop = {
  "ninety kilometres": { rows: [
    ["What's disputed", "Exactly where Typhoon Dolphin makes landfall."],
    ["Who says what", "Two major forecast models currently disagree by roughly 90 kilometres along the coastline."],
    ["Why the gap exists", "This far from landfall, an intensifying storm's exact track is genuinely uncertain — the gap should narrow as the night goes on."]],
    src: ["Hong Kong Observatory", "Meridian Institute"] },
  "mtr": { def: "The city's metro operator. Its own published bulletins — not the viral screenshot — are the only source that matters for service status tonight." },
  /* Key Facts chips. Only the Plain phrasing needs a key here — build-app's
     aliasVoices maps the Calm and Friend variants onto the same entry. */
  "no. 8 signal window is confirmed": { rows: [
    ["Who confirmed it", "The Hong Kong Observatory, in its 18:00 bulletin: a No. 8 signal is expected around 02:00."],
    ["Why we're sure", "It is the Observatory's own published bulletin — the primary source, on the record, not a relay of one."],
    ["Why it matters", "The No. 8 signal is the trigger for closures and transport changes, so the window's timing is what every plan tonight is built around."]],
    src: ["Hong Kong Observatory"] },
  "still shifting — two models disagree by 90km": { rows: [
    ["What's disputed", "Exactly where Dolphin makes landfall."],
    ["Who says what", "Two major forecast models put landfall roughly 90 kilometres apart along the coast."],
    ["Why the gap exists", "This far out, an intensifying storm's track is genuinely uncertain — the gap should narrow as new model runs land through the night."]],
    src: ["Hong Kong Observatory", "Meridian Institute"] },
  "analysis, not a forecast": { rows: [
    ["Whose view this is", "Commentators reaching for Mangkhut in 2018 as tonight's reference point."],
    ["Why it's analysis, not fact", "A comparison between two different storms, tracks and tides is interpretation. Nothing in the official forecast says tonight repeats 2018."]] },
  "not real — unverified": { rows: [
    ["What was checked", "A viral screenshot claiming the MTR suspends all service from 8pm tonight."],
    ["What we found", "No such notice exists on any MTR channel, and the graphic reuses a years-old service-update template. MTR's own 17:30 bulletin says normal service continues until the signal changes."],
    ["Why it matters", "The screenshot spread faster than the correction — rumour against record is tonight's whole trust story."]],
    src: ["MTR Corporation"] }
};
zh.pop = {
  "九十公里": { rows: [
    ["爭議所在", "海豚颱風實際登陸嘅位置。"],
    ["各方說法", "兩個主要預測模型目前沿岸線相差大約90公里。"],
    ["分歧因何而生", "距離登陸仲有一段時間，一個正在增強嘅風暴，實際路徑本來就有不確定性——差距預期會隨住入夜逐步收窄。"]],
    src: ["香港天文台", "Meridian Institute"] },
  "港鐵": { def: "本地地鐵營運商。今晚嘅服務狀態，只有佢自己發布嘅公告作準——嗰張瘋傳嘅截圖唔算數。" }
};
}
