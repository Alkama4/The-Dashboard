import axios from 'axios';
import qs from 'qs';
import { notify } from './notification';

const apiClient = axios.create({
    baseURL: 'http://192.168.0.2:801', // Your FastAPI base URL
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'comma' }),
});

const api = {
    // Data requested from the api
    async getData(endpoint) {
        try {
            const response = await apiClient.get(endpoint);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            notify('Error fetching data: ' + error.message, 'error', 5000);
        }
    },
    async getTransactions(params = {}) {
        try {
            console.info('Fetching transactions with params:', params);
            const response = await apiClient.get('/get_transactions', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching transactions:', error);
            notify('Error fetching transactions: ' + error.message, 'error', 5000);
        }
    },
    async getOptions() {
        return this.getData('/get_options');
    },
    async getFilters() {
        return this.getData('/get_filters');
    },

    // Data sent to the api
    async postData(endpoint, data) {
        try {
            const response = await apiClient.post(endpoint, data);
            return response.data;
        } catch (error) {
            console.error('Error posting data:', error);
            notify('Error posting data: ' + error.message, 'error', 5000);
        }
    },

};

export default api;