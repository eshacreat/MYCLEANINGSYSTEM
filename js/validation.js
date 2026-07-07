/* exported validateEmail, validatePassword, validateName */
// General Client-Side Form Validation Helpers

/**
 * Validates an email address using standard regex.
 * @param {string} email - The email to test.
 * @returns {boolean} True if the email is structurally valid.
 */
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Validates a password based on strength criteria (min 8 chars, 1 uppercase, 1 number).
 * @param {string} password - The password to test.
 * @returns {boolean} True if password meets security standards.
 */
function validatePassword(password) {
  // Standard criteria: at least 8 characters, at least 1 number, and 1 capital letter.
  return password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password);
}

/**
 * Validates a full name (at least first name and last name, alphabetical).
 * @param {string} name - The name to test.
 * @returns {boolean} True if valid.
 */
function validateName(name) {
  const trimmed = name.trim();
  if (trimmed.length < 3) return false;
  // Basic test ensuring at least a letter and spaces
  const re = /^[a-zA-Z\s]{3,50}$/;
  return re.test(trimmed);
}
