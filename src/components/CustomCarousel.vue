<template>
    <div 
        @keydown.prevent="handleKeydown"
        class="custom-carousel"
        ref="customCarousel"
        tabindex="0"
    >
        <div 
            v-if="slides.length"
            class="carousel" 
        >
            <div 
                class="track" 
                :style="{ transform: `translateX(${x}px)` }"
                @pointerdown="startDrag"
            >
                <TitleCard 
                    v-for="(data, index) in slides" 
                    :key="index" 
                    :titleDetails="data" 
                    @click.capture="onClick"
                    draggable="false"
                />
            </div>
        </div>
        <div v-else-if="loading" class="loading-placeholder full-width-slide"></div>
        <div v-else class="content-not-found card full-width-slide">
            Looks like there's nothing here.<br>
            <span class="text-hidden">Try adding adding more titles to your watch list</span>
        </div>
        <div class="indicator-dots-holder">
            <IndicatorDots 
                v-if="IndicatorDotsEnabled"
                :dotCount="maxIndex + 1" 
                :dotIndex="currentIndex"
                @dotSelected="goToSlide"
            />
        </div>
    </div>
</template>

<script>
import TitleCard from './TitleCard.vue'
import IndicatorDots from './IndicatorDots.vue'

export default {
    name: 'CustomCarousel',
    components: {
        TitleCard,
        IndicatorDots,
    },
    data() {
        return {
            x: 0,
            vx: 0,
            startX: 0,
            lastX: 0,
            isDragging: false,
            animationFrame: null,
            positions: [],
            currentIndex: 0,
            maxIndex: 0,
            slideWidth: 200 + 8 / 2, // Width of each slide
            carouselWidth: 0, // Width of the carousel
        }
    },
    props: {
        slides: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false,
        },
        IndicatorDotsEnabled: {
            type: Boolean,
            default: true,
        }
    },
    methods: {
        calculateIndexes() {
            this.carouselWidth = this.$refs.customCarousel.clientWidth;
            if (this.carouselWidth > 0 && this.slideWidth > 0) {
                const visibleSlides = Math.floor(this.carouselWidth / this.slideWidth);
                const totalSlides = this.slides.length;
                this.maxIndex = Math.max(0, totalSlides - visibleSlides);
            } else {
                this.maxIndex = 0;
            }

            this.goToSlide(Math.min(this.currentIndex, this.maxIndex));
        },
        onClick(e) {
            if (this.positions.length) {
                e.preventDefault()
            }
        },
        startDrag(e) {
            this.isDragging = true
            this.startX = e.clientX
            this.lastX = this.x
            cancelAnimationFrame(this.animationFrame)
        },
        onDrag(e) {
            if (!this.isDragging || this.maxIndex == 0) return
            const now = Date.now()
            const delta = e.clientX - this.startX
            this.x = this.lastX + delta

            // Calculate the current index based on the position x
            this.updateCurrentIndex();

            // Get the total width of the carousel and the boundaries
            const totalWidth = this.slides.length * this.slideWidth
            const overflow = Math.max(0, totalWidth - this.carouselWidth)
            const minX = -overflow
            const maxX = 0

            // Apply the boundary clamping and overshoot effect
            if (this.x < minX) {
                // Calculate overshoot and apply deceleration
                const overshoot = minX - this.x
                this.x = minX - overshoot * Math.pow(Math.abs(overshoot), -0.33)
            } else if (this.x > maxX) {
                // Calculate overshoot and apply deceleration
                const overshoot = this.x - maxX
                this.x = maxX + overshoot * Math.pow(Math.abs(overshoot), -0.33)
            }

            // Store the positions for calculating velocity
            this.positions.push({ x: this.x, time: now })

            if (this.positions.length > 2) {
                this.positions.shift()
            }
        },
        endDrag() {
            setTimeout(() => {
                if (!this.isDragging) return
                this.isDragging = false

                if (this.positions.length === 0) return

                const first = this.positions[0]
                const last = this.positions[this.positions.length - 1]
                const dt = (last.time - first.time) || 1
                this.vx = (last.x - first.x) / dt * 16

                this.positions = []

                const predicted = this.x + this.vx * 12
                const index = Math.round(-predicted / this.slideWidth)

                if (index < 0 || index > this.maxIndex) {
                    this.animateRubberBand(predicted)
                } else {
                    this.goToSlide(index)
                }
            }, 1)
        },

        animateRubberBand(predictedX) {
            cancelAnimationFrame(this.animationFrame)

            const totalWidth = this.slides.length * this.slideWidth
            const overflow = Math.max(0, totalWidth - this.carouselWidth)
            const minX = -overflow
            const maxX = 0

            // Rubber-band easing
            const clampedX = Math.max(minX, Math.min(maxX, predictedX))
            const overshoot = predictedX - clampedX
            const easedOvershoot = overshoot / (Math.abs(overshoot) / this.slideWidth + 1) // exponential ease

            const target = clampedX + easedOvershoot

            const stiffness = 0.2
            const damping = 0.4

            const animate = () => {
                this.updateCurrentIndex();
                const force = target - this.x
                this.vx = (this.vx + force * stiffness) * damping
                this.x += this.vx

                if (Math.abs(this.vx) > 0.5 || Math.abs(force) > 1) {
                    this.animationFrame = requestAnimationFrame(animate)
                } else {
                    this.animateTo(clampedX)
                }
            }
 
            animate()
        },
        animateTo(target) {
            cancelAnimationFrame(this.animationFrame)

            const stiffness = 0.4
            const damping = 0.2

            const animate = () => {
                this.updateCurrentIndex()
                const force = target - this.x
                this.vx = (this.vx + force * stiffness) * damping
                this.x += this.vx
                if (Math.abs(this.vx) > 0.05) {
                    this.animationFrame = requestAnimationFrame(animate)
                } else {
                    this.x = target
                    this.vx = 0
                }
            }

            animate()
        },
        goToSlide(index) {
            index = Math.max(0, Math.min(this.maxIndex, index));

            if (index < this.maxIndex || this.maxIndex <= 1) {
                const target = -index * this.slideWidth;
                this.animateTo(target);
            } else {
                const totalWidth = this.slides.length * this.slideWidth;
                const overflow = totalWidth - this.carouselWidth;
                const target = -overflow;
                this.animateTo(target);
            }
        },
        handleKeydown(event) {
            if (['ArrowLeft', 'a', 'w'].includes(event.key)) {
                this.goToSlide(Math.max(0, this.currentIndex - 1))
            } else if (['ArrowRight', 'd', 's', 'Enter'].includes(event.key)) {
                this.goToSlide(Math.min(this.maxIndex, this.currentIndex + 1))
            } else if (!isNaN(event.key) && event.key !== '0') {
                const index = parseInt(event.key, 10) - 1
                if (index < this.maxIndex) {
                    this.goToSlide(index)
                }
            } else if (event.key === '0') {
                const index = this.maxIndex
                this.goToSlide(index)
            }
        },
        updateCurrentIndex() {
            const totalWidth = this.slides.length * this.slideWidth;
            const overflow = totalWidth - this.carouselWidth;

            const secondLastIndex = this.maxIndex - 1;
            const secondLastX = -secondLastIndex * this.slideWidth;
            const overflowX = -overflow;
            const halfwayX = (secondLastX + overflowX) / 2;

            const isAtOverflow = this.x <= halfwayX;

            if (isAtOverflow && this.maxIndex > 1) {
                this.currentIndex = this.maxIndex;
            } else {
                this.currentIndex = Math.min(Math.max(Math.round(-this.x / this.slideWidth), 0), this.maxIndex);
            }
        }
    },
    watch: {
        slides: {
            handler() {

                this.calculateIndexes();
            },
        }
    },
    mounted() {
        window.addEventListener('pointermove', this.onDrag)
        window.addEventListener('pointerup', this.endDrag)
        window.addEventListener('pointerleave', this.endDrag)
        this.calculateIndexes();
        window.addEventListener('resize', this.calculateIndexes);
    },
    beforeUnmount() {
        window.removeEventListener('pointermove', this.onDrag)
        window.removeEventListener('pointerup', this.endDrag)
        window.removeEventListener('pointerleave', this.endDrag)
        window.removeEventListener('resize', this.calculateIndexes);
    }
}
</script>

<style scoped>
.custom-carousel {
    row-gap: var(--spacing-sm);
    display: flex;
    flex-direction: column;
}
.carousel {
    overflow: hidden;
    width: 100%;
    touch-action: pan-y;
}
.track {
    display: flex;
    transition: none;
    width: fit-content;
    column-gap: var(--spacing-xs);

}

.indicator-dots {
    justify-content: center;
}
.indicator-dots-holder {
    height: 10px;
}

.full-width-slide {
    border-radius: var(--border-radius-medium);
    --card-height: 300px;
    --card-width: 200px;
    height: calc(var(--card-height) * 0.95);
    width: calc(var(--card-width) * 0.95);
    margin: calc(var(--card-height) *(1 - 0.95) / 2) calc(var(--card-width) * (1 - 0.95) / 2);
    width: 100%;
}
</style>
