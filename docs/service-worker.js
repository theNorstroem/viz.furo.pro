if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return i[e]||(s=new Promise(async s=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=s}else importScripts(e),s()})),s.then(()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]})},s=(s,i)=>{Promise.all(s.map(e)).then(e=>i(1===e.length?e[0]:e))},i={require:Promise.resolve(s)};self.define=(s,r,o)=>{i[s]||(i[s]=Promise.resolve().then(()=>{let i={};const n={uri:location.origin+s.slice(1)};return Promise.all(r.map(s=>{switch(s){case"exports":return i;case"module":return n;default:return e(s)}})).then(e=>{const s=o(...e);return i.default||(i.default=s),i})}))}}define("./service-worker.js",["./workbox-61744e84"],(function(e){"use strict";e.setCacheNameDetails({prefix:"furo-viz"}),self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"favicon.ico",revision:"cb11ee701d473fae4489c107dec6d9d2"},{url:"assets/icons/android-chrome-192x192.png",revision:"690cfc08af5331746c36731caeb4c0ba"},{url:"assets/icons/android-chrome-512x512.png",revision:"325f92b04ad78b2db75a848fed78ee97"},{url:"assets/icons/apple-touch-icon.png",revision:"9ad31ba1ffe3308b3ca08602af655060"},{url:"assets/icons/browserconfig.xml",revision:"a493ba0aa0b8ec8068d786d7248bb92c"},{url:"assets/icons/favicon-16x16.png",revision:"b052bc42b1b91fa84239d6a2de899107"},{url:"assets/icons/favicon-32x32.png",revision:"5ed4301d55d32194bb86160a7f6a04a6"},{url:"assets/icons/favicon.ico",revision:"cb11ee701d473fae4489c107dec6d9d2"},{url:"assets/icons/mstile-150x150.png",revision:"7172be6db4751fd7ea606be39d19aad1"},{url:"assets/icons/safari-pinned-tab.svg",revision:"3b54210ed8b2cae0483d75c28991df60"},{url:"src/configs/flowConfig.json",revision:"5f2efd7c9104417ae023f0dc06cb6f2f"},{url:"52b351f6.js",revision:"2ec13caf508ea27a9e92e078614ce731"},{url:"manifest.json",revision:"38dd5c8863764f59075150e1311ff094"},{url:"index.html",revision:"a69f4df65ccda37c71c1139fa02b76da"}],{}),e.cleanupOutdatedCaches()}));
//# sourceMappingURL=service-worker.js.map