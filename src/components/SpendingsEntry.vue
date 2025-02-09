<template>
    <div class="transaction-row" @click="toggleEntry" ref="transaction">

        <div class="transaction-cell column-date">
            <!-- <span class="date-full">{{ formattedDate }}</span> -->
            <!-- <span class="date-short">{{ shortFormattedDate }}</span> -->
            {{ shortFormattedDate }}
        </div>

        <div class="transaction-cell column-counterparty column-fade-right">{{ counterparty }}</div>
        
        <div class="transaction-cell column-category" ref="columnCategoryCell">
            <div ref="columnCategoryContent">
                <span v-for="(category, index) in categories" :key="index"
                        :class="{
                            'summary-row-category-and-amount column-fade-right': index === 0,
                            'second-row-category-and-amount': index === 1
                        }">
                    {{ category }}
                </span>
            </div>
        </div>

        <div class="transaction-cell column-amount" :class="this.transaction.direction" ref="columnAmountCell">
            <div ref="columnAmountContent">
                <span v-for="(amount, index) in amounts" :key="index" 
                        :class="{
                            'summary-row-category-and-amount': index === 0,
                            'second-row-category-and-amount': index === 1,
                            'discount': amount < 0
                        }">
                    {{ formatAmount(amount) }}
                </span>
            </div>
        </div>

        <div class="transaction-cell column-notes column-fade-combined" ref="columnNotesCell">
            <div ref="columnNotesContent">
                {{ notes }}
            </div>
        </div>

    </div>
    
    <div class="transaction-buttons-cell" ref="transactionButtonsCell">
        <div class="transaction-buttons-content" ref="transactionButtonsContent">
            <div class="control-buttons">
                <button class="button-delete color-warning" @click.stop="deleteTransaction"><IconTrash size="18px"/></button>
                <button disabled="true" title="Coming soon!" class="button-duplicate" @click.stop="duplicateTransaction"><IconCopy size="18px"/></button>
                <button class="button-edit" @click.stop="editTransaction"><IconEdit size="18px"/></button>
                <button class="button-details color-primary" @click.stop="showDetails"><IconDetails size="18px"/>Details</button>
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
        emits: ['toggle', 'refreshTable'],
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
                const expandedContentHeight = this.$refs['transactionButtonsContent']?.getBoundingClientRect().height || 0;

                const notesHeight = this.$refs['columnNotesContent']?.getBoundingClientRect().height || 0;
                const categoryHeight = this.$refs['columnCategoryContent']?.getBoundingClientRect().height || 0;
                const amountHeight = this.$refs['columnAmountContent']?.getBoundingClientRect().height || 0;

                const maxHeight = Math.max(notesHeight, categoryHeight, amountHeight) + 4;  // Spacing at the bottom when expanded

                // Set the transactions buttons container so that the buttons are visible
                this.$refs['transactionButtonsCell'].style.height = `${expandedContentHeight}px`;

                // Set each of the cells to the maximum height between them
                this.$refs['columnNotesCell'].style.height = `${maxHeight}px`;
                this.$refs['columnCategoryCell'].style.height = `${maxHeight}px`;
                this.$refs['columnAmountCell'].style.height = `${maxHeight}px`;

                // Hide the overflow mask on notes since we expand it
                this.$refs['columnNotesCell'].classList.add("hide-overflow-mask");

                // Add the global class to the transaction for other effects
                this.$refs['transaction'].classList.add("active");
            },
            collapseEntry() {
                // Set the transactions buttons container so that the buttons are hidden
                this.$refs['transactionButtonsCell'].style.height = '0';
                
                // Set each of the cells height back to the predefined height of a cell
                this.$refs['columnNotesCell'].style.height = '25px';
                this.$refs['columnCategoryCell'].style.height = '25px';
                this.$refs['columnAmountCell'].style.height = '25px';
    
                // Show the overflow mask on notes since we collapse it
                this.$refs['columnNotesCell'].classList.remove("hide-overflow-mask");
                
                // Remove the global class from the transaction for other effects
                this.$refs['transaction'].classList.remove("active");
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
                    let numericAmount = Number(amount);
                    numericAmount = numericAmount < 0 ?  numericAmount * -1 : numericAmount;
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
.transaction-row {
    cursor: pointer;
    user-select: none;
    position: relative;
    transition: transform 0.1s ease-out, background-color 0.1s;
    border-top: 2px solid var(--color-background-tr-hover);
}
.transaction-row::after {
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
.transaction-row.active::after {
    background-color: var(--color-background-tr-active);
    /* bottom: var(--spacing-sm); */
    bottom: -43px;  /* To align with the control buttons bottom border */
}
.transaction-row:hover::after {
    background-color: var(--color-background-tr-hover);
}

.transaction-cell  {
    white-space: nowrap;
    padding: 8px var(--spacing-sm);
    vertical-align: top;
    color: var(--color-text-light);
}

.column-amount div, .column-category div {
    display: grid;
    grid-template-columns: 1fr;
}

.column-notes div {
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
}
.transaction-row.active .column-fade-combined {
    mask-size: 125% 300%;
}

.column-fade-right {
    mask-image: 
        linear-gradient(to right, var(--color-text) 80%, rgba(255, 255, 255, 0) 100%);
    mask-size: 100%;
}
/* Not needed since we aren't expanding the are of the columns with this */
/* .transaction-row.active .column-fade-right {
    mask-size: 125%;
} */


.summary-row-category-and-amount {
    /* This limits the width of the span so that it doesn't overflow and the fade works as intended */
    overflow: hidden;
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

.column-amount.expense span.discount {
    color: var(--color-positive) !important;
} .column-amount.expense span.discount::before {
    content: "+";
}

/* The expanded stuff or the extra stuff like buttons*/
.transaction-buttons-cell {
    position: relative; /* In order to have the possibility of content stuck to the bottom */
    overflow: hidden;
    transition: height 0.2s ease-out;
    height: 0; /* Initial collapsed state */
}
.transaction-buttons-content {
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
    .transaction-row td:nth-child(5) {
        display: none;
    }
}
@media (max-width: 600px) {
    .transaction-row td:nth-child(3) {
        display: none;
    }
}

</style>
