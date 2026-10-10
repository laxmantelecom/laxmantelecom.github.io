/* Laxman Telecom - App-only auto login
   Sirf installed app me chalega. Website (browser) par kuch nahi karta.
   App me user ek baar login kar le, to dobara login page nahi dikhega,
   jab tak wo khud Logout na kare.
   Testing: browser me URL ke aage ?app=1 laga dein (us tab me app jaisa chalega). */
(function () {
  var params = new URLSearchParams(location.search);
  if (params.get('app') === '1') {
    try { sessionStorage.setItem('lt_force_app', '1'); } catch (e) {}
  }
  var forced = false;
  try { forced = sessionStorage.getItem('lt_force_app') === '1'; } catch (e) {}

  var isApp =
    forced ||
    (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
    (window.matchMedia && window.matchMedia('(display-mode: fullscreen)').matches) ||
    window.navigator.standalone === true ||
    (document.referrer || '').indexOf('android-app://') === 0;

  if (!isApp) return;

  // Check poora hone tak page chhupa do (login page ki jhalak na dikhe)
  document.documentElement.style.visibility = 'hidden';
  function reveal() { document.documentElement.style.visibility = ''; }
  var failsafe = setTimeout(reveal, 4000);

  function go(target) {
    window.location.replace(target);
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof auth === 'undefined') { reveal(); return; }

    var unsub = auth.onAuthStateChanged(function (user) {
      unsub();
      clearTimeout(failsafe);

      // Logged out hai -> normal page dikhao
      if (!user) {
        try { localStorage.removeItem('lt_home'); } catch (e) {}
        reveal();
        return;
      }

      var target = 'dashboard.html';
      if (typeof ADMIN_EMAIL !== 'undefined' && user.email === ADMIN_EMAIL) {
        target = 'admin.html';
      } else {
        try {
          var saved = localStorage.getItem('lt_home');
          if (saved === 'vendor.html' || saved === 'dashboard.html') target = saved;
        } catch (e) {}
      }

      // Agar splash animation chal rahi hai to use poora hone do, phir redirect
      if (document.getElementById('lt-splash')) {
        reveal();
        var waited = 0;
        var timer = setInterval(function () {
          waited += 100;
          if (!document.getElementById('lt-splash') || waited >= 6000) {
            clearInterval(timer);
            go(target);
          }
        }, 100);
      } else {
        go(target);
      }
    });
  });
})();
