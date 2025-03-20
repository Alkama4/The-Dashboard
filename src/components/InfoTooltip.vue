<template>
    <span class="tooltip-container">
        <IconInfo size="20px" class="info-icon" @mouseover="showTooltip" @mouseleave="hideTooltip"/>
        <!-- v-html to make pagebreaks work -->
        <div 
            v-if="isTooltipVisible" 
            class="tooltip" 
            :class="position" 
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
            isTooltipVisible: false
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
        }
    },
    methods: {
        showTooltip() {
            this.isTooltipVisible = true;
        },
        hideTooltip() {
            this.isTooltipVisible = false;
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
    margin-bottom: var(--spacing-xs);     /* Cant add align or justify to parent, since parent isn't flex or grid */
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
    font-size: 14px;
    box-shadow: var(--shadow-card);
    text-align: left;

    animation: fadeIn 0.2s ease-out;
}
.tooltip.right {
    left: calc(var(--spacing-sm) * -1);
}
.tooltip.left {
    right: calc(var(--spacing-sm) * -1);
}
</style>
