import axios from 'axios';
import qs from 'qs';
import { notify } from './notification';

const apiClient = axios.create({
    baseURL: 'http://192.168.0.2:801', // Your FastAPI base URL
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'comma' }),
});

const api = {
    // GET request to the API
    async getData(endpoint, params = {}) {
        try {
            const response = await apiClient.get(endpoint, { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            notify('Error fetching data: ' + error.message, 'error', 5000);
        }
    },
    async getTransactions(params = {}) {
        params.session_key = localStorage.getItem('sessionKey');    // Get the session key from local storage
        console.info('Fetching transactions with params:', params);
        return this.getData('/get_transactions', params);
    },
    async getOptions() {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');    // Get the session key from local storage
        console.log('Fetching options with params:', params);
        return this.getData('/get_options', params);
    },
    async getFilters() {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');    // Get the session key from local storage
        console.log('Fetching filters with params:', params);
        return this.getData('/get_filters', params);
    },

    // POST request to the API
    async postData(endpoint, data) {
        try {
            const response = await apiClient.post(endpoint, data);
            return response.data;
        } catch (error) {
            console.error('Error posting data:', error);
            notify('Error posting data: ' + error.message, 'error', 5000);
        }
    },
    async logIn(params = {}) {
        // Set the previous session key if it exists
        params.previousSessionKey = localStorage.getItem('sessionKey');
        // console.info('Logging in with params:', params);
        
        const response = await apiClient.post('/login', null, { params });
        if (response && response.data) {
            if (response.data.loginStatus == "success") {
                notify("Logged in successfully!", "success");
                console.log("[dataQuery] login success");
                localStorage.setItem('sessionKey', response.data.sessionKey);
                return true;
            } else if (response.data.loginStatus == "warning") {
                notify(response.data.statusMessage, "warning");
                return true;
            } else if (response.data.loginStatus == "error") {
                notify("Failed to log in: " + response.data.statusMessage, "error");
                return false;
            } else {
                notify("Failed to log in.", "error");
                console.error("[dataQuery] unknown response.loginStatus");
                return false;
            }
        } else {
            notify("Failed to log in.", "error");
            console.error("[dataQuery] response && response.loginStatus failed");
            return false;
        }
        // console.log("[dataQuery] login response: ", response.data);
        // Show what is in the local storage
        // console.log("[dataQuery] localStorage session key: ", localStorage.getItem('sessionKey'));
        
        // return response.data;
    },
    async getLoginStatus() {
        let params = {};
        params.sessionKey = localStorage.getItem('sessionKey');
        console.log("[dataQuery] getting login status");
    
        if (params.sessionKey != null) {  // Check if sessionKey is not null
            const response = await apiClient.post('/get_login_status', null, { params });
            if (response && response.data) {
                if (response.data.loggedIn === true) {  // Use strict equality for comparison
                    console.log("[dataQuery] logged in as", response.data.username);
                    return { loggedIn: true, username: response.data.username };
                } else {
                    console.log("[dataQuery] not logged in");
                    return { loggedIn: false };
                }
            }
        } else {
            console.log("[dataQuery] no session key");
            return { loggedIn: false };
        }
    },    
    async logOut() {
        console.log("[dataQuery] logging out");
        let params = {};
        params.sessionKey = localStorage.getItem('sessionKey');
        const response = await apiClient.post('/logout', null, { params });
        if (response && response.data) {
            if (response.data.logOutSuccess == true) {
                notify("Logged out successfully!", "info");
                console.log("[dataQuery] logout success");
                localStorage.removeItem('sessionKey');
                return true;
            } else {
                notify("Failed to log out.", "error");
                console.error("[dataQuery] logOutSuccess == false");
                return false;
            }
        } else {
            notify("Failed to log out.", "error");
            console.error("[dataQuery] response && response.data failed");
        }
        return null;
    },
};

export default api;