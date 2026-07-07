import time
from generate_data import generate_cleaning_data, generate_sentiment_data
from train_estimator import train_estimator
from train_sentiment import train_sentiment
from train_chatbot import train_chatbot

def main():
    print("==================================================")
    print("🚀 Starting MyCleaningSystem ML Pipeline 🚀")
    print("==================================================")
    start_time = time.time()
    
    # 1. Generate datasets
    generate_cleaning_data()
    generate_sentiment_data()
    print("\n--------------------------------------------------")
    
    # 2. Train Price/Duration Estimator
    train_estimator()
    print("\n--------------------------------------------------")
    
    # 3. Train Sentiment Classifier
    train_sentiment()
    print("\n--------------------------------------------------")
    
    # 4. Train Chatbot Intent Classifier
    train_chatbot()
    
    elapsed = time.time() - start_time
    print("==================================================")
    print(f"🎉 ML Pipeline Completed Successfully in {elapsed:.2f}s! 🎉")
    print("exported models are ready for client-side JS use.")
    print("==================================================")

if __name__ == "__main__":
    main()
