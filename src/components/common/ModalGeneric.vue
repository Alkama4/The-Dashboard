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
        <i v-if="waitingVueShow" class="bx bx-loader-alt icon-loading"></i>

        <div 
            class="modal"
            :class="{'offcenter': offcenter}"
            ref="trapContainer"
            tabindex="-1"
            @keydown.tab="handleTab"
        >

            <div class="default-content" v-if="showDefaultcontent">
                <h2 class="title">{{ header }}</h2>
                <i 
                    class="bx bx-x icon-button"
                    @click="close"
                    @keydown.enter="close"
                    tabindex="0"
                ></i>
            </div>

            <div class="content">
                <slot></slot>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalGeneric',
    components: {
    },
    props: {
        header: {
            type: String,
            default: "Modal header"
        },
        showDefaultcontent: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            vueShow: false,
            stylingShow: false,
            waitingVueShow: false,
            waitingStylingShow: false,
            isOpening: false,
            offcenter: false,
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
            this.vueShow = true;
            this.stylingShow = false;

            document.documentElement.classList.add('no-scroll');
            document.addEventListener('keydown', this.closeWithKeypress);

            setTimeout(() => {
                this.stylingShow = true;
                this.waitingStylingShow = false;
                this.waitingVueShow = false;
                this.isOpening = false;

                // Focus trap container
                this.$nextTick(() => {
                    this.$refs.trapContainer?.focus();
                });
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
        },

        setOffcenter(value) {
            this.offcenter = !value;
        },

        handleTab(e) {
            const focusables = this.$refs.trapContainer?.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            if (!focusables || focusables.length === 0) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
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
    font-size: 42px;
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
    border-radius: var(--border-radius-large);
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
.modal:focus-visible {
    /* Fix bug where when opening sometimes causes outline to be visible, even though it should be unselectable. Caused by us force setting it when ever opening to create a tab loop */
    outline: none;
}
.modal.offcenter {
    margin: 0;
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

.default-content i {
    font-size: 36px;
}

.content {
    overflow-y: auto; /* Enable vertical scrolling */

    /* This proparbly had a reason to exist. 
    If the reason is figured write it here. 
    vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv */
    /* padding: var(--spacing-xs); */
}

</style>