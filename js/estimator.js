/* exported runEstimatorInference */
// Client-side ML Inference for Cleaning Duration & Price Estimation
// This script runs a Ridge Regression model trained in Python, entirely in the browser.

function runEstimatorInference(squareFootage, numRooms, serviceType, dirtLevel) {
  if (typeof ESTIMATOR_MODEL === 'undefined') {
    console.warn('ML Estimator model not loaded. Using fallback calculations.');
    return runFallbackEstimation(squareFootage, numRooms, serviceType, dirtLevel);
  }

  try {
    const model = ESTIMATOR_MODEL;

    // 1. Scale numerical inputs using the training mean and standard deviation
    const sfMean = model.scaler.square_footage.mean;
    const sfStd = model.scaler.square_footage.std;
    const squareFootageScaled = (squareFootage - sfMean) / sfStd;

    const roomsMean = model.scaler.num_rooms.mean;
    const roomsStd = model.scaler.num_rooms.std;
    const numRoomsScaled = (numRooms - roomsMean) / roomsStd;

    // 2. One-hot encode categorical features matching the training feature vector order
    // Features list: ['square_footage_scaled', 'num_rooms_scaled', 'service_home', 'service_office', 'service_deep', 'service_carpet', 'dirt_light', 'dirt_standard', 'dirt_heavy']
    const featureValues = {
      square_footage_scaled: squareFootageScaled,
      num_rooms_scaled: numRoomsScaled,
      service_home: serviceType === 'home' ? 1.0 : 0.0,
      service_office: serviceType === 'office' ? 1.0 : 0.0,
      service_deep: serviceType === 'deep' ? 1.0 : 0.0,
      service_carpet: serviceType === 'carpet' ? 1.0 : 0.0,
      dirt_light: dirtLevel === 'light' ? 1.0 : 0.0,
      dirt_standard: dirtLevel === 'standard' ? 1.0 : 0.0,
      dirt_heavy: dirtLevel === 'heavy' ? 1.0 : 0.0,
    };

    // 3. Compute Dot Product: Intercept + Sum(Weight[i] * Feature[i])
    let predictedDuration = model.duration_model.intercept;
    let predictedPrice = model.price_model.intercept;

    model.features.forEach((featureName, idx) => {
      const val = featureValues[featureName] || 0.0;
      predictedDuration += model.duration_model.coefficients[idx] * val;
      predictedPrice += model.price_model.coefficients[idx] * val;
    });

    // 4. Bound outputs to realistic values
    predictedDuration = Math.max(1.0, Math.min(12.0, predictedDuration));
    predictedPrice = Math.max(30.0, Math.min(600.0, predictedPrice));

    return {
      duration: parseFloat(predictedDuration.toFixed(1)),
      price: parseFloat(predictedPrice.toFixed(2)),
      isML: true,
    };
  } catch (error) {
    console.error('Error executing ML Inference:', error);
    return runFallbackEstimation(squareFootage, numRooms, serviceType, dirtLevel);
  }
}

// Fallback rule-based calculations if model weights are unavailable
function runFallbackEstimation(squareFootage, numRooms, serviceType, dirtLevel) {
  const baseHours = 1.0 + squareFootage * 0.0015 + numRooms * 0.4;
  const serviceMultiplier = { home: 1.0, carpet: 1.2, office: 1.5, deep: 1.8 }[serviceType] || 1.0;
  const dirtMultiplier = { light: 0.8, standard: 1.0, heavy: 1.4 }[dirtLevel] || 1.0;

  let duration = baseHours * serviceMultiplier * dirtMultiplier;
  duration = Math.max(1.0, Math.min(12.0, duration));

  let price = 45.0 + duration * 22.0 + squareFootage * 0.03;
  price = Math.max(30.0, Math.min(600.0, price));

  return {
    duration: parseFloat(duration.toFixed(1)),
    price: parseFloat(price.toFixed(2)),
    isML: false,
  };
}
