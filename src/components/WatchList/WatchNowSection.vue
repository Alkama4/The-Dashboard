<template>
    <div v-if="titleMedia?.movies?.length > 0">
        <h3>Watch now</h3>
        <div class="side-by-side card">
            <div class="chosen-media">
                <div v-if="activeDetails" class="active-details">
                    <h3>{{ activeDetails?.parsed_file_name }}</h3>
                    <div class="details">
                        <div :class="{'tag tag-primary': activeDetails?.hdr_type}">
                            {{ activeDetails?.hdr_type ?? 'SDR'}}
                        </div>
                        &ZeroWidthSpace; &bull; &ZeroWidthSpace;
                        <div>{{ calculateResolution(activeDetails) }}</div>
                        &ZeroWidthSpace; &bull; &ZeroWidthSpace;
                        <div>{{ convertToBytes(activeDetails?.file_size ?? 0) }}</div>
                        &ZeroWidthSpace; &bull; &ZeroWidthSpace;
                        <div>Confidence: {{ activeDetails?.confidence }} %</div>
                    </div>
                    <div class="text-lighter">{{ fileName }}</div>
                    <a 
                        class="button-primary link-button no-decoration" 
                        :href="fileBridgeLink(activeDetails?.link)"
                    >
                        <i class="bx bx-play"></i> Watch now
                    </a>
                </div>

                <div v-else class="content-not-found">Please select a media from the listing</div>
            </div>
            <div class="card-spacer"></div>
            <div>
                <div class="options-listed">
                    <h4 v-if="titleMedia?.movies.length > 0">Movies</h4>
                    <div 
                        v-for="(media, index) in titleMedia?.movies" 
                        :key="index" 
                        class="option" 
                        :class="{'active': media.media_id == activeMediaId}"
                        @click="handleMediaClick(media)"
                    >
                        <i class="bx bxs-movie"></i>
                        <div>
                            <div class="name">{{ media.parsed_file_name }}</div>
                            <div class="details">
                                <div :class="{'tag tag-primary tag-small': media?.hdr_type}">
                                    {{ media?.hdr_type ?? 'SDR'}}
                                </div>
                                &ZeroWidthSpace; &bull; &ZeroWidthSpace;
                                <div>{{ calculateResolution(media) }}</div>
                                &ZeroWidthSpace; &bull; &ZeroWidthSpace;
                                <div>{{ convertToBytes(media.file_size ?? 0) }}</div>
                            </div>
                        </div>
                    </div>
                    <div v-for="(group, idx) in groupedExtras" :key="'g'+idx">
                        <h4>{{ group.type }}</h4>
                        <div 
                            v-for="(media, i) in group.media" 
                            :key="'e'+idx+'-'+i"
                            class="option" 
                            :class="{'active': media.media_id == activeMediaId}"
                            @click="handleMediaClick(media)"
                        >
                            <i class="bx bxs-movie"></i>
                            <div>
                                <div class="name">{{ media.parsed_file_name }}</div>
                                <div class="details">
                                    <div :class="{'tag tag-primary': activeDetails?.hdr_type}">
                                        {{ activeDetails?.hdr_type ?? 'SDR'}}
                                    </div>
                                    &ZeroWidthSpace; &bull; &ZeroWidthSpace;
                                    <div>{{ calculateResolution(media) }}</div>
                                    &ZeroWidthSpace; &bull; &ZeroWidthSpace;
                                    <div>{{ convertToBytes(media.file_size ?? 0) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { calculateResolution, convert, fileBridgeLink } from '@/utils/utils';

export default {
    name: 'WatchNowSection',
    data() {
        return {
            activeMediaId: null,
        }
    },
    props: {
        titleMedia: {
            type: Object, // should be object, not array
            required: true,
        }
    },
    methods: {
        convertToBytes(amount) {
            return convert.toBytes(amount);
        },
        fileBridgeLink(link) {
            return fileBridgeLink(link);
        },
        handleMediaClick(media) {
            if (this.activeMediaId != media.media_id) {
                this.activeMediaId = media.media_id;
            } else {
                this.activeMediaId = null;
            }
        },
        calculateResolution(media) {
            return calculateResolution(media)
        }
    },
    computed: {
        activeDetails() {
            return (
                this.titleMedia.movies.find(
                    m => m.media_id === Number(this.activeMediaId)
                ) ??
                this.titleMedia.extras?.find(
                    e => e.media_id === Number(this.activeMediaId)
                ) ??
                null
            );
        },
        fileName() {
            if (!this.activeDetails?.link) return '';
            const parts = this.activeDetails.link.split('/');
            return parts[parts.length - 1];
        },
        groupedExtras() {
            if (!this.titleMedia?.extras) return [];
            const map = {};
            this.titleMedia.extras.forEach(e => {
                (map[e.extra_type] ??= []).push(e);
            });
            return Object.entries(map).map(([type, media]) => ({ type, media }));
        },
    },
    watch: {
        titleMedia: {
            immediate: true,
            handler(newVal) {
                if (!this.activeMediaId && newVal) {
                    if (newVal.movies?.length > 0) {
                        this.activeMediaId = newVal.movies[0].media_id;
                    } else if (newVal.extras?.length > 0) {
                        this.activeMediaId = newVal.extras[0].media_id;
                    }
                }
            }
        }
    }
}
</script>


<style scoped>
.side-by-side {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    column-gap: var(--spacing-md);
    row-gap: var(--spacing-lg);
}
@media (max-width: 1000px) {
    .side-by-side {
        grid-template-columns: 1fr;
    }
}

.chosen-media {
    display: flex;
    flex-direction: column;
}
.chosen-media h3 {
    margin-top: 0;
    margin-bottom: 0;
}
.active-details {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}
.link-button {
    margin-top: var(--spacing-md);
}
.tag-small {
    margin-right: var(--spacing-xs);
}

.options-listed {
    max-height: 400px;
    overflow-y: scroll;
}
.options-listed h4:nth-of-type(1) {
    margin-top: 0;
}
.options-listed .option {
    padding: var(--spacing-sm) var(--spacing-sm);
    border-radius: var(--border-radius-medium);
    cursor: pointer;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: var(--spacing-sm);
    transition: background-color 0.1s ease-out;
}
.options-listed .option.active {
    background-color: var(--color-background-card-active);
}
.pointer-device .options-listed .option:hover {
    background-color: var(--color-background-card-hover);
}
.pointer-device .options-listed .option:active {
    background-color: var(--color-background-card-active);
}
.options-listed .option i {
    font-size: 32px;
    padding-inline: var(--spacing-sm);
}
.options-listed .option .name {
    font-weight: 600;
}
.options-listed .option .details {
    color: var(--color-text-light);
}

.content-not-found {
    height: 100%;
    box-sizing: border-box !important;
}

.controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-sm);
}
.custom-select {
    width: 100%;
    margin-bottom: var(--spacing-sm);
}

.details {
    display: flex;
}

.master-header {
    margin-top: 0;
}

.card-spacer {
    margin: var(--spacing-sm);
}
</style>