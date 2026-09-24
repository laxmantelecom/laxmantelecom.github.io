// Laxman Telecom - Global Theme & Cache Buster Loader
(function() {
    // 🚨 भविष्य में जब भी style.css बदलो, बस नीचे 1.1 की जगह 1.2 या 1.3 कर देना
    var cssVersion = "1.1"; 
    
    // मुख्य CSS फाइल को लोड करना (सभी पेजेस के लिए)
    var mainLink = document.createElement('link');
    mainLink.rel = 'stylesheet';
    mainLink.href = 'style.css?v=' + cssVersion;
    document.head.appendChild(mainLink);

    // यह कोड जांचेगा कि आप किस पेज पर हैं और उसके हिसाब से अतिरिक्त स्टाइल देगा
    var currentPage = window.location.pathname.split("/").pop();

    if (currentPage === "admin-profile.html") {
        // उदाहरण: अगर सिर्फ एडमिन पेज पर अलग स्टाइल चाहिए, तो यहाँ अलग क्लास दे सकते हैं
        document.documentElement.classList.add('admin-page');
    } else if (currentPage === "customer-profile.html") {
        document.documentElement.classList.add('customer-page');
    }
})();
