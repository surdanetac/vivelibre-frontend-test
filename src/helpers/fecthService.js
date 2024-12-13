import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Generic service for making HTTP requests using Axios
 * @param {string} endpoint - Endpoint relative to the base URL.
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE, etc.).
 * @param {Object} data - Request body data (optional).
 * @returns {Promise<any>} - JSON response from the server.
 */
export const fetchService = async (endpoint, method = 'GET', data = null) => {
    try {
        const response = await axiosInstance({
            url: endpoint,
            method,
            data,
        });
        return response.data;
    } catch (error) {
        console.error('Error en fetchService:', error.response || error.message);
        throw error.response ? error.response.data : error.message;
    }
};

/**
 * Specific service for user login
 * @param {string} username - Username.
 * @param {string} password - User password.
 * @returns {Promise<any>} - JSON response with authentication data.
 */
export const loginService = (username, password) => {
    return fetchService('/auth/login', 'POST', { username, password });
};