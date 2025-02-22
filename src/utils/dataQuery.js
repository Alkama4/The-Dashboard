import axios from 'axios';
import qs from 'qs';
import { notify } from './notification';
import router from '@/router';

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_URL, // Your FastAPI base URL
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
            notify("Unexpected error occurred. Please try again." + detail, "error");
        } else if (statusCode === 404) {
            notify("Resource not found: Please verify the endpoint." + detail, "error");
        } else if (statusCode === 405) {
            notify("This feature requires an account. Please login." + detail, "error");
        } else if (statusCode === 400) {
            notify(`Invalid request: ${detail}`, "error");
        } else if (statusCode === 500) {
            notify("Internal server error: " + detail, "error");
        } else {
            notify(`${statusCode}: ${detail}`, "error");
        }

    } else {
        // Other errors (e.g., request setup)
        console.error(`[Error] Error setting up request: ${error.message}`);
        notify("Unexpected error occurred. Please try again.", "error");
    }
    return null;
}

const api = {
    // - - - - - - - - - - - - - POST AND GET METHODS - - - - - - - - - - - - - 
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


    // - - - - - - - - - - - - - GENERAL LOGINS ETC. - - - - - - - - - - - - - 
    async logIn(params = {}) {
        params.previousSessionKey = localStorage.getItem('sessionKey');
        const response = await this.postData('/account/login', null, { params });
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

    async createAccount(username, password) {
        let params = {};
        params.username = username;
        params.password = password;
        const response = await this.postData('/account/create', params, null);
        if (response) {
            return response;
        } else {
            console.error("[createAccount] response failed:", response);
            return null;
        }
    },

    async deleteAccount(password) {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        params.password = password;
        console.log(params);
        const response = await this.postData('/account/delete', params, null);
        if (response) {
            return response;
        } else {
            console.error("[deleteAccount] response failed:", response);
            return null;
        }
    },

    async logOut() {
        const sessionKey = localStorage.getItem('sessionKey');
        const response = await this.postData('/account/logout', null, { params: { sessionKey } });
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
        if (router.currentRoute.value.path !== "/account/login") {
            localStorage.removeItem("sessionKey");
            localStorage.setItem("isLoggedIn", false);
            localStorage.removeItem("username");
            if (manualLogOut != true) {
                notify("Your session has expired, and you have been logged out. Please log in again.", "info", 15000);
            }
            router.push("/login");
        }
    },

    async getLoginStatus() {
        const sessionKey = localStorage.getItem('sessionKey');
        if (sessionKey) {
            let params = {};
            params.session_key = sessionKey;
            const response = await this.getData('/account/get_login_status', params);
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
    },

    async getSettings() {
        const sessionKey = localStorage.getItem('sessionKey');
        if (sessionKey) {
            let params = {};
            params.session_key = sessionKey;
            const response = await this.getData('/account/get_settings', params);
            if (response) return response;
        } else {
            console.log("[getLoginStatus] Did not try: no session key");
        }
    },

    async updateSettings(changedSettings) {
        let params = {};
        params.changed_settings = changedSettings;
        params.session_key = localStorage.getItem('sessionKey');
        const response = await this.postData('/account/update_settings', params);
        if (response) {
            return response;
        } else {
            console.error("[updateSettings] response failed:", response);
            return null;
        }
    },

    
    // - - - - - - - - - - - - - TRANSACTIONS - - - - - - - - - - - - - 
    async newTransaction(transactionData) {
        const sessionKey = localStorage.getItem('sessionKey');
        transactionData.session_key = sessionKey;
        // console.log('[newTransaction] Creating new transaction with data:', transactionData);
        const response = await this.postData('/transactions/new_transaction', transactionData, null);
        if (response) {
            if (response.newTransactionSuccess) {
                notify("New transaction created!", "success");
                console.log("[newTransaction] new transaction success");
                return true;
            } else {
                // notify("Failed to create new transaction.", "error");
                console.error("[newTransaction] newTransactionSuccess == false");
                return false;
            }
        } else {
            // notify("Failed to create new transaction.", "error");
            console.error("[newTransaction] response failed");
            return null;
        }
    },

    async editTransaction(transactionData) {
        const sessionKey = localStorage.getItem('sessionKey');
        transactionData.session_key = sessionKey;
        // console.log('[editTransaction] Editing transaction with data:', transactionData);
        const response = await this.postData('/transactions/edit_transaction', transactionData, null);
        if (response) {
            if (response.editTransactionSuccess) {
                notify("Transaction edited successfully!", "success");
                console.log("[editTransaction] edit success");
                return true;
            } else {
                // notify("Failed to edit transaction.", "error");
                console.error("[editTransaction] editTransactionSuccess == false");
                return false;
            }
        } else {
            // notify("Failed to edit transaction.", "error");
            console.error("[editTransaction] response failed");
            return null;
        }
    },

    // This should be DELETE but thats a later me problem 
    async deleteTransaction(transactionId) {
        const sessionKey = localStorage.getItem('sessionKey');
        console.log('[deleteTransaction] Deleting transaction with ID:', transactionId);
        const response = await this.postData('/transactions/delete_transaction', { session_key: sessionKey, transactionID: transactionId }, null);
        if (response) {
            if (response.deleteTransactionSuccess) {
                notify("Transaction deleted successfully!", "success");
                console.log("[deleteTransaction] delete success");
                return true;
            } else {
                // notify("Failed to delete transaction.", "error");
                console.error("[deleteTransaction] deleteTransactionSuccess == false");
                return false;
            }
        } else {
            // notify("Failed to delete transaction.", "error");
            console.error("[deleteTransaction] response failed");
            return null;
        }
    },

    async getTransactions(params = {}) {
        params.session_key = localStorage.getItem('sessionKey');
        // console.info('Fetching transactions with params:', params);
        return this.getData('/transactions/get_transactions', params);
    },

    async getOptions() {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        // console.log('Fetching options with params:', params);
        return this.getData('/transactions/get_options', params);
    },

    async getFilters() {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        // console.log('Fetching filters with params:', params);
        return this.getData('/transactions/get_filters', params);
    },


    // - - - - - - - - - - - - - CHARTS AND ANALYTICS - - - - - - - - - - - - - 
    async getChartBalanceOverTime() {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        const response = await this.getData('/get_chart/balance_over_time', params);
        if (response) {
            return response;
        } else {
            console.error("[getChartBalanceOverTime] response failed:", response);
            return null;
        }
    },

    async getChartSumByMonth() {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        const response = await this.getData('/get_chart/sum_by_month', params);
        if (response) {
            return response;
        } else {
            console.error("[getChartSumByMonth] response failed:", response);
            return null;
        }
    },

    async getChartExpenseCategoriesMonthly() {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        params.direction = "expense";
        const response = await this.getData('/get_chart/categories_monthly', params);
        if (response) {
            return response;
        } else {
            console.error("[getChartExpenseCategoriesMonthly] response failed:", response);
            return null;
        }
    },

    async getChartIncomeCategoriesMonthly() {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        params.direction = "income";
        const response = await this.getData('/get_chart/categories_monthly', params);
        if (response) {
            return response;
        } else {
            console.error("[getChartExpenseCategoriesMonthly] response failed:", response);
            return null;
        }
    },

    async getGeneralStats() {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        const response = await this.getData('/analytics/get_general_stats', params);
        if (response) {
            return response;
        } else {
            console.error("[getGeneralStats] response failed:", response);
            return null;
        }
    },
    
    async getStatsForTimespan(timespan) {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        params.timespan = timespan;
        const response = await this.getData('/analytics/get_stats_for_timespan', params);
        if (response) {
            return response;
        } else {
            console.error("[getStatsForTimespan] response failed:", response);
            return null;
        }
    },


    // - - - - - - - - - - - - - BACKUPS AND SERVER INFO - - - - - - - - - - - - - 
    async getServerDrivesInfo() {
        const response = await this.getData('/get_server_drives_info', null, null);
        if (response) {
            return response;
        } else {
            console.error("[getServerDrivesInfo] response failed:", response);
            return null;
        }
    },

    async getBackups() {
        return this.getData('/get_backups');
    },

    async getServerResourceLogs(timeframe) {
        let params = {};
        params.timeframe = timeframe;
        return this.getData('/get_server_resource_logs', params);
    },

    async getFastapiRequestLogData(timeframe) {
        let params = {};
        params.timeframe = timeframe;
        return this.getData('/get_fastapi_request_log_data', params);
    },

    // - - - - - - - - - - - - - TV AND MOVIE WATCH LIST - - - - - - - - - - - - - 
    async searchForTitle(titleCategory, titleName) {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        params.title_name = titleName;
        params.title_category = titleCategory;
        return this.getData('/watch_list/search', params);
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

    async updateTitleInfo(tmdb_id, type) {
        const response = await this.postData('/watch_list/update_title_info', { 
            title_tmdb_id: tmdb_id, 
            title_type: type, 
        }, null);
        if (response) {
            return response;
        } else {
            console.error("[updateTitleInfo] response failed:", response);
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
            console.error("[removeTitleFromUserList] response failed:", response);
            return null;
        }
    },

    async saveTitleNotes(title_id, notes) {
        const sessionKey = localStorage.getItem('sessionKey');
        const response = await this.postData('/watch_list/save_user_title_notes', { 
            session_key: sessionKey,
            title_id: title_id,
            notes: notes,
        }, null);
        if (response) {
            return response;
        } else {
            console.error("[saveTitleNotes] response failed:", response);
            return null;
        }
    },

    async toggleTitleFavourite(title_id) {
        const sessionKey = localStorage.getItem('sessionKey');
        const response = await this.postData('/watch_list/toggle_title_favourite', { 
            session_key: sessionKey,
            title_id: title_id,
        }, null);
        if (response) {
            return response;
        } else {
            console.error("[toggleTitleFavourite] response failed:", response);
            return null;
        }
    },

    async modifyTitleWatchCount(type, chosenTypesID, newState) {
        const sessionKey = localStorage.getItem('sessionKey');
        const response = await this.postData('/watch_list/modify_title_watch_count', { 
            session_key: sessionKey,
            type: type,
            chosen_types_id: chosenTypesID,
            new_state: newState,
        }, null);
        if (response) {
            return response;
        } else {
            console.error("[modifyTitleWatchCount] response failed:", response);
            return null;
        }
    },

    async getTitleCards(sortBy, titleType, watched, favourite, released, started) {
        let params = {};
        params.title_count = 12;
        params.session_key = localStorage.getItem('sessionKey');
        if (sortBy != null) params.sort_by = sortBy;
        if (titleType != null) params.title_type = titleType;
        if (watched != null) params.watched = watched;
        if (favourite != null) params.favourite = favourite;
        if (released != null) params.released = released;
        if (started != null) params.started = started;
        return this.getData('/watch_list/get_title_cards', params);
    },

    async getTitleInfo(titleID) {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        params.title_id = titleID;
        return this.getData('/watch_list/get_title_info', params);
    },
};

export default api;