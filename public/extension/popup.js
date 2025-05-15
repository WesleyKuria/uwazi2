
document.addEventListener('DOMContentLoaded', function() {
  // Get references to UI elements
  const notArticleState = document.getElementById('not-article');
  const analyzingState = document.getElementById('analyzing');
  const resultsState = document.getElementById('results');
  const goToNewsBtn = document.getElementById('go-to-news');
  const toggleOverlayBtn = document.getElementById('toggle-overlay');
  const viewButtons = document.querySelectorAll('.view-btn');
  
  // Demo: Initially show results view
  notArticleState.classList.add('hidden');
  analyzingState.classList.add('hidden');
  resultsState.classList.remove('hidden');

  // Event listeners
  goToNewsBtn.addEventListener('click', function() {
    // Open a news site in a new tab
    chrome.tabs.create({ url: 'https://nation.africa' });
  });
  
  toggleOverlayBtn.addEventListener('click', function() {
    const isActive = toggleOverlayBtn.classList.contains('active');
    
    // Toggle active state
    if (isActive) {
      toggleOverlayBtn.classList.remove('active');
      toggleOverlayBtn.textContent = 'Enable Overlay';
      
      // Send message to content script to disable overlay
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "disableOverlay"});
      });
    } else {
      toggleOverlayBtn.classList.add('active');
      toggleOverlayBtn.textContent = 'Disable Overlay';
      
      // Send message to content script to enable overlay
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "enableOverlay"});
      });
    }
    
    // Save preference
    chrome.storage.local.set({overlayEnabled: !isActive});
  });
  
  // View article difference buttons
  viewButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const sourceItem = this.closest('.perspective-item');
      const source = sourceItem.querySelector('.perspective-source').textContent;
      
      // Send message to content script to show comparison for this source
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "showComparison", 
          source: source
        });
      });
      
      // Close popup
      window.close();
    });
  });
  
  // Check if we're on a news article page
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "checkIfNewsArticle"}, function(response) {
      if (response && response.isNewsArticle) {
        // Show results or analyzing state
        if (response.analysisComplete) {
          notArticleState.classList.add('hidden');
          analyzingState.classList.add('hidden');
          resultsState.classList.remove('hidden');
          
          // Update UI with article info
          document.getElementById('current-article-title').textContent = response.title;
          document.getElementById('current-article-source').textContent = response.source;
        } else {
          notArticleState.classList.add('hidden');
          analyzingState.classList.remove('hidden');
          resultsState.classList.add('hidden');
        }
      } else {
        // Show not on article state
        notArticleState.classList.remove('hidden');
        analyzingState.classList.add('hidden');
        resultsState.classList.add('hidden');
      }
    });
  });
  
  // Check overlay preference
  chrome.storage.local.get(['overlayEnabled'], function(result) {
    const overlayEnabled = result.overlayEnabled !== false; // Default to true
    
    if (!overlayEnabled) {
      toggleOverlayBtn.classList.remove('active');
      toggleOverlayBtn.textContent = 'Enable Overlay';
    }
  });
});
