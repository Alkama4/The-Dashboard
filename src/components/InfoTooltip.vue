<template>
    <span class="tooltip-container">
        <IconInfo 
            size="20px" 
            :style="{'margin-bottom': alignOffset}" 
            class="info-icon icon-button" 
            @click="toggleTooltip"
        />
        <!-- v-html to make pagebreaks work -->
        <div 
            v-if="isVisible" 
            class="tooltip" 
            :class="{position, isShown}" 
            v-html="this.text"
            :style="{'max-width': maxWidth}"
        ></div>
    </span>
</template>

<script>
import IconInfo from './icons/IconInfo.vue';

export default {
    data() {
        return {
            isVisible: false,
            isShown: false
        };
    },
    components: {
        IconInfo,
    },  
    props: {
        text: String,
        position: {
            type: String,
            default: "left"
        },
        maxWidth: {
            type: String,
            default: "25ch",
        },
        alignOffset: {
            type: String,
            default: "4px",
        }
    },
    methods: {
        showTooltip() {
            this.isVisible = true;
            setTimeout(() => {
                this.isShown = true;
            }, 1);
            document.addEventListener("click", this.handleClickOutside);
        },
        hideTooltip() {
            if (!this.isClicked) {
                this.isShown = false;
                setTimeout(() => {
                    this.isVisible = false;
                }, 200);
                document.removeEventListener("click", this.handleClickOutside);
            }
        },
        toggleTooltip() {
            this.isClicked = !this.isClicked;
            if (this.isClicked) {
                this.showTooltip();
            } else {
                this.hideTooltip();
            }
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.isClicked = false;
                this.hideTooltip();
            }
        }
    }
};
</script>

<style scoped>
.tooltip-container {
    position: relative;
    /* Cant add align or justify, since it's not flex or grid */
}

.info-icon {
    cursor: pointer;
    display: inline;
    vertical-align: middle; /* Extra precaution if other alignment is applied */
}

.tooltip {
    position: absolute;
    bottom: 100%;
    width: max-content;
    /* max-width: 25ch; */
    padding: 8px;
    background: var(--color-background-card);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-small);
    margin-bottom: var(--spacing-xs);
    display: flex;
    flex-direction: row;
    z-index: var(--z-tooltip);
    
    color: var(--color-text-light);
    /* white-space: nowrap; */
    font-weight: 500;
    font-size: var(--font-size-sm);
    box-shadow: var(--shadow-card);
    text-align: left;

    transition: opacity 0.2s ease-out;
    opacity: 0;
}
.tooltip.isShown {
    opacity: 1;
}
.tooltip.right {
    left: calc(var(--spacing-sm) * -1);
}
.tooltip.left {
    right: calc(var(--spacing-sm) * -1);
}
.tooltip.middle, .tooltip.center {
    left: 50%;
    transform: translateX(-50%);
}

</style>
