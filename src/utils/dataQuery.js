import axios from 'axios';
import qs from 'qs';
import { notify } from './notification';
import router from '@/router';

const apiClient = axios.create({
    baseURL: 'http://192.168.0.2:800', // Your FastAPI base URL
    // Times out anyway at 5000 when it doesn't hear from the api
    timeout: 0,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'comma' }),
});

async function handleError(error, endpoint) {
    if (error.response) {
        // HTTP response received but with an error status code
        const statusCode = error.response.status;
        const detail = error.response.data.detail;
        console.error(`[Error] HTTP ${statusCode} | ${detail} | "${endpoint}"`);
        
        // Handle specific status codes
        if (statusCode === 403 && detail === "Invalid or expired session key.") {
            // Since the sessionKey is invalid log out locally and prompt for log in.
            api.localLogOut();
        } else if (statusCode === 403) {
            notify("Unexpected error occurred. Please try again.", "error");
        } else if (statusCode === 404) {
            notify("Resource not found: Please verify the endpoint.", "error");
        } else if (statusCode === 500) {
            notify("Internal server error. Please try again later.", "error");
        } else {
            notify(`Unexpected error (${statusCode}): ${error.response.data.message || "Unknown error."}`, "error");
        }
    } else if (error.request) {
        // No response received from the server
        console.error(`[Error] No response from server: ${error.request}`);
        notify("Network error: Please check your connection.", "error");
    } else {
        // Other errors (e.g., request setup)
        console.error(`[Error] Error setting up request: ${error.message}`);
        notify("Unexpected error occurred. Please try again.", "error");
    }
    return null;
}

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
            return await handleError(error, endpoint);
        }
    },
    async getTransactions(params = {}) {
        params.session_key = localStorage.getItem('sessionKey');
        // console.info('Fetching transactions with params:', params);
        return this.getData('/get_transactions', params);
    },
    async getOptions() {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        // console.log('Fetching options with params:', params);
        return this.getData('/get_options', params);
    },
    async getFilters() {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        // console.log('Fetching filters with params:', params);
        return this.getData('/get_filters', params);
    },
    async getBackups() {
        return this.getData('/get_backups');
    },
    async searchForTitle(titleCategory, titleName) {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        params.title_name = titleName;
        params.title_category = titleCategory;
        return this.getData('/watch_list/search', params);
    },
    async getTitleCards(titleCategory, watched) {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        if (titleCategory)
            params.title_category = titleCategory;
        params.watched = watched;
        return this.getData('/watch_list/get_title_cards', params);
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
            return await handleError(error, endpoint);
        }
    },
    async logIn(params = {}) {
        params.previousSessionKey = localStorage.getItem('sessionKey');
        const response = await this.postData('/login', null, { params });
        if (response) {
            if (response.loginStatus === "success") {
                notify("Logged in successfully!", "success");
                console.log("[logIn] login success");
                localStorage.setItem("sessionKey", response.sessionKey);
                localStorage.setItem("username", response.username);
                localStorage.setItem("isLoggedIn", true);
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
                console.log("[getLoginStatus] log in attempt response", response);
                localStorage.setItem("isLoggedIn", response.loggedIn);
                localStorage.setItem("username", response.loggedIn ? response.username : null)
                const event = new CustomEvent("logInStatusUpdated", {});
                window.dispatchEvent(event);
            }
        } else {
            console.log("[getLoginStatus] Did not try: no session key");
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
                this.localLogOut(true);
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
    localLogOut(manualLogOut = false) {
        if (router.currentRoute.value.path !== "/login") {
            localStorage.removeItem("sessionKey");
            localStorage.setItem("isLoggedIn", false);
            localStorage.removeItem("username");
            if (manualLogOut != true) {
                notify("Your session has expired, and you have been logged out. Please log in again.", "info", 15000);
            }
            router.push("/login");
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
        const response = await this.postData('/get_chart/categories_monthly', { session_key: sessionKey, direction: "expense" }, null);
        if (response) {
            return response;
        } else {
            console.error("[getChartExpenseCategoriesMonthly] response failed:", response);
            return null;
        }
    },
    async getChartIncomeCategoriesMonthly() {
        const sessionKey = localStorage.getItem('sessionKey');
        const response = await this.postData('/get_chart/categories_monthly', { session_key: sessionKey, direction: "income" }, null);
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
    async addTitleToUserList(tmdb_id, type) {
        const sessionKey = localStorage.getItem('sessionKey');
        const response = await this.postData('/watch_list/add_user_title', { 
            session_key: sessionKey, 
            title_tmdb_id: tmdb_id, 
            title_type: type
        }, null);
        if (response) {
            return response;
        } else {
            console.error("[addTitleToUserList] response failed:", response);
            return null;
        }
    },
    async removeTitleFromUserList(tmdb_id) {
        const sessionKey = localStorage.getItem('sessionKey');
        const response = await this.postData('/watch_list/remove_user_title', { 
            session_key: sessionKey, 
            title_tmdb_id: tmdb_id, 
        }, null);
        if (response) {
            return response;
        } else {
            console.error("[addTitleToUserList] response failed:", response);
            return null;
        }
    },
};

export default api;