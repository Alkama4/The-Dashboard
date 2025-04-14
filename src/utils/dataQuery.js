import axios from 'axios';
import qs from 'qs';
import { notify } from './notification';
import router from '@/router';

const standAloneBuild = process.env.VUE_APP_STANDALONE_BUILD == "true";
if (standAloneBuild) {
    const disclaimer = "Please note: This app is in standalone mode. Most features are disabled, but you can browse the site to explore its look and feel.";
    notify(disclaimer, "info", 15000);
    console.warn(disclaimer);
}

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_URL, // FastAPI base URL
    timeout: 0, // Time outs anyway at 5000 if api is not reachable, but if it just takes a long time do not time out
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
            notify("Unexpected error occurred. Please try again. " + detail, "error");
        } else if (statusCode === 404) {
            notify(`Resource not found: ${detail}`, "error");
        } else if (statusCode === 405) {
            notify("This feature requires an account. Please login.");
        } else if (statusCode === 400) {
            notify(`Invalid request: ${detail}`, "error");
        } else if (statusCode === 500) {
            notify("Internal server error: " + detail, "error");
        } else {
            notify(`${statusCode}: ${typeof detail === 'object' ? JSON.stringify(detail) : detail}`, "error");
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

        // Actual api call
        if (!standAloneBuild) {
            try {
                // Get the data
                const response = await apiClient.get(endpoint, { params });
                
                // Timer logging
                const endTime = performance.now();      // End the timer
                const duration = endTime - startTime;   // Calculate the duration
                console.info(`[Response time] "${endpoint}" | ${duration.toFixed(2)}ms`);

                // Return and make a debug log
                console.debug(response);
                return response.data;
            } catch (error) {
                // Use the handleError for a unified error handling between different request methods
                return await handleError(error, endpoint);
            }
        } 

        // API call simulation for a standalone usecase that just gets the values from a js file.
        else {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const endTime = performance.now();
                    const duration = endTime - startTime;
                    console.info(`[Response time] "${endpoint}" | ${duration.toFixed(2)}ms`);
              
                    // Construct request key with full URL format
                    const url = new URL(endpoint, process.env.VUE_APP_API_URL);
                    if (params) {
                        Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
                    }
                    const requestKey = url.pathname + url.search;
            
                    console.debug("[getData] Request key:", requestKey);
            
                    // Fetch static data from the public folder
                    // Need to add "/The-Dashboard" seperately for github pages to find it
                    fetch(window.location.href.includes("localhost") ? '/apiCache.json' : '/The-Dashboard/apiCache.json')
                        .then(response => response.json())
                        .then(STATIC_CONTENT => {
                            if (STATIC_CONTENT[requestKey]) {
                                resolve(STATIC_CONTENT[requestKey]);
                            } else {
                                console.warn("[getData] Missing endpoint in STATIC_CONTENT:", requestKey);
                                resolve(null);
                            }
                        })
                        .catch(err => {
                            console.error("[getData] Error loading static data:", err);
                            resolve(null);
                        });
                }, 250);
            });
        }
    },

    async handleModifyingRequest(method, endpoint, data = {}, config = {}) {
        const startTime = performance.now();
    
        if (!standAloneBuild) {
            try {
                const response = await apiClient.request({
                    method,
                    url: endpoint,
                    data,
                    ...config
                });
                const endTime = performance.now();
                console.log(`[Response time] "${endpoint}" | ${(endTime - startTime).toFixed(2)}ms`);
                return response.data;
            } catch (error) {
                return await handleError(error, endpoint);
            }
        } else {
            return new Promise(resolve => {
                setTimeout(() => {
                    const endTime = performance.now();
                    console.info(`[Response time] "${endpoint}" | ${(endTime - startTime).toFixed(2)}ms`);
                    notify("Action not available! This is a preview site and has no functional features.", "info");
                    resolve(null);
                }, 0);
            });
        }
    },
    
    async postData(endpoint, data, config = {}) {
        return this.handleModifyingRequest('post', endpoint, data, config);
    },
    
    async deleteData(endpoint, data, config = {}) {
        return this.handleModifyingRequest('delete', endpoint, data, config);
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
                // notify("Failed to log in.", "error");
                console.error("[logIn] unknown response.loginStatus");
                return false;
            }
        } else {
            // notify("Failed to log in.", "error");
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
    localLogOut(manualLogOut = false, quiet = false) {
        if (router.currentRoute.value.path !== "/account/login") {
            localStorage.removeItem("sessionKey");
            localStorage.setItem("isLoggedIn", false);
            localStorage.removeItem("username");
            if (manualLogOut != true) {
                notify("Your session has expired, and you have been logged out. Please log in again.", "info", 15000);
            }
            if (!quiet) {
                router.push("/login");
            }
        }
    },

    async getLoginStatus() {
        const sessionKey = localStorage.getItem('sessionKey');
        if (!standAloneBuild) {
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
        } else {
            // Log out quietly if the somehow had a session key
            // Mainy for development
            this.localLogOut(true, true);
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
        const response = await this.postData('/transactions/delete_transaction', { session_key: sessionKey, transaction_id: transactionId }, null);
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
        const response = await this.getData('/charts/balance_over_time', params);
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
        const response = await this.getData('/charts/sum_by_month', params);
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
        const response = await this.getData('/charts/categories_monthly', params);
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
        const response = await this.getData('/charts/categories_monthly', params);
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
    async getBackups() {
        return this.getData('/backups/get');
    },

    async getServerDrivesInfo() {
        const response = await this.getData('/server/drives_status', null, null);
        if (response) {
            return response;
        } else {
            console.error("[getServerDrivesInfo] response failed:", response);
            return null;
        }
    },

    async getServerResourceLogs(timeframe) {
        let params = {};
        params.timeframe = timeframe;
        return this.getData('/server/logs/resources/get', params);
    },

    async getFastapiRequestLogData(timeframe) {
        let params = {};
        params.timeframe = timeframe;
        return this.getData('/server/logs/fastapi/get', params);
    },

    // - - - - - - - - - - - - - TV AND MOVIE WATCH LIST - - - - - - - - - - - - - 
    async searchForTitle(titleCategory, titleName) {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        params.title_name = titleName;
        params.title_category = titleCategory;
        if (standAloneBuild) {
            // Do not allow searching
            return this.postData();
        }
        return this.getData('/watch_list/search', params);
    },

    async addTitleToUserList(tmdbId, type) {
        const sessionKey = localStorage.getItem('sessionKey');
        const response = await this.postData('/watch_list/add_user_title', { 
            session_key: sessionKey, 
            title_tmdb_id: tmdbId, 
            title_type: type
        }, null);
        if (response) {
            return response;
        } else {
            console.error("[addTitleToUserList] response failed:", response);
            return null;
        }
    },

    async updateTitle(tmdbId, type, { updateInfo = false, updateImages = false, updateSeasonInfo = false, updateSeasonImages = false, seasonNumber = 0 } = {}) {
        const response = await this.postData('/watch_list/update_title', { 
            title_tmdb_id: tmdbId, 
            title_type: type,
            update_title_info: updateInfo,
            update_title_images: updateImages,
            update_season_number: seasonNumber,
            update_season_info: updateSeasonInfo,
            update_season_images: updateSeasonImages
        }, null);
    
        if (response) {
            return response;
        } else {
            console.error("[updateTitle] response failed:", response);
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

    async getTitleCards(sortBy, direction, titleType, watched, favourite, released, started) {
        let params = {};
        params.title_count = 12;
        params.session_key = localStorage.getItem('sessionKey');
        if (sortBy != null) params.sort_by = sortBy;
        if (direction != null) params.direction = direction;
        if (titleType != null) params.title_type = titleType;
        if (watched != null) params.watched = watched;
        if (favourite != null) params.favourite = favourite;
        if (released != null) params.released = released;
        if (started != null) params.started = started;
        return this.getData('/watch_list/get_title_cards', params);
    },

    async listTitles(params) {
        return this.getData('/watch_list/list_titles', {
            session_key: localStorage.getItem('sessionKey'),
            ...params
        });
    },

    async getTitleInfo(titleID) {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        params.title_id = titleID;
        return this.getData('/watch_list/get_title_info', params);
    },

    // - - - - - - - - - - - - - COLLECTIONS - - - - - - - - - - - - - 
    async getCollectionsListed() {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        return this.getData('/watch_list/collection/list', params);
    },

    async deleteCollection(collection_id) {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        params.collection_id = collection_id;
        return this.deleteData('/watch_list/collection/delete', params);
    },

    async editCollection(collection_id, name, description) {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        params.collection_id = collection_id;
        params.name = name;
        params.description = description;
        return this.postData('/watch_list/collection/edit', params);
    },

    async createCollection(name, description) {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        params.name = name;
        params.description = description;
        return this.postData('/watch_list/collection/create', params);
    },

    async addTitleToCollection(collection_id, title_id) {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        params.collection_id = collection_id;
        params.title_id = title_id;
        return this.postData('/watch_list/collection/add_title', params);
    },

    async removeTitleFromCollection(collection_id, title_id) {
        let params = {};
        params.session_key = localStorage.getItem('sessionKey');
        params.collection_id = collection_id;
        params.title_id = title_id;
        return this.postData('/watch_list/collection/remove_title', params);
    },

};

export default api;