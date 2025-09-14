<template>
    <div v-if="title_info" class="title-info">
        <div class="background-color-accents" ref="backgroundColorAccents" :style="titleInfoStyle"></div>

        <BackdropSlideShow :imageLinks="backdropUrls"/>

        <div class="content-width-medium title-details">
            <div class="poster-next-to-stuff">
                <div class="poster-holder">
                    <div v-if="!standAloneBuild" class="poster-placholder">
                        <MissingImage v-if="failedToLoadImages.includes('poster')"/>
                        <img 
                            v-else
                            :src="imageUrl(300, title_info.backup_poster_url, title_info.title_id)" 
                            @load="(event) => event.target.classList.add('loaded')"
                            @error="failedToLoadImages.push('poster')"
                        >
                    </div>
                    <div v-else class="poster-placholder">
                        <img 
                            :src="imageUrl(300, title_info.backup_poster_url, title_info.title_id)" 
                            @load="(event) => event.target.classList.add('loaded')"
                        >
                    </div>
                </div>

                <div class="name-and-stuff">
                    <div class="name-and-tagline">
                        <h1 class="title-name">
                            <span class="all-pointer-events" :title="title_info.name">
                                {{ title_info.name }} 
                            </span>
                            <span class="all-pointer-events original-title" :title="title_info.name_original" v-if="title_info.name_original && title_info.name !== title_info.name_original">
                                ({{ title_info.name_original }})
                            </span>
                        </h1>
                        <q class="tagline all-pointer-events" v-if="title_info.tagline">{{ title_info.tagline }}</q>
                    </div>

                    <TitleTags class="tags-desktop" :title-info="title_info"/>

                    <DropdownMenu
                        :options="menuOptions"
                    />
                </div>
            </div>

            <TitleTags class="tags-mobile" :title-info="title_info"/>

            <div class="control-button-array">
                <NumericStepper 
                    class="flex-1"
                    :displayValue="title_info.type === 'movie' 
                        ? title_info.watch_count 
                        : title_info.seasons.reduce((min, season) => 
                            season.episodes.reduce((minEp, ep) => Math.min(minEp, ep.watch_count), min), Infinity)"
                    @valueUpdated="val => handleTitleWatchClick('title', val, null)"
                />
                
                <button
                    v-if="title_info?.type == 'tv'"
                    class="flex-1"
                    @click="jumpToNextEpisode()"
                >
                    <i class="bx bx-chevrons-down"></i> Jump to next episode
                </button>

                <!-- <button 
                    v-if="title_info.favourite == null || title_info.favourite == false"
                    class="button-primary left-button flex-1" 
                    @click="handleFavouriteToggle"
                >
                    <IconHeart/>
                </button>
                <button 
                    v-else
                    class="red-heart left-button flex-1" 
                    @click="handleFavouriteToggle" 
                >
                    <IconHeart/>
                </button> -->

                <!-- <button
                    class="button-primary middle-button flex-1" 
                    @click="openTitleUpdateModal()"
                >
                    <IconRefresh
                        :class="{
                            'loading': waitingForResult.includes('titleUpdate0') || waitingForResult.includes('allUpdate0'),
                            'spin-refresh-icon': waitingForResult.includes('titleUpdate0') || waitingForResult.includes('allUpdate0')
                        }"
                    />
                </button> -->
            </div>

            <div class="at-a-glance">
                <div class="ratings">
                    <a 
                        class="short-value no-decoration hover-decoration"
                        :href="`https://www.imdb.com/title/${this.title_info.imdb_id}`"
                        target="_blank" 
                        rel="noopener noreferrer" 
                    >
                        <span class="value icon-align">
                            <IconIMDBColorful size="40px" class="imdb-icon"/>
                            {{ title_info?.imdb_vote_average ?? '-' }} 
                        </span>
                        <span class="text-lighter">
                            {{ title_info?.imdb_vote_count?.toLocaleString("fi-FI") ?? '0' }} votes
                        </span>
                    </a>
                    <a 
                        class="short-value no-decoration hover-decoration"
                        :href="`https://www.themoviedb.org/${this.title_info.type}/${this.title_info.tmdb_id}`" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                    >
                        <span class="value icon-align">
                            <IconTMDBColorful size="40px" class="tmdb-icon"/>
                            {{ title_info?.tmdb_vote_average ?? '-' }} 
                        </span>
                        <span class="text-lighter">
                            {{ title_info?.tmdb_vote_count?.toLocaleString("fi-FI") ?? '0' }} votes
                        </span>
                    </a>
        
                    <div class="seperator"></div>
    
                    <div class="short-value">
                        <span class="value">
                            {{ title_info.age_rating == "" || title_info.age_rating == null ? '-' : title_info.age_rating }}
                        </span>
                        <span class="text-lighter">
                            Age rating
                            <InfoTooltip 
                                text="
                                    By default age ratings are Finnish and US ratings are used as a backup. The US ratings convertion table:<br>
                                    &bullet; G (S) General Audience<br>
                                    &bullet; PG (K-7) Parental Guidance Suggested<br>
                                    &bullet; PG-13 (K-12) Parents Strongly Cautioned, Suitable for 13+<br>
                                    &bullet; R (K-18) Restricted, for Adults Only<br>
                                    &bullet; NC-17 (K-18) No One 17 and Under Admitted"
                                position="right"
                                max-width="60vw"
                                align-offset="0"
                            >
                            </InfoTooltip>
                        </span>
                    </div>
                </div>

                <div class="seperator hide-on-mobile"></div>

                <div class="awards hide-on-mobile">
                    <a 
                        :href="`https://www.imdb.com/title/${this.title_info.imdb_id}/awards`" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="value no-decoration hover-decoration">{{ title_info.awards ?? '-' }}
                    </a>
                    <span class="text-lighter">Awards & Nominations</span>
                </div>
            </div>

            <div v-if="titleColors && showDisplayColors">
                <h3>Title colors</h3>
                <div style="display: flex; gap: var(--spacing-md);">
                    <div
                        v-for="(color, index) in titleColors"
                        :key="index"
                    >
                        <div 
                            class="color-swab"
                            :style="{'background-color': color.value}"
                            style="height: 100px; width: 150px; border-radius: var(--border-radius-medium);"
                        >
                    </div>
                    {{ color.proportion }} <br>
                    {{ color.value }}
                    </div>
                </div>
            </div>

            <h3>Overview</h3>
            <p style="margin: 0;">{{ title_info.overview }}</p>
            
            <div class="trailer-details-flex">
                <div class="details-container">
                    <h3 class="icon-align">
                        Title details
                    </h3>

                    <div class="details-grid">
                        <div v-if="title_info.type == 'movie'">
                            Movie length
                        </div>
                        <div v-if="title_info.type == 'movie'" class="value">
                            {{ formatRuntime(title_info.movie_runtime) }}
                        </div>

                        <div v-if="title_info.type == 'tv'">Progress</div>
                        <div v-if="title_info.type == 'tv'" class="value">
                            {{ getWatchedStats() }}
                        </div>

                        <div v-if="title_info.type == 'tv'">
                            Season count
                        </div>
                        <div v-if="title_info.type == 'tv'" class="value">
                            {{ title_info.seasons.length }} season<template v-if="title_info.seasons.length > 1">s</template>
                        </div>
                        <div v-if="title_info.type == 'tv'">
                            Episode count
                        </div>
                        <div v-if="title_info.type == 'tv'" class="value">
                            {{ titleEpisodeCount }} episode<template v-if="titleEpisodeCount > 1">s</template>
                        </div>

                        <!-- Get the last episode date as "date - end date" -->
                        <div>
                            <template v-if="title_info.type == 'tv'">First air date</template>
                            <template v-else>Release date</template>
                        </div>
                        <div class="value">
                            {{ new Date(title_info.release_date).toLocaleDateString("fi-FI", {day: "numeric", month: "long", year: "numeric"}) }}
                        </div>

                        <div v-if="title_info.type == 'tv'">
                            last air date
                        </div>
                        <div v-if="title_info.type == 'tv'" class="value">
                            {{ new Date(titleLastAirDate).toLocaleDateString("fi-FI", {day: "numeric", month: "long", year: "numeric"}) }}
                        </div>

                        <div v-if="title_info.type == 'movie'">Revenue</div>
                        <div 
                            v-if="title_info.type == 'movie'" 
                            class="value" 
                            :title="title_info?.revenue?.toLocaleString('fi-FI', { maximumFractionDigits: 0 }) + ' $'"
                        >
                            {{ formatToMillions(title_info.revenue) ?? '-' }}
                        </div>
                        <div v-if="title_info.type == 'movie'">Budget</div>
                        <div 
                            v-if="title_info.type == 'movie'"
                            class="value" 
                            :title="title_info?.budget?.toLocaleString('fi-FI', { maximumFractionDigits: 0 }) + ' $'"
                        >
                            {{ formatToMillions(title_info.budget) ?? '-' }}
                        </div>

                        <div>Original language</div>
                        <div class="value">{{ title_info.original_language ?? '-' }}</div>

                        <div>
                            Production countr<template v-if="title_info?.production_countries?.includes(',')">ies</template><template v-else>y</template>
                        </div>
                        <div class="value">{{ title_info?.production_countries ?? '-'}}</div>

                        <h4>Metadata</h4>
                        <div></div>

                        <!-- <div>Title type</div>
                        <div class="value">{{ title_info.type }}</div> -->

                        <div>IMDB id</div>
                        <div class="value">
                            <a 
                                class="no-decoration hover-decoration"
                                :href="`https://www.imdb.com/title/${this.title_info.imdb_id}`"
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                {{ title_info.imdb_id }}
                                <IconLinkExternal size="20px"/>
                            </a>
                        </div>

                        <div>TMDB id</div>
                        <div class="value">
                            <a 
                                class="no-decoration hover-decoration"
                                :href="`https://www.themoviedb.org/${this.title_info.type}/${this.title_info.tmdb_id}`" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                            >
                                {{ title_info.tmdb_id }}
                                <IconLinkExternal size="20px"/>
                            </a>
                        </div>

                        <div>Title details updated <InfoTooltip text="Title information is updated with the button above. This is only the title and does not include episodes or seasons." position="right"/></div>
                        <div class="value">{{ new Date(title_info.last_updated).toLocaleDateString("fi-FI") }}</div>

                        <div>User data updated <InfoTooltip text="User-related information is updated when you mark the title (or any of its episodes or seasons) as watched, edit its notes, or add it to favourites." position="right"/></div>
                        <div class="value">{{ new Date(title_info.user_title_last_updated).toLocaleDateString('fi-FI') }}</div>

                    </div>
                </div>

                <div v-if="title_info.trailers.length > 0" class="trailer-container">
                    <h3>
                        Trailer
                    </h3>
                    <div class="options">
                        <CustomSelect :options="trailerOptions" v-model="trailerIndex" class="flex-1"/>
                        <!-- When implementing the default possibility use this -->
                        <!-- <IconHome class="icon-button"/> -->
                    </div>
                    <div class="iframe-container">
                        <iframe
                            :src="`https://www.youtube.com/embed/${title_info.trailers[trailerIndex].trailer_key}`"
                            frameborder="0"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            </div>

            <WatchNowSection
                :title-media="title_info?.title_media.movies"
            />

            <h3>Extras</h3>
            <div class="aggregator-wrapper">
                <a 
                    v-for="(extra, i) in title_info.title_media.extras" 
                    :key="i"
                    :href="fileBridgeLink(extra.link)"
                    class="link-button no-decoration hover-decoration"
                >
                    <div>
                        <div class="name">
                            [{{ extra.extra_type }}]
                            {{ extra.parsed_file_name }}
                        </div>
                        <div class="tag tag-primary" v-if="extra.hdr_type">
                            {{ extra.hdr_type }}
                        </div>
                        <div class="details flex">
                            <div>
                                {{ extra.video_width }} x 
                                {{ extra.video_height }}
                            </div>
                            &ZeroWidthSpace; &bull; &ZeroWidthSpace;
                            <div>
                                {{ formatToBytes(extra.file_size) }}
                            </div>
                        </div>
                    </div>
                </a>
            </div>

            <h3>Link aggregators</h3>
            <div class="aggregator-wrapper">
                <a 
                    v-for="(aggregator, i) in linkAggregators" 
                    :key="i"
                    :href="aggregator.link"
                    class="link-button no-decoration hover-decoration"
                    target="_blank"
                >
                    <component
                        :is="aggregator.icon"
                        class="icon"
                        size="48px"
                    />
                    <div>
                        <div class="name">
                            {{ aggregator.name }}
                        </div>
                        <div class="details">
                            {{ aggregator.details }}
                        </div>
                    </div>
                </a>
            </div>
                
            <div v-if="title_info.in_watch_list">
                <h3>Notes</h3>
                <CustomGenericInput 
                    type="textarea" 
                    class="notes-text-area" 
                    ref="titleNotesInput"
                    v-model="this.title_info.notes"
                    placeholder="Write your notes, thoughts, favorite moments, or timestamps here..."
                />
                <button 
                    @click="handleNotesSave"
                    :disabled="waitingForResult.includes('saveNotes')"
                    :class="{loading: waitingForResult.includes('saveNotes')}"
                    class="save-notes-button" 
                >
                    Save notes
                </button>
            </div>
        </div>

        <!-- TV-SHOW SPECIFIC -->
        <div class="content-width-medium-unrestricted" v-if="title_info.seasons">
            <h2 id="episode_map">Episode map</h2>
            <!-- <h2 id="episode_map" class="icon-align"><IconTMDB size="42px" style="margin-right: 6px;"/> Episode map</h2> -->

            <router-link 
                class="sticky-corner-button link-button" 
                style="transition: opacity 0.1s ease-out;"
                :style="{ opacity: scrolledPastSeasonBrowserHeader ? 1 : 0 }"
                to="#seasonBrowserHeader"
            >
                <IconChevronDown size="28px" style="rotate: 180deg;"/>
            </router-link>

            <div class="episode-map">
                <div class="season-row">
                    <div class="episode-tile label">
                    </div>
                    <div 
                        v-for="(episode, index) in title_info.seasons.reduce((maxSeason, season) => 
                            season.episodes.length > maxSeason.episodes.length ? season : maxSeason, title_info.seasons[0]).episodes" 
                        :key="episode.id"
                        class="episode-tile label" 
                    >
                        E{{ index + 1 }}
                    </div>
                </div>
                <div v-for="season in title_info.seasons" 
                    :key="season.season_id" 
                    class="season-row"
                >
                    <div class="episode-tile label">
                        S{{ season.season_number }}
                    </div>
                    <router-link 
                        v-for="episode in season.episodes" 
                        :key="episode.episode_number" 
                        class="episode-tile"
                        :class="{ 
                            'watched': episode.watch_count > 0,
                            'un-released': new Date(episode.air_date) > new Date()
                        }"
                        :style="{'background-color': ( episode.watch_count > 0 ? episode.tileColorWatched : episode.tileColorUnWatched ) || 'var(--color-background-card)'}"
                        :title="`S${season.season_number} E${episode.episode_number}`"
                        :to="`/watch_list/title/${title_info.title_id}#S${season.season_number}E${episode.episode_number}`"
                    >
                        {{ new Date(episode.air_date) > new Date() ? '-' : episode.tmdb_vote_average }}
                    </router-link>
                </div>
            </div>
        </div>

        <SeasonBrowser
            v-if="title_info?.seasons && title_info?.seasons.length > 0"
            ref="seasonBrowser"
            :seasons-data="title_info.seasons"
            :title-id="title_info.title_id"
            :handleWatchEpisodeNow="handleWatchEpisodeNow"
            :handleTitleWatchClick="handleTitleWatchClick"
        />

        <!-- ========== MODALS ========== -->

        <!-- Watch list modification -->
        <ModalConfirmation 
            ref="removeTitleCM"
            header="Remove from watchlist"
            text="Are you sure you wan't to remove the title from your watchlist?
            This gets rid of all your data on the title like your watched episodes and notes."
            affirmative-option="Remove title"
        />

        <!-- Titles watch/unwatch -->
        <ModalConfirmation 
            ref="updateTitleWatchCountCM"
            header="Update watch count"
            text="Are you sure you want to update the watch count for this title? 
            This will modify the watch progress for all episodes."
            affirmative-option="Update Watch Count"
        />
        <ModalConfirmation 
            ref="removeTitleWatchCountCM"
            header="Remove watch count"
            text="Are you sure you want to remove the watch count for this title? 
            This will reset the watch progress for all episodes."
            affirmative-option="Remove Watch Count"
        />

        <!-- Seasons watch/unwatch -->
        <ModalConfirmation 
            ref="markSeasonWatchedCM"
            header="Mark watched"
            text="Are you sure you want to mark the entire season as watched?
            This will mark all episodes in the season as watched, effectively erasing your progress."
            affirmative-option="Mark as Watched"
        />
        <ModalConfirmation 
            ref="markSeasonUnwatchedCM"
            header="Reset watch status"
            text="Are you sure you want to reset the season's watch status?
            This will mark all episodes in the season as unwatched, effectively erasing your progress."
            affirmative-option="Reset status"
        />

        <!-- Title refresh data -->
        <ModalGeneric ref="refreshTitleDataGM" header="Requery Title Data">
            <div class="choice-modal">
                <p>What data would you like to requery?</p>
                <ul>
                    <li><strong>Info:</strong> Replaces the data and downloads any missing images.</li>
                    <li><strong>Images:</strong> Deletes and redownloads all current images.</li>
                    <li><strong>Full Update:</strong> Does both info and images.</li>
                </ul>
                <div v-if="title_info.type === 'tv'">
                    <h3>Scope</h3>
                    <div>
                        <div class="icon-align">
                            <input type="radio" id="title" name="title" value="title" v-model="updateOptions.type"/>
                            <label for="title">Title & Seasons</label>
                        </div>
                        <div class="icon-align">
                            <input type="radio" id="all" name="all" value="all" v-model="updateOptions.type"/>
                            <label for="all">Title, Seasons & Episodes</label>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <input type="hidden" v-model="updateOptions.type" value="title">
                </div>

                <div>
                    <h3>Data Types</h3>
                    <div class="icon-align">
                        <input type="checkbox" v-model="updateOptions.actions" id="info" name="info" value="info">
                        <label class="cursor-pointer" for="info">Info</label>
                    </div>
                    <div class="icon-align">
                        <input type="checkbox" v-model="updateOptions.actions" id="images" name="images" value="images">
                        <label class="cursor-pointer" for="images">Images</label>
                    </div>
                </div>
                <button class="button-primary" @click="handleTitleUpdate">
                    Update selected data
                </button>
            </div>
        </ModalGeneric>

        <!-- Season refresh data -->
        <ModalGeneric ref="refreshSeasonDataGM" header="Requery Season Data">
            <div class="choice-modal">
                <p>What data would you like to requery?</p>
                <ul>
                    <li><strong>Info:</strong> Replaces the data and downloads any missing images.</li>
                    <li><strong>Images:</strong> Deletes and redownloads all current images.</li>
                    <li><strong>Full Update:</strong> Does both info and images.</li>
                </ul>

                <input type="hidden" v-model="updateOptions.type" value="season">

                <div>
                    <h3>Data Types</h3>
                    <div class="icon-align">
                        <input type="checkbox" v-model="updateOptions.actions" id="season-info" name="info" value="info">
                        <label class="cursor-pointer" for="season-info">Info</label>
                    </div>
                    <div class="icon-align">
                        <input type="checkbox" v-model="updateOptions.actions" id="season-images" name="images" value="images">
                        <label class="cursor-pointer" for="season-images">Images</label>
                    </div>
                </div>

                <button class="button-primary" @click="handleTitleUpdate">
                    Update selected data
                </button>
            </div>
        </ModalGeneric>


        <!-- Collection edit -->
        <ModalCollection ref="editCollectionFC" type="Edit colleciton" submitText="Save"/>

        <!-- Edit title collections -->
        <ModalTitleCollections 
            ref="modaTitleCollectionsMTC"
            @title-collection-updated="handleTitleCollectionUpdate"
            @collection-updated="handleCollectionUpdate"
        />

        <!-- Watch now -->
        <ModalGeneric ref="watchTitleNowMG" header="Watch Now">
            <WatchNowRecursive :data="watchNowLinksForModal"/>
        </ModalGeneric>

        <ModalGeneric ref="watchEpisodeNowMG" header="Watch Episode">
            <WatchNowRecursive :data="watchNowLinksForModal"/>
        </ModalGeneric>

    </div>
    
    <div v-else-if="!waitingForResult.includes('title_info')">
        <notFoundPage/>
    </div>

    <div v-else-if="false">
        <IconLoading size="32px"/>
        <IconFilm/>
    </div>
</template>

  
<script>
import fastApi from '@/utils/fastApi';
import router from '@/router';
import { notify } from '@/utils/notification';
import InfoTooltip from '@/components/common/InfoTooltip.vue';
import { interpolateBetweenColors, getCssVar, convert, fileBridgeLink } from '@/utils/utils'
import notFoundPage from '@/views/404Page.vue';
import { apiUrl, standAloneBuild, isTouchDevice } from '@/utils/config';
import WatchNowRecursive from '@/components/WatchList/WatchNowRecursive.vue';
import IconJustwatch from '@/components/icons/IconJustwatchColorful.vue';
import IconTMDBColorful from '@/components/icons/IconTMDBColorful.vue';
import IconIMDBColorful from '@/components/icons/IconIMDBColorful.vue';
import IconChevronDown from '@/components/icons/IconChevronDown.vue';
import IconLinkExternal from '@/components/icons/IconLinkExternal.vue';
import ModalConfirmation from '@/components/common/ModalConfirmation.vue';
import ModalGeneric from '@/components/common/ModalGeneric.vue';
import IconLoading from '@/components/icons/IconLoading.vue';
import ModalCollection from '@/components/WatchList/ModalCollection.vue';
import IconFilm from '@/components/icons/IconFilm.vue'; 
import ModalTitleCollections from '@/components/WatchList/ModalTitleCollections.vue';
import NumericStepper from '@/components/common/NumericStepper.vue';
import CustomSelect from '@/components/common/CustomSelect.vue';
import CustomGenericInput from '@/components/common/CustomGenericInput.vue';
import BackdropSlideShow from '@/components/WatchList/BackdropSlideShow.vue';
import MissingImage from '@/components/common/MissingImage.vue';
import SeasonBrowser from '@/components/WatchList/SeasonBrowser.vue';
import IconPlay from '@/components/icons/IconPlay.vue';
import DropdownMenu from '@/components/common/DropdownMenu.vue';
import TitleTags from '@/components/WatchList/TitleTags.vue';
import WatchNowSection from './WatchNowSection.vue';

export default {
    name: 'TitleDetailsPage',
    data() {
        return {
            standAloneBuild: standAloneBuild,
            isTouchDevice: isTouchDevice,
            apiUrl: apiUrl,
            titleID: this.$route.params.titleID,
            title_info: null,
            expandedSeason: null,
            waitingForResult: [],
            failedToLoadImages: [],
            imageSlideshowData: {
                showOnDom: 0,
                chosenOne: 0,
                keepOnDom: [],
                individualData: []
            },
            openedSeasons: [],
            scrolledPastSeasonBrowserHeader: false,
            selectedSeasonToUpdate: null,
            trailerIndex: 0,
            updateOptions: {
                type: 'title',
                actions: ['info']
            },
            titleColors: [],
            showDisplayColors: false,
            titleInfoStyle: null,
        }
    },
    components: {
        ModalConfirmation,
        ModalGeneric,
        ModalCollection,
        ModalTitleCollections,
        InfoTooltip,
        notFoundPage,
        WatchNowRecursive,
        NumericStepper,
        CustomSelect,
        CustomGenericInput,
        BackdropSlideShow,
        MissingImage,
        SeasonBrowser,
        IconTMDBColorful,
        IconIMDBColorful,
        IconChevronDown,
        IconLinkExternal,
        IconLoading,
        IconFilm,
        IconPlay,
        DropdownMenu,
        TitleTags,
        WatchNowSection,
    },
    methods: {
        formatRuntime(runtime) {
            return convert.toRuntime(runtime);
        },
        formatToMillions(amount) {
            return convert.toLargeUsd(amount);
        },
        formatToBytes(amount) {
            return convert.toBytes(amount);
        },
        fileBridgeLink(link) {
            return fileBridgeLink(link);
        },
        rgbToHsl(rgb) {
            let [r, g, b] = rgb.map(v => v / 255);   // normalize

            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const delta = max - min;

            // Lightness
            let l = (max + min) / 2;

            // Saturation
            let s = delta === 0 ? 0
                : l < 0.5 ? delta / (max + min)
                : delta / (2 - max - min);

            // Hue
            let h;
            if (delta === 0) {
                h = 0;                     // achromatic
            } else {
                switch (max) {
                case r: h = (g - b) / delta; break;
                case g: h = 2 + (b - r) / delta; break;
                case b: h = 4 + (r - g) / delta; break;
                }
                h *= 60;                    // degrees
                if (h < 0) h += 360;
            }

            // Convert to percentages
            return [h, s * 100, l * 100];
        },
        rgbToHslClamped(rgb) {
            const maxAllowedLightness = 15;
            const [h, s, l] = this.rgbToHsl(rgb);
            return [h, s, Math.min(l, maxAllowedLightness)].join(' ');
        },
        async getTitleColors() {
            const resp = await fastApi.colors(this.titleID);
            if (!resp) return;

            // Build colour strings with spaces after commas
            const colours = resp.colors.map(c => `rgb(${c.rgb.join(', ')})`);
            this.titleColors = colours.map((c, i) => ({
                value: c,
                proportion: convert.toFiNumber(resp.colors[i].proportion, 6)
            }));

            // Four-layer radial gradients
            const positions = [
                "10% 0%",
                "80% 33%",
                "20% 66%",
                "90% 100%"
            ];

            const gradients = resp.colors.map((c, i) => {
                const hsl = this.rgbToHslClamped(c.rgb);
                return `radial-gradient(
                    circle at ${positions[i]},
                    hsl(${hsl}) 0%,
                    transparent 50%
                )`;
            });

            // Add the black fade overlay first
            const fadeHeight = "25%";
            gradients.unshift(`linear-gradient(
                to bottom,
                var(--color-background) 0px,
                transparent ${fadeHeight},
                transparent calc(100% - ${fadeHeight}),
                var(--color-background) 100%
            )`);

            this.titleInfoStyle = { background: gradients.join(', ') };

            this.episodeMapTileBackgroundColors();
        },
        toggleHeight(refKey) {
            // Mark the season as opened to load to dom with v-if to start loading images
            if (!this.openedSeasons.includes(refKey)) {
                this.openedSeasons.push(refKey)
            }
            
            // Set a minimal timeout so that the dom change registers before the height is calculated
            setTimeout(() => {
                // Change the actual height
                const element = this.$refs[refKey]?.[0]; // Get the first element
                if (!element) return;

                if (!element.style.height || element.style.height === "0px") {
                    element.style.height = element.scrollHeight + "px"; // Expand
                } else {
                    element.style.height = "0px"; // Collapse
                }
            }, 1)
        },
        setHeightToNone(refKey, noTransition = true) {
            // Change the actual height
            const element = this.$refs[refKey]?.[0]; // Get the first element because it gives an array (and there is only one)
            if (element) {
                if (noTransition) element.style.transition = 'height 0s';
                element.style.height = "0px"; // Collapse
                if (noTransition) setTimeout(() => {
                    element.style.transition = '';
                }, 1)
            }
        },
        closeAllSeasons(keepRef = "", noTransition = true) {
            this.title_info.seasons.forEach(season => {
                const seasonRef = `refSeason${season.season_number}`;
                // Don't set height for the one that we wan't to be open
                if (seasonRef != keepRef) {
                    this.setHeightToNone(seasonRef, noTransition);
                }
            })
        },
        async handleTitleWatchClick(titleOrSeasonOrEpisode, watchCount, customID) {
            // Initially get a confirmation from the user before going through
            if (
                this.title_info.type == "tv" && 
                titleOrSeasonOrEpisode == "title" && 
                watchCount >= 1 && 
                !await this.$refs.updateTitleWatchCountCM.prompt()
            ) { return } else if (
                this.title_info.type == "tv" && 
                titleOrSeasonOrEpisode == "title" && 
                watchCount == 0 && 
                !await this.$refs.removeTitleWatchCountCM.prompt()
            ) { return } else if (
                this.title_info.type == "tv" && 
                titleOrSeasonOrEpisode == "season" && 
                watchCount >= 1 && 
                !await this.$refs.markSeasonWatchedCM.prompt()
            ) { return } else if (
                this.title_info.type == "tv" && 
                titleOrSeasonOrEpisode == "season" && 
                watchCount == 0&& 
                !await this.$refs.markSeasonUnwatchedCM.prompt()
            ) { return }

            let response = null;
            if (titleOrSeasonOrEpisode === "title") {
                response = await fastApi.watch_list.titles.watchCount(this.title_info.title_id, watchCount);
            } else if (titleOrSeasonOrEpisode === "season") {
                response = await fastApi.watch_list.seasons.watchCount(customID, watchCount);
            } else if (titleOrSeasonOrEpisode === "episode") {
                response = await fastApi.watch_list.episodes.watchCount(customID, watchCount);
            }
            if (response) {
                console.debug(response);

                this.title_info.in_watch_list = 1;

                if (titleOrSeasonOrEpisode === "title") {
                    this.title_info.watch_count = watchCount;   // Update the watch count for both, even though tv don't use
                    if (this.title_info.type === "tv") {
                        this.title_info.seasons.forEach(season => {
                            season.episodes.forEach(episode => {
                                episode.watch_count = watchCount; // Update each episode's watch count
                            });
                        });
                    }
                } else if (titleOrSeasonOrEpisode === "season") {
                    // Find the season and update the watch_count for all episodes in that season
                    const season = this.title_info.seasons.find(s => s.season_id === customID);
                    if (season) {
                        season.watch_count = watchCount;
                        season.episodes.forEach(episode => {
                            episode.watch_count = watchCount; // Update all episodes' watch_count in the season
                        });
                    }
                } else if (titleOrSeasonOrEpisode === "episode") {
                    // Find the episode and update its watch_count
                    const episode = this.title_info.seasons
                        .flatMap(season => season.episodes)
                        .find(ep => ep.episode_id === customID);
                    if (episode) {
                        episode.watch_count = watchCount; // Update episode's watch count
                    }
                }
            }
        },
        async handleNotesSave() {
            this.waitingForResult.push("saveNotes");

            const response = await fastApi.watch_list.titles.notes(this.title_info.title_id, this.title_info.notes)
            if (response) {
                notify(response.message, "success");
                this.$refs.titleNotesInput.markValid();
            }
            
            this.modifyWaitingArray("saveNotes");
        },
        openTitleUpdateModal() {
            // Set to 0 incase user chooses to update everything and the user has already updated/opened a season
            // Also used as an identifier for the spinning animation
            this.selectedSeasonToUpdate = 0;    
            this.$refs.refreshTitleDataGM.open();
        },
        openSeasonUpdateModal(seasonNumber) {
            // The season/update number is used to determine the season that is being updated to show the animation for it
            this.selectedSeasonToUpdate = seasonNumber;
            this.updateOptions.type = "season";
            this.$refs.refreshSeasonDataGM.open();
        },
        async handleTitleUpdate() {
            const type = this.updateOptions.type;
            const actions = this.updateOptions.actions;

            // Update waiting array
            const updatingNumber = this.selectedSeasonToUpdate;
            const updatingIdentifier = `${type}Update${updatingNumber}`;
            this.modifyWaitingArray(updatingIdentifier, true);
            
            // One of these is true
            const isAll = type === "all";
            const isTitle = type === "title";
            const isSeason = type === "season";

            console.log(type, isAll, isTitle, isSeason);

            // If its season, we know it's from season modal so close it
            if (isSeason) {
                this.$refs.refreshSeasonDataGM.close();
            } else {    // and of course else title modal
                this.$refs.refreshTitleDataGM.close();
            }

            const payload = {
                update_title_info: actions.includes("info") && (isTitle || isAll),
                update_season_info: actions.includes("info") && (isSeason || isAll),
                update_title_images: actions.includes("images") && (isTitle || isAll),
                update_season_images: actions.includes("images") && (isSeason || isAll),
                season_number: updatingNumber
            };

            const response = await fastApi.watch_list.titles.update(
                this.title_info.title_id,
                this.title_info.type,
                payload
            );

            if (response) {
                let updateMessage;
                if (updatingNumber !== 0) {
                    updateMessage = `Season ${updatingNumber} ${actions.join(" & ")} for "${this.title_info.name}" updated.`;
                } else {
                    updateMessage = `"${this.title_info.name}" ${actions.join(" & ")} updated.`;
                }
                notify(updateMessage, "success");
                
                // If images updated, force cache-bust
                if (payload.update_title_images || payload.update_season_images) {
                    this.title_info.image_version = Date.now();
                }

                await this.queryTitleData();
                this.episodeMapTileBackgroundColors();
            }

            this.modifyWaitingArray(updatingIdentifier);
        },
        async handleFavouriteToggle() {
            this.waitingForResult.push("favourite");
            const response = await fastApi.watch_list.titles.favourite(this.title_info.title_id)
            if (response) {
                console.debug(response);
                this.title_info.favourite = !this.title_info.favourite;
                this.title_info.in_watch_list = 1;
            }
            this.modifyWaitingArray("favourite", false);
        },
        async handleWatchListModification(action) {
            // Get confirmation before initiaing if removing
            if (action == "remove" && !await this.$refs.removeTitleCM.prompt()) { return }

            this.waitingForResult.push("titleWatched");
            if (action == "remove") {
                const response = await fastApi.watch_list.titles.remove(this.title_info.title_id);
                if (response) {
                    console.debug("Title removed successfully")
                }
            } else if (action == "add") {
                const response = await fastApi.watch_list.titles.add(this.title_info.title_id, this.title_info.type);
                if (response) {
                    console.debug("Title added successfully!")
                }
            }            
            await this.queryTitleData()
            this.episodeMapTileBackgroundColors();
            this.modifyWaitingArray("titleWatched");
        },
        modifyWaitingArray(item, add = false) {
            if (add) {
                this.waitingForResult.push(item);
            } else {
                this.waitingForResult = this.waitingForResult.filter(i => i !== item);
            }
        },
        async queryTitleData() {
            this.waitingForResult.push("title_info");
            // Query the details from api for the title here:
            const response = await fastApi.watch_list.titles.info(this.titleID);
            if (response && response.title_info) {
                if (response.title_info.length !== 0) {
                    this.title_info = response.title_info;
                    if (standAloneBuild) {
                        this.title_info.backdrop_image_count = 1;
                    }
                    console.debug("[queryTitleData] Values set to this.title_info: ", this.title_info)
                } else {
                    notify("The title doesn't exist!", "error");
                    router.push("/watch_list");
                }
            }
            this.modifyWaitingArray("title_info");
        },
        getWatchedStats() {
            const totalEpisodes = this.title_info.seasons?.reduce((sum, season) => sum + season.episodes.length, 0) || 0;
            const watchedEpisodes = this.title_info.seasons?.reduce((sum, season) => sum + season.episodes.filter(ep => ep.watch_count >= 1).length, 0) || 0;
            const percentage = totalEpisodes ? ((watchedEpisodes / totalEpisodes) * 100).toFixed(1) + "%" : "0%";
            return `${watchedEpisodes} / ${totalEpisodes} episodes (${percentage})`;
        },
        episodeMapTileBackgroundColors() {
            if (this.title_info && this.title_info.seasons) {
                const baseColor = getCssVar("color-background-card");
                const watchedColor = getCssVar("color-positive");
                const ratingColor = "#aaa";

                this.title_info.seasons.forEach(season => {
                    season.episodes.forEach(episode => {
                        let rating = episode.tmdb_vote_average;

                        // Convert to be between 0 and 1
                        rating = rating / 10;

                        // Convert to blocks of 0.1 (groups based on starting number)
                        rating = Math.floor(rating * 10) / 10 + 0.1;

                        // Adjust the color scaling with power
                        rating = Math.pow(rating, 5);
                        
                        episode.tileColorWatched = interpolateBetweenColors(baseColor, watchedColor, rating);
                        episode.tileColorUnWatched = interpolateBetweenColors(baseColor, ratingColor, rating);
                    });
                });
            }
        },
        checkScroll() {
            const episodeMap = document.getElementById('seasonBrowserHeader');
            if (episodeMap) {
                const scrollY = window.scrollY || document.documentElement.scrollTop;
                this.scrolledPastSeasonBrowserHeader = scrollY > episodeMap.offsetTop;
            }
        },
        openCorrectSeason(hash) {
            return new Promise((resolve) => {
                // console.log(to);

                const match = hash.match(/#S(\d+)E\d+/);
                const seasonNumber = match ? match[1] : null;

                // If a link to other stuff like #episode_map the get season number should return null
                // allowing us to quit here quietly
                if (seasonNumber == null)
                    return resolve();

                this.$refs.seasonBrowser.setActiveSeason(seasonNumber);

                // Set a minimal timeout so that the dom change registers before we allow the jump to happen
                setTimeout(() => {
                    resolve();
                }, 1)
            });
        },
        imageUrl(width, backupUrl, titleId, seasonNumber, episodeNumber) {
            if (standAloneBuild) {
                if (width == 600) width = 500;  // TMDB doesn't have a 600 so use 500 instead
                if (width == 900 && episodeNumber) width = 300;  // TMDB doesn't have a 900 for episodes so use the largest non-original 300 instead
                return `https://image.tmdb.org/t/p/w${width}${backupUrl}`;
            } else {
                if (!seasonNumber) {
                    return `${this.apiUrl}/media/image/title/${titleId}/poster.jpg?width=${width}`;
                } else if (!episodeNumber){
                    return `${this.apiUrl}/media/image/title/${titleId}/season${seasonNumber}/poster.jpg?width=${width}`;
                } else if (episodeNumber) {
                    return `${this.apiUrl}/media/image/title/${titleId}/season${seasonNumber}/episode${episodeNumber}.jpg?width=${width}`;
                } else {
                    return "";
                }
            }
        },
        handleWatchTitleNow() {
            const movies = this.title_info.title_media.movies;
            console.log(movies)
            if (movies) {
                const chosenMedia = movies.reduce((max, obj) => obj.file_size > max.file_size ? obj : max, movies[0]);
                window.location.href = fileBridgeLink(chosenMedia.link);
            }
        },
        jumpToNextEpisode() {
            // Find the minimum watch count among linked episodes
            let minCount = Infinity;
            for (const season of this.title_info.seasons) {
                for (const episode of season.episodes) {
                    if (episode.watch_count < minCount) {
                        minCount = episode.watch_count;
                    }
                }
            }

            // Jump to the first episode that matches that minCount
            if (minCount !== Infinity) {
                for (const season of this.title_info.seasons) {
                    for (const episode of season.episodes) {
                        if (episode.watch_count === minCount) {
                            router.push(
                                `/watch_list/title/${this.title_info.title_id}`
                            );
                            router.push(
                                `/watch_list/title/${this.title_info.title_id}#S${season.season_number}E${episode.episode_number}`
                            );
                            return;
                        }
                    }
                }
            }

            // Fallback if nothing matched
            router.push(`/watch_list/title/${this.title_info.title_id}#S1E1`);
        },
        handleWatchEpisodeNow(episode) {
            const media = episode.episode_media;
            if (media) {
                const chosenMedia = media.reduce((max, obj) => obj.file_size > max.file_size ? obj : max, media[0]);
                window.location.href = fileBridgeLink(chosenMedia.link);
            }
        },
        async handleUpdateTitleMediaInfo() {
            const response = await fastApi.watch_list.titles.update_media_info(this.title_info.title_id);
            if (response) {
                notify(response.message, 'success');
                await this.queryTitleData();
            }
        },
        promptTitleCollections() {
            this.$refs.modaTitleCollectionsMTC.prompt(this.title_info.title_id);
        },
        handleTitleCollectionUpdate(payload) {
            if (payload.titleInCollection) {
                this.title_info.collections.push(payload.collection);
            } else {
                this.title_info.collections = this.title_info.collections.filter(
                    c => c.collection_id !== payload.collection.collection_id
                );
            }
        },
        handleCollectionUpdate(payload) {
            const updated = payload.newCollectionValues;
            const index = this.title_info.collections.findIndex(
                c => c.collection_id === updated.collection_id
            );

            console.log(updated, this.title_info.collections);

            if (index !== -1) {
                this.title_info.collections[index] = updated;
            }
        },
    },
    computed: {
        titleEpisodeCount() {
            let count = 0;
            this.title_info.seasons.forEach(season => {
                count += season.episode_count;
            });
            return count;
        },
        titleLastAirDate() {
            if (this.title_info && this.title_info.type == 'tv' && this.title_info.seasons?.length) {
                let lastSeason = this.title_info.seasons[this.title_info.seasons.length - 1];
                let lastAirDate = lastSeason?.episodes?.[lastSeason.episodes.length - 1]?.air_date || null;
                return lastAirDate;
            }
            return null;
        },
        trailerOptions() {
            const options = [];
            for (const [index, trailer] of this.title_info.trailers.entries()) {
                options.push({
                    label: trailer.video_name,
                    value: index
                });
            }
            return options;
        },
        backdropUrls() {
            if (!this.title_info || !this.title_info.backdrop_image_count || !this.title_info.title_id) {
                return [];
            }

            const cacheBuster = this.title_info.image_version || Date.now(); 
            let suffix = this.isTouchDevice ? '?width=1200' : '';

            return Array.from({ length: this.title_info.backdrop_image_count }, (_, i) => {
                return `${this.apiUrl}/media/image/title/${this.title_info.title_id}/backdrop${i + 1}.jpg${suffix}?v=${cacheBuster}`;
            });
        },
        menuOptions() {
            const base = [
                { icon: 'bxs-heart', label: 'Toggle Favourite', action: () => this.handleFavouriteToggle() },
                { icon: 'bxs-collection', label: 'Modify Title Collections', action: () => this.promptTitleCollections() },
                { icon: 'bx-refresh', label: 'Requery Title Data ', action: () => this.openTitleUpdateModal() },
                { icon: 'bxs-file-find', label: 'Scan Media Library for Title', action: () => this.handleUpdateTitleMediaInfo() },
                { icon: 'bxs-palette', label: 'Colors Toggle', action: () => { this.showDisplayColors = !this.showDisplayColors } },
            ];

            const watchlistAction = this.title_info.in_watch_list
                ? { icon: 'bx-list-minus', label: 'Remove from Watchlist', action: () => this.handleWatchListModification('remove') }
                : { icon: 'bx-list-plus', label: 'Add to Watchlist', action: () => this.handleWatchListModification('add') };

            return [...base, watchlistAction];
        },
        linkAggregators() {
            return [
                {
                    name: "The Movie Database",
                    details: "Available streaming services",
                    link: `https://www.themoviedb.org/${this.title_info.type}/${this.title_info.tmdb_id}/watch`,
                    icon: IconTMDBColorful
                },
                {
                    name: "JustWatch",
                    details: "Search for the title on JustWatch",
                    link: `https://www.justwatch.com/fi/search?q=${encodeURIComponent(this.title_info.name)}`,
                    icon: IconJustwatch
                }
            ];
        },
    },
    async beforeRouteUpdate(to) {
        if (to.hash) {
            await this.openCorrectSeason(to.hash);
        }
    },
    async mounted() {
        await this.queryTitleData();

        // Generate individual data for each backdrop image dynamically
        if (this.title_info) {
            // Set the title to the titles name instead of "Title info"
            document.title = `Dashboard - ${this.title_info.name || 'Default Title'}`
        }

        // Run initially and add the event listener to update on darkmode change
        this.episodeMapTileBackgroundColors();
        window.addEventListener("darkModeChange", this.episodeMapTileBackgroundColors)
        
        // Add a scroll listener to show and hide the scroll back to episode map button
        window.addEventListener('scroll', this.checkScroll);

        // Scroll to the hash on the url if there is one.
        // Need to do this here instead of "beforeRouteEnter" because we need access to this and the titles info.
        // Need to also have a different method of getting the hash for standalone build
        const hash = standAloneBuild ? "#" + window.location.hash.split("#")[2] : window.location.hash;
        if (hash) {
            // Open season based on hash
            this.openCorrectSeason(hash);

            // Miniscule delay to wait for the opening to happen. Haven't yet come up with a better
            // way to do it so I use this even though it feels janky.
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    // Use the custom function to scroll to the position with correct offset
                    router.scrollToElementWithOffset(element);
                }
            }, 1)
        }

        await this.getTitleColors();
    },
    unmounted() {
        window.removeEventListener('darkModeChange', this.episodeMapTileBackgroundColors);
        window.removeEventListener('scroll', this.checkScroll);
    },

};
</script>

  
<style scoped>
.title-info {
    position: relative;
}

.background-color-accents {
    position: absolute;
    /* top: 735px; */
    top: 367.5px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -100;
}

.poster-next-to-stuff .name-and-stuff {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    margin-top: var(--spacing-sm);
    position: relative;
}
.name-and-tagline {
    align-items: left;
    display: flex;
    flex-direction: column;
    justify-content: end;
    /* height: 100%; */
}

/* .name-and-tagline .logo {
    max-height: 200px;
    max-width: 100%;
    object-fit: contain;
    width: auto;
} */

/* Maybe try and pop the orignial to next row when it would overflow or wrap */
.name-and-tagline .title-name {
    margin-bottom: 0;
    margin-top: 0;
    font-size: 48px;
    line-height: 64px;
    padding-right: var(--spacing-lg);
    /* display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden; */
}
.name-and-tagline .title-name .original-title {
    color: var(--color-text-lighter)
}
.name-and-tagline .logo-img-wrapper {
    max-height: 120px;
    max-width: 100%;

    display: flex;
    flex-direction: row;
    align-items: start;
    padding-bottom: var(--spacing-sm);
}
.name-and-tagline .logo-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}
.name-and-tagline .tagline {
    color: var(--color-text-light);
}

@media (max-width: 750px) {
    .name-and-tagline .title-name {
        font-size: 36px;
        line-height: 48px;
    }
}

.at-a-glance {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-md);
    margin: var(--spacing-lg) 0;
}

/* .seperator {
    background-color: var(--color-border);
    min-width: 2px;
    min-height: 2px;
    border-radius: 100px;
} */

.at-a-glance .text-lighter {
    font-weight: 500;
}

.at-a-glance .ratings {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-md);
    justify-content: space-evenly;
}
.at-a-glance .short-value {
    padding-inline: var(--spacing-sm);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.at-a-glance .short-value .value {
    gap: var(--spacing-xs);
    flex: 1;
    align-content: center;
    white-space: nowrap;
    font-weight: 700;
    font-size: var(--font-size-xl);
}

.at-a-glance .awards {
    min-width: 200px;
    padding-inline: var(--spacing-sm);
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.at-a-glance .awards .value {
    font-weight: 600;
}

.at-a-glance svg {
    /* Compensate for the icons having some empty space unlike text */
    margin-left: -4px !important;
}


@media(max-width: 600px) {
    .at-a-glance {
        flex-direction: column;
    }
    .at-a-glance .rating {
        padding-inline: unset;
    }
    .at-a-glance .awards {
        padding-inline: unset;
        width: fit-content;
        margin-inline: auto;
        text-align: center;
    }
    .at-a-glance .hide-on-mobile {
        display: none;
    }
}

.dropdown-menu {
    top: var(--spacing-md);
    right: 0;
}


/* - - - - - VALUES AND DETAILS - - - - -  */

.title-details {
    position: relative;
}

.title-details .poster-next-to-stuff {
    display: grid;
    gap: 20px;
    row-gap: 0;
    grid-template-columns: auto 1fr;
    /* min-height: 200px; */
}

.poster-next-to-stuff .poster-holder {
    position: relative;
    width: 210px;
    max-width: 25vw;
}

.poster-next-to-stuff .poster-placholder {
    position: absolute;
    bottom: 0;
    z-index: var(--z-title-poster);
    background-color: var(--color-background-card);
    border-radius: var(--border-radius-medium);
    width: 100%;
    max-width: 100%;
    display: flex;
    /* Causes issues with gap. Don't use. */
    aspect-ratio: 2/3;
}
.poster-next-to-stuff .poster-placholder img {
    border-radius: var(--border-radius-medium);
    /* max-width: 100%; */
    width: 100%;
    aspect-ratio: 2/3;
}

.tags-desktop {
    display: flex !important;
}
.tags-mobile {
    display: none !important;
    margin: var(--spacing-md) 0;
}
@media (max-width: 800px) {
    .tags-desktop {
        display: none !important;
    }
    .tags-mobile {
        display: flex !important;
    }
}

.control-button-array {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    gap: var(--spacing-sm);
    margin: var(--spacing-md) 0;
}
.control-button-array button {
    white-space: nowrap;
}

.red-heart {
    color: var(--color-secondary);
}
.red-heart:hover {
    color: var(--color-secondary-hover);
}

.trailer-details-flex {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: var(--spacing-md);
}

.trailer-container {
    margin-left: auto;
}
.trailer-container .options {
    display: flex;
    flex-direction: row;
    column-gap: var(--spacing-sm);
    align-items: center;
    margin-bottom: var(--spacing-md);
}
iframe {
    aspect-ratio: 16/9;
    width: 550px;
    max-width: 100%;
    margin-inline: auto;
    border-radius: var(--border-radius-medium);
}
.iframe-container {
    display: flex;
}
@media(max-width: 900px) {
    .trailer-details-flex {
        grid-template-columns: none;
    }
    .iframe-container {
        flex-direction: row;
        justify-content: center;
        width: 100%;
    }
    .trailer-container {
        margin-left: initial;
    }
}

.spin-refresh-icon {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}


.title-details h2{
    margin-top: var(--spacing-lg);
    margin-bottom: var(--spacing-sm);
}
.title-details h3 {
    margin-top: var(--spacing-lg);
    margin-bottom: var(--spacing-sm);
}
.title-details h4 {
    margin-top: var(--spacing-sm);
    margin-bottom: var(--spacing-xs);
}
.title-details .details-grid {
    color: var(--color-text-light);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: var(--spacing-md);
}
.title-details .details-grid .value {
    color: var(--color-text);
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 250px;
    gap: var(--spacing-xs);
}

.title-details ul {
    list-style: disc;
    margin: var(--spacing-sm);
    padding-left: var(--spacing-md);
}

.title-details .times-watched {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    width: fit-content;
}
.title-details .times-watched button {
    margin: 0;
    /* padding: var(--spacing-xs) var(--spacing-md); */
}

.title-details .notes-text-area {
    margin-top: var(--spacing-sm);
}
.title-details .save-notes-button {
    margin-top: var(--spacing-md);
}

.title-details .update-title-button {
    margin: var(--spacing-md) 0;
}

.favourite.is-favourite {
    color: var(--color-secondary);
}


.aggregator-wrapper {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
}
.aggregator-wrapper .link-button {
    display: flex;
    gap: var(--spacing-md);
    padding: var(--spacing-sm) var(--spacing-md);
}
.aggregator-wrapper .details {
    font-size: var(--font-size-sm);
    font-weight: 400;
    color: var(--color-text-light);
}


/* - - - - - EPISODE MAP - - - - -  */
.episode-map {
    overflow-x: scroll;
    padding-bottom: var(--spacing-sm);
}

.season-row {
    display: flex;
    gap: var(--spacing-xs);
}

.episode-tile {
    width: 30px;
    min-width: 30px;
    padding: var(--spacing-sm);
    padding-bottom: calc(var(--spacing-sm) - 4px);
    margin: var(--spacing-xs) 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius-small);
    background-color: var(--color-background-card); /* Default background */
    cursor: pointer;
    user-select: none;
    font-weight: 600;
    /* border-bottom: 4px solid transparent; */
    color: var(--color-text);
    text-decoration: none;
}
.episode-tile:hover {
    text-decoration: underline;
}

/* .episode-tile.watched { */
    /* border: 0px solid transparent; */
    /* border-bottom: 4px solid green; */
/* } */

.episode-tile.un-released {
    background-color: var(--color-background-card-section) !important;
    color: var(--color-text-hidden);
}

.episode-tile.label{
    background-color: transparent;
    color: var(--color-text-light);
    text-decoration: none;
    cursor: initial;
    user-select: initial;
}



.choice-modal {
    display: flex;
    flex-direction: column;
    /* row-gap: var(--spacing-md); */
}
.choice-modal p {
    margin-bottom: 0;
}
.choice-modal ul {
    margin-top: var(--spacing-sm);
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
    row-gap: var(--spacing-xs);
}
.choice-modal .choice-buttons {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: var(--spacing-sm);
}
.choice-modal .seperator {
    margin: var(--spacing-lg) 0;
}
.choice-modal h3 {
    margin-top: var(--spacing-lg);
    margin-bottom: var(--spacing-sm);
}
.choice-modal .choice-buttons button {
    margin: 0;
}

.choice-modal .text-hidden {
    margin-bottom: 0;
}
</style>
  