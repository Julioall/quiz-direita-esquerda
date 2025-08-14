const BASE = '/quiz-direita-esquerda/';
const CACHE = 'quiz-cache-v1';
const ASSETS = [BASE, BASE + 'index.html', BASE + 'questions.json'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.pathname.startsWith(BASE + 'assets/') || ASSETS.includes(url.pathname)) {
    e.respondWith(
      caches.match(e.request).then(resp => resp || fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }))
    );
  }
});
