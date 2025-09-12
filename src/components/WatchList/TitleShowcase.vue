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
                            class="logo"
                            :src="`${apiUrl}/media/image/title/${title.title_id}/logo.${title.logo_file_type}${title.logo_file_type != 'svg' ? '?width=900' : ''}`"
                        >

                        <div class="details">
                            <div class="rating">
                                <IconTMDB right="4px"/>
                                {{ title.tmdb_vote_average }} ({{ title.tmdb_vote_count }} votes)
                                <div class="bullet">&ZeroWidthSpace; &bull; &ZeroWidthSpace;</div>
                            </div>
                            <div>
                                <template v-if="title.type === 'tv'">
                                    {{ title.season_count }} Seasons, {{ title.episode_count }} Episodes
                                </template>
                                <template v-else>
                                    {{ convertToTime(title.movie_runtime) }}
                                </template>
                                <div class="bullet">&ZeroWidthSpace; &bull; &ZeroWidthSpace;</div>
                            </div>
                            <div>{{ convertToYear(title.release_date) }}</div>
                        </div>

                        <div class="overview">
                            {{ title.overview }}
                        </div>
            
                        <router-link 
                            :to="`/watch_list/title/${title.title_id}`" 
                            class="link-button no-decoration"
                        >
                            View details
                        </router-link>
                    </div>
                </transition>
            </div>

            <div class="controls">
                <IconChevronDown class="icon-button" size="36px" style="rotate: 90deg;" @click="prev"/>
                <IndicatorDots 
                    :dot-count="showcaseTitles.length" 
                    :dot-index="showCaseIndex"
                    @dotSelected="setShowcaseIndex"
                />
                <IconChevronDown class="icon-button" size="36px" style="rotate: -90deg;" @click="next"/>
            </div>
        </div>

        <div class="backdrop-wrapper">
            <img 
                v-for="(link, index) in imageLinks" 
                :key="index"
                :src="link"
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
import { convert } from '@/utils/utils';
import IconTMDB from '@/components/icons/IconTMDB.vue';
import IconChevronDown from '@/components/icons/IconChevronDown.vue';

export default {
    name: 'TitleShowcase',
    components: {
        IndicatorDots,
        IconChevronDown,
        IconTMDB,
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
            return convert.toFiDate(value, 'monthAndYear');
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
                console.log(this.showcaseTitles[0])
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

<style scoped>
.title-showcase {
    width: 100vw;
    height: 70vh;
    max-height: 1000px;
    position: relative;
}

.content-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    max-width: 90vw;
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
}

.logo {
    width: 600px;
    max-width: 100%;
}

.details {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--color-text);
    margin: var(--spacing-md) 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.details > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.overview {
    max-width: 60ch;
    color: var(--color-text-light);
    margin: var(--spacing-md) 0;

    display: -webkit-box;
    line-clamp: 5;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.link-button {
    width: 300px;
    max-width: 100%;
    box-sizing: border-box;
}

.backdrop-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}
.backdrop {
    --width: 70%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: calc(100% - var(--width));
    width: var(--width);
    height: 120%;
    /* max-height: 100vw; */
    opacity: 0;
    z-index: -1;
    transition: opacity 0.5s var(--cubic-1);
    /* mask-image: linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 30vh); */
    mask-image: linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 30%),
                linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%);
    mask-composite: intersect;
}
.title-showcase .backdrop.active {
    opacity: 1;
}
@media (max-width: 1500px) {
    .title-showcase .backdrop {
        --width: 100%;
        mask-image: linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.33) 30%);
    }
    .overview {
        display: -webkit-box;
        line-clamp: 4;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}
@media (max-width: 700px) {
    .controls {
        left: 50%;
        transform: translateX(-50%);
    }
    .link-button {
        width: 100%;
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
    transform: translateX(5%);
}
.slide-next-leave-to {
    opacity: 0;
    transform: translateX(-5%);
}

/* Prev */
.slide-prev-enter-from {
    opacity: 0;
    transform: translateX(-5%);
}
.slide-prev-leave-to {
    opacity: 0;
    transform: translateX(5%);
}

</style>