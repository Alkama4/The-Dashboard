<template>
    <div class="collection">
        <div class="header-bar">
            <div class="name-description">
                <h2>{{ collection.name }}</h2>
                <span class="text-light">{{ `${totalTitleCount} titles &bull; ${collection.description}` }}</span>
            </div>
            <div>
                <IconTrash @click="handleRemoveCollection(collection.collection_id)" class="icon-button"/>
                <IconEdit @click="handleEditCollection(collection)" class="icon-button"/>
            </div>
        </div>
        <CustomCarousel v-if="!collection.children.length" :slides="collection.titles"/>
        
        <div v-for="(childCollection, index) in collection.children" :key="index">
            <CollectionItem :collection="childCollection"/>
        </div>
    </div>
</template>

<script>
import IconTrash from '@/components/icons/IconTrash.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import CustomCarousel from '@/components/WatchList/CustomCarousel.vue';

export default {
    name: 'CollectionItem',
    components: {
        IconTrash,
        IconEdit,
        CustomCarousel,
    },
    props: {
        collection: Object
    },
    methods: {
        async handleRemoveCollection(collection_id) {
            this.$emit('remove-collection', collection_id);
        },
        async handleEditCollection(collection) {
            this.$emit('edit-collection', collection);
        }
    },
    computed: {
        totalTitleCount() {
            const countTitles = (collection) => {
                let count = collection.titles.length;
                for (const child of collection.children || []) {
                    count += countTitles(child);
                }
                return count;
            };
            return countTitles(this.collection);
        }
    }
}
</script>

<style scoped>
.collection {
    display: flex;
    row-gap: var(--spacing-md);
    flex-direction: column;
    border-radius: var(--border-radius-medium);
    padding: var(--spacing-md);
    border: 1px solid var(--color-border);
    box-sizing: border-box;
    width: 100%;
}

.collection .header-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.collection .header-bar .name-description {
    display: flex;
    flex-direction: column;
    align-items: start;
    column-gap: var(--spacing-md);
}

.collection h2 {
    display: inline;
    margin: 0;
}
</style>
