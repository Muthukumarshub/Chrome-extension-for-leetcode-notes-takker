document.addEventListener("DOMContentLoaded", function () {
    let titleElement = document.getElementById("problemTitle");
    let noteField = document.getElementById("note");
    let saveButton = document.getElementById("save");
    let searchInput = document.getElementById("search");
    let notesList = document.getElementById("notesList");

    // Get problem title from LeetCode page
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => {
                let fullTitle = document.querySelector("div.text-label-1")?.innerText.trim();
                // Extracts the title by removing the number if present (e.g., "1. Title")
                return fullTitle ? fullTitle.split(". ")[1] || fullTitle : fullTitle;
            }
        }, (results) => {
            if (!results || !results[0] || !results[0].result) {
                titleElement.innerText = "Problem not detected!";
                return;
            }

            let problemTitle = results[0].result;
            titleElement.innerText = problemTitle;

            // Load saved note for this problem
            chrome.storage.sync.get("leetcodeNotes", (data) => {
                let notes = data.leetcodeNotes || {};
                noteField.value = notes[problemTitle] || "";
            });

            // Save note when clicked
            saveButton.addEventListener("click", function () {
                let note = noteField.value;

                chrome.storage.sync.get("leetcodeNotes", (data) => {
                    let notes = data.leetcodeNotes || {};
                    notes[problemTitle] = note;

                    // Save the notes to chrome storage
                    chrome.storage.sync.set({ "leetcodeNotes": notes }, () => {
                        loadNotes(); // Refresh the list of notes
                        alert("Note saved!");
                    });
                });
            });
        });
    });

    // Load all saved notes from storage
    function loadNotes() {
        chrome.storage.sync.get("leetcodeNotes", (data) => {
            let notes = data.leetcodeNotes || {};
            notesList.innerHTML = "";

            // Display each saved note
            Object.keys(notes).forEach(title => {
                let noteDiv = document.createElement("div");
                noteDiv.classList.add("note");
                noteDiv.innerHTML = `<div class="note-title">${title}</div><div>${notes[title]}</div>`;
                notesList.appendChild(noteDiv);
            });
        });
    }

    // Search functionality for filtering notes
    searchInput.addEventListener("input", function () {
        let searchText = searchInput.value.toLowerCase();
        let allNotes = document.querySelectorAll(".note");

        // Hide notes that don't match the search text
        allNotes.forEach(note => {
            let title = note.querySelector(".note-title").innerText.toLowerCase();
            note.style.display = title.includes(searchText) ? "block" : "none";
        });
    });

    // Load notes when the popup is opened
    loadNotes();
});
