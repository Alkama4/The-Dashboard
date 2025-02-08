<template>
    <div class="indicator-dots" v-if="dotCount > 1">
        <div 
            v-for="index in [...Array(dotCount).keys()]" 
            :key="index" 
            class="dot" 
            :class="{ active: index === (dotIndex ?? swiperDotIndex) }"
            @click="moveSwiperTo(index)"
        ></div>
    </div>
</template>

<script>
import { useSwiper } from 'swiper/vue';

export default {
    data() {
        return {
            swiper: null,
            swiperDotIndex: 0,
        };
    },
    props: {
        dotIndex: {
            type: Number,
            required: true
        },
        dotCount: {
            type: Number,
            required: true
        }
    },
    methods: {
        moveSwiperTo(index) {
            // Emit the new dot index to the parent
            this.$emit("dotSelected", index);

            // Use swiper controls to move to the specific slide
            if (this.swiper) {
                this.swiper.slideTo(index);
            }
        },
    },
    mounted() {
        const swiper = useSwiper();
        if (swiper) {
            this.swiper = swiper;
        }
    },
    watch: {
        // Watch for changes to the swiper's activeIndex
        'swiper.activeIndex'(newIndex) {
            // Since the dotIndex is v-bind we can't modify it from the inside so we have to use an internal value
            this.swiperDotIndex = newIndex;
        }
    },
};
</script>


<style scoped>
.indicator-dots {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-sm);
    margin-inline: auto;
}
.dot {
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: var(--color-text-hidden);
    transition: background-color 0.2s ease-out, width 0.2s ease-out;
    cursor: pointer;
}
.dot.active {
    background-color: var(--color-text-light);
    width: 20px;
}
.dot:hover {
    background-color: var(--color-text);
}
</style>
