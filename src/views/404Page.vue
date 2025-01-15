<template>
    <div class="four-o-four-holder">
        <h1 class="humogous">404</h1>
        <h1>Page not found</h1>
        <p>The page you are looking for doesn't seem to exist.</p>
        <button @click="goBack()" class="color-primary">Go back</button>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    methods: {
        goBack() {
            if (window.history.length > 1) {
                this.$router.back();
            } else {
                this.$router.push('/');
            }
        }
    }
}
</script>

<style scoped>
.four-o-four-holder {
    display: flex;
    flex-direction: column;
    width: 100%;
}
h1.humogous {
    font-size: 96px;
    text-align: center;
    margin: 0;
    margin-top: var(--spacing-hg);
    margin-bottom: var(--spacing-md);
}
h1 {
    margin: 0;
}
.sign {
    margin: var(--spacing-md);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
p {
    width: 100%;
}
</style>