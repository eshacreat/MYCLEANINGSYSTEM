/* exported runChatbotInference */
// Client-side NLP Chatbot Engine
// Run multi-class Logistic Regression with Softmax entirely in the browser

function runChatbotInference(text) {
  if (typeof CHATBOT_MODEL === 'undefined') {
    console.warn('Chatbot model weights are not loaded.');
    return {
      intent: 'fallback',
      probability: 1.0,
      response: 'Hi there! I am currently operating in basic mode. How can I help you today?',
    };
  }

  if (!text || text.trim().length === 0) {
    return { intent: 'none', probability: 0, response: '' };
  }

  try {
    const model = CHATBOT_MODEL;
    const classes = model.classes;
    const vocab = model.vocabulary;
    const idf = model.idf;
    const coefficients = model.coefficients;
    const intercepts = model.intercepts;

    // 1. Preprocess text (lowercase and remove punctuation)
    const cleaned = text.toLowerCase().replace(/[^a-z0-9\s]/g, '');
    const tokens = cleaned.split(/\s+/).filter((token) => token.length > 0);

    if (tokens.length === 0) {
      return {
        intent: 'fallback',
        probability: 1.0,
        response: "I didn't catch that. Could you please say something else?",
      };
    }

    // 2. Compute TF-IDF feature vector (length = vocab size)
    const numFeatures = Object.keys(vocab).length;
    const featureVector = new Array(numFeatures).fill(0.0);

    // Count frequencies of words present in vocab
    const termCounts = {};
    tokens.forEach((t) => {
      termCounts[t] = (termCounts[t] || 0) + 1;
    });

    // Compute TF-IDF for words in vocabulary
    for (const [word, idx] of Object.entries(vocab)) {
      if (termCounts[word]) {
        const tf = termCounts[word] / tokens.length;
        featureVector[idx] = tf * idf[idx];
      }
    }

    // 3. Compute linear scores for each class: score[c] = intercept[c] + dot(vector, coefficients[c])
    const scores = [];
    let maxScore = -Infinity; // for numerical stability in softmax

    for (let c = 0; c < classes.length; c++) {
      let score = intercepts[c];
      const weights = coefficients[c];
      for (let f = 0; f < numFeatures; f++) {
        score += featureVector[f] * weights[f];
      }
      scores.push(score);
      if (score > maxScore) {
        maxScore = score;
      }
    }

    // 4. Softmax Function: prob[c] = exp(score[c] - maxScore) / sum(exp(score[i] - maxScore))
    const exps = scores.map((s) => Math.exp(s - maxScore));
    const sumExps = exps.reduce((a, b) => a + b, 0);
    const probabilities = exps.map((e) => e / sumExps);

    // Find class with highest probability
    let bestClassIdx = 0;
    let bestProb = 0;
    for (let i = 0; i < probabilities.length; i++) {
      if (probabilities[i] > bestProb) {
        bestProb = probabilities[i];
        bestClassIdx = i;
      }
    }

    const predictedIntent = classes[bestClassIdx];

    // Confidence threshold
    const CONFIDENCE_THRESHOLD = 0.38;
    let response = '';
    let finalIntent = predictedIntent;

    if (bestProb >= CONFIDENCE_THRESHOLD) {
      response = model.responses[predictedIntent];
    } else {
      finalIntent = 'fallback';
      response =
        "I'm not completely sure I understand. Could you please ask about our services, booking assistance, pricing details, or how to contact our team?";
    }

    return {
      intent: finalIntent,
      probability: parseFloat(bestProb.toFixed(3)),
      response: response,
      allProbabilities: classes.reduce((obj, cls, idx) => {
        obj[cls] = parseFloat(probabilities[idx].toFixed(3));
        return obj;
      }, {}),
    };
  } catch (error) {
    console.error('Error executing Chatbot Inference:', error);
    return {
      intent: 'error',
      probability: 0.0,
      response: 'Oops! My NLP engine encountered a brief hiccup. Please ask again!',
    };
  }
}
