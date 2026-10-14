
/* ---- confidence + social sheets (Story 1 only) ---- */
(function(){
  function srcFor(key){
    var el = document.getElementById('src-'+key); if(!el) return '';
    var b64 = el.textContent.trim();
    var bin = atob(b64), bytes = new Uint8Array(bin.length);
    for(var i=0;i<bin.length;i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder('utf-8').decode(bytes);
  }
  function openOverlay(name){
    var fr = document.getElementById(name);
    if(fr.dataset.loaded !== '1'){ fr.srcdoc = srcFor(name+'-s01'); fr.dataset.loaded = '1'; }
    requestAnimationFrame(function(){ document.getElementById('layer-'+name).classList.add('on'); });
  }
  function closeOverlay(name){ document.getElementById('layer-'+name).classList.remove('on'); }
  var conf = document.querySelector('#stage-1 .nf-conf[data-conf]');
  if(conf){ conf.style.cursor='pointer'; conf.addEventListener('click', function(){ openOverlay('confidence'); }); }
  var social = document.querySelector('#stage-1 .nf-actionbar .nf-pill[data-social]');
  if(social){ social.addEventListener('click', function(){ openOverlay('pulse'); }); }
  window.addEventListener('message', function(e){
    var m = e.data || {};
    if(m.nf === 'close' && (m.sheet === 'confidence' || m.sheet === 'pulse')) closeOverlay(m.sheet);
  });
})();
