<template>
    <div class="collection-details content-width-extra-large">
        <h1>{{ response?.name }}</h1>
        <div class="text-light description">{{ response?.description }}</div>
        <div class="title-wrapper">
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
        }
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
    margin-bottom: 0;
}
.description {
    margin-bottom: var(--spacing-lg);
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