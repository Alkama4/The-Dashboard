<template>
    <tr class="spendings-summary" @click="toggleEntry">
        <td class="column-date">{{ formattedDate }}</td>
        <td class="column-counterparty">{{ counterparty }}</td>
        <td class="column-type">{{ type }}</td>
        <td class="column-amount">{{ amount ? `${amount.toFixed(2)} €` : '' }}</td>
        <td class="column-notes">{{ notes }}</td>
    </tr>
    <tr>
        <td colspan="5" >
            <div class="spendings-expanded" ref="spendingsExpanded">
                <div class="spendings-expanded-content" ref="spendingsExpandedContent">
                    <div class="control-buttons">
                        <button class="button-delete" @click.stop="deleteEntry">❌</button>
                        <button class="button-edit" @click.stop="editEntry">✏️</button>
                        <button class="button-duplicate" @click.stop="duplicateEntry">🖇️</button>
                        <button class="button-details" @click.stop="showDetails">ℹ️ Details</button>
                    </div>
        
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
                </div>
            </div>
        </td>
    </tr>
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
    .spendings-summary {
        cursor: pointer;
        user-select: none;
        position: relative;
        transition: background-color 0.1s;
        padding: var(--spacing-xs);
    }
    .spendings-summary:hover { background-color: var(--color-button-clean-hover); }
    .spendings-summary:active { background-color: var(--color-button-clean-active); }

    .spendings-summary td {
        padding-top: var(--spacing-xs);
        padding-bottom: var(--spacing-xs);
        padding-inline: var(--spacing-sm);
    }

    /* The closed portion or the summary */
    .column-amount {
        text-align: end;
    }

    /* The expanded stuff or the extra stuff like buttons*/
    .spendings-expanded {
        overflow: hidden;
        transition: height 0.2s ease-out;
        height: 0; /* Initial collapsed state */
    }

    /* Buttons */
    .control-buttons {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 3fr;
    }

    .control-buttons button {
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
