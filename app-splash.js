/* Laxman Telecom - App-only splash animation
   Sirf installed app (home screen se khulne par) dikhega, browser/website me nahi.
   Use: index.html ke <head> me sabse upar:  <script src="app-splash.js"></script>
   Testing ke liye URL ke aage ?splash=1 laga dein (browser me bhi dikhega). */
(function () {
  var params = new URLSearchParams(location.search);
  var force = params.get('splash') === '1';

  var isApp =
    (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
    (window.matchMedia && window.matchMedia('(display-mode: fullscreen)').matches) ||
    window.navigator.standalone === true ||
    (document.referrer || '').indexOf('android-app://') === 0;

  if (!isApp && !force) return;

  // Ek session me sirf ek baar dikhao (page change par baar-baar na aaye)
  try {
    if (!force && sessionStorage.getItem('lt_splash_done')) return;
    sessionStorage.setItem('lt_splash_done', '1');
  } catch (e) {}

  var css = '\
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap");\
#lt-splash{position:fixed;inset:0;z-index:2147483647;display:flex;flex-direction:column;align-items:center;justify-content:center;\
background:linear-gradient(135deg,#143c7e,#08193f);transition:opacity .6s ease;font-family:"Poppins",system-ui,sans-serif}\
#lt-splash.lt-out{opacity:0;pointer-events:none}\
#lt-splash svg{width:min(60vw,320px);height:auto;overflow:visible}\
#lt-splash .b{transform-box:fill-box;transform-origin:50% 100%;transform:scaleY(0);animation:ltGrow .6s cubic-bezier(.34,1.56,.64,1) forwards}\
#lt-splash .b1{animation-delay:.3s}#lt-splash .b2{animation-delay:.52s}#lt-splash .b3{animation-delay:.74s}#lt-splash .b4{animation-delay:.96s}\
#lt-splash .d{opacity:0;animation:ltDrop .7s cubic-bezier(.34,1.56,.64,1) 1.25s forwards}\
#lt-splash .ring{fill:none;stroke:#3bbdfa;stroke-width:3;opacity:0;transform-box:fill-box;transform-origin:center;animation:ltRing .9s ease-out 1.7s forwards}\
#lt-splash .t1{margin-top:44px;color:#fff;font-weight:700;font-size:clamp(26px,7.5vw,40px);letter-spacing:.5px;opacity:0;animation:ltUp .5s ease 1.9s forwards}\
#lt-splash .t2{margin-top:10px;color:#fff;font-weight:700;font-size:clamp(17px,5vw,26px);text-align:center;line-height:1.35;opacity:0;animation:ltUp .5s ease 2.1s forwards}\
@keyframes ltGrow{to{transform:scaleY(1)}}\
@keyframes ltDrop{from{opacity:0;transform:translateY(-60px)}to{opacity:1;transform:translateY(0)}}\
@keyframes ltRing{0%{opacity:.6;transform:scale(1)}100%{opacity:0;transform:scale(7)}}\
@keyframes ltUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}';

  var html =
    '<svg viewBox="380 340 270 320" xmlns="http://www.w3.org/2000/svg">' +
    '<rect class="b b1" x="391" y="565" width="45" height="80" rx="22.5" fill="#fff"/>' +
    '<rect class="b b2" x="457" y="516" width="45" height="129" rx="22.5" fill="#fff"/>' +
    '<rect class="b b3" x="523" y="467" width="45" height="178" rx="22.5" fill="#fff"/>' +
    '<rect class="b b4" x="589" y="420" width="45" height="225" rx="22.5" fill="#3bbdfa"/>' +
    '<circle class="ring" cx="611.5" cy="376" r="18"/>' +
    '<circle class="d" cx="611.5" cy="376" r="18" fill="#3bbdfa"/>' +
    '</svg>' +
    '<div class="t1">LAXMAN TELECOM</div>' +
    '<div class="t2">Your Trusted Digital<br>Service Center</div>';

  function start() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var el = document.createElement('div');
    el.id = 'lt-splash';
    el.innerHTML = html;
    document.body.appendChild(el);

    setTimeout(function () { el.classList.add('lt-out'); }, 4200);
    setTimeout(function () { el.remove(); style.remove(); }, 4900);
  }

  if (document.body) start();
  else document.addEventListener('DOMContentLoaded', start);
})();
