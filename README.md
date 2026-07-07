# ShineSystem AI - Smart Cleaning Optimization Platform

[![GitHub Pages](https://img.shields.io/badge/Live_Demo-GitHub_Pages-4f46e5?style=for-the-badge)](home.html)
[![Python Version](https://img.shields.io/badge/Python-3.11+-blue?style=flat-square&logo=python)](ml_pipeline/)
[![ML Library](https://img.shields.io/badge/scikit--learn-latest-orange?style=flat-square&logo=scikit-learn)](ml_pipeline/)
[![Frontend JS](https://img.shields.io/badge/Vanilla_JS-ES6+-f7df1e?style=flat-square&logo=javascript)](js/)

**ShineSystem AI** (formerly MyCleaningSystem) is a modern, responsive web application for commercial and residential cleaning services integrated with client-side **Machine Learning** models. 

Rather than relying on heavy server-side endpoints or large external libraries, this project implements **first-principles mathematical inference** (matrix dot-products, TF-IDF vectorization, Sigmoid, and Softmax activations) directly in vanilla JavaScript. This guarantees sub-millisecond execution, offline support, zero hosting costs, and complete immunity to Cross-Origin Resource Sharing (CORS) blocks under the `file://` protocol.

---

## 🚀 Key AI/ML Features

### 1. Real-Time Price & Labor Hour Estimator (Ridge Regression)
- **Problem**: Cleaning estimations are typically static, leading to miscalculated labor costs or unhappy clients.
- **ML Solution**: We train a **Ridge Regression model** on synthetic datasets to predict both cleaning duration (hours) and total cost ($).
- **Features Analyzed**:
  - Property size (Square footage - numerical, normalized)
  - Room count (numerical, normalized)
  - Service type (Standard, Office, Deep, Carpet - One-hot encoded)
  - Property dirtiness level (Light, Standard, Heavy - One-hot encoded)
- **Mathematical Inference in JS**: Scales numerical inputs dynamically using the training set's mean/standard deviation, encodes categoricals, and computes:
  $$\hat{y} = w^T x + b$$

### 2. Live Feedback Sentiment Analyzer (NLP Binary Classification)
- **Problem**: Businesses struggle to monitor customer satisfaction at scale.
- **ML Solution**: An NLP classifier using **TF-IDF (Term Frequency-Inverse Document Frequency) + Binary Logistic Regression** to analyze customer feedback in real time as they type.
- **Visuals**: Displays a dynamic sentiment badge (Positive 😊, Neutral 😐, Negative 😡) alongside a confidence bar indicating model certainty.
- **Mathematical Inference in JS**: Tokenizes input text, calculates Term Frequency, applies pre-computed Inverse Document Frequencies (IDF), computes linear weights, and evaluates the Sigmoid function:
  $$P(y=1|x) = \sigma(w^T x + b) = \frac{1}{1 + e^{-(w^T x + b)}}$$

### 3. Smart NLP Support Chatbot (Multi-Class Sentiment & Softmax)
- **Problem**: Customer service centers receive repetitive questions about bookings, prices, and support.
- **ML Solution**: A **Multi-Class Logistic Regression model** (Softmax Regression) that classifies user queries into pre-defined intents (`greeting`, `pricing`, `booking_info`, `services`, `contact`, `goodbye`).
- **Mathematical Inference in JS**: Preprocesses input query, computes TF-IDF features, evaluates scores for all classes, and applies the **Softmax function** to resolve the intent with the highest probability:
  $$P(\text{class}=c) = \frac{e^{z_c}}{\sum_{j=1}^{C} e^{z_j}}$$
- **Developer Metrics**: Outputs full probability distributions and prediction logs to the browser console.

---

## 📁 Project Architecture

```mermaid
graph TD
    subgraph Python Pipeline (Training)
        A[generate_data.py] -->|CSV Datasets| B[train_all.py]
        B -->|Train Estimator| C[train_estimator.py]
        B -->|Train Sentiment| D[train_sentiment.py]
        B -->|Train Chatbot| E[train_chatbot.py]
        C -->|Outputs weights & scale parameters| F[js/model_estimator.js]
        D -->|Outputs vocabulary & weights| G[js/model_sentiment.js]
        E -->|Outputs intents & weights| H[js/model_chatbot.js]
    end

    subgraph Client-Side Web (Inference)
        F -->|Loads constants| I[js/estimator.js]
        G -->|Loads constants| J[js/sentiment.js]
        H -->|Loads constants| K[js/chatbot.js]
        I & J & K -->|Calculates Math from Scratch| L[js/app.js & js/booking.js]
        L -->|Updates UI dynamically| M[HTML Views: Home, Booking, Feedback]
    end
```

---

## 🛠️ Python ML Training Pipeline (`ml_pipeline/`)

To view the data engineering and training script logs, head over to the [ml_pipeline](file:///C:/Users/fa931/OneDrive/Desktop/MyCleaningSystem/ml_pipeline) directory.

### Training Requirements
Install dependencies using pip:
```bash
pip install -r ml_pipeline/requirements.txt
```

### Run Training Pipeline
The master training script generates synthetic datasets, trains the models, generates performance plots, and writes output parameter arrays straight into the web application folder:
```bash
python ml_pipeline/train_all.py
```

### Models Evaluation Results
After running the pipeline, check out the generated evaluation plots inside `ml_pipeline/evaluation_plots/`:
- **`estimator_results.png`**: Actual vs. Predicted scatter plots showing model fit ($R^2$ scores).
- **`sentiment_results.png`**: Confusion matrix showing classification performance.

---

## 💻 Web App Deployment & Host
The entire web interface is constructed using standard responsive HTML5, ES6+ Javascript, and modern CSS variables.

### Local Development
To run this application locally:
1. Simply double-click `home.html` to open it in any web browser. Because the model weights are compiled as standard JavaScript constants, **you do not need to set up a local server** or worry about browser security blocking JSON fetch calls.
2. Alternatively, start a simple Python server:
   ```bash
   python -m http.server 8000
   ```
   and navigate to `http://localhost:8000/home.html`.

### Deploying to GitHub Pages (Free Hosting)
Since all machine learning models run client-side, you can host this project on GitHub Pages:
1. Initialize a git repository: `git init`
2. Push to GitHub.
3. Go to Repository **Settings** > **Pages**.
4. Choose the `main` branch and root `/` directory. Click Save.
5. Your application will be live at `https://<username>.github.io/<repo-name>/home.html`!
