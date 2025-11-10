<template>
    <div 
        class="title-showcase"
        @keydown="handleKeyDown"
        tabindex="0"
    >
        <link 
            v-for="title in showcaseTitles" 
            :key="title.title_id" 
            rel="preload" 
            as="image" 
            :href="`${apiUrl}/media/image/title/${title.title_id}/logo.${title.logo_file_type}${title.logo_file_type != 'svg' ? '?width=900' : ''}`"
        />

        <div class="content-wrapper content-width-extra-large">
            <div 
                v-for="(title, index) in showcaseTitles" 
                :key="title.title_id" 
                class="content"
                :class="{ active: index === showCaseIndex }"
            >
                <transition :name="transitionDirection" mode="out-in">
                    <div v-if="index === showCaseIndex">
                        <img 
                            v-if="getMediaUrl(
                                title?.title_images?.logo?.[0]?.path, 
                                title?.title_images?.logo?.[0]?.source_url
                            )"
                            class="logo"
                            :src="getMediaUrl(
                                title?.title_images?.logo?.[0]?.path, 
                                title?.title_images?.logo?.[0]?.source_url
                            )"
                        >

                        <div class="text-details">
                            <h1>{{ title.name }}</h1>

                            <div class="details">
                                <div>{{ convertToYear(title.release_date) }}</div>
                                <div>&verbar;</div>
                                <div>
                                    <template v-if="title.type === 'tv'">
                                        {{ title.season_count }} Seasons, {{ title.episode_count }} Episodes
                                    </template>
                                    <template v-else>
                                        {{ convertToTime(title.movie_runtime) }}
                                    </template>
                                </div>
                                <div>&verbar;</div>
                                <div>
                                    <IconTMDBColorful right="4px"/>
                                    {{ title.tmdb_vote_average }}
                                </div>
                                <div>&verbar;</div>
                                <div>
                                    {{ title.age_rating }}
                                </div>
                            </div>
    
                            <div class="genres">
                                <template 
                                    v-for="(genre, index) in title.genres"
                                    :key="index"
                                >
                                    <div v-if="index != 0">&bull;</div>
                                    <div>{{ genre }}</div>
                                </template>
                            </div>

                            <div class="overview">
                                {{ title.overview }}
                            </div>
                        </div>
            
                        <router-link 
                            :to="`/watch_list/title/${title.title_id}`" 
                            class="link-button no-decoration button-primary"
                        >
                            View details
                        </router-link>
                    </div>
                </transition>
            </div>

            <div v-if="showcaseTitles.length && showcaseTitles.length > 1" class="controls card">
                <i class="bx bx-chevron-left icon-button" @click="prev"></i>
                <IndicatorDots 
                    :dot-count="showcaseTitles.length" 
                    :dot-index="showCaseIndex"
                    @dotSelected="setShowcaseIndex"
                />
                <i class="bx bx-chevron-right icon-button" @click="next"></i>
            </div>
        </div>

        <div class="backdrop-wrapper">
            <img 
                v-for="(title, index) in showcaseTitles" 
                :key="index"
                :src="getMediaUrl(
                    title?.title_images?.backdrop?.[0]?.path, 
                    title?.title_images?.backdrop?.[0]?.source_url
                )"
                class="backdrop"
                :class="{ active: index === showCaseIndex }"
            >
        </div>
    </div>
</template>

<script>
import fastApi from '@/utils/fastApi';
import { apiUrl, isTouchDevice } from '@/utils/config';
import IndicatorDots from '@/components/WatchList/IndicatorDots.vue';
import { convert, getMediaUrl } from '@/utils/utils';
import IconTMDBColorful from '../icons/IconTMDBColorful.vue';

export default {
    name: 'TitleShowcase',
    components: {
        IndicatorDots,
        IconTMDBColorful,
    },
    data() {
        return {
            isTouchDevice: isTouchDevice,
            apiUrl: apiUrl,
            showCaseIndex: 0,
            showcaseTitles: [],
            transitionDirection: null,
        }
    },
    methods: {
        convertToTime(value) {
            return convert.toRuntime(value);
        },
        convertToYear(value) {
            return convert.toFiDate(value, 'year');
        },
        setShowcaseIndex(index) {
            const len = this.showcaseTitles.length;
            this.showCaseIndex = ((index % len) + len) % len;
        },
        prev() {
            this.transitionDirection = "slide-next";
            this.setShowcaseIndex(this.showCaseIndex - 1);
        },
        next() {
            this.transitionDirection = "slide-prev";
            this.setShowcaseIndex(this.showCaseIndex + 1);
        },
        getMediaUrl(path, sourceUrl, width) {
            return getMediaUrl(path, sourceUrl, width);
        },
        handleKeyDown(event) {
            if (['ArrowLeft', 'a', 'w', 'Backspace'].includes(event.key)) {
                this.prev();
            } else if (['ArrowRight', 'd', 's', 'Enter'].includes(event.key)) {
                this.next();
            } else if (['1', '2', '3', '4', '5'].includes(event.key)) {
                if (Number(event.key) <= this.imageLinks.length)
                    this.setShowcaseIndex(Number(event.key) - 1);
            }
        },
        async fetchShowcaseList() {
            const response = await fastApi.watch_list.titles.showcase({
                limit: 5,
                sort_by: 'popularity',
            });
            if (response) {
                this.showcaseTitles = response;
                console.log("this.showcaseTitles", this.showcaseTitles)
            }
        },
    },
    async mounted() {
        await this.fetchShowcaseList();
    },
}
</script>

<style scoped>
.title-showcase {
    width: 100vw;
    height: calc(100vh - 60px - var(--spacing-md) - 225px);
    max-height: 1100px;
    min-height: 700px;
    position: relative;
}

.content-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    max-width: min(90vw, 1920px);
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    max-width: 90vw;
    padding-bottom: 46px;
    opacity: 0;
    position: absolute;
    transition: opacity 0.5s ease;
}
.content.active {
    opacity: 1;
    position: relative;
    z-index: 1;
}

.controls {
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 0;
    left: 5vw;
    z-index: 2;
    user-select: none;
    padding: 4px var(--spacing-sm);
}
.controls .icon-button {
    font-size: 36px;
}

.logo {
    width: 600px;
    max-width: 100%;
    max-height: 250px;
    object-fit: contain;
    object-position: 0;
}


.text-details {
    margin-top: var(--spacing-xl);
    margin-bottom: var(--spacing-lg);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.text-details h1 {
    margin-top: 0;
    margin-bottom: var(--spacing-sm);
}
.details {
    /* font-size: var(--font-size-lg); */
    font-weight: 700;
    gap: calc(var(--spacing-sm) + var(--spacing-xs));
    /* color: var(--color-text-1); */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 0px;
}

.details > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.genres {
    /* font-size: var(--font-size-lg); */
    font-weight: 500;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    row-gap: 0;
}

.overview {
    max-width: min(90vw, 1920px, 100%);
    /* color: var(--color-text-3); */

    margin-top: var(--spacing-md);
    display: -webkit-box;
    line-clamp: 4;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.link-button {
    width: 300px;
    max-width: 100%;
    box-sizing: border-box;
}

/* .backdrop-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
} */
.backdrop {
    --width: 100%;
    object-fit: cover;
    position: absolute;
    top: calc(-1 * var(--height-top-bar));
    left: calc(100% - var(--width));
    width: var(--width);
    height: 125%;
    /* max-height: 100vw; */
    opacity: 0;
    z-index: -1;
    transition: opacity 0.5s var(--cubic-1);
    /* mask-image: linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 30vh); */
    mask-image: linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.33) 30%);
}
.title-showcase .backdrop.active {
    opacity: 1;
}
@media (max-height: 1200px) {
    .text-details {
        margin-top: var(--spacing-md);
    }
}
@media (max-width: 700px) {
    .controls {
        left: 50%;
        transform: translateX(-50%);
        gap: var(--spacing-sm);
        /* justify-content: space-between; */
    }
    .link-button {
        width: 100%;
    }
    .text-details {
        font-size: var(--font-size-xs);
    }
    .overview {
        font-size: var(--font-size-md);
    }
    .logo {
        max-width: 80%;
    }
}

.slide-next-enter-active, .slide-next-leave-active,
.slide-prev-enter-active, .slide-prev-leave-active {
    transition: opacity 0.4s var(--cubic-1),
                transform 0.4s var(--cubic-1);
}

/* Next */
.slide-next-enter-from {
    opacity: 0;
    transform: translateX(-5%);   /* slide in from the left */
}
.slide-next-leave-to {
    opacity: 0;
    transform: translateX(5%);    /* slide out to the right */
}

/* Prev */
.slide-prev-enter-from {
    opacity: 0;
    transform: translateX(5%);    /* slide in from the right */
}
.slide-prev-leave-to {
    opacity: 0;
    transform: translateX(-5%);   /* slide out to the left */
}
</style>