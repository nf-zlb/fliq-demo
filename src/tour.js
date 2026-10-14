/* Onboarding tour. Spotlight steps over the live UI; action steps advance when
   the user performs the real gesture (the cutout lets taps through), Next is
   always available as a fallback. Auto-starts once (localStorage nf-tour-done);
   replayable from the ? fab shown on the feed. */
(function(){
  var ZH = /^zh/i.test(document.documentElement.lang || '');
  var frame = document.getElementById('nf-frame');
  if (!frame) return;

  /* ---------- copy ---------- */
  var W = ZH ? {
    next: "下一步", start: "開始導覽", done: "完成", skip: "跳過導覽", hint: "試吓 →"
  } : {
    next: "Next", start: "Start tour", done: "Done", skip: "Skip tour", hint: "Try it →"
  };
  var TXT = ZH ? [
    ["歡迎嚟到 Fliq", "用大約兩分鐘，互動式行一次這個示範的功能。之後隨時可按 ? 重播。"],
    ["今日一眼睇晒", "即時概覽把今日必讀濃縮成一張卡。時鐘與日期都是實時的——示範永遠不過期。"],
    ["每單新聞都是一疊卡", "封面標明可信度、卡數與題材。<b>輕按這單新聞打開它。</b>"],
    ["分頁跟住你讀", "一路碌，分頁一路亮；點一下即可跳去地圖、數字或下一步。"],
    ["可信度訊號", "<b>按可信度標籤</b>——每單新聞都帶住核實層：來源、已證實、有爭議、未知數。關閉後繼續。"],
    ["輿論脈搏層", "<b>按脈搏標籤</b>——平台上嘅反應：立場、熱度、引言。關閉後繼續。"],
    ["聲線：一個故事，三把聲", "<b>按「聲線」</b>揀「淡定解說」或「朋友仔」——每段文字即時重新演繹。關閉後繼續。"],
    ["行間透明", "<b>輕按發光的字詞</b>——關鍵說法就喺行文入面交代出處、證據同前提。"],
    ["實時地圖", "真地圖，不是截圖——可拖可縮。<b>㩒一下標記</b>睇吓嗰一點發生咗乜。"],
    ["事件時序", "今日逐個鐘睇——標籤標明邊啲突發、邊啲仲發展緊。"],
    ["識答你嘅數字", "<b>㩒一下柱形</b>——每條柱都答返你準確數字同背景。"],
    ["前瞻訊號", "模型推算嘅走勢概率。<b>㩒一下錶盤</b>睇吓佢點解郁。"],
    ["風險階梯", "可能升級嘅情況，由高至低排——等級會隨事實更新。"],
    ["民意所向", "<b>㩒一下橫條</b>，百分比即翻出實際人數——樣本睇得見。"],
    ["現場直擊", "街頭層面嘅現場報道——數字背後嘅質感。"],
    ["冇死胡同", "碌到最後一張卡再往上拉——下一單新聞原地展開。在頂部往下拉即可返回。"],
    ["導覽完畢", "四單新聞、兩種語言、三把聲線——全部即場任試。隨時在動態頁按 ? 重播。"]
  ] : [
    ["Welcome to Fliq", "A quick interactive tour of what this demo can do — about two minutes. Replay it anytime with the ? button."],
    ["Today at a glance", "The snapshot condenses today's essentials into one card. The clock and dates are live — the demo never goes stale."],
    ["Every story is a stack of cards", "Each cover shows a confidence read, card count and topics. <b>Tap this story to open it.</b>"],
    ["Tabs follow your reading", "They light up as you scroll — or tap one to jump straight to Map, Numbers or What's Next."],
    ["The Confidence Signal", "<b>Tap the confidence pill</b> — every story carries its verification layer: sources, confirmed, disputed, unknown. Close it to continue."],
    ["The Social Layer", "<b>Tap the pulse pill</b> — reaction from the platforms: stances, heat and quotes. Close it to continue."],
    ["Voices: one story, three tellings", "<b>Tap Voices</b> and pick Calm or the Friend voice — every paragraph re-tells itself in that register. Close to continue."],
    ["Inline transparency", "<b>Tap the glowing term</b> — key claims explain their sourcing, evidence and caveats right in the text."],
    ["The live map", "A real map, not a screenshot — drag to pan, pinch to zoom. <b>Tap a marker</b> to see what happened at that spot."],
    ["The timeline", "Today hour by hour — the chips flag what's breaking versus still developing."],
    ["Numbers that answer back", "<b>Tap a bar</b> — each column replies with its exact figure and context."],
    ["Forward signals", "Model-estimated odds on what happens next. <b>Tap a gauge</b> to see why it's moving."],
    ["The risk ladder", "What could escalate, ranked high to low — levels move as facts land."],
    ["Where people stand", "<b>Tap a bar</b> to flip percentages into raw counts — polling with its sample visible."],
    ["On the ground", "Dispatches from street level — the texture behind the numbers."],
    ["Never a dead end", "Scroll past the last card and keep pulling — the next story grows open in place. Overscroll at the top to go back."],
    ["That's the tour", "Four stories, two languages, three voices — all live. Replay this anytime with the ? button on the feed."]
  ];

  /* ---------- step targets ---------- */
  function q(sel){ return function(){ return document.querySelector(sel); }; }
  function visibleKw(){
    var kws = document.querySelectorAll('.stage.active .kw');
    for (var i = 0; i < kws.length; i++) if (kws[i].getClientRects().length) return kws[i];
    return null;
  }
  function toTop(el){ var p = document.querySelector('.stage.active .nf-phone'); if (p) p.scrollTop = 0; }
  function toCenter(el){
    if (el && el.scrollIntoView) el.scrollIntoView({ block: 'center' });
    /* scrollIntoView also scrolls the root when the page is viewed standalone
       (outside the 375x812 shell iframe) — undo that so the frame stays put */
    document.documentElement.scrollTop = 0; document.body.scrollTop = 0;
  }

  var STEPS = [
    { center: 1, startBtn: 1 },
    { el: q('#stage-0 .snapshot') },
    { el: q('#stage-0 .mcard'), pre: toCenter, await: 'story', pad: 8 },
    /* story-scoped steps: if no story is open (user pressed Next instead of
       tapping the card), enter() opens one rather than cascade-skipping */
    { el: q('.stage.active .nf-tabs'), pre: toTop, story: 1 },
    { el: q('.stage.active .nf-conf'), pre: toTop, await: 'conf', story: 1 },
    { el: q('.stage.active .nf-actionbar [data-social]'), await: 'pulse', story: 1 },
    { el: q('.stage.active .js-voicebtn'), await: 'voice', story: 1 },
    { el: visibleKw, pre: toCenter, await: 'pop', pad: 8, story: 1 },
    /* per-card steps: each skips itself when the opened story lacks that card */
    { el: q('.stage.active .c-map'), pre: toCenter, await: 'mappop', story: 1 },
    { el: q('.stage.active .c-tl'), pre: toCenter, story: 1 },
    { el: q('.stage.active .c-numbers'), pre: toCenter, await: 'tip', story: 1 },
    { el: q('.stage.active .c-signal'), pre: toCenter, await: 'sigopen', story: 1 },
    { el: q('.stage.active .c-risk2'), pre: toCenter, story: 1 },
    { el: q('.stage.active .c-poll'), pre: toCenter, await: 'pollflip', story: 1 },
    { el: q('.stage.active .c-ground'), pre: toCenter, story: 1 },
    { el: q('.stage.active .nf-next'), pre: toCenter, story: 1 },
    { center: 1, doneBtn: 1 }
  ];

  function mkAwait(kind){
    if (kind === 'story') return { test: function(){ return !!document.querySelector('.stage.active:not(#stage-0)'); } };
    if (kind === 'pop') return { test: function(){ var p = document.querySelector('.kit-pop'); return !!(p && p.classList.contains('on')); } };
    if (kind === 'mappop') return { test: function(){ return !!document.querySelector('.stage.active .leaflet-popup'); } };
    if (kind === 'tip') return { test: function(){ return !!document.querySelector('.stage.active .kit-tip'); } };
    if (kind === 'sigopen') return { test: function(){ return !!document.querySelector('.stage.active .c-signal .sig.open'); } };
    if (kind === 'pollflip') return { test: function(){
      var pv = document.querySelector('.stage.active .c-poll .pv');
      return !!(pv && pv.textContent.indexOf('%') < 0);
    } };
    /* open->close cycles: a MutationObserver flags the open state the moment it
       happens — polling alone can miss a quick open/close between ticks */
    var id = kind === 'conf' ? 'layer-confidence' : kind === 'pulse' ? 'layer-pulse' : 'nf-vsheet';
    var cls = kind === 'voice' ? 'open' : 'on';
    var el = document.getElementById(id);
    var seen = !!(el && el.classList.contains(cls)), mo = null;
    if (el) {
      mo = new MutationObserver(function(){ if (el.classList.contains(cls)) seen = true; });
      mo.observe(el, { attributes: true, attributeFilter: ['class'] });
    }
    return { test: function(){ return !!el && seen && !el.classList.contains(cls); },
             dispose: function(){ if (mo) mo.disconnect(); } };
  }

  /* ---------- DOM ---------- */
  var overlay = document.createElement('div');
  overlay.id = 'nf-tour';
  overlay.innerHTML =
    '<div class="tour-shade" data-p="t"></div><div class="tour-shade" data-p="b"></div>' +
    '<div class="tour-shade" data-p="l"></div><div class="tour-shade" data-p="r"></div>' +
    '<div class="tour-ring"></div>' +
    '<div class="tour-tip"><p class="tt-title"></p><p class="tt-text"></p>' +
    '<div class="tour-foot"><span class="tour-count"></span>' +
    '<div class="tour-btns"><span class="tour-hint" hidden><i></i><span>' + W.hint + '</span></span>' +
    '<button class="tour-skip" type="button">' + W.skip + '</button>' +
    '<button class="tour-next" type="button">' + W.next + '</button></div></div></div>';
  frame.appendChild(overlay);
  var sh = {}, ring = overlay.querySelector('.tour-ring'), tip = overlay.querySelector('.tour-tip');
  ['t', 'b', 'l', 'r'].forEach(function(p){ sh[p] = overlay.querySelector('[data-p="' + p + '"]'); });
  var elTitle = overlay.querySelector('.tt-title'), elText = overlay.querySelector('.tt-text'),
      count = overlay.querySelector('.tour-count'), hint = overlay.querySelector('.tour-hint'),
      btnSkip = overlay.querySelector('.tour-skip'), btnNext = overlay.querySelector('.tour-next');

  var fab = document.createElement('button');
  fab.id = 'tour-fab'; fab.type = 'button'; fab.textContent = '?';
  fab.setAttribute('aria-label', ZH ? '重播導覽' : 'Replay tour');
  frame.appendChild(fab);

  /* ---------- placement ---------- */
  var idx = -1, curAwait = null, ticker = null, advancing = false, retries = 0;

  function box(el, x, y, w, h){ el.style.left = x + 'px'; el.style.top = y + 'px'; el.style.width = w + 'px'; el.style.height = h + 'px'; }
  function place(){
    var step = STEPS[idx]; if (!step) return;
    var fr = frame.getBoundingClientRect(), FW = fr.width, FH = fr.height;
    var hole = null;
    if (step.el) {
      var el = step.el();
      if (el && el.getClientRects().length) {
        var r = el.getBoundingClientRect(), pad = step.pad != null ? step.pad : 6;
        hole = { x: Math.max(0, r.left - fr.left - pad), y: Math.max(0, r.top - fr.top - pad) };
        hole.w = Math.min(FW - hole.x, r.width + pad * 2);
        hole.h = Math.min(FH - hole.y, r.height + pad * 2);
        if (hole.w < 24 || hole.h < 24) hole = null; /* target off-frame: fall back to centered tip */
      }
    }
    if (hole) {
      box(sh.t, 0, 0, FW, hole.y);
      box(sh.b, 0, hole.y + hole.h, FW, Math.max(0, FH - hole.y - hole.h));
      box(sh.l, 0, hole.y, hole.x, hole.h);
      box(sh.r, hole.x + hole.w, hole.y, Math.max(0, FW - hole.x - hole.w), hole.h);
      ring.style.display = 'block';
      box(ring, hole.x, hole.y, hole.w - 4, hole.h - 4); /* border 2px each side */
      var th = tip.offsetHeight || 120;
      var below = hole.y + hole.h + 12, above = hole.y - th - 12;
      var ty = below + th + 8 <= FH ? below : Math.max(8, above);
      var tx = Math.min(Math.max(8, hole.x + hole.w / 2 - 150), FW - 308);
      tip.style.top = ty + 'px'; tip.style.left = tx + 'px';
    } else {
      box(sh.t, 0, 0, FW, FH); box(sh.b, 0, FH, FW, 0); box(sh.l, 0, 0, 0, 0); box(sh.r, FW, 0, 0, 0);
      ring.style.display = 'none';
      var th2 = tip.offsetHeight || 140;
      tip.style.top = Math.max(8, (FH - th2) / 2) + 'px';
      tip.style.left = ((FW - 300) / 2 - 8) + 'px';
    }
  }

  function enter(){
    var step = STEPS[idx];
    if (step.story && !document.querySelector('.stage.active:not(#stage-0)')) {
      /* user advanced past the "tap this story" step without opening one —
         open the first story for them and retry this SAME step */
      if (retries < 4) {
        /* clear any stale await (e.g. the story await from the card step) so the
           ticker can't fire a second advance while the retry is pending */
        if (curAwait && curAwait.dispose) curAwait.dispose();
        curAwait = null;
        var mc = document.querySelector('#stage-0 .mcard');
        if (retries === 0 && mc) mc.click(); else if (window.__activate) window.__activate(1);
        retries++;
        setTimeout(enter, 500);
        return;
      }
      /* engine wedged: fall through to the normal missing-target skip */
    }
    if (step.el) {
      var el = step.el();
      if (!el || !document.contains(el)) { next(); return; } /* target missing -> skip step */
      if (step.pre) step.pre(el);
    }
    if (curAwait && curAwait.dispose) curAwait.dispose();
    curAwait = step.await ? mkAwait(step.await) : null;
    elTitle.textContent = TXT[idx][0];
    elText.innerHTML = TXT[idx][1];
    count.textContent = (idx + 1) + ' / ' + STEPS.length;
    hint.hidden = !step.await;
    btnSkip.style.display = step.doneBtn ? 'none' : '';
    btnNext.textContent = step.startBtn ? W.start : step.doneBtn ? W.done : W.next;
    advancing = false;
    place();
    setTimeout(place, 350); /* re-measure after pre-scroll / chrome settle */
  }
  function next(){
    idx++;
    retries = 0;
    if (idx >= STEPS.length) { end(true); return; }
    enter();
  }
  function start(){
    idx = -1;
    overlay.classList.add('on');
    fab.classList.remove('show');
    clearInterval(ticker);
    ticker = setInterval(function(){
      if (!overlay.classList.contains('on')) return;
      if (curAwait && !advancing && curAwait.test()) {
        advancing = true; curAwait = null;
        setTimeout(next, 500); /* let the result land before moving on */
      } else place();
    }, 320);
    next();
  }
  function end(markDone){
    overlay.classList.remove('on');
    clearInterval(ticker); ticker = null;
    if (curAwait && curAwait.dispose) curAwait.dispose();
    curAwait = null;
    if (markDone) try { localStorage.setItem('nf-tour-done', '1'); } catch (e) {}
    syncFab();
  }

  btnNext.addEventListener('click', function(){ next(); });
  btnSkip.addEventListener('click', function(){ end(true); });
  fab.addEventListener('click', start);
  document.addEventListener('scroll', function(){ if (overlay.classList.contains('on')) place(); }, true);
  window.addEventListener('resize', function(){ if (overlay.classList.contains('on')) place(); });

  /* fab: visible on the feed only, never during the tour */
  function syncFab(){
    var onFeed = document.getElementById('stage-0').classList.contains('active');
    fab.classList.toggle('show', onFeed && !overlay.classList.contains('on'));
  }
  var mo = new MutationObserver(syncFab);
  document.querySelectorAll('.stage').forEach(function(s){ mo.observe(s, { attributes: true, attributeFilter: ['class'] }); });
  syncFab();

  var done = false;
  try { done = localStorage.getItem('nf-tour-done') === '1'; } catch (e) {}
  if (!done) setTimeout(function(){ if (!overlay.classList.contains('on')) start(); }, 1200);

  window.__tour = { start: start, end: end, next: next, step: function(){ return idx; } };
})();
