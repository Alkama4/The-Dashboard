<template>
    <div class="login-page content-width-small">
        <h1>Log in</h1>
        <p>Log in in order to access the data that is linked to your account. You can browse the website without logging in, but you can only view the example data and can not edit it.</p>

        <p>Use the form below to log in by filling in the details. Don't have an account? Create one <router-link to="/account/create">here.</router-link> If you have forgotten your username or password please contanct the server admin.</p>

        <form @submit.prevent="handleLogin" class="card simple-form">
            <h2>Enter Your Details</h2>
            <div>
                <label for="username">Username</label>
                <CustomGenericInput v-model="username" ref="usernameRef" placeholder="Your username"/>
            </div>
            <div>
                <label for="password">Password</label>
                <CustomPasswordInput v-model="password" ref="passwordRef" placeholder="Your password"/>
            </div>
            <button class="button-primary" type="submit">Log in</button>
        </form>
    </div>
</template>

<script>
import router from '@/router';
import CustomPasswordInput from '@/components/CustomPasswordInput.vue';
import CustomGenericInput from '@/components/CustomGenericInput.vue';
import { notify } from '@/utils/notification';
import session from '@/utils/session';

export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    components: {
        CustomPasswordInput,
        CustomGenericInput,
    },
    methods: {
        async handleLogin() {
            let failed;
            if (this.username.length == 0) {this.$refs.usernameRef.markInvalid(); failed = true; }
            if (this.password.length == 0) {this.$refs.passwordRef.markInvalid(); failed = true; }
            if (failed) { 
                notify("A value is required!", "error");
                return;
            }

            const responseSuccess = await session.login({
                username: this.username,
                password: this.password
            });
            if (responseSuccess) {
                router.back();
            }
        }
    },
    mounted() {
        if (localStorage.getItem("sessionActive") == "true") {
            console.log("You are already logged in.");
            router.back();
        }
    }
};
</script>

<style scoped>

</style>