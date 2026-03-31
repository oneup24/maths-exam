const CACHE='maths-quests-v1';
const ASSETS=['/','index.html','/mascot.png','/mascot-happy.png','/mascot-ok.png','/mascot-sad.png','/icon.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(
    caches.match(e.request).then(cached=>{
      var net=fetch(e.request).then(res=>{
        if(res&&res.status===200){var clone=res.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));}
        return res;
      }).catch(()=>cached);
      return cached||net;
    })
  );
});
