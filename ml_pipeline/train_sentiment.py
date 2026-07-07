import os
import json
import re
import pandas as pd
import numpy as np
try:
    import matplotlib.pyplot as plt
    HAS_MATPLOTLIB = True
except ImportError:
    HAS_MATPLOTLIB = False
    print("Warning: matplotlib package not found. Confusion matrices will be skipped.")
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

def clean_text(text):
    text = text.lower()
    text = re.sub(r"[^a-zA-Z0-9\s]", "", text)
    return text

def train_sentiment():
    print("Training Sentiment Analysis model...")
    data_path = "ml_pipeline/sentiment_data.csv"
    if not os.path.exists(data_path):
        raise FileNotFoundError(f"Dataset not found at {data_path}. Please run generate_data.py first.")
        
    df = pd.read_csv(data_path)
    
    # Preprocess text
    df["clean_text"] = df["text"].apply(clean_text)
    
    X = df["clean_text"]
    y = df["sentiment"]
    
    # Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Vectorizer
    # We restrict vocabulary to 120 words to keep the JS footprint small and highly inspectable
    vectorizer = TfidfVectorizer(max_features=120, stop_words="english")
    X_train_vec = vectorizer.fit_transform(X_train).toarray()
    X_test_vec = vectorizer.transform(X_test).toarray()
    
    # Train Logistic Regression
    clf = LogisticRegression(C=2.0)
    clf.fit(X_train_vec, y_train)
    
    # Predict & Evaluate
    y_pred = clf.predict(X_test_vec)
    acc = accuracy_score(y_test, y_pred)
    
    print("\n--- Sentiment Model Metrics ---")
    print(f"Test Accuracy: {acc:.4f}")
    print(classification_report(y_test, y_pred, target_names=["Negative", "Positive"]))
    
    # Save Confusion Matrix plot
    if HAS_MATPLOTLIB:
        cm = confusion_matrix(y_test, y_pred)
        fig, ax = plt.subplots(figsize=(5, 5))
        ax.matshow(cm, cmap=plt.cm.Blues, alpha=0.3)
        for i in range(cm.shape[0]):
            for j in range(cm.shape[1]):
                ax.text(x=j, y=i, s=cm[i, j], va="center", ha="center", size="xx-large")
                
        plt.xlabel("Predictions", fontsize=12)
        plt.ylabel("Actuals", fontsize=12)
        plt.title(f"Confusion Matrix (Acc = {acc:.3f})", fontsize=14)
        plt.xticks([0, 1], ["Negative", "Positive"])
        plt.yticks([0, 1], ["Negative", "Positive"])
        
        os.makedirs("ml_pipeline/evaluation_plots", exist_ok=True)
        plt.savefig("ml_pipeline/evaluation_plots/sentiment_results.png", dpi=150, bbox_inches="tight")
        plt.close()
        print("Saved evaluation plots to ml_pipeline/evaluation_plots/sentiment_results.png.")
    else:
        print("Skipped saving confusion matrix plot (matplotlib missing).")
    
    # Export parameters for JS inference
    # We need:
    # 1. vocabulary mapping (word -> index)
    # 2. IDF vector (so JS can compute TF-IDF)
    # 3. Model weights (coefficients) and intercept
    
    vocab = vectorizer.vocabulary_
    idf = vectorizer.idf_.tolist()
    coefficients = clf.coef_[0].tolist()
    intercept = float(clf.intercept_[0])
    
    # Create word-to-weight and word-to-idf map for faster/simpler lookup in JS
    vocab_details = {}
    for word, idx in vocab.items():
        vocab_details[word] = {
            "index": int(idx),
            "idf": float(idf[idx]),
            "coefficient": float(coefficients[idx])
        }
        
    model_json = {
        "intercept": intercept,
        "vocabulary": vocab_details
    }
    
    os.makedirs("js", exist_ok=True)
    with open("js/model_sentiment.js", "w") as f:
        f.write("const SENTIMENT_MODEL = " + json.dumps(model_json, indent=4) + ";\n")
        
    print("\nSaved model parameters to js/model_sentiment.json.")
    print("Saved evaluation plots to ml_pipeline/evaluation_plots/sentiment_results.png.")

if __name__ == "__main__":
    train_sentiment()
