<template>
    <tr class="spendings-seperator"><td colspan="5"></td></tr>
    <tr class="spendings-summary" @click="toggleEntry">
        <td class="column-date" style="position: relative;">
            <span class="pseudo-element"></span>
            {{ formattedDate }}
        </td>
        <td class="column-counterparty column-with-overflow">{{ counterparty }}</td>
        <td class="column-type">{{ type }}</td>
        <td class="column-amount">{{ amount ? `${amount.toFixed(2)} €` : '' }}</td>
        <td class="column-notes column-with-overflow">{{ notes }}</td>
    </tr>
    <tr>
        <td colspan="5" style="padding: 0;">
            <div class="spendings-expanded" ref="spendingsExpanded">
                <div class="spendings-expanded-content" ref="spendingsExpandedContent">
                    <div class="control-buttons">
                        <button class="button-delete" @click.stop="deleteEntry"><IconTrash size="18px" color-hover="white"/></button>
                        <button disabled="true" class="button-duplicate" @click.stop="duplicateEntry"><IconCopy size="18px"/></button>
                        <button class="button-edit" @click.stop="editEntry"><IconEdit size="18px"/></button>
                        <button class="button-details" @click.stop="showDetails"><IconDetails size="18px"/>More details</button>
                    </div>
        
                    <ModalWindow header="Details of an entry"
                    v-if="showDetailsModal" @close="showDetailsModal = false">
                        <div class="details-modal-content">
                            <div style="grid-area: a;">
                                <h4>ID:</h4>
                                <span>{{ id }}</span>
                                <h4>Income or expense:</h4>
                                <span>{{ isIncome ? 'Income' : 'Expense' }}</span>
                                <h4>Date:</h4> 
                                <span>{{ formattedDate }}</span>
                            </div>
                            <div style="grid-area: b;">
                                <h4>Counterparty:</h4> 
                                <span>{{ counterparty }}</span>
                                <h4>Type:</h4> 
                                <span>{{ type }}</span>
                                <h4>Amount:</h4> 
                                <span>{{ amount ? `${amount.toFixed(2)} €` : '' }}</span>
                            </div>
                            <div style="grid-area: c;">
                                <h4>Notes:</h4> 
                                <span>{{ notes }}</span>
                            </div>
                        </div>
                    </ModalWindow>

                    <ModalWindow v-if="showEditModal" @close="showEditModal = false"
                        header="Edit entry"
                    >
                        <p>Under construction... Check back later :)</p>
                    </ModalWindow>

                    <ModalWindow v-if="showDuplicationModal" @close="showDuplicationModal = false"
                        header="Make a copy of entry"
                    >
                        <p>Under construction... Check back later :)</p>
                    </ModalWindow>

                    <ModalWindow v-if="showDeletionModal" @close="showDeletionModal = false"
                        header="Delete entry"
                    >
                        <p>Are you sure you wan't to delete the entry? <strong style="color: red; text-transform: uppercase;">This action cannot be undone</strong>!</p>
                        <!-- Tähän kantsii varmaan laittaa muutaki tietoo ku toi id, ku sitä ei ees näytetä normisti -->
                        <div>
                            <button>Delete</button>
                            <button class="button-highlighted">Cancel</button>
                        </div>
                    </ModalWindow>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
import IconCopy from './icons/IconCopy.vue';
import IconEdit from './icons/IconEdit.vue';
import IconDetails from './icons/IconDetails.vue';
import IconTrash from './icons/IconTrash.vue';
import ModalWindow from './ModalWindow.vue';

export default {
    name: "SpendingsEntry",
    components: { 
        ModalWindow,
        IconDetails,
        IconCopy,
        IconEdit,
        IconTrash,
    },
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
            showDetailsModal: false,
            showEditModal: false,
            showDuplicationModal: false,
            showDeletionModal: false,
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
            this.showEditModal = true;
            console.log('Editing entry', this.id);
        },
        deleteEntry() { 
            this.showDeletionModal = true;
            console.log('Deleting entry', this.id);
        },
        duplicateEntry() { 
            this.showDuplicationModal = true;
            console.log('Duplicating entry', this.id);
        },
        showDetails() {
            this.showDetailsModal = true;
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
    /* .spendings-summary::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--color-button-clean);
        border-radius: var(--border-radius-small);
        transform: scaleX(0.975) scaleY(0.9);
        transition: transform 0.1s ease-out,
                    background-color 0.1s ease-out;
        z-index: var(--z-spendings-entry-after);
    } .spendings-summary:hover::after {
        transform: scale(1); 
        background-color: var(--color-button-clean-hover);
    } .spendings-summary:active::after {
        transform: scale(1); 
        background-color: var(--color-button-clean-active);
    } */

    /* Seperate tr for seperator, since the after is already in use */
    .spendings-seperator {
        position: relative;
        height: 4px;
    }
    .spendings-seperator td {
        padding: 0;
        height: 0px;
    }
    .spendings-seperator::after {
        content: '';
        position: absolute;
        top: 1px;
        left: 0;
        height: 2px;
        width: 100%;
        background-color: var(--color-button-clean-active);
        border-radius: var(--border-radius-small);
        z-index: var(--z-spendings-entry-after);
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
        /* box-shadow: 0 0 50px var(--color-button-delete-hover); */
        background-color: var(--color-button-delete-hover);
    } 
    .button-delete:active {
        background-color: var(--color-button-delete-active);
    }

    /* Modal window */
    .details-modal-content {
        display: grid;
        grid-template: 
            "a b"
            "c c";

    }
    .details-modal-content h4 {
        margin-bottom: 0;
    }

    @media (max-width: 777px) {
        .spendings-summary td:nth-child(5) {
            display: none;
        }
    }
    @media (max-width: 600px) {
        .spendings-summary td:nth-child(3) {
            display: none;
        }
    }

</style>
