<template>
    <div v-if="title_info" class="title-info">
        <BackdropSlideShow :imageLinks="backdropUrls"/>

        <div class="content-width-medium title-details">
            <div class="poster-next-to-stuff">
                <div class="poster-holder">
                    <div v-if="!standAloneBuild" class="poster-placholder" @click="handleWatchTitleNow()">
                        <img 
                            :src="imageUrl(300, title_info.backup_poster_url, title_info.title_id)" 
                            @load="(event) => event.target.classList.add('loaded')"
                        >
                        <IconPlay class="icon-watch-now" size="64px"/>
                    </div>
                    <div to="#watch-now" v-else class="poster-placholder" @click="handleWatchTitleNow()">
                        <img 
                            :src="imageUrl(300, title_info.backup_poster_url, title_info.title_id)" 
                            @load="(event) => event.target.classList.add('loaded')"
                        >
                        <IconPlay class="icon-watch-now" size="64px"/>
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

                    <div class="tags">
                        <div class="tag tag-warning" v-if="!title_info.in_watch_list">
                            Not in watchlist
                        </div>
                        <div class="tag tag-positive" v-if="title_info.watch_count >= 1">
                            Watched
                        </div>
                        <div class="tag tag-primary" v-if="new Date(title_info.release_date) < new Date() && new Date(title_info.release_date) > new Date(new Date() - 30 * 24 * 60 * 60 * 1000)">
                            New release
                        </div>
                        <div class="tag tag-upcoming" v-if="new Date(title_info.release_date) > new Date()">
                            Upcoming
                        </div>
                        <div class="tag tag-secondary" v-if="title_info.favourite == 1">
                            Favourite
                        </div>
                        <div class="tag">
                            {{ title_info.type == 'tv' ? 'TV-show' : 'Movie' }}
                        </div>
                        <div class="tag tag-editable" v-for="collection in title_info.collections" :key="collection.collection_id" @click="handleEditCollection(collection)">{{ collection.name }}</div>
                    </div>

                </div>
            </div>

            <div class="control-button-array combined-buttons">
                <button 
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
                </button>

                <!-- Collections -->
                <button
                    class="button-primary middle-button flex-1" 
                    @click="promptTitleCollections()"
                >
                    <IconCollection/>
                </button>

                <!-- Watch list buttons -->
                <button 
                    v-if="!title_info.in_watch_list"
                    class="button-primary right-button flex-1" 
                    @click="handleWatchListModification('add')"
                >
                    <IconListAdd/>
                </button>
                <button 
                    v-else
                    class="right-button flex-1"
                    @click="handleWatchListModification('remove')" 
                >
                    <IconListRemove/>
                </button>
            </div>

            <div class="at-a-glance">

                <div class="ratings">
                    <div class="short-value">
                        <span class="value icon-align">
                            <IconIMDBColorful size="40px" class="imdb-icon"/>
                            {{ title_info?.imdb_vote_average ?? '-' }} 
                        </span>
                        <span class="text-lighter">
                            {{ title_info?.imdb_vote_count?.toLocaleString("fi-FI") ?? '0' }} votes
                        </span>
                    </div>
                    <div class="short-value">
                        <span class="value icon-align">
                            <IconTMDBColorful size="40px" class="tmdb-icon"/>
                            {{ title_info?.tmdb_vote_average ?? '-' }} 
                        </span>
                        <span class="text-lighter">
                            {{ title_info?.tmdb_vote_count?.toLocaleString("fi-FI") ?? '0' }} votes
                        </span>
                    </div>
        
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
                        class="value no-decoration">{{ title_info.awards ?? '-' }}
                    </a>
                    <span class="text-lighter">Awards & Nominations</span>
                </div>
            </div>

            <h3>Watch count</h3>
            <NumericStepper 
                :displayValue="title_info.type === 'movie' 
                    ? title_info.watch_count 
                    : title_info.seasons.reduce((min, season) => 
                        season.episodes.reduce((minEp, ep) => Math.min(minEp, ep.watch_count), min), Infinity)"
                @valueUpdated="val => handleTitleWatchClick('title', val, null)"
            />

            <h3>Overview</h3>
            <p style="margin: 0;">{{ title_info.overview }}</p>
            
            <div class="trailer-details-flex">
                <div class="details-container">
                    <h3 class="icon-align">
                        Title details
                        <IconRefresh
                            size="28px"
                            left="6px"
                            @click="openTitleUpdateModal()"
                            :class="{
                                'loading': waitingForResult.includes('titleUpdate0') || waitingForResult.includes('allUpdate0'),
                                'spin-refresh-icon': waitingForResult.includes('titleUpdate0') || waitingForResult.includes('allUpdate0')
                            }"
                            class="icon-button"
                        />
                    </h3>

                    <div class="details-grid">
                        <div>
                            Genres
                        </div>
                        <div class="value">
                            {{ title_info.genres.join(", ") }}
                        </div>

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
                            {{ title_info.imdb_id }}
                            <a 
                                class="flex"
                                :href="`https://www.imdb.com/title/${this.title_info.imdb_id}`"
                                target="_blank" 
                                rel="noopener noreferrer" 
                            >
                                <IconLinkExternal size="20px"/>
                            </a>
                        </div>

                        <div>TMDB id</div>
                        <div class="value">
                            {{ title_info.tmdb_id }}
                            <a 
                                class="flex"
                                :href="`https://www.themoviedb.org/${this.title_info.type}/${this.title_info.tmdb_id}`" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                            >
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
                            watched: episode.watch_count > 0,
                            'un-released': new Date(episode.air_date) > new Date()
                        }"
                        :style="{'background-color': episode.tileColor || 'var(--color-background-card)'}"
                        :title="`S${season.season_number} E${episode.episode_number}`"
                        :to="`/watch_list/title/${title_info.title_id}#S${season.season_number}E${episode.episode_number}`"
                    >
                        {{ new Date(episode.air_date) > new Date() ? '-' : episode.tmdb_vote_average }}
                    </router-link>
                </div>
            </div>
        </div>

        <div class="content-width-large" v-if="title_info.seasons">
            <h2>Season & episode details</h2>

            <div v-for="season in title_info.seasons" 
                :key="season.season_id" 
                class="card season" 
                :class="{'active': expandedSeason == season.season_id}"
            >
                <div class="about" @click="toggleHeight(`refSeason${season.season_number}`)">
                    <div class="poster-container">
                        <img 
                            class="poster" 
                            :src="imageUrl(300, season.backup_poster_url, title_info.title_id, season.season_number)" 
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
                                    'loading': waitingForResult.includes('seasonUpdate' + season.season_number),
                                    'spin-refresh-icon': waitingForResult.includes('seasonUpdate' + season.season_number)
                                }"
                                class="icon-button"
                            />
                        </h2>
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

                    <NumericStepper 
                        class="modify-watched"
                        :displayValue="season.episodes.reduce((min, ep) => Math.min(min, ep.watch_count), Infinity)"
                        @valueUpdated="val => handleTitleWatchClick('season', val, season.season_id)"
                    />
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
                            <div class="still-container" @click="handleWatchEpisodeNow(episode)">
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
                                    :src="imageUrl(900, episode.backup_still_url, title_info.title_id, season.season_number, episode.episode_number)"
                                    @error="failedToLoadImages.push(episode.episode_id)"
                                    @load="(event) => event.target.classList.add('loaded')"
                                >
                                <!-- Tag to show if newly released or watched, or maybe even un released status -->
                                <div class="tag-holder">
                                    <div class="tag tag-positive" v-if="episode.watch_count >= 1">
                                        Watched
                                    </div>
                                    <div class="tag tag-primary" v-else-if="new Date(episode.air_date) < new Date() && new Date(episode.air_date) > new Date(new Date() - 14 * 24 * 60 * 60 * 1000)">
                                        New episode
                                    </div>
                                    <div class="tag" v-else-if="new Date(episode.air_date) > new Date()">
                                        Upcoming
                                    </div>
                                </div>

                                <IconPlay class="icon-watch-now" size="64px"/>
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

                                <NumericStepper 
                                    class="modify-watched"
                                    :displayValue="episode.watch_count"
                                    @valueUpdated="val => handleTitleWatchClick('episode', val, episode.episode_id)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

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
                <div v-if="title_info.type == 'tv'">
                    <h3>Title & Seasons <InfoTooltip text="Doesn't include the episodes." position="broken"/></h3>
                    <div class="choice-buttons">
                        <button @click="handleTitleUpdate('title', 'info')" class="button-primary">Info</button>
                        <button @click="handleTitleUpdate('title', 'images')">Images</button>
                        <button @click="handleTitleUpdate('title', 'full')">Full Update</button>
                    </div>
                    <h3>Title, Seasons & Episodes <InfoTooltip text="Includes the whole thing." position="center"/></h3>
                    <div class="choice-buttons">
                        <button @click="handleTitleUpdate('all', 'info')" class="button-primary">Info</button>
                        <button @click="handleTitleUpdate('all', 'images')">Images</button>
                        <button @click="handleTitleUpdate('all', 'full')">Full Update</button>
                    </div>
                    <p class="text-hidden icon-align">
                        Tip: For episodes you should use the seperate season specific menu.
                    </p>
                </div>
                <div v-else>
                    <h3></h3>
                    <div class="choice-buttons">
                        <button @click="handleTitleUpdate('title', 'info')" class="button-primary">Title Info</button>
                        <button @click="handleTitleUpdate('title', 'images')">Title Images</button>
                        <button @click="handleTitleUpdate('title', 'full')">Full Update</button>
                    </div>
                </div>
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
                <h3>Season Episodes</h3>
                <div class="choice-buttons">
                    <button @click="handleTitleUpdate('season', 'info')" class="button-primary">Info</button>
                    <button @click="handleTitleUpdate('season', 'images')">Images</button>
                    <button @click="handleTitleUpdate('season', 'full')">Full Update</button>
                </div>
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
            <WatchNowRecursive :data="watchNowLinksForModal" class="content-width-medium"/>
        </ModalGeneric>

        <ModalGeneric ref="watchEpisodeNowMG" header="Watch Episode">
            <WatchNowRecursive :data="watchNowLinksForModal" class="content-width-medium"/>
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
// Basic
import fastApi from '@/utils/fastApi';
import router from '@/router';
import { notify } from '@/utils/notification';
import InfoTooltip from '@/components/InfoTooltip.vue';
import { interpolateBetweenColors, getCssVar, convert } from '@/utils/utils'
import notFoundPage from '@/views/404Page.vue';
import { apiUrl, standAloneBuild } from '@/utils/config';
import WatchNowRecursive from '@/components/WatchNowRecursive.vue';

// Icons
import IconTMDB from '@/components/icons/IconTMDB.vue';
import IconJustwatch from '@/components/icons/IconJustwatchColorful.vue';
import IconTMDBColorful from '@/components/icons/IconTMDBColorful.vue';
import IconIMDBColorful from '@/components/icons/IconIMDBColorful.vue';
import IconChevronDown from '@/components/icons/IconChevronDown.vue';
import IconListRemove from '@/components/icons/IconListRemove.vue';
import IconListAdd from '@/components/icons/IconListAdd.vue';
import IconFileImage from '@/components/icons/IconFileImage.vue';
import IconHeart from '@/components/icons/IconHeart.vue';
import IconLinkExternal from '@/components/icons/IconLinkExternal.vue';
import IconRefresh from '@/components/icons/IconRefresh.vue';
import ModalConfirmation from '@/components/ModalConfirmation.vue';
import ModalGeneric from '@/components/ModalGeneric.vue';
import IconLoading from '@/components/icons/IconLoading.vue';
import ModalCollection from '@/components/ModalCollection.vue';
import IconPlay from '@/components/icons/IconPlay.vue';
import IconFilm from '@/components/icons/IconFilm.vue'; 
import IconCollection from '@/components/icons/IconCollection.vue';
import ModalTitleCollections from '@/components/ModalTitleCollections.vue';
import NumericStepper from '@/components/NumericStepper.vue';
import CustomSelect from '@/components/CustomSelect.vue';
import CustomGenericInput from '@/components/CustomGenericInput.vue';
import BackdropSlideShow from '@/components/BackdropSlideShow.vue';
// import IconHome from '@/components/icons/IconHome.vue';

export default {
    data() {
        return {
            standAloneBuild: standAloneBuild,
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
            scrolledPastEpisodeMap: false,
            selectedSeasonToUpdate: null,
            trailerIndex: 0,
        };
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
        IconLoading,
        IconPlay,
        IconFilm,
        IconCollection,
        // IconHome,
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
                console.log(response);
                notify(response.message, "success");
                this.$refs.titleNotesInput.markValid();
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
        async handleTitleUpdate(type, action) {
            const updatingNumber = this.selectedSeasonToUpdate;
            const isAll = type === "all";
            const isSeason = type === "season";
            const isTitle = type === "title";

            console.log(`${type}Update${updatingNumber}`)
            this.waitingForResult.push(`${type}Update${updatingNumber}`);

            if (isSeason) {
                this.$refs.refreshSeasonDataGM.close();
            } else {
                this.$refs.refreshTitleDataGM.close();
            }

            let response = null;
            let updateMessage = `"${this.title_info.name}" info updated!`;

            switch (action) {
                case "info":
                    response = await fastApi.watch_list.titles.update(this.title_info.title_id, this.title_info.type, { 
                        update_title_info: isTitle || isAll, 
                        update_season_info: isSeason || isAll, 
                        season_number: updatingNumber 
                    });
                    updateMessage = updatingNumber != 0
                        ? `Season ${updatingNumber} info for "${this.title_info.name}" has been updated. Missing images might still be loading in the background.`
                        : `"${this.title_info.name}" title information has been updated. Missing images might still be loading in the background.`;
                    break;

                case "images":
                    response = await fastApi.watch_list.titles.update(this.title_info.title_id, this.title_info.type, { 
                        update_title_images: isTitle || isAll, 
                        update_season_images: isSeason || isAll, 
                        season_number: updatingNumber 
                    });
                    updateMessage = updatingNumber != 0
                        ? `Season ${updatingNumber} images for "${this.title_info.name}" are now updating in the background.`
                        : `"${this.title_info.name}" title images are now updating in the background.`;
                    break;

                case "full":
                    response = await fastApi.watch_list.titles.update(this.title_info.title_id, this.title_info.type, { 
                        update_title_info: isTitle || isAll, 
                        update_title_images: isTitle || isAll, 
                        update_season_info: isSeason || isAll, 
                        update_season_images: isSeason || isAll, 
                        season_number: updatingNumber 
                    });
                    updateMessage = updatingNumber != 0
                        ? `Season ${updatingNumber} full update for "${this.title_info.name}" is now in progress.`
                        : `All the data for "${this.title_info.name}" has been replaced. Images are also now updating in the background.`;
                    break;
            }

            if (response) {
                notify(updateMessage, "success");
                await this.queryTitleData();
                this.episodeMapTileBackgroundColors();
            }

            this.removeItemFromWaitingArray(`${type}Update${updatingNumber}`);
        },
        async handleFavouriteToggle() {
            this.waitingForResult.push("favourite");
            const response = await fastApi.watch_list.titles.favourite(this.title_info.title_id)
            if (response) {
                console.debug(response);
                this.title_info.favourite = !this.title_info.favourite;
                this.title_info.in_watch_list = 1;
            }
            this.removeItemFromWaitingArray("favourite");
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
            this.removeItemFromWaitingArray("titleWatched");
        },
        removeItemFromWaitingArray(item) {
            this.waitingForResult = this.waitingForResult.filter(i => i !== item);
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
            this.removeItemFromWaitingArray("title_info");
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
                const ratingColor = getCssVar("color-primary");

                this.title_info.seasons.forEach(season => {
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
        async handleEditCollection(initialCollection) {
            const editedCollection = await this.$refs.editCollectionFC.prompt(
                initialCollection.name, 
                initialCollection.description, 
                initialCollection.collection_id
            );
            
            // If the process was cancelled - which returns false - return
            if (!editedCollection) return;

            const response = await fastApi.watch_list.collections.edit(
                initialCollection.collection_id, 
                editedCollection.name, 
                editedCollection.description
            );

            if (response) {
                notify(response.message, 'success');

                const index = this.title_info.collections.findIndex(c => c.collection_id === initialCollection.collection_id);
                if (index !== -1) {
                    this.title_info.collections[index] = {
                        ...this.title_info.collections[index],
                        name: editedCollection.name,
                        description: editedCollection.description
                    };
                }

                this.$refs.editCollectionFC.close()
            }
        },
        handleWatchNow(additionalLinks = {}) {
            // Basic automated aggregator links
            const baseLinks = {
                "Link aggregators": {
                    tmdb: {
                        name: "The Movie Database",
                        details: "Watch options on TMDB.",
                        link: `https://www.themoviedb.org/${this.title_info.type}/${this.title_info.tmdb_id}/watch`,
                        icon: IconTMDBColorful
                    },
                    justwatch: {
                        name: "JustWatch",
                        details: "Search for this title on JustWatch.",
                        link: `https://www.justwatch.com/fi/search?q=${encodeURIComponent(this.title_info.name)}`,
                        icon: IconJustwatch
                    }
                }
            };

            // If it's a stand-alone build, return base links only
            if (standAloneBuild) {
                this.watchNowLinksForModal = {
                    ...baseLinks
                };
                return;
            }

            // Include additional watch now links from the episode or title
            const fullLinks = {
                ...baseLinks,
                ...additionalLinks
            };

            this.watchNowLinksForModal = fullLinks;
        },
        handleWatchEpisodeNow(episode) {
            if (!episode.watch_now_links) this.handleWatchNow();
            else this.handleWatchNow(episode?.watch_now_links[0]);
            this.$refs.watchEpisodeNowMG.open();
        },
        handleWatchTitleNow() {
            this.handleWatchNow(this.title_info.watch_now_links);
            this.$refs.watchTitleNowMG.open();
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

            return Array.from({ length: this.title_info.backdrop_image_count }, (_, i) => {
                let suffix = this.isTouchDevice ? '?width=1200' : '';
                return `${this.apiUrl}/media/image/title/${this.title_info.title_id}/backdrop${i + 1}.jpg${suffix}`;
            });
        }

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
    },
    unmounted() {
        window.removeEventListener('darkModeChange', this.episodeMapTileBackgroundColors);
        window.removeEventListener('scroll', this.checkScroll);
    },

};
</script>

  
<style scoped>
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
    mask-image: 
    linear-gradient(to top, transparent 0%, white 50%);
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
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    /* transform: translateX(-50%) translateY(-50%); */
    z-index: var(--z-backdrop-arrow-buttons);
}
.backdrop-container .button-holder button {
    color: var(--color-text-white);
    padding: 0;
    margin: 0;
    width: 20%;
    height: 100%;
    background-color: transparent;
    border-radius: 0;
    position: relative; 
    z-index: var(--z-backdrop-arrow-buttons);
    box-shadow: none;
    transition: transform 0.2s var(--cubic-bounce-soft-out);
}
.backdrop-container .button-holder button .hover-gradient {
    background-color: rgba(0, 0, 0, 0);
    mask-composite: intersect;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: background-color 0.2s ease-out;
}
.backdrop-container .button-holder button.left .hover-gradient {
    mask-image: linear-gradient(to left, transparent 0%, rgba(255, 255, 255, 0.45) 100%);
}
.backdrop-container .button-holder button.right .hover-gradient {
    mask-image: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.45) 100%);
}
.backdrop-container .button-holder button:hover .hover-gradient {
    background-color: var(--color-background);
}

/* .backdrop-container .button-holder button::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80px;
    height: 80px;
    transform: translateX(-50%) translateY(-50%);
    background-color: rgba(0, 0, 0, 0.35);
    border-radius: 50%;
    filter: blur(16px);
    z-index: -1;
} */

.backdrop-container .button-holder button.right:hover svg {
    transform: scale(1.25) rotate(-90deg);
}
.backdrop-container .button-holder button.left:hover svg {
    transform: scale(1.25) rotate(90deg);
}

.backdrop-container .button-holder button svg {
    border-radius: 50%;
    fill: var(--color-text);
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
    margin-top: var(--spacing-lg);
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
    cursor: pointer;
    /* Causes issues with gap. Don't use. */
    aspect-ratio: 2/3;
}
.poster-next-to-stuff .poster-placholder img {
    border-radius: var(--border-radius-medium);
    /* max-width: 100%; */
    width: 100%;
    aspect-ratio: 2/3;
    transition: filter 0.1s ease-out;
}
.poster-next-to-stuff .poster-placholder:hover img {
    filter: brightness(0.5);
}
.icon-watch-now {
    color: var(--color-text-white-hover);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.1s ease-out !important;
    opacity: 0;
}
.poster-next-to-stuff .poster-placholder:hover .icon-watch-now {
    opacity: 1;
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
    margin: var(--spacing-md) 0;
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
.title-details .save-notes-button {
    margin-top: var(--spacing-md);
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

    /* .title-details .poster-next-to-stuff {
        gap: 0;
        grid-template-columns: auto;
    }
    .title-details .poster-next-to-stuff .poster-placholder {
        display: none;
    } */

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
    cursor: pointer;
}

.episode .still-container .still {
    width: inherit;
    aspect-ratio: inherit;
    border-radius: inherit;
    object-fit: contain;
    transition: filter 0.1s ease-out;
    filter: brightness(1);
}
.episode .still-container:hover .still {
    filter: brightness(0.5);
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

.episode .still-container:hover .icon-watch-now {
    opacity: 1;
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
  