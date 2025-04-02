<template>
    <div 
        v-if="isVisible"
        class="modal-backdrop" 
        :class="{'is-displayed': isDisplayed}"
        @click.self="close"
    >
        <div class="modal">

            <div class="default-content">
                <h2 class="title">{{ header }}</h2>
                <IconCross
                    class="icon-button"
                    size="36px"
                    @click="close"
                />
            </div>

            <div class="content">
                <slot></slot>
            </div>
            
        </div>
    </div>
</template>

<script>
import IconCross from './icons/IconCross.vue';

export default {
    name: 'GenericModal',
    components: {
        IconCross,
    },
    props: {
        header: {
            type: String,
            default: "Modal header"
        },
    },
    data() {
        return {
            isVisible: false,
            isDisplayed: false
        };
    },
    methods: {
        open() {
            if (this.closeTimeout) {
                clearTimeout(this.closeTimeout);
                this.closeTimeout = null;
            }

            document.documentElement.classList.add('no-scroll');
            document.addEventListener('keydown', this.closeWithKeypress);
            this.isVisible = true;

            setTimeout(() => {
                this.isDisplayed = true;
            }, 10);
        },
        close() {
            document.documentElement.classList.remove('no-scroll');
            document.removeEventListener('keydown', this.closeWithKeypress);
            this.$emit("closed");
            this.isDisplayed = false;

            this.closeTimeout = setTimeout(() => {
                if (!this.isDisplayed) {
                    this.isVisible = false;
                }
                this.closeTimeout = null;
            }, 200);
        },
        closeWithKeypress(event) {
            if (event.key === 'Escape') {
                this.close();
            }
        }
    }
};
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--color-background-backdrop);
    backdrop-filter: blur(8px);

    z-index: var(--z-modal);
    opacity: 0;
    transition: opacity 0.2s ease-out;
    pointer-events: none;
}
.modal-backdrop.is-displayed {
    pointer-events: unset;
    cursor: pointer;
    opacity: 1;
}
.modal {
    max-width: 90vw;
    max-height: 80vh;
    width: fit-content;
    height: fit-content;
    box-sizing: border-box;
    border-radius: var(--border-radius-medium);
    padding: var(--spacing-lg);
    background-color: var(--color-background);
    
    display: flex;
    flex-direction: column;

    position: fixed;
    inset: 0; /* Centers it */
    margin: auto; /* Works with inset */
    
    transform: translateY(8px);
    transition: transform 0.2s ease-out;
    cursor: auto;
}

.is-displayed .modal {
    transform: translateY(0px);
}

.default-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: var(--spacing-md);
}

.default-content .title {
    margin: 0;
}

.content {
    overflow-y: auto; /* Enable vertical scrolling */
}

</style>