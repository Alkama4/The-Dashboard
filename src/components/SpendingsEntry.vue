<template>
    <tr class="spendings-summary" @click="toggleEntry" ref="spendingsSummary">

        <td class="column-date">
            <span class="date-full">{{ formattedDate }}</span>
            <span class="date-short">{{ shortFormattedDate }}</span>
        </td>

        <td class="column-counterparty column-fade-right">{{ counterparty }}</td>
        
        <td class="column-category" ref="columnCategory">
            <div ref="categoryExpanded" style="height: 25px;">
                <div ref="categoryxpandedContent">
                    <span v-for="(category, index) in categories" :key="index"
                            :class="{
                                'summary-row-category-and-amount column-fade-right': index === 0,
                                'second-row-category-and-amount': index === 1
                            }">
                        {{ category }}
                    </span>
                </div>
            </div>
        </td>

        <td class="column-amount" :class="this.transaction.direction" ref="columnAmount">
            <div ref="amountExpanded" style="height: 25px;">
                <div ref="amountExpandedContent">
                    <span v-for="(amount, index) in amounts" :key="index" 
                            :class="{
                                'summary-row-category-and-amount': index === 0,
                                'second-row-category-and-amount': index === 1
                            }">
                        {{ formatAmount(amount) }}
                    </span>
                </div>
            </div>
        </td>

        <td class="column-notes column-fade-combined" ref="columnNotes">
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
                        <button class="button-delete color-warning" @click.stop="deleteTransaction"><IconTrash size="18px" colorHover="white"/></button>
                        <button disabled="true" class="button-duplicate" @click.stop="duplicateTransaction"><IconCopy size="18px"/></button>
                        <button class="button-edit" @click.stop="editTransaction"><IconEdit size="18px"/></button>
                        <button class="button-details color-primary" @click.stop="showDetails"><IconDetails size="18px" color="#e9ebf0" colorHover="white"/>Details</button>
                    </div>
        
                    <ModalWindow
                        v-if="showModal"
                        :modalType="modalCategory"
                        :modalData="this.transaction"
                        :header="modalHeader"
                        @close="showModal = false"
                        @refreshTable="refreshTable"
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
            transaction: { category: Object, required: true },
            isExpanded: { category: Boolean, default: false },
        },
        data() {
            return {
                showModal: false,
                modalCategory: '',
                modalHeader: '',
            };
        },
        methods: {
            toggleEntry() {
                this.$emit('toggle');
            },
            expandEntry() {
                const expandedContentHeight = this.$refs['spendingsExpandedContent']?.getBoundingClientRect().height || 0;

                const notesHeight = this.$refs['notesExpandedContent']?.getBoundingClientRect().height || 0;
                const categoryHeight = this.$refs['categoryExpandedContent']?.getBoundingClientRect().height || 0;
                const amountHeight = this.$refs['amountExpandedContent']?.getBoundingClientRect().height || 0;

                const maxHeight = Math.max(notesHeight, categoryHeight, amountHeight) + 4;  // Spacing at the bottom when expanded

                this.$refs['spendingsExpanded'].style.height = `${expandedContentHeight}px`;
                this.$refs['notesExpanded'].style.height = `${maxHeight}px`;
                this.$refs['categoryExpanded'].style.height = `${maxHeight}px`;
                this.$refs['amountExpanded'].style.height = `${maxHeight}px`;

                this.$refs['columnNotes'].classList.add("hide-mask");
                // this.$refs['columnCategory'].classList.add("hide-mask");
                this.$refs['spendingsSummary'].classList.add("active");
            },
            collapseEntry() {
                this.$refs['spendingsExpanded'].style.height = '0';
                this.$refs['notesExpanded'].style.height = '25px';
                this.$refs['categoryExpanded'].style.height = '25px';
                this.$refs['amountExpanded'].style.height = '25px';
    
                this.$refs['columnNotes'].classList.remove("hide-mask");
                // this.$refs['columnCategory'].classList.remove("hide-mask");
                this.$refs['spendingsSummary'].classList.remove("active");
            },
            showDetails() {
                this.modalCategory = 'details';
                this.showModal = true;
            },
            editTransaction() {
                this.modalCategory = 'edit';
                this.showModal = true;
            },
            duplicateTransaction() {
                this.modalCategory = 'duplicate';
                this.showModal = true;
            },
            deleteTransaction() {
                this.modalCategory = 'delete';
                this.showModal = true;
            },
            formatAmount(amount) {
                try {
                    const numericAmount = Number(amount);
                    return Number.isFinite(numericAmount)
                        ? `${numericAmount.toLocaleString('fi-FI', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`
                        : '';
                } catch (error) {
                    console.error("Format amount error:", error);
                    return amount;                    
                }
            },
            refreshTable() {
                this.$emit('refreshTable');
            }
        },
        watch: {
            isExpanded(newVal) {
                if (newVal) {
                    // Expand the current entry
                    this.expandEntry();
                } else {
                    // Collapse the current entry
                    this.collapseEntry();
                }
            }
        },
        computed: {
            amounts() {
                const firstRow = this.transaction.categories.reduce((sum, category) => sum + category.amount, 0);
                if (this.transaction.categories.length > 1) {
                    return [firstRow, ...this.transaction.categories.map(category => category.amount)];
                } else {
                    return [firstRow];
                }
            },
            categories() {
                if (this.transaction.categories.length > 1) {
                    const firstRow = this.isExpanded ? "Total sum:" : this.transaction.categories.map(category => category.category).join(", ");
                    const categories = this.transaction.categories.map(category => category.category);
                    return [firstRow, ...categories];
                } else {
                    const firstRow = this.transaction.categories[0].category;
                    return [firstRow];
                }
            },
            counterparty() {
                return this.transaction.counterparty;
            },
            notes() {
                return this.transaction.notes;
            },
            formattedDate() {
                const options = { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                };
                const newDate = new Date(this.transaction.date);
                return newDate.toLocaleDateString('fi-FI', options);
            },
            shortFormattedDate() {
                const options = { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit' 
                };
                const newDate = new Date(this.transaction.date);
                return newDate.toLocaleDateString('fi-FI', options);
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
    transition: transform 0.1s ease-out, background-color 0.1s;
    border-top: 2px solid var(--color-background-tr-hover);
}
.spendings-summary::after {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    bottom: 0px;
    /* border-radius: var(--border-radius-small); */
    background-color: transparent;
    z-index: -1;
    transition: background-color 0.1s ease-out,
                bottom 0.2s ease-out;
}
.spendings-summary.active::after {
    background-color: var(--color-background-tr-active);
    /* bottom: var(--spacing-sm); */
    bottom: -43px;  /* To align with the control buttons bottom border */
}
.spendings-summary:hover::after {
    background-color: var(--color-background-tr-hover);
}

td {
    white-space: nowrap;
    padding: 8px var(--spacing-sm);
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
    max-width: 150px;
    min-width: 150px;
    overflow: hidden;
    color: var(--color-text);
}    
.column-category {
    text-align: start;
    max-width: 175px;
    min-width: 175px;
    width: fit-content;
    overflow: hidden;
    padding-right: 0;
}
.column-amount {
    text-align: end;
    width: fit-content;
    font-weight: 500;
    overflow: hidden;
    padding-left: 0;
}
.column-notes {
    overflow: hidden;
} 

.column-amount div, .column-category div {
    transition: height 0.2s ease-out;
} .column-amount div div, .column-category div div {
    display: grid;
    grid-template-columns: 1fr;
}

.column-notes div {
    transition: height 0.2s ease-out;
} .column-notes div div {
    white-space: normal;
    word-break: break-word;
    hyphens: auto; /* Automatically inserts hyphens when breaking words */
    text-align: justify;
}


/* Special column properties */
.column-fade-combined {
    mask-image: 
        linear-gradient(to right, black 80%, rgba(255, 255, 255, 0) 100%),
        linear-gradient(to bottom, black 75%, rgba(255, 255, 255, 0) 80%);
    mask-composite: intersect;
    mask-size: 100% 100%;
    transition: mask-size 0.2s ease-out;
}
.column-fade-combined.hide-mask {
    mask-size: 125% 300%;
}

.column-fade-right {
    mask-image: 
        linear-gradient(to right, var(--color-text) 80%, rgba(255, 255, 255, 0) 100%);
    mask-size: 100%;
    transition: mask-size 0.2s ease-out;
}
.column-fade-right.hide-mask {
    mask-size: 125%;
}

.second-row-category-and-amount {
    padding-top: 4px;
    border-top: 2px solid transparent;
    margin-top: 4px;
    transition: border 0.2s ease-out;
}
.active .second-row-category-and-amount {
    border-color: var(--color-border);
}

.column-amount.expense span {
    color: var(--color-negative);
} .column-amount.expense span::before {
    content: "-";
}

.column-amount.income span {
    color: var(--color-positive);
} .column-amount.income span::before {
    content: "+";
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
    gap: var(--spacing-md);
    padding-inline: var(--spacing-md);
    padding-bottom: var(--spacing-sm);
}

.control-buttons button {
    height: 35px;
    min-width: 30px;
    white-space: nowrap;
    padding-inline: 0;
    margin: 0;
    /* margin-bottom: var(--spacing-sm); */
    font-weight: 400;
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
