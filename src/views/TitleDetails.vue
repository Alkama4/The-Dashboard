<template>
    <div v-if="titleInfo" class="title-info">
        <div class="background backdrop-image-container" v-if="standAloneBuild">
            <img
                @load="(event) => event.target.classList.add('loaded')"
                class="visible" 
                :src="`https://image.tmdb.org/t/p/original${titleInfo.backup_backdrop_url}`" 
            />
        </div>
        <div class="background backdrop-image-container" v-else-if="titleInfo.backdrop_image_count >= 1">
            <div v-for="image in imageSlideshowData.individualData" :key="image.number">
                <img
                    v-if="image.number === imageSlideshowData.showOnDom || imageSlideshowData.keepOnDom.includes(image.number)" 
                    @load="image.isLoaded = true" 
                    :class="{ visible: image.isLoaded && image.number === imageSlideshowData.chosenOne }" 
                    :src="`${apiUrl}/image/${titleInfo.title_id}/backdrop${image.number + 1}.jpg${isTouchDevice ? '?width=1200' : ''}`" 
                />
            </div>
        </div>

        <div class="backdrop-dimension"></div>
        <div class="backdrop-container backdrop-dimension" @keydown="backdropKeypress" tabindex="0">
            <div class="content-inside">
                <div class="main backdrop-image-container" v-if="standAloneBuild">
                    <img
                        @load="(event) => event.target.classList.add('loaded')"
                        class="visible" 
                        :src="`https://image.tmdb.org/t/p/original${titleInfo.backup_backdrop_url}`" 
                    />
                </div>
                <div class="main backdrop-image-container" v-else-if="titleInfo.backdrop_image_count >= 1">
                    <div v-for="image in imageSlideshowData.individualData" :key="image.number">
                        <img
                            v-if="image.number === imageSlideshowData.showOnDom || imageSlideshowData.keepOnDom.includes(image.number)" 
                            @load="image.isLoaded = true" 
                            :class="{ visible: image.isLoaded && image.number === imageSlideshowData.chosenOne }" 
                            :src="`${apiUrl}/image/${titleInfo.title_id}/backdrop${image.number + 1}.jpg${isTouchDevice ? '?width=1200' : ''}`" 
                            />
                    </div>
                </div>

                <div class="button-holder no-pointer-events" v-if="titleInfo.backdrop_image_count > 1">
                    <button class="left all-pointer-events" @click="addOrSubtractSlideshowIndex(-1)"><IconChevronDown size="50"/></button>
                    <button class="right all-pointer-events" @click="addOrSubtractSlideshowIndex(1)"><IconChevronDown size="50"/></button>
                </div>
                
                <div class="indicator">
                    <IndicatorDots 
                        :dotIndex="imageSlideshowData.chosenOne" 
                        :dotCount="titleInfo.backdrop_image_count"
                        @dotSelected="updateSlideshowImageTo"
                    />
                </div>
            </div>
        </div>

        <div class="content-width-medium title-details">
            <div class="poster-next-to-stuff">
                <div class="poster-holder">
                    <div class="poster-placholder">
                        <img 
                            :src="imageUrl(300, titleInfo.backup_poster_url, titleInfo.title_id)" 
                            @load="(event) => event.target.classList.add('loaded')"
                        >
                    </div>
                </div>

                <div class="name-and-stuff">
                    <div class="name-and-tagline">
                        <h1 class="title-name">
                            <span class="all-pointer-events" :title="titleInfo.name">
                                {{ titleInfo.name }} 
                            </span>
                            <span class="all-pointer-events original-title" :title="titleInfo.name_original" v-if="titleInfo.name_original && titleInfo.name !== titleInfo.name_original">
                                ({{ titleInfo.name_original }})
                            </span>
                        </h1>
                        <q class="tagline all-pointer-events" v-if="titleInfo.tagline">{{ titleInfo.tagline }}</q>
                    </div>

                    <div class="tags">
                        <div class="tag tag-positive" v-if="titleInfo.watch_count >= 1">
                            Watched
                        </div>
                        <div class="tag tag-primary" v-if="new Date(titleInfo.release_date) < new Date() && new Date(titleInfo.release_date) > new Date(new Date() - 2 * 7 * 24 * 60 * 60 * 1000)">
                            Just released
                        </div>
                        <div class="tag tag-upcoming" v-if="new Date(titleInfo.release_date) > new Date()">
                            Upcoming
                        </div>
                        <div class="tag tag-secondary" v-if="titleInfo.favourite == 1">
                            Favourite
                        </div>

                        <div class="tag" v-for="genre in titleInfo.genres" :key="genre">{{ genre }}</div>
                    </div>

                    <div class="control-button-array combined-buttons">
                        <button 
                            v-if="titleInfo.favourite == null || titleInfo.favourite == false"
                            class="button-primary left-button flex-1" 
                            @click="handleFavouriteToggle"
                            :disabled="waitingForResult.length != 0"
                            :class="{loading: waitingForResult.length != 0}"
                        >
                            <IconHeart/>
                        </button>
                        <button 
                            v-else
                            class="red-heart left-button flex-1" 
                            @click="handleFavouriteToggle" 
                            :disabled="waitingForResult.length != 0"
                            :class="{loading: waitingForResult.length != 0}"
                        >
                            <IconHeart/>
                        </button>

                        <!-- Watched buttons -->
                        <button 
                            v-if="titleInfo.watch_count == null || titleInfo.watch_count <= 0"
                            class="button-primary middle-button flex-2" 
                            @click="handleTitleWatchClick('title', 'watched')"
                            :disabled="waitingForResult.length != 0"
                            :class="{loading: waitingForResult.length != 0}"
                        >
                            Mark title as watched
                        </button>
                        <button 
                            v-else
                            class=" middle-button flex-2" 
                            @click="handleTitleWatchClick('title', 'unwatched')" 
                            :disabled="waitingForResult.length != 0"
                            :class="{loading: waitingForResult.length != 0}"
                        >
                            Reset title watch status 
                        </button>

                        <!-- Watch list buttons -->
                        <button 
                            v-if="titleInfo.watch_count == null || titleInfo.watch_count <= -1"
                            class="button-primary right-button flex-1" 
                            @click="handleWatchListModification('add')"
                            :disabled="waitingForResult.length != 0"
                            :class="{loading: waitingForResult.length != 0}"
                        >
                            <IconListAdd/>
                        </button>
                        <button 
                            v-else
                            class="right-button flex-1"
                            @click="handleWatchListModification('remove')" 
                            :disabled="waitingForResult.length != 0"
                            :class="{loading: waitingForResult.length != 0}"
                        >
                            <IconListRemove/>
                        </button>
                    </div>
                </div>
            </div>

            <div class="at-a-glance">

                <div class="ratings">
                    <div class="short-value">
                        <span class="value icon-align">
                            <IconIMDBColorful size="40px" class="imdb-icon"/>
                            {{ titleInfo?.imdb_vote_average ?? '-' }} 
                        </span>
                        <span class="text-lighter">
                            {{ titleInfo?.imdb_vote_count?.toLocaleString("fi-FI") ?? '0' }} votes
                        </span>
                    </div>
                    <div class="short-value">
                        <span class="value icon-align">
                            <IconTMDBColorful size="40px" class="tmdb-icon"/>
                            {{ titleInfo?.tmdb_vote_average ?? '-' }} 
                        </span>
                        <span class="text-lighter">
                            {{ titleInfo?.tmdb_vote_count?.toLocaleString("fi-FI") ?? '0' }} votes
                        </span>
                    </div>
        
                    <div class="seperator"></div>
    
                    <div class="short-value">
                        <span class="value">
                            {{ titleInfo.age_rating == "" || titleInfo.age_rating == null ? '-' : titleInfo.age_rating }}
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
                        :href="`https://www.imdb.com/title/${this.titleInfo.imdb_id}/awards`" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="value no-decoration">{{ titleInfo.awards ?? '-' }}
                    </a>
                    <span class="text-lighter">Awards & Nominations</span>
                </div>
            </div>

            <h3>Overview</h3>
            <p style="margin: 0;">{{ titleInfo.overview }}</p>
            
            <div class="trailer-details-flex">
                <div class="details-container">
                    <h3 class="icon-align">
                        Title details
                        <IconRefresh
                            size="28px"
                            left="6px"
                            @click="openTitleUpdateModal()"
                            :class="{
                                'loading': waitingForResult.includes('titleUpdate' + 0),
                                'spin-refresh-icon': waitingForResult.includes('titleUpdate' + 0)
                            }"
                            class="icon-button"
                        />
                    </h3>

                    <div class="details-grid">

                        <div v-if="titleInfo.type == 'movie'">
                            Movie length
                        </div>
                        <div v-if="titleInfo.type == 'movie'" class="value">
                            {{ formatRuntime(titleInfo.movie_runtime) }}
                        </div>

                        <div v-if="titleInfo.type == 'tv'">Progress</div>
                        <div v-if="titleInfo.type == 'tv'" class="value">
                            {{ getWatchedStats() }}
                        </div>

                        <div v-if="titleInfo.type == 'tv'">
                            Season count
                        </div>
                        <div v-if="titleInfo.type == 'tv'" class="value">
                            {{ titleInfo.seasons.length }} season<template v-if="titleInfo.seasons.length > 1">s</template>
                        </div>
                        <div v-if="titleInfo.type == 'tv'">
                            Episode count
                        </div>
                        <div v-if="titleInfo.type == 'tv'" class="value">
                            {{ titleEpisodeCount }} episode<template v-if="titleEpisodeCount > 1">s</template>
                        </div>

                        <!-- Get the last episode date as "date - end date" -->
                        <div>
                            <template v-if="titleInfo.type == 'tv'">First air date</template>
                            <template v-else>Release date</template>
                        </div>
                        <div class="value">
                            {{ new Date(titleInfo.release_date).toLocaleDateString("fi-FI", {day: "numeric", month: "long", year: "numeric"}) }}
                        </div>

                        <div v-if="titleInfo.type == 'tv'">
                            last air date
                        </div>
                        <div v-if="titleInfo.type == 'tv'" class="value">
                            {{ new Date(titleLastAirDate).toLocaleDateString("fi-FI", {day: "numeric", month: "long", year: "numeric"}) }}
                        </div>

                        <div v-if="titleInfo.type == 'movie'">Revenue</div>
                        <div 
                            v-if="titleInfo.type == 'movie'" 
                            class="value" 
                            :title="titleInfo?.revenue?.toLocaleString('fi-FI', { maximumFractionDigits: 0 }) + ' $'"
                        >
                            {{ formatToMillions(titleInfo.revenue) ?? '-' }}
                        </div>
                        <div v-if="titleInfo.type == 'movie'">Budget</div>
                        <div 
                            v-if="titleInfo.type == 'movie'"
                            class="value" 
                            :title="titleInfo?.budget?.toLocaleString('fi-FI', { maximumFractionDigits: 0 }) + ' $'"
                        >
                            {{ formatToMillions(titleInfo.budget) ?? '-' }}
                        </div>

                        <div>Original language</div>
                        <div class="value">{{ titleInfo.original_language ?? '-' }}</div>

                        <div>
                            Production countr<template v-if="titleInfo?.production_countries?.includes(',')">ies</template><template v-else>y</template>
                        </div>
                        <div class="value">{{ titleInfo?.production_countries ?? '-'}}</div>

                        <h4>Metadata</h4>
                        <div></div>

                        <!-- <div>Title type</div>
                        <div class="value">{{ titleInfo.type }}</div> -->

                        <div>IMDB id</div>
                        <div class="value">
                            {{ titleInfo.imdb_id }}
                            <a 
                                class="flex"
                                :href="`https://www.imdb.com/title/${this.titleInfo.imdb_id}`"
                                target="_blank" 
                                rel="noopener noreferrer" 
                            >
                                <IconLinkExternal size="20px"/>
                            </a>
                        </div>

                        <div>TMDB id</div>
                        <div class="value">
                            {{ titleInfo.tmdb_id }}
                            <a 
                                class="flex"
                                :href="`https://www.themoviedb.org/${this.titleInfo.type}/${this.titleInfo.tmdb_id}`" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                            >
                                <IconLinkExternal size="20px"/>
                            </a>
                        </div>

                        <div>Title details updated <InfoTooltip text="Title information is updated with the button above. This is only the title and does not include episodes or seasons." position="right"/></div>
                        <div class="value">{{ new Date(titleInfo.last_updated).toLocaleDateString("fi-FI") }}</div>

                        <div>User data updated <InfoTooltip text="User-related information is updated when you mark the title (or any of its episodes or seasons) as watched, edit its notes, or add it to favourites." position="right"/></div>
                        <div class="value">{{ new Date(titleInfo.user_title_last_updated).toLocaleDateString('fi-FI') }}</div>

                    </div>
                </div>

                <div v-if="titleInfo.trailer_key != null" class="trailer-container">
                    <h3>Trailer</h3>
                    <div class="iframe-container">
                        <iframe
                            :src="`https://www.youtube.com/embed/${titleInfo.trailer_key}`"
                            frameborder="0"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            </div>
                
            <div v-if="titleInfo.watch_count >= 0">
                <h3>Notes</h3>
                <textarea class="notes-text-area" v-model="this.titleInfo.notes" placeholder="Write your notes, thoughts, favorite moments, or timestamps here..."></textarea>
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
        <div class="content-width-medium-unrestricted" v-if="titleInfo.seasons">
            <h2 id="episode_map">Episode map</h2>
            <!-- <h2 id="episode_map" class="icon-align"><IconTMDB size="42px" style="margin-right: 6px;"/> Episode map</h2> -->

            <router-link 
                class="sticky-corner-button link-button" 
                style="transition: opacity 0.1s ease-out;"
                :style="{ opacity: scrolledPastEpisodeMap ? 1 : 0 }"
                to="#episode_map"
            >
                <IconChevronDown size="28px" style="rotate: 180deg;"/>
            </router-link>

            <div class="episode-map">
                <div class="season-row">
                    <div class="episode-tile label">
                    </div>
                    <div 
                        v-for="(episode, index) in titleInfo.seasons.reduce((maxSeason, season) => 
                            season.episodes.length > maxSeason.episodes.length ? season : maxSeason, titleInfo.seasons[0]).episodes" 
                        :key="episode.id"
                        class="episode-tile label" 
                    >
                        E{{ index + 1 }}
                    </div>
                </div>
                <div v-for="season in titleInfo.seasons" 
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
                            watched: episode.watch_count > 0,
                            'un-released': new Date(episode.air_date) > new Date()
                        }"
                        :style="{'background-color': episode.tileColor || 'var(--color-background-card)'}"
                        :title="`S${season.season_number} E${episode.episode_number}`"
                        :to="`/watch_list/title/${titleInfo.title_id}#S${season.season_number}E${episode.episode_number}`"
                    >
                        {{ new Date(episode.air_date) > new Date() ? '-' : episode.tmdb_vote_average }}
                    </router-link>
                </div>
            </div>
        </div>

        <div class="content-width-large" v-if="titleInfo.seasons">
            <h2>Season & episode details</h2>

            <div v-for="season in titleInfo.seasons" 
                :key="season.season_id" 
                class="card season" 
                :class="{'active': expandedSeason == season.season_id}"
            >
                <div class="about" @click="toggleHeight(`refSeason${season.season_number}`)">
                    <div class="poster-container">
                        <!-- :src="`${apiUrl}/image/${titleInfo.title_id}/season${season.season_number}/poster.jpg`" -->
                        <img 
                            class="poster" 
                            :src="imageUrl(300, season.backup_poster_url, titleInfo.title_id, season.season_number)" 
                            @load="(event) => event.target.classList.add('loaded')"
                        />
                        <div class="tag-holder">
                            <div class="tag tag-positive" v-if="0 != season.episodes.reduce((min, ep) => Math.min(min, ep.watch_count), Infinity) && season.episodes.length >= 1">
                                Watched
                            </div>
                            <div class="tag tag-primary" v-else-if="season.episodes.length == 0 || new Date(season.episodes[0].air_date) > new Date()">
                                Upcoming
                            </div>
                        </div>
                    </div>
                    <div class="text">
                        <h2 class="icon-align">
                            {{ season.season_name }}
                            <!-- @click.stop="handleTitleUpdate('seasonInfo', season.season_number)" -->
                            <IconRefresh 
                                size="28px"
                                left="6px"
                                @click.stop="openSeasonUpdateModal(season.season_number)"
                                :class="{
                                    'loading': waitingForResult.includes('titleUpdate' + season.season_number),
                                    'spin-refresh-icon': waitingForResult.includes('titleUpdate' + season.season_number)
                                }"
                                class="icon-button"
                            />
                        </h2>
                        <!-- ONLY SPIN THE ICON FOR THE THING THAT WE ARE UPDATING -->
                        <!-- ONLY SPIN THE ICON FOR THE THING THAT WE ARE UPDATING -->
                        <div class="details">
                            <div class="icon-align single-line">
                                <span>{{ season.episode_count }} episodes</span>
                                <span class="bullet">&bullet;</span>
                                <span class="icon-align"><IconTMDB style="margin-left: -3px; margin-right: 3px;"/> {{ season.tmdb_vote_average }} ({{ seasonVotes(season) }} votes)</span>
                            </div>
                            <div>
                                {{ season.episodes.length > 0 ? new Date(season.episodes[0].air_date).toLocaleDateString("fi-FI", {day: "numeric", month: "long", year: "numeric"}) : "No release date"}}
                            </div>
                        </div>
                        <p :title="season.overview">{{ season.overview }}</p>
                    </div>
                    <button 
                        class="modify-watched button-primary"
                        v-if="season.episodes.length === 0 || 0 === season.episodes.reduce((min, ep) => Math.min(min, ep.watch_count), Infinity)"
                        @click.stop="handleTitleWatchClick('season', 'watched', season.season_id)"
                        :disabled="waitingForResult.length != 0"
                        :class="{loading: waitingForResult.length != 0}"
                    >
                        Mark season watched
                    </button>
                    <button
                        class="modify-watched "
                        v-else
                        @click.stop="handleTitleWatchClick('season', 'unwatched', season.season_id)"
                        :disabled="waitingForResult.length != 0"
                        :class="{loading: waitingForResult.length != 0}"
                    >
                        Mark season unwatched
                    </button>
                </div>
                
                <!-- EPISODES -->
                <div class="episodes" :ref="`refSeason${season.season_number}`">
                    <div class="episodes-padding" v-if="this.openedSeasons.includes(`refSeason${season.season_number}`)">
                        <div 
                            v-for="(episode, index) in season.episodes" 
                            :key="episode.episode_number" class="episode" 
                            :id="`S${season.season_number}E${episode.episode_number}`"
                            :class="{
                                'not-realeased': new Date(episode.air_date) > new Date(),
                                'last': index === season.episodes.length - 1
                            }"
                        >
                            <div class="still-container">
                                <div 
                                    v-if="failedToLoadImages.includes(episode.episode_id)"
                                    class="still failed-to-load"
                                >
                                    <IconFileImage size="40px"/>
                                    <span>404</span>
                                </div>
                                <img 
                                    v-else
                                    class="still" 
                                    :src="imageUrl(900, episode.backup_still_url, titleInfo.title_id, season.season_number, episode.episode_number)"
                                    @error="failedToLoadImages.push(episode.episode_id)"
                                    @load="(event) => event.target.classList.add('loaded')"
                                >
                                <!-- Tag to show if newly released or watched, or maybe even un released status -->
                                <div class="tag-holder">
                                    <div class="tag tag-positive" v-if="episode.watch_count >= 1">
                                        Watched
                                    </div>
                                    <div class="tag tag-primary" v-else-if="new Date(episode.air_date) < new Date() && new Date(episode.air_date) > new Date(new Date() - 7 * 24 * 60 * 60 * 1000)">
                                        New episode
                                    </div>
                                    <div class="tag" v-else-if="new Date(episode.air_date) > new Date()">
                                        Upcoming
                                    </div>
                                </div>
                            </div>
                            
                            <div class="text">
                                <h3 :title="episode.episode_name">{{ episode.episode_number }}. {{ episode.episode_name }}</h3>
                                <div class="details">
                                    <span class="icon-align" >
                                        <span>{{ formatRuntime(episode.runtime) }} &bullet;</span>
                                        <span class="icon-align"><IconTMDB style="margin-right: 3px; margin-left: 2px;"/>{{ new Date(episode.air_date) > new Date() ? '-' : episode.tmdb_vote_average }} ({{ episode.tmdb_vote_count ?? '0'}} votes)</span>
                                    </span>
                                    <div>
                                        {{ 
                                            episode.air_date ? 
                                            new Date(episode.air_date).toLocaleDateString("fi-FI", {day: "numeric", month: "long", year: "numeric"}) : 
                                            "No release date"
                                        }}
                                    </div>
                                </div>
                                <p :title="episode.overview">{{ episode.overview }}</p>
                                <button 
                                    v-if="episode.watch_count == 0 || episode.watch_count == null"
                                    class="modify-watched button-primary"
                                    @click="handleTitleWatchClick('episode', 'watched', episode.episode_id)"
                                    :class="{
                                        loading: waitingForResult.length != 0}"
                                >
                                    Mark watched
                                </button>
                                <button 
                                    v-else
                                    class="modify-watched "
                                    @click="handleTitleWatchClick('episode', 'unwatched', episode.episode_id)"
                                    :class="{loading: waitingForResult.length != 0}"
                                >
                                    Unwatch
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ========== MODALS ========== -->

        <!-- Watch list modification -->
        <ConfirmationModal 
            ref="removeTitleCM"
            header="Remove from watchlist"
            text="Are you sure you wan't to remove the title from your watchlist?
            This gets rid of all your data on the title like your watched episodes and notes."
            affirmative-option="Remove title"
        />

        <!-- Titles watch/unwatch -->
        <ConfirmationModal 
            ref="markTitleWatchedCM"
            header="Mark watched"
            text="Are you sure you want to mark the entire TV show as watched?
            This will mark all episodes as watched, effectively erasing your progress."
            affirmative-option="Mark as Watched"
        />
        <ConfirmationModal 
            ref="markTitleUnwatchedCM"
            header="Reset watch status"
            text="Are you sure you want to reset the title's watch status?
            This will mark all episodes as unwatched, effectively erasing your progress."
            affirmative-option="Reset status"
        />

        <!-- Seasons watch/unwatch -->
        <ConfirmationModal 
            ref="markSeasonWatchedCM"
            header="Mark watched"
            text="Are you sure you want to mark the entire season as watched?
            This will mark all episodes in the season as watched, effectively erasing your progress."
            affirmative-option="Mark as Watched"
        />
        <ConfirmationModal 
            ref="markSeasonUnwatchedCM"
            header="Reset watch status"
            text="Are you sure you want to reset the season's watch status?
            This will mark all episodes in the season as unwatched, effectively erasing your progress."
            affirmative-option="Reset status"
        />

        <!-- Title refresh data -->
        <GenericModal ref="refreshTitleDataGM" header="Refresh Title Data">
            <div class="choice-modal">
                <p>Which part of the title would you like to refresh?</p>
                <div class="choice-buttons">
                    <button @click="handleTitleUpdate('titleInfo')">Title & Season Info</button>
                    <button @click="handleTitleUpdate('titleImages')">Title & Season Images</button>
                    <button @click="handleTitleUpdate('fullUpdate')">Full Refresh (All Data & Images)</button>
                </div>
                <p v-if="titleInfo.type == 'tv'" class="text-hidden icon-align">
                    Hint: To update episodes you can use the season menu instead of using the Full Refresh.
                </p>
            </div>
        </GenericModal>

        <!-- Season refresh data -->
        <GenericModal ref="refreshSeasonDataGM" header="Refresh Season Data">
            <div class="choice-modal">
                <p>Which part of the season would you like to refresh?</p>
                <div class="choice-buttons">
                    <button @click="handleTitleUpdate('seasonInfo')">Episode Info</button>
                    <button @click="handleTitleUpdate('seasonImages')">Episode Images</button>
                    <!-- <button @click="handleSeasonUpdate('fullUpdate')">Full Refresh (All Episodes & Images)</button> -->
                </div>
            </div>
        </GenericModal>
    </div>

    <div v-else-if="!waitingForResult.includes('titleInfo')">
        <notFoundPage/>
    </div>
</template>

  
<script>
// Basic
import api from '@/utils/dataQuery';
import router from '@/router';
import { notify } from '@/utils/notification';
import InfoTooltip from '@/components/InfoTooltip.vue';
import IndicatorDots from '@/components/IndicatorDots.vue';
import { interpolateBetweenColors, getCssVar, convert } from '@/utils/mytools'
import notFoundPage from '@/views/404Page.vue';

// Icons
import IconTMDB from '@/components/icons/IconTMDB.vue';
import IconTMDBColorful from '@/components/icons/IconTMDBColorful.vue';
import IconIMDBColorful from '@/components/icons/IconIMDBColorful.vue';
import IconChevronDown from '@/components/icons/IconChevronDown.vue';
import IconListRemove from '@/components/icons/IconListRemove.vue';
import IconListAdd from '@/components/icons/IconListAdd.vue';
import IconFileImage from '@/components/icons/IconFileImage.vue';
import IconHeart from '@/components/icons/IconHeart.vue';
import IconLinkExternal from '@/components/icons/IconLinkExternal.vue';
import IconRefresh from '@/components/icons/IconRefresh.vue';
import ConfirmationModal from '@/components/ModalConfirmation.vue';
import GenericModal from '@/components/ModalGeneric.vue';

export default {
    data() {
        return {
            apiUrl: process.env.VUE_APP_API_URL,
            titleID: this.$route.params.titleID,
            titleInfo: null,
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
            scrolledPastEpisodeMap: false,
            standAloneBuild: process.env.VUE_APP_STANDALONE_BUILD == "true",
            isTouchDevice: false,
            selectedSeasonToUpdate: null,
        };
    },
    components: {
        InfoTooltip,
        IndicatorDots,
        ConfirmationModal,
        GenericModal,
        notFoundPage,

        IconTMDB,
        IconTMDBColorful,
        IconIMDBColorful,
        IconChevronDown,
        IconListRemove,
        IconListAdd,
        IconFileImage,
        IconHeart,
        IconLinkExternal,
        IconRefresh,
    },
    methods: {
        formatRuntime(runtime) {
            return convert.runtime(runtime);
        },
        formatToMillions(amount) {
            return convert.toLargeUsd(amount);
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
            this.titleInfo.seasons.forEach(season => {
                const seasonRef = `refSeason${season.season_number}`;
                // Don't set height for the one that we wan't to be open
                if (seasonRef != keepRef) {
                    this.setHeightToNone(seasonRef, noTransition);
                }
            })
        },
        // make this go through a MODAL?
        async handleTitleWatchClick(titleOrSeasonOrEpisode, watchedOrUnwatched, customID) {
            // Initially get a confirmation from the user before going through
            if (
                this.titleInfo.type == "tv" && 
                titleOrSeasonOrEpisode == "title" && 
                watchedOrUnwatched == "watched" && 
                !await this.$refs.markTitleWatchedCM.prompt()
            ) { return } else if (
                this.titleInfo.type == "tv" && 
                titleOrSeasonOrEpisode == "title" && 
                watchedOrUnwatched == "unwatched" && 
                !await this.$refs.markTitleUnwatchedCM.prompt()
            ) { return } else if (
                this.titleInfo.type == "tv" && 
                titleOrSeasonOrEpisode == "season" && 
                watchedOrUnwatched == "watched" && 
                !await this.$refs.markSeasonWatchedCM.prompt()
            ) { return } else if (
                this.titleInfo.type == "tv" && 
                titleOrSeasonOrEpisode == "season" && 
                watchedOrUnwatched == "unwatched" && 
                !await this.$refs.markSeasonUnwatchedCM.prompt()
            ) { return }

            this.waitingForResult.push(`${titleOrSeasonOrEpisode}${watchedOrUnwatched}${customID}`);
                
            // A funny little if else where it gets whether we are getting tv, movie, season or episode
            let type = "";
            if (titleOrSeasonOrEpisode == "title") {
                type = this.titleInfo.type;
            } else {
                type = titleOrSeasonOrEpisode;
            }

            // Select the correct id eg. title_id, season_id etc.
            let selectedTypesID = 0;
            if (customID)  {
                selectedTypesID = customID;
            } else {
                selectedTypesID = this.titleInfo.title_id
            }

            const response = await api.modifyTitleWatchCount(type, selectedTypesID, watchedOrUnwatched)
            if (response) {
                console.debug(response)
                // Update titles state on page
                this.titleInfo.watch_count = response.updated_data.watch_count;
                // Update each episodes state on page by mathcing the episode_id
                if (response.updated_data.episodes) {
                    console.debug(response.updated_data.episodes)
                    console.debug(this.titleInfo.seasons)
                    
                    // Loop through each episode in response.updated_data.episodes
                    response.updated_data.episodes.forEach(updatedEpisode => {
                    // Find the matching episode in titleInfo using the episode_id
                    const matchingEpisode = this.titleInfo.seasons
                        .flatMap(season => season.episodes)
                        .find(episode => episode.episode_id === updatedEpisode.episode_id);
                    
                    if (matchingEpisode) {
                        // If a matching episode is found update value
                        matchingEpisode.watch_count = updatedEpisode.watch_count;
                    }
                    });
                }
            }

            this.removeItemFromWaitingArray(`${titleOrSeasonOrEpisode}${watchedOrUnwatched}${customID}`);
        },
        async handleNotesSave() {
            this.waitingForResult.push("saveNotes");

            const response = await api.saveTitleNotes(this.titleInfo.title_id, this.titleInfo.notes)
            if (response) {
                console.log(response);
                notify(response.message, "success");
            }
            
            this.removeItemFromWaitingArray("saveNotes");
        },
        openTitleUpdateModal() {
            // Set to 0 incase user chooses to update everything and the user has already updated/opened a season
            // Also acts as a useful identifier for the spinning animation
            this.selectedSeasonToUpdate = 0;    
            this.$refs.refreshTitleDataGM.open();
        },
        openSeasonUpdateModal(seasonNumber) {
            this.selectedSeasonToUpdate = seasonNumber;
            this.$refs.refreshSeasonDataGM.open();
        },
        async handleTitleUpdate(whatIsUpdated) {
            const updatingNumber = this.selectedSeasonToUpdate;
            this.waitingForResult.push("titleUpdate" + updatingNumber);
            let response = null;

            if (whatIsUpdated.includes("season")) {
                this.$refs.refreshSeasonDataGM.close();
            } else {
                this.$refs.refreshTitleDataGM.close();
            }
            
            if (whatIsUpdated == "titleInfo") {
                response = await api.updateTitleInfo(this.titleInfo.tmdb_id, this.titleInfo.type);
            } else if (whatIsUpdated == "titleImages") {
                response = await api.updateTitleImages(this.titleInfo.tmdb_id, this.titleInfo.type);
            } else if (whatIsUpdated == "seasonInfo") {
                console.log(updatingNumber);
                response = await api.updateSeasonInfo(this.titleInfo.tmdb_id, this.titleInfo.type, updatingNumber);
            } else if (whatIsUpdated == "seasonImages") {
                response = await api.updateSeasonImages(this.titleInfo.tmdb_id, this.titleInfo.type, updatingNumber);
            } else if (whatIsUpdated == "fullUpdate") {
                response = await api.updateTitleFully(this.titleInfo.tmdb_id, this.titleInfo.type);
            }
            
            if (response) {
                let updateMessage = `"${this.titleInfo.name}" info updated!`;
                
                if (whatIsUpdated === "titleInfo") {
                    updateMessage = `"${this.titleInfo.name}" title information has been updated. Missing images might still be loading in the background.`;
                } else if (whatIsUpdated === "titleImages") {
                    updateMessage = `"${this.titleInfo.name}" title images are now updating in the background.`;
                } else if (whatIsUpdated === "seasonInfo") {
                    updateMessage = `Season ${updatingNumber} info for "${this.titleInfo.name}" has been updated. Missing images might still be loading in the background.`;
                } else if (whatIsUpdated === "seasonImages") {
                    updateMessage = `Season ${updatingNumber} images for "${this.titleInfo.name}" are now updating in the background.`;
                } else if (whatIsUpdated === "fullUpdate") {
                    updateMessage = `All the data for "${this.titleInfo.name}" has been replaced. Images are also now updating in the background.`;
                }
                
                // Notify with the appropriate message
                notify(updateMessage, "success");

                // Update data without refreshing
                await this.queryTitleData();
                this.episodeMapTileBackgroundColors();
            }

            this.removeItemFromWaitingArray("titleUpdate" + updatingNumber);
        },
        async handleFavouriteToggle() {
            this.waitingForResult.push("favourite");
            const response = await api.toggleTitleFavourite(this.titleInfo.title_id)
            if (response) {
                console.log(response);
                this.titleInfo.favourite = !this.titleInfo.favourite;
                if (this.titleInfo.watch_count <= -1) {
                    this.titleInfo.watch_count = 0;
                }
            }
            this.removeItemFromWaitingArray("favourite");
        },
        async handleWatchListModification(action) {
            // Get confirmation before initiaing if removing
            if (action == "remove" && !await this.$refs.removeTitleCM.prompt()) { return }

            this.waitingForResult.push("titleWatched");
            if (action == "remove") {
                const response = await api.removeTitleFromUserList(this.titleInfo.tmdb_id);
                if (response) {
                    console.debug("Title removed successfully")
                }
            } else if (action == "add") {
                const response = await api.addTitleToUserList(this.titleInfo.tmdb_id, this.titleInfo.type);
                if (response) {
                    console.debug("Title added successfully!")
                }
            }            
            await this.queryTitleData()
            this.episodeMapTileBackgroundColors();
            this.removeItemFromWaitingArray("titleWatched");
        },
        removeItemFromWaitingArray(item) {
            this.waitingForResult = this.waitingForResult.filter(i => i !== item);
        },
        async queryTitleData() {
            this.waitingForResult.push("titleInfo");
            // Query the details from api for the title here:
            const response = await api.getTitleInfo(this.titleID);
            if (response && response.title_info) {
                if (response.title_info.length !== 0) {
                    this.titleInfo = response.title_info;
                    if (this.standAloneBuild) {
                        this.titleInfo.backdrop_image_count = 1;
                    }
                    console.debug("[queryTitleData] Values set to this.titleInfo: ", this.titleInfo)
                } else {
                    notify("The title doesn't exist!", "error");
                    router.push("/watch_list");
                }
            }
            this.removeItemFromWaitingArray("titleInfo");
        },
        backdropKeypress(event) {
            if (['ArrowLeft', 'a', 'w'].includes(event.key)) {
                this.addOrSubtractSlideshowIndex(-1);
            } else if (['ArrowRight', 'd', 's', 'Enter'].includes(event.key)) {
                this.addOrSubtractSlideshowIndex(1);
            } else if (['1', '2', '3', '4', '5'].includes(event.key)) {
                if (Number(event.key) <= this.titleInfo.backdrop_image_count)
                    this.updateSlideshowImageTo(Number(event.key) - 1);
            }
        },
        getWatchedStats() {
            const totalEpisodes = this.titleInfo.seasons?.reduce((sum, season) => sum + season.episodes.length, 0) || 0;
            const watchedEpisodes = this.titleInfo.seasons?.reduce((sum, season) => sum + season.episodes.filter(ep => ep.watch_count >= 1).length, 0) || 0;
            const percentage = totalEpisodes ? ((watchedEpisodes / totalEpisodes) * 100).toFixed(1) + "%" : "0%";
            return `${watchedEpisodes} / ${totalEpisodes} episodes (${percentage})`;
        },
        updateSlideshowImageTo(newImageIndex) {
            // Push the current image to fade-out images before updating
            this.imageSlideshowData.keepOnDom.push(this.imageSlideshowData.chosenOne);

            // Update `showOnDom` and ensure it loops correctly
            this.imageSlideshowData.showOnDom = newImageIndex;

            // Small timeout to let the DOM update (prevents flickering)
            setTimeout(() => {
                this.imageSlideshowData.chosenOne = this.imageSlideshowData.showOnDom;
            }, 20);

            // Remove the oldest fade-out image after the transition completes
            setTimeout(() => {
                this.imageSlideshowData.keepOnDom.shift();
            }, 500);
        },
        addOrSubtractSlideshowIndex(amount) {
            let newNumber = this.imageSlideshowData.chosenOne + amount;

            // Ensure looping through images
            if (newNumber >= this.titleInfo.backdrop_image_count) newNumber = 0;
            if (newNumber < 0) newNumber = this.titleInfo.backdrop_image_count - 1;

            // Call updateImage with the new number
            this.updateSlideshowImageTo(newNumber);
        },
        episodeMapTileBackgroundColors() {
            if (this.titleInfo && this.titleInfo.seasons) {
                const baseColor = getCssVar("color-background-card");
                const ratingColor = getCssVar("color-primary");

                this.titleInfo.seasons.forEach(season => {
                    season.episodes.forEach(episode => {
                        let rating = episode.tmdb_vote_average;

                        // Convert to be between 0 and 1
                        rating = rating / 10;

                        // Convert to blocks of 0.1 (groups based on starting number)
                        rating = Math.floor(rating * 10) / 10 + 0.1;

                        // Adjust the color scaling with power
                        rating = Math.pow(rating, 5);
                        
                        episode.tileColor = interpolateBetweenColors(baseColor, ratingColor, rating);
                    });        
                });
            }
        },
        checkScroll() {
            const episodeMap = document.getElementById('episode_map');
            if (episodeMap) {
                const scrollY = window.scrollY || document.documentElement.scrollTop;
                this.scrolledPastEpisodeMap = scrollY > episodeMap.offsetTop;
            }
        },
        seasonVotes(season) {
            let runningSum = 0;
            if (season && season.episodes) {
                season.episodes.forEach((episode) => {
                    runningSum += episode.tmdb_vote_count || 0;
                });
            }
            return isNaN(runningSum) ? '0' : runningSum;
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

                const refKey = `refSeason${seasonNumber}`
                // console.log(seasonNumber, refKey);

                // Close all other seasons
                this.closeAllSeasons(refKey);

                // Mark the season as opened to load to dom with v-if to start loading images
                if (!this.openedSeasons.includes(refKey)) {
                    this.openedSeasons.push(refKey);
                }
                
                // Set a minimal timeout so that the dom change registers before the height is calculated
                setTimeout(() => {
                    // Set height
                    const element = this.$refs[refKey]?.[0]; // Get the first element
                    if (!element) 
                        return resolve();   // Check if exists
                    element.style.transition = 'height 0s';
                    element.style.height = element.scrollHeight + "px"; // Expand

                    // Ensure the height change is finished before setting back
                    setTimeout(() => {
                        element.style.transition = '';
                        // Allow the router to finish it's thing
                        resolve();
                    }, 1)
                }, 1)
            });
        },
        imageUrl(width, backupUrl, titleId, seasonNumber, episodeNumber) {
            if (process.env.VUE_APP_STANDALONE_BUILD == 'true') {
                if (width == 600) width = 500;  // TMDB doesn't have a 600 so use 500 instead
                if (width == 900 && episodeNumber) width = 300;  // TMDB doesn't have a 900 for episodes so use the largest non-original 300 instead
                return `https://image.tmdb.org/t/p/w${width}${backupUrl}`;
            } else {
                if (!seasonNumber) {
                    return `${this.apiUrl}/image/${titleId}/poster.jpg?width=${width}`;
                } else if (!episodeNumber){
                    return `${this.apiUrl}/image/${titleId}/season${seasonNumber}/poster.jpg?width=${width}`;
                } else if (episodeNumber) {
                    return `${this.apiUrl}/image/${titleId}/season${seasonNumber}/episode${episodeNumber}.jpg?width=${width}`;
                } else {
                    return "";
                }
            }
        },
    },
    computed: {
        titleEpisodeCount() {
            let count = 0;
            this.titleInfo.seasons.forEach(season => {
                count += season.episode_count;
            });
            return count;
        },
        titleLastAirDate() {
            if (this.titleInfo && this.titleInfo.type == 'tv' && this.titleInfo.seasons?.length) {
                let lastSeason = this.titleInfo.seasons[this.titleInfo.seasons.length - 1];
                let lastAirDate = lastSeason?.episodes?.[lastSeason.episodes.length - 1]?.air_date || null;
                return lastAirDate;
            }
            return null;
        }
    },
    async beforeRouteUpdate(to) {
        if (to.hash) {
            await this.openCorrectSeason(to.hash);
        }
    },
    created () {
        this.isTouchDevice = 'ontouchstart' in document.documentElement;
    },
    async mounted() {
        await this.queryTitleData();

        // Generate individual data for each backdrop image dynamically
        if (this.titleInfo) {
            this.imageSlideshowData.individualData = Array.from({ length: this.titleInfo.backdrop_image_count }, (_, i) => ({
                number: i,
                isLoaded: false
            }));

            // Set the title to the titles name instead of "Title info"
            document.title = `Dashboard - ${this.titleInfo.name || 'Default Title'}`
        }

        // Run initially and add the event listener to update on darkmode change
        this.episodeMapTileBackgroundColors();
        window.addEventListener("darkModeChange", this.episodeMapTileBackgroundColors)
        
        // Add a scroll listener to show and hide the scroll back to episode map button
        window.addEventListener('scroll', this.checkScroll);

        // Scroll to the hash on the url if there is one.
        // Need to do this here instead of "beforeRouteEnter" because we need access to this and the titles info.
        // Need to also have a different method of getting the hash for standalone build
        const hash = process.env.VUE_APP_STANDALONE_BUILD == "true" ? "#" + window.location.hash.split("#")[2] : window.location.hash;
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
    },
    unmounted() {
        window.removeEventListener('darkModeChange', this.episodeMapTileBackgroundColors);
        window.removeEventListener('scroll', this.checkScroll);
    },
    watch: {
        backdropNumber() {
            this.backdropShow = false;
            setTimeout(() => (this.backdropShow = true), 300); // Short delay before reloading
        }
    }
};
</script>

  
<style scoped>
.title-info {
    --z-backdrop-dimension: -10;
    --z-backdrop-image-bg: 1;
    --z-backdrop-container: 2;
    --z-backdrop-image-main: 3;
    --z-backdrop-content-inside: 4;
    --z-backdrop-arrow-buttons: 5;
    --z-backdrop-indicator: 6;
    --z-title-poster: 10;
}

/* - - - - - BACKDROP AND VALUES ON TOP - - - - -  */
.backdrop-dimension {
    width: 100vw;
    max-width: min(100vw, 1200px);
    aspect-ratio: 16 / 9;
    /* max-height: 50vh; */
    margin-inline: auto;
    z-index: var(--z-backdrop-dimension);
}
.backdrop-container {
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    z-index: var(--z-backdrop-container);
}

/* BACKDROPS */
.backdrop-image-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    object-fit: cover;
}
.backdrop-image-container img.visible {
    opacity: 1;
}

.backdrop-image-container.main { 
    position: absolute;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    mask-image: linear-gradient(to top, transparent 0%, white 50%);
    z-index: var(--z-backdrop-image-main);
}
.backdrop-image-container.background { 
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    object-fit: cover; 
    
    width: 100vw;
    height: 675px;/* (1200px / 16 * 9) */
    z-index: var(--z-backdrop-image-bg);

    filter: blur(20px) opacity(0.5);
    --space-left: calc((100vw - 1200px) * 0.5);
    mask-image: 
    linear-gradient(to top, transparent 0%, white 50%),
        linear-gradient(to right, 
            white var(--space-left), 
            transparent var(--space-left), 
            transparent calc(100vw - var(--space-left) - 0.5px), 
            white calc(100vw - var(--space-left))
        );
    mask-composite: intersect;
}

@media (max-width: 1200px) {
    .backdrop-image-container.background { 
        display: none;
    }
}

/* INSIDE CONTENT */
.backdrop-container .content-inside {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: var(--z-backdrop-content-inside);
}

.content-inside .indicator {
    position: absolute;
    bottom: var(--spacing-sm);
    left: 50%;
    transform: translateX(-50%);
    z-index: var(--z-backdrop-indicator);
}

.backdrop-container .button-holder {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: var(--z-backdrop-arrow-buttons);
}
.backdrop-container .button-holder button {
    color: var(--color-text-white);
    margin: 0;
    padding: var(--spacing-xs);
    background-color: transparent;
    /* background-color: hsla(0, 0%, 0%, 0.2); */
    /* backdrop-filter: blur(6px); */
    border-radius: 50%;
    position: relative; 
    z-index: var(--z-backdrop-arrow-buttons);
    box-shadow: none;
    transition: transform 0.2s var(--cubic-bounce-soft-out);
}
.backdrop-container .button-holder button:hover {
    transform: scale(1.2);
}

.backdrop-container .button-holder button svg {
    border-radius: 50%;
    fill: var(--color-text-white);
    transition: transform 0.2s var(--cubic-bounce-soft-out);
}
.backdrop-container button.left svg {
    transform: rotate(90deg);
}
.backdrop-container button.right svg {
    transform: rotate(-90deg);
}
/* @media (max-width: 666px) {
    .backdrop-container .button-holder button svg {
        fill: transparent;
    }
    .backdrop-container .button-holder button {
        border-radius: 0;
        height: 100%;
        width: 30%;
    }
    .backdrop-container .button-holder  {
        height: 100%;
        width: 100%;
        top: 0;
    }
    .backdrop-container .button-holder button::after {
        background-color: transparent;
    }
    .backdrop-container .button-holder button:hover::after {
        background-color: transparent;
    }
} */

.poster-next-to-stuff .name-and-stuff {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    margin-top: var(--spacing-sm);
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
    /* display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden; */
}
.name-and-tagline .title-name .original-title {
    color: var(--color-text-lighter)
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
    margin-top: var(--spacing-lg);
}

.at-a-glance .seperator {
    background-color: var(--color-border);
    min-width: 2px;
    min-height: 2px;
    border-radius: 100px;
}

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
    font-size: var(--font-size-large);
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
}

.poster-next-to-stuff .poster-placholder {
    position: absolute;
    bottom: 0;
    z-index: var(--z-title-poster);
    background-color: var(--color-background-card);
    border-radius: var(--border-radius-medium);
    height: 316px;
    display: flex;
    /* Causes issues with gap. Don't use. */
    /* aspect-ratio: 2/3; */
}
.poster-next-to-stuff .poster-placholder img {
    border-radius: var(--border-radius-medium);
    height: 100%;
    aspect-ratio: 2/3;
}

.title-details .tags {
    gap: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* height: 32px; */
    /* margin:  0; */
    /* margin-top: var(--spacing-md); */
}
.title-details .tags .tag {
    font-weight: 500;
    background-color: var(--color-background-card);
    box-sizing: border-box;
}

.title-details .tags .tag.tag-upcoming {
    background-color: var(--color-button-general);
}

.control-button-array {
    border-radius: var(--border-radius-medium);
    box-sizing: border-box;
    box-shadow: var(--shadow-card);

    position: static;
    transform: none;
    width: 100%;
    border: none;
    padding: 0;
    margin: 0;
    box-shadow: none;
    background-color: initial;

}
.control-button-array button {
    white-space: nowrap;
    margin: 0;
    padding-inline: var(--spacing-md);
}

@media (min-width: 550px) {
    .control-button-array {
        gap: var(--spacing-sm);
    }
    .control-button-array button {
        padding-inline: var(--spacing-lg);
        border-radius: var(--border-radius-small) !important;
    }
}

.red-heart {
    color: var(--color-secondary);
}
.red-heart:hover {
    color: var(--color-secondary-hover);
}

.trailer-details-flex {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: var(--spacing-md);
}

.trailer-container {
    margin-left: auto;
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
.title-details a {
    color: var(--color-text);
    text-decoration: none;
}
.title-details a:hover {
    text-decoration: underline;
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

.title-details .update-title-button {
    margin: var(--spacing-md) 0;
}

.favourite.is-favourite {
    color: var(--color-secondary);
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
    border-bottom: 4px solid transparent; /* Watched - Green line */
    color: var(--color-text);
    text-decoration: none;
}
.episode-tile:hover {
    text-decoration: underline;
}

.episode-tile.watched {
    border: 0px solid transparent;
    border-bottom: 4px solid green; /* Watched - Green line */
}

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

/* - - - - - SEASON - - - - -  */
.season {
    position: relative;
    padding-bottom: 0;
}
/* Could have a transition here but honestly can't see it so not worth it */
.season.active {
    padding-bottom: var(--spacing-md);
}

.season .about {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-areas: 
    "img text"
    "button button";
    column-gap: var(--spacing-md);
    cursor: pointer;
}
.season h2 {
    margin: 0;
    max-width: calc(100% - 243px - 8px);
    display: -webkit-box;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.season .about .poster-container {
    display: flex;
    position: relative;
}
.season .about .poster {
    height: 250px;
    width: 166.666px;
    min-width: 166.666px;
    background-color: var(--color-background-card-section);
    border-radius: var(--border-radius-medium);
    grid-area: img;
}
.season .about p {
    margin-bottom: 0;
    margin-top: 10px;
    display: -webkit-box;
    line-clamp: 6;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.season .about .details {
    color: var(--color-text-light);
}
.season .details .single-line {
    column-gap: var(--spacing-xs);
}

.season .about .text {
    grid-area: text;
}


.season .about .modify-watched {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    margin: 0;
    width: auto;
}

@media (max-width: 750px) {
    .season .about .modify-watched {
        margin-top: var(--spacing-md);
        position: static;
        grid-area: button;
        width: 100%;
    }
    .season h2 {
        max-width: none;
    }

    .title-details .poster-next-to-stuff {
        gap: 0;
        grid-template-columns: auto;
    }
    .title-details .poster-next-to-stuff .poster-placholder {
        display: none;
    }

    .season .about .poster {
        height: 200px;
        width: 133.333px;
        min-width: 133.333px;
        background-color: var(--color-background-card-section);
        border-radius: var(--border-radius-medium);
        grid-area: img;
    }
    .season .about p {
        line-clamp: 4;
        -webkit-line-clamp: 4;
    }
}
@media (max-width: 550px) {
    .season .about p {
        line-clamp: 3;
        -webkit-line-clamp: 3;
    }
    .season .details .single-line {
        flex-direction: column;
        align-items: start;
    }
    .season .details .single-line .bullet {
        display: none;
    }
}


.season .episodes {
    box-sizing: border-box;
    height: 0px;
    overflow: hidden;
    transition: height 0.5s var(--cubic-ease-slow-in-slow-out),
                margin-top 0.5s var(--cubic-ease-slow-in-slow-out);
    margin-top: var(--spacing-md);
}
.season .episodes-padding {
    --episode-gap-line-height: 3px;
    display: flex;
    flex-direction: column;
    gap: var(--episode-gap-line-height);
    border-radius: var(--border-radius-medium);    
    background-color: var(--color-background-card-section);
    padding: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
}


/* - - - - - EPISODE - - - - -  */
.episode {
    position: relative;
    background-color: var(--color-background-card-section);
    padding: var(--spacing-md);
    margin: 0;
    display: flex;
    flex-direction: row;
    gap: var(--spacing-md);
    /* border-radius: var(--border-radius-medium); */
    transition: background-color 0.1s ease-out;
}
.episode::after {
    content: "";
    width: calc(100% - var(--spacing-lg));
    height: var(--episode-gap-line-height);
    position: absolute;
    bottom: calc(var(--episode-gap-line-height) * -1);
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-border);
    border-radius: var(--episode-gap-line-height);
    z-index: 2;
}
.episode.last::after {
    display: none;
}
/* .episode.not-realeased {
    filter: opacity(0.5);
    pointer-events: none;
    user-select: none;
} */


.episode h3 {
    margin: 0;
    display: -webkit-box;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-width: calc(100% - 160px);
}

.episode .still-container {
    display: flex;
    width: 300px;
    min-width: 300px;
    border-radius: var(--border-radius-medium);
    height: fit-content;
    aspect-ratio: 16/9;
    background-color: var(--color-background-card);
    position: relative;
}

.episode .still-container .still {
    width: inherit;
    aspect-ratio: inherit;
    border-radius: inherit;
    object-fit: contain;
}
.episode .still-container .still.failed-to-load {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--color-text-hidden);
    font-weight: 700;
    font-size: 32px;
}

.tag-holder {
    position: absolute;
    width: calc(100% - var(--spacing-sm) * 2);
    height: calc(100% - var(--spacing-sm) * 2);
    top: var(--spacing-sm);
    left: var(--spacing-sm);
    display: inline;
    pointer-events: none;
}


.episode .text {
    /* padding-top: var(--spacing-sm); */
    width: 100%;
}
.episode .details {
    color: var(--color-text-light);
}
.episode p {
    margin-bottom: 0;
    margin-top: 4px;
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.episode .modify-watched {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    margin: 0;
    width: auto;
}
@media (max-width: 850px) {
    .episode .modify-watched {
        margin-top: var(--spacing-sm);
        position: static;
        width: 100%;
    }
    .episode h3 {
        max-width: none;
    }
    .episode {
        flex-direction: column;
    }
    .episode .still-container {
        width: 100%;
        min-width: none;
        max-height: 220px;
    }
}


.choice-modal .choice-buttons {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: var(--spacing-sm);
}
.choice-modal .choice-buttons button {
    margin: 0;
}

.choice-modal .text-hidden {
    margin-bottom: 0;
}
</style>
  