// content.js
function hideRedditArticles() {
  chrome.storage.local.get(["filteredWords"], (result) => {
    const words = result.filteredWords || [];
    
    document.querySelectorAll("article.w-full.m-0").forEach(article => {
      if (words.some(word => article.innerText.toLowerCase().includes(word.toLowerCase()))) {
        article.style.display = "none";
      }
    });
  });
}

// Run on initial page load
hideRedditArticles();

// Observe for new articles being added dynamically
const observer = new MutationObserver(() => {
  clearTimeout(window.filterTimeout);
  window.filterTimeout = setTimeout(hideRedditArticles, 500);
});
observer.observe(document.body, { childList: true, subtree: true });

// background.js
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ filteredWords: [] });
});