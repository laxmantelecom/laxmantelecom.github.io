// LAXMAN TELECOM Website Script

document.addEventListener("DOMContentLoaded", function () {

    console.log("LAXMAN TELECOM Website Loaded Successfully");

    var page = location.pathname.split('/').pop() || 'index.html';

    // App ke liye: yaad rakho user last baar kis dashboard par tha (vendor ya customer)
    try {
        if (page === 'dashboard.html' || page === 'vendor.html') {
            localStorage.setItem('lt_home', page);
        }
    } catch (e) {}

    // 🚪 Menu me Logout link: SIRF tab dikhao jab user sach me login ho.
    // Home page (index.html) par Logout kabhi nahi dikhega.
    var sidebarNav = document.querySelector('nav');
    if (!sidebarNav) return;
    if (page === 'index.html' || page === '') return;
    if (sidebarNav.querySelector('.menu-logout-link')) return; // pehle se hai (admin/vendor)

    function addLogoutLink() {
        if (sidebarNav.querySelector('.menu-logout-link')) return;

        var logoutLink = document.createElement('a');
        logoutLink.href = "#";
        logoutLink.className = "menu-logout-link";
        logoutLink.innerHTML = "🚪 Logout";

        logoutLink.onclick = function (e) {
            e.preventDefault();
            try { localStorage.removeItem('lt_home'); } catch (err) {}
            if (typeof doLogout === "function") {
                doLogout();
            } else if (typeof auth !== "undefined") {
                auth.signOut().then(function () { window.location.href = 'login.html'; });
            } else {
                window.location.href = 'login.html';
            }
        };

        sidebarNav.appendChild(logoutLink);
    }

    // Firebase load hone ka thoda intezaar karo, phir dekho user login hai ya nahi
    var tries = 0;
    var waitForAuth = setInterval(function () {
        tries++;
        if (typeof auth !== "undefined") {
            clearInterval(waitForAuth);
            var unsub = auth.onAuthStateChanged(function (user) {
                unsub();
                if (user) addLogoutLink();
            });
        } else if (tries > 40) { // ~4 second baad chhod do
            clearInterval(waitForAuth);
        }
    }, 100);

});
