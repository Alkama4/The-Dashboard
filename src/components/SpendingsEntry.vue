<template>
    <tr class="spendings-seperator"><td colspan="5"></td></tr>
    <tr class="spendings-summary" @click="toggleEntry">
        <td class="column-date" style="position: relative;">{{ formattedDate }}</td>
        <td class="column-counterparty column-with-overflow">{{ counterparty }}</td>
        <td class="column-type">{{ type }}</td>
        <td class="column-amount">
            {{ amount ? `${amount.toLocaleString('fi-FI', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €` : '' }}
        </td>
        <td class="column-notes column-with-overflow" ref="columnNotes">
            <div ref="notesExpanded" style="height: 25px;">
                <div ref="notesExpandedContent">
                    {{ notes }}
                </div>
            </div>
        </td>
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
        
                    <ModalWindow
                        v-if="showModal"
                        :type="modalType"
                        :data="modalData"
                        :header="modalHeader"
                        @close="showModal = false"
                        @delete="deleteEntry"
                    />
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
import { defineAsyncComponent } from 'vue';

export default {
    name: "SpendingsEntry",
    components: { 
        IconDetails,
        IconCopy,
        IconEdit,
        IconTrash,
        ModalWindow: defineAsyncComponent(() => import('./ModalWindow.vue')),
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
            showModal: false, // Control whether the modal is visible
            modalType: '', // Type of modal (Details, Edit, etc.)
            modalData: {}, // Data to pass to the modal
            modalHeader: '', // Header text for the modal
            ModalWindow: null,
        };
    },
    methods: {
        toggleEntry() {
            this.isExpanded = !this.isExpanded;
            if (this.isExpanded) {
                const expandedContentHeight = this.$refs['spendingsExpandedContent']?.getBoundingClientRect().height || 0;
                this.$refs['spendingsExpanded'].style.height = `${expandedContentHeight}px`;

                const expandedColumnWithOverflowHight = this.$refs['notesExpandedContent']?.getBoundingClientRect().height || 0;
                this.$refs['notesExpanded'].style.height = `${expandedColumnWithOverflowHight}px`;
                this.$refs['columnNotes'].classList.add("hide-mask");
            } else {
                this.$refs['spendingsExpanded'].style.height = '0';
                this.$refs['notesExpanded'].style.height = '25px';
                this.$refs['columnNotes'].classList.remove("hide-mask");
            }
        },
        showDetails() {
            this.modalType = 'details';
            this.modalData = {
                id: this.id,
                isIncome: this.isIncome,
                formattedDate: this.formattedDate,
                counterparty: this.counterparty,
                type: this.type,
                amount: this.amount,
                notes: this.notes
            };
            this.modalHeader = "Details of an entry";
            this.showModal = true;
        },
        editEntry() {
            this.modalType = 'edit';
            this.modalData = { /* any data needed for editing */ };
            this.modalHeader = "Edit entry";
            this.showModal = true;
        },
        duplicateEntry() {
            this.modalType = 'duplicate';
            this.modalData = { /* data for duplication */ };
            this.modalHeader = "Make a copy of entry";
            this.showModal = true;
        },
        deleteEntry() {
            this.modalType = 'delete';
            this.modalData = { id: this.id };
            this.modalHeader = "Delete entry";
            this.showModal = true;
        },
    },
    computed: {
        formattedDate() {
            const day = this.date.getDate().toString().padStart(2, '0');
            const month = (this.date.getMonth() + 1).toString().padStart(2, '0');
            const year = this.date.getFullYear();
            return `${day}.${month}.${year}`;
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
        transition: background-color 0.1s;  /* For the hover effect */
        padding: var(--spacing-xs);
    }
    
    /* Hover effect */
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
        position: relative; /* In order to have the possibility of content stuck to the bottom */
        overflow: hidden;
        transition: height 0.2s ease-out;
        height: 0; /* Initial collapsed state */
    }
    .spendings-expanded-content {
        position: absolute;
        bottom: 0;
        width: 100%;
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
        padding-inline: 0;
        font-weight: 400;
    }
    
    .button-delete:hover {
        /* box-shadow: 0 0 50px var(--color-button-delete-hover); */
        background-color: var(--color-button-delete-hover);
    } 
    .button-delete:active {
        background-color: var(--color-button-delete-active);
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
