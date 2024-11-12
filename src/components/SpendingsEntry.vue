<template>
    <div class="spendings-entry" @click="toggleEntry">
        <!-- Main Details (Visible in collapsed and expanded states) -->
        <div class="spendings-summary">
            <span class="column-date">{{ formattedDate }}</span>
            <span class="column-counterparty">{{ counterparty }}</span>
            <span class="column-type">{{ type }}</span>
            <span class="column-amount">{{ amount ? `${amount.toFixed(2)} €` : '' }}</span>
            <span class="column-notes">{{ notes }}</span>
        </div>
        
        <!-- Expanded Section (only visible when expanded) -->
        <div class="spendings-expanded" ref="spendingsExpanded">
            <div class="spendings-expanded-content" ref="spendingsExpandedContent">
                <div class="controlButtons">
                    <button class="button-delete" @click.stop="deleteEntry">❌</button>
                    <button class="button-edit" @click.stop="editEntry">✏️</button>
                    <button class="button-duplicate" @click.stop="duplicateEntry">🖇️</button>
                    <button class="button-details" @click.stop="showDetails">ℹ️ Details</button>
                </div>
                <div>
                    morestuff
                </div>
            </div>
        </div>
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
        id: { type: Number, required: true },
        isIncome: { type: Boolean, required: true },
        date: { type: Date, required: true },
        counterparty: { type: String, required: true },
        type: { type: String, required: true },
        amount: { type: Number, required: true },
        notes: { type: String, default: "" },
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
            if (this.isExpanded) {
                this.setExpandedHeight();
            } else {
                this.$refs['spendingsExpanded'].style.height = '0';
            }
        },
        setExpandedHeight() {
            const expandedContentHeight = this.$refs['spendingsExpandedContent'].getBoundingClientRect().height;
            this.$refs['spendingsExpanded'].style.height = `${expandedContentHeight}px`;
        },
        editEntry() { 
            console.log('Editing entry', this.id);
        },
        deleteEntry() { 
            console.log('Deleting entry', this.id);
        },
        duplicateEntry() { 
            console.log('Duplicating entry', this.id);
        },
        showDetails() {
            this.showModal = true;
        },
    },
    computed: {
        formattedDate() {
            if (this.date) {
                const day = this.date.getDate().toString().padStart(2, '0');
                const month = (this.date.getMonth() + 1).toString().padStart(2, '0');
                const year = this.date.getFullYear();
                return `${day}.${month}.${year}`;
            } else {
                return '';
            }
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
        user-select: none;
        
        max-width: 800px;
        margin-inline: auto;
    }
    @media screen and (max-width: 800px) {
        .spendings-entry {
            border-radius: 0;
        }
    }

    /* The closed portion or the summary */
    .spendings-summary {
        display: grid;
        grid-template-columns: 110px 165px 175px 106px 1fr;
        padding: var(--spacing-xs);
        white-space: nowrap;
    }

    .column-amount {
        text-align: end;
    }

    .spendings-summary span {
        margin-inline: var(--spacing-sm);
    }


    /* The expanded stuff or the extra stuff like buttons*/
    .spendings-expanded {
        display: flex;
        overflow: hidden;
        transition: height 0.2s ease-out;
        height: 0; /* Initial collapsed state */
    }
    .spendings-expanded-content {   /* Content div that doesn't morph during animation */
        height: fit-content;
        width: 100%;
        padding-inline: var(--spacing-xs);
        padding-bottom: var(--spacing-sm);
        display: grid;
        gap: var(--spacing-sm);
        grid-template-columns: 275px 1fr;
    }

    /* Buttons */
    .controlButtons {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 3fr;
    }

    .controlButtons button {
        height: 30px;
        min-width: 30px;
        white-space: nowrap;
    }

    .button-delete:hover {
        background-color: var(--color-button-delete-hover);
    } 
    .button-delete:active {
        background-color: var(--color-button-delete-active);
    }


</style>
