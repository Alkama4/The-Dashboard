import fastApi from "./fastApi";
import { notify } from "./notification";
import { standAloneBuild } from "./config";
import router from "@/router";

export default {
    getKey() {
        return localStorage.getItem('sessionKey');
    },

    getUsername() {
        return localStorage.getItem('username');
    },

    async login(params = {}) {
        const response = await fastApi.account.login(params);
        if (response?.sessionKey && response?.username) {
            notify("Logged in successfully!", "success");
            localStorage.setItem("sessionKey", response.sessionKey);
            localStorage.setItem("username", response.username);
            localStorage.setItem("sessionActive", 'true');

            const event = new CustomEvent("sessionStatusUpdated", {});
            window.dispatchEvent(event);

            return true;
        } else {
            notify("Failed to log in: " + (response?.statusMessage || "Unknown error"), "error");
            return false;
        }
    },

    async logout() {
        const sessionKey = this.getKey();
        const response = await fastApi.account.logout(sessionKey);
        if (response) {
            notify("You have been logged out.", "info");
            console.log("[session.logout] success");
            this.clear(true);
            return true;
        } else {
            notify("Failed to log out.", "error");
            console.error("[session.logout] failed");
            return false;
        }
    },

    async check() {
        if (!standAloneBuild) {
            if (this.getKey) {
                const response = await fastApi.account.session();
                if (response) {
                    localStorage.setItem("sessionActive", response.active);
                    localStorage.setItem("username", response.active ? response.username : null)

                    // Not yet utilized apparently?
                    const event = new CustomEvent("sessionStatusUpdated", {});
                    window.dispatchEvent(event);
                }
            } else {
                console.log("[session check] Did not try: no session key");
            }
        } else {
            // Log out quietly if in standalone mode just in case if a sessionkey
            // could be found somehow.
            this.clear(true, true);
        }
    },

    clear(doNotNotify = false, quiet = false) {
        if (router.currentRoute.value.path !== "/account/login") {
            localStorage.removeItem("sessionKey");
            localStorage.setItem("sessionActive", false);
            localStorage.removeItem("username");
            if (!doNotNotify) {
                notify("Your session has expired, and you have been logged out. Please log in again.", "info", 15000);
            }
            if (!quiet) {
                router.push("/account/login");
            }
        }
    }
}