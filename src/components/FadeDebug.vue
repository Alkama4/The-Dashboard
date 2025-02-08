<template>
    <div>
        <button @click="addOrSubtractSlideshowIndex(1)">+</button>
        <span>{{ imageSlideshowData.chosenOne }}</span>
        <button @click="addOrSubtractSlideshowIndex(-1)">-</button>
        <div class="image-container">
            <div v-for="image in imageSlideshowData.individualData" :key="image.number">
                <img
                    v-if="image.number === imageSlideshowData.showOnDom || imageSlideshowData.keepOnDom.includes(image.number)" 
                    @load="image.isLoaded = true" 
                    :class="{ visible: image.isLoaded && image.number === imageSlideshowData.chosenOne }" 
                    :src="`http://pibox.lan:800/image/53/backdrop${image.number}.jpg`" 
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        src: String
    },
    data() {
        return {
            imageCount: 5,
            imageSlideshowData: {
                showOnDom: 1,
                chosenOne: 1,
                keepOnDom: [],
                individualData: [] // Will be initialized dynamically
            },
        };
    },
    created() {
        this.prepareImageSlideshowData(); // Initialize image data
    },
    methods: {
        updateSlideshowImage(newImageIndex) {
            // Push the current image to fade-out images before updating
            this.imageSlideshowData.keepOnDom.push(this.imageSlideshowData.chosenOne);

            // Update `showOnDom` and ensure it loops correctly
            this.imageSlideshowData.showOnDom = newImageIndex;

            // Small timeout to let the DOM update (prevents flickering)
            setTimeout(() => {
                this.imageSlideshowData.chosenOne = this.imageSlideshowData.showOnDom;
            }, 20);

            // Remove the oldest fade-out image after the transition completes
            setTimeout(() => {
                this.imageSlideshowData.keepOnDom.shift();
            }, 500);
        },
        addOrSubtractSlideshowIndex(amount) {
            let newNumber = this.imageSlideshowData.chosenOne + amount;

            // Ensure looping through images
            if (newNumber > this.imageCount) newNumber = 1;
            if (newNumber < 1) newNumber = this.imageCount;

            // Call updateImage with the new number
            this.updateSlideshowImage(newNumber);
        },
        prepareImageSlideshowData() {
            // Generate individual data for each image dynamically
            this.imageSlideshowData.individualData = Array.from({ length: this.imageCount }, (_, i) => ({
                number: i + 1,
                isLoaded: false
            }));
        }
    }
};
</script>

<style scoped>
.image-container {
    position: relative;
    width: 100%;
    height: 1000px;
}

img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
}

img.visible {
    opacity: 1;
}

</style>
