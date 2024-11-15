<template>
    <div class="modal-backdrop" @click.self="closeModal">
        <div class="modal-content">
            <button class="modal-close button-simple" @click="closeModal"><IconCross size="29"/></button>
            <div class="modal-body">
                <h3 style="margin-top: 0;">{{ header }}</h3>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import IconCross from './icons/IconCross.vue';

export default {
    name: "ModalWindow",
    components: {
        IconCross,
    },
    props: {
        header: { type: String, required: true },
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
    },
};
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5); /* Dark overlay */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: var(--z-modal);
}

.modal-content {
    background: var(--color-background-card);
    border-radius: var(--border-radius-medium);
    width: var(--width-modal);
    margin-inline: 8vw;
    padding: var(--spacing-lg);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
    animation: fadeInUp 0.3s ease-out; /* Smooth fade-in effect */
}

.modal-close {
    position: absolute;
    top: var(--spacing-lg);
    right: var(--spacing-lg);
    aspect-ratio: 1;
    margin: 0;
}

.modal-body {
    max-height: 70vh;
    overflow-y: auto;
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
