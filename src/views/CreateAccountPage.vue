<template>
    <div class="login-page content-width-small">
        <h1>Create account</h1>
        <p>Create your account by filling in the form below.</p>

        <form @submit.prevent="handleLogin" class="card simple-form">
            <h2>Account Details</h2>
            <div>
                <label for="username">Username</label>
                <CustomGenericInput v-model="username" ref="usernameRef" placeholder="Choose a username"/>
            </div>
            <div>
                <label for="password">Password</label>
                <CustomPasswordInput v-model="password" ref="passwordRef" placeholder="Enter a password"/>
            </div>
            <div>
                <label for="password">Confirm password</label>
                <CustomPasswordInput v-model="passwordRepeat" ref="passwordRepeatRef" placeholder="Confirm your password"/>
            </div>
            <button class="button-primary" type="submit">Create account</button>
        </form>
    </div>
</template>

<script>
import fastApi from '@/utils/fastApi';
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
                this.$refs.usernameRef?.markInvalid();
            }

            if (this.password.length < 4) {
                failed.push("lengthPassword");
                this.$refs.passwordRef?.markInvalid();
                this.$refs.passwordRepeatRef.markInvalid();
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

            const response = await fastApi.account.create(this.username, this.password);
            if (response) {
                console.log(response);
                notify(response.message, "success");
                router.push("/account/login");
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