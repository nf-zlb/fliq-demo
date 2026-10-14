/* Kit runtime: Leaflet maps, chart tooltips, gauges, poll flips, popovers.
   Runs inside the app document, after engine.js. Config injected as NF_KIT. */
(function(){
  var K = window.NF_KIT || { maps:{}, pop:{} };
  var ZH = /^zh/i.test(document.documentElement.lang || '');

  /* ---- Leaflet maps: lazy-init when a map's stage becomes active ---- */
  function initMap(box){
    if(box.getAttribute('data-init')) return;
    var cfg = K.maps[box.getAttribute('data-map')];
    if(!cfg || typeof L === 'undefined'){ box.classList.add('fallback'); return; }
    box.setAttribute('data-init','1');
    var map = L.map(box.querySelector('.maplive'), { scrollWheelZoom:false, attributionControl:false,
      zoomControl:true, center:cfg.center, zoom:cfg.zoom, maxZoom:11, minZoom:3, dragging:!L.Browser.mobile });
    var loaded = false;
    var tl = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { subdomains:'abcd', maxZoom:12 });
    tl.on('load', function(){ loaded = true; box.classList.add('ready'); });
    tl.on('tileerror', function(){ if(!loaded) box.classList.add('fallback'); });
    setTimeout(function(){ if(!loaded) box.classList.add('fallback'); }, 6000);
    tl.addTo(map);
    var pts = [];
    (cfg.zones || []).forEach(function(z){
      pts.push(z[0]);
      L.circle(z[0], { radius:z[1]*1000, color:'#800080', weight:1.5, opacity:.6, fillColor:'#800080', fillOpacity:.16 })
        .addTo(map).bindPopup('<b>'+z[2]+'</b><br>'+z[3]);
      L.marker(z[0], { icon:L.divIcon({ className:'kit-pulse', iconSize:[13,13] }) }).addTo(map).bindPopup('<b>'+z[2]+'</b><br>'+z[3]);
    });
    (cfg.points || []).forEach(function(p){
      pts.push(p[0]);
      L.marker(p[0], { icon:L.divIcon({ className:'kit-diamond', html:'<span></span>', iconSize:[16,16] }) })
        .addTo(map).bindPopup('<b>'+p[1]+'</b><br>'+p[2]);
    });
    box.__map = map; /* exposed for scripted walkthroughs (tour / demo film) */
    setTimeout(function(){ map.invalidateSize();
      if(pts.length) map.fitBounds(L.latLngBounds(pts), { padding:[32,32], animate:false }); }, 120);
  }
  function initStageMaps(stage){
    stage.querySelectorAll('.mapbox[data-map]').forEach(initMap);
  }
  /* watch stage activation */
  var mo = new MutationObserver(function(muts){
    muts.forEach(function(m){
      if(m.target.classList.contains('active')) initStageMaps(m.target);
    });
  });
  document.querySelectorAll('.stage').forEach(function(s){
    mo.observe(s, { attributes:true, attributeFilter:['class'] });
    if(s.classList.contains('active')) initStageMaps(s);
  });
  /* belt & braces: init on first scroll of a stage too */
  document.querySelectorAll('.nf-phone').forEach(function(p){
    p.addEventListener('scroll', function once(){ p.removeEventListener('scroll', once);
      initStageMaps(p.closest('.stage')); }, { passive:true });
  });

  /* ---- signal gauges: dashoffset from data-pct; tap toggles note ---- */
  document.querySelectorAll('.c-signal .sig').forEach(function(s){
    var pct = +s.getAttribute('data-pct') || 0, C = 113;
    s.style.setProperty('--o', String(C - C * pct / 100));
    s.addEventListener('click', function(){ s.classList.toggle('open'); });
  });

  /* ---- chart: tap column for value tooltip ---- */
  document.addEventListener('click', function(e){
    var col = e.target.closest ? e.target.closest('.c-numbers .chart .col') : null;
    document.querySelectorAll('.kit-tip').forEach(function(t){ t.remove(); });
    if(!col) return;
    var tip = document.createElement('span');
    tip.className = 'kit-tip';
    tip.textContent = col.getAttribute('data-val') || col.querySelector('.bval').textContent;
    col.appendChild(tip);
    setTimeout(function(){ tip.remove(); }, 2600);
  }, true);

  /* ---- poll: tap flips % <-> counts ---- */
  document.querySelectorAll('.c-poll .prow').forEach(function(r){
    r.addEventListener('click', function(){
      var v = r.querySelector('.pv'); if(!v || !r.getAttribute('data-count')) return;
      var showing = v.textContent.indexOf('%') >= 0;
      if(!v.getAttribute('data-pct')) v.setAttribute('data-pct', v.textContent);
      v.textContent = showing ? r.getAttribute('data-count') : v.getAttribute('data-pct');
      v.style.fontSize = showing ? '13px' : '';
    });
  });

  /* ---- inline transparency popovers on .kw / .chip spans ----
     Typed, matching the original single-file demo: the span's colour decides the
     type; entries are {def} for key terms or {rows:[[label,text]...], src:[...]}
     for evidence notes. Untyped strings render as a plain definition. */
  var pop = null;
  function norm(s){ return (s||'').replace(/’/g,"'").replace(/\s+/g,' ').trim().toLowerCase().replace(/[.,;:。，；：]+$/,''); }
  function esc(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function closePop(){ if(pop){ pop.classList.remove('on'); } }
  /* two-part chips render as body+end sibling spans; keys are the full phrase,
     so a tap on either half must resolve against the joined text */
  function chipText(el){
    var t = el.textContent;
    if(!el.classList.contains('chip')) return t;
    if(el.classList.contains('chip-end')){
      var pv = el.previousElementSibling;
      if(pv && pv.classList.contains('chip') && !pv.classList.contains('chip-end')) t = pv.textContent + t;
    } else {
      var nx = el.nextElementSibling;
      if(nx && nx.classList.contains('chip') && nx.classList.contains('chip-end')) t = t + nx.textContent;
    }
    return t;
  }
  var LBL = ZH
    ? { keyword:'關鍵詞', confirmed:'已證實', disputed:'有爭議', analysis:'分析' }
    : { keyword:'Key term', confirmed:'Confirmed', disputed:'Disputed', analysis:'Analysis' };
  /* honest fallback rows for spans without an authored note */
  var FB = ZH ? {
    keyword: '跟進這篇報道值得認識的詞語。',
    confirmed: '此處標示為已證實：有多個獨立來源支持。完整出處見本篇的可信度訊號。',
    disputed: '此處標示為有爭議：數字或說法仍在爭論——可信度訊號列出各方說法。',
    analysis: '此處標示為分析：推算或解讀，並非已定案的事實。'
  } : {
    keyword: 'A term worth knowing to follow this story.',
    confirmed: 'Marked confirmed in this story — supported by multiple independent sources. The Confidence Signal has the sourcing.',
    disputed: 'Marked disputed in this story — the figure or claim is contested. The Confidence Signal lays out both sides.',
    analysis: 'Marked analysis in this story — a projection or interpretation, not a settled fact.'
  };
  function typeOf(el){
    if(el.classList.contains('kw')) return 'keyword';
    if(el.classList.contains('chip-g')) return 'confirmed';
    if(el.classList.contains('chip-o')) return 'disputed';
    return 'analysis'; /* chip-b and chip-i */
  }
  function srcHtml(src){
    if(!src || !src.length) return '';
    var chips = src.map(function(n){ return '<span class="pchip"><span class="cd"></span>' + esc(n) + '</span>'; });
    var joined = chips.length > 1
      ? chips.slice(0, -1).join(ZH ? '、' : ', ') + (ZH ? ' 及 ' : ' and ') + chips[chips.length - 1]
      : chips[0];
    return '<p class="src">' + (ZH ? '來源：' : 'Sources: ') + joined + '</p>';
  }
  function bodyHtml(type, entry){
    if(typeof entry === 'string') entry = { def: entry };
    if(entry.rows){
      return entry.rows.map(function(r){
        return '<p class="row">' + (r[0] ? '<b>' + esc(r[0]) + ':</b> ' : '') + esc(r[1]) + '</p>';
      }).join('') + srcHtml(entry.src);
    }
    var def = '<p class="def">' + esc(entry.def || FB[type]) + '</p>';
    if(type === 'keyword') def += '<button class="save" type="button">' + (ZH ? '存入詞彙日記' : 'Save to keyword diary') + '</button>';
    return def;
  }
  document.addEventListener('click', function(e){
    var el = e.target.closest ? e.target.closest('.kw,.chip,.chip-i') : null;
    if(!el){ closePop(); return; }
    var type = typeOf(el);
    var entry = K.pop[norm(chipText(el))] || (type === 'keyword' ? { def: FB.keyword } : { rows: [['', FB[type]]] });
    e.stopPropagation();
    var host = el.closest('.nf-phone') || document.body;
    if(!pop || pop.parentNode !== host){
      if(pop) pop.remove();
      pop = document.createElement('div'); pop.className = 'kit-pop';
      pop.addEventListener('click', function(ev){ ev.stopPropagation(); });
      host.appendChild(pop);
    }
    pop.className = 'kit-pop t-' + type;
    pop.innerHTML = '<div class="hd2"><span class="lbl"><span class="dot"></span>' + LBL[type] +
      '</span><button class="x" type="button">×</button></div>' + bodyHtml(type, entry);
    pop.querySelector('.x').addEventListener('click', function(ev){ ev.stopPropagation(); closePop(); });
    var save = pop.querySelector('.save');
    if(save) save.addEventListener('click', function(ev){
      ev.stopPropagation(); save.textContent = ZH ? '已儲存 ✓' : 'Saved ✓'; save.disabled = true;
    });
    pop.classList.add('on');
    var hr = host.getBoundingClientRect(), r = el.getBoundingClientRect();
    var top = r.top - hr.top + host.scrollTop - pop.offsetHeight - 10;
    if(top < host.scrollTop + 8) top = r.bottom - hr.top + host.scrollTop + 10;
    var left = Math.min(Math.max(8, r.left - hr.left + r.width/2 - pop.offsetWidth/2), 375 - pop.offsetWidth - 8);
    pop.style.top = top + 'px'; pop.style.left = left + 'px';
  }, false);
  document.querySelectorAll('.nf-phone,.scroll').forEach(function(p){
    p.addEventListener('scroll', closePop, { passive:true });
  });
  document.querySelectorAll('.vs-row').forEach(function(r){ r.addEventListener('click', closePop); });
})();
