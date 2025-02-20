<template>
    <div class="login-page content-width-small">
        <h1>Login</h1>
        <p>Log in in order to access the data that is linked to your account. You can browse the website without logging in, but you can only view the example data and can not edit it.</p>

        <p>Use the form below to log in by filling in the details. Don't have an account? Create one <a href="/create_account">here.</a> If you have forgotten your username or password please contanct the server admin.</p>

        <form @submit.prevent="handleLogin">
            <div>
                <label for="username">Username:</label>
                <input type="username" v-model="username" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" v-model="password" required />
            </div>
            <button class="color-primary center" type="submit">Log in</button>
        </form>
    </div>
</template>

<script>
import api from '@/utils/dataQuery';
import router from '@/router';

export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        async handleLogin() {
            const responseSuccess = await api.logIn({
                username: this.username,
                password: this.password
            });
            if (responseSuccess) {
                router.back();
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