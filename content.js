// Check current state of dark mode
chrome.storage.sync.get('darkModeEnabled', (data) => {
    if (data.darkModeEnabled) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });
  
  // Function to inject dark mode CSS into the page
  function enableDarkMode() {
    if (!document.getElementById('dark-mode-style')) {
      const style = document.createElement('style');
      style.id = 'dark-mode-style';
      style.textContent = `
        body {
          background-color: #121212 !important;
          color: #e0e0e0 !important;
        }
        a {
          color: #bb86fc !important;
        }
        img, video, iframe {
          filter: brightness(0.8) !important;
        }
        * {
          background-color: transparent !important;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Function to remove dark mode CSS from the page
  function disableDarkMode() {
    const darkModeStyle = document.getElementById('dark-mode-style');
    if (darkModeStyle) {
      darkModeStyle.remove();
    }
  }
  