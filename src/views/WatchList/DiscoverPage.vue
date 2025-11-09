<template>
    <div>
        <TitleShowcase/>

        <div v-for="(titleList, index) in titleLists" :key="index" class="title-list content-width-extra-large">
            <h2>
                <a :href="buildSearchLink(titleList)" class="no-decoration">
                    <span>{{ titleList.listName }}</span>
                    <i class="bx bx-chevron-right"></i>
                </a>
            </h2>
            <div class="flicking-wrapper">
                <div 
                    v-if="titleList.titles == null"
                    class="title-card-placeholder content-not-found"
                >
                    Try adding titles to your watchlist.
                </div>
                <Flicking 
                    v-else-if="titleList.titles.length >= 1"
                    :options="{
                        align: 'prev',
                        bound: true,
                        bounce: '33%',
                        renderOnlyVisible: false,
                    }"
                >
                    <TitleCard 
                        v-for="(data, index) in titleList.titles" 
                        :key="index" 
                        :titleDetails="data" 
                        :class="{ 'last': index == titleList.titles.length - 1 }"
                        @favourite-toggle="data.favourite = !data.favourite"
                    />
                </Flicking>
                <div 
                    v-else
                    class="title-card-placeholder loading-placeholder"
                >
                </div>
            </div>
        </div>
        <div class="content-width-small bottom">
            <h2>You've reached the bottom.</h2>
            Impressive dedication. Sadly, there's nothing else hiding down here.  
            If you're still determined, you could always try searching instead. 
            <router-link class="link-button no-decoration" to="/watch_list/titles">
                <IconSearch size="20px"/> Fine, let's search
            </router-link>
        </div>
    </div>
</template>


<script>
import fastApi from '@/utils/fastApi';
import TitleShowcase from '@/components/WatchList/TitleShowcase.vue';
import { apiUrl } from '@/utils/config';
import Flicking from "@egjs/vue3-flicking";
import TitleCard from '@/components/WatchList/TitleCard.vue';
import IconSearch from '@/components/icons/IconSearch.vue';

export default {
    name: 'DiscoverPage',
    components: {
        TitleShowcase,
        Flicking,
        TitleCard,
        IconSearch,
    },
    data() {
        return {
            apiUrl: apiUrl,
            waitingForResult: [],
            titleLists: [
                {
                    listName: "Your Favourites",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        favourite: true,
                        in_watchlist: true,
                    }
                },
                {
                    listName: "Continue Watching",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        watch_status: "partially_watched",
                        in_watchlist: true,
                    }
                },
                {
                    listName: "Unwatched Movies",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        title_type: "movie",
                        watch_status: "unwatched",
                        released: true,
                        in_watchlist: true,
                    }
                },
                {
                    listName: "TV Shows In Progress",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        title_type: "tv",
                        season_in_progress: true,
                        in_watchlist: true,
                    }
                },
                {
                    listName: "Recently Updated",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        sort_by: "data_updated",
                        direction: "DESC",
                        in_watchlist: true,
                    }
                },
                {
                    listName: "Available Movies",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        has_media_entry: true,
                        title_type: "movie",
                        watch_status: "unwatched",
                        in_watchlist: true,
                    }
                },
                {
                    listName: "Available series",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        has_media_entry: true,
                        title_type: "tv",
                        watch_status: "unwatched",
                        in_watchlist: true,
                    }
                },
                {
                    listName: "Highest Rated",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        sort_by: "rating",
                        direction: "DESC",
                        in_watchlist: true,
                    }
                },
                {
                    listName: "Most Popular",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        sort_by: "popularity",
                        direction: "DESC",
                        in_watchlist: true,
                    }
                },
                {
                    listName: "New Releases",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        released: true,
                        sort_by: "release_date",
                        direction: "DESC",
                        in_watchlist: true,
                    }
                },
                {
                    listName: "Upcoming",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        released: false,
                        sort_by: "release_date",
                        direction: "ASC",
                        in_watchlist: true,
                    }
                },
                {
                    listName: "Not in list",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        in_watchlist: false,
                    }
                },
            ],
        };
    },
    methods: {
        async fetchTitleLists() {
            try {
                await Promise.all(this.titleLists.map(async (list) => {
                    list.loading = true;
                    try {
                        const options = Object.fromEntries(
                            Object.entries(list.fetchDetails).filter(([, value]) => {
                                return value != null
                            })
                        );

                        const titleData = await fastApi.watch_list.titles.list({
                            ...options
                        });

                        if (titleData && titleData.titles) {
                            list.titles = titleData.titles.length == 0 ? null : titleData.titles;
                        } else {
                            list.titles = null;
                        }
                    } catch (error) {
                        console.error(`Error fetching data for ${list.listName}:`, error);
                        list.titles = null;
                    } finally {
                        list.loading = false;
                    }
                }));
            } catch (error) {
                console.error("Error fetching title lists:", error);
            }
        },
        buildSearchLink(titleList) {
            let isFirst = true;
            let link = "/watch_list/search";
            for (const [key, value] of Object.entries(titleList.fetchDetails)) {
                if (isFirst) {
                    isFirst = false;
                    link += `?${key}=${value}`
                } else {
                    link += `&${key}=${value}`
                }
            }
            return link
        }
    },
    async mounted() {
        this.waitingForResult.push("allTitlesList");

        await this.fetchTitleLists();
    },
};
</script>


<style>
@import url("/node_modules/@egjs/vue3-flicking/dist/flicking.css");
.title-card-placeholder {
    height: 414px;
    width: 100%;
    border-radius: var(--border-radius-large);
}

.title-list h2 {
    width: fit-content;
    margin-bottom: var(--spacing-xs);
    margin-top: var(--spacing-xl);
}
.title-list h2 a {
    align-items: center;
    display: flex;
}
.title-list h2 i {
    opacity: 0;
    font-size: var(--font-size-xxl);
    transition: opacity 0.2s var(--cubic-1);
}
.title-list h2:hover i {
    opacity: 1;
}

.title-list .title-list-text {
    margin-top: var(--spacing-xs);
    margin-bottom: var(--spacing-md);
}

.title-card {
    margin-right: var(--spacing-md);
    width: clamp(180px, 15vw, 225px);     /* 15vw is just an example */
}
.title-card.last {
    margin-right: 0;
}

.flicking-wrapper {
    margin-inline: calc(-1 * var(--flicking-fade-width));
}

.bottom {
    margin-top: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
}
.bottom a {
    margin-top: var(--spacing-md);
}
</style>
