<template>
    <div class="login-page content-width-small">
        <h1>Create account</h1>
        <p>Use the form below to create an account.</p>

        <form @submit.prevent="handleLogin">
            <div>
                <label for="username">Username:</label>
                <input type="username"  minlength="4" v-model="username" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" minlength="4" v-model="password" required />
            </div>
            <div>
                <label for="password">Repeat password:</label>
                <input type="password" minlength="4" v-model="passwordRepeat" required />
            </div>
            <button class="color-primary center" type="submit">Log in</button>
        </form>
    </div>
</template>

<script>
import api from '@/utils/dataQuery';
import router from '@/router';
import { notify } from '@/utils/notification';

export default {
    data() {
        return {
            username: '',
            password: '',
            passwordRepeat: ''
        };
    },
    methods: {
        async handleLogin() {
            if (this.password === this.passwordRepeat) {
                const response = await api.createAccount(this.username, this.password);
                if (response) {
                    console.log(response);
                    notify(response.message, "success");
                    router.push("/login");
                }
            } else {
                notify("The passwords do no match!", "error")
            }
        }
    },
    mounted() {
        if (localStorage.getItem("isLoggedIn") == "true") {
            console.log("You are already logged in.");
            router.back();
        }
    }
};
</script>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
        max-width: 350px;
    }
</style>