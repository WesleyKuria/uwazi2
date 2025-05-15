
// Content script for Uwazi extension

// Configuration
const config = {
  overlayEnabled: true,
  apiEndpoint: "https://uwazi.app/api/analyze",
  supportedSites: [
    "nation.africa",
    "standardmedia.co.ke",
    "capitalfm.co.ke",
    "aljazeera.com",
    "bbc.com",
    "cnn.com"
  ],
  // CSS classes for injected elements
  cssClasses: {
    container: "uwazi-container",
    highlight: "uwazi-highlight",
    tooltip: "uwazi-tooltip",
    button: "uwazi-button"
  }
};

// State
let state = {
  isNewsArticle: false,
  articleInfo: null,
  analysisComplete: false,
  differences: [],
  overlayVisible: true
};

// Initialize
function init() {
  console.log("Uwazi extension initialized");
  
  // Check if current page is a news article
  if (isNewsArticle()) {
    state.isNewsArticle = true;
    
    // Extract article info
    state.articleInfo = extractArticleInfo();
    
    // Get overlay preference
    chrome.storage.local.get(['overlayEnabled'], function(result) {
      config.overlayEnabled = result.overlayEnabled !== false; // Default to true
      
      if (config.overlayEnabled) {
        // Initialize overlay
        injectOverlayButton();
      }
      
      // Analyze article content - in a real extension this would make an API call
      simulateArticleAnalysis();
    });
  }
  
  // Set up message listener for communication with popup
  chrome.runtime.onMessage.addListener(handleMessage);
}

// Check if current page is a supported news article
function isNewsArticle() {
  // Check if URL contains any supported site domain
  const currentUrl = window.location.href;
  return config.supportedSites.some(site => currentUrl.includes(site)) && 
         // Simple heuristic: page has headline and article body
         (document.querySelector('h1') && 
          (document.querySelector('article') || document.querySelector('.article-body')));
}

// Extract article information (headline, source, etc.)
function extractArticleInfo() {
  const title = document.querySelector('h1')?.textContent || "Unknown Title";
  const source = detectSource();
  
  return {
    title: title,
    source: source,
    url: window.location.href
  };
}

// Detect the source based on URL or page content
function detectSource() {
  const hostname = window.location.hostname;
  
  if (hostname.includes('nation.africa')) {
    return 'The Nation';
  } else if (hostname.includes('standardmedia.co.ke')) {
    return 'The Standard';
  } else if (hostname.includes('capitalfm.co.ke')) {
    return 'Capital FM';
  } else if (hostname.includes('aljazeera.com')) {
    return 'Al Jazeera';
  } else if (hostname.includes('bbc.com')) {
    return 'BBC';
  } else if (hostname.includes('cnn.com')) {
    return 'CNN';
  }
  
  return 'Unknown Source';
}

// Handle messages from popup
function handleMessage(message, sender, sendResponse) {
  console.log("Message received:", message);
  
  switch(message.action) {
    case 'checkIfNewsArticle':
      sendResponse({
        isNewsArticle: state.isNewsArticle,
        analysisComplete: state.analysisComplete,
        title: state.articleInfo?.title || "",
        source: state.articleInfo?.source || ""
      });
      break;
      
    case 'enableOverlay':
      config.overlayEnabled = true;
      state.overlayVisible = true;
      toggleOverlayVisibility(true);
      sendResponse({success: true});
      break;
      
    case 'disableOverlay':
      config.overlayEnabled = false;
      state.overlayVisible = false;
      toggleOverlayVisibility(false);
      sendResponse({success: true});
      break;
      
    case 'showComparison':
      showComparison(message.source);
      sendResponse({success: true});
      break;
  }
  
  return true; // Keep the message channel open for async responses
}

// Inject overlay button into page
function injectOverlayButton() {
  const button = document.createElement('div');
  button.classList.add('uwazi-fab');
  button.innerHTML = `<div class="uwazi-fab-icon">U</div>`;
  document.body.appendChild(button);
  
  // Add click event to toggle overlay
  button.addEventListener('click', () => {
    state.overlayVisible = !state.overlayVisible;
    toggleOverlayVisibility(state.overlayVisible);
  });
  
  // Inject CSS for the button
  const style = document.createElement('style');
  style.textContent = `
    .uwazi-fab {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 25px;
      background: linear-gradient(to right, #6366f1, #8b5cf6);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      z-index: 9999;
      transition: all 0.3s ease;
    }
    
    .uwazi-fab:hover {
      transform: scale(1.1);
    }
    
    .uwazi-highlight {
      background-color: rgba(139, 92, 246, 0.15);
      border-bottom: 2px solid #8b5cf6;
      cursor: pointer;
      position: relative;
    }
    
    .uwazi-tooltip {
      position: absolute;
      bottom: 100%;
      left: 0;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 8px 12px;
      font-size: 14px;
      z-index: 10000;
      width: 300px;
      display: none;
    }
    
    .uwazi-highlight:hover .uwazi-tooltip {
      display: block;
    }
    
    .uwazi-tooltip-source {
      font-weight: bold;
      margin-bottom: 4px;
    }
    
    .uwazi-tooltip-text {
      margin-bottom: 4px;
    }
    
    .uwazi-compare-view {
      position: fixed;
      top: 0;
      right: 0;
      width: 400px;
      height: 100vh;
      background: white;
      box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
      z-index: 9998;
      padding: 20px;
      overflow-y: auto;
      transition: transform 0.3s ease;
    }
    
    .uwazi-compare-view.hidden {
      transform: translateX(420px);
    }
    
    .uwazi-hidden {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
}

// Toggle overlay visibility
function toggleOverlayVisibility(visible) {
  const highlights = document.querySelectorAll('.uwazi-highlight');
  const button = document.querySelector('.uwazi-fab');
  const compareView = document.querySelector('.uwazi-compare-view');
  
  if (highlights) {
    highlights.forEach(el => {
      if (visible) {
        el.classList.remove('uwazi-hidden');
      } else {
        el.classList.add('uwazi-hidden');
      }
    });
  }
  
  if (compareView) {
    if (visible) {
      compareView.classList.remove('hidden');
    } else {
      compareView.classList.add('hidden');
    }
  }
  
  if (button) {
    if (visible) {
      button.style.backgroundColor = 'linear-gradient(to right, #6366f1, #8b5cf6)';
    } else {
      button.style.backgroundColor = '#6b7280';
    }
  }
}

// Show comparison view for a specific source
function showComparison(source) {
  // Remove existing comparison view if any
  const existingView = document.querySelector('.uwazi-compare-view');
  if (existingView) {
    existingView.remove();
  }
  
  // Create comparison view
  const compareView = document.createElement('div');
  compareView.classList.add('uwazi-compare-view');
  
  compareView.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <h2 style="font-size: 18px; font-weight: bold;">Article Comparison</h2>
      <button class="uwazi-close-btn" style="background: none; border: none; cursor: pointer; font-size: 18px;">&times;</button>
    </div>
    
    <div style="display: flex; gap: 8px; margin-bottom: 16px;">
      <div style="flex: 1; padding: 8px; border-radius: 4px; background-color: #f3f4f6;">
        <div style="font-size: 12px; color: #6b7280;">Current Source</div>
        <div style="font-weight: 500;">${state.articleInfo.source}</div>
      </div>
      <div style="flex: 1; padding: 8px; border-radius: 4px; background-color: #ede9fe;">
        <div style="font-size: 12px; color: #6b7280;">Comparing With</div>
        <div style="font-weight: 500;">${source}</div>
      </div>
    </div>
    
    <h3 style="font-size: 16px; margin-bottom: 8px;">Key Differences</h3>
    
    <div class="uwazi-differences">
      <div class="uwazi-difference-item" style="padding: 12px; border: 1px solid #e5e7eb; border-radius: 4px; margin-bottom: 12px;">
        <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Phrasing Difference</div>
        <div style="display: flex; gap: 8px;">
          <div style="flex: 1; background-color: #f3f4f6; padding: 8px; border-radius: 4px;">
            <div style="font-size: 12px; color: #6b7280;">${state.articleInfo.source}</div>
            <div>protestors demanded change</div>
          </div>
          <div style="flex: 1; background-color: #ede9fe; padding: 8px; border-radius: 4px;">
            <div style="font-size: 12px; color: #6b7280;">${source}</div>
            <div>rioters clashed with police</div>
          </div>
        </div>
      </div>
      
      <div class="uwazi-difference-item" style="padding: 12px; border: 1px solid #e5e7eb; border-radius: 4px; margin-bottom: 12px;">
        <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Number Difference</div>
        <div style="display: flex; gap: 8px;">
          <div style="flex: 1; background-color: #f3f4f6; padding: 8px; border-radius: 4px;">
            <div style="font-size: 12px; color: #6b7280;">${state.articleInfo.source}</div>
            <div>hundreds attended</div>
          </div>
          <div style="flex: 1; background-color: #ede9fe; padding: 8px; border-radius: 4px;">
            <div style="font-size: 12px; color: #6b7280;">${source}</div>
            <div>a small group of people</div>
          </div>
        </div>
      </div>
      
      <div class="uwazi-difference-item" style="padding: 12px; border: 1px solid #e5e7eb; border-radius: 4px; margin-bottom: 12px;">
        <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Tone Difference</div>
        <div style="display: flex; gap: 8px;">
          <div style="flex: 1; background-color: #f3f4f6; padding: 8px; border-radius: 4px;">
            <div style="font-size: 12px; color: #6b7280;">${state.articleInfo.source}</div>
            <div>peaceful assembly</div>
          </div>
          <div style="flex: 1; background-color: #ede9fe; padding: 8px; border-radius: 4px;">
            <div style="font-size: 12px; color: #6b7280;">${source}</div>
            <div>chaotic confrontation</div>
          </div>
        </div>
      </div>
    </div>
    
    <div style="margin-top: 16px;">
      <a href="https://uwazi.app/compare?source=${encodeURIComponent(state.articleInfo.source)}&compare=${encodeURIComponent(source)}" 
         target="_blank"
         style="display: block; text-align: center; padding: 8px 12px; background-color: #6366f1; color: white; border-radius: 4px; text-decoration: none;">
        See Full Comparison
      </a>
    </div>
  `;
  
  document.body.appendChild(compareView);
  
  // Add close button functionality
  const closeBtn = document.querySelector('.uwazi-close-btn');
  closeBtn.addEventListener('click', () => {
    compareView.remove();
  });
}

// Simulate article analysis - in a real extension this would call an NLP API
function simulateArticleAnalysis() {
  // Simulate API delay
  setTimeout(() => {
    // Find paragraphs in the article
    const paragraphs = document.querySelectorAll('article p, .article-body p');
    if (!paragraphs.length) return;
    
    // For demo purposes, highlight some phrases in the first few paragraphs
    const phrasesToHighlight = [
      {
        original: "protestors demanded",
        alternatives: [
          { source: "Daily Nation", text: "demonstrators called for reforms" },
          { source: "The Standard", text: "rioters clashed with police" },
          { source: "Capital FM", text: "activists rallied for rights" }
        ]
      },
      {
        original: "hundreds",
        alternatives: [
          { source: "Daily Nation", text: "over a thousand" },
          { source: "The Standard", text: "a small group" },
          { source: "Capital FM", text: "massive turnout" }
        ]
      },
      {
        original: "peaceful",
        alternatives: [
          { source: "Daily Nation", text: "organized" },
          { source: "The Standard", text: "chaotic" },
          { source: "Capital FM", text: "historic" }
        ]
      }
    ];
    
    // Process the first few paragraphs to highlight differences
    for (let i = 0; i < Math.min(5, paragraphs.length); i++) {
      const paragraph = paragraphs[i];
      const text = paragraph.innerHTML;
      
      // Find and highlight phrases
      let highlightedText = text;
      phrasesToHighlight.forEach(phrase => {
        const regex = new RegExp(`\\b${phrase.original}\\b`, 'gi');
        
        if (text.match(regex)) {
          const tooltip = `
            <div class="uwazi-tooltip">
              ${phrase.alternatives.map(alt => `
                <div class="uwazi-tooltip-source">${alt.source}:</div>
                <div class="uwazi-tooltip-text">"${alt.text}"</div>
              `).join('')}
            </div>
          `;
          
          highlightedText = highlightedText.replace(
            regex, 
            `<span class="uwazi-highlight">${phrase.original}${tooltip}</span>`
          );
        }
      });
      
      paragraph.innerHTML = highlightedText;
    }
    
    // Mark analysis as complete
    state.analysisComplete = true;
    
    // Notify background script that analysis is complete
    chrome.runtime.sendMessage({
      action: "analysisComplete",
      articleInfo: state.articleInfo
    });
  }, 2000);
}

// Start the extension
init();
