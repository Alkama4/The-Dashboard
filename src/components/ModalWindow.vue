<template>
    <div class="modal-backdrop backdrop" @click.self="closeModal">
        <div class="modal-content">
            <div class="modal-body">
                <div class="modal-header">
                    <h2 style="margin-top: 0;" :class="this.modalType">
                        <!-- Header is inserted with ::after as a style -->
                    </h2>
                    <button class="modal-close button-simple" @click="closeModal">
                        <IconCross size="36" color="var(--color-text-light)" />
                    </button>
                </div>

                
                <!-- Conditional Content -->
                <div v-if="modalType === 'details'">
                    <div class="details-modal-content">
                        <div style="grid-area: a; max-width: 25ch;">
                            <h4>ID</h4>
                            <span>{{ modalData.transactionID }}</span>
                            <h4>Direction</h4>
                            <span>{{ modalData.direction }}</span>
                            <h4>Date</h4> 
                            <span>{{ detailsDate }}</span>
                        </div>
                        <div style="grid-area: b; max-width: 25ch;">
                            <h4>Counterparty</h4> 
                            <span>{{ modalData.counterparty }}</span>
                            <h4>Amount breakdown</h4>
                            <ul>
                                <li v-for="category in formattedCategories" :key="category.category">
                                    {{ category.category }}: {{ category.amount }}
                                </li>
                            </ul>
                            <span>Total amount: <b> {{ totalSum }} </b> </span>
                        </div>
                        <div style="grid-area: c; max-width: 50ch;">
                            <h4>Notes</h4> 
                            <span :style="modalData.notes ? '' : 'color: var(--color-text-hidden);'">{{ modalData.notes || "(This entry doesn't have notes)" }}</span>
                        </div>
                    </div>
                </div>

                <div v-if="modalType === 'edit'" class="edit-modal">
                    <EntryForm @submit="handleEditSubmit" :initialData="modalData" style="margin-inline: 3px;"/>
                </div>
                
                <div v-if="modalType === 'duplicate'">
                    <p>Under construction... Check back later :)</p>
                </div>
                
                <div v-if="modalType === 'delete'">
                    <p style="margin-left: 0;"> Are you sure you want to delete this entry? <br>
                        <strong style="color: var(--color-negative)">This action cannot be undone.</strong> {{ id }}</p>
                    <div class="two-buttons">
                        <button class="color-warning color-primary" @click="deleteEntry">Delete</button>
                        <button class="" @click="closeModal">Cancel</button>
                    </div>
                </div>

                <div v-if="modalType === 'logout'">
                    <p style="margin-left: 0;"> Are you sure you want to log out?
                    </p>
                    <div class="two-buttons">
                        <button class="color-primary" @click="sendLogout">Logout</button>
                        <button class="" @click="closeModal">Cancel</button>
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
import { notify } from '@/utils/notification';

export default {
    name: "ModalWindow",
    components: {
        IconCross,
        EntryForm,
    },
    props: {
        modalType: { type: String, required: true }, // Defines the type of modal (details, edit, delete)
        modalData: { type: Object, required: false }, // Dynamic data for the modal
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        deleteEntry() {
            this.$emit("delete", this.modalData.id); // Emit delete event with the entry ID
            // notify("Entry deleted succesfully!", "success");
            notify("The logic has not yet been implemented!", "error");
            this.$emit("close");                // And close the modal
        },
        handleEditSubmit(formData) {
            console.log("Form data to send to DB:", formData);
            // notify("Entry edited succesfully!", "success");
            notify("The logic has not yet been implemented!", "error");
            this.$emit("close");
        },
        handleCopySubmit(formData) {
            console.log("Saving a duplicatea of something:", formData);
            notify("The logic has not yet been implemented!", "error");
            // Muista vaihtaa id. Oikeestaan menee varmaa parhaiten ku ei vaan ilmota sitä ne se menee uudeks
        },
        formatAmount(amount) {
            return amount ? `${amount.toLocaleString('fi-FI', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €` : '';
        },
        sendLogout() {
            this.$emit("logout");
            this.$emit("close");
        }
    },
    computed: {
        detailsDate() {
            // Create a new Date instance
            const date = new Date(this.modalData.date);

            // Get the formatted date
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            const formattedDate = date.toLocaleDateString('fi-FI', options);

            // Get the week number
            const getWeekNumber = (date) => {
                const startDate = new Date(date.getFullYear(), 0, 1);
                const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
                return Math.ceil((days + 1) / 7);
            };
            const weekNumber = getWeekNumber(date);

            // Return formatted date with the week number
            return `${formattedDate}, viikko ${weekNumber}`;
        },
        formattedCategories() {
            // Map types with formatted amounts
            const categories = this.modalData.categories.map(category => ({
                category: category.category,
                amount: this.formatAmount(category.amount),
            }));
            return categories;
        },
        totalSum() {
            return this.formatAmount(this.modalData.categories.reduce((sum, category) => sum + category.amount, 0));
        }
    },
    mounted() {
        document.documentElement.classList.add('no-scroll');
    },
    beforeUnmount() {
        document.documentElement.classList.remove('no-scroll');
    }
};
</script>

<style scoped>
.modal-backdrop {
    align-items: center;
    justify-content: center;
    z-index: var(--z-modal);
}

.modal-content {
    display: flex; /* Enable flexbox */
    flex-direction: column; /* Align content vertically */
    justify-content: center; /* Center content vertically */
    align-items: center; /* Center content horizontally */
    cursor: auto;
    background: var(--color-background-modal);
    border-radius: var(--border-radius-medium);
    width: var(--width-modal);
    min-width: fit-content;
    margin-inline: 8vw;
    padding: var(--spacing-lg);
    position: relative;
    animation: fadeInUp 0.3s ease-out;
    max-height: 70vh;
    width: fit-content
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 19.92px; /* Move the margin from h2 to this so that the modal-close is aligned */
}

.modal-header h2 {
    margin: 0;
}
h2.details::after {
    content: "Details of an entry";
}
h2.edit::after {
    content: "Edit entry";
}
h2.duplicate::after {
    content: "Make a copy of entry";
}
h2.delete::after {
    content: "Delete entry";
}
h2.logout::after {
    content: "Log out";
}

.modal-close {
    position: static; /* Remove absolute positioning */
    margin: 0;
    aspect-ratio: 1;
    cursor: pointer;
}

.modal-body {
    overflow-y: auto;
    white-space: wrap;
}

/* Compact mode */
@media (max-width: 600px) {
    .modal-content {
        width: 100vw;
        max-height: 100vh;
        height: fit-content;
        margin-inline: 0;
        display: flex; /* Ensure flex is applied */
        justify-content: center; /* Center vertically */
        border-radius: 0;
    }
    .inner-modal-content {
        max-height: 100%;
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
.details-modal-content ul {
    padding-left: var(--spacing-lg);
    margin: var(--spacing-sm) 0;
}

/* Delete modal */
.two-buttons {
    display: flex;
    flex-direction: row;
}

</style>
