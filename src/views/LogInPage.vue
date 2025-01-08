<template>
    <div class="login-page">
        <h1>Login</h1>
        <p>Log in in order to access the data that is linked to your account. You can browse the website without logging in, but you are limited the example data.</p>
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
// import { notify } from '@/utils/notification';

export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        async handleLogin() {
            // console.log('Email:', this.username);
            // console.log('Password:', this.password);
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