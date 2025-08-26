// Apply saved theme immediately
document.body.className = localStorage.getItem("apexTheme") || "space";
// Makes it so you can press enter to submit as opposed to just being able to press a button
document
    .getElementById("urlInput")
    .addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("searchButton").click();
        }
    });

document.getElementById("searchButton").onclick = function (event) {
    event.preventDefault();

    let url = document.getElementById("urlInput").value;

    // Read default search engine from localStorage
    let defaultSearchEngine = localStorage.getItem("apexSearchEngine") || "google";
    let searchUrls = {
        google: "https://www.google.com/search?q=",
        bing: "https://www.bing.com/search?q=",
        duckduckgo: "https://duckduckgo.com/?q="
    };
    let searchUrl = searchUrls[defaultSearchEngine];

    // If no periods are detected in the input, search the selected engine instead
    if (!url.includes(".")) {
        url = searchUrl + encodeURIComponent(url);
    } else {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "https://" + url;
        }
    }

    iframeWindow.src = __uv$config.prefix + __uv$config.encodeUrl(url);
};
