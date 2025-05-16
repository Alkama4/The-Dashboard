<template>
    <div>
        <div class="content-width-medium">
            <h1>Discover <span class="text-lighter">(Under construction)</span></h1>
            <p>Here you can find and track movies and TV-series from your watch list. If your watch list is empty you can search for titles to add with the button on the bottom right corner of the screen. </p>
        </div>

        <div v-for="(titleList, index) in titleLists" :key="index" class="content-width-large title-list">
            <h2>{{ titleList.listName }}</h2>
            <p class="text-light title-list-text">{{ titleList.text }}</p>

            <CustomCarousel
                :slides="titleList.titles"
                :loading="titleList.loading"
            />
        </div>

        <!-- Corner buttons -->
        <router-link 
            class="sticky-corner-button link-button button-primary"
            to="/watch_list/add_title" 
        >
            <IconAdd size="28px"/>
        </router-link>

        <router-link 
            class="sticky-corner-button link-button button-primary"
            to="/watch_list/titles" 
            style="margin-bottom: calc(var(--spacing-lg) * 1.5 + 52px);"
        >
            <IconSearch size="28px"/>
        </router-link>
    </div>
</template>


<script>
// My imports
import IconAdd from '@/components/icons/IconAdd.vue';
import fastApi from '@/utils/fastApi';
import CustomCarousel from '@/components/CustomCarousel.vue';
import IconSearch from '@/components/icons/IconSearch.vue';

export default {
    name: 'HomePage',
    components: {
        CustomCarousel,
        IconAdd,
        IconSearch,
    },
    data() {
        return {
            apiUrl: process.env.VUE_APP_API_URL,
            waitingForResult: [],
            titleLists: [
                {
                    listName: "In progress",
                    watched: true,
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
                    listName: "Upcoming titles",
                    watched: true,
                    text: "Upcoming titles you've added to your list.",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        sort_by: "release_date",
                        direction: "asc",
                        released: false,
                    }
                },
                {
                    listName: "Your favourites",
                    watched: true,
                    text: "Your favourite movies and TV-series.",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        favourite: true,
                    }
                },
                {
                    listName: "Watched titles",
                    watched: true,
                    text: "The titles you've recently watched or interacted with, such as those you've watched or added to your favorites.",
                    titles: [],
                    loading: true,
                    fetchDetails: {
                        sortBy: "last_updated",
                        watched: true,
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
                        console.log(options)

                        const titleData = await fastApi.watch_list.titles.list({
                            ...options
                        });

                        if (titleData && titleData.titles) {
                            list.titles = titleData.titles;
                            console.debug(list.listName, "titles and their info:", list.titles);
                        }
                    } catch (error) {
                        console.error(`Error fetching data for ${list.listName}:`, error);
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


<style scoped>
.title-list h2 {
    margin-bottom: var(--spacing-xs);
}
.title-list .title-list-text {
    margin-top: var(--spacing-xs);
}
</style>
