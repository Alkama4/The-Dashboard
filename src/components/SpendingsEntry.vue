<template>
    <!-- <tr class="spendings-seperator"><td colspan="5"></td></tr> -->
    <tr class="spendings-summary" @click="toggleEntry">
        <td class="column-date">
            <span class="date-full">{{ formattedDate }}</span>
            <span class="date-short">{{ shortFormattedDate }}</span>
        </td>
        <td class="column-counterparty column-with-overflow">{{ counterparty }}</td>
        <td class="column-type">{{ type }}</td>
        <td class="column-amount" :class="{ 'income': direction, 'expense': !direction }">
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
                        <button class="button-delete" @click.stop="deleteEntry"><IconTrash size="18px" colorHover="white"/></button>
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
        direction: { type: Boolean, required: true },
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
                direction: this.direction,
                formattedDate: this.detailsDate,
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
        detailsDate() {
            // Get the formatted date
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            const formattedDate = this.date.toLocaleDateString('fi-FI', options);

            // Get the week number
            const getWeekNumber = (date) => {
                const startDate = new Date(date.getFullYear(), 0, 1);
                const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
                return Math.ceil((days + 1) / 7);
            };
            const weekNumber = getWeekNumber(this.date);

            // Return formatted date with the week number
            return `${formattedDate}, viikko ${weekNumber}`;
        },
        formattedDate() {
            const options = { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            };
            return this.date.toLocaleDateString('fi-FI', options);
        },
        shortFormattedDate() {
            const options = { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit' 
            };
        return this.date.toLocaleDateString('fi-FI', options);
    }
}

};
</script>


<style scoped>
    /* Styles for the whole thing */
    .spendings-summary {
        cursor: pointer;
        user-select: none;
        position: relative;
        transition: background-color 0.1s;  /* For the hover effect */
        transition: transform 0.1s ease-out;
        border-top: 2px solid var(--color-button-clean-active);
    }
    td {
        white-space: nowrap;
        padding: var(--spacing-xs) var(--spacing-sm);
        vertical-align: top;
        color: var(--color-text-light);
    }

    /* Individual columns in summary*/
    .column-date {
        text-align: center;
        width: fit-content;
    } .date-full {
        display: inline-block;
    } .date-short {
        display: none;
    }@media (max-width: 1500px) {
        .date-full {
            display: none;
        } .date-short {
            display: inline-block;
        }
    }
    .column-counterparty {
        text-align: start;
        max-width: 140px;
        overflow: hidden;
        color: var(--color-text);
    }    
    .column-type {
        text-align: start;
        width: fit-content;
    }
    .column-amount {
        text-align: end;
        width: fit-content;
        font-weight: 500;
    }
    .column-notes {
        overflow: hidden;
    } .column-notes div {
        transition: height 0.2s ease-out;
    } .column-notes div div {
        white-space: normal;
        word-break: break-word;
        word-wrap: break-word;
        text-align: justify;
    }

    /* Special column properties */
    .column-with-overflow {
        mask-image: linear-gradient(to right, var(--color-text) 80%, rgba(255, 255, 255, 0) 100%);
        mask-size: 100%;
        transition: mask-size 0.2s ease;
    }
    .column-with-overflow.hide-mask {
        mask-size: 125%;
    }

    .column-amount.expense {
        color: var(--color-negative);
    } .column-amount.expense::before {
        content: "-";
    }
    
    .column-amount.income {
        color: var(--color-positive);
    } .column-amount.income::before {
        content: "+";
    }
    
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
        grid-template-columns: 1fr 1fr 1fr 2fr;
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

    .button-details {
        background-color: var(--color-primary);
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
