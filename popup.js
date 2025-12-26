document.getElementById('checkBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const statusEl = document.getElementById('status');
  const btn = document.getElementById('checkBtn');
  
  btn.textContent = 'Checking...';
  btn.disabled = true;
  
  const result = await chrome.runtime.sendMessage({ 
    action: 'checkUrl', 
    url: tab.url 
  });
  
  if (result.safe) {
    statusEl.textContent = 'SAFE';
    statusEl.className = 'safe';
  } else {
    statusEl.textContent = 'UNSAFE';
    statusEl.className = 'unsafe';
  }
  
  btn.textContent = 'Check Again';
  btn.disabled = false;
});
