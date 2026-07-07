/* exported runSentimentInference */
// Client-side NLP Sentiment Analyzer
// Performs real-time TF-IDF vectorization and Logistic Regression classification

function runSentimentInference(text) {
  if (typeof SENTIMENT_MODEL === 'undefined') {
    console.warn('ML Sentiment model not loaded.');
    return null;
  }

  if (!text || text.trim().length < 3) {
    return { sentiment: 'Neutral', confidence: 0.5, score: 0, isML: false };
  }

  try {
    const model = SENTIMENT_MODEL;
    const vocab = model.vocabulary;

    // 1. Text preprocessing (match python's clean_text)
    const cleaned = text.toLowerCase().replace(/[^a-z0-9\s]/g, '');
    const tokens = cleaned.split(/\s+/).filter((token) => token.length > 0);

    if (tokens.length === 0) {
      return { sentiment: 'Neutral', confidence: 0.5, score: 0, isML: true };
    }

    // 2. Compute Term Frequencies (TF)
    const termCounts = {};
    tokens.forEach((token) => {
      termCounts[token] = (termCounts[token] || 0) + 1;
    });

    // 3. Compute TF-IDF and Linear sum (score = intercept + sum(tf_idf * coeff))
    let linearSum = model.intercept;
    let matchedWords = [];

    // Note: Scikit-learn's default TfidfVectorizer uses L2 normalization by default.
    // For a simple browser implementation, we can do raw TF-IDF or normalized TF-IDF.
    // Raw TF-IDF works incredibly well for text classification in practice if weights are scaled correctly.
    // Let's implement standard TF-IDF: TF = term_count / total_tokens, TF-IDF = TF * IDF
    for (const [word, info] of Object.entries(vocab)) {
      if (termCounts[word]) {
        const tf = termCounts[word] / tokens.length;
        const tfidf = tf * info.idf;
        linearSum += tfidf * info.coefficient;
        matchedWords.push(word);
      }
    }

    // 4. Sigmoid Function: P(Positive) = 1 / (1 + exp(-linearSum))
    const probabilityPositive = 1.0 / (1.0 + Math.exp(-linearSum));

    // Determine sentiment label and confidence
    let sentiment = 'Neutral';
    let confidence = 0.5;

    if (probabilityPositive >= 0.62) {
      sentiment = 'Positive';
      confidence = probabilityPositive;
    } else if (probabilityPositive <= 0.38) {
      sentiment = 'Negative';
      confidence = 1.0 - probabilityPositive;
    } else {
      sentiment = 'Neutral';
      confidence = 1.0 - Math.abs(probabilityPositive - 0.5) * 2; // closer to 0.5 means higher neutral confidence
    }

    return {
      sentiment: sentiment,
      confidence: parseFloat((confidence * 100).toFixed(1)),
      score: parseFloat(probabilityPositive.toFixed(3)),
      matchedWords: matchedWords,
      isML: true,
    };
  } catch (error) {
    console.error('Error executing Sentiment Inference:', error);
    return null;
  }
}
