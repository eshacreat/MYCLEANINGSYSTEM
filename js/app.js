// ==========================================
// 1. DYNAMIC SYSTEM INIT & DOM LOADING
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initStatsCounter();
  initCleaningTips();
  initServiceSearch();
  initChatbot();
  initFeedbackSentiment();
  initFormHandlers();
});

// ==========================================
// 2. PERSISTENT DARK MODE CONTROLLER
// ==========================================
function initDarkMode() {
  const darkBtn = document.getElementById('darkModeBtn');
  if (!darkBtn) return;

  // Check localStorage or system preferences
  const isDark = localStorage.getItem('darkMode') === 'enabled';
  if (isDark) {
    document.body.classList.add('dark');
    darkBtn.textContent = '☀️';
  }

  darkBtn.addEventListener('click', () => {
    const darkActive = document.body.classList.toggle('dark');
    if (darkActive) {
      localStorage.setItem('darkMode', 'enabled');
      darkBtn.textContent = '☀️';
    } else {
      localStorage.setItem('darkMode', 'disabled');
      darkBtn.textContent = '🌙';
    }
  });
}

// ==========================================
// 3. STATS COUNTING ANIMATION
// ==========================================
function initStatsCounter() {
  const counter = document.getElementById('clientsCounter');
  if (!counter) return;

  let count = 0;
  const target = 5280;
  const increment = Math.ceil(target / 100);

  const interval = setInterval(() => {
    count += increment;
    if (count >= target) {
      counter.innerText = target.toLocaleString() + '+';
      clearInterval(interval);
    } else {
      counter.innerText = count.toLocaleString();
    }
  }, 25);
}

// ==========================================
// 4. CLEANING TIPS GENERATOR
// ==========================================
function initCleaningTips() {
  const tips = [
    'Vacuum high-traffic areas twice weekly to extend carpet life.',
    'Always use microfiber cloths instead of paper towels to avoid leaving lint.',
    'Disinfect high-touch kitchen surfaces (cabinet handles, fridge doors) daily.',
    'Wash bedsheets weekly in hot water (at least 140°F) to kill dust mites.',
    'Clean windows on a cloudy day; direct sunlight dries cleaning solution too fast, leaving streaks.',
    'Baking soda and vinegar are highly effective, non-toxic alternatives for drain deodorizing.',
  ];

  const tipBtn = document.querySelector('.tip-btn');
  const tipBox = document.getElementById('tipBox');

  if (tipBtn && tipBox) {
    tipBtn.addEventListener('click', () => {
      const randomIndex = Math.floor(Math.random() * tips.length);
      tipBox.style.opacity = 0;
      setTimeout(() => {
        tipBox.innerText = tips[randomIndex];
        tipBox.style.opacity = 1;
      }, 150);
    });
  }
}

// ==========================================
// 5. SERVICES SEARCH & SORT
// ==========================================
function initServiceSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  searchInput.addEventListener('keyup', function () {
    const query = this.value.toLowerCase();
    const rows = document.querySelectorAll('#serviceTable tbody tr');

    rows.forEach((row) => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(query) ? '' : 'none';
    });
  });
}

/* exported sortTable */
function sortTable() {
  const table = document.getElementById('serviceTable');
  if (!table) return;

  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.rows);
  const sortedRows = rows.sort((a, b) => {
    const priceA = parseFloat(a.cells[1].innerText);
    const priceB = parseFloat(b.cells[1].innerText);
    return priceA - priceB;
  });

  // Re-append rows
  sortedRows.forEach((row) => tbody.appendChild(row));
}

// ==========================================
// 6. REAL-TIME NLP SENTIMENT ANALYZER
// ==========================================
function initFeedbackSentiment() {
  const feedbackText = document.getElementById('feedbackText');
  if (!feedbackText) return;

  feedbackText.addEventListener('input', function () {
    const text = this.value;
    const analysis = runSentimentInference(text);

    const badge = document.getElementById('sentimentBadge');
    const meterBar = document.getElementById('sentimentMeterBar');
    const confidence = document.getElementById('sentimentConfidence');
    const kwContainer = document.getElementById('matchedKeywords');
    const kwList = document.getElementById('keywordsList');

    if (!analysis) return;

    // Update Text & Confidence
    confidence.innerText = `${analysis.confidence}%`;

    // Remove old classes
    badge.className = 'sentiment-badge';
    meterBar.className = 'sentiment-meter-bar';

    // Map colors & badges
    if (analysis.sentiment === 'Positive') {
      badge.innerText = 'Positive 😊';
      badge.classList.add('positive');
      meterBar.classList.add('positive');
      meterBar.style.width = `${analysis.score * 100}%`;
    } else if (analysis.sentiment === 'Negative') {
      badge.innerText = 'Negative 😡';
      badge.classList.add('negative');
      meterBar.classList.add('negative');
      meterBar.style.width = `${analysis.score * 100}%`;
    } else {
      badge.innerText = 'Neutral 😐';
      badge.classList.add('neutral');
      meterBar.classList.add('neutral');
      meterBar.style.width = '50%';
    }

    // Keywords Matching
    if (analysis.matchedWords && analysis.matchedWords.length > 0) {
      kwContainer.style.display = 'block';
      kwList.innerText = analysis.matchedWords.map((w) => `'${w}'`).join(', ');
    } else {
      kwContainer.style.display = 'none';
    }
  });
}

// ==========================================
// 7. FLOATING NLP CHATBOT CONTROLLER
// ==========================================
function initChatbot() {
  const toggle = document.getElementById('chatbotToggle');
  const widget = document.getElementById('chatbotWidget');
  const closeBtn = document.getElementById('chatbotClose');
  const input = document.getElementById('chatbotInput');
  const sendBtn = document.getElementById('chatbotSend');
  const messagesContainer = document.getElementById('chatbotMessages');

  if (!toggle || !widget) return;

  // Show/Hide Widget
  toggle.addEventListener('click', () => widget.classList.add('active'));
  closeBtn.addEventListener('click', () => widget.classList.remove('active'));

  // Send logic
  function handleSend() {
    const text = input.value.trim();
    if (!text) return;

    // Render User Message
    appendMessage('user', text);
    input.value = '';

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Render typing indicator
    const typingId = appendTypingIndicator();
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simulate network latency (400ms) for natural feel
    setTimeout(() => {
      removeTypingIndicator(typingId);

      // Run inference
      const prediction = runChatbotInference(text);
      appendMessage('bot', prediction.response);

      // Log classification metrics in developer console (recruiters love this!)
      console.log(`[NLP Chatbot] Query: "${text}"`);
      console.log(`Predicted Intent: "${prediction.intent}" (Prob: ${prediction.probability})`);
      console.log('All class probabilities:', prediction.allProbabilities);

      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 500);
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  function appendMessage(sender, msgText) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.innerText = msgText;
    messagesContainer.appendChild(msgDiv);
  }

  function appendTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-msg bot typing-indicator';
    typingDiv.id = 'chatbot-typing';
    typingDiv.innerHTML = `<span style="font-style:italic; color:var(--text-muted);">AI is thinking...</span>`;
    messagesContainer.appendChild(typingDiv);
    return typingDiv.id;
  }

  function removeTypingIndicator(id) {
    const indicator = document.getElementById(id);
    if (indicator) indicator.remove();
  }
}

// ==========================================
// 8. STANDARD FORMS HANDLERS
// ==========================================
function initFormHandlers() {
  // Handling registration & login mocks
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;

      if (typeof validateEmail !== 'undefined' && !validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      if (typeof validatePassword !== 'undefined' && !validatePassword(password)) {
        alert('Password must be at least 8 characters, include a number and an uppercase letter.');
        return;
      }

      alert('Login Simulated Successfully!');
      window.location.href = 'home.html';
    });
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const password = document.getElementById('regPassword').value;
      const confirm = document.getElementById('regConfirmPassword').value;

      if (typeof validateName !== 'undefined' && !validateName(name)) {
        alert('Please enter a valid full name (minimum 3 alphabetical letters).');
        return;
      }

      if (typeof validateEmail !== 'undefined' && !validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      if (typeof validatePassword !== 'undefined' && !validatePassword(password)) {
        alert('Password must be at least 8 characters, include a number and an uppercase letter.');
        return;
      }

      if (password !== confirm) {
        alert('Passwords do not match. Please confirm your password.');
        return;
      }

      alert('Registration Simulated Successfully! Welcome to ShineSystem.');
      window.location.href = 'login.html';
    });
  }

  const feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('feedbackName').value.trim();
      const feedbackText = document.getElementById('feedbackText').value.trim();

      // Validate name from validation.js
      if (typeof validateName !== 'undefined' && !validateName(name)) {
        alert('Please enter a valid full name (minimum 3 alphabetical letters).');
        return;
      }

      // Run sentiment analysis
      const sentimentResult = runSentimentInference(feedbackText);

      const payload = {
        name,
        rating: document.getElementById('feedbackRating').value,
        comments: feedbackText,
        sentimentAnalysis: sentimentResult
          ? {
              sentiment: sentimentResult.sentiment,
              confidence: sentimentResult.confidence,
              score: sentimentResult.score,
            }
          : null,
      };

      // Call API
      if (typeof submitFeedbackAPI !== 'undefined') {
        submitFeedbackAPI(payload)
          .then((response) => {
            alert(
              `Thank you, ${name}!\nYour review was analyzed and submitted successfully.\nFeedback ID: ${response.feedbackId}`
            );
            feedbackForm.reset();
            resetSentimentUI();
          })
          .catch((err) => {
            alert(`API Error: ${err.message}`);
          });
      } else {
        alert(`Thank you, ${name}! Your feedback has been registered and analyzed.`);
        feedbackForm.reset();
        resetSentimentUI();
      }
    });
  }

  function resetSentimentUI() {
    // Reset sentiment analyzer state
    const badge = document.getElementById('sentimentBadge');
    const meterBar = document.getElementById('sentimentMeterBar');
    const confidence = document.getElementById('sentimentConfidence');
    const kwContainer = document.getElementById('matchedKeywords');
    if (badge && meterBar) {
      badge.className = 'sentiment-badge neutral';
      badge.innerText = 'Neutral 😐';
      meterBar.className = 'sentiment-meter-bar';
      meterBar.style.width = '50%';
      confidence.innerText = '50.0%';
      kwContainer.style.display = 'none';
    }
  }
}
