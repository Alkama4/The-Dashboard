<template>
    <div class="content-width-medium">
        <h1>Account</h1>
        <p>Your settings are stored locally on your device. Please note that while your settings are saved locally, all of your data is stored centrally behind your account so that it can be accessed from any device and stays synced.</p>

        <div class="content-width-extra-small">
            <div class="flex-column loggedInAs card">
                <h2>Current account</h2>
                <div>You are currently logged in as <span class="username">{{ username }}</span></div>
                <button @click="callApiToLogOut">Log out</button>
            </div>
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

                <div class="setting-name">
                    Amount of titles loaded at once in all titles list
                    <InfoTooltip text="Must be between 5 and 100"/>
                </div>
                <div class="setting-value">
                    <input 
                        type="number" 
                        v-model="settings.list_all_titles_load_limit" 
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
            <div class="card danger-zone">
                <h2>
                    <span class="icon-align">
                        <IconWarningTriangle size="24" right="var(--spacing-xs)"/>
                        Danger zone
                    </span>
                </h2>
                <p>Pay extra attention and be careful with these buttons, as they have significant consequences and are not reversible.</p>
                <div class="flex-row">
                    <button 
                        class="button-danger"
                        @click="handleAccountDelete"
                    >
                        Delete account permanently
                    </button>
                    <button 
                        class="button-danger"
                        @click="handleDataReset"
                    >
                        Reset user data
                    </button>
                </div>

                <!-- What was the other thing that I could add here? -->
                
            </div>
        </div>

        <ConfirmationModal 
            ref="logOutCM"
            header="Log out"
            text="Are you sure you want to log out?"
            affirmative-option="Log out"
        />

        <ConfirmationModal 
            ref="deleteAccountCM"
            header="Delete Account"
            text="Are you sure you want to delete your account? All data will be permanently lost and cannot be recovered."
            affirmative-option="Delete account"
        />
        <ConfirmationModal 
            ref="deleteAccountConfirmCM"
            header="Are you sure?"
            text="Are you absolutely sure? This action is permanent and cannot be undone. This is your last warning!"
            affirmative-option="Delete account permanently"
            negativeOption="Back to safety"
        />
    </div>
</template>

<script>
import fastApi from '@/utils/fastApi';
import router from '@/router';
import { notify } from '@/utils/notification';
import InfoTooltip from '@/components/InfoTooltip.vue';
import IconWarningTriangle from '@/components/icons/IconWarningTriangle.vue';
import ConfirmationModal from '@/components/ModalConfirmation.vue';
import session from '@/utils/session';

export default {
    components: {
        InfoTooltip,
        IconWarningTriangle,
        ConfirmationModal,
    },
    data() {
        return {
            sessionActive: "unknown",
            username: '',
            showModal: false,
            settingNames: [
                "chart_balance_initial_value",
                "transactions_load_limit",
                "list_all_titles_load_limit",
            ],
            settings: {},
            settingsInitial: {},
        };
    },
    methods: {
        async callApiToLogOut() {
            // Confirm before logging out
            if (!await this.$refs.logOutCM.prompt()) { return }
            
            // Actually log out
            const logOutSuccess = await session.logout();
            if (logOutSuccess) {
                this.sessionActive = "false";
                this.username = null;
            }
        },
        async handleAccountDelete() {
            // Confirmations before deleting
            if (!await this.$refs.deleteAccountCM.prompt()) { return }
            if (!await this.$refs.deleteAccountConfirmCM.prompt()) { return }
            
            notify("Account NOT deleted. Feature is yet to be implemented.");
        },
        handleDataReset() {
            notify("Not yet implemented.")
        },
        async saveSettings() {
            // Check that the values are proper numbers
            if (!this.settingNames.every(setting => Number.isFinite(this.settings[setting]))) {
                // If any setting is not a valid number, notify the user and do not proceed
                notify("Setting not saved! Please enter a valid number.", "warning");
                return;
            }

            // Cap transactions_load_limit and list_all_titles_load_limit between 5 and 100
            this.settings.transactions_load_limit = Math.max(5, Math.min(this.settings.transactions_load_limit, 100));
            this.settings.list_all_titles_load_limit = Math.max(5, Math.min(this.settings.list_all_titles_load_limit, 100));

            // Create an array to store changed settings
            const changedSettings = [];

            // Compare the current settings with initial settings and find differences
            this.settingNames.forEach(setting => {
                const initialValue = this.settingsInitial[setting];
                const currentValue = this.settings[setting];

                // If the setting has changed, push it to the array
                if (currentValue !== initialValue) {
                    changedSettings.push({ setting, value: currentValue });
                }
            });

            // If there are changes, send them to the API
            if (changedSettings.length > 0) {
                // Call the API with the changed settings
                const response = await fastApi.account.updateSettings(changedSettings);
                if (response && response.message) {
                    console.log("[saveSettings]", response.message);
                    
                    // After the settings have been successfully saved, update the initial settings
                    changedSettings.forEach(({ setting, value }) => {
                        this.settingsInitial[setting] = value;
                    });
                }
            } else {
                console.log('[saveSettings] No settings changed');
            }
        },
        async loadSettings() {
            // Call API to get settings
            const response = await fastApi.account.getSettings();
            if (response) {
                console.debug("[loadSettings]", response)
                // Store the fetched settings in `this.settings` and `this.settingsInitial`
                for (const [key, value] of Object.entries(response)) {
                    // console.debug(key, value);
                    this.settings[key] = Number(value);
                    this.settingsInitial[key] = Number(value); // Save initial values
                }
            }
        },
    },
    async mounted() {
        // A logged in check that automatically sends to login page if the user isn't logged in.
        const loggedIn = localStorage.getItem("sessionActive");
        if (loggedIn != "true") {
            router.push("/account/login");
        }

        // Get the username
        const username = localStorage.getItem("username");
        if (username) {
            this.username = username;
        }

        this.loadSettings();
    }
};
</script>

<style scoped>
.loggedInAs {
    margin: var(--spacing-lg) auto;
    gap: var(--spacing-md);
    width: 100%;
    box-sizing: border-box; /* Tää on ihan paras! Ignoraa paddingin kun asetetaan width tms */
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

.danger-zone {
    margin-top: var(--spacing-lg);
}

</style>
