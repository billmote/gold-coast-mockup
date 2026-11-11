(function(){
  // Wix-pieces toggle
  var t=document.getElementById('wixToggle');
  if(t){ if(sessionStorage.getItem('gcWix')==='1'){t.checked=true;document.body.classList.add('show-wix');}
    t.addEventListener('change',function(){document.body.classList.toggle('show-wix',t.checked);sessionStorage.setItem('gcWix',t.checked?'1':'0');});}
  // fake forms
  document.querySelectorAll('[data-signup],[data-form]').forEach(function(f){
    var b=f.querySelector('button'),m=f.querySelector('.form-msg');
    if(b&&m) b.addEventListener('click',function(){m.hidden=false;});
  });
  document.querySelectorAll('[data-share]').forEach(function(b){b.addEventListener('click',function(){var m=document.getElementById('shareMsg');if(m)m.hidden=false;});});
  // countdown (sample: counts down from load time + offset)
  document.querySelectorAll('[data-countdown]').forEach(function(el){
    var m=el.getAttribute('data-countdown').match(/(\d+)d(\d+)h(\d+)m/);
    var end=Date.now()+((+m[1])*86400+(+m[2])*3600+(+m[3])*60)*1000;
    function pad(n){return (n<10?'0':'')+n;}
    function tick(){var s=Math.max(0,Math.floor((end-Date.now())/1000));
      el.textContent=pad(Math.floor(s/86400))+'d : '+pad(Math.floor(s%86400/3600))+'h : '+pad(Math.floor(s%3600/60))+'m : '+pad(s%60)+'s';}
    tick();setInterval(tick,1000);
  });
  // lot page gallery
  document.querySelectorAll('.thumb').forEach(function(th){th.addEventListener('click',function(){
    document.getElementById('mainImg').src=th.getAttribute('data-src');
    document.querySelectorAll('.thumb').forEach(function(x){x.classList.remove('active')});th.classList.add('active');});});
  var q=new URLSearchParams(location.search);
  // contact page lot prefill
  var lf=document.getElementById('lotField'); if(lf&&q.get('lot')) lf.value=q.get('lot');
  // catalog filters
  var grid=document.getElementById('catalogGrid');
  if(grid){
    var fc=document.getElementById('fCat'),fs=document.getElementById('fStatus'),fp=document.getElementById('fPlat'),fq=document.getElementById('fSearch');
    var tiles=[].slice.call(grid.querySelectorAll('.lot')),shown=8,lm=document.getElementById('loadMore');
    if(q.get('cat'))fc.value=q.get('cat'); if(q.get('status'))fs.value=q.get('status'); if(q.get('plat'))fp.value=q.get('plat');
    function apply(){var n=0,vis=0,txt=fq.value.trim().toLowerCase();
      tiles.forEach(function(el){var ok=(!fc.value||el.dataset.cat===fc.value)&&(!fs.value||el.dataset.status===fs.value)&&(!fp.value||el.dataset.plat===fp.value)&&(!txt||el.dataset.text.indexOf(txt)>-1);
        if(ok){n++; el.hidden=n>shown; if(n<=shown)vis++;} else el.hidden=true;});
      document.getElementById('resultCount').textContent='Showing '+vis+' of '+n+' example lots';
      document.getElementById('noResults').hidden=n>0; lm.hidden=n<=shown;}
    [fc,fs,fp].forEach(function(s){s.addEventListener('change',function(){shown=8;apply();});});
    fq.addEventListener('input',function(){shown=8;apply();});
    document.getElementById('fReset').addEventListener('click',function(){fc.value=fs.value=fp.value=fq.value='';shown=8;apply();});
    lm.addEventListener('click',function(){shown+=8;apply();});
    apply();
  }
  // placeholder marketplace pages
  var ph=document.getElementById('phLot');
  if(ph&&window.GC_LOTS){var id=q.get('lot'),l=id&&GC_LOTS[id];
    if(l){ph.hidden=false;document.getElementById('phTitle').textContent=l.title+' (example)';
      document.getElementById('phCat').textContent=l.cat+' · Gold Coast lot #'+id;
      document.getElementById('phEnds').textContent=l.ends;
      document.getElementById('phTime').textContent=l.status==='Upcoming'?'Not open yet':(l.status==='Ending soon'?'Under 1 day':'Several days');
      document.getElementById('phImg').src='../img/lot-'+id+'-front.svg';
      var bl=document.getElementById('backLot');bl.href='../lots/lot-'+id+'.html';bl.hidden=false;}}
})();
