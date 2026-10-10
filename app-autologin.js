/* Laxman Telecom - App-only auto login (v2)
   Sirf installed app me chalega. Website (browser) par kuch nahi karta.
   App me user ek baar login kar le, to dobara login page nahi dikhega,
   jab tak wo khud Logout na kare.

   Kaun kahan jayega:
     - Admin email            -> admin.html
     - Vendor (vendorAccounts) -> vendor.html
     - Customer (users profile)-> dashboard.html
     - Inme se koi nahi        -> kahin nahi bhejte, normal page dikhate hain

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
  var failsafe = setTimeout(reveal, 5000);

  function go(target) {
    // Agar splash animation chal rahi hai to use poora hone do, phir redirect
    if (document.getElementById('lt-splash')) {
      reveal();
      var waited = 0;
      var timer = setInterval(function () {
        waited += 100;
        if (!document.getElementById('lt-splash') || waited >= 6000) {
          clearInterval(timer);
          window.location.replace(target);
        }
      }, 100);
    } else {
      window.location.replace(target);
    }
  }

  // Ye user kaun hai? -> jaane ki page 'admin.html' / 'vendor.html' / 'dashboard.html' / null
  function findHome(user) {
    if (typeof ADMIN_EMAIL !== 'undefined' && user.email === ADMIN_EMAIL) {
      return Promise.resolve('admin.html');
    }
    return db.ref('vendorAccounts/' + user.uid).once('value').then(function (vs) {
      if (vs.exists()) return 'vendor.html';
      return db.ref('users/' + user.uid).once('value').then(function (us) {
        return us.exists() ? 'dashboard.html' : null;
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof auth === 'undefined' || typeof db === 'undefined') { reveal(); return; }

    var unsub = auth.onAuthStateChanged(function (user) {
      unsub();

      // Logged out hai -> normal page dikhao
      if (!user) { clearTimeout(failsafe); reveal(); return; }

      findHome(user).then(function (target) {
        clearTimeout(failsafe);
        if (target) { go(target); } else { reveal(); }
      }).catch(function () {
        clearTimeout(failsafe);
        reveal();
      });
    });
  });
})();
