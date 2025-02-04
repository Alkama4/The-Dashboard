<template>
    <div class="content-width-small title-info">
        <img :src="'https://image.tmdb.org/t/p/original' + titleInfo[11]" alt=" " />
        <h1>
            <template v-if="titleInfo[4] == titleInfo[5]">
                {{ titleInfo[4] }}
            </template>
            <template v-else>
                {{ titleInfo[4] }} 
                <span class="original-title">
                    ({{ titleInfo[5] }})
                </span>
            </template>
        </h1>
        <q class="catchphrase">{{ titleInfo[6] }}</q>

        <h2>Details</h2>
        <div class="details">
            <div class="rating"><IconIMDB/>{{ titleInfo[7] }} - {{ titleInfo[8] }} votes</div>
            <div>Release date - {{ new Date(titleInfo[13]).toLocaleDateString("fi-FI") }}</div>
            <div>Data last updated - {{ new Date(titleInfo[14]).toLocaleDateString("fi-FI") }}</div>
        </div>
        
        <h2>Links</h2>
        <div class="flex">
            <ul>
                <li><a :href="`https://www.imdb.com/title/${this.titleInfo[2]}`">IMDB page</a></li>
                <li><a :href="`https://www.themoviedb.org/${this.titleInfo[3]}/${this.titleInfo[1]}`">TMDB page</a></li>
            </ul>
        </div>

        <h2>Times watched</h2>
        <div class="times-watched">
            <button>+</button>
            <span>{{ titleInfo[15] }}</span>
            <button>-</button>
        </div>

        <h2>Description</h2>
        <p>{{ titleInfo[9] }}</p>
    </div>
</template>

  
<script>
import IconIMDB from '@/components/icons/IconIMDB.vue';
import api from '@/utils/dataQuery';

export default {
    data() {
        return {
            titleID: this.$route.params.titleID,
            titleInfo: [],
        };
    },
    components: {
        IconIMDB,
    },
    async mounted() {
        // Query the details from api for the title here:
        const response = await api.getTitleInfo(this.titleID);
        if (response && response.title_info) {
            console.log(response.title_info);
            this.titleInfo = response.title_info[0];
        }
    }
};
</script>

  
<style scoped>

.title-info {
    --text-offset: 60px;
    --text-original: 750px;
    margin-top: calc( min( 100vw * 0.5625 - var(--text-offset), var(--text-original)));
}

.title-info img {
    z-index: -10;
    position: absolute;
    max-height: calc(var(--text-original) + var(--text-offset));
    width: auto; /* Prevent stretching */
    left: 50%; /* Center horizontally */
    top: 60px;
    transform: translateX(-50%); /* Ensure perfect centering */
    mask-image: linear-gradient(to top, transparent 0%, white 50%);
    mask-size: 100%;
    object-fit: contain; /* Ensure it scales properly without distortion */
}

.title-info h1 {
    /* font-size: 48px; */
    margin-bottom: 0;
}
.title-info .original-title {
    color: var(--color-text-lighter)
}

.title-info h2 {
    /* font-size: 48px; */
    margin-top: var(--spacing-lg);
    margin-bottom: 0;
}

.title-info .catchphrase {
    color: var(--color-text-light);
}

.title-info .rating {
    display: flex;
    gap: var(--spacing-xs);
}

.title-info ul {
    list-style: "- ";
    margin: var(--spacing-sm);
}

.title-info .times-watched {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    width: fit-content;
}
.title-info .times-watched button {
    margin: 0;
    /* padding: var(--spacing-xs) var(--spacing-md); */
}
</style>
  