const toggleButton = document.getElementById('toggleDarkMode');

// Initialize the button text based on saved preferences
chrome.storage.sync.get('darkModeEnabled', (data) => {
  toggleButton.textContent = data.darkModeEnabled ? 'Disable Dark Mode' : 'Enable Dark Mode';
});

toggleButton.addEventListener('click', () => {
  chrome.storage.sync.get('darkModeEnabled', (data) => {
    const darkModeEnabled = !data.darkModeEnabled;
    
    chrome.storage.sync.set({ darkModeEnabled });

    // Update the content script to toggle dark mode
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js']
      });
    });

    toggleButton.textContent = darkModeEnabled ? 'Disable Dark Mode' : 'Enable Dark Mode';
  });
});
