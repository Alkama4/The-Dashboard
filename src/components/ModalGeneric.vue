<template>
    <div 
        v-if="vueShow || stylingShow || waitingVueShow"
        class="modal-backdrop" 
        :class="{
            'is-displayed': stylingShow,
            'is-waiting': waitingStylingShow
        }"
        @click.self="close"
    >
        <IconLoading class="icon-loading" size="42px" v-if="waitingVueShow"/>

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
import IconLoading from './icons/IconLoading.vue';

export default {
    name: 'ModalGeneric',
    components: {
        IconCross,
        IconLoading,
    },
    props: {
        header: {
            type: String,
            default: "Modal header"
        },
    },
    data() {
        return {
            vueShow: false,
            stylingShow: false,
            waitingVueShow: false,
            waitingStylingShow: false,
            isOpening: false,
        };
    },
    methods: {
        init() {
            this.isOpening = true;

            if (this.closeTimeout) {
                clearTimeout(this.closeTimeout);
                this.closeTimeout = null;
            }

            document.documentElement.classList.add('no-scroll');
            document.addEventListener('keydown', this.closeWithKeypress);
            this.waitingVueShow = true;

            setTimeout(() => {
                this.waitingStylingShow = true;
                this.isOpening = false;
            }, 1);
        },
        open() {
            this.isOpening = true;

            if (this.closeTimeout) {
                clearTimeout(this.closeTimeout);
                this.closeTimeout = null;
            }

            this.vueShow = true;
            this.stylingShow = false;

            document.documentElement.classList.add('no-scroll');
            document.addEventListener('keydown', this.closeWithKeypress);

            setTimeout(() => {
                this.stylingShow = true;
                this.waitingStylingShow = false;
                this.waitingVueShow = false;
                this.isOpening = false;
            }, 1);
        },
        close() {
            document.documentElement.classList.remove('no-scroll');
            document.removeEventListener('keydown', this.closeWithKeypress);
            this.$emit("closed");
            this.stylingShow = false;
            this.waitingStylingShow = false;

            this.closeTimeout = setTimeout(() => {
                if (!this.stylingShow &&  !this.isOpening) {
                    this.vueShow = false;
                    this.waitingVueShow = false;
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
.modal-backdrop.is-waiting,
.modal-backdrop.is-displayed {
    pointer-events: unset;
    cursor: pointer;
    opacity: 1;
}

.icon-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    animation: rotate-spin 1s linear infinite;
}
@keyframes rotate-spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}


.modal {
    max-width: 95vw;
    max-height: 85vh;
    width: fit-content;
    height: fit-content;
    box-sizing: border-box;
    border-radius: var(--border-radius-medium);
    padding: var(--spacing-lg);
    background-color: var(--color-background-card);
    
    display: flex;
    flex-direction: column;

    position: fixed;
    inset: 0; /* Centers it */
    margin: auto; /* Works with inset */
    
    transform: translateY(8px);
    transition: transform 0.2s ease-out,
                opacity 0.2s ease-out;
    cursor: auto;

    pointer-events: none;
    opacity: 0;
}

.is-displayed .modal {
    pointer-events: unset;
    transform: translateY(0px);
    opacity: 1;
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
    padding: var(--spacing-xs);
}

</style>