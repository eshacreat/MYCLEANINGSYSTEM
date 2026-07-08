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

⏱️ Cleaning Duration Estimation: Accurately estimates time requirements to optimize schedule planning.

🎭 Customer Sentiment Analysis: Runs real-time text analysis on customer reviews using an in-browser TF-IDF and classification pipeline.

💬 Intent-Based AI Chatbot: Provides instant customer support and handles common queries locally.

🔒 100% Client-Side Architecture: No data leaves the user's browser, ensuring absolute data privacy and zero server overhead.

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

🚀 Future Roadmap
[ ] Advanced NLP: Integrate lightweight ONNX Runtime Web or TensorFlow.js models for more nuanced chatbot conversations.

[ ] Dynamic Booking System: Allow users to seamlessly transition from cost estimation to scheduling.

[ ] Persistent State: Implement local storage or lightweight authentication to save user history.

👩‍💻 Author
Esha Naveed

Software Engineering Student passionate about AI, Machine Learning, and building efficient, intelligent web applications.
