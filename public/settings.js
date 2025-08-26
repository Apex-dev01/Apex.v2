document.addEventListener("DOMContentLoaded", () => {
    // Settings elements
    const themeSelect = document.getElementById("themeSelect");
    const tabTitleInput = document.getElementById("tabTitle");
    const searchEngineSelect = document.getElementById("searchEngineSelect");

    // Load saved theme
    const savedTheme = localStorage.getItem("apexTheme") || "space";
    themeSelect.value = savedTheme;
    document.body.className = savedTheme;

    // Load saved search engine
    const savedEngine = localStorage.getItem("apexSearchEngine") || "google";
    searchEngineSelect.value = savedEngine;

    // Load saved tab title
    const savedTabTitle = localStorage.getItem("apexTabTitle");
    if (savedTabTitle) {
        tabTitleInput.value = savedTabTitle;
        document.title = savedTabTitle;
    }

    // Theme change
    themeSelect.addEventListener("change", (e) => {
        const theme = e.target.value;
        document.body.className = theme;
        localStorage.setItem("apexTheme", theme);
    });

    // Tab title change
    document.getElementById("applyTabTitle").addEventListener("click", () => {
        const title = tabTitleInput.value.trim();
        if (title) {
            document.title = title;
            localStorage.setItem("apexTabTitle", title);
            alert("Tab title updated!");
        }
    });

    // Search engine change
    searchEngineSelect.addEventListener("change", (e) => {
        const engine = e.target.value;
        localStorage.setItem("apexSearchEngine", engine);
        alert(`Default search engine set to ${engine}`);
    });
});
