// popup.js
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("wordInput");
  const button = document.getElementById("addWord");
  const list = document.getElementById("wordList");

  function updateList(words) {
    list.innerHTML = "";
    words.forEach(word => {
      const li = document.createElement("li");
      li.textContent = word;
      list.appendChild(li);
    });
  }

  chrome.storage.local.get(["filteredWords"], (result) => {
    updateList(result.filteredWords || []);
  });

  button.addEventListener("click", () => {
    let word = input.value.trim();
    if (!word) return;
    word = word.replace(/[^a-zA-Z0-9\s]/g, "");

    chrome.storage.local.get(["filteredWords"], (result) => {
      const words = result.filteredWords || [];
      if (!words.includes(word)) {
        words.push(word);
        chrome.storage.local.set({ filteredWords: words }, () => {
          updateList(words);
          input.value = "";
        });
      }
    });
  });
});