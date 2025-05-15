
// Background script for Uwazi extension

// Extension initialization
chrome.runtime.onInstalled.addListener(() => {
  console.log("Uwazi extension installed");
  
  // Set default preferences
  chrome.storage.local.set({
    overlayEnabled: true,
    firstInstall: true
  });
  
  // Show onboarding page on first install
  chrome.tabs.create({ url: "https://uwazi.app/welcome" });
});

// Listen for analysis completion message
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "analysisComplete") {
    // Update icon to indicate analysis is complete
    chrome.action.setBadgeText({
      text: "3",
      tabId: sender.tab.id
    });
    
    chrome.action.setBadgeBackgroundColor({
      color: "#8b5cf6",
      tabId: sender.tab.id
    });
    
    // Store article data for this tab
    const tabId = sender.tab.id;
    const articleData = {
      title: message.articleInfo.title,
      source: message.articleInfo.source,
      url: message.articleInfo.url,
      analyzedAt: new Date().toISOString()
    };
    
    chrome.storage.local.get(['analyzedArticles'], (result) => {
      const analyzedArticles = result.analyzedArticles || {};
      analyzedArticles[tabId] = articleData;
      chrome.storage.local.set({ analyzedArticles });
    });
  }
  
  return true; // Keep the message channel open for async responses
});

// Clear data when tabs are closed
chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.local.get(['analyzedArticles'], (result) => {
    if (result.analyzedArticles && result.analyzedArticles[tabId]) {
      const analyzedArticles = result.analyzedArticles;
      delete analyzedArticles[tabId];
      chrome.storage.local.set({ analyzedArticles });
    }
  });
});

// Monitor navigation to news sites
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Reset badge when navigating to a new page
  if (changeInfo.status === 'complete') {
    chrome.action.setBadgeText({
      text: "",
      tabId: tabId
    });
    
    // Check if the URL is a supported news site
    const supportedSites = [
      "nation.africa",
      "standardmedia.co.ke",
      "capitalfm.co.ke",
      "aljazeera.com",
      "bbc.com",
      "cnn.com"
    ];
    
    const isNewsSite = supportedSites.some(site => tab.url.includes(site));
    
    if (isNewsSite) {
      // Set icon to indicate this is a supported site
      chrome.action.setIcon({
        path: {
          "16": "images/icon16.png",
          "48": "images/icon48.png",
          "128": "images/icon128.png"
        },
        tabId: tabId
      });
    } else {
      // Use a greyscale icon for non-supported sites
      chrome.action.setIcon({
        path: {
          "16": "images/icon16-grey.png",
          "48": "images/icon48-grey.png",
          "128": "images/icon128-grey.png"
        },
        tabId: tabId
      });
    }
  }
});
