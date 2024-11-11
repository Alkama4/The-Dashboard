<template>
    <div class="modal-backdrop" @click.self="closeModal">
        <div class="modal-content">
            <button class="modal-close" @click="closeModal">&times;</button>
            <div class="modal-body">
                <!-- Slot for modal content -->
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalWindow",
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
    z-index: 1000;
}

.modal-content {
    background: var(--color-background-card);
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
    animation: fadeInUp 0.3s ease-out; /* Smooth fade-in effect */
}

.modal-close {
    position: absolute;
    top: 20px;
    right: 20px;
    aspect-ratio: 1;
    padding: 10px;
    margin: 0;
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
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
