/* nf-fit: scale the 375x812 frame to the viewport when the page is opened on
   its own (an iPad opening ces/en/app.html directly, a phone, an odd window).
   Nothing inside is ever re-laid out — the frame keeps its native 375x812 and
   is CSS-scaled as one piece, then centred, so every layout stays exactly as
   designed. Inside the shell iframe the viewport IS 375 x (device height), so
   this collapses to scale 1 and is inert. Exposes window.NF_S for the few
   places (engine / kit popover / tour) that mix getBoundingClientRect() with
   layout px. Runs before <body> so the first paint is already fitted. */
(function(){
  var W = 375, H = 812, MAX = 1.75, root = document.documentElement, last = '';
  function fit(){
    var vw = window.innerWidth, vh = window.innerHeight;
    if(!vw || !vh) return;
    var s = Math.min(vw / W, vh / H, MAX);
    if(Math.abs(s - 1) < 0.005) s = 1;
    var x = Math.max(0, Math.round((vw - W * s) / 2)), y = Math.max(0, Math.round((vh - H * s) / 2));
    var key = s + '/' + x + '/' + y;
    if(key === last) return;
    last = key;
    window.NF_S = s;
    root.style.setProperty('--nf-s', s);
    root.style.setProperty('--nf-x', x + 'px');
    root.style.setProperty('--nf-y', y + 'px');
    /* a frame floating clear of every edge gets the device corners back */
    root.classList.toggle('nf-boxed', x >= 12 && y >= 12);
    root.classList.toggle('nf-fitted', s !== 1);
    window.dispatchEvent(new Event('nf-fit'));
  }
  fit();
  window.addEventListener('resize', fit);
  window.addEventListener('load', fit);
  /* iPadOS rotates in two steps (size, then toolbar) — sample a few times */
  window.addEventListener('orientationchange', function(){ setTimeout(fit, 150); setTimeout(fit, 500); });
  if(window.visualViewport) window.visualViewport.addEventListener('resize', fit);
  if(window.ResizeObserver) new ResizeObserver(fit).observe(root);
  [60, 250, 600, 1200].forEach(function(t){ setTimeout(fit, t); });
})();
