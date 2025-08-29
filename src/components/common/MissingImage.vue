<template>
    <div class="missing-image">
        <IconFileImage size="40px"/>
        <span>404</span>
    </div>
</template>

<script>
import IconFileImage from '@/components/icons/IconFileImage.vue';

export default {
    name: 'MissingImage',
    components: {
        IconFileImage,
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
    font-size: 32px;
    user-select: none;
}

</style>