<template>
    <div class="nested-links">
        <template v-for="(value, key) in data" :key="key">
            <a v-if="typeof value === 'object' && value.link" class="link-button no-decoration hover-decoration" :href="value.link" :alt="value.name">
                <component :is="value.icon" size="32px" />
                <div class="text">
                    <div class="name">{{ value.name }}</div>
                    <div class="details">{{ value.details }}</div>
                </div>
            </a>
            
            <template v-if="typeof value === 'object' && value.link">
                <template v-for="(subVal, subKey) in Object.entries(value).filter(([k]) => !['name', 'link', 'details', 'icon'].includes(k))" :key="subKey">
                    <WatchNowRecursive :data="{ [subVal[0]]: subVal[1] }" />
                </template>
            </template>

            <div v-else-if="typeof value === 'object'" class="border">
                <h4>{{ key }}</h4>
                <WatchNowRecursive :data="value" />
            </div>

            <!-- <div v-else>
                Not object
            </div> -->
        </template>
    </div>
</template>


<script>
import IconFilm from '@/components/icons/IconFilm.vue';

export default {
    name: 'WatchNowRecursive',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    components: {
        IconFilm
    }
}
</script>

<style scoped>

.border {
    margin-top: var(--spacing-md);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-medium);
    padding: var(--spacing-md);
    position: relative;
    width: 100%;
}

h4 {
    position: absolute;
    left: 18px;
    top: -14px;
    margin: 0;
    background-color: var(--color-background-card);
    padding-inline: var(--spacing-sm);
}

.nested-links {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
}
.link-button {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: var(--spacing-md);
    
    box-sizing: border-box;
    padding: var(--spacing-sm) var(--spacing-md);
    /* min-width: 220px; */
    /* height: 110px; */
    /* min-width: 200px; */
    flex: 1;
}
.link-button .name {
    white-space: nowrap;
}
.link-button .details {
    white-space: nowrap;
    color: var(--color-text-light);
    font-weight: 400;
    font-size: 0.75rem;
}
</style>