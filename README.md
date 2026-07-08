# ✨ ShineSystem AI
An AI-powered, serverless cleaning service web application that predicts service costs, estimates cleaning durations, analyzes feedback sentiment, and provides automated chatbot assistance—running entirely inside the browser.

📱 Preview
Tech Aesthetic: Built with a sleek, responsive, and high-contrast user interface designed for seamless user interaction.
<img width="1347" height="654" alt="WhatsApp Image 2026-07-08 at 10 31 11 AM" src="https://github.com/user-attachments/assets/3adc401d-1a7e-450a-9306-24a054ee4c40" />





💡 Why I Built This
The goal of this project was to challenge the traditional backend-dependent architecture of Machine Learning applications. Instead of relying on heavy cloud APIs or server infrastructure, ShineSystem AI handles everything on the client side.

By exporting trained Python models into native JavaScript inference, the application remains incredibly lightweight, highly private, fast, and completely free to host.

⚡ Features
📊 AI Cleaning Cost Prediction: Utilizes regression modeling to instantly calculate service costs based on property size and specific requirements.
<img width="1366" height="634" alt="WhatsApp Image 2026-07-08 at 10 48 08 AM" src="https://github.com/user-attachments/assets/f6ccb61f-66f1-4410-92c6-ac20152ad618" />


⏱️ Cleaning Duration Estimation: Accurately estimates time requirements to optimize schedule planning.

🎭 Customer Sentiment Analysis: Runs real-time text analysis on customer reviews using an in-browser TF-IDF and classification pipeline.

💬 Intent-Based AI Chatbot: Provides instant customer support and handles common queries locally.
<img width="369" height="436" alt="WhatsApp Image 2026-07-08 at 10 48 53 AM" src="https://github.com/user-attachments/assets/353a6d2b-ac99-4223-90de-b7db78c0d75d" />

🔒 100% Client-Side Architecture: No data leaves the user's browser, ensuring absolute data privacy and zero server overhead.

⚙️ How It Works
The core architecture relies on standalone JavaScript files that store pre-trained model parameters (coefficients, intercepts, and vocabulary weights) exported directly from Python.
<img width="1350" height="616" alt="WhatsApp Image 2026-07-08 at 10 49 30 AM" src="https://github.com/user-attachments/assets/52eb5532-1e0e-4088-90de-a75d1afa3a21" />


📈 Estimator: Loads model weights from model_estimator.js, applies MinMax scaling to numeric inputs, performs manual one-hot encoding on categorical data, and computes a linear prediction natively in the browser.

🎭 Sentiment Analysis: Tokenizes feedback text, converts it into standard TF-IDF features using an in-browser vocabulary mapping, applies logistic regression weights, and returns a positive/negative probability score.

💬 Chatbot: Vectorizes user input on the fly, applies a lightweight intent classification matrix from model_chatbot.js, and maps the highest-confidence token to a predefined response array.

🛠️ Tech Stack
Machine Learning (Training Pipeline)
Python & NumPy: For data preprocessing and feature engineering.

Scikit-Learn: Used to train the underlying models (Ridge Regression for costs, Logistic Regression for sentiment, and TF-IDF Vectorization for text processing).

Frontend & Inference (Deployment)
Vanilla HTML5 & CSS3: For a modern, clean, and highly responsive user interface.

JavaScript (ES6+): For state management, UI logic, and running the exported model weights and mathematical formulas directly in the browser.

🧠 What I Learned & Engineering Insights
Cross-Language Model Migration: Mastered the process of extracting model coefficients, intercepts, and vocabulary weights from Python's Scikit-Learn and re-implementing the matrix mathematics natively in JavaScript.

Client-Side Feature Preprocessing: Recreated a text tokenization and TF-IDF vectorizer from scratch in JavaScript to ensure user input matched the model's expected training features.

Serverless Deployment: Eliminated backend maintenance and API latency, achieving instantaneous, offline-capable ML inference.

⚠️ Current Limitations
Because this is a completely serverless, client-side proof of concept, it operates with the following constraints:

Synthetic Data Training: The underlying ML models are lightweight and trained on small datasets; predictions may vary or show higher variance when exposed to highly irregular, real-world cleaning requests.

Intent Scope: The chatbot's intent handling relies on basic vector matching and is designed for standard customer queries; it does not process complex, multi-turn, or out-of-domain phrases.

Ephemeral State: No database backend or authenticated user sessions are implemented. All data processing and application states are completely browser-local and reset upon refresh.

🚀 Future Roadmap
[ ] Advanced NLP: Integrate lightweight ONNX Runtime Web or TensorFlow.js models for more nuanced chatbot conversations.

[ ] Dynamic Booking System: Allow users to seamlessly transition from cost estimation to scheduling.

[ ] Persistent State: Implement local storage or lightweight authentication to save user history.

👩‍💻 Author
Esha Naveed

Software Engineering Student passionate about AI, Machine Learning, and building efficient, intelligent web applications.
