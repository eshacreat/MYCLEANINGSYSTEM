import os
import csv
import json
import random

def get_mean_std(values):
    n = len(values)
    if n == 0:
        return 0.0, 1.0
    mean = sum(values) / n
    variance = sum((x - mean) ** 2 for x in values) / n
    std = variance ** 0.5
    if std == 0.0:
        std = 1.0  # Avoid division by zero
    return mean, std

def evaluate_metrics(y_true, y_pred):
    n = len(y_true)
    mae = sum(abs(t - p) for t, p in zip(y_true, y_pred)) / n
    mse = sum((t - p) ** 2 for t, p in zip(y_true, y_pred)) / n
    rmse = mse ** 0.5
    
    # Calculate R2 Score
    mean_y = sum(y_true) / n
    ss_tot = sum((y - mean_y) ** 2 for y in y_true)
    ss_res = sum((t - p) ** 2 for t, p in zip(y_true, y_pred))
    r2 = 1.0 - (ss_res / ss_tot) if ss_tot != 0 else 0.0
    
    return r2, mae, rmse

def train_ridge_regression(X_train, y_train, epochs=800, lr=0.03, alpha=0.1):
    n_samples = len(X_train)
    n_features = len(X_train[0])
    
    # Initialize weights and intercept to 0
    w = [0.0] * n_features
    b = 0.0
    
    for epoch in range(epochs):
        # Compute predictions
        y_pred = []
        for x in X_train:
            pred = b + sum(x_i * w_i for x_i, w_i in zip(x, w))
            y_pred.append(pred)
            
        # Calculate gradients
        dw = [0.0] * n_features
        db = 0.0
        
        for idx in range(n_samples):
            error = y_pred[idx] - y_train[idx]
            db += error
            for f in range(n_features):
                dw[f] += error * X_train[idx][f]
                
        # Average and apply L2 regularization penalty
        db = db / n_samples
        for f in range(n_features):
            dw[f] = (dw[f] / n_samples) + (alpha * w[f])
            
        # Update parameters
        b -= lr * db
        for f in range(n_features):
            w[f] -= lr * dw[f]
            
    return w, b

def train_estimator():
    print("Training Estimator model (Pure Python)...")
    data_path = "ml_pipeline/cleaning_data.csv"
    if not os.path.exists(data_path):
        raise FileNotFoundError(f"Dataset not found at {data_path}. Please run generate_data.py first.")
        
    # 1. Read CSV
    square_footage_list = []
    num_rooms_list = []
    service_type_list = []
    dirt_level_list = []
    duration_hours_list = []
    price_usd_list = []
    
    with open(data_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            square_footage_list.append(float(row["square_footage"]))
            num_rooms_list.append(float(row["num_rooms"]))
            service_type_list.append(row["service_type"])
            dirt_level_list.append(row["dirt_level"])
            duration_hours_list.append(float(row["duration_hours"]))
            price_usd_list.append(float(row["price_usd"]))
            
    n_samples = len(square_footage_list)
    
    # 2. Scaling Parameters
    sf_mean, sf_std = get_mean_std(square_footage_list)
    rooms_mean, rooms_std = get_mean_std(num_rooms_list)
    
    scaler_params = {
        "square_footage": {"mean": sf_mean, "std": sf_std},
        "num_rooms": {"mean": rooms_mean, "std": rooms_std}
    }
    
    # 3. One-hot encoding & Feature compilation
    service_categories = ["home", "office", "deep", "carpet"]
    dirt_categories = ["light", "standard", "heavy"]
    
    encoded_features = [
        "square_footage_scaled", "num_rooms_scaled",
        "service_home", "service_office", "service_deep", "service_carpet",
        "dirt_light", "dirt_standard", "dirt_heavy"
    ]
    
    X = []
    for i in range(n_samples):
        # Scale numeric features
        sf_scaled = (square_footage_list[i] - sf_mean) / sf_std
        rooms_scaled = (num_rooms_list[i] - rooms_mean) / rooms_std
        
        # One-hot encodes
        svc_home = 1.0 if service_type_list[i] == "home" else 0.0
        svc_office = 1.0 if service_type_list[i] == "office" else 0.0
        svc_deep = 1.0 if service_type_list[i] == "deep" else 0.0
        svc_carpet = 1.0 if service_type_list[i] == "carpet" else 0.0
        
        dt_light = 1.0 if dirt_level_list[i] == "light" else 0.0
        dt_standard = 1.0 if dirt_level_list[i] == "standard" else 0.0
        dt_heavy = 1.0 if dirt_level_list[i] == "heavy" else 0.0
        
        row_feat = [
            sf_scaled, rooms_scaled,
            svc_home, svc_office, svc_deep, svc_carpet,
            dt_light, dt_standard, dt_heavy
        ]
        X.append(row_feat)
        
    # 4. Train-Test Split (80% Train, 20% Test)
    # Generate shuffled indices
    random.seed(42)
    indices = list(range(n_samples))
    random.shuffle(indices)
    
    split = int(n_samples * 0.8)
    train_idx = indices[:split]
    test_idx = indices[split:]
    
    X_train = [X[i] for i in train_idx]
    X_test = [X[i] for i in test_idx]
    
    y_dur_train = [duration_hours_list[i] for i in train_idx]
    y_dur_test = [duration_hours_list[i] for i in test_idx]
    
    y_pr_train = [price_usd_list[i] for i in train_idx]
    y_pr_test = [price_usd_list[i] for i in test_idx]
    
    # 5. Train Ridge Models via Gradient Descent
    dur_weights, dur_intercept = train_ridge_regression(X_train, y_dur_train, epochs=1000, lr=0.05, alpha=0.01)
    pr_weights, pr_intercept = train_ridge_regression(X_train, y_pr_train, epochs=1000, lr=0.05, alpha=0.01)
    
    # 6. Evaluate on Test Split
    dur_pred = [dur_intercept + sum(x_i * w_i for x_i, w_i in zip(x, dur_weights)) for x in X_test]
    pr_pred = [pr_intercept + sum(x_i * w_i for x_i, w_i in zip(x, pr_weights)) for x in X_test]
    
    dur_r2, dur_mae, dur_rmse = evaluate_metrics(y_dur_test, dur_pred)
    pr_r2, pr_mae, pr_rmse = evaluate_metrics(y_pr_test, pr_pred)
    
    print("\n--- Duration Model Metrics ---")
    print(f"R² Score: {dur_r2:.4f}")
    print(f"Mean Absolute Error: {dur_mae:.2f} hours")
    print(f"Root Mean Squared Error: {dur_rmse:.2f} hours")
    
    print("\n--- Price Model Metrics ---")
    print(f"R² Score: {pr_r2:.4f}")
    print(f"Mean Absolute Error: ${pr_mae:.2f}")
    print(f"Root Mean Squared Error: ${pr_rmse:.2f}")
    
    # 7. Export Model parameters as a JavaScript script
    model_json = {
        "features": encoded_features,
        "scaler": scaler_params,
        "duration_model": {
            "coefficients": dur_weights,
            "intercept": float(dur_intercept)
        },
        "price_model": {
            "coefficients": pr_weights,
            "intercept": float(pr_intercept)
        }
    }
    
    os.makedirs("js", exist_ok=True)
    with open("js/model_estimator.js", "w", encoding="utf-8") as f:
        f.write("const ESTIMATOR_MODEL = " + json.dumps(model_json, indent=4) + ";\n")
        
    print("\nSaved model weights to js/model_estimator.js.")

if __name__ == "__main__":
    train_estimator()
