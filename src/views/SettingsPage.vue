<template>
    <div>
        <h1>Settings page</h1>
        <p> Settings go here once I figure out what settings I would even need in addition to the night mode.
            Maybe a login, but that would make the most sense as a separate page. Perhaps stuff related to
            the login like import and export data, change pass, database credentials, delete table and so on.
        </p>

        <h2>User settings</h2>

        <div v-if="isLoggedIn === 'no'">
            You are not logged in at the moment. You can continue browsing the page with the example data, but you won't be able to make any changes to the data.
            <br><br>
            <router-link class="minimal-link" to="/login">
                <button class="">Log in</button>
            </router-link>
        </div>
        
        <div v-if="isLoggedIn === 'yes'">
            You are currently logged in as <strong>{{ username }}</strong>.
            <br><br>
            <button class="" @click="showLogOutModal">Log out</button>
            <ModalWindow 
                v-if="showModal" 
                @close="showModal = false" 
                @logout="callApiToLogOut"    
                modalType="logout"
            />
        </div>
        
        <div v-if="isLoggedIn === 'unknown'">
            Checking login status...
        </div>
    </div>
</template>

<script>
import api from '@/utils/dataQuery';
import ModalWindow from '@/components/ModalWindow.vue';

export default {
    components: {
        ModalWindow,
    },
    data() {
        return {
            isLoggedIn: "unknown",
            username: '',
            showModal: false,
        };
    },
    methods: {
        async callApiToGetLoginStatus() {
            const response = await api.getLoginStatus();
            this.isLoggedIn = response.loggedIn ? "yes" : "no";
            this.username = response.loggedIn ? response.username : null;
        },
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
    },
    mounted() {
        this.callApiToGetLoginStatus();
    }
};
</script>

<style scoped>
    .minimal-link {
        text-decoration: none;
        width: fit-content;
    }
</style>
