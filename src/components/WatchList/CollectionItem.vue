<template>
    <div class="collection">
        <router-link :to="`/watch_list/collection/${collection.collection_id}`" class="no-decoration">
            <div class="title-posters">
                <img
                    v-for="(title, index) in collection.preview_titles.slice(0, 4)"
                    :key="index"
                    :src="getPosterUrl(title?.title_images?.poster?.[0]?.path, title?.title_images?.poster?.[0]?.source_url, 300)"
                >
            </div>
            <div class="details">
                <div class="name">{{ collection.name }}</div>
                <!-- <div class="detail">
                    {{ collection.children.length == 0 ? 'no' : collection.children.length }} child collection{{ collection.children.length == 1 ? '' : 's' }}
                </div> -->
                <div class="description">{{ collection.description }}</div>
                <div class="detail">{{ collection.total_count }} titles &bull; {{ converToTime(collection.total_length) }}</div>
                <div class="detail">{{ convertToYear(collection.first_date) }} - {{ convertToYear(collection.last_date) }}</div>
            </div>
        </router-link>
        <DropdownMenu :options="dropDownOptions"/>
    </div>
</template>

<script>
import { convert, getMediaUrl } from '@/utils/utils';
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
                { icon: "bxs-trash", label: "Delete collection", action: () => this.handleRemoveCollection(this.collection.collection_id) },
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
        getPosterUrl(path, sourceUrl, width) {
            return getMediaUrl(path, sourceUrl, width);
        },
        converToTime(minutes) {
            return convert.toTime(minutes * 60)
        },
        convertToYear(date) {
            return convert.toFiDate(date, "year")
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
        },
    }
}
</script>

<style scoped>
.collection {
    position: relative;
    display: flex;
    row-gap: var(--spacing-md);
    flex-direction: column;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 180px;
    background-color: var(--color-background-card);
    border-radius: var(--border-radius-medium);
    overflow: hidden;
    box-shadow: var(--shadow-card);
    transition: background-color 0.1s ease-out;
}
.collection:hover {
    background-color: var(--color-background-card-hover);
}
.collection:active {
    background-color: var(--color-background-card-active);
}

.dropdown-menu {
    top: var(--spacing-sm);
    right: var(--spacing-xs);
    z-index: 15;
}

.title-posters {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    mask: linear-gradient(to right, hsla(0, 0%, 0%, 0), hsla(0, 0%, 0%, 0.25));
}
.title-posters img {
    aspect-ratio: 2/3;
    height: 100%;
}

.details {
    margin-top: var(--spacing-sm);
    margin-right: var(--spacing-lg);
    display: flex;
    position: sticky;
    flex-direction: column;
    align-items: start;
    z-index: 10;
    padding: var(--spacing-sm) var(--spacing-md);
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
.collection:hover .name {
    text-decoration: underline;
}

.description {
    white-space: wrap;
}

.detail {
    color: var(--color-text-light);
    font-weight: 500;
    font-size: var(--font-size-sm);
}

</style>
