import axios from 'axios';
import qs from 'qs';
import { notify } from './notification';
import { localLogOut } from './utils';
import { standAloneBuild } from './config';
import session from './session';

// apiClient to be used in the fastApi methods
const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_URL, // FastAPI base URL
    timeout: 0, // Time outs anyway at 5000 if api is not reachable, but if it just takes a long time do not time out
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'comma' }),
});


// Unified error handling method for all types of requests
async function handleError(error, endpoint) {
    if (error.response) {
        // HTTP response received but with an error status code
        const statusCode = error.response.status;
        const detail = error.response.data.detail;
        console.error(`[Error] HTTP ${statusCode} | ${detail} | "${endpoint}"`);
        
        // Handle specific status codes
        if (statusCode === 403 && detail === "Invalid or expired session key.") {
            // Since the sessionKey is invalid log out locally and prompt for log in.
            localLogOut();
        } else if (statusCode === 400) {
            notify(`Invalid request: ${detail}`, "error");
        } else if (statusCode === 403) {
            notify("Unexpected error occurred. Please try again. " + detail, "error");
        } else if (statusCode === 404) {
            notify(`Resource not found: ${detail}`, "error");
        } else if (statusCode === 405) {
            notify("This feature requires an account. Please login.");
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

// Combined method for modification requests like post and delete
async function handleModifyingRequest(method, endpoint, data = {}, config = {}) {
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
}


// - - - - - - - - - - - - - http request methods to call FastAPI - - - - - - - - - - - - - 

async function postData(endpoint, data, config = {}) {
    return handleModifyingRequest('post', endpoint, data, config);
}

async function putData(endpoint, data, config = {}) {
    return handleModifyingRequest('put', endpoint, data, config);
}

async function deleteData(endpoint, data, config = {}) {
    return handleModifyingRequest('delete', endpoint, data, config);
}

// async function patchData(endpoint, data, config = {}) {
//     return handleModifyingRequest('patch', endpoint, data, config);
// }

async function getData(endpoint, params = {}) {
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
}


const fastApi = {

    // - - - - - - - - - - - - - ACCOUNT - - - - - - - - - - - - - 
    account: {
        async login(params = {}) {
            params.previous_session_key = session.getKey();
            return await postData('/account/login', params);
        },

        async logout() {
            return await postData('/account/logout', {session_key: session.getKey()});
        },

        async create(username, password) {
            return await postData('/account', {
                username: username, 
                password: password
            });
        },
    
        async delete(password) {
            return await postData('/account', {
                session_key: session.getKey(),
                password: password
            });
        },
        
        async session() {
            return await getData('/account/session', {session_key: session.getKey()});
        },
    
        async getSettings() {
            return await getData('/account/settings', {session_key: session.getKey()});
        },
    
        async updateSettings(updated_settings) {
            return await putData('/account/settings', {
                updated_settings: updated_settings,
                session_key: session.getKey()
            });
        },
    },


    // - - - - - - - - - - - - - SPENDINGS - - - - - - - - - - - - - 
    spendings: {
        transactions: {
            async list(params = {}) {
                params.session_key = session.getKey();
                return await getData('/spendings/transactions', params);
            },

            async create(transactionData) {
                transactionData.session_key = session.getKey();
                return await postData(`/spendings/transactions`, transactionData);
            },
        
            async update(transaction_id, transactionData) {
                transactionData.session_key = session.getKey();
                return await putData(`/spendings/transactions/${transaction_id}`, transactionData);
            },

            async delete(transaction_id) {
                return await deleteData(`/spendings/transactions/${transaction_id}`, {
                    session_key: session.getKey()
                });
            },

            async categories_options() {
                return await getData('/spendings/transactions/options/categories', {
                    session_key: session.getKey()
                });
            },

            async filters_options() {
                return await getData('/spendings/transactions/options/filters', {
                    session_key: session.getKey()
                });
            },
        },

        analytics: {
            stats: {
                async general() {
                    return await getData('/spendings/analytics/stats/general', {
                        session_key: session.getKey()
                    });
                },
                
                async timespan(timespan) {
                    return await getData(`/spendings/analytics/stats/${timespan}`, {
                        session_key: session.getKey()
                    });
                },
            },

            charts: {
                async balance_over_time() {
                    return await getData('/spendings/analytics/charts/balance_over_time', {
                        session_key: session.getKey()
                    });
                },
            
                async sum_by_month() {
                    return await getData('/spendings/analytics/charts/sum_by_month', {
                        session_key: session.getKey()
                    });
                },
            
                async categories_monthly(direction) {
                    return await getData('/spendings/analytics/charts/categories_monthly', {
                        direction,
                        session_key: session.getKey(),
                    });
                },
            },
        },
    },


    // - - - - - - - - - - - - - SERVER - - - - - - - - - - - - - 
    server: {
        async drives() {
            return await getData('/server/drives');
        },

        logs: {
            async system_resources(timeframe) {
                return await getData('/server/logs/system_resources', {
                    timeframe: timeframe
                });
            },

            async fastapi(timeframe) {
                return await getData('/server/logs/fastapi', {
                    timeframe: timeframe
                });
            }
        },

        async backups() {
            return await getData('/server/backups');
        },
    },


    // - - - - - - - - - - - - - WATCH LIST - - - - - - - - - - - - - 
    watch_list: {
        async search(title_name, title_category) {
            // Do not allow searching on standalone
            if (standAloneBuild) {return postData();}
            return getData('/watch_list/search', {
                session_key: session.getKey(),
                title_name: title_name,
                title_category: title_category
            });
        },

        titles: {
            async add(title_id, tmdb_id, title_type) {
                return await postData('/watch_list/titles', {
                    session_key: session.getKey(),
                    ...(title_id && { title_id }),
                    ...(tmdb_id && { tmdb_id }),
                    title_type
                });
            },

            async remove(title_id) {
                return await deleteData(`/watch_list/titles/${title_id}`, {
                    session_key: session.getKey()
                });
            },
        
            async update(title_id, title_type, {
                update_title_info = false,
                update_title_images = false,
                season_number = 0,
                update_season_info = false,
                update_season_images = false,
            } = {}) {
                return await putData(`/watch_list/titles/${title_id}`, {
                    session_key: session.getKey(),
                    title_type,
                    update_title_info,
                    update_title_images,
                    season_number,
                    update_season_info,
                    update_season_images,
                });
            },
        
            async notes(title_id, notes) {
                return await putData(`/watch_list/titles/${title_id}/notes`, {
                    session_key: session.getKey(),
                    notes
                });
            },
        
            async favourite(title_id) {
                return await postData(`/watch_list/titles/${title_id}/favourite/toggle`, {
                    session_key: session.getKey()
                });
            },
        
            async watchCountTitle(title_id, watch_count) {
                return await putData(`/watch_list/titles/${title_id}/watch_count`, {
                    session_key: session.getKey(),
                    watch_count
                });
            },
            
            async watchCountSeason(season_id, title_id, watch_count) {
                return await putData(`/watch_list/titles/${title_id}/seasons/${season_id}/watch_count`, {
                    session_key: session.getKey(),
                    watch_count
                });
            },
            
            async watchCountEpisode(episode_id, title_id, watch_count) {
                return await putData(`/watch_list/titles/${title_id}/episodes/${episode_id}/watch_count`, {
                    session_key: session.getKey(),
                    watch_count
                });
            },
        
            async cards(sortBy, direction, titleType, watched, favourite, released, started) {
                return await getData('/watch_list/titles/cards', {
                    session_key: session.getKey(),
                    title_count: 12,
                    ...(sortBy != null && { sort_by: sortBy }),
                    ...(direction != null && { direction }),
                    ...(titleType != null && { title_type: titleType }),
                    ...(watched != null && { watched }),
                    ...(favourite != null && { favourite }),
                    ...(released != null && { released }),
                    ...(started != null && { started })
                });
            },
        
            async list(params) {
                return await getData('/watch_list/titles', {
                    session_key: session.getKey(),
                    ...params
                });
            },
        
            async info(title_id) {
                return await getData(`/watch_list/titles/${title_id}`, {
                    session_key: session.getKey()
                });
            },
        
            async collections(title_id) {
                return await getData(`/watch_list/titles/${title_id}/collections`, {
                    session_key: session.getKey()
                });
            }
        },
        
        collections: {
            async list() {
                return await getData('/watch_list/collections', {
                    session_key: session.getKey()
                });
            },
        
            async create(name, description) {
                return await postData('/watch_list/collections', {
                    session_key: session.getKey(),
                    name,
                    description
                });
            },
        
            async edit(collection_id, name, description) {
                return await putData(`/watch_list/collections/${collection_id}`, {
                    session_key: session.getKey(),
                    name,
                    description
                });
            },
        
            async delete(collection_id) {
                return await deleteData(`/watch_list/collections/${collection_id}`, {
                    session_key: session.getKey()
                });
            },
        
            async add_title(collection_id, title_id) {
                return await putData(`/watch_list/collections/${collection_id}/title/${title_id}`, {
                    session_key: session.getKey()
                });
            },
        
            async remove_title(collection_id, title_id) {
                return await deleteData(`/watch_list/collections/${collection_id}/title/${title_id}`, {
                    session_key: session.getKey()
                });
            }
        }
    },
};

export default fastApi;