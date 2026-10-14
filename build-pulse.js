/* Build 8 pulse sheets on the ORIGINAL sheet UI.
   Templates (slice geometry reused, labels/content swapped):
     new s01 <- pulse-s03 (anger/frustration/betrayal/understanding)
     new s02 <- pulse-s01 (protective/wary/anxious/skeptical)
     new s03 <- pulse-s03
     new s04 <- pulse-s02 (resignation/frustration/humour/solidarity)
   Run: node build-pulse.js */
const fs = require("fs");
const CLOCK_JS = "<script>(function(){function t(){var d=new Date(),h=d.getHours(),m=d.getMinutes(),x=h%12===0?12:h%12;var s=x+\":\"+(m<10?\"0\":\"\")+m;var n=document.querySelectorAll(\".time\");for(var i=0;i<n.length;i++)n[i].textContent=s;}t();setInterval(t,10000);document.addEventListener(\"visibilitychange\",t);})();</script>";

const TPL = { s01: "pulse-s03", s02: "pulse-s01", s03: "pulse-s03", s04: "pulse-s02", s05: "pulse-s01" };
const KEYS = {
  "pulse-s01": ["protective", "wary", "anxious", "skeptical"],
  "pulse-s02": ["resignation", "frustration", "humour", "solidarity"],
  "pulse-s03": ["anger", "frustration", "betrayal", "understanding"]
};
/* template SEGS pcts+tenor stay as-is; old display labels to swap per lang */
const OLDLABELS = {
  "pulse-s01": { en: ["Protective", "Wary", "Anxious", "Skeptical"], zh: ["保護心切", "有戒心", "憂慮", "質疑"] },
  "pulse-s02": { en: ["Resigned", "Frustrated", "Wry", "Solidarity"], zh: ["無奈", "沮喪", "自嘲", "同舟共濟"] },
  "pulse-s03": { en: ["Anger", "Frustrated", "Betrayal", "Clarity"], zh: ["憤怒", "沮喪", "被背叛", "清醒"] }
};

const EP = (h, m, x, view) => `<div class="ep"><div class="ephead"><span class="epav"></span><div class="epmeta"><div class="epname"><p>${h}</p><svg class="ico epcheck"><use href="#ic-verified"/></svg></div><p class="eprole">${m}</p></div><svg class="ico eptype"><use href="#ic-commentator"/></svg></div><p class="epq">${x}</p><button class="epsrc">${view}</button></div>`;
const THEME = (key, i, t, n, d, posts, view, postsWord) => `<div class="theme${i === 0 ? " theme--open" : ""}" data-emo="${key}"><button class="thead"><p class="tt">${t}</p><span class="tw">~${n} ${postsWord}</span><svg class="ico tchev"><use href="#ic-arrow-down-01"/></svg></button><div class="twrap"><div><p class="tb">${d}</p><div class="eps">${posts.map(p => EP(p[0], p[1], p[2], view)).join("")}</div></div></div></div>`;
const DETAIL = (key, dx, themes) => `<div class="detail" data-emo="${key}" hidden><p class="dx">${dx}</p>${themes}</div>`;
/* one distinct colour per category (was: Experts and Outlets shared purple,
   the only two categories most stories actually populate together) */
const AVCOLOR = { Officials: "#3B7BD1", Experts: "#8A4F9E", Outlets: "#1a8a72", Commentators: "#5A616E" };
const VTYPE = { Officials: "ic-official", Experts: "ic-expert", Outlets: "ic-outlet", Commentators: "ic-commentator" };
/* post avatar: the category glyph itself (building/person/paper/people — already
   defined once as a <symbol> in this document's own sprite for the vtype badge
   next to the name) reused at avatar size via <use>, not a letter monogram and
   not a stock photo. Zero new assets; each category is inherently distinct. */
const AV_ICON = (color, id) => `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;border-radius:99px"><circle cx="20" cy="20" r="20" fill="${color}"/><use href="#${id}" x="11" y="11" width="18" height="18" style="color:#fff"/></svg>`;
const VOICE = (v, l) => {
  const check = v.n.startsWith("@") ? "" : `<svg class="ico vcheck"><use href="#ic-verified"/></svg>`;
  return `<div class="voice" data-cat="${v.cat}"><div class="vhead"><span class="av">${AV_ICON(AVCOLOR[v.cat], VTYPE[v.cat])}</span><div class="vmeta"><div class="vname"><p>${v.n}</p>${check}</div><p class="vrole">${v.m}</p></div><svg class="ico vtype"><use href="#${VTYPE[v.cat]}"/></svg></div><p class="vquote vquote--q">${v.x}</p><div class="vfoot"><button class="vsrc">${l.view}</button><button class="vrx" data-rx>${l.show}<svg class="ico"><use href="#ic-arrow-down-01"/></svg></button></div><div class="rxwrap"><div><div class="rxlist"><button class="stance"><span>🤔</span>${l.rx[0]}</button><button class="stance"><span>😟</span>${l.rx[1]}</button><button class="stance"><span>👀</span>${l.rx[2]}</button></div></div></div></div>`;
};
const LBL = {
  en: { view: "View source", show: "Show reactions (3)", rx: ["Not convinced", "This worries me", "Watching closely"], posts: "posts" },
  zh: { view: "查看原文", show: "顯示回應 (3)", rx: ["未被說服", "令我擔憂", "密切留意"], posts: "則帖文" }
};

/* ---- data: labels in template slot order; details per slot; voices ---- */
const D = {
  s01: {
    en: {
      labels: ["Anger", "Anxious", "Grief", "Hope"],
      temp: "Angry and exhausted in equal measure — twelve days in, the loudest demand is not victory but an answer to “how does this end”.",
      basedOn: ["Based on 9,000 posts", "Based on 9,400 posts"],
      details: [
        ["Posts directed at a decision or an actor, not at the situation in general.", [
          ["No endgame", "1,900", "Twelve days and past 5,000 targets in, people are angry that no one will say what ending this looks like.", [["@mideast_watch", "public post · X · 22m ago", "Day 12. Five thousand targets. And still not one official will tell us how this ends."], ["@gulf_reader", "public post · Reddit · 1h ago", "Asked three times in the briefing what the endgame is. Three non-answers."]]],
          ["Hormuz and prices", "850", "Anger that a distant strait now sets the price of everything on a shelf.", [["@freight_daily", "public post · Reddit · 33m ago", "Hormuz shut means everything on a shelf gets more expensive. That reaches everybody."]]]]],
        ["Posts carrying worry about what happens next, rather than anger at a decision already taken.", [
          ["Escalation risk", "1,400", "Worry that the conflict widens beyond the two parties currently fighting.", [["@region_watch", "public post · X · 27m ago", "One miscalculation and this stops being two countries very fast."], ["@harbour_lights", "public post · X · 1h ago", "The nuclear sites part is what keeps me up. That risk does not stay inside a border."]]]]],
        ["Posts mourning specific losses, named or counted.", [
          ["Named losses", "720", "Posts mourning specific people and places, named or counted.", [["@small_hours_", "public post · X · 2h ago", "My aunt’s street is in the footage. That is all I have to say today."]]]]],
        ["Posts pointing to an off-ramp, a talk, or a de-escalation still being possible.", [
          ["An off-ramp still exists", "700", "Posts pointing to a route out that has not closed yet.", [["@track_two", "public post · X · 48m ago", "Oman mediated three times. The channel is not dead, it is just quiet."]]]]]
      ],
      voices: [
        { cat: "Officials", b: "OM", n: "Omani Foreign Ministry", m: "Official statement · 2h ago", x: "The channel remains open. Both parties know where the door is." },
        { cat: "Experts", b: "SK", n: "Dr Samira Kazemi", m: "Energy security analyst · 3h ago", x: "Closing Hormuz hurts the closer as much as the closed-to. Nobody knows the rules now." },
        { cat: "Outlets", b: "DL", n: "The Daily Ledger", m: "Explainer · 5h ago", x: "Every barrel that doesn't transit is a bid on every barrel that already did." },
        { cat: "Commentators", b: "MW", n: "@mideast_watch", m: "public post · X · 22m ago", x: "Day 12. Five thousand targets. And still not one official will tell us how this ends." },
        { cat: "Commentators", b: "HL", n: "@harbour_lights", m: "public post · X · 1h ago", x: "The nuclear sites part is what keeps me up. That risk does not stay inside a border." },
        { cat: "Commentators", b: "FD", n: "@freight_daily", m: "public post · Reddit · 33m ago", x: "Hormuz shut means everything on a shelf gets more expensive. That reaches everybody." },
        { cat: "Officials", b: "IMO", n: "Intl. Maritime Bureau", m: "Advisory · 4h ago", x: "No insured transit has been attempted in seven days. Owners are holding position outside the strait." },
        { cat: "Experts", b: "RH", n: "Dr Ruth Hallam", m: "Shipping economist · 2h ago", x: "Insurance withdrawal is the leading indicator. It moved before every previous spike, and it has moved again." },
        { cat: "Outlets", b: "FW", n: "Frontline Wire", m: "News outlet · explainer · 4h ago", x: "Both governments now describe the closure in the same terms. That agreement is itself the story." },
        { cat: "Experts", b: "TN", n: "Tanker Nav Watch", m: "Transit-tracking nonprofit · 1h ago", x: "Zero transits, seven days, measured independently of either capital. This part is not contested." },
        { cat: "Commentators", b: "GR", n: "@gulf_reader", m: "public post · Reddit · 1h ago", x: "Asked three times in the briefing what the endgame is. Three non-answers." },
        { cat: "Commentators", b: "TT", n: "@track_two", m: "public post · X · 48m ago", x: "Oman mediated three times. The channel is not dead, it is just quiet." }
      ]
    },
    zh: {
      labels: ["憤怒", "憂慮", "哀傷", "希望"],
      temp: "憤怒與疲憊各佔一半——打到第12日，最響亮的訴求不是勝利，而是有人回答一句「呢件事點收科」。",
      basedOn: ["根據9,000則帖文", "根據9,400則帖文"],
      details: [
        ["矛頭指向某個決定或某個角色、而非籠統指向局勢的帖文。", [
          ["看不到終局", "1,900", "打了十二日、逾5,000個目標，民眾憤怒的是無人肯講結局會是甚麼模樣。", [["@mideast_watch", "公開帖文 · X · 22分鐘前", "第12日。五千個目標。仍然冇一個官員肯講呢件事點收科。"], ["@gulf_reader", "公開帖文 · Reddit · 1小時前", "簡報上問咗三次終局係乜，三次都冇答案。"]]],
          ["霍爾木茲與物價", "850", "一條遠方的海峽如今為貨架上每件貨定價，令人火滾。", [["@freight_daily", "公開帖文 · Reddit · 33分鐘前", "霍爾木茲一封，貨架上樣樣嘢都會加價，個個都走唔甩。"]]]]],
        ["帶着對往後發展的憂慮、而非對既定決定的憤怒的帖文。", [
          ["升級風險", "1,400", "擔心衝突蔓延至交戰雙方以外。", [["@region_watch", "公開帖文 · X · 27分鐘前", "只要一次誤判，好快就唔止係兩個國家嘅事。"], ["@harbour_lights", "公開帖文 · X · 1小時前", "最令我瞓唔着嘅係核設施嗰part。呢種風險唔會乖乖留喺國界入面。"]]]]],
        ["悼念具體損失的帖文，有名有姓、有數可點。", [
          ["有名有姓的損失", "720", "悼念具體人物與地方的帖文，有名有姓、有數可點。", [["@small_hours_", "公開帖文 · X · 2小時前", "片入面嗰條街，係我姨媽住嗰條。今日我淨係想講呢句。"]]]]],
        ["指出仍有下台階、談判或降溫可能的帖文。", [
          ["下台階仍在", "700", "指出仍有一條未關閉的出路的帖文。", [["@track_two", "公開帖文 · X · 48分鐘前", "阿曼斡旋過三次。條渠道未死，只係靜咗。"]]]]]
      ],
      voices: [
        { cat: "Officials", b: "阿曼", n: "阿曼外交部", m: "官方聲明 · 2小時前", x: "渠道仍然打開。雙方都知道門在哪裏。" },
        { cat: "Experts", b: "SK", n: "Samira Kazemi博士", m: "能源安全分析師 · 3小時前", x: "封鎖霍爾木茲，傷封鎖者不亞於被封鎖者。如今無人知道遊戲規則。" },
        { cat: "Outlets", b: "DL", n: "The Daily Ledger", m: "解說 · 5小時前", x: "每一桶過不了海峽的油，都在為已經過了的每一桶抬價。" },
        { cat: "Commentators", b: "MW", n: "@mideast_watch", m: "公開帖文 · X · 22分鐘前", x: "第12日。五千個目標。仍然冇一個官員肯講呢件事點收科。" },
        { cat: "Commentators", b: "HL", n: "@harbour_lights", m: "公開帖文 · X · 1小時前", x: "最令我瞓唔着嘅係核設施嗰part。呢種風險唔會乖乖留喺國界入面。" },
        { cat: "Commentators", b: "FD", n: "@freight_daily", m: "公開帖文 · Reddit · 33分鐘前", x: "霍爾木茲一封，貨架上樣樣嘢都會加價，個個都走唔甩。" },
        { cat: "Officials", b: "IMO", n: "國際海事局", m: "航運警示 · 4小時前", x: "七日以來未有任何獲承保船隻嘗試通過。船東正在海峽外圍待命。" },
        { cat: "Experts", b: "RH", n: "Ruth Hallam博士", m: "航運經濟學者 · 2小時前", x: "保險撤保是領先指標。過往每次急升之前它都先動，今次它又動了。" },
        { cat: "Outlets", b: "FW", n: "Frontline Wire", m: "新聞機構 · 解說 · 4小時前", x: "兩國政府如今用同一套字眼描述封鎖。這份一致，本身就是新聞。" },
        { cat: "Experts", b: "TN", n: "Tanker Nav Watch", m: "航運追蹤組織 · 1小時前", x: "連續七日零通航，由第三方獨立量度，不受任何一方左右。這一點無人爭議。" },
        { cat: "Commentators", b: "GR", n: "@gulf_reader", m: "公開帖文 · Reddit · 1小時前", x: "簡報上問咗三次終局係乜，三次都冇答案。" },
        { cat: "Commentators", b: "TT", n: "@track_two", m: "公開帖文 · X · 48分鐘前", x: "阿曼斡旋過三次。條渠道未死，只係靜咗。" }
      ]
    }
  },
  s02: {
    en: {
      labels: ["Protective", "Wary", "Anxious", "Skeptical"],
      temp: "Split down the middle and jumpy about it — nearly everyone wants kids safer, but almost as many distrust how a ban would be enforced.",
      basedOn: ["Based on 9,000 posts", "Based on 7,800 posts"],
      details: [
        ["Relief from parents who wanted someone else to hold the line they couldn't.", [
          ["Finally, a line", "1,600", "Relief from parents who wanted someone else to hold the line they couldn't.", [["@plainspoken_dad", "public post · X · 40m ago", "I'm exhausted defending a line the platforms drew for profit and left me to police."]]]]],
        ["Distrust of what age verification means for everyone's identity data.", [
          ["Who checks the checkers", "1,300", "Distrust of what age verification means for everyone's identity data.", [["@opennet_eu", "public post · X · 1h ago", "Age assurance at national scale becomes an identity checkpoint for the entire population, kids included."]]]]],
        ["Worry that banned teens migrate somewhere less visible, not safer.", [
          ["Where do they go", "900", "Worry that banned teens migrate somewhere less visible, not safer.", [["@teenframe_alex", "public post · X · 25m ago", "Adults keep deciding this without asking us where we'd actually go instead. We'd just go somewhere worse."]]]]],
        ["Bets that VPNs and workarounds hollow the ban out within a year.", [
          ["It won't hold", "500", "Bets that VPNs and workarounds hollow the ban out within a year.", [["@grayroute", "public post · Reddit · 2h ago", "Search interest in workarounds tripled the week it passed. The law has a leak before it has a decree."]]]]]
      ],
      voices: [
        { cat: "Officials", b: "FR", n: "Ministry for Digital Affairs", m: "Public regulator · 2h ago", x: "Our aim is a duty on platforms, not a search of every household's identity documents." },
        { cat: "Experts", b: "PA", n: "Dr Priya Adeyemi", m: "Developmental psychologist · 3h ago", x: "The evidence points to harm from design — endless scroll, engagement loops — more than any birthday threshold." },
        { cat: "Outlets", b: "DL", n: "The Daily Ledger", m: "News outlet · explainer · 5h ago", x: "Every workable ban so far has run into the same wall: you cannot check a child's age without checking everyone's." },
        { cat: "Commentators", b: "PD", n: "@plainspoken_dad", m: "parent · 40m ago", x: "I'm exhausted defending a line the platforms drew for profit and left me to police." },
        { cat: "Experts", b: "ON", n: "Open Net Initiative", m: "digital-rights nonprofit · 1h ago", x: "Age assurance at national scale becomes an identity checkpoint for the entire population, kids included." },
        { cat: "Commentators", b: "TA", n: "@teenframe_alex", m: "15-year-old student blogger · 25m ago", x: "Adults keep deciding this without asking us where we'd actually go instead. We'd just go somewhere worse." },
        { cat: "Officials", b: "CN", n: "CNIL", m: "Data-protection regulator · 3h ago", x: "The technical decree is not published. Until it is, no platform can be told precisely what compliance looks like." },
        { cat: "Experts", b: "MI", n: "Meridian Institute", m: "Child-wellbeing research body · 4h ago", x: "The strongest study behind the ban has not been independently replicated. That caps how firmly anyone should argue it." },
        { cat: "Outlets", b: "LM", n: "Le Monde", m: "French daily · 6h ago", x: "Three other governments have already lifted the text of this law almost word for word." },
        { cat: "Commentators", b: "MR", n: "@mathilde_rouen", m: "secondary teacher · Threads · 50m ago", x: "Half my class will be logged out in six months. Nobody has asked what we do in the classroom on day one." },
        { cat: "Commentators", b: "GR", n: "@grayroute", m: "public post · Reddit · 2h ago", x: "Search interest in workarounds tripled the week it passed. The law has a leak before it has a decree." },
        { cat: "Experts", b: "PA", n: "Dr Priya Adeyemi", m: "Developmental psychologist · 3h ago", x: "A ban is a blunt instrument aimed at a design problem. The design problem does not turn sixteen." }
      ]
    },
    zh: {
      labels: ["保護心切", "有戒心", "憂慮", "質疑"],
      temp: "一半一半，而且相當敏感——幾乎人人想孩子更安全，但同樣多人信不過禁令會如何執行。",
      basedOn: ["根據9,000則帖文", "根據7,800則帖文"],
      details: [
        ["家長鬆一口氣：終於有人替他們守住自己守不住的那條線。", [
          ["終於有人劃線", "1,600", "家長鬆一口氣：終於有人替他們守住自己守不住的那條線。", [["@plainspoken_dad", "公開帖文 · X · 40分鐘前", "條線係平台為咗賺錢畫出嚟，跟住留返畀我哋家長去把關，我真係好攰。"]]]]],
        ["對年齡核查將如何處置全民身份數據的戒心。", [
          ["誰來查查人者", "1,300", "對年齡核查將如何處置全民身份數據的戒心。", [["@opennet_eu", "公開帖文 · X · 1小時前", "年齡核證推到全國規模，就會變成覆蓋全民嘅身份關卡，細路都唔例外。"]]]]],
        ["擔心被禁的青少年流向更隱蔽而非更安全的地方。", [
          ["佢哋會去邊", "900", "擔心被禁的青少年流向更隱蔽而非更安全的地方。", [["@teenframe_alex", "公開帖文 · X · 25分鐘前", "大人不停幫我哋做決定，但從來冇問過我哋之後會走去邊。我哋只會走去更差嘅地方。"]]]]],
        ["斷言VPN與繞道會在一年內把禁令蛀空。", [
          ["頂唔住一年", "500", "斷言VPN與繞道會在一年內把禁令蛀空。", [["@grayroute", "公開帖文 · Reddit · 2小時前", "法例通過嗰個禮拜，翻牆方法嘅搜尋量升咗三倍。細則未出，個窿已經穿咗。"]]]]]
      ],
      voices: [
        { cat: "Officials", b: "法", n: "法國數碼事務部", m: "公共監管機構 · 2小時前", x: "我們的目標是向平台施加責任，而非翻查每個家庭的身份證明文件。" },
        { cat: "Experts", b: "PA", n: "Priya Adeyemi博士", m: "發展心理學家 · 3小時前", x: "證據指向的是設計帶來的傷害——無限滾動、成癮迴圈——多於任何一條生日界線。" },
        { cat: "Outlets", b: "DL", n: "The Daily Ledger", m: "新聞機構 · 解說 · 5小時前", x: "迄今每個可行的禁令都撞上同一道牆：要核實兒童的年齡，就必須核實所有人的。" },
        { cat: "Commentators", b: "PD", n: "@plainspoken_dad", m: "家長 · 40分鐘前", x: "條線係平台為咗賺錢畫出嚟，跟住留返畀我哋家長去把關，我真係好攰。" },
        { cat: "Experts", b: "ON", n: "Open Net Initiative", m: "數碼權益組織 · 1小時前", x: "年齡核證一旦推展至全國規模，便會成為覆蓋全民的身份關卡，兒童亦不例外。" },
        { cat: "Commentators", b: "TA", n: "@teenframe_alex", m: "15歲學生博客 · 25分鐘前", x: "大人不停幫我哋做決定，但從來冇問過我哋之後會走去邊。我哋只會走去更差嘅地方。" },
        { cat: "Officials", b: "CN", n: "法國資訊自由委員會", m: "私隱監管機構 · 3小時前", x: "技術細則尚未公布。細則未出，無人能夠明確告知平台何謂合規。" },
        { cat: "Experts", b: "MI", n: "Meridian Institute", m: "兒童身心研究機構 · 4小時前", x: "支持禁令最有力的一項研究，至今未被獨立重複驗證。這一點限制了任何人可以講到幾實。" },
        { cat: "Outlets", b: "LM", n: "世界報", m: "法國日報 · 6小時前", x: "已有三個國家的草案，幾乎逐字照抄這條法例的文本。" },
        { cat: "Commentators", b: "MR", n: "@mathilde_rouen", m: "中學教師 · Threads · 50分鐘前", x: "六個月後我半班學生就會被登出。冇人問過第一日返到課室我哋做乜。" },
        { cat: "Commentators", b: "GR", n: "@grayroute", m: "公開帖文 · Reddit · 2小時前", x: "法例通過嗰個禮拜，翻牆方法嘅搜尋量升咗三倍。細則未出，個窿已經穿咗。" },
        { cat: "Experts", b: "PA", n: "Priya Adeyemi博士", m: "發展心理學家 · 3小時前", x: "禁令是一把鈍刀，砍向一個設計問題。而設計問題不會滿十六歲。" }
      ]
    }
  },
  s03: {
    en: {
      labels: ["Anger", "Anxious", "Betrayal", "Clarity"],
      temp: "Loud, sustained anger on both sides of the border — cooling only slightly into grim arithmetic once people work out who actually pays.",
      basedOn: ["Based on 9,000 posts", "Based on 8,600 posts"],
      details: [
        ["Posts directed at a decision or an actor, not at the situation in general.", [
          ["Allies don't do this", "1,700", "Fury at the framing of a treaty ally as a security threat.", [["@northline_ott", "public post · X · 18m ago", "Seventy years of shared defence and we're a 'security threat' the week the order needs a legal basis."], ["@midwest_maker", "auto-parts machinist · Reddit · 1h ago", "My parts cross that border five times before they're a truck. Tell me who this protects."]]]]],
        ["Households pre-calculating what 50% does to weekly baskets.", [
          ["Grocery math", "1,000", "Households pre-calculating what 50% does to weekly baskets.", [["@cartprice_log", "public post · Reddit · 30m ago", "Dairy, beer, winter produce. I did the list. It's $40 a week for my family before anything retaliatory lands."]]]]],
        ["A sense on both sides that something structural, not cyclical, just broke.", [
          ["The handshake era is over", "1,100", "A sense on both sides that something structural, not cyclical, just broke.", [["@bordertown_kate", "public post · X · 45m ago", "Our town literally straddles the line. Half my family shops on the other side. What are we now?"]]]]],
        ["Posts walking others through what is actually covered and when.", [
          ["Read the schedule", "600", "Posts walking others through what is actually covered and when.", [["@tradelaw_annie", "trade lawyer · X · 1h ago", "Energy is carved out. Autos are not. That asymmetry is the whole story — read the schedule, not the headlines."]]]]]
      ],
      voices: [
        { cat: "Officials", b: "GC", n: "Government of Canada", m: "Official statement · 1d ago", x: "This is economic coercion, and Canada will respond in kind and in scale." },
        { cat: "Experts", b: "EM", n: "Prof Elena Marsh", m: "Trade economist · 3h ago", x: "Tariff walls between integrated economies relocate margins, not factories." },
        { cat: "Outlets", b: "GM", n: "The Globe & Mail", m: "Canadian daily · 2h ago", x: "The counter-list will be political theatre and economic self-harm in equal measure — and it will still happen." },
        { cat: "Commentators", b: "NO", n: "@northline_ott", m: "public post · X · 18m ago", x: "Seventy years of shared defence and we're a 'security threat' the week the order needs a legal basis." },
        { cat: "Commentators", b: "MM", n: "@midwest_maker", m: "auto-parts machinist · Reddit · 1h ago", x: "My parts cross that border five times before they're a truck. Tell me who this protects." },
        { cat: "Commentators", b: "TA", n: "@tradelaw_annie", m: "trade lawyer · X · 1h ago", x: "Energy is carved out. Autos are not. That asymmetry is the whole story." },
        { cat: "Officials", b: "USTR", n: "Office of the Trade Representative", m: "Official statement · 1d ago", x: "The order is issued under the security provision. The schedule of covered categories is published in full." },
        { cat: "Experts", b: "DK", n: "Dr Daniel Kwan", m: "Customs economist · 4h ago", x: "2018 told us pass-through is near-complete within months. The exporters do not eat this; households do." },
        { cat: "Outlets", b: "FW", n: "Frontline Wire", m: "News outlet · explainer · 3h ago", x: "Whether the pact even applies has never been tested at this scale. Both capitals are certain, and they disagree." },
        { cat: "Commentators", b: "PL", n: "@prairie_logistics", m: "freight dispatcher · Reddit · 2h ago", x: "Booked loads are being repriced mid-contract. Nobody in this yard has seen a week like it." },
        { cat: "Commentators", b: "BK", n: "@bordertown_kate", m: "public post · X · 45m ago", x: "Our town literally straddles the line. Half my family shops on the other side. What are we now?" },
        { cat: "Commentators", b: "CP", n: "@cartprice_log", m: "public post · Reddit · 30m ago", x: "Dairy, beer, winter produce. I did the list. It's $40 a week for my family before anything retaliatory lands." }
      ]
    },
    zh: {
      labels: ["憤怒", "憂慮", "被背叛", "清醒"],
      temp: "邊界兩側同樣怒火高漲——待人們計清楚條數、知道最終邊個埋單，怒意才稍稍冷卻成一盤冷峻的算術。",
      basedOn: ["根據9,000則帖文", "根據8,600則帖文"],
      details: [
        ["矛頭指向某個決定或某個角色、而非籠統指向局勢的帖文。", [
          ["盟友唔係咁做", "1,700", "把條約盟友定性為安全威脅，令兩地網民同樣火滾。", [["@northline_ott", "公開帖文 · X · 18分鐘前", "共同防衛七十年，到你份命令要搵法律根據嗰個禮拜，我哋就變咗「安全威脅」。"], ["@midwest_maker", "汽車零件技工 · Reddit · 1小時前", "我啲零件過五次邊境先砌得成一架車。你話畀我聽呢樣嘢保護緊邊個。"]]]]],
        ["家庭提前計算50%對每週餸籃的影響。", [
          ["餸菜條數", "1,000", "家庭提前計算50%對每週餸籃的影響。", [["@cartprice_log", "公開帖文 · Reddit · 30分鐘前", "乳製品、啤酒、冬天菜。我列咗張單：反制未到，我屋企每個禮拜已經貴40蚊美金。"]]]]],
        ["兩邊都有一種感覺：斷裂的是結構，不是周期。", [
          ["握手年代玩完", "1,100", "兩邊都有一種感覺：斷裂的是結構，不是周期。", [["@bordertown_kate", "公開帖文 · X · 45分鐘前", "我哋個鎮真係橫跨條界線。我半個家族喺對面買嘢。咁而家我哋算係乜？"]]]]],
        ["帶大家逐項核對實際涵蓋範圍與時間表的帖文。", [
          ["睇附表，唔好睇標題", "600", "帶大家逐項核對實際涵蓋範圍與時間表的帖文。", [["@tradelaw_annie", "貿易律師 · X · 1小時前", "能源獲豁免，汽車冇。呢個不對稱就係成個故事——睇附表，唔好淨係睇標題。"]]]]]
      ],
      voices: [
        { cat: "Officials", b: "GC", n: "加拿大政府", m: "官方聲明 · 1日前", x: "這是經濟脅迫，加拿大將以同等方式、同等規模回應。" },
        { cat: "Experts", b: "EM", n: "Elena Marsh教授", m: "貿易經濟學者 · 3小時前", x: "深度融合經濟體之間的關稅牆，搬得動的是利潤，不是工廠。" },
        { cat: "Outlets", b: "GM", n: "環球郵報", m: "加拿大日報 · 2小時前", x: "反制清單將是政治劇場與經濟自傷各佔一半——但它仍然一定會出場。" },
        { cat: "Commentators", b: "NO", n: "@northline_ott", m: "公開帖文 · X · 18分鐘前", x: "共同防衛七十年，到你份命令要搵法律根據嗰個禮拜，我哋就變咗「安全威脅」。" },
        { cat: "Commentators", b: "MM", n: "@midwest_maker", m: "汽車零件技工 · Reddit · 1小時前", x: "我啲零件過五次邊境先砌得成一架車。你話畀我聽呢樣嘢保護緊邊個。" },
        { cat: "Commentators", b: "TA", n: "@tradelaw_annie", m: "貿易律師 · X · 1小時前", x: "能源獲豁免，汽車冇。呢個不對稱就係成個故事。" },
        { cat: "Officials", b: "USTR", n: "美國貿易代表辦公室", m: "官方聲明 · 1日前", x: "命令依據安全條款發出，涵蓋類別的完整附表已經公布。" },
        { cat: "Experts", b: "DK", n: "關浩然博士", m: "關稅經濟學者 · 4小時前", x: "2018年告訴我們，數月內轉嫁近乎完全。出口商唔會食呢啖，家庭先會。" },
        { cat: "Outlets", b: "FW", n: "Frontline Wire", m: "新聞機構 · 解說 · 3小時前", x: "協定是否適用，從未在此規模下受考驗。兩個首都都好肯定，而且講法相反。" },
        { cat: "Commentators", b: "PL", n: "@prairie_logistics", m: "貨運調度員 · Reddit · 2小時前", x: "已落單嘅貨喺合約中途被改價。我哋呢個貨場冇人見過咁嘅一個禮拜。" },
        { cat: "Commentators", b: "BK", n: "@bordertown_kate", m: "公開帖文 · X · 45分鐘前", x: "我哋條鎮就係騎住條界。我半頭家喺對面買嘢。咁我哋而家算乜？" },
        { cat: "Commentators", b: "CP", n: "@cartprice_log", m: "公開帖文 · Reddit · 30分鐘前", x: "奶類、啤酒、冬季蔬果。我計過條數，未計反制我頭家一個禮拜已經多畀40美元。" }
      ]
    }
  },
  s04: {
    en: {
      labels: ["Resigned", "Frustrated", "Wry", "Hopeful"],
      temp: "Weary tenants, satisfied landlords, and a city doing arithmetic out loud — resignation with a sharp edge of gallows humour.",
      basedOn: ["Based on 9,000 posts", "Based on 6,900 posts"],
      details: [
        ["Tenants comparing renewal increases, mostly resigned to signing.", [
          ["Renewal-letter season", "1,300", "Tenants comparing renewal increases, mostly resigned to signing.", [["@tokwawan_amy", "tenant · Threads · 25m ago", "Landlord wants $1,800 more. Agent says be grateful it isn't $2,500. This is the conversation now."], ["@island_east_t", "public post · X · 1h ago", "Viewed six flats in two weekends. Four were gone before the viewing."]]]]],
        ["The gap between pay rises and rent rises, done as arithmetic.", [
          ["Wages didn't get the memo", "1,000", "The gap between pay rises and rent rises, done as arithmetic.", [["@payslip_vs_rent", "public post · Reddit · 40m ago", "Pay up 2%, rent up 6% in my district. The spreadsheet doesn't care about the recovery narrative."]]]]],
        ["The city's traditional coping mechanism, in full effect.", [
          ["Gallows humour", "800", "The city's traditional coping mechanism, in full effect.", [["@shoebox_deluxe", "renter · Threads · 2h ago", "My 280 sq ft is now 'a rare gem with strong rental support'. I live inside an investment thesis."]]]]],
        ["Owners and would-be sellers reading the same data as a thaw.", [
          ["At least the market moves", "600", "Owners and would-be sellers reading the same data as a thaw.", [["@mortgage_finally", "public post · X · 3h ago", "Negative equity for three years. If rents hold, we finally list in spring."]]]]]
      ],
      voices: [
        { cat: "Officials", b: "差估", n: "Rating and Valuation Dept", m: "Official data · monthly", x: "The index has recorded seven consecutive monthly increases across all classes." },
        { cat: "Experts", b: "AL", n: "Dr Alicia Leung", m: "Housing economist, Harbourside Housing Institute · 3h ago", x: "A rental market can run ahead of incomes for a while, but not ahead of arithmetic." },
        { cat: "Outlets", b: "01", n: "HK01", m: "HK online · 5h ago", x: "On the tenement stairs in Hung Hom, the queue is the story: fifteen viewers, one flat, sixty minutes." },
        { cat: "Outlets", b: "明", n: "Ming Pao", m: "HK daily · 3h ago", x: "Agents report landlords repricing mid-week — a behaviour last routine in 2016." },
        { cat: "Commentators", b: "TA", n: "@tokwawan_amy", m: "tenant · Threads · 25m ago", x: "Landlord wants $1,800 more. Agent says be grateful it isn't $2,500. This is the conversation now." },
        { cat: "Commentators", b: "SD", n: "@shoebox_deluxe", m: "renter · Threads · 2h ago", x: "My 280 sq ft is now 'a rare gem with strong rental support'. I live inside an investment thesis." },
        { cat: "Officials", b: "RVD", n: "Rating and Valuation Department", m: "Official data · monthly", x: "The index has risen for seven consecutive months across all classes, compiled from stamped tenancies." },
        { cat: "Experts", b: "CL", n: "Dr Carrie Leung", m: "Housing economist, Harbour Institute · 3h ago", x: "Rents can outrun incomes for a while. They cannot outrun arithmetic." },
        { cat: "Outlets", b: "HK1", n: "HK01", m: "Hong Kong outlet · 5h ago", x: "The queue on the Hung Hom stairwell is the story: fifteen viewers, one flat, sixty minutes." },
        { cat: "Commentators", b: "IE", n: "@island_east_t", m: "public post · X · 1h ago", x: "Six viewings over two weekends. Four were gone before the appointment time." },
        { cat: "Commentators", b: "PR", n: "@payslip_vs_rent", m: "public post · Reddit · 40m ago", x: "2% raise, 6% rent rise in my district. The spreadsheet does not care about the recovery narrative." },
        { cat: "Commentators", b: "MF", n: "@mortgage_finally", m: "public post · X · 3h ago", x: "Three years underwater. If rents hold, we can finally list in the spring." }
      ]
    },
    zh: {
      labels: ["無奈", "沮喪", "自嘲", "有盼頭"],
      temp: "租客疲憊、業主稱心，一座城市在公開計數——無奈之中，帶一股黑色幽默的鋒利。",
      basedOn: ["根據9,000則帖文", "根據6,900則帖文"],
      details: [
        ["租客互相比較續租加幅，大多數無奈照簽。", [
          ["續約信季節", "1,300", "租客互相比較續租加幅，大多數無奈照簽。", [["@tokwawan_amy", "租客 · Threads · 25分鐘前", "業主話加$1,800。經紀叫我偷笑，話唔係加$2,500。而家嘅對話就係咁。"], ["@island_east_t", "公開帖文 · X · 1小時前", "兩個週末睇咗六個盤，有四個未到睇樓時間已經租咗出去。"]]]]],
        ["加薪與加租之間的落差，被逐條數擺上枱。", [
          ["人工冇收到通知", "1,000", "加薪與加租之間的落差，被逐條數擺上枱。", [["@payslip_vs_rent", "公開帖文 · Reddit · 40分鐘前", "人工加2%，我區租金加6%。張試算表唔會理咩復甦故事。"]]]]],
        ["呢個城市的傳統應對機制，全速運作中。", [
          ["黑色幽默", "800", "呢個城市的傳統應對機制，全速運作中。", [["@shoebox_deluxe", "租客 · Threads · 2小時前", "我間280呎而家叫做「租務支持強勁的罕有筍盤」。原來我住喺一份投資論文入面。"]]]]],
        ["業主與準賣家把同一組數據讀成解凍訊號。", [
          ["起碼個市郁", "600", "業主與準賣家把同一組數據讀成解凍訊號。", [["@mortgage_finally", "公開帖文 · X · 3小時前", "負資產捱咗三年。租金企得穩嘅話，我哋春天終於可以放盤。"]]]]]
      ],
      voices: [
        { cat: "Officials", b: "差估", n: "差餉物業估價署", m: "官方數據 · 按月", x: "指數於各類別均錄得連續七個月按月上升。" },
        { cat: "Experts", b: "AL", n: "梁凱晴博士", m: "房屋經濟學者，港灣房屋研究所 · 3小時前", x: "租金可以跑贏收入一段時間，但跑不贏數學。" },
        { cat: "Outlets", b: "01", n: "香港01", m: "香港網媒 · 5小時前", x: "紅磡唐樓樓梯上，人龍本身就是新聞：十五個準租客，一個單位，六十分鐘。" },
        { cat: "Outlets", b: "明", n: "明報", m: "香港日報 · 3小時前", x: "代理反映業主週中改價——上一次成為常態，已是2016年。" },
        { cat: "Commentators", b: "TA", n: "@tokwawan_amy", m: "租客 · Threads · 25分鐘前", x: "業主話加$1,800。經紀叫我偷笑，話唔係加$2,500。而家嘅對話就係咁。" },
        { cat: "Commentators", b: "SD", n: "@shoebox_deluxe", m: "租客 · Threads · 2小時前", x: "我間280呎而家叫做「租務支持強勁的罕有筍盤」。原來我住喺一份投資論文入面。" },
        { cat: "Officials", b: "差估", n: "差餉物業估價署", m: "官方數據 · 按月", x: "指數按已打釐印租約編製，各類別均錄得連續七個月上升。" },
        { cat: "Experts", b: "CL", n: "梁凱晴博士", m: "房屋經濟學者，港灣房屋研究所 · 3小時前", x: "租金可以跑贏收入一段時間，但跑不贏數學。" },
        { cat: "Outlets", b: "01", n: "香港01", m: "香港網媒 · 5小時前", x: "紅磡唐樓樓梯上，人龍本身就是新聞：十五個準租客，一個單位，六十分鐘。" },
        { cat: "Commentators", b: "IE", n: "@island_east_t", m: "公開帖文 · X · 1小時前", x: "兩個週末睇咗六個盤，有四個未到睇樓時間已經租咗出去。" },
        { cat: "Commentators", b: "PR", n: "@payslip_vs_rent", m: "公開帖文 · Reddit · 40分鐘前", x: "人工加2%，我區租金加6%。張試算表唔會理咩復甦故事。" },
        { cat: "Commentators", b: "MF", n: "@mortgage_finally", m: "公開帖文 · X · 3小時前", x: "負資產捱咗三年。租金企得穩嘅話，我哋春天終於可以放盤。" }
      ]
    }
  },
  s05: {
    en: {
      labels: ["Protective", "Wary", "Anxious", "Skeptical"],
      temp: "Loud but oddly cheerful — a city that has done this before, checking on neighbours and stocking up, with a thick undercurrent of distrust about that MTR screenshot.",
      basedOn: ["Based on 11,000 posts", "Based on 9,400 posts"],
      details: [
        ["Neighbours checking in on elderly residents and stocking up for more than just themselves.", [
          ["Checking on the block", "2,000", "Neighbours checking in on elderly residents and stocking up for more than just themselves.", [["@shatin_helen", "public post · Threads · 35m ago", "Knocked on the auntie next door's flat, brought her extra water and torch batteries. Takes ten minutes."]]]]],
        ["Distrust of the viral MTR screenshot, and a general wariness about unverified storm claims.", [
          ["That MTR thing is fake", "1,800", "Distrust of the viral MTR screenshot, and a general wariness about unverified storm claims.", [["@commute_kelvin", "public post · X · 20m ago", "That '8pm full suspension' screenshot has been going around for an hour. MTR's own page says nothing like it. Check before you share."]]]]],
        ["The familiar pre-signal-8 nerves — flights, exams, and whether the call comes in time.", [
          ["The waiting is the worst part", "1,400", "The familiar pre-signal-8 nerves — flights, exams, and whether the call comes in time.", [["@redbag_ren", "public post · Threads · 50m ago", "Mock exam is tomorrow morning. Either it's cancelled or it isn't, and nobody tells us until 6am. Impossible to sleep."]]]]],
        ["The city's own genre of storm humour, running at full speed.", [
          ["The noodle shelf is gone", "1,100", "The city's own genre of storm humour, running at full speed.", [["@panpanpanda", "public post · Threads · 1h ago", "Bought the last shelf of instant noodles at 7-Eleven. See you on the other side 🍜"]]]]]
      ],
      voices: [
        { cat: "Officials", b: "HKO", n: "Hong Kong Observatory", m: "Official bulletin · 18:00", x: "Signal No. 8 may be issued around 02:00. Please secure loose objects and avoid unnecessary travel tonight." },
        { cat: "Experts", b: "SL", n: "Dr Samuel Lo", m: "Meteorologist, Meridian Institute · 2h ago", x: "The two major tracks disagree by about 90km. That gap is tonight's whole story — every decision people are waiting on follows from it." },
        { cat: "Outlets", b: "FW", n: "Frontline Wire", m: "News outlet · explainer · 3h ago", x: "The MTR shutdown screenshot circulating tonight does not match any bulletin MTR has actually published — treat it as unverified." },
        { cat: "Commentators", b: "SH", n: "@shatin_helen", m: "public post · Threads · 35m ago", x: "Knocked on the auntie next door's flat, brought her extra water and torch batteries. Takes ten minutes." },
        { cat: "Commentators", b: "CK", n: "@commute_kelvin", m: "public post · X · 20m ago", x: "That '8pm full suspension' screenshot has been going around for an hour. MTR's own page says nothing like it. Check before you share." },
        { cat: "Commentators", b: "PP", n: "@panpanpanda", m: "public post · Threads · 1h ago", x: "Bought the last shelf of instant noodles at 7-Eleven. See you on the other side 🍜" },
        { cat: "Officials", b: "MTR", n: "MTR Corporation", m: "Service bulletin · 17:30", x: "Train service is running normally. Any change will be announced on our own channels first — please do not rely on forwarded screenshots." },
        { cat: "Officials", b: "DSD", n: "Drainage Services Department", m: "Official statement · 1h ago", x: "Crews are pre-positioned at the harbourfront low points. The 2018 upgrades have not been tested at this surge height." },
        { cat: "Experts", b: "CW", n: "Prof Carmen Wu", m: "Coastal engineer, HK Institute of Technology · 2h ago", x: "Three metres is the number that matters, not the wind speed. Surge is what actually reaches the road." },
        { cat: "Outlets", b: "SCM", n: "South China Morning Post", m: "News outlet · live blog · 40m ago", x: "The Observatory has kept the same 02:00 window across three consecutive bulletins — unusual steadiness this far out." },
        { cat: "Commentators", b: "TM", n: "@tuenmun_dad", m: "parent · Threads · 15m ago", x: "Two kids, one exam tomorrow, and the call doesn't come until 6am. Every parent in this city is refreshing the same page." },
        { cat: "Commentators", b: "AX", n: "@airport_axel", m: "public post · X · 55m ago", x: "Departures board is still all green. That will not survive the night, and everyone standing here knows it." }
      ]
    },
    zh: {
      labels: ["互相照應", "有戒心", "緊張", "淡定吐槽"],
      temp: "聲浪大但意外地輕鬆——呢個城市見識過大場面，鄰里互相照應、屯定糧食，底下卻有一股對嗰張港鐵截圖嘅濃厚戒心。",
      basedOn: ["根據11,000則帖文", "根據9,400則帖文"],
      details: [
        ["鄰居互相探望長者，屯糧唔止為自己。", [
          ["睇吓成層樓", "2,000", "鄰居互相探望長者，屯糧唔止為自己。", [["@shatin_helen", "公開帖文 · Threads · 35分鐘前", "敲咗隔籬阿婆度門，攞多咗水同電筒電芯畀佢。十分鐘就搞掂。"]]]]],
        ["對瘋傳嘅港鐵截圖存有戒心，對未經證實嘅風暴傳言普遍謹慎。", [
          ["港鐵嗰單嘢係假嘅", "1,800", "對瘋傳嘅港鐵截圖存有戒心，對未經證實嘅風暴傳言普遍謹慎。", [["@commute_kelvin", "公開帖文 · X · 20分鐘前", "嗰張「8點全綫停駛」截圖已經傳咗成個鐘。港鐵自己個網完全冇呢回事。轉發前查清楚先。"]]]]],
        ["熟悉嘅八號風球前緊張——航班、考試，仲有個決定幾時先到。", [
          ["等待先係最難捱", "1,400", "熟悉嘅八號風球前緊張——航班、考試，仲有個決定幾時先到。", [["@redbag_ren", "公開帖文 · Threads · 50分鐘前", "聽日朝早模擬試。停課定唔停，冇人會喺朝早6點之前話你知。點瞓得着。"]]]]],
        ["呢個城市獨有嘅風暴幽默感，全速運作。", [
          ["個公仔麵架空咗", "1,100", "呢個城市獨有嘅風暴幽默感，全速運作。", [["@panpanpanda", "公開帖文 · Threads · 1小時前", "喺7-Eleven買咗最後一排公仔麵。大家平安過關，見返 🍜"]]]]]
      ],
      voices: [
        { cat: "Officials", b: "天文台", n: "香港天文台", m: "官方公告 · 18:00", x: "八號風球可能於凌晨兩點左右發出。請盡快收好露天物品，今晚避免非必要外出。" },
        { cat: "Experts", b: "SL", n: "羅森彥博士", m: "氣象學家，Meridian Institute · 2小時前", x: "兩條主要路徑相差約90公里。呢個差距就係今晚嘅懸念——所有人等緊嘅決定，都跟住呢個數。" },
        { cat: "Outlets", b: "FW", n: "Frontline Wire", m: "新聞機構 · 解說 · 3小時前", x: "今晚瘋傳嘅港鐵停駛截圖，同港鐵發出過嘅任何公告都對唔上——請當未經證實處理。" },
        { cat: "Commentators", b: "SH", n: "@shatin_helen", m: "公開帖文 · Threads · 35分鐘前", x: "敲咗隔籬阿婆度門，攞多咗水同電筒電芯畀佢。十分鐘就搞掂。" },
        { cat: "Commentators", b: "CK", n: "@commute_kelvin", m: "公開帖文 · X · 20分鐘前", x: "嗰張「8點全綫停駛」截圖已經傳咗成個鐘。港鐵自己個網完全冇呢回事。轉發前查清楚先。" },
        { cat: "Commentators", b: "PP", n: "@panpanpanda", m: "公開帖文 · Threads · 1小時前", x: "喺7-Eleven買咗最後一排公仔麵。大家平安過關，見返 🍜" }
      ]
    }
  }
};

/* The donut percentages live in the template, and the "Based on N posts" total
   lives in the data — but the per-theme counts were authored by hand and matched
   neither: they summed to roughly 60% of the stated total, and no emotion's
   themes added up to its own slice of the ring. Derive them instead, so a theme
   row can never disagree with the chart above it or the total beside it. */
function segPercents(tplHtml) {
  const m = tplHtml.match(/const SEGS = (\[[\s\S]*?\]);/);
  if (!m) throw new Error("SEGS not found in template");
  return [...m[1].matchAll(/,\s*(\d+),\s*"/g)].map(x => +x[1]);
}
function alignCounts(details, total, pct) {
  /* each emotion gets its slice of the total; rounding drift lands on the
     largest slice so the parts still sum to exactly the stated figure */
  const targets = pct.map(p => Math.round(total * p / 100));
  const drift = total - targets.reduce((a, b) => a + b, 0);
  targets[targets.indexOf(Math.max(...targets))] += drift;
  return details.map(([dx, themes], i) => {
    const weights = themes.map(t => +String(t[1]).replace(/,/g, ""));
    const wSum = weights.reduce((a, b) => a + b, 0) || themes.length;
    let left = targets[i];
    const out = themes.map((t, k) => {
      const share = k === themes.length - 1
        ? left
        : Math.max(1, Math.round(targets[i] * (weights[k] || 1) / wSum));
      left -= share;
      return [t[0], share.toLocaleString("en-US"), t[2], t[3]];
    });
    return [dx, out];
  });
}

/* replace an entire <div ...>...</div> block found at `openTag`, matching nested divs */
function replaceDiv(h, openTag, replacement) {
  const a = h.indexOf(openTag);
  if (a < 0) throw new Error("open tag not found: " + openTag);
  const re = /<div\b|<\/div>/g;
  re.lastIndex = a + 1;
  let depth = 1, m;
  while ((m = re.exec(h))) {
    depth += m[0] === "</div>" ? -1 : 1;
    if (depth === 0) return h.slice(0, a) + replacement + h.slice(m.index + 6);
  }
  throw new Error("unbalanced divs after: " + openTag);
}

/* see build-conf.js for why s02-s04 need both output roots and s05 needs ces/ only */
const ROOTS = { s01: [""], s02: ["", "ces/"], s03: ["", "ces/"], s04: ["", "ces/"], s05: ["ces/"] };
/* the CES film is English-only, so ces/ only ever receives en sheets */
const CES_LANGS = ["en"];
fs.mkdirSync("ces/en", { recursive: true });

let n = 0;
for (const id of Object.keys(ROOTS)) {
  for (const lang of ["en", "zh"]) {
    const d = D[id][lang], l = LBL[lang], tpl = TPL[id], keys = KEYS[tpl], old = OLDLABELS[tpl][lang];
    let h = fs.readFileSync(`templates/${lang}/${tpl}.html`, "utf8");

    // temperature
    h = h.replace(/(<p class="temp-sen">)[\s\S]*?(<\/p>)/, `$1${d.temp}$2`);
    // slice arc labels + legend labels + SEGS display names
    old.forEach((o, i) => {
      h = h.replace(`text-anchor="middle">${o}</textPath>`, `text-anchor="middle">${d.labels[i]}</textPath>`);
      h = h.replace(new RegExp(`(<button class="lg" data-emo="${keys[i]}"><i[^>]*></i>)[^<]+(</button>)`), `$1${d.labels[i]}$2`);
      h = h.replace(new RegExp(`\\["${keys[i]}", "[^"]*",`), `["${keys[i]}", "${d.labels[i]}",`);
    });
    // detailwrap rebuild (div-depth matcher: non-greedy regex under-matches nested divs)
    const aligned = alignCounts(d.details, +d.basedOn[1].replace(/\D/g, ""), segPercents(h));
    const details = keys.map((k, i) => {
      const [dx, themes] = aligned[i];
      return DETAIL(k, dx, themes.map((t, j) => THEME(k, j, t[0], t[1], t[2], t[3], l.view, l.posts)).join(""));
    }).join("");
    h = replaceDiv(h, '<div class="detailwrap">', `<div class="detailwrap"><div>${details}</div></div>`);
    // voices rebuild
    h = replaceDiv(h, '<div class="voices">', `<div class="voices">${d.voices.map(v => VOICE(v, l)).join("")}</div>`);
    /* The "All (N)" chip is only recomputed when a filter tab is clicked, so its
       initial value is whatever the template hardcodes — it has to be written to
       match the voices actually rendered, or the sheet opens showing a stale count. */
    h = h.replace(/(<span class="n" id="count">)\d+(<\/span>)/, `$1${d.voices.length}$2`);
    h = h.replace(/(<b id="cnt2">)\d+(<\/b>) of \d+/, `$1${d.voices.length}$2 of ${d.voices.length}`);
    /* "Based on N posts" — matched by shape, not by an exact copy of whatever
       the template happened to say. The old exact-match form failed silently
       when a story's basedOn[0] didn't match its template verbatim, leaving the
       template's number on screen while the theme counts were scaled to a
       different one. */
    h = h.replace(lang === "en" ? /Based on [\d,]+ posts/g : /根據[\d,]+則帖文/g, d.basedOn[1]);

    h = h.replace("</body>", "<style>.scroll,.phone{scrollbar-width:none;-ms-overflow-style:none}.scroll::-webkit-scrollbar,.phone::-webkit-scrollbar{display:none!important}/*responsive-fill*/html,body{height:100%}body{display:block!important;padding:0!important}.phone{height:100%!important;border-radius:0!important}</style>" + CLOCK_JS + "</body>");
    for (const root of ROOTS[id]) { if (root === "ces/" && !CES_LANGS.includes(lang)) continue; fs.writeFileSync(`${root}${lang}/pulse-${id}.html`, h); n++; }
  }
}
console.log("built", n, "pulse sheets on original UI");
