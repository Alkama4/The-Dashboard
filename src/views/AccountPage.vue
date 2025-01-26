<template>
    <div class="content-width-medium">
        <h1>Account</h1>
        <p>Your settings are stored locally on your device. Please note that while your settings are saved locally, all of your data is stored centrally behind your account so that it can be accessed from any device and stays synced.</p>

        <div class="flex-column loggedInAs card content-width-small">
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
                        v-model="chart1StartingPosition" 
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
                        v-model="transactionsLoadedAtOnce" 
                        placeholder="25" 
                        step="1" 
                        min="5" 
                        max="100" 
                        @change="saveSettings"
                    >
                </div>
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

export default {
    components: {
        ModalWindow,
        InfoTooltip,
    },
    data() {
        return {
            isLoggedIn: "unknown",
            username: '',
            showModal: false,
            chart1StartingPosition: 0,
            transactionsLoadedAtOnce: 25,
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
        showLogOutModal() {
            this.showModal = true;
        },
        saveSettings() {
            if (Number.isFinite(this.chart1StartingPosition)) {
                localStorage.setItem('chart1StartingPosition', this.chart1StartingPosition);
            } else {
                notify("Setting not saved! Please enter a valid number.", "warning")
            }
            
            // Check if the value is a valid number before proceeding
            if (!Number.isFinite(this.transactionsLoadedAtOnce)) {
                notify("Setting not saved! Please enter a valid number.", "warning");
            } else {
                // Cap the value between 5 and 100
                if (this.transactionsLoadedAtOnce < 5) {
                    this.transactionsLoadedAtOnce = 5;
                } else if (this.transactionsLoadedAtOnce > 100) {
                    this.transactionsLoadedAtOnce = 100;
                }

                // Save the valid value to localStorage
                localStorage.setItem('transactionsLoadedAtOnce', this.transactionsLoadedAtOnce);
            }
            
            console.log('Settings saved');
        },
        loadSettings() {
            const chart1StartingPosition = localStorage.getItem('chart1StartingPosition');
            if (chart1StartingPosition) {
                this.chart1StartingPosition = Number(chart1StartingPosition);
            }

            const transactionsLoadedAtOnce = localStorage.getItem('transactionsLoadedAtOnce');
            if (transactionsLoadedAtOnce) {
                this.transactionsLoadedAtOnce = Number(transactionsLoadedAtOnce);
            }

            const username = localStorage.getItem("username");
            if (username) {
                this.username = username;
            }
        }
    },
    mounted() {
        const loggedIn = localStorage.getItem("isLoggedIn");
        if (loggedIn != "true") {
            router.push("/login");
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
    box-sizing: border-box; /* Tää on ihan paras! Ignoraa paddingin kun asetetaan width */
}
.loggedInAs div {
    font-size: 16px;

}
.loggedInAs .username {
    font-weight: 700;
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
