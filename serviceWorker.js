/* serviceWorker.js */
// (参考) https://qiita.com/kaihar4/items/c09a6d73e190ab0b9b01
'use strict';

const CACHE_NAME = "LongGammon-v1"; //v1=first release, v2=no use jquery.ui
const ORIGIN = (location.hostname == 'localhost') ? '' : location.protocol + '//' + location.hostname;

const STATIC_FILES = [
  ORIGIN + '/LongGammon/',
  ORIGIN + '/LongGammon/index.html',
  ORIGIN + '/LongGammon/manifest.json',
  ORIGIN + '/LongGammon/icon/favicon.ico',
  ORIGIN + '/LongGammon/icon/apple-touch-icon.png',
  ORIGIN + '/LongGammon/icon/android-chrome-96x96.png',
  ORIGIN + '/LongGammon/icon/android-chrome-192x192.png',
  ORIGIN + '/LongGammon/icon/android-chrome-512x512.png',
  ORIGIN + '/LongGammon/css/bgboardapp.css',
  ORIGIN + '/LongGammon/css/bgBoard.css',
  ORIGIN + '/css/font-awesome-animation.min.css',
  ORIGIN + '/js/fontawesome-all.min.js',
  ORIGIN + '/js/jquery-3.4.1.min.js',
  ORIGIN + '/js/inobounce.min.js',
  ORIGIN + '/LongGammon/js/BgBoard_class.js',
  ORIGIN + '/LongGammon/js/BgChequer_class.js',
  ORIGIN + '/LongGammon/js/BgXgid_class.js',
  ORIGIN + '/LongGammon/js/BgUtil_class.js',
  ORIGIN + '/LongGammon/js/BgGame_class.js'
];

const CACHE_KEYS = [
  CACHE_NAME
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        STATIC_FILES.map(url => {
          return fetch(new Request(url, { cache: 'no-cache', mode: 'no-cors' })).then(response => {
            return cache.put(url, response);
          });
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => {
          return !CACHE_KEYS.includes(key);
        }).map(key => {
          return caches.delete(key);
        })
      );
    })
  );
});

