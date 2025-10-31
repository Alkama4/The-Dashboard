<template>
    <div>
        <TitleShowcase/>

        <div v-for="(titleList, index) in titleLists" :key="index" class="title-list content-width-extra-large">
            <h2>{{ titleList.listName }}</h2>
            <!-- <div class="title-list-text text-light">{{ titleList.text }}</div> -->
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
                        favourite: true
                    }
                },
                {
                    listName: "Continue Watching",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        watch_status: "partially_watched"
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
                    }
                },
                {
                    listName: "TV Shows In Progress",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        title_type: "tv",
                        season_in_progress: true
                    }
                },
                {
                    listName: "Recently Updated",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        sort_by: "data_updated",
                        direction: "DESC"
                    }
                },
                {
                    listName: "Available Movies",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        has_media_entry: true,
                        title_type: "movie",
                        watch_status: "unwatched"
                    }
                },
                {
                    listName: "Available series",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        has_media_entry: true,
                        title_type: "tv",
                        watch_status: "unwatched"
                    }
                },
                {
                    listName: "Highest Rated",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        sort_by: "rating",
                        direction: "DESC"
                    }
                },
                {
                    listName: "Most Popular",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        sort_by: "popularity",
                        direction: "DESC"
                    }
                },
                {
                    listName: "New Releases",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        released: true,
                        sort_by: "release_date",
                        direction: "DESC"
                    }
                },
                {
                    listName: "Upcoming",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        released: false,
                        sort_by: "release_date",
                        direction: "ASC"
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
    margin-bottom: var(--spacing-xs);
    margin-top: var(--spacing-xl);
}
.title-list .title-list-text {
    margin-top: var(--spacing-xs);
    margin-bottom: var(--spacing-md);
}

.title-card {
    margin-right: var(--spacing-md);
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
