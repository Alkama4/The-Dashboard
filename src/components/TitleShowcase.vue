<template>
    <div 
        class="title-showcase"
    >
        <BackdropSlideShow 
            :imageLinks="imageLinks"
            :associatedDetails="showcaseTitles"
        />
    </div>
</template>

<script>
import fastApi from '@/utils/fastApi';
import { apiUrl } from '@/utils/config';
import BackdropSlideShow from './BackdropSlideShow.vue';

export default {
    name: 'TitleShowcase',
    components: {
        BackdropSlideShow,
    },
    data() {
        return {
            apiUrl: apiUrl,
            showCaseIndex: 0,
            showcaseTitles: [],
        }
    },
    methods: {
        setShowcaseIndex(index) {
            const len = this.showcaseTitles.length;
            this.showCaseIndex = ((index % len) + len) % len;
        },
        async fetchShowcaseList() {
            const response = await fastApi.watch_list.titles.showcase({
                limit: 5,
                sort_by: 'popularity',
            });
            if (response) {
                this.showcaseTitles = response;
            }
        },
    },
    async mounted() {
        await this.fetchShowcaseList();
    },
    computed: {
        imageLinks() {
            const suffix = this.isTouchDevice ? '?width=1200' : '';
            const result = this.showcaseTitles.map(title => {
                if (!title.title_id) return [];
                return `${this.apiUrl}/media/image/title/${title.title_id}/backdrop1.jpg${suffix}`;
            });
            return result;
        }
    }
}
</script>

<style>
.title-showcase .backdrop-dimension {
    min-height: 400px !important;
    max-width: min(100vw, 1500px);
}
.title-showcase .backdrop-image-container img.backdrop-image {
    mask-image: linear-gradient(to top, transparent 0%, rgba(255,255,255,0.2) 40%, white 75%) !important;
}
</style>