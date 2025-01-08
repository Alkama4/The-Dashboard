<template>
    <div>
        <h1>Account</h1>
        <p>Your settings are stored locally on your device. Please note that while your settings are saved locally, all of your data is stored centrally behind your account so that it can be accessed from any device and stays synced.</p>

        <div class="flex-column loggedInAs">
            <div>You are currently logged in as <span class="username">{{ username }}</span></div>
            <button class="" @click="showLogOutModal">Log out</button>
            <ModalWindow 
                v-if="showModal" 
                @close="showModal = false" 
                @logout="callApiToLogOut"    
                modalType="logout"
            />
        </div>

        <h2>Chart settings</h2>

        <div class="chart-settings">
            <label for="">Initial value</label>
            <input type="number" v-model="chart1StartingPosition" placeholder="Initial value" step="0.01" @change="saveSettings">
        </div>

    </div>
</template>

<script>
import api from '@/utils/dataQuery';
import ModalWindow from '@/components/ModalWindow.vue';
import router from '@/router';

export default {
    components: {
        ModalWindow,
    },
    data() {
        return {
            isLoggedIn: "unknown",
            username: '',
            showModal: false,
            chart1StartingPosition: 0,
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
            localStorage.setItem('chart1StartingPosition', this.chart1StartingPosition);
            console.log('Settings saved');
        },
        loadSettings() {
            const chart1StartingPosition = localStorage.getItem('chart1StartingPosition');
            if (chart1StartingPosition) {
                this.chart1StartingPosition = chart1StartingPosition;
            }

            const username = localStorage.getItem("username");
            if (username)
                this.username = username;
        }
    },
    mounted() {
        const loggedIn = localStorage.getItem("isLoggedIn");
        if (loggedIn == "false") {
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
}
.loggedInAs div {
    font-size: 16px;

}
.loggedInAs .username {
    font-weight: 700;
}

.chart-settings {
    display: flex;
    flex-direction: column;
}
.chart-settings input[type="number"] {
    max-width: 200px;
}

</style>
