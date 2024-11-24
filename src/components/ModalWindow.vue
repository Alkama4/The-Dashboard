<template>
    <div class="modal-backdrop" @click.self="closeModal">
        <div class="modal-content">
            <button class="modal-close button-simple" @click="closeModal">
                <IconCross size="30" color="var(--color-text-light)"/>
            </button>
            <div class="modal-body">
                <h2 style="margin-top: 0;">{{ header }}</h2>
                
                <!-- Conditional Content -->
                <div v-if="type === 'details'">
                    <div class="details-modal-content">
                        <div style="grid-area: a; max-width: 25ch;">
                            <h4>ID:</h4>
                            <span>{{ data.entryId }}</span>
                            <h4>Direction:</h4>
                            <span>{{ data.direction }}</span>
                            <h4>Date:</h4> 
                            <span>{{ data.formattedDate }}</span>
                        </div>
                        <div style="grid-area: b; max-width: 25ch;">
                            <h4>Counterparty:</h4> 
                            <span>{{ data.counterparty }}</span>
                            <h4>Type:</h4> 
                            <span>{{ data.type }}</span>
                            <h4>Amount:</h4> 
                            <span>{{ data.amount ? `${data.amount.toFixed(2)} €` : '' }}</span>
                        </div>
                        <div style="grid-area: c; max-width: 50ch;">
                            <h4>Notes:</h4> 
                            <span>{{ data.notes }}</span>
                        </div>
                    </div>
                </div>

                <div v-if="type === 'edit'" class="edit-modal">
                    <EntryForm @submit="handleEditSubmit" :initialData="data"/>
                </div>
                
                <div v-if="type === 'duplicate'">
                    <p>Under construction... Check back later :)</p>
                </div>
                
                <div v-if="type === 'delete'">
                    <p style="margin-left: 0;"> Are you sure you want to delete this entry? <br>
                        <strong style="color: var(--color-negative)">This action cannot be undone.</strong> {{ id }}</p>
                    <div class="delete-buttons">
                        <button class="color-primary" @click="closeModal">Cancel</button>
                        <button class="color-warning" @click="deleteEntry">Delete</button>
                    </div>
                </div>
                <!-- Default Slot for Any Other Content -->
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import IconCross from './icons/IconCross.vue';
import EntryForm from './EntryForm.vue';

export default {
    name: "ModalWindow",
    components: {
        IconCross,
        EntryForm,
    },
    props: {
        header: { type: String, required: true },
        type: { type: String, required: true }, // Defines the type of modal (details, edit, delete)
        data: { type: Object, required: true }, // Dynamic data for the modal
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        deleteEntry() {
            this.$emit("delete", this.data.id); // Emit delete event with the entry ID
            this.$emit("close");                // And close the modal
        },
        handleEditSubmit(formData) {
            console.log("Saving edited data:", formData);
        },
        handleCopySubmit(formData) {
            console.log("Saving a duplicatea of something:", formData);
            // Muista vaihtaa id. Oikeestaan menee varmaa parhaiten ku ei vaan ilmota sitä ne se menee uudeks
        }
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
    cursor: pointer;
    z-index: var(--z-modal);
}

.modal-content {
    cursor: auto;
    background: var(--color-background-card);
    border-radius: var(--border-radius-medium);
    width: var(--width-modal);
    min-width: fit-content;
    margin-inline: 8vw;
    padding: var(--spacing-lg);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
    animation: fadeInUp 0.3s ease-out; /* Smooth fade-in effect */
}

.modal-close {
    position: absolute;
    padding: 3px;
    top: var(--spacing-lg);
    right: var(--spacing-lg);
    aspect-ratio: 1;
    margin: 0;
}

.modal-body {
    max-height: 70vh;
    overflow-y: auto;
    white-space: wrap;
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


/* - - - - - - - - - - - */
/* - - - Specific  - - - */
/* - - - - - - - - - - - */

/* Details specific */
.details-modal-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template: 
        "a b"
        "c c";
    gap: 0 20px;
}
.details-modal-content h4 {
    margin-bottom: 0;
}
.details-modal-content span {
    font-weight: 400;
    color: var(--color-text-light);
}

/* Delete modal */
.delete-buttons {
    display: flex;
    flex-direction: row;
}

</style>
