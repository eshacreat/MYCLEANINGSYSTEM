/* exported submitBookingAPI, submitFeedbackAPI */
// Mock API Module for communicating with backend cleaning servers

const API_CONFIG = {
  BASE_URL: 'https://api.mycleaningsystem.com/v1',
  TIMEOUT_MS: 3000,
};

/**
 * Mock API call to submit a cleaning booking.
 * In a real application, this sends the data to a FastAPI/Flask backend where the ML model is hosted.
 * @param {Object} bookingData - The booking details.
 * @returns {Promise<Object>} The API response.
 */
async function submitBookingAPI(bookingData) {
  console.log(`[API Mock] Sending booking data to ${API_CONFIG.BASE_URL}/bookings`, bookingData);

  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      // Mocking a successful 201 Created response
      const success = true;
      if (success) {
        resolve({
          status: 201,
          message: 'Booking created successfully',
          bookingId: 'B' + Math.floor(100000 + Math.random() * 900000),
          timestamp: new Date().toISOString(),
        });
      } else {
        _reject(new Error('API Server Connection Timeout'));
      }
    }, 800);
  });
}

/**
 * Mock API call to submit customer feedback.
 * @param {Object} feedbackData - The feedback score, comments, and inferred sentiment.
 * @returns {Promise<Object>} The API response.
 */
async function submitFeedbackAPI(feedbackData) {
  console.log(
    `[API Mock] Sending feedback analysis to ${API_CONFIG.BASE_URL}/feedback`,
    feedbackData
  );

  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve({
        status: 200,
        message: 'Feedback received and added to sentiment training pool',
        feedbackId: 'F' + Math.floor(100000 + Math.random() * 900000),
      });
    }, 600);
  });
}
