<template>
    <div class="missing-image">
        <IconHidden size="40px"/>
        <span>Hidden</span>
    </div>
</template>

<script>
import IconHidden from '@/components/icons/IconHidden.vue';

export default {
    name: 'MissingImage',
    components: {
        IconHidden,
    }
}
</script>

<style scoped>
.missing-image {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--color-text-hidden);
    font-weight: 700;
    font-size: 20px;
    user-select: none;
}

</style>