import { tokenStorageName } from './constants'
/**
 * Validates that the username and password are non-empty strings.
 * @param {Object} fields - The fields to validate.
 * @returns {Object} - An object containing `isValid` and `errors` if validation fails.
 */
export const validateFields = (fields) => {
  const errors = {};
    for (const [key, value] of Object.entries(fields)) {
      if (!value || !value.trim()) {
        errors[key] = `${key} is required`;
      } else if (typeof value !== 'string') {
        errors[key] = `${key} is not a string`;
      }
    }
  return {
      isValid: Object.keys(errors).length === 0,
      errors,
  };
};

export const setToken = (token) => { localStorage.setItem(tokenStorageName, token) }
export const getToken = () => localStorage.getItem(tokenStorageName)
export const deleteToken = () => localStorage.removeItem(tokenStorageName)