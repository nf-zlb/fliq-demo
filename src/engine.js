
(function(){
  var nfFrame = document.getElementById('nf-frame');
  var stages = [].slice.call(document.querySelectorAll('.stage'));
  var ST = [];
  var currentClass = 'voice-plain', currentVoice = 'Plain', active = 0;
  var PULL = 460, TABS_HOME = 78, DOCK_H = 44, NAV = 92, HOLD = 140, DELTA = 5;
  function lerp(a,b,t){ return a + (b-a)*t; }
  function clamp(v,a,b){ return Math.max(a, Math.min(b, v)); }

  function fitStoryHero(i){
    var st = ST[i]; if(!st) return;
    var hero = st.phone.querySelector('.c-story-hero, .c-s2story-hero');
    var body = st.phone.querySelector('.c-story-body, .c-s2story-body');
    if(!hero || !body || !st.strip) return;
    var tabsTop = st.strip.getBoundingClientRect().top - nfFrame.getBoundingClientRect().top;
    var bodyH = body.offsetHeight;
    if(i === 0) hero.style.height = Math.max(220, Math.round(tabsTop + 72 - 16 - bodyH)) + 'px';
    else        hero.style.height = Math.max(220, Math.round(tabsTop - 16 - 16 - bodyH)) + 'px';
  }
  function fitOverlay(i){
    var st = ST[i]; if(!st || !st.overlay) return;
    var card = st.overlay.querySelector('.s2-card');
    var tb = st.overlay.querySelector('.s2-bottom .nf-tabs');
    if(!card || !tb) return;
    var tabsTop = tb.getBoundingClientRect().top - st.overlay.getBoundingClientRect().top;
    st.HERO_DEF = Math.max(220, Math.round(tabsTop - 16 - 16 - card.offsetHeight));
    if(st.phone.classList.contains('at-end')) doExpand(i);
  }
  function fitAll(){ stages.forEach(function(s,i){ fitStoryHero(i); fitOverlay(i); }); }

  function doExpand(i){
    var st = ST[i]; if(!st || !st.overlay) return;
    var phone = st.phone, ov = st.overlay;
    // once this stage has handed off to the next, keep its overlay hidden — a lingering
    // programmatic smooth-scroll must not re-reveal it over the now-active next stage.
    if(st.handedOff){ ov.style.opacity = '0'; return; }
    var maxS = phone.scrollHeight - phone.clientHeight, pullStart = maxS - PULL;
    var atEnd = phone.scrollTop >= pullStart - 1;
    phone.classList.toggle('at-end', atEnd && st.lastConnReady);
    if(!atEnd || !st.lastConnReady){ ov.style.opacity = '0'; if(st.bottomBar) st.bottomBar.style.opacity = ''; return; }
    ov.style.opacity = '1';
    var last = st.conns.length - 1;
    if(st.conns[last] && !st.readSet[last]){ st.readSet[last] = true; st.conns[last].classList.add('end'); }
    var H = phone.clientHeight;
    var p = clamp((phone.scrollTop - pullStart) / PULL, 0, 1);
    var HD = st.HERO_DEF;
    var dockedTop = H - TABS_HOME - DOCK_H, dockedBottom = H - TABS_HOME;
    var heroTop = lerp(dockedTop, 0, p);
    var heroBottom = lerp(dockedBottom, HD, p);
    st.ovHero.style.top = heroTop + 'px';
    st.ovHero.style.height = (heroBottom - heroTop) + 'px';
    var rad = lerp(16, 0, clamp(p / 0.45, 0, 1));
    st.ovHero.style.borderRadius = rad + 'px ' + rad + 'px 0 0';
    st.ovPill.style.opacity = String(clamp(1 - p * 5, 0, 1));
    var heroFade = clamp((p - 0.1) / 0.35, 0, 1);
    st.ovScrim.style.opacity = String(heroFade);
    st.ovGrad.style.opacity = String(heroFade);
    st.ovTitle.style.opacity = String(clamp((p - 0.35) / 0.3, 0, 1));
    var cardP = clamp((p - 0.25) / 0.75, 0, 1);
    st.ovBelow.style.top = lerp(H + 40, heroBottom + 16, cardP) + 'px';
    st.ovBelow.style.opacity = String(cardP);
    st.ovTop.style.opacity = String(clamp((p - 0.25) / 0.35, 0, 1));
    st.ovBottom.style.opacity = String(clamp((p - 0.05) / 0.18, 0, 1));
    if(st.bottomBar) st.bottomBar.style.opacity = String(clamp(1 - p * 2.4, 0, 1));
    if(p >= 0.999 && st.committed && !st.handedOff){ st.handedOff = true; activate(st.nextIdx); }
  }

  function scheduleSnap(i){
    var st = ST[i]; if(!st.overlay || st.snapping || st.backScrolling) return;
    if(st.snapTimer) clearTimeout(st.snapTimer);
    st.snapTimer = setTimeout(function(){ doSnap(i); }, 130);
  }
  function doSnap(i){
    var st = ST[i]; if(!st.overlay || st.backScrolling) return;
    var phone = st.phone, maxS = phone.scrollHeight - phone.clientHeight, pullStart = maxS - PULL;
    if(phone.scrollTop <= pullStart + 1){ st.committed = false; return; }
    var p = clamp((phone.scrollTop - pullStart) / PULL, 0, 1);
    if(p <= 0.02){ st.committed = false; return; }
    var toFull = p >= 0.5;
    if(toFull){ commitNext(i); return; }
    st.snapping = true;
    phone.scrollTo({ top: pullStart, behavior: 'smooth' });
    setTimeout(function(){ st.snapping = false; }, 460);
  }
  function commitNext(i){
    var st = ST[i]; if(!st.overlay || st.committing) return;
    st.committing = true; st.committed = true;
    var phone = st.phone, maxS = phone.scrollHeight - phone.clientHeight;
    phone.scrollTo({ top: maxS, behavior: 'smooth' });
    setTimeout(function(){ if(!st.handedOff){ st.handedOff = true; activate(st.nextIdx); } }, 520);
  }
  // ===== scroll-back: reverse the grow to return to the previous story =====
  function goBack(n){
    var st = ST[n]; if(st.prevIdx == null || st.backBusy) return;
    st.backBusy = true;
    // Story 1's "previous" is the feed — slide back to it instead of a reverse-grow.
    if(ST[st.prevIdx] && ST[st.prevIdx].isFeed){ slideTo(0, 'down'); setTimeout(function(){ st.backBusy = false; }, 520); return; }
    var pv = ST[st.prevIdx];
    activate(st.prevIdx);
    pv.handedOff = false; pv.committed = false; pv.committing = false; pv.backScrolling = true;
    // show the previous story at its pull-end: its overlay (= story n, fully grown) matches
    // exactly what the user is looking at, then reverse-scroll up out of the pull zone.
    requestAnimationFrame(function(){
      var maxS = pv.phone.scrollHeight - pv.phone.clientHeight;
      pv.phone.scrollTop = maxS;
      doExpand(st.prevIdx);
      requestAnimationFrame(function(){
        var maxS2 = pv.phone.scrollHeight - pv.phone.clientHeight;
        pv.phone.scrollTo({ top: Math.max(0, maxS2 - PULL - 120), behavior:'smooth' });
        setTimeout(function(){ pv.backScrolling = false; st.backBusy = false; }, 660);
      });
    });
  }

  function resetStage(j){
    var st = ST[j]; if(!st) return;
    if(st.isFeed){ stages[j].classList.remove('chrome-off'); if(st.phone) st.phone.scrollTop = 0; return; }
    if(st.phone){ st.phone.classList.remove('at-end', 'chrome-off'); st.phone.scrollTop = 0; }
    st.lastY = 0; st.committed = false; st.committing = false; st.handedOff = false;
    st.snapping = false; st.backScrolling = false;
    if(st.bottomBar) st.bottomBar.style.opacity = '';
    applyVoiceAll(currentClass, currentVoice);
    requestAnimationFrame(function(){ fitStoryHero(j); fitOverlay(j); });
  }
  function activate(j){           // instant swap — used by grow handoff + inter-story scroll-back
    if(j >= stages.length) return;
    active = j;
    stages.forEach(function(s,k){ s.classList.toggle('active', k === j);
      s.style.transform=''; s.style.transition=''; s.style.zIndex=''; s.classList.remove('leaving'); });
    ST.forEach(function(st){ if(st.overlay){ st.overlay.style.opacity = '0'; } });
    resetStage(j);
  }
  function slideTo(j, dir){        // animated slide (feed <-> story). dir 'up' from bottom, 'down' from top
    if(j === active) return;
    var out = stages[active], inc = stages[j];
    active = j;
    ST.forEach(function(st){ if(st.overlay){ st.overlay.style.opacity = '0'; } });
    resetStage(j);
    inc.classList.add('active'); inc.style.transition = 'none';
    inc.style.zIndex = '5'; out.style.zIndex = '4';
    inc.style.transform = (dir === 'down') ? 'translateY(-100%)' : 'translateY(100%)';
    out.style.transition = 'none'; out.style.transform = 'none'; out.classList.add('leaving');
    void inc.offsetHeight;
    inc.style.transition = 'transform .44s cubic-bezier(.22,.61,.36,1)';
    inc.style.transform = 'none';
    setTimeout(function(){
      out.classList.remove('active', 'leaving'); out.style.transition=''; out.style.transform=''; out.style.zIndex='';
      inc.style.transition=''; inc.style.transform=''; inc.style.zIndex='';
      // re-fit now that the incoming stage is in its final (untransformed) position — a fit
      // taken mid-slide measures the stage while it's translated off-screen and oversizes the hero.
      requestAnimationFrame(function(){ fitStoryHero(j); fitOverlay(j); });
    }, 470);
  }

  function initStage(i){
    var stage = stages[i];
    if(stage.classList.contains('feedwrap')){        // the feed entry stage — no story machinery
      var feedScroll = stage.querySelector('.scroll');
      ST[i] = { phone: feedScroll, isFeed:true, overlay:null, bottomBar:null,
                nextIdx:null, prevIdx:null, readSet:{}, committed:false, committing:false,
                handedOff:false, snapping:false, backScrolling:false, queued:false, lastY:0 };
      // nav row hides on scroll-down, returns on scroll-up / near top — status bar stays pinned.
      // Same HOLD/DELTA direction logic the stories use, toggling .chrome-off on the feed stage.
      var fLastY = 0, fLock = 0;
      feedScroll.addEventListener('scroll', function(){
        var y = feedScroll.scrollTop, d = y - fLastY;
        if(Date.now() < fLock){ fLastY = y; return; }
        if(y <= HOLD){ stage.classList.remove('chrome-off'); fLastY = y; return; }
        if(Math.abs(d) < DELTA){ return; }
        var was = stage.classList.contains('chrome-off'), now = d > 0;
        if(was !== now){ stage.classList.toggle('chrome-off', now); fLock = Date.now() + 280; }
        fLastY = y;
      }, { passive:true });
      return;
    }
    var phone = stage.querySelector('.nf-phone');
    var cardsC = stage.querySelector('.cards');
    var secs = [].slice.call(stage.querySelectorAll('.nf-card'));
    var tabs = [].slice.call(stage.querySelectorAll('.nf-tab'));
    var strip = stage.querySelector('.nf-tabs');
    var conns = secs.map(function(s){ return s.querySelector('.conn'); });
    var bottomBar = stage.querySelector('.nf-bottom');
    var overlay = document.getElementById('ov-src-' + i);
    var nextIdx = parseInt(stage.getAttribute('data-next'), 10);
    var prevAttr = stage.getAttribute('data-prev');
    var prevIdx = (prevAttr === '' || prevAttr == null) ? null : parseInt(prevAttr, 10);
    var st = { phone:phone, cardsC:cardsC, secs:secs, tabs:tabs, strip:strip, conns:conns,
               bottomBar:bottomBar, overlay:overlay, nextIdx:nextIdx, prevIdx:prevIdx,
               lastY:0, lock:0, committed:false, committing:false,
               lastConnReady:false, readSet:{}, HERO_DEF:474, handedOff:false, snapping:false, snapTimer:null,
               queued:false, backBusy:false, backScrolling:false };
    if(overlay){
      st.ovHero  = overlay.querySelector('.s2-hero');
      st.ovScrim = overlay.querySelector('.s2-scrim');
      st.ovGrad  = overlay.querySelector('.s2-grad');
      st.ovPill  = overlay.querySelector('.s2-pill');
      st.ovTitle = overlay.querySelector('.s2-title');
      st.ovBelow = overlay.querySelector('.s2-below');
      st.ovTop   = overlay.querySelector('.s2-topnav');
      st.ovBottom= overlay.querySelector('.s2-bottom');
    }
    ST[i] = st;

    // reveal-on-scroll
    try{
      if('IntersectionObserver' in window){
        cardsC.classList.add('rvl');
        var rvEls = [];
        secs.forEach(function(sec){
          var card = sec.querySelector('.card'); var conn = sec.querySelector('.conn');
          if(card){ card.classList.add('rv-card'); rvEls.push(card); }
          if(conn){ rvEls.push(conn); }
        });
        var rio = new IntersectionObserver(function(ents){
          ents.forEach(function(e){ if(e.isIntersecting){
            e.target.classList.add('rv'); rio.unobserve(e.target);
            if(e.target === rvEls[rvEls.length - 1]){ setTimeout(function(){ st.lastConnReady = true; doExpand(i); }, 700); }
          }});
        }, { root: phone, threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
        rvEls.forEach(function(el){ rio.observe(el); });
      }
    }catch(e){}

    function activeIdx(){
      var line = phone.getBoundingClientRect().top + NAV + 1, idx = 0;
      for(var k=0;k<secs.length;k++){ if(secs[k].getBoundingClientRect().top <= line) idx = k; else break; }
      return idx;
    }
    function centre(k){ var t = tabs[k]; if(!t || !strip) return;
      strip.scrollTo({ left: t.offsetLeft - (strip.clientWidth - t.offsetWidth)/2, behavior:'smooth' }); }
    function markRead(){
      var pr = phone.getBoundingClientRect(), mid = pr.top + pr.height * 0.5;
      var last = conns.length - 1;
      for(var k=0;k<last;k++){ var c = conns[k];
        if(c && !st.readSet[k] && c.getBoundingClientRect().top < mid){ st.readSet[k] = true; c.classList.add('read'); } }
      // last connector flips to End once you've reached the end of the story's content
      // (the pull-start), matching the original terminal behaviour — robust, not reveal-gated.
      var c2 = conns[last];
      var atContentEnd = phone.scrollTop >= (phone.scrollHeight - phone.clientHeight - PULL - 4);
      if(c2 && !st.readSet[last] && (c2.getBoundingClientRect().top < mid || atContentEnd)){ st.readSet[last] = true; c2.classList.add('end'); }
    }
    function spy(){
      if(Date.now() < st.lock) return;
      var k = activeIdx();
      if(tabs[k].classList.contains('on')) return;
      tabs.forEach(function(t,j){ t.classList.toggle('on', j === k); });
      centre(k);
    }
    function chrome(){
      if(Date.now() < st.lock){ st.lastY = phone.scrollTop; return; }
      var y = phone.scrollTop, d = y - st.lastY;
      if(y <= HOLD){ phone.classList.remove('chrome-off'); st.lastY = y; return; }
      if(Math.abs(d) < DELTA) return;
      var was = phone.classList.contains('chrome-off'), now = d > 0;
      if(was !== now){ phone.classList.toggle('chrome-off', now); st.lock = Date.now() + 280; }
      st.lastY = y;
    }
    phone.addEventListener('scroll', function(){
      if(st.handedOff){ if(st.overlay) st.overlay.style.opacity = '0'; return; }
      if(st.queued) return;
      st.queued = true;
      requestAnimationFrame(function(){ chrome(); spy(); markRead(); doExpand(i); st.queued = false; });
      scheduleSnap(i);
    }, { passive:true });

    tabs.forEach(function(t,k){
      t.addEventListener('click', function(){
        st.lock = Date.now() + 700;
        phone.classList.remove('chrome-off');
        st.lastY = phone.scrollTop;
        tabs.forEach(function(x,j){ x.classList.toggle('on', j === k); });
        centre(k);
        var target = k === 0 ? 0 : Math.max(0, secs[k].offsetTop - NAV);
        phone.scrollTo({ top: target, behavior:'smooth' });
      });
    });

    var nfNext = stage.querySelector('.nf-next');
    if(nfNext && st.overlay) nfNext.addEventListener('click', function(){
      var maxS0 = phone.scrollHeight - phone.clientHeight;
      phone.scrollTop = maxS0 - PULL;
      requestAnimationFrame(function(){ commitNext(i); });
    });

    // ===== back gesture: overscroll DOWN at the top of a committed story -> previous story =====
    var backAccum = 0, backLast = 0;
    phone.addEventListener('wheel', function(e){
      if(st.prevIdx == null || st.backBusy) return;
      if(phone.scrollTop > 2){ backAccum = 0; return; }
      if(e.deltaY < 0){
        e.preventDefault();
        var now = Date.now(); if(now - backLast > 400) backAccum = 0; backLast = now;
        backAccum += (-e.deltaY);
        if(backAccum > 80){ backAccum = 0; goBack(i); }
      }
    }, { passive:false });
    var tStartY = null;
    phone.addEventListener('touchstart', function(e){ tStartY = e.touches[0].clientY; }, { passive:true });
    phone.addEventListener('touchmove', function(e){
      if(st.prevIdx == null || st.backBusy || tStartY == null) return;
      if(phone.scrollTop > 2) return;
      if(e.touches[0].clientY - tStartY > 64){ tStartY = null; goBack(i); }
    }, { passive:true });

    spy();
  }

  stages.forEach(function(s,i){ initStage(i); });

  // ===== feed <-> story navigation =====
  document.querySelectorAll('#stage-0 .mcard[data-story]').forEach(function(card){
    card.style.cursor = 'pointer';
    card.addEventListener('click', function(){ slideTo(parseInt(card.getAttribute('data-story'), 10), 'up'); });
  });
  document.querySelectorAll('.js-back').forEach(function(b){
    b.addEventListener('click', function(){ if(active !== 0) slideTo(0, 'down'); });
  });
  // "Scroll to feed" cue -> smooth-scroll the feed to the Essential list
  var _cue = document.querySelector('#stage-0 .scrollcue');
  var _feedScroll = document.querySelector('#stage-0 .scroll');
  var _essential = document.querySelector('#stage-0 .content');
  if(_cue && _feedScroll && _essential){
    _cue.addEventListener('click', function(){
      var r = _essential.getBoundingClientRect(), sr = _feedScroll.getBoundingClientRect();
      _feedScroll.scrollTo({ top: _feedScroll.scrollTop + (r.top - sr.top) - 12, behavior:'smooth' });
    });
    _cue.style.cursor = 'pointer';
  }

  // ===== voice bottom sheet (global; persists across stages) =====
  var sheet = document.getElementById('nf-vsheet');
  var scrim = document.getElementById('nf-scrim');
  function openSheet(){ sheet.classList.add('open'); scrim.classList.add('open'); }
  function closeSheet(){ sheet.classList.remove('open'); scrim.classList.remove('open'); }
  document.querySelectorAll('.js-voicebtn').forEach(function(btn){
    btn.addEventListener('click', function(e){ e.stopPropagation(); openSheet(); });
  });
  scrim.addEventListener('click', closeSheet);
  function applyVoiceAll(cls, vname){
    currentClass = cls; currentVoice = vname;
    document.querySelectorAll('.stage .cards').forEach(function(c){ c.className = 'cards ' + cls + ' rvl'; });
    document.querySelectorAll('.nf-story2').forEach(function(o){
      o.classList.remove('voice-plain','voice-calm','voice-eli5'); o.classList.add(cls); });
    document.querySelectorAll('.nf-phone').forEach(function(p){ p.setAttribute('data-voice', vname); });
    var SHORT = window.NF_VOICE_SHORT || {};
    var short = SHORT[vname] || ((vname === 'Calm explainer') ? 'Calm' : (vname === 'ELI5 friend') ? 'Friend' : 'Plain');
    document.querySelectorAll('.js-voicelbl').forEach(function(l){ l.textContent = short; });
    requestAnimationFrame(fitAll);
  }
  window.applyVoiceAll = applyVoiceAll;
  document.querySelectorAll('.vs-row').forEach(function(row){
    row.addEventListener('click', function(){
      var v = row.getAttribute('data-voice'); var cls = row.getAttribute('data-class');
      document.querySelectorAll('.vs-row').forEach(function(r){ r.classList.remove('on'); });
      row.classList.add('on');
      applyVoiceAll(cls, v);
      closeSheet();
    });
  });
  // expose so activate() can call it before it's defined above (hoisting-safe via window)
  function applyVoiceAllProxy(c,v){ applyVoiceAll(c,v); }
  window.__applyVoice = applyVoiceAll;

  // fit on fonts + load
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ requestAnimationFrame(fitAll); });
  requestAnimationFrame(fitAll);
  window.addEventListener('load', function(){ requestAnimationFrame(fitAll); });

  /* ---- depth on demand: double tap expands the card in place ----
     Desktop dblclick plus a manual touch double-tap (iOS Safari does not fire
     dblclick reliably). Taps on interactive things inside the card are ignored so
     inline transparency chips, source links and the confidence pill still work. */
  (function(){
    var IGNORE = 'a,button,input,select,textarea,.nf-conf,.chip,.chip-i,.kw,.maplive,.leaflet-container';
    function toggle(sec){
      var opening = !sec.classList.contains('is-open');
      sec.classList.toggle('is-open');
      var bar = sec.querySelector('.dp-bar');
      if(bar) bar.setAttribute('aria-expanded', opening ? 'true' : 'false');
      if(opening){
        setTimeout(function(){
          var r = sec.getBoundingClientRect(), sc = sec.closest('.nf-phone');
          if(sc && r.bottom > sc.clientHeight) sec.scrollIntoView({behavior:'smooth', block:'nearest'});
        }, 380);
      }
    }
    function bind(sec){
      var last = 0;
      sec.addEventListener('dblclick', function(e){
        if(e.target.closest(IGNORE)) return;
        e.preventDefault(); toggle(sec);
      });
      sec.addEventListener('touchend', function(e){
        if(e.target.closest(IGNORE)) return;
        var now = Date.now();
        if(now - last < 320){ e.preventDefault(); toggle(sec); last = 0; }
        else last = now;
      }, {passive:false});
    }
    document.querySelectorAll('section.nf-card.has-deep').forEach(function(sec){
      bind(sec);
      /* the bar is the primary control; double tap on the card body still works.
         It is a <button>, so IGNORE already keeps the double-tap handler off it
         and one tap cannot register as both. */
      var bar = sec.querySelector('.dp-bar');
      if(bar) bar.addEventListener('click', function(e){ e.stopPropagation(); toggle(sec); });
    });
  })();

  // hook activate's applyVoiceAll reference
  window.__activate = activate;
})();
