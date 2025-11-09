<template>
    <div class="content-width-small">
        <h1>Add title <span class="text-lighter">(Under construction)</span></h1>
        <p>Use the search box below to search for movies or TV-show to add to your watch list. Please note that if no one has added the title to their watch list before the process takes a while since the server queries for all the data for it. Especially on TV-series, since the amount of data is so much greater. </p>

        <form @submit.prevent="searchForTitles" class="title-form">
            <div>
                <label>Title category</label>
                <SliderToggle 
                v-model="titleCategory"
                :options="['Movie', 'TV']" 
                :colors="{
                    color1: 'var(--color-secondary)',
                    color1Hover: 'var(--color-secondary-hover)',
                    color2: 'var(--color-tertiary)',
                    color2Hover: 'var(--color-tertiary-hover)',
                }"
            />
            </div>
            <div>
                <label>Title name</label>
                <input type="text" v-model="titleName">
            </div>
            <div class="flex-row">
                <button 
                    class="button-primary" 
                    :disabled="waitingForResult.includes('search')" 
                    :class="{ loading: waitingForResult.includes('search')}"
                >
                    Search
                </button>
            </div>
        </form>

        <div class="results">
            <h2>Seach results</h2>
            <div v-if="searchResults == null && waitingForResult.includes('search')" class="card result-placeHolder loading-placeholder">
            </div>
            <div v-else-if="searchResults == null" class="card result-placeHolder">
                The results will appear here
            </div>
            <div v-for="title in searchResults" :key="title.id" class="card result">
                <img :src="'https://image.tmdb.org/t/p/w300' + title.poster_path" alt=" " @load="(event) => event.target.classList.add('loaded')" />
                <div class="title-texts">
                    <div class="make-space-on-mobile">
                        <h3 class="icon-align">
                            <!-- Title Link -->
                            <a class="no-decoration" :href="titleLink(title)" style="color: var(--color-text)">
                                <span v-if="title.title" :title="title.title" class="name">
                                    {{ title.title }}
                                </span>
                                <span v-if="title.original_title && title.original_title !== title.title" class="original-name" :title="title.original_title">
                                    ({{ title.original_title }})
                                </span>

                                <span v-if="title.name" :title="title.name" class="name">
                                    {{ title.name }}
                                </span>
                                <span v-if="title.original_name && title.original_name !== title.name" class="original-name" :title="title.original_name">
                                    ({{ title.original_name }})
                                </span>
                            </a>

                            <!-- External TMDB Link Icon (only if title_id exists) -->
                            <a v-if="title.title_id" class="no-decoration icon-align external-link-icon" :href="tmdbLink(title)" target="_blank" rel="noopener noreferrer">
                                <IconLinkExternal style="margin-left: 5px;" size="18px"/>
                            </a>
                        </h3>
                        <div class="flex details">
                            <div class="flex score" :title="(title.vote_count + ' votes')">
                                <IconTMDB/>
                                <span>{{ title.vote_average ? title.vote_average.toFixed(1) : 0 }}</span>
                            </div>
                            <span class="divider">&bullet;</span>

                            <span v-if="title.release_date">{{ movieDate(title.release_date) }}</span>
                            <span v-else>{{ movieDate(title.first_air_date) }}</span>
                        </div>
                        <div class="flex genres">
                            <div v-for="genre in title.genres" :key="genre" class="genre">
                                {{ genre }}
                            </div>
                        </div>
                    </div>
                    <div class="overview">{{ title.overview }}</div>
                    <div class="add-or-remove flex">
                        <button 
                            v-if="title.in_watch_list" 
                            class="button-danger" 
                            @click="removeTitle(title.title_id)"
                            :disabled="waitingForResult.includes(title.title_id)" 
                            :class="{ loading: waitingForResult.includes(title.title_id)}"
                        >
                            <IconTrash size="16px"/>Remove
                        </button>
                        <button 
                            v-else class="button-primary" 
                            @click="addTitle(title.id, title.title ? 'movie' : 'tv')"
                            :disabled="waitingForResult.includes(title.id)" 
                            :class="{ loading: waitingForResult.includes(title.id)}"
                        >
                            <IconAdd size="16px"/>Add to list
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <ModalConfirmation 
            ref="removeTitleCM"
            header="Remove from watchlist"
            text="Are you sure you wan't to remove the title from your watchlist?
            This gets rid of all your data on the title like your watched episodes and notes."
            affirmative-option="Remove title"
        />
    </div>
</template>

  
<script>
import IconAdd from '@/components/icons/IconAdd.vue';
import IconLinkExternal from '@/components/icons/IconLinkExternal.vue';
import IconTMDB from '@/components/icons/IconTMDB.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import ModalConfirmation from '@/components/common/ModalConfirmation.vue';
import SliderToggle from '@/components/common/SliderToggle.vue';
import fastApi from '@/utils/fastApi';
import { notify } from '@/utils/notification';

export default {
    components: {
        SliderToggle,
        ModalConfirmation,
        IconTMDB,
        IconAdd,
        IconTrash,
        IconLinkExternal,
    },
    data() {
        return {
            titleCategory: "Movie",
            resultTitleCategory: null,
            titleName: "",
            searchResults: null,
            waitingForResult: [],
            showConfirmationModal: false,
            waiting: null,
            // This is clunky and the modal should be redone to allow better handling.
            titleToBeRemoved: ""
        }
    },
    methods: {
        async searchForTitles() {
            if (this.titleName !== "") {
                this.waitingForResult.push("search");
                this.resultTitleCategory = this.titleCategory.toLowerCase();
                this.searchResults = null;
                const response = await fastApi.watch_list.search(this.titleName, this.titleCategory.toLowerCase());
                if (response) {
                    this.searchResults = response.result.results;
                    console.log("[searchForTitles] Api response: ", response);
                }
                this.removeItemFromWaitingArray("search");
            } else {
                notify("The title name can not be empty.")
            }
        },
        movieDate(date) {
            const newDate = new Date(date);
            if (newDate == "Invalid Date") {
                return "No date"
            } else {
                return new Date(newDate).toLocaleDateString('fi-FI', { 
                    // weekday: 'short',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
            }
        },
        async removeTitle(title_id) {
            // Confirm with the user
            if (! await this.$refs.removeTitleCM.prompt()) return;

            // Disable click
            this.waitingForResult.push(title_id);

            // Make the api call
            const response = await fastApi.watch_list.titles.remove(title_id);
            if (response) {
                // Change the data on site for the title
                this.searchResults.find(result => result.title_id === title_id).in_watch_list = false;
            }

            // Allow click
            this.removeItemFromWaitingArray(title_id);
        },
        async addTitle(titleTmdbId, type) {
            // Disable click
            this.waitingForResult.push(titleTmdbId);

            const response = await fastApi.watch_list.titles.add(null, titleTmdbId, type);
            if (response) {
                // Find the title and update the in_watch_list to reflect the current state and set the title_id
                // to make the link update to the internal site.
                const result = this.searchResults.find(result => result.id === titleTmdbId);
                if (result) {
                    result.in_watch_list = true;
                    result.title_id = response.title_id;
                }
            }
            
            // Allow click
            this.removeItemFromWaitingArray(titleTmdbId);
        },
        removeItemFromWaitingArray(item) {
            this.waitingForResult = this.waitingForResult.filter(i => i !== item);
        },
        titleLink(title) {
            if (title.title_id) {
                return `/watch_list/title/${title.title_id}`;
            }
            return `https://www.themoviedb.org/${this.resultTitleCategory}/${title.id}`;
        },
        tmdbLink(title) {
            return `https://www.themoviedb.org/${this.resultTitleCategory}/${title.id}`;
        }
    },
};
</script>

  
<style scoped>
    .title-form {
        display: grid;
        gap: var(--spacing-md);
        grid-template-columns: 180px auto auto;
        justify-content: center;
        align-items: end;
    }
    .title-form input, .title-form button {
        margin: 0;
    }

    .result-placeHolder {
        text-align: center;
        height: 250px;
        color: var(--color-text-light);
        font-weight: 500;
        font-size: var(--font-size-lg);
        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .make-space-on-mobile {
        overflow: hidden;
    }

    .result {
        position: relative;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: var(--spacing-md);
        padding: 0;
        padding-right: var(--spacing-md);
        height: fit-content;
    }

    .result img {
        width: 200px;
        aspect-ratio: 500/741;
        background-color: var(--color-background-card-section);
        border-radius: var(--border-radius-sm);
    }    
    .result .title-texts {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
        padding-top: var(--spacing-md);
        height: 100%;
        max-height: 296.4px;
        box-sizing: border-box;
    }

    .result .external-link-icon {
        color: var(--color-text-light);
        margin-left: var(--spacing-sm);
        transition: color 0.1s ease-out;
    } 
    .result .external-link-icon:hover {
        color: var(--color-text);
    }
    
    .result h3 {
        margin: 0;
        max-width: calc(100% - 175px);
        display: -webkit-box;
        line-clamp: 1;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        /* Adjust the dots color with this */
        color: var(--color-text-lighter);
    }
    .result a.no-decoration {
        margin: 0;
        margin-bottom: var(--spacing-xs);
    }
    .result a:hover {
        text-decoration: underline;
    }
    .result .name {
        color: var(--color-text);
    }
    .result .original-name {
        color: var(--color-text-lighter);
    }
    
    .result .genres {
        gap: var(--spacing-xs);
        flex-wrap: wrap;
        overflow: hidden;
        height: 32px;
    }
    .result .genre {
        padding: var(--spacing-xs) var(--spacing-sm);
        background-color: var(--color-background-card-section);
        border-radius: var(--border-radius-xs);
        font-size: var(--font-size-sm);
        font-weight: 500;
        white-space: nowrap;
    }
    
    .result .details {
        gap: var(--spacing-sm);
    }
    .result .details .score {
        gap: var(--spacing-xs);
    }

    .result .overview {
        color: var(--color-text-light);
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: justify;
        /* min-height: 75px; */
        /* Woodoo magic */
        display: -webkit-box; /* Creates a flexbox-like box for multiline text */
        line-clamp: 7;
        -webkit-line-clamp: 7; /* Limits the text to 3 lines (you can adjust this number) */
        -webkit-box-orient: vertical; /* Makes the box oriented vertically for multiline text */
    }

    .result .add-or-remove {
        position: absolute;
        top: var(--spacing-sm);
        right: var(--spacing-sm);
    }
    .result .add-or-remove button {
        margin: 0;
        width: 175px;
    }

    @media (max-width: 425px) {
        .result .details {
            flex-direction: column-reverse;
            gap: 0;
        }
        .result .details .divider {
            display: none;
        }
    }

    @media (max-width: 550px) {
        .result {
            grid-template-columns: 1fr;
            padding-right: 0;
        }

        .result .title-texts {
            padding: 0;
        }

        .result img {
            position: absolute;
            top: var(--spacing-sm);
            left: var(--spacing-sm);
            width: 100px;
        }
        .result .make-space-on-mobile {
            padding-left: calc(100px + var(--spacing-sm));
            height: 148.2px;
            min-height: 148.2px;
            padding-top: calc(var(--spacing-sm) * 1.5);
        }

        .result .title-texts {
            max-height: 352px;
            padding-inline: var(--spacing-sm);
        }

        .result .genres {
            height: auto;
        }

    }

    @media (max-width: 600px) {
        .title-form {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 750px) {
        .result h3 {
            max-width: none;
        }
        .result .add-or-remove {
            position: static;
            padding: 10px 0;
            margin-top: auto;
        }
        .result .add-or-remove button {
            width: 100%;
        }

        .result .overview {
            -webkit-line-clamp: 5;
            line-clamp: 5;
        }
    }

    .loading {
        cursor: wait;
    }

</style>
  