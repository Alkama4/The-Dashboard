<template>
    <div ref="scrollWrapper" class="scroll-wrapper">
        <div ref="scrollContainer" class="indicator-dots" v-if="dotCount > 1">
            <div 
                v-for="index in dotCount" 
                :key="index" 
                class="dot-click"
                @click="$emit('dotSelected', index - 1)"
            >
                <div
                    class="dot" 
                    :class="{ active: index - 1 === dotIndex }"
                >
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'IndicatorDots',
    props: {
        dotIndex: {
            type: Number,
            required: false,
            default: 0
        },
        dotCount: {
            type: Number,
            required: true
        }
    },
    emits: ['dotSelected'],
    watch: {
        dotIndex() {
            this.scrollToDot();
        },
        dotCount() {
            this.scrollToDot();
        }
    },
    mounted() {
        this.scrollToDot();
        window.addEventListener('resize', this.scrollToDot);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.scrollToDot);
    },
    methods: {
        dotsVisible() {
            const wrapper = this.$refs.scrollWrapper;
            if (!wrapper) return 1;
            return Math.floor(wrapper.clientWidth / 18);
        },
        scrollToDot() {
            this.$nextTick(() => {
                const wrapper = this.$refs.scrollWrapper;
                const container = this.$refs.scrollContainer;
                if (!wrapper || !container || this.dotCount <= 1) return;

                const maxShift = container.scrollWidth - wrapper.clientWidth + 1;

                let shift = 0;
                if (maxShift <= 0) {
                    shift = (wrapper.clientWidth - container.clientWidth) / 2;
                } else {
                    const margin = Math.max(1, Math.ceil(this.dotsVisible() * 0.5));
                    const availableRange = this.dotCount - 1 - margin * 2;

                    let clampedIndex = this.dotIndex - margin;
                    clampedIndex = Math.max(0, Math.min(clampedIndex, availableRange));

                    const ratio = availableRange > 0 ? clampedIndex / availableRange : 0;
                    const easedRatio = ratio;

                    shift = -maxShift * easedRatio;
                }

                container.style.transition = maxShift <= 0 ? 'none' : 'transform 0.3s ease-out';
                container.style.transform = `translateX(${shift}px)`;
            });
        }
    }
};
</script>


<style scoped>
.scroll-wrapper {
    overflow: hidden;
}

.indicator-dots {
    display: flex;
    flex-direction: row;
    transition: transform 0.3s ease-out;
    justify-content: flex-start;
    width: fit-content;
    padding: 0;
    margin: 0;
}

.dot-click {
    padding-inline: var(--spacing-xs);
    cursor: pointer;
}

.dot {
    width: 10px;
    min-width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: var(--color-text-hidden);
    transition: background-color 0.2s ease-out, width 0.2s ease-out;
}
.dot.active {
    background-color: var(--color-text-light);
    width: 20px;
    /* min-width: 20px; */
}
.pointer-device .dot-click:hover .dot {
    background-color: var(--color-text);
}
</style>
