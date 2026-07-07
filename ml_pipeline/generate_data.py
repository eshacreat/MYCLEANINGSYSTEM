import os
import csv
import random
import math

# Ensure target directories exist
os.makedirs("ml_pipeline/evaluation_plots", exist_ok=True)

def generate_cleaning_data():
    print("Generating cleaning dataset (Pure Python)...")
    random.seed(42)
    n_samples = 1500

    headers = ["square_footage", "num_rooms", "service_type", "dirt_level", "duration_hours", "price_usd"]
    
    rows = []
    service_types = ["home", "office", "deep", "carpet"]
    dirt_levels = ["light", "standard", "heavy"]
    
    service_map = {"home": 0.0, "carpet": 0.8, "office": 1.5, "deep": 2.8}
    dirt_map = {"light": -0.5, "standard": 0.5, "heavy": 2.0}
    service_price_premium = {"home": 0, "carpet": 15, "office": 40, "deep": 60}

    for _ in range(n_samples):
        # Generate Features
        square_footage = random.randint(400, 5000)
        # Rooms count roughly correlates to square footage
        base_rooms = square_footage / 800 + random.randint(1, 3)
        num_rooms = max(1, min(10, round(base_rooms)))
        
        service_type = random.choice(service_types)
        dirt_level = random.choice(dirt_levels)

        # Generate Duration target with normal-like random noise
        noise_duration = random.gauss(0, 0.3)
        duration_hours = (1.0 + 
                          0.0015 * square_footage + 
                          0.4 * num_rooms + 
                          service_map[service_type] + 
                          dirt_map[dirt_level] + 
                          noise_duration)
        duration_hours = max(1.0, min(12.0, duration_hours))
        duration_hours = round(duration_hours, 1)

        # Generate Price target with noise
        noise_price = random.gauss(0, 10)
        price_usd = (45.0 + 
                     22.0 * duration_hours + 
                     0.03 * square_footage + 
                     service_price_premium[service_type] + 
                     noise_price)
        price_usd = max(30.0, min(600.0, price_usd))
        price_usd = round(price_usd, 2)

        rows.append([square_footage, num_rooms, service_type, dirt_level, duration_hours, price_usd])

    with open("ml_pipeline/cleaning_data.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(headers)
        writer.writerows(rows)
        
    print("Saved cleaning_data.csv containing 1500 samples.")

def generate_sentiment_data():
    print("Generating sentiment dataset (Pure Python)...")
    
    positive_phrases = [
        "The house looks absolutely stunning, thank you!",
        "Excellent service, the cleaners were very polite and fast.",
        "Best cleaning company in town! Highly recommend.",
        "They did a fantastic job on the kitchen, it shines.",
        "Very professional staff, they arrived right on time.",
        "Super clean rooms, will definitely book again next week.",
        "Wonderful experience, standard cleaning exceeded my expectations.",
        "Highly impressed with the attention to detail.",
        "The carpets look brand new! Amazing job.",
        "Great customer support and high quality cleaning.",
        "Cleaned the office perfectly. Very satisfied customer.",
        "Friendly cleaners and very fast service.",
        "Cleaned spots I didn't think could be cleaned!",
        "Very thorough work, and the price is very reasonable.",
        "Breezed through the deep cleaning, highly skilled team.",
        "Extremely happy with the result, worth every penny.",
        "Smells so fresh and clean! Wonderful work.",
        "Reliable, trustworthy, and efficient cleaning service.",
        "They left my bathroom sparkling clean. Thank you!",
        "Wonderful, friendly, and did an outstanding job."
    ] * 15 # duplicate to get more samples
    
    negative_phrases = [
        "Terrible experience, they arrived 2 hours late without notice.",
        "They missed several spots in the living room and kitchen.",
        "Worst cleaning service ever. Very unprofessional behavior.",
        "The house was still dirty after they left. Disappointed.",
        "They damaged a vase and refused to take responsibility.",
        "Extremely slow, it took them 6 hours for a tiny apartment.",
        "Way too expensive for such a poor quality cleaning job.",
        "The staff was very rude and did a sloppy job.",
        "Did not clean the carpets properly, still dirty.",
        "Poor communication and terrible service overall.",
        "They left trash behind. Unbelievable.",
        "I paid for deep cleaning but got a basic wipe down.",
        "Cleaners left early and did not finish the job.",
        "Smells weird after they left, did not like the chemicals.",
        "Horrible service. Arrived late and did a terrible job.",
        "The bathroom was barely touched. Unacceptable.",
        "Waste of money, they did a very sloppy job.",
        "They ignored my cleaning instructions completely.",
        "Not worth the price. Underwhelming cleaning quality.",
        "Terrible customer service, they hung up on my complaint."
    ] * 15

    rows = []
    for p in positive_phrases:
        rows.append([p, 1]) # Positive
    for p in negative_phrases:
        rows.append([p, 0]) # Negative

    # Shuffle dataset
    random.seed(42)
    random.shuffle(rows)

    with open("ml_pipeline/sentiment_data.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["text", "sentiment"])
        writer.writerows(rows)
        
    print("Saved sentiment_data.csv containing", len(rows), "samples.")

if __name__ == "__main__":
    generate_cleaning_data()
    generate_sentiment_data()
