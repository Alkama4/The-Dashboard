<template>
    <div v-if="titleMedia?.length > 0">
        <h3>Watch now</h3>
        <CustomSelect 
            v-if="titleMedia?.length > 1"
            v-model="activeWatchNowIndex"
            :options="selectOptions"
        />
        <div class="card">
            <h3>{{ activeDetails?.parsed_file_name }}</h3>
            <div class="details">
                <div v-if="activeDetails?.hdr_type">
                    {{ activeDetails?.hdr_type }}
                    &ZeroWidthSpace; &bull; &ZeroWidthSpace;
                </div>
                <div>{{ resolution }}</div>
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
    </div>
</template>

<script>
import CustomSelect from '@/components/common/CustomSelect.vue';
import { convert, fileBridgeLink } from '@/utils/utils';

export default {
    name: 'WatchNowSection',
    data() {
        return {
            activeWatchNowIndex: 0,
        }
    },
    components: {
        CustomSelect,
    },
    props: {
        titleMedia: {
            type: Array,
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
    },
    computed: {
        selectOptions() {
            return this.titleMedia.map((item, idx) => ({
                label: item.parsed_file_name,
                value: idx
            }));
        },
        activeDetails() {
            console.debug(this.titleMedia[this.activeWatchNowIndex])
            return this.titleMedia[this.activeWatchNowIndex];
        },
        resolution() {
            const video_width = this.activeDetails?.video_width;
            const video_height = this.activeDetails?.video_height;

            let height = 0;
            if ((video_width / video_height) > (16 / 9)) {
                height = Math.round(video_width * 9 / 16);
            } else {
                height = video_height;
            }
            return height ? `${height}p` : 'Unset';
        },
        fileName() {
            const parts = this.activeDetails.link.split('/');
            const lastPart = parts[parts.length - 1];
            return lastPart;
        }
    },
}
</script>

<style scoped>
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

h3 {
    margin-top: 0;
}

.link-button {
    margin-top: var(--spacing-md);
}
</style>