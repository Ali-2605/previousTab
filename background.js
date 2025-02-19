chrome.tabs.onActivated.addListener(async (activeInfo) => {
    let storedTabs = await chrome.storage.session.get("tabArray");
    let tabArray = storedTabs.tabArray || [];

    chrome.tabs.query({}, async (tabs) => {
        let currentTab = tabs.find(tab => tab.id === activeInfo.tabId);
        let previousTab = tabArray[0]; // Get the last tab from storage

        if (currentTab) {
            tabArray = [currentTab, previousTab]; // Update stored tabs

            // Save to chrome.storage.session
            await chrome.storage.session.set({ tabArray });
        }
    });
});

// Listen for the Alt+Q keyboard shortcut
chrome.commands.onCommand.addListener(async (command) => {
    if (command === 'go-back-to-previous-tab') {
        let storedTabs = await chrome.storage.session.get("tabArray");
        let tabArray = storedTabs.tabArray || [];

        if (tabArray[1]) {
            chrome.tabs.update(tabArray[1].id, { active: true });
        }
    }
});
