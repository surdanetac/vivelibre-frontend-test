import axios from 'axios';
import { postLoginEndpoint, getProductsListEndpoint } from './constants'
import { setToken } from './utils'

const axiosInstance = axios.create({
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
        })
        return response
    } catch (error) {
        console.error('Error en fetchService:', error.response || error.message)
        throw error.response ? error.response.data : error.message
    }
}

/**
 * Specific service for user login
 * @param {string} username - Username.
 * @param {string} password - User password.
 * @returns {Promise<any>} - JSON response with authentication data.
 */
export const loginService = async (username, password) => {
    try {
        const response = await fetchService(postLoginEndpoint, 'POST', { username, password })
        if (response.status === 200) {
            setToken(response.data.token)
            return { status: response.status }
        } else {
            throw { status: response.status }
        }
    }
    catch {
        throw error.response ? error.response.data : error.message
    }
}

/**
 * Fetches the list of products from the API.
 * @returns {Promise<any>} - A promise that resolves with the list of products.
 */
export const fetchProducts = async () => {
    try {
        return await fetchService(getProductsListEndpoint, 'GET')
    } catch (error) {
        throw error.response ? error.response.data : error.message
    }
}
