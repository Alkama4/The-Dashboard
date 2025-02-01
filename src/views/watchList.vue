<template>
<div>
    <div class="content-width-small">
        <h1>Watch list</h1>
        <p>Template placeholder text that will be replaced at some point and so on. Try not to read or even notice this text if possible. This doesn't make any sense since I will probably remove this whole portion in the final form.</p>
    </div>

    <router-link to="/watchList/addTitle">
        <button class="color-primary sticky-corner-button"> 
            <IconAdd size="28px"/> 
        </button>
    </router-link>

    <div v-for="(movieList, index) in movieLists" :key="index" class="content-width-medium">
        <h2>{{ movieList.listName }}</h2>
        
        <!-- loop="true"  -->
        <swiper-container 
            space-between="10" 
            keyboard="true" 
            slidesPerView="auto" 
            class="slide-container"
            slidesOffsetBefore="32"
        >
            <swiper-slide 
                v-for="movie in movieList.movies" 
                :key="movie.id" 
                class="slide"
                @click="openDetailsPageFor(movie.name)"
            >
                <img :src="movie.thumbnail" class="thumbnail">
                <div class="gradient"></div>
                <div class="details">
                    <span class="movie-name">{{ movie.name }}</span>
                    
                    <div class="progress-details" :class="{'completed': movie.progress == 1}">
                        <!-- If the movie has been watched -->
                        <span v-if="movie.progress == 1">
                            Watched
                        </span>
                        <!-- Else show the type specific values -->
                        <span v-else>
                            <template v-if="movie.type === 'tv'">
                                Episode {{ movie.currentEpisode }}/{{ movie.lastEpisodeOfSeason }}, Season {{ movie.currentSeason }}
                            </template>
                            <template v-else>
                                {{ movie.remaining }}
                                <span v-if="movie.progress > 0.01 && movie.progress < 0.95">Remaining</span> 
                            </template>
                        </span>
                    </div>
                    
                    <div class="movie-rating"><IconIMDB/>{{ movie.rating }}</div>
                </div>
                <div class="progress-bar" :style="{ width: movie.progress * 100 + '%', '--progress-width': movie.progress * 100 + '%' }"></div>

            </swiper-slide>
        </swiper-container>
    </div>
</div>
</template>
  
<script>
import IconAdd from '@/components/icons/IconAdd.vue';
import IconIMDB from '@/components/icons/IconIMDB.vue';
import { register } from 'swiper/element/bundle';
import router from '@/router';
register();

// Improper import. Check how it should actually be imported. Work just fine though, but it throws a warning. Could fix the space after bug...

export default {
    name: 'HomePage',
    components: {
        IconIMDB,
        IconAdd,
    },  
    data() {
        return {
            movieLists: [
                {
                    listName: "Recommended Movies",
                    movies: [
                        { 
                            id: 1, 
                            type: "movie",
                            name: "Megamind", 
                            progress: 1, 
                            remaining: "1h 59min",
                            rating: 4.9,
                            thumbnail: "http://pibox.lan:800/getImage/",
                        },
                        { 
                            id: 2, 
                            type: "movie",
                            name: "John Wick 3", 
                            remaining: "2h 12min",
                            progress: 0.63, 
                            rating: 7.7,
                            thumbnail: "http://pibox.lan:800/getImage/"
                        },
                        { 
                            id: 3, 
                            type: "movie",
                            name: "Avatar - The Way of Water", 
                            progress: 0.75, 
                            remaining: "3h 36min",
                            rating: 8.9,
                            thumbnail: "http://pibox.lan:800/getImage/"
                        },
                        { 
                            id: 3, 
                            type: "movie",
                            name: "Avatar - The Way of Water", 
                            progress: 0.75, 
                            remaining: "3h 36min",
                            rating: 8.9,
                            thumbnail: "http://pibox.lan:800/getImage/"
                        },
                        { 
                            id: 3, 
                            type: "movie",
                            name: "Avatar - The Way of Water", 
                            progress: 0.75, 
                            remaining: "3h 36min",
                            rating: 8.9,
                            thumbnail: "http://pibox.lan:800/getImage/"
                        },
                        { 
                            id: 3, 
                            type: "movie",
                            name: "Avatar - The Way of Water", 
                            progress: 0.75, 
                            remaining: "3h 36min",
                            rating: 8.9,
                            thumbnail: "http://pibox.lan:800/getImage/"
                        },
                        { 
                            id: 4, 
                            type: "movie",
                            name: "Johnny English", 
                            progress: 0, 
                            remaining: "2h 23min",
                            rating: 8.4,
                            thumbnail: "http://pibox.lan:800/getImage/"
                        }
                    ]
                },
                {
                    listName: "Recommended TV Series",
                    movies: [
                        { 
                            id: 5, 
                            type: "tv",
                            name: "One Punch Man", 
                            currentSeason: 4,
                            currentEpisode: 12,
                            lastEpisodeOfSeason: 12,
                            progress: 1,
                            rating: 8.2,
                            thumbnail: "http://pibox.lan:800/getImage/"
                        },
                        { 
                            id: 6, 
                            type: "tv",
                            name: "Mob Psycho 100", 
                            currentSeason: 2,
                            currentEpisode: 6,
                            lastEpisodeOfSeason: 12,
                            progress: 0.5,
                            rating: 6.8,
                            thumbnail: "http://pibox.lan:800/getImage/"
                        },
                        { 
                            id: 7, 
                            type: "tv",
                            name: "Avatar The Last Airbender", 
                            currentSeason: 3,
                            currentEpisode: 10,
                            lastEpisodeOfSeason: 12,
                            progress: 0.83,
                            rating: 6.4,
                            thumbnail: "http://pibox.lan:800/getImage/"
                        },
                        { 
                            id: 8, 
                            type: "tv",
                            name: "Severance", 
                            currentSeason: 1,
                            currentEpisode: 5,
                            lastEpisodeOfSeason: 10,
                            progress: 0.50,
                            rating: 7.5,
                            thumbnail: "http://pibox.lan:800/getImage/"
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        openDetailsPageFor(movieName) {
            console.log(movieName);
            router.push(`/watchList/titleDetails/${movieName}`);
        }
    }
};
</script>


<style scoped>
.slide-container {
    mask-image: 
        linear-gradient(to right, transparent 0%, white var(--spacing-lg), white calc(100% - var(--spacing-lg)), transparent 100%);
    mask-size: 100%;
}

.slide {
    background-color: var(--color-background-card);
    border-radius: var(--border-radius-medium);
    height: 330px;
    width: 220px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
}

.slide .thumbnail {
    background-color: var(--color-background-card-section);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    z-index: -10;
}

.slide .gradient {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(-10deg, black, transparent 60%);
    z-index: -5;
}

.slide .details {
    position: absolute;
    bottom: var(--spacing-sm);
    right: var(--spacing-sm);
    padding: var(--spacing-xs);
    border-radius: var(--border-radius-small);
    
    text-align: end;
    font-weight: 500;
    color: var(--color-text-light);
    font-size: var(--font-size-small);
}

.slide .movie-name {
    text-align: right;
    color: var(--color-text);
    font-weight: 700;
    font-size: var(--font-size-large);
}

.slide .completed {
    color: var(--color-positive);
}

.slide .movie-rating {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    gap: var(--spacing-xs);
}

.slide .progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: var(--spacing-xs);
    background-color: var(--color-primary);
    animation: progressAnimation 1s ease;
}

@keyframes progressAnimation {
    from {
        width: 0%;
    }
    to {
        width: var(--progress-width); /* Variable set dynamically from movie progress */
    }
}
</style>
