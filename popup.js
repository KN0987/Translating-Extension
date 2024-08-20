window.addEventListener("DOMContentLoaded", async () => {
        
    const fromLangSelect = document.getElementById('from');
    const toLangSelect = document.getElementById('to');
    
    const { from, to } = await chrome.storage.local.get(["from", "to"]);
    fromLangSelect.value = from || "EN";
    toLangSelect.value = to || "ES";
    
    document.getElementById('from').addEventListener('change', (event) => {
        chrome.storage.local.set({ from: event.target.value });
    });

    document.getElementById('to').addEventListener('change', (event) => {
        chrome.storage.local.set({ to: event.target.value });
    });

    document.querySelector("button").addEventListener("click", () => {
        const temp = fromLangSelect.value;
        fromLangSelect.value = toLangSelect.value;
        toLangSelect.value = temp;
        chrome.storage.local.set({
            from: fromLangSelect.value,
            to: toLangSelect.value
        })
    });

});