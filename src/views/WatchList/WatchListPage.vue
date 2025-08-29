<template>
    <div>
        <TitleShowcase/>

        <div v-for="(titleList, index) in titleLists" :key="index" class="content-width-extra-large title-list">
            <h2>{{ titleList.listName }}</h2>
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
                    draggable="false"
                />
            </Flicking>
            <div 
                v-else
                class="title-card-placeholder loading-placeholder"
            >
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
import TitleShowcase from '@/components/TitleShowcase.vue';
import { apiUrl } from '@/utils/config';
import Flicking from "@egjs/vue3-flicking";
import TitleCard from '@/components/TitleCard.vue';
import IconSearch from '@/components/icons/IconSearch.vue';

export default {
    name: 'HomePage',
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
                    listName: "In progress",
                    text: "TV-series that you have started but have not finished yet.",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        sort_by: "last_updated",
                        title_type: "tv",
                        season_in_progress: true,
                        in_watchlist: true,
                    }
                },
                {
                    listName: "Movies to watch",
                    text: "Movies that are on your watch list and that you have yet not watched.",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        sort_by: "release_date",
                        title_type: "movie",
                        watched: false,
                        released: true,
                        in_watchlist: true,
                    }
                },
                {
                    listName: "TV-series to start watching",
                    text: "TV-series that you are have on you watch list but haven't started to watch yet.",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        sort_by: "release_date",
                        title_type: "tv",
                        title_in_progress: false,
                        watched: false,
                        released: true,
                        in_watchlist: true,
                    }
                },
                {
                    listName: "Recently added",
                    text: "Titles that you recently added to your watchlist.",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        sort_by: "last_updated",
                        watched: false,
                        in_watchlist: true,
                    }
                },
                {
                    listName: "New Seasons Available",
                    text: "TV series you've watched up to the end of a season, and now a new season has been released.",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        sort_by: "release_date",
                        direction: "asc",
                        title_type: "tv",
                        title_in_progress: true,
                        season_in_progress: false,
                        watched: false,
                        in_watchlist: true
                    }
                },
                {
                    listName: "Your favourites",
                    text: "Your favourite movies and TV-series.",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        favourite: true,
                        in_watchlist: true,
                    }
                },
                {
                    listName: "Just watched",
                    text: "The titles you've recently watched or interacted with, such as those you've watched or added to your favorites.",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        sortBy: "last_updated",
                        watched: true,
                        in_watchlist: true,
                    }
                },
                {
                    listName: "Upcoming titles",
                    text: "Upcoming titles to look forward to.",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        sort_by: "release_date",
                        direction: "asc",
                        released: false,
                        in_watchlist: true,
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
    height: calc(330px * 0.95);
    width: calc(100% - 220px * 0.05);
    margin: calc(330px * 0.025) calc(220px * 0.025);
    border-radius: var(--border-radius-large);
}

.title-list h2 {
    margin-bottom: var(--spacing-xs);
}
.title-list .title-list-text {
    margin-top: var(--spacing-xs);
}

.bottom {
    margin-top: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
}
.bottom a {
    margin-top: var(--spacing-md);
}
</style>
