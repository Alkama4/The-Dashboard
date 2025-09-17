<template>
    <div class="collection">
        <router-link :to="`/watch_list/collection/${collection.collection_id}`" class="no-decoration hover-decoration">
            <div class="title-posters">
                <img
                    v-for="(title, index) in collection.titles.slice(0, 4)"
                    :key="index"
                    :src="getPosterUrl(title.title_id, 300, title.backup_poster_url)"
                >
            </div>
            <div class="details">
                <div class="name">{{ collection.name }}</div>
                <div class="detail">
                    {{ collection.children.length == 0 ? 'no' : collection.children.length }} child collection{{ collection.children.length == 1 ? '' : 's' }}
                </div>
                <div class="detail">{{ totalTitleCount }} titles</div>
            </div>
        </router-link>
        <DropdownMenu :options="dropDownOptions"/>
    </div>
</template>

<script>
import { getMediaImageUrl } from '@/utils/utils';
import DropdownMenu from '../common/DropdownMenu.vue';

export default {
    name: 'CollectionItem',
    components: {
        DropdownMenu
    },
    props: {
        collection: Object
    },
    data() {
        return {
            dropDownOptions: [
                { icon: "bxs-edit-alt", label: "Edit colletction", action: () => this.handleEditCollection(this.collection) },
                { icon: "bxs-trash", label: "Remove collection", action: () => this.handleRemoveCollection(this.collection.collection_id) },
            ]
        }
    },
    methods: {
        async handleRemoveCollection(collection_id) {
            this.$emit('remove-collection', collection_id);
        },
        async handleEditCollection(collection) {
            this.$emit('edit-collection', collection);
        },
        getPosterUrl(titleId, width, backupUrl) {
            return getMediaImageUrl(width, backupUrl, titleId);
        },
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
        },
    }
}
</script>

<style scoped>
.collection {
    display: flex;
    row-gap: var(--spacing-md);
    flex-direction: column;
    position: relative;
    box-sizing: border-box;
    width: 220px;
}

.dropdown-menu {
    top: var(--spacing-sm);
    right: var(--spacing-xs);
}

.title-posters {
    width: 100%;
    aspect-ratio: 2/3;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    border-radius: var(--border-radius-medium);
    overflow: hidden;
    background-color: var(--color-background-card);
    box-shadow: var(--shadow-card);
}
.title-posters img {
    height: 100%;
    width: 100%;
}

.details {
    margin-top: var(--spacing-sm);
    display: flex;
    flex-direction: column;
    align-items: start;
}

.name {
    font-size: var(--font-size-lg);
    font-weight: 700;
    color: var(--color-text);
    display: -webkit-box;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.detail {
    color: var(--color-text-light);
    font-weight: 500;
    font-size: var(--font-size-sm);
}

</style>
