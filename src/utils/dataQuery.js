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
    // - - - - - - GET request to the API - - - - - - 
    async getData(endpoint, params = {}) {
        const startTime = performance.now();  // Start the timer
        try {
            const response = await apiClient.get(endpoint, { params });
            const endTime = performance.now();  // End the timer
            const duration = endTime - startTime;  // Calculate the duration
            console.log(`[Response time] "${endpoint}" | ${duration.toFixed(2)}ms`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            notify('Error fetching data: ' + error.message, 'error', 5000);
        }
    },    
    async getTransactions(params = {}) {
        params.session_key = localStorage.getItem('sessionKey');    // Get the session key from local storage
        // console.info('Fetching transactions with params:', params);
        return this.getData('/get_transactions', params);
    },
    async getOptions() {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');    // Get the session key from local storage
        // console.log('Fetching options with params:', params);
        return this.getData('/get_options', params);
    },
    async getFilters() {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');    // Get the session key from local storage
        // console.log('Fetching filters with params:', params);
        return this.getData('/get_filters', params);
    },


    // - - - - - - POST request to the API - - - - - - 
    async postData(endpoint, data, config = {}) {
        const startTime = performance.now();  // Start the timer
        try {
            const response = await apiClient.post(endpoint, data, config);
            const endTime = performance.now();  // End the timer
            const duration = endTime - startTime;  // Calculate the duration
            console.log(`[Response time] "${endpoint}" | ${duration.toFixed(2)}ms`);
            return response.data;
        } catch (error) {
            console.error('Error posting data:', error);
            notify('Error posting data: ' + error.message, 'error', 5000);
            return null;
        }
    },    
    async logIn(params = {}) {
        params.previousSessionKey = localStorage.getItem('sessionKey');
        const response = await this.postData('/login', null, { params });
        if (response) {
            if (response.loginStatus === "success") {
                notify("Logged in successfully!", "success");
                console.log("[logIn] login success");
                localStorage.setItem('sessionKey', response.sessionKey);
                return true;
            } else if (response.loginStatus === "warning") {
                notify(response.statusMessage, "warning");
                return true;
            } else if (response.loginStatus === "error") {
                notify("Failed to log in: " + response.statusMessage, "error");
                return false;
            } else {
                notify("Failed to log in.", "error");
                console.error("[logIn] unknown response.loginStatus");
                return false;
            }
        } else {
            notify("Failed to log in.", "error");
            console.error("[logIn] response failed");
            return false;
        }
    },
    async getLoginStatus() {
        const sessionKey = localStorage.getItem('sessionKey');
        if (sessionKey) {
            const response = await this.postData('/get_login_status', null, { params: { sessionKey } });
            if (response) {
                if (response.loggedIn) {
                    console.log("[getLoginStatus] logged in as", response.username);
                    return { loggedIn: true, username: response.username };
                } else {
                    console.log("[getLoginStatus] not logged in");
                    return { loggedIn: false };
                }
            }
        } else {
            console.log("[getLoginStatus] no session key");
        }
        return { loggedIn: false };
    },
    async logOut() {
        const sessionKey = localStorage.getItem('sessionKey');
        const response = await this.postData('/logout', null, { params: { sessionKey } });
        if (response) {
            if (response.logOutSuccess) {
                notify("You have been logged out.", "info");
                console.log("[logOut] logout success");
                localStorage.removeItem('sessionKey');
                return true;
            } else {
                notify("Failed to log out.", "error");
                console.error("[logOut] logOutSuccess == false");
                return false;
            }
        } else {
            notify("Failed to log out.", "error");
            console.error("[logOut] response failed");
            return null;
        }
    },
    async newTransaction(transactionData) {
        const sessionKey = localStorage.getItem('sessionKey');
        transactionData.session_key = sessionKey;
        // console.log('[newTransaction] Creating new transaction with data:', transactionData);
        const response = await this.postData('/new_transaction', transactionData, null);
        if (response) {
            if (response.newTransactionSuccess) {
                notify("New transaction created!", "success");
                console.log("[newTransaction] new transaction success");
                return true;
            } else {
                notify("Failed to create new transaction.", "error");
                console.error("[newTransaction] newTransactionSuccess == false");
                return false;
            }
        } else {
            notify("Failed to create new transaction.", "error");
            console.error("[newTransaction] response failed");
            return null;
        }
    },
    async editTransaction(transactionData) {
        const sessionKey = localStorage.getItem('sessionKey');
        transactionData.session_key = sessionKey;
        // console.log('[editTransaction] Editing transaction with data:', transactionData);
        const response = await this.postData('/edit_transaction', transactionData, null);
        if (response) {
            if (response.editTransactionSuccess) {
                notify("Transaction edited successfully!", "success");
                console.log("[editTransaction] edit success");
                return true;
            } else {
                notify("Failed to edit transaction.", "error");
                console.error("[editTransaction] editTransactionSuccess == false");
                return false;
            }
        } else {
            notify("Failed to edit transaction.", "error");
            console.error("[editTransaction] response failed");
            return null;
        }
    },
    async deleteTransaction(transactionId) {
        const sessionKey = localStorage.getItem('sessionKey');
        console.log('[deleteTransaction] Deleting transaction with ID:', transactionId);
        const response = await this.postData('/delete_transaction', { session_key: sessionKey, transactionID: transactionId }, null);
        if (response) {
            if (response.deleteTransactionSuccess) {
                notify("Transaction deleted successfully!", "success");
                console.log("[deleteTransaction] delete success");
                return true;
            } else {
                notify("Failed to delete transaction.", "error");
                console.error("[deleteTransaction] deleteTransactionSuccess == false");
                return false;
            }
        } else {
            notify("Failed to delete transaction.", "error");
            console.error("[deleteTransaction] response failed");
            return null;
        }
    },
    async getChartBalanceOverTime() {
        const sessionKey = localStorage.getItem('sessionKey');
        const initialBalance = localStorage.getItem('chart1StartingPosition');
        const response = await this.postData('/get_chart/balance_over_time', { session_key: sessionKey, initial_balance: initialBalance }, null);
        if (response) {
            return response;
        } else {
            console.error("[getChartBalanceOverTime] response failed:", response);
            return null;
        }
    },
    async getChartSumByMonth() {
        const sessionKey = localStorage.getItem('sessionKey');
        const response = await this.postData('/get_chart/sum_by_month', { session_key: sessionKey }, null);
        if (response) {
            return response;
        } else {
            console.error("[getChartSumByMonth] response failed:", response);
            return null;
        }
    },
    async getChartExpenseCategoriesMonthly() {
        const sessionKey = localStorage.getItem('sessionKey');
        const response = await this.postData('/get_chart/expense_categories_monthly', { session_key: sessionKey }, null);
        if (response) {
            return response;
        } else {
            console.error("[getChartExpenseCategoriesMonthly] response failed:", response);
            return null;
        }
    },
    async getGeneralStats() {
        const sessionKey = localStorage.getItem('sessionKey');
        const response = await this.postData('/analytics/get_general_stats', { session_key: sessionKey }, null);
        if (response) {
            return response;
        } else {
            console.error("[getGeneralStats] response failed:", response);
            return null;
        }
    },
    async getStatsForTimespan(timespan) {
        const sessionKey = localStorage.getItem('sessionKey');
        const response = await this.postData('/analytics/get_stats_for_timespan', { session_key: sessionKey, timespan: timespan }, null);
        if (response) {
            return response;
        } else {
            console.error("[getStatsForTimespan] response failed:", response);
            return null;
        }
    },
    async getServerDrivesInfo() {
        const response = await this.postData('/get_server_drives_info', null, null);
        if (response) {
            return response;
        } else {
            console.error("[getServerDrivesInfo] response failed:", response);
            return null;
        }
    },
};

export default api;