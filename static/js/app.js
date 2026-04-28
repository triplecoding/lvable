async function chatWithPdf() {
  const output = document.getElementById('aiOutput');
  output.textContent = 'Running...';
  const token = localStorage.getItem('dc_token') || '';
  const res = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      prompt: document.getElementById('prompt')?.value || '',
      pdf_text: document.getElementById('pdfText')?.value || ''
    })
  });
  const data = await res.json();
  output.textContent = data.answer || data.detail || 'No output';
}

async function trackAdEvent(placement, action = 'click') {
  try {
    await fetch('/api/analytics/ad-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ placement, action, source_page: window.location.pathname })
    });
  } catch (_) {
    // no-op for non-blocking UX
  }
}
