<template>
    <div class="indicator-dots" v-if="dotCount > 1">
        <div 
            v-for="index in [...Array(dotCount).keys()]" 
            :key="index" 
            class="dot" 
            :class="{ active: index === modelValue }"
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
        } 
    },
    props: {
        modelValue: {  // This enables v-model
            type: Number,
            required: true
        },
        dotCount: {
            type: Number,
            required: true
        }
    },
    methods: {
        moveSwiperTo(index)  {
            // For v-model
            this.$emit("update:modelValue", index);

            // For swiper controls
            if (this.swiper) {
                this.swiper.slideTo(index);
                console.debug("Sliding swiper to", index, "- Swiper was set to", this.swiper.activeIndex);
            }
        },
    },
    mounted() {
        const swiper = useSwiper();
        if (swiper) {
            this.swiper = swiper
        }
    },
    watch: {
        'swiper.activeIndex'(newIndex, oldIndex) {
            console.debug('Active index changed from', oldIndex, 'to', newIndex);
            this.$emit("update:modelValue", newIndex);
        }
    }
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
