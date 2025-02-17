let tabArray = [];

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.query({}, (tabs) => {
    // Store the active tab and the previous tab in the array
    let currentTab = tabs.find(tab => tab.id === activeInfo.tabId);
    let previousTab = tabArray[0]; // Get the last tab from the array

    if (currentTab) {
      tabArray = [currentTab, previousTab]; // Update the tabArray with current and previous tabs
    }
  });
});

// Listen for the Alt+Q keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command === 'go-back-to-previous-tab') {
    // Switch to the last tab in the array (tabArray[1])
    if (tabArray[1]) {
      chrome.tabs.update(tabArray[1].id, { active: true });
    }
  }
});
