chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkUrl') {
    checkUrlSafety(request.url).then(sendResponse);
    return true;
  }
});

async function checkUrlSafety(url) {
  const API_KEY = 'AIzaSyDOos0eZcRIzpTww93X_lGsOs0hbID0z1c';
  
  const data = {
    client: { clientId: 'safety-checker', clientVersion: '1.0' },
    threatInfo: {
      threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING'],
      platformTypes: ['ANY_PLATFORM'],
      threatEntryTypes: ['URL'],
      threatEntries: [{ url }]
    }
  };

  try {
    const response = await fetch(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`,
      { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(data) 
      }
    );
    const result = await response.json();
    return result.matches?.length > 0 
      ? { safe: false, threats: result.matches } 
      : { safe: true };
  } catch (error) {
    return { safe: false, error: error.message };
  }
}
