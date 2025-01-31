chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "saveNote") {
      let key = `leetcode_${request.title}`;
      chrome.storage.sync.set({ [key]: request.note }, () => {
        sendResponse({ status: "success" });
      });
      return true;
    } else if (request.action === "getNote") {
      let key = `leetcode_${request.title}`;
      chrome.storage.sync.get([key], (result) => {
        sendResponse({ note: result[key] || "" });
      });
      return true;
    }
  });
  