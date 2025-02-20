<template>
    <div class="content-width-medium">
        <h1>Account</h1>
        <p>Your settings are stored locally on your device. Please note that while your settings are saved locally, all of your data is stored centrally behind your account so that it can be accessed from any device and stays synced.</p>

        <div class="flex-column loggedInAs card content-width-extra-small">
            <h2>Current account</h2>
            <div>You are currently logged in as <span class="username">{{ username }}</span></div>
            <button class="" @click="showLogOutModal">Log out</button>
            <ModalWindow 
                v-if="showModal" 
                @close="showModal = false" 
                @logout="callApiToLogOut"    
                modalType="logout"
            />
        </div>

        <div class="content-width-small">
            <h2>Settings</h2>
            <div class="chart-settings">
                <div class="setting-name">
                    "Balance Over Time" chart's initial value 
                </div>
                <div class="setting-value">
                    <input 
                        type="number" 
                        v-model="settings.chart_balance_initial_value" 
                        placeholder="0" 
                        step="0.01" 
                        @change="saveSettings"
                    >
                </div>
                
                <div class="setting-name">
                    Amount of transactions loaded at once
                    <InfoTooltip text="Must be between 5 and 100"/>
                </div>
                <div class="setting-value">
                    <input 
                        type="number" 
                        v-model="settings.transactions_load_limit" 
                        placeholder="25" 
                        step="1" 
                        min="5" 
                        max="100" 
                        @change="saveSettings"
                    >
                </div>
            </div>
        </div>

        <div class="content-width-small">
            <h2>
                <span class="icon-align">
                    <IconWarningTriangle size="24" right="var(--spacing-xs)"/>
                    Danger zone
                </span>
            </h2>
            <p>Pay extra attention and be careful with these buttons, as they have significant consequences and are not reversible.</p>
            <div>
                <button 
                    class="color-warning"
                    @click="handleAccountDelete"
                >
                    Delete account permanently
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import api from '@/utils/dataQuery';
import ModalWindow from '@/components/ModalWindow.vue';
import router from '@/router';
import { notify } from '@/utils/notification';
import InfoTooltip from '@/components/InfoTooltip.vue';
import IconWarningTriangle from '@/components/icons/IconWarningTriangle.vue';

export default {
    components: {
        ModalWindow,
        InfoTooltip,
        IconWarningTriangle,
    },
    data() {
        return {
            isLoggedIn: "unknown",
            username: '',
            showModal: false,
            settingNames: [
                "chart_balance_initial_value",
                "transactions_load_limit",
            ],
            settings: {},
        };
    },
    methods: {
        async callApiToLogOut() {
            const logOutSuccess = await api.logOut();
            if (logOutSuccess) {
                this.isLoggedIn = "no";
                this.username = null;
            } else {
                this.isLoggedIn = "yes";
            }
        },
        async handleAccountDelete() {
            // Launch a modal that asks for password to confirm
            notify("To be implemented")
        },
        // This should be replaced when the modal is remade
        showLogOutModal() {
            this.showModal = true;
        },
        async saveSettings() {
            // Check that the values are proper numbers
            if (!this.settingNames.every(setting => Number.isFinite(this.settings[setting]))) {
                // If any setting is not a valid number, notify the user and do not proceed
                notify("Setting not saved! Please enter a valid number.", "warning");
                // Here we coul silently set the values back, but it propably is more annoying than just letting them fix it
                // E.g. if they typed "," when the input wanted "."
                return;
            }

            // Cap transactionsLoadLimit between 5 and 100
            this.settings.transactions_load_limit = Math.max(5, Math.min(this.settings.transactions_load_limit, 100));

            
            // Create an array to store changed settings and loop through 
            // each setting and compare the localStorage value with the current value
            const changedSettings = [];
            this.settingNames.forEach(setting => {
                const storedValue = localStorage.getItem(setting);
                const currentValue = this.settings[setting];

                // Push to the array for api
                if (currentValue != storedValue) {
                    changedSettings.push({ setting, value: currentValue });
                }

                // Save the current value to localStorage
                localStorage.setItem(setting, currentValue);
            });

            // If changes were made, send them to the API
            if (changedSettings.length > 0) {

                console.log("Calling api:", changedSettings);

                // Call API with changed settings (you can adjust the API call as needed)
                const response = await api.updateSettings(changedSettings);
                if (response && response.message) {
                    console.log(response.message);
                }
            } else {
                console.info('No settings changed');
            }
        },
        loadSettings() {
            this.settingNames.forEach(setting => {
                const value = localStorage.getItem(setting);
                if (value) {
                    this.settings[setting] = Number(value);
                }
            });
        },
    },
    mounted() {
        // A logged in check that automatically sends to login page if the user isn't logged in.
        const loggedIn = localStorage.getItem("isLoggedIn");
        if (loggedIn != "true") {
            router.push("/login");
        }

        // Set the local storage values. Might get updated, might not. 
        // Depends on if the the first view loaded is this or something else.
        this.loadSettings();

        // Get the username
        const username = localStorage.getItem("username");
        if (username) {
            this.username = username;
        }

        // Add a listener that refreshes the values on page if the function on app.vue 
        // just updated the values to localstorage.
        window.addEventListener("settingsUpdated", this.loadSettings);
    }
};
</script>

<style scoped>
.loggedInAs {
    margin: var(--spacing-lg) auto;
    gap: var(--spacing-md);
    width: 100%;
    box-sizing: border-box; /* Tää on ihan paras! Ignoraa paddingin kun asetetaan width */
}
.loggedInAs > div {
    font-size: 16px;
}
.loggedInAs .username {
    font-weight: 700;
}
.loggedInAs h2, .loggedInAs button {
    margin: 0;
}

.chart-settings {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
    row-gap: var(--spacing-md);
}
.chart-settings .setting-name {
    display: block;
    align-items: center;
    color: var(--color-text-lighter);
    font-weight: 500;
    text-align: start;
    margin-right: var(--spacing-md);
}
.chart-settings .setting-value {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.chart-settings input[type="number"] {
    max-width: 150px;
}


</style>
