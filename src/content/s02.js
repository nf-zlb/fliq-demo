/* s02 — France's under-16 social media ban.
   Structure mirrors v2's story 1 (9 cards); facts are the France/EU framing.
   EN: full Plain/Calm/ELI5 triples. zh: Plain now (Calm/ELI5 land in P3 — fallback covers them). */
module.exports = {
  en: {
    story: "s02", tag: "Essential", conf: "Medium", voices: "54",
    nextTitle: "50% tariffs, between allies",
    tabs: ["The Story", "Key Facts", "Who's Involved", "The Arguments", "Different Reads", "Expert View", "Impact", "Why This Matters", "What's Next"],
    hero: {
      img: "../assets/img/hero-teens.jpg",
      title: "Should [he:👶] under-16s be [he:❌] banned from social media? [he:📵]",
      paras: [
        { p: "France has passed a law barring under-16s from holding a social-media **account**, requiring platforms to [kw:verify age] and close the accounts of anyone younger — the first blanket ban in the EU.",
          c: "The short version: France now bars under-16s from holding an **account**, asks platforms to [kw:verify age], and closes the accounts of anyone younger. It's the first law of its kind in the EU — and it isn't settled yet.",
          e: "France made a new rule. If you're under 16, you can't have an **account** — and apps must [kw:verify age] and close accounts that are too young. No other EU country has done this before." },
        { p: "Supporters say the years between 11 and 15 are when a person's sense of **self** is still forming. Critics say a ban simply pushes young people onto quieter, less-moderated corners of the web.",
          c: "Supporters point to the years between 11 and 15, when your sense of **self** is still taking shape. Critics worry the ban wouldn't remove the risk so much as move it somewhere quieter and harder to see.",
          e: "Some people think it's smart, because 11 to 15 is when you're still working out who you **are**. Others worry kids would just move to quieter apps that are harder to keep safe." }
      ]
    },
    heroConn: { def: "Nothing about being a teenager online changed overnight. What changed was the appetite to act.",
                e5: "⚠️ Nothing about being a teenager online 🌐 changed overnight — the grown-ups just decided to finally do something. 🤯" },
    cards: [
      { type: "keyfacts", data: {
          tiles: [{ fig: "16", lab: "minimum age" }, { fig: "4%", lab: "max fine, global turnover" }],
          paras: [
            { p: "The minimum age is set at 16, with [g:no exemption for parental |consent] and none for accounts that already exist. Platforms must take [kw:reasonable steps] to find and remove under-16s.",
              c: "Here's what the law actually says. The minimum age is 16, with [g:no exemption for parental |consent] — and no pass for accounts you already have. Platforms have to take [kw:reasonable steps] to find under-16s and remove them.",
              e: "The cut-off age is 16. There's [g:no exemption for parental |consent], and old accounts don't get a pass either. Apps have to take [kw:reasonable steps] to find under-16s and take them down." },
            { p: "Companies that fail systematically face fines of up to [g:4% of global |turnover], and platforms get [g:six months to |comply] — the technical decree on age checks is still to come.",
              c: "If a company keeps failing, it faces fines of up to [g:4% of global |turnover]. There's some time built in: platforms get [g:six months to |comply], and the technical decree on age checks hasn't been published yet.",
              e: "If an app keeps breaking the rule, the fine can reach [g:4% of global |turnover]. It doesn't start right away — apps get [g:six months to |comply], and the exact age-check rules are still being written." }
          ] },
        deep: {
          stats: [["2M", "French users to qualify"], ["9", "services caught"]],
          more: { p: "[kw:Reasonable steps] is the load-bearing phrase, and the law does not define it. The technical decree that will define it has not been published, so nobody yet knows whether it means an ID upload, a face scan or a checkbox. Every argument about enforcement is really an argument about a document that does not exist.",
                  c: "[kw:Reasonable steps] is the phrase everything hangs on, and the law does not define it. The decree that will define it has not been published — so nobody knows yet whether it means an ID upload, a face scan or a checkbox. Every enforcement argument is really about a document nobody has read.",
                  e: "Everything hangs on [kw:reasonable steps] — and the law never says what that means. The document that decides it has not been written yet. So every argument about enforcement is about a page nobody has seen." },
          also: [
            { p: "The law covers any platform with **more than 2 million** French users. That catches roughly nine services and exempts messaging apps entirely." },
            { p: "Australia passed a comparable ban in late 2024. **Eighteen months on**, no fine has been issued to any platform." },
            { p: "The six-month clock starts at publication of the decree, not at passage of the law — so the real deadline is still unset." }
          ],
          how: [
            { tag: "official", claim: "The age, the fine and the six months",
              note: { p: "Published text of the law as passed. Not disputed by anyone on either side." } },
            { tag: "unverified", claim: "How it will actually be enforced",
              note: { p: "The technical decree is unpublished. Until it appears there is nothing to verify, and any reporting on enforcement is speculation about an unwritten rule." } },
            { tag: "analysis", claim: "That 4% of turnover is a real deterrent",
              note: { p: "Our reading, not a source's. The Australian precedent suggests headline fines are rarely levied, but one case is not a pattern." } }
          ]
        },
conn: { def: "That's the letter of the law. Now the people pushing it, policing it, and living with it.",
                e5: "📜 That's the rule on paper. Now meet the people pushing it, policing it, and living with it. 🎭" } },

      { type: "whos", data: {
          items: [
            { lab: "Proposed by", av: "FR", name: "French Government", badge: true,
              desc: { p: "Wrote and passed the ban", c: "Wrote and passed the ban", e: "Made the new rule" } },
            { lab: "Enforcing", av: "CN", name: "CNIL", badge: true,
              desc: { p: "Will police platform compliance", c: "Polices whether platforms comply", e: "Checks that apps follow it" } },
            { lab: "Affected", av: "TU", name: "Teens Under 16",
              desc: { p: "Lose account access within six months", c: "Lose access within six months", e: "Can't use the apps within six months" } }
          ],
          para: { p: "<span class=\"lead\">The platforms that must build age checks</span> carry the cost, but [o:no company has been |fined] yet.",
                  c: "<span class=\"lead\">The platforms building the age checks</span> are the ones paying for it — though so far, [o:no company has been |fined].",
                  e: "<span class=\"lead\">The apps have to build the age checks</span> and pay for them. But so far, [o:no company has been |fined]." } },
        conn: { def: "Those are the players. Now the case each side is making.",
                e5: "🎭 Those are the players. Now here's what each side is shouting. 📣" } },

      { type: "args", data: {
          for: { label: "For a ban", cards: [
            { vis: "🪞", txt: { p: "A feed built on comparison lands hardest when identity is least formed.",
                                c: "When your sense of self is least formed, a feed built on comparison hits hardest.",
                                e: "When you're still figuring out who you are, a feed full of comparison hurts the most." } },
            { vis: "🧒", txt: { p: "A 12-year-old cannot consent to a trade they cannot understand.",
                                c: "A 12-year-old can't really agree to a deal they don't understand.",
                                e: "A 12-year-old can't really agree to a deal they don't get." } }
          ] },
          against: { label: "Against a ban", cards: [
            { vis: "🛟", txt: { p: "It removes a lifeline as well as a risk for isolated young people.",
                                c: "For a lonely teen, the same app can be a lifeline, not just a risk.",
                                e: "For a lonely kid, the app can be a lifeline, not just a danger." } },
            { vis: "🔞", txt: { p: "Enforcement means age checks for every user of every age.",
                                c: "To check under-16s, platforms have to check everyone's age.",
                                e: "To check under-16s, apps have to check everyone's age." } }
          ] },
          para: { p: "Neither side disputes that the old limit of 13 failed. The **real** fight is over [b:the thing that replaces |it]",
                  c: "Both sides agree the old limit of 13 failed. The **real** question is [b:what replaces |it].",
                  e: "Both sides agree the old rule didn't work. The **real** question is [b:what comes |next]." } },
        deep: {
          more: { p: "The two sides are not arguing about the same thing. Almost nobody disputes that heavy use and poor wellbeing appear together in the data. The disagreement is whether one causes the other, and whether removing access helps or simply moves the harm somewhere nobody can see it.",
                  c: "The two sides are not actually arguing about the same thing. Nearly nobody disputes that heavy use and poor wellbeing show up together. The argument is whether one causes the other — and whether taking access away helps, or just moves the harm out of sight.",
                  e: "The two sides are not arguing about the same thing. Nearly everyone agrees heavy use and feeling bad show up together. The fight is over whether one causes the other, and whether a ban helps or just hides it." },
          also: [
            { p: "The most cited study behind the pro-ban case has **not been independently replicated**. A second team using a different dataset found a much weaker effect." },
            { p: "The lifeline argument rests on survey work with LGBTQ+ and rural teenagers, where online contact was the **primary** source of peer support." }
          ],
          how: [
            { tag: "replication", claim: "The wellbeing evidence",
              note: { p: "A single unreplicated study. Until a separate team reproduces it on a separate dataset, this caps how strongly the claim can be made." } },
            { tag: "analysis", claim: "Both positions on this card",
              note: { p: "These are arguments, not findings. They are here because they are the ones actually being made, not because either is established." } },
            { tag: "disputed", claim: "Whether a ban displaces or reduces harm",
              note: { p: "No agreement in the literature. The Australian rollout is the only real-world test and it is eighteen months old." } }
          ]
        },
conn: { def: "Both sides land real points. Watch the same week get told two ways.",
                e5: "⚖️ Both sides have a point — now watch the same week get spun two different ways. 📰" } },

      { type: "dreads", data: {
          a: { av: "LM", lab: "Le Monde", headline: "A landmark for child protection: France leads Europe in shielding minors from documented harms." },
          b: { av: "TW", lab: "TechWire EU", headline: "Six-month deadline is unworkable and will push teens onto VPNs, platform engineers warn." },
          para: { p: "<span class=\"lead\">Same law, same week, two headlines.</span> [kw:Framing] shapes what feels [b:|central], and noticing the frame is a different skill from checking the facts.",
                  c: "<span class=\"lead\">Same law, same week — two very different headlines.</span> [kw:Framing] decides what feels [b:|central], and spotting the frame is a different skill from checking the facts.",
                  e: "<span class=\"lead\">Same law, same week, two different headlines.</span> The [kw:framing] changes what feels [b:|important]. Noticing the frame isn't the same as checking if it's true." } },
        conn: { def: "Two frames, same facts. So what does the research actually show?",
                e5: "🖼️ Two frames, same facts. So what does the science actually say? 🔬" } },

      { type: "expert", data: {
          quote: "Correlation keeps showing up in the data, but almost none of these studies can prove that social media is what actually harms under-16s.",
          av: "PR", name: "Dr Priya Raman", role: "Developmental psychologist",
          para: { p: "Almost all the research is [kw:correlational,] **not causal** — which is why the evidence stays contested.",
                  c: "Nearly all of it shows [kw:correlation,] **not cause** — the studies see a pattern, but can't prove social media is what does the harm. That's why experts still disagree.",
                  e: "Almost all the studies show a [kw:link,] **not proof.** They notice a pattern, but can't show social media is the cause. That's why experts still don't agree." } },
        deep: {
          more: { p: "Correlational means the studies observe that two things occur together. Causal would mean showing that one produces the other. Almost every study here is the first kind, which is why a researcher can accept that the pattern is real and still refuse to say social media caused it.",
                  c: "Correlational means the studies see two things happening together. Causal would mean showing one produces the other. Almost all of this research is the first kind — which is why a researcher can accept the pattern and still refuse to say social media caused it.",
                  e: "Correlational means they see two things happen at the same time. Causal means proving one makes the other happen. Nearly all of this research is the first kind, which is why a scientist can agree the pattern is real and still not blame social media." },
          also: [
            { p: "Dr Raman has argued against a ban on evidence grounds while supporting **mandatory design changes** — a position held by neither campaign." },
            { p: "The strongest case on the other side is a **natural experiment** on the staggered rollout of broadband, which does get closer to causation." }
          ],
          how: [
            { tag: "analysis", claim: "This quote is one researcher's reading",
              note: { p: "A view, not a finding. We show who is speaking and what shapes their account rather than presenting it as settled." } },
            { tag: "official", claim: "Her position and affiliation",
              note: { p: "University listing and published declarations. No industry funding declared on the relevant papers." } },
            { tag: "disputed", claim: "Whether the field agrees with her",
              note: { p: "It does not. This is one of the most actively contested questions in developmental psychology right now." } }
          ]
        },
conn: { def: "The evidence stays contested. Either way, here's who it lands on.",
                e5: "🤔 The evidence is genuinely messy — but either way, here's who feels it. 🎯" } },

      { type: "impact", data: {
          rows: [
            { ring: [32, 24], lab: "For under-16s",
              para: { p: "Millions of existing accounts would be closed, cutting teens off from the friends, creators and [i:group chats] they use every day.",
                      c: "Millions of accounts you already have would be closed, cutting you off from the friends, creators and [i:group chats] you use every day.",
                      e: "Millions of accounts would be shut off. Teens lose the friends, creators and [i:group chats] they see every day." } },
            { ring: [40, 16], lab: "For families & schools",
              para: { p: "Parents and teachers become the enforcers, checking ages and policing the [i:workarounds] most kids already know.",
                      c: "Parents and teachers become the enforcers — checking ages and policing the [i:workarounds] most kids already know.",
                      e: "Parents and teachers have to be the police now — checking ages and the [i:workarounds] most kids already know." } },
            { ring: [40, 8], lab: "For the platforms",
              para: { p: "Companies face new age-check costs and legal risk, while losing one of their fastest-growing [i:audiences].",
                      c: "Platforms face new age-check costs and legal risk, and lose one of their fastest-growing [i:audiences].",
                      e: "Apps get new costs and legal risk, and lose one of their fastest-growing [i:audiences]." } }
          ],
          para: { p: "The ban lands hardest on the youngest users and ripples out to everyone responsible for them.",
                  c: "It lands hardest on the youngest users, and ripples out to everyone who looks after them.",
                  e: "It hits the youngest users the hardest, and touches everyone who takes care of them." } },
        conn: { def: "That's who it touches. Here's what changes for you.",
                e5: "💥 That's who it hits. Now here's what actually changes for YOU. 👇" } },

      { type: "why", data: {
          boxes: [
            { vis: "🪪", lab: "Your ID",
              para: { p: "To keep your account you may have to **prove your age**, uploading an ID or a face scan the apps never [b:asked for |before].",
                      c: "To keep your account, you might have to **prove your age** — handing over an ID or a face scan the apps never [b:asked for |before].",
                      e: "To keep your account, you might have to **prove your age** — showing an ID or a face scan the apps never [b:asked for |before]." } },
            { vis: "📱", lab: "Your feed",
              para: { p: "Under-16 accounts get switched off, so **younger friends and siblings** vanish from the group chats and shared feeds you [b:use every |day].",
                      c: "Under-16 accounts get switched off, so **younger friends and siblings** quietly disappear from the group chats and feeds you [b:use every |day].",
                      e: "Under-16 accounts get turned off. So **younger friends and siblings** disappear from the chats and feeds you [b:use every |day]." } },
            { vis: "👪", lab: "Your family",
              para: { p: "Parents become the **enforcers of the limit**, deciding for themselves when a younger child is really [b:old |enough].",
                      c: "Parents turn into the **enforcers**, deciding for themselves when a younger child is really [b:old |enough].",
                      e: "Your parents become the **rule-keepers**. They decide when a younger kid is really [b:old |enough]." } }
          ],
          para: { p: "None of it lands evenly. The same rule **feels different** depending on how old you are and how you [b:already use these |apps].",
                  c: "None of this lands evenly. The same rule **feels different** depending on your age and how you [b:already use these |apps].",
                  e: "It doesn't hit everyone the same. The rule **feels different** depending on your age and how you [b:already use these |apps]." } },
        conn: { def: "That's the personal cost. Here's what happens from here.",
                e5: "🫵 That's the personal cost. Here's what happens next. ⏭️" } },

      { type: "next", data: {
          rows: [
            { vis: "🗓️", lab: "The decree lands within months",
              para: { p: "CNIL's technical rules on age checks are due before the six-month deadline — they decide what enforcement really looks like.",
                      c: "CNIL's technical rules on age checks arrive before the six-month deadline. They'll decide what enforcement actually looks like.",
                      e: "The regulator's exact age-check rules come out in a few months. Those rules decide what really happens." } },
            { vis: "⚖️", lab: "Court challenges expected",
              para: { p: "Rights groups and some platforms are preparing legal challenges that could delay or narrow how the rules apply.",
                      c: "Rights groups and some platforms are lining up legal challenges that could delay the rules or narrow how far they reach.",
                      e: "Some groups and apps are getting ready to fight it in court. That could slow the rules down or shrink them." } },
            { vis: "🌍", lab: "The EU is watching",
              para: { p: "Three governments already have bills citing the French text — the outcome here could set the template across Europe.",
                      c: "Three governments already have bills that cite the French text, so what happens here could become Europe's template.",
                      e: "Three other countries are already copying the French law. If it works here, they say they'll pass their own." } }
          ],
          para: { p: "Three open questions, one deadline between them. The next real move is as likely to come from a [i:courtroom] as from parliament.",
                  c: "Three open questions, one deadline between them. The next real move is as likely to come from a [i:courtroom] as from parliament.",
                  e: "Three big questions, one deadline. The next move is just as likely to come from a [i:courtroom] as from parliament." } },
        conn: { def: "One deadline, several open questions — and the rest of Europe taking notes.",
                e5: "🗓️ One deadline, a stack of open questions — and all of Europe watching. 🌍" } }
    ],
    ovConn: { def: "The change shows up in the price tags before it shows up in any treaty.",
              e5: "📈 The change shows up in the price tags 🏷️ before it shows up in any treaty. 📜" }
  },

  zh: {
    story: "s02", tag: "必讀", conf: "中", voices: "54",
    nextTitle: "盟友之間，50%關稅",
    tabs: ["本篇", "關鍵事實", "誰是持份者", "正反之爭", "各報各表", "專家之言", "衝擊", "為何重要", "下一步"],
    hero: {
      img: "../assets/img/hero-teens.jpg",
      title: "16歲以下 [he:👶] 應否禁用 [he:❌] 社交媒體？[he:📵]",
      paras: [
        "法國已立法禁止16歲以下持有社交媒體**帳戶**，要求平台[kw:核實年齡]、關閉未足齡用戶的帳戶——是歐盟首個全面禁令。",
        "支持者認為，11至15歲正是一個人**自我意識**仍在成形的年紀。反對者則說，禁令只會把年輕人推向更隱蔽、審核更少的網絡角落。"
      ]
    },
    heroConn: { def: "青少年上網的處境並非一夜改變，改變的是社會出手處理的決心。" },
    cards: [
      { type: "keyfacts", data: {
          tiles: [{ fig: "16歲", lab: "最低年齡" }, { fig: "4%", lab: "最高罰款（全球營業額）" }],
          paras: [
            "最低年齡定於16歲，[g:家長同意也|不獲豁免]，現有帳戶亦不例外。平台必須採取[kw:合理措施]找出並移除16歲以下用戶。",
            "屢次違規的企業，面臨最高[g:全球營業額|4%]的罰款；平台有[g:六個月|合規期]——年齡核查的技術細則仍未公布。"
          ] },
        conn: { def: "這是白紙黑字的法律。接下來看推動它、執行它、承受它的人。" } },
      { type: "whos", data: {
          items: [
            { lab: "提出", av: "法", name: "法國政府", badge: true, desc: "起草並通過禁令" },
            { lab: "執行", av: "CN", name: "法國資訊自由委員會", badge: true, desc: "監察平台是否合規" },
            { lab: "受影響", av: "TU", name: "16歲以下青少年", desc: "六個月內失去帳戶" }
          ],
          para: "<span class=\"lead\">要建年齡核查系統的平台</span>承擔成本，但至今[o:未有任何公司被|罰款]。" },
        conn: { def: "這些是台上的角色。接下來是雙方各自的理據。" } },
      { type: "args", data: {
          for: { label: "支持禁令", cards: [
            { vis: "🪞", txt: "建基於比較的資訊流，對自我認同最未成形的人傷得最深。" },
            { vis: "🧒", txt: "一個12歲小朋友，無法同意一項自己根本不能理解的交易。" }
          ] },
          against: { label: "反對禁令", cards: [
            { vis: "🛟", txt: "對孤立無援的年輕人，禁令拿走的不止風險，還有生命線。" },
            { vis: "🔞", txt: "要執行禁令，就意味所有年齡的每一位用戶都要核實年齡。" }
          ] },
          para: "雙方都不否認13歲那條舊線已經失效。**真正**的爭議是[b:用甚麼取代|它]。" },
        conn: { def: "雙方都有實在的論點。看看同一星期如何被寫成兩個故事。" } },
      { type: "dreads", data: {
          a: { av: "世", lab: "世界報", headline: "保護兒童的里程碑：法國領先歐洲，為未成年人擋住有紀錄可查的傷害。" },
          b: { av: "TW", lab: "TechWire EU", headline: "平台工程師警告：六個月死線不切實際，只會把青少年推向VPN。" },
          para: "<span class=\"lead\">同一法例，同一星期，兩個標題。</span>[kw:敘事框架]決定了甚麼顯得[b:|重要]；察覺框架與查核事實，是兩種不同的能力。" },
        conn: { def: "兩個框架，同一批事實。那研究本身怎麼說？" } },
      { type: "expert", data: {
          quote: "數據裏不斷出現相關性，但幾乎沒有一項研究能證明，社交媒體就是傷害16歲以下的元兇。",
          av: "PR", name: "Priya Raman博士", role: "發展心理學家", viewSource: "查看原文 ↗",
          para: "幾乎所有研究都屬[kw:相關性，]**並非因果**——所以證據仍然眾說紛紜。" },
        conn: { def: "證據仍有爭議。無論如何，先看它落在誰身上。" } },
      { type: "impact", data: {
          rows: [
            { ring: [32, 24], lab: "對16歲以下", para: "數以百萬計現有帳戶將被關閉，青少年與每日相見的朋友、創作者和[i:群組]一刀兩斷。" },
            { ring: [40, 16], lab: "對家庭與學校", para: "家長和老師變成執法者，查年齡、堵住孩子們早已熟知的[i:繞道方法]。" },
            { ring: [40, 8], lab: "對平台", para: "企業面對新的核查成本與法律風險，還要失去增長最快的[i:用戶群]。" }
          ],
          para: "禁令對最年輕的用戶打擊最重，並波及每一個要為他們負責的人。" },
        conn: { def: "這是它觸及的人。接下來是你自己會有甚麼改變。" } },
      { type: "why", data: {
          boxes: [
            { vis: "🪪", lab: "你的身份", para: "要保住帳戶，你或需**證明年齡**——交出應用程式以前從未[b:要求過的|身份證明或人臉掃描]。" },
            { vis: "📱", lab: "你的資訊流", para: "16歲以下帳戶被關閉，**年紀較小的朋友和弟妹**會從你[b:每日使用的|群組和動態]中消失。" },
            { vis: "👪", lab: "你的家庭", para: "家長成為**界線的執行者**，自行判斷孩子何時才算[b:真正|夠大]。" }
          ],
          para: "衝擊並不平均。同一條規則，因你的年齡和你[b:使用這些應用的|方式]而**感受迥異**。" },
        conn: { def: "這是個人代價。接下來看事情如何發展。" } },
      { type: "next", data: {
          rows: [
            { vis: "🗓️", lab: "細則數月內出爐", para: "法國資訊自由委員會的年齡核查技術細則，將在六個月死線前公布——它決定執法的真正模樣。" },
            { vis: "⚖️", lab: "司法挑戰在望", para: "權益團體與部分平台正準備法律挑戰，或會拖延規則生效、收窄適用範圍。" },
            { vis: "🌍", lab: "歐盟都在看", para: "已有三國草案引用法國文本——這裏的結果，可能成為全歐洲的範本。" }
          ],
          para: "三個懸念，一條死線。下一步棋，來自[i:法庭]的機會不比來自國會低。" },
        conn: { def: "一條死線，幾個懸念——整個歐洲都在做筆記。" } }
    ],
    ovConn: { def: "改變先出現在價錢牌上，然後才出現在任何條約裏。" }
  }
};

/* ===== P2: poll card + popovers ===== */
{
const en = module.exports.en, zh = module.exports.zh;
en.cards.splice(3, 0, { type: "poll", data: { title: "Where People Stand", rows: [
    ["Support the ban", 62, "Say the identity-forming years need protecting", "1,412 of 2,278 polled"],
    ["Oppose it", 31, "Say it pushes teens somewhere less visible, not safer", "707 of 2,278 polled"]],
    para: { p: "Tap a bar for raw counts. Polling was taken [o:before the enforcement rules were |published].",
            c: "Tap a bar to see the raw counts. One caveat: the poll ran [o:before the enforcement rules were |published].",
            e: "Tap a bar to see the real numbers. Just know: people were asked [o:before the exact rules came |out]." } },
  deep: {
          stats: [["2,278", "French adults surveyed"], ["±2", "points margin of error"]],
          more: { p: "The question asked was whether respondents supported a minimum age of 16 for social media accounts. It did not ask about enforcement, age verification, or what should happen to accounts that already exist — which are the three things the law actually turns on.",
                  c: "Respondents were asked whether they supported a minimum age of 16 for social media accounts. They were not asked about enforcement, age checks or existing accounts — which are the three things the law actually turns on.",
                  e: "People were asked one thing: do you support a minimum age of 16. They were not asked how it gets enforced, about age checks, or about accounts people already have — which is what the law is really about." },
          also: [
            { p: "**2,278 French adults**, online panel, fieldwork over four days, margin of error around **±2 points** at this sample size." },
            { p: "Support among respondents **with children under 16** was 71%. Among those without, 54%." },
            { p: "7% answered don't know and are excluded from the two figures shown on the card." }
          ],
          how: [
            { tag: "official", claim: "The sample and the fieldwork dates",
              note: { p: "Published methodology note from the polling company. Standard disclosure, independently checkable." } },
            { tag: "analysis", claim: "That the timing changes the reading",
              note: { p: "Our judgement. The poll closed before the enforcement rules were published, and enforcement is the part people object to, so support may be softer than 62% suggests." } },
            { tag: "unverified", claim: "Whether opinion has moved since",
              note: { p: "No poll has been run since publication. This stays open until someone fields one." } }
          ]
        },
conn: { def: "That is the public mood. Now watch the same week get told two ways.",
          e5: "🗳️ That's the mood. Now watch the same week get spun two ways. 📰" } });
en.tabs.splice(4, 0, "The Poll");
zh.cards.splice(3, 0, { type: "poll", data: { title: "民意所向", rows: [
    ["支持禁令", 62, "認為自我形成的關鍵年歲需要保護", "2,278人中1,412人"],
    ["反對", 31, "認為只會把青少年推向更隱蔽、而非更安全的角落", "2,278人中707人"]],
    para: "輕按橫條可查看實際人數。民調在[o:執行細則公布|之前]進行。" },
  conn: { def: "這是民情。接下來看同一星期如何被寫成兩個故事。" } });
zh.tabs.splice(4, 0, "民意");
en.pop = {
  "verify age": "Checking a user really is the age they claim — usually via ID or a face-estimation scan — rather than trusting a typed birth date. The only way a ban can be enforced, and it applies to every user of every age.",
  "reasonable steps": "The legal standard platforms must meet: demonstrable, proportionate efforts to detect and remove under-16 accounts. What counts as reasonable is what the courts will end up defining.",
  "no exemption for parental consent": "Unlike earlier proposals, a parent's approval changes nothing — under 16 means no account, full stop.",
  "framing": "The choice of which facts to place at the centre of a story. The same vote can be told as protecting children or restricting freedom — both true, each steering the reader differently.",
  "correlational": "Research showing two things move together without proving one causes the other. Most evidence in this debate is correlational — which is why it stays contested.",
  "the thing that replaces it": "Both sides agree the old limit of 13 failed. Whether a ban is the right replacement is a judgement, not a settled outcome."
};
zh.pop = {
  "核實年齡": "查證用戶申報的年齡屬實——通常靠身份證明或人臉年齡估算，而非單信自填的出生日期。禁令唯一的執行方法，適用於所有年齡的每一位用戶。",
  "合理措施": "平台須達到的法律標準：可證明、成比例地偵測及移除16歲以下帳戶。何謂「合理」，最終由法庭定義。",
  "家長同意也不獲豁免": "與早年方案不同：家長批准也改變不了甚麼——未滿16歲就是不能有帳戶。",
  "敘事框架": "選擇把哪些事實放在報道中心。同一次表決，可以寫成「保護兒童」，也可以寫成「限制自由」——兩者皆真，卻把讀者引向不同結論。",
  "相關性": "只顯示兩件事同步變化、卻證明不了因果的研究。這場辯論的證據大多屬此類——所以爭議不散。",
  "用甚麼取代它": "雙方都同意13歲那條線已失敗。禁令是否正確的替代，是判斷，不是定論。"
};
}

/* ===== P3: zh Calm/ELI5 voice matrix ===== */
{
const zh = module.exports.zh;
const by = t => zh.cards.find(c => c.type === t);
const tr = (o, k, c, e) => { o[k] = { p: o[k], c: c, e: e }; };

tr(zh.hero.paras, 0,
  "簡單說來：法國已立法，16歲以下不得持有社交媒體**帳戶**；平台須[kw:核實年齡]，並關閉未足齡用戶的帳戶。這是歐盟首個全面禁令——而事情遠未塵埃落定。",
  "法國訂咗條新規矩：未夠16歲，唔可以有社交媒體**帳戶**——啲App仲要[kw:核實年齡]，太後生嘅帳戶要封。歐盟第一次有國家去到咁盡。");
tr(zh.hero.paras, 1,
  "支持者指，11至15歲正是**自我意識**仍在成形的年紀。反對者則擔心，禁令未必消除風險，只是把它搬到更隱蔽、更難看見的角落。",
  "有人話啱：11至15歲正係你摸緊**自己係邊個**嘅年紀。有人話唔掂：啲細路只會走去更隱蔽、更難管嘅App度啫。");
zh.heroConn.e5 = "⚠️ 後生仔上網嘅世界唔係一夜變咗 🌐——係大人終於決定要出手。🤯";

const kf = by("keyfacts");
tr(kf.data.paras, 0,
  "法例實際寫的是：最低年齡16歲，[g:家長同意也|不獲豁免]，現有帳戶同樣不能倖免。平台必須採取[kw:合理措施]，找出並移除16歲以下用戶。",
  "條線劃咗喺16歲。[g:家長同意也|不獲豁免]，就算而家有帳戶都唔會放過。啲App要用[kw:合理措施]搵出16歲以下嘅用戶，然後落架。");
tr(kf.data.paras, 1,
  "屢次違規的企業，最高可被罰[g:全球營業額|4%]。時間上留有餘地：平台有[g:六個月|合規期]，而年齡核查的技術細則仍未公布。",
  "邊間App成日犯規，罰款最高去到[g:全球營業額|4%]。唔係即刻開始嘅：有[g:六個月|合規期]，點樣查年齡嘅細則仲未出。");
kf.conn.e5 = "📜 呢啲係紙上嘅規矩。跟住見吓推佢、執佢、受佢影響嘅人。🎭";

const ws = by("whos");
tr(ws.data.items[0], "desc", "起草並通過這項禁令", "訂咗呢條新規矩");
tr(ws.data.items[1], "desc", "監察平台有否合規", "睇實啲App有冇跟");
tr(ws.data.items[2], "desc", "六個月內失去帳戶使用權", "六個月內冇得再用");
tr(ws.data, "para",
  "<span class=\"lead\">負責建年齡核查系統的平台</span>承擔了成本——不過至今，[o:未有任何公司被|罰款]。",
  "<span class=\"lead\">啲App要自己起套查年齡系統</span>，錢又係佢哋出。但係到而家，[o:未有任何公司被|罰款]。");
ws.conn.e5 = "🎭 台上角色到齊。跟住聽吓兩邊嗌緊乜。📣";

const ag = by("args");
tr(ag.data.for.cards[0], "txt",
  "當自我認同最未成形，建基於比較的資訊流傷得最深。",
  "你仲摸緊自己係邊個嘅時候，成日同人比較嘅資訊流，傷你傷得最深。");
tr(ag.data.for.cards[1], "txt",
  "一個12歲的孩子，實在無法同意一項自己並不理解的交易。",
  "一個12歲嘅細路，點同意一單佢根本唔明嘅交易呀。");
tr(ag.data.against.cards[0], "txt",
  "對一個孤單的少年，同一個應用可以是生命線，不只是風險。",
  "對一個好孤單嘅後生仔嚟講，個App可能係救命繩，唔淨只係危險。");
tr(ag.data.against.cards[1], "txt",
  "要查出16歲以下，平台就得核實每一個人的年齡。",
  "想查邊個未夠16歲？咁就人人都要畀App查年齡。");
tr(ag.data, "para",
  "雙方都同意，13歲那條舊線已經失效。**真正**的問題，是[b:用甚麼取代|它]。",
  "兩邊都認同舊規矩已經廢咗。**真正**要拗嘅，係[b:用甚麼取代|它]。");
ag.conn.e5 = "⚖️ 兩邊都有道理——跟住睇同一個星期，點樣畀人寫成兩單新聞。📰";

const pl = by("poll");
tr(pl.data, "para",
  "輕按橫條，可查看實際人數。有一點要留意：民調在[o:執行細則公布|之前]進行。",
  "㩒一下條橫條就見到實際人數。不過要知：啲人答嘅時候，仲係[o:執行細則公布|之前]。");
pl.conn.e5 = "🗳️ 民情就係咁。跟住睇同一個星期點畀人炒成兩味。📰";

const dr = by("dreads");
tr(dr.data, "para",
  "<span class=\"lead\">同一條法例，同一個星期，兩個標題。</span>[kw:敘事框架]決定了甚麼顯得[b:|重要]。察覺框架，與查核事實，是兩種不同的功夫。",
  "<span class=\"lead\">同一條法例，同一個禮拜，兩個標題。</span>[kw:敘事框架]決定咗你覺得乜嘢[b:|重要]。睇得出個框架，同查唔查到事實，係兩門唔同嘅功夫。");
dr.conn.e5 = "🖼️ 兩個框，同一批事實。咁研究本身講乜？🔬";

const ex = by("expert");
ex.data.para = {
  p: "幾乎所有研究都屬[kw:相關性]，**並非因果**——所以證據仍然眾說紛紜。",
  c: "幾乎所有研究都屬[kw:相關性]，**並非因果**——這正是證據至今眾說紛紜的原因。",
  e: "啲研究九成九都係[kw:相關性]，**唔係因果**——所以拗極都冇答案。"
};
ex.conn.e5 = "🔬 證據仲拗緊。不過無論點，先睇吓件事砸落邊個度。🎯";

const im = by("impact");
tr(im.data.rows[0], "para",
  "數以百萬計的現有帳戶將被關閉；青少年與每日相見的朋友、創作者和[i:群組]，就此斷開。",
  "幾百萬個帳戶會被封。後生仔同日日見面嘅朋友、創作者同[i:群組]，一刀切斷。");
tr(im.data.rows[1], "para",
  "家長和老師成了執法者：查年齡，還要堵住孩子們早已熟知的[i:繞道方法]。",
  "家長同老師變咗做把關人：查年齡，仲要塞住啲細路一早識晒嘅[i:繞道方法]。");
tr(im.data.rows[2], "para",
  "企業要面對新的核查成本與法律風險，還要失去增長最快的[i:用戶群]。",
  "啲公司又要畀錢起系統、又孭法律風險，仲要蝕埋增長最快嗰批[i:用戶群]。");
tr(im.data, "para",
  "禁令對最年輕的用戶打擊最重——並波及每一位要為他們負責的人。",
  "呢條禁令，最細嗰批用戶食得最重——連湊佢哋嘅人都食埋一份。");
im.conn.e5 = "🎯 呢啲係受影響嘅人。跟住睇你自己會變咗啲乜。🪞";

const wy = by("why");
tr(wy.data.boxes[0], "para",
  "要保住帳戶，你可能需要**證明年齡**——交出應用程式從未[b:要求過的|身份證明或人臉掃描]。",
  "想留住個帳戶？你可能要**證明自己幾多歲**——即係交出啲App以前從來冇[b:要求過的|身份證明或人臉掃描]。");
tr(wy.data.boxes[1], "para",
  "16歲以下的帳戶關閉後，**年紀較小的朋友和弟妹**，會從你[b:每日使用的|群組和動態]中消失。",
  "16歲以下嘅帳戶一封，**啲後生啲嘅朋友同細佬妹**就會由你[b:每日使用的|群組和動態]度消失。");
tr(wy.data.boxes[2], "para",
  "家長成了**界線的執行者**——自行判斷孩子何時才算[b:真正|夠大]。",
  "家長變咗**把關嗰個**，要自己判斷個細路幾時先算[b:真正|夠大]。");
tr(wy.data, "para",
  "衝擊並不平均：同一條規則，因你的年齡、你[b:使用這些應用的|方式]不同，而**感受迥異**。",
  "唔係人人一樣。同一條規則，睇你幾多歲、睇你[b:使用這些應用的|方式]，**感受可以差好遠**。");
wy.conn.e5 = "💸 呢個係個人埋單價。跟住睇件事會點行落去。🔮";

const nx = by("next");
tr(nx.data.rows[0], "para",
  "法國資訊自由委員會的年齡核查細則，會在六個月死線前公布——執法究竟是甚麼模樣，由它決定。",
  "法國資訊自由委員會嘅查年齡細則，會喺六個月死線之前出——真正點執法，睇佢。");
tr(nx.data.rows[1], "para",
  "權益團體與部分平台，正準備法律挑戰——或會拖延規則生效，或收窄適用範圍。",
  "維權組織同幾間平台已經準備打官司，可能拖遲條例生效，或者縮窄佢管到嘅範圍。");
tr(nx.data.rows[2], "para",
  "已有三個國家的草案引用法國文本。這裏的結果，很可能成為全歐洲的範本。",
  "已經有三個國家嘅草案照抄法國版——呢度點收場，可能成個歐洲跟住做。");
tr(nx.data, "para",
  "三個懸念，一條死線。下一步棋，來自[i:法庭]的機會，不比來自國會低。",
  "三個懸念，一條死線。下一步棋，出自[i:法庭]嘅機會唔細過國會。");
nx.conn.e5 = "🗓️ 一條死線，幾個懸念——成個歐洲攞緊筆記。📝";

zh.ovConn.e5 = "🏷️ 改變會先上價錢牌，之後先寫入條約。🧾";
}

/* ===== typed inline-transparency entries (design from the single-file demo) ===== */
{
const en = module.exports.en, zh = module.exports.zh;
en.pop = {
  "verify age": { def: "Checking a user really is the age they claim — usually via ID or a face-estimation scan — rather than trusting a typed birth date. The only way a ban can be enforced, and it applies to every user of every age." },
  "reasonable steps": { def: "The legal standard platforms must meet: demonstrable, proportionate efforts to detect and remove under-16 accounts. What counts as reasonable is what the courts will end up defining." },
  "framing": { def: "The choice of which facts to place at the centre of a story. The same vote can be told as protecting children or restricting freedom — both true, each steering the reader differently." },
  "correlational": { def: "Correlational research shows two things move together — more social media, lower wellbeing — without proving one causes the other. Most evidence in this debate is correlational, which is why the average effect is real but small and hard to act on." },
  "no exemption for parental consent": { rows: [
    ["Who confirmed it", "The exemption's absence is written into the promulgated statute."],
    ["Why we're sure", "The legislative text is public record."],
    ["Why it matters", "Unlike earlier proposals, a parent's approval changes nothing — under 16 means no account, full stop."]],
    src: ["CNIL", "Frontline Wire"] },
  "the thing that replaces it": { rows: [
    ["Whose view this is", "Policy analysts framing the debate as a choice of replacement, not a defence of the status quo."],
    ["Why it's analysis, not fact", "Both sides agree 13 failed; whether a ban is the right replacement is a judgement, not a settled outcome."]],
    src: ["Meridian Institute for Child Wellbeing"] }
};
zh.pop = {
  "核實年齡": { def: "查證用戶申報的年齡屬實——通常靠身份證明或人臉年齡估算，而非單信自填的出生日期。禁令唯一的執行方法，適用於所有年齡的每一位用戶。" },
  "合理措施": { def: "平台須達到的法律標準：可證明、成比例地偵測及移除16歲以下帳戶。何謂「合理」，最終由法庭定義。" },
  "敘事框架": { def: "選擇把哪些事實放在報道中心。同一次表決，可以寫成「保護兒童」，也可以寫成「限制自由」——兩者皆真，卻把讀者引向不同結論。" },
  "相關性": { def: "相關性研究只顯示兩件事同步變化——社交媒體用得多、身心狀態較差——卻證明不了因果。這場辯論的證據大多屬此類，所以平均影響真實存在、但幅度小，亦難以據此行動。" },
  "家長同意也不獲豁免": { rows: [
    ["誰證實", "「不設豁免」白紙黑字寫入已頒布的法例。"],
    ["為何可信", "立法文本屬公開紀錄。"],
    ["為何重要", "與早年方案不同：家長批准也改變不了甚麼——未滿16歲就是不能有帳戶。"]],
    src: ["法國資訊自由委員會", "Frontline Wire"] },
  "用甚麼取代它": { rows: [
    ["這是誰的觀點", "政策分析者把辯論定性為「選擇替代方案」，而非「捍衛現狀」。"],
    ["為何屬分析而非事實", "雙方都同意13歲那條線已失敗；禁令是否正確的替代，是判斷，不是定論。"]],
    src: ["Meridian Institute for Child Wellbeing"] }
};
}
