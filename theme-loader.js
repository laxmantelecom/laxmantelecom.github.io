// Laxman Telecom - Global Theme & Cache Buster Loader
(function() {
    // भविष्य में जब भी style.css बदलो, बस नीचे 1.1 की जगह 1.2 या 1.3 कर देना
    var cssVersion = "1.1"; 
    
    // मुख्य CSS फाइल को लोड करना
    var mainLink = document.createElement('link');
    mainLink.rel = 'stylesheet';
    mainLink.href = 'style.css?v=' + cssVersion;
    document.head.appendChild(mainLink);
})();
