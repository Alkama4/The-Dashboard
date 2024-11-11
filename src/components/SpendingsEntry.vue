<template>
    <div class="spendings-entry" @click="toggleEntry">
        <!-- Main Details (Visible in collapsed and expanded states) -->
        <div class="spendings-summary">
            <span>{{ formattedDate }}</span>
            <span>{{ counterparty }}</span>
            <span>{{ type }}</span>
            <span>{{ amount ? `${amount.toFixed(2)} €` : '' }}</span>
            <span>{{ notes }}</span>
        </div>
        
        <!-- Expanded Section (only visible when expanded) -->
        <transition name="expand">
            <div class="spendings-expanded" v-if="isExpanded">
                <button @click.stop="editEntry">Edit</button>
                <button @click.stop="deleteEntry">Delete</button>
                <button @click.stop="duplicateEntry">Duplicate</button>
                <button @click.stop="showDetails">More details</button>
            </div>
        </transition>
    </div>

    <!-- Modal for additional details -->
    <ModalWindow v-if="showModal" @close="showModal = false">
        <h3>Details for Entry #{{ id }}</h3>
        <ul>
            <li><strong>ID:</strong> {{ id }}</li>
            <li><strong>Income:</strong> {{ isIncome ? 'Yes' : 'No' }}</li>
            <li><strong>Date:</strong> {{ formattedDate }}</li>
            <li><strong>Counterparty:</strong> {{ counterparty }}</li>
            <li><strong>Type:</strong> {{ type }}</li>
            <li><strong>Amount:</strong> {{ amount ? `${amount.toFixed(2)} €` : '' }}</li>
            <li><strong>Notes:</strong> {{ notes }}</li>
        </ul>
    </ModalWindow>
</template>

<script>
import ModalWindow from './ModalWindow.vue';

export default {
    name: "SpendingsEntry",
    components: { ModalWindow },
    props: {
        id: {
            type: Number,
            required: true,
        },
        isIncome: {
            type: Boolean,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        counterparty: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        notes: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            isExpanded: false,
            showModal: false,
        };
    },
    methods: {
        toggleEntry() {
            this.isExpanded = !this.isExpanded;
        },
        editEntry() { 
            // Placeholder for edit logic
            console.log('Editing entry', this.id);
        },
        deleteEntry() { 
            // Placeholder for delete logic
            console.log('Deleting entry', this.id);
        },
        duplicateEntry() { 
            // Placeholder for duplicate logic
            console.log('Duplicating entry', this.id);
        },
        showDetails() {
            this.showModal = true;
        },
        beforeEnter(el) {
            el.style.maxHeight = '0px';
            el.style.opacity = '0';
        },
        enter(el, done) {
            el.offsetHeight; // Trigger reflow to apply styles
            el.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
            el.style.maxHeight = '500px'; // Set a max height large enough to accommodate the expanded content
            el.style.opacity = '1';
            done();
        },
        leave(el, done) {
            el.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
            el.style.maxHeight = '0px';
            el.style.opacity = '0';
            done();
        }
    },
    computed: {
        formattedDate() {
            if (this.date) {
                const day = this.date.getDate().toString().padStart(2, '0');
                const month = (this.date.getMonth() + 1).toString().padStart(2, '0');
                const year = this.date.getFullYear();
                return `${day}.${month}.${year}`;
            }
            return '';
        },
    },
};
</script>

<style scoped>
    /* Styles for the whole thing */
    .spendings-entry {
        background-color: var(--color-background-card);
        border-radius: var(--border-radius-small);
        margin: 10px;
        display: grid;
        cursor: pointer;
        
        /* Temp starts */
        max-width: 800px;
        margin-inline: auto;
        /* Temp ends */
    }

    /* The closed portion or the summary */
    .spendings-entry .spendings-summary {
        display: grid;
        grid-template-columns: auto auto auto auto auto;
        gap: 10px;
        padding: var(--spacing-xs);
        padding-inline: var(--spacing-md);
        white-space: nowrap;
    }

    /* The expanded stuff or the extra stuff like buttons*/
    .spendings-entry .spendings-expanded {
        display: flex;
        padding: var(--spacing-sm);
    }

    /* Transition styles */
    .expand-enter-active, 
    .expand-leave-active {
        transition: all 0.2s ease;
    }

    .expand-enter-from, 
    .expand-leave-to {
        transform: translateY(-20px);
        opacity: 0;
    }
</style>
