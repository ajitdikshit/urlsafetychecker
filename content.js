chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkUrl') {
    chrome.runtime.sendMessage({ 
      action: 'checkUrl', 
      url: window.location.href 
    }).then(sendResponse);
    return true;
  }
});

console.log('Content script loaded on:', window.location.href);
