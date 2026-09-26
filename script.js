// LAXMAN TELECOM Website Script

document.addEventListener("DOMContentLoaded", function () {

    console.log("LAXMAN TELECOM Website Loaded Successfully");

    // 🚪 सभी पेजों के साइड हैमबर्गर मेनू में ऑटोमैटिक Logout बटन जोड़ने के लिए
    const sidebarNav = document.querySelector('nav');
    
    if (sidebarNav) {
        // एक नया लॉगआउट लिंक बनाएं
        const logoutLink = document.createElement('a');
        logoutLink.href = "#";
        logoutLink.className = "menu-logout-link";
        logoutLink.innerHTML = "🚪 Logout";
        
        // जब यूज़र इस पर क्लिक करे तो आपका मूल लॉगआउट फ़ंक्शन रन हो
        logoutLink.onclick = function(e) {
            e.preventDefault();
            if (typeof doLogout === "function") {
                doLogout();
            } else if (typeof auth !== "undefined") {
                auth.signOut().then(() => { window.location.href = 'login.html'; });
            } else {
                window.location.href = 'login.html';
            }
        };
        
        // इसे साइड मेनू स्लाइडर के अंदर सबसे नीचे जोड़ दें
        sidebarNav.appendChild(logoutLink);
    }

});
