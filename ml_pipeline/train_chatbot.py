import os
import json
import re
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

def clean_text(text):
    text = text.lower()
    text = re.sub(r"[^a-zA-Z0-9\s]", "", text)
    return text

def train_chatbot():
    print("Training NLP Chatbot intent classifier...")
    
    # Define training sentences for intent classification
    training_data = {
        "greeting": [
            "hello", "hi", "hey", "good morning", "is anyone there", 
            "hello cleaning system", "hey there", "greetings", "hi team"
        ],
        "pricing": [
            "how much is it", "pricing", "cost of cleaning", "hourly rate",
            "what is the price", "booking rates", "how much do you charge",
            "estimate cost", "standard pricing", "cheap cleaning"
        ],
        "booking_info": [
            "how to book", "make an appointment", "reservation", "schedule service",
            "i want to book", "how can i schedule", "make booking", "start order"
        ],
        "services": [
            "what services do you offer", "list of services", "types of cleaning",
            "deep cleaning", "carpet cleaning", "office cleaning", "house cleaning",
            "commercial cleaning", "what can you clean"
        ],
        "contact": [
            "phone number", "email address", "contact details", "customer support",
            "how to contact", "call you", "where is your office", "help desk"
        ],
        "goodbye": [
            "bye", "goodbye", "thanks bye", "thank you", "see you later",
            "no more questions", "thanks for help", "awesome thank you"
        ]
    }
    
    # Flatten data
    texts = []
    labels = []
    for label, phrases in training_data.items():
        for phrase in phrases:
            texts.append(clean_text(phrase))
            labels.append(label)
            
    df = pd.DataFrame({"text": texts, "label": labels})
    
    # Vectorizer (limit vocabulary to keep it lightweight)
    vectorizer = TfidfVectorizer(max_features=80, stop_words="english")
    X_vec = vectorizer.fit_transform(df["text"]).toarray()
    
    # Train Multi-Class Logistic Regression (Softmax Regression)
    # multi_class='multinomial' uses cross-entropy loss (softmax)
    # Some scikit-learn builds (or very old versions) may not accept the
    # `multi_class` keyword; attempt to create the estimator and fall back
    # to a compatible signature if needed.
    try:
        clf = LogisticRegression(multi_class="multinomial", solver="lbfgs", C=5.0)
    except TypeError:
        # Fallback for environments where 'multi_class' isn't accepted
        clf = LogisticRegression(solver="lbfgs", C=5.0)
    clf.fit(X_vec, df["label"])
    
    print(f"Chatbot train accuracy: {clf.score(X_vec, df['label']):.4f}")
    
    # Export parameters:
    # 1. classes (labels)
    # 2. vocabulary (word -> index)
    # 3. IDF vector
    # 4. Coefficients per class
    # 5. Intercept per class
    
    classes = clf.classes_.tolist()
    vocab = vectorizer.vocabulary_
    idf = vectorizer.idf_.tolist()

    # coefficients shape: (num_classes, num_features)
    coefficients = clf.coef_.tolist()
    # intercepts shape: (num_classes,)
    intercepts = clf.intercept_.tolist()

    # Ensure all numeric types are native Python types for JSON serialization
    vocab_serialized = {str(k): int(v) for k, v in vocab.items()}
    idf_serialized = [float(x) for x in idf]
    coefficients_serialized = [[float(v) for v in row] for row in coefficients]
    intercepts_serialized = [float(x) for x in intercepts]
    
    # Define chatbot response templates
    response_templates = {
        "greeting": "Hello! I am your AI assistant. How can I help you clean your home or office today?",
        "pricing": "Our standard residential cleaning starts at $45/hour. You can get an accurate AI-powered estimation by clicking the **Booking** tab!",
        "booking_info": "You can schedule a cleaning service directly on our **Booking** page. It's a quick, automated multi-step process!",
        "services": "We offer Standard Home Cleaning, Deep Cleaning, Office/Commercial Cleaning, and specialized Carpet Cleaning services.",
        "contact": "You can call our support hotline at +1 (555) 019-9231 or email us at support@mycleaningsystem.com.",
        "goodbye": "Thank you for visiting MyCleaningSystem! Have a clean, beautiful day! 😊"
    }
    
    # Construct JSON structure
    model_json = {
        "classes": classes,
        "vocabulary": vocab_serialized,
        "idf": idf_serialized,
        "coefficients": coefficients_serialized,
        "intercepts": intercepts_serialized,
        "responses": response_templates
    }
    
    os.makedirs("js", exist_ok=True)
    with open("js/model_chatbot.js", "w") as f:
        f.write("const CHATBOT_MODEL = " + json.dumps(model_json, indent=4) + ";\n")
        
    print("\nSaved model parameters to js/model_chatbot.json.")

if __name__ == "__main__":
    train_chatbot()
