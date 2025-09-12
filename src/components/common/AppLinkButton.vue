<template>
    <router-link 
        :to="path" 
        class="app-link-button no-decoration"
    >
        <i 
            class="bx"
            :class="icon"
        ></i>
        <div class="name">{{ name }}</div>
    </router-link>
</template>

<script>
export default {
    name: 'AppLinkButton',
    props: {
        name: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.app-link-button {
    height: 100px;
    min-width: 100px;
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    border-radius: var(--border-radius-medium);
    font-weight: 500;
    padding-inline: var(--spacing-sm);
    font-size: var(--font-size-lg);
    color: var(--color-text-light);
    transition: color 0.1s ease-out;
}
.pointer-device .app-link-button:hover {
    color: var(--color-text);
}

.app-link-button i {
    font-size: 48px;
    text-decoration: none !important;
}

</style>