<template>
    <div class="login-page content-width-small">
        <h1>Create account</h1>
        <p>Create your account by filling in the form below.</p>

        <form @submit.prevent="handleLogin">
            <div>
                <label for="username">Choose a username:</label>
                <CustomGenericInput v-model="username" ref="usernameRef" placeholder="Enter the username"/>
            </div>
            <div>
                <label for="password">Password:</label>
                <CustomPasswordInput v-model="password" ref="passwordRef" placeholder="Enter a password"/>
            </div>
            <div>
                <label for="password">Repeat password:</label>
                <CustomPasswordInput v-model="passwordRepeat" ref="passwordRepeatRef" placeholder="Confirm the password"/>
            </div>
            <button class="button-primary" type="submit">Create account</button>
        </form>
    </div>
</template>

<script>
import api from '@/utils/dataQuery';
import router from '@/router';
import { notify } from '@/utils/notification';
import CustomGenericInput from '@/components/CustomGenericInput.vue';
import CustomPasswordInput from '@/components/CustomPasswordInput.vue';

export default {
    data() {
        return {
            username: '',
            password: '',
            passwordRepeat: ''
        };
    },
    components: {
        CustomGenericInput,
        CustomPasswordInput,
    },
    methods: {
        async handleLogin() {
            let failed = [];

            if (this.username.length < 4) {
                failed.push("lengthUsername");
                this.$refs.username?.markInvalid();
            }

            if (this.password.length < 4) {
                failed.push("lengthPassword");
                this.$refs.password?.markInvalid();
            }

            if (this.password !== this.passwordRepeat) {
                this.$refs.passwordRepeatRef.markInvalid();
                failed.push("match");
            }

            if (/\s/.test(this.username)) {
                this.$refs.usernameRef?.markInvalid();
                failed.push("spaces");
            }
            
            if (failed.includes("lengthUsername")) notify("The username should be atleast four charachters long.", "error");
            if (failed.includes("lengthPassword")) notify("The password should be atleast four charachters long.", "error");
            if (failed.includes("match")) notify("The passwords do no match. Please try again.", "error");
            if (failed.includes("spaces")) notify("Username cannot contain spaces.", "error");
            if (failed.length > 0) return;

            const response = await api.createAccount(this.username, this.password);
            if (response) {
                console.log(response);
                notify(response.message, "success");
                router.push("/login");
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
        max-width: 400px;
    }
</style>