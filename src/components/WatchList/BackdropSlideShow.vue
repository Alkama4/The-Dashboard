<template>
    <div class="backdrop-slide-show">
        <div class="background backdrop-image-container" v-if="imageLinks.length >= 1">
            <div 
                v-for="image in individualData" 
                :key="image.number"
            >
                <img
                    class="backdrop-image"
                    :class="{ 'image-visible': image.isLoaded && image.number === selectedImage }" 
                    v-if="image.number === showOnDom || keepOnDom.includes(image.number)" 
                    @load="image.isLoaded = true" 
                    :src="image.url" 
                />
            </div>
        </div>

        <div class="backdrop-dimension flow-fixer"></div>
        
        <div class="backdrop-container backdrop-dimension" @keydown="handleKeypress" tabindex="0">
            <div class="content-inside">
                <div class="main backdrop-image-container" v-if="imageLinks.length >= 1">
                    <div 
                        v-for="image in individualData" 
                        :key="image.number"
                        class="slide"
                        :class="{ visible: image.number === selectedImage }"
                    >
                        <div v-if="image.number === showOnDom || keepOnDom.includes(image.number)">
                            <img
                                class="backdrop-image"
                                :class="{ 'image-visible': image.isLoaded }"
                                @load="image.isLoaded = true" 
                                :src="image.url" 
                            />
                            <TitleShowcaseDetails 
                                v-if="image.titleDetails" 
                                :titleDetails="image.titleDetails"
                            />
                        </div>
                    </div>
                </div>

                <div class="button-holder no-pointer-events" v-if="imageLinks.length > 1">
                    <button class="left all-pointer-events" @click="addOrSubtractSlideshowIndex(-1)">
                        <div class="hover-gradient"></div>
                        <IconChevronDown size="min(6vw, 56px)"/>
                    </button>
                    <button class="right all-pointer-events" @click="addOrSubtractSlideshowIndex(1)">
                        <div class="hover-gradient"></div>
                        <IconChevronDown size="min(6vw, 56px)"/>
                    </button>
                </div>
                
                <div class="indicator">
                    <IndicatorDots 
                        :dotIndex="selectedImage" 
                        :dotCount="imageLinks.length"
                        @dotSelected="updateSlideshowImageTo"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { apiUrl, isTouchDevice, standAloneBuild } from '@/utils/config';
import IndicatorDots from '@/components/WatchList/IndicatorDots.vue';
import IconChevronDown from '@/components/icons/IconChevronDown.vue';
import TitleShowcaseDetails from '@/components/WatchList/TitleShowcaseDetails.vue';

export default {
    name: "BackdropSlideShow",
    components: {
        IndicatorDots,
        IconChevronDown,
        TitleShowcaseDetails
    },
    data() {
        return {
            apiUrl: apiUrl,
            standAloneBuild: standAloneBuild,
            isTouchDevice: isTouchDevice,
            showOnDom: 0,
            selectedImage: 0,
            keepOnDom: [],
            individualData: [],
        }
    },
    props: {
        imageLinks: {
            type: Array,
            default: () => [],
        },
        associatedDetails: {
            type: Array,
            default: () => [],
        }
    },
    methods: {
        handleKeypress(event) {
            if (['ArrowLeft', 'a', 'w', 'Backspace'].includes(event.key)) {
                this.addOrSubtractSlideshowIndex(-1);
            } else if (['ArrowRight', 'd', 's', 'Enter'].includes(event.key)) {
                this.addOrSubtractSlideshowIndex(1);
            } else if (['1', '2', '3', '4', '5'].includes(event.key)) {
                if (Number(event.key) <= this.imageLinks.length)
                    this.updateSlideshowImageTo(Number(event.key) - 1);
            }
        },
        updateSlideshowImageTo(newImageIndex) {
            // Push the current image to fade-out images before updating
            this.keepOnDom.push(this.selectedImage);

            // Update `showOnDom` and ensure it loops correctly
            this.showOnDom = newImageIndex;

            // Small timeout to let the DOM update (prevents flickering)
            setTimeout(() => {
                this.selectedImage = this.showOnDom;
            }, 20);

            // Remove the oldest fade-out image after the transition completes
            setTimeout(() => {
                this.keepOnDom.shift();
            }, 500);
        },
        addOrSubtractSlideshowIndex(amount) {
            let newNumber = this.selectedImage + amount;

            // Ensure looping through images
            if (newNumber >= this.imageLinks.length) newNumber = 0;
            if (newNumber < 0) newNumber = this.imageLinks.length - 1;

            // Call updateImage with the new number
            this.updateSlideshowImageTo(newNumber);
        },
        setIndividualData() {
            if (this.imageLinks && this.imageLinks.length) {
                this.individualData = this.imageLinks.map((link, i) => ({
                    number: i,
                    isLoaded: false,
                    url: link,
                    titleDetails: this.associatedDetails[i]
                }));
            }
        }
    },
    watch: {
        imageLinks: {
            handler(newLinks) {
                const prevSelected = this.selectedImage;
                const prevData = this.individualData;

                this.setIndividualData();

                // restore `isLoaded` flags for unchanged URLs
                this.individualData.forEach((img) => {
                    const old = prevData.find(o => o.url === img.url);
                    if (old) img.isLoaded = old.isLoaded;
                });

                // keep current index if still valid
                if (prevSelected < newLinks.length) {
                    this.selectedImage = prevSelected;
                    this.showOnDom = prevSelected;
                } else {
                    this.selectedImage = 0;
                    this.showOnDom = 0;
                }
            },
            immediate: true,
        },
    }
}
</script>

<style scoped>
/* - - - - - BACKDROP AND VALUES ON TOP - - - - -  */
.backdrop-slide-show {
    --backdrop-max-width: 1200px;
}
.backdrop-dimension {
    width: min(100vw, var(--backdrop-max-width));
    height: min(calc(100vw / 16 * 9), calc(var(--backdrop-max-width) / 16 * 9), 66vh);
    /* aspect-ratio: 16 / 9; */
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
    /* background-color: var(--color-background); */
}

.flow-fixer {
    width: min(100vw, 100%);
}

/* BACKDROPS */
.backdrop-image-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.backdrop-image-container .slide {
    transition: opacity 0.5s ease-in-out;
    opacity: 0;
}
.backdrop-image-container .slide.visible {
    opacity: 1;
}

.backdrop-image-container .backdrop-image {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
}
.backdrop-image.image-visible {
    opacity: 1;
}

.backdrop-image-container.main img.backdrop-image { 
    position: absolute;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    mask-image: linear-gradient(to top, transparent 0%, white 50%);
    z-index: var(--z-backdrop-image-main);
}
.backdrop-image-container.background img.backdrop-image { 
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    object-fit: cover; 
    
    width: 100vw;
    /* height: min(675px, 66vh);(1200px / 16 * 9) or 66vh */
    height: min(calc(100vw / 16 * 9 + 60px),
            calc(var(--backdrop-max-width) / 16 * 9 + 60px),
            calc(66vh + 60px));
    z-index: var(--z-backdrop-image-bg);

    filter: blur(20px) opacity(0.5);
    mask-image: linear-gradient(to top, transparent 0%, white 50%);
    mask-composite: intersect;
}

/* @media (max-width: 1200px) {
    .backdrop-image-container.background { 
        display: none;
    }
} */

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
.pointer-device .backdrop-container .button-holder {
    opacity: 0;
    transition: opacity 0.2s ease-out;
}
.pointer-device .backdrop-container:hover .button-holder {
    opacity: 1;
}
.backdrop-container .button-holder button {
    color: var(--color-text-white);
    padding: 0;
    margin: 0;
    width: 10%;
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
    mask-image: linear-gradient(to left, transparent 0%, hsla(0, 0%, 0%, 0.45) 100%),
                linear-gradient(to top, transparent 0%, black 25%);
}
.backdrop-container .button-holder button.right .hover-gradient {
    mask-image: linear-gradient(to right, transparent 0%, hsla(0, 0%, 0%, 0.45) 100%),
                linear-gradient(to top, transparent 0%, black 25%);
}
.pointer-device .backdrop-container .button-holder button:hover .hover-gradient {
    background-color: var(--color-background);
}

.backdrop-container .button-holder button svg {
    width: 100% !important;
}
.pointer-device .backdrop-container .button-holder button.right:hover svg {
    transform: scale(1.25) rotate(-90deg);
}
.pointer-device .backdrop-container .button-holder button.left:hover svg {
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
</style>