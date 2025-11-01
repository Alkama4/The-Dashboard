<template>
    <div class="collection-details content-width-extra-large">
        <h1>{{ response?.name }}</h1>
        <div class="details">
            <div>
                {{ convertToYear(response?.first_date) }} - {{ convertToYear(response?.last_date) }} &bull; {{ converToTime(response?.total_length) }}</div>
            <div class="description">{{ response?.description }}</div>
        </div>
        <div class="collection-wrapper">
            <CollectionItem 
                v-for="childCollection in response?.children"
                :key="childCollection.collection_id"
                :collection="childCollection" 
            />
        </div>
        <div v-if="response?.children.length > 0" class="seperator"></div>
        <div class="title-wrapper">
            <TitleCard
                v-for="title in response?.titles"
                :key="title.title_id"
                :title-details="title"
            />
        </div>
    </div>
</template>

<script>
import fastApi from '@/utils/fastApi';
import TitleCard from '@/components/WatchList/TitleCard.vue';
import CollectionItem from '@/components/WatchList/CollectionItem.vue';
import { convert } from '@/utils/utils';

export default {
    name: 'CollectionDetails',
    components: {
        TitleCard,
        CollectionItem,
    },
    data() {
        return {
            collectionId: this.$route.params.collectionId,
            response: null,
        }
    },
    methods: {
        async queryCollectionData() {
            const response = await fastApi.watch_list.collections.get(this.collectionId);
            if (response) {
                this.response = response;
            }
        },
        converToTime(minutes) {
            return convert.toTime(minutes * 60)
        },
        convertToYear(date) {
            return convert.toFiDate(date, "")
        },
    },
    async mounted() {
        await this.queryCollectionData();
    },
    watch: {
        '$route.params.collectionId': {
            immediate: true,
            handler(newId) {
                this.collectionId = newId;
                this.queryCollectionData();
            }
        }
    }
}

</script>

<style scoped>
h1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0;
}
.dropdown-menu {
    position: relative;
}

.details {
    margin-bottom: var(--spacing-lg);
    color: var(--color-text-light);
}
.description {
    color: var(--color-text);
}

.collection-wrapper {
    display: grid;
    gap: var(--spacing-md);
    grid-template-columns: repeat(auto-fit, minmax(clamp(0px, 50%, 450px), 1fr));
}

.title-wrapper {
    /* margin-top: var(--spacing-lg); */
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-md);
}
.seperator {
    margin: var(--spacing-lg) 0;
}
</style>