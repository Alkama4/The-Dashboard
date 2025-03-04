<template>
    <div 
        class="transaction-component" 
        :class="{
            'expanded': isExpanded,
            'in-future': new Date(transaction.date) > new Date()
        }"
        @click="toggleEntry" f
        :ref="`transaction${transaction.transaction_id}`"
        tabindex="0"
        @keydown.enter="toggleEntry"
        @keydown.space.prevent="toggleEntry"
    >

        <div class="transaction-row">
            <div class="transaction-cell column-date">
                {{ shortFormattedDate }}
            </div>

            <div class="transaction-cell column-counterparty fade-right">{{ counterparty }}</div>
            
            <div class="transaction-cell column-category">
                <span v-for="(category, index) in categories" :key="index"
                    class="item"
                    :class="{
                        'transaction-items-summary fade-right': index === 0,
                        'transaction-item': index === 1
                    }"
                > 
                    {{ category }}
                </span>
            </div>

            <div class="transaction-cell column-amount" :class="this.transaction.direction">
                <span v-for="(amount, index) in amounts" :key="index" 
                    class="item"
                    :class="{
                        'transaction-items-summary': index === 0,
                        'transaction-item': index === 1,
                        'discount': amount < 0
                    }"
                >
                    {{ formatAmount(amount) }}
                </span>
            </div>

            <div class="transaction-cell column-notes">
                {{ notes }}
            </div>
        </div>

        <div class="control-buttons">
            <button 
                class="button-delete color-warning" 
                @click.stop="deleteTransaction"
                :tabindex="isExpanded ? 0 : -1"
            >
                <IconTrash size="18px"/>
            </button>
            <button 
                disabled="true" 
                title="Coming soon!" 
                class="button-duplicate" 
                @click.stop="duplicateTransaction"
                :tabindex="isExpanded ? 0 : -1"
            >
                <IconCopy size="18px"/>
            </button>
            <button 
                class="button-edit" 
                @click.stop="editTransaction"
                :tabindex="isExpanded ? 0 : -1"
            >
                <IconEdit size="18px"/>
            </button>
            <button 
                class="button-details color-primary" 
                @click.stop="showDetails"
                :tabindex="isExpanded ? 0 : -1"
            >
                <IconDetails size="18px"/>Details
            </button>
        </div>
    </div>

    <ModalWindow
        v-if="showModal"
        :modalType="modalCategory"
        :modalData="this.transaction"
        :header="modalHeader"
        @close="showModal = false"
        @refreshTable="refreshTable"
        @click.stop
        @keydown.stop
    />
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
                returnBackToHeight: "41px",
            };
        },
        methods: {
            toggleEntry() {
                this.$emit('toggle');
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
            },
        },
        watch: {
            isExpanded(newVal) {
                if (newVal) {
                    // Expand the current transaction
                    const element = this.$refs[`transaction${this.transaction.transaction_id}`];    // Get element
                    if (!element) return;                               // Check if exists
                    element.style.height = element.scrollHeight + "px"; // Expand
                } else {
                    // Collapse the current transaction
                    const element = this.$refs[`transaction${this.transaction.transaction_id}`];    // Get element
                    if (!element) return;                               // Check if exists
                    element.style.height = this.returnBackToHeight;          // Collapse
                }
            }
        },
        // mounted() {
        //     console.log(this.transaction)
        // },
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
.transaction-component {
    cursor: pointer;
    user-select: none;
    position: relative;
    transition: background-color 0.1s ease-out,
                height 0.2s ease-out;
    border-top: 2px solid var(--color-background-tr-active);
    display: flex;
    flex-direction: column;
    overflow: hidden;

    /* Default height - if edited edit also this.returnBackToHeight */
    height: 41px;
}
.transaction-component.expanded {
    background-color: var(--color-background-tr-active);
}
.transaction-component:hover {
    background-color: var(--color-background-tr-hover);
}
.transaction-component:focus {
    z-index: 2;
}
.transaction-component.in-future {
    filter: opacity(0.5);
}

.transaction-row {
    display: flex;
}

.transaction-cell  {
    white-space: nowrap;
    padding: 8px var(--spacing-sm);
    vertical-align: top;
    color: var(--color-text-light);
}

.column-amount, .column-category {
    display: flex;
    flex-direction: column;
}

.column-notes {
    white-space: normal;
    text-align: justify;
    mask-composite: intersect;
    mask-image: linear-gradient(to right, white 80%, transparent 100%),
                linear-gradient(to bottom, white 33px, transparent 33px);
    mask-size: 100% 44px;
    transition: mask-size 0.2s ease-out;
}
.expanded .column-notes {
    mask-size: 125% 1px; /* Shrinks the mask, revealing full content */
}

.fade-right {
    mask-image: linear-gradient(to right, white 80%, transparent 100%);
}

.transaction-items-summary {
    /* This limits the width of the span so that it doesn't overflow and the fade works as intended */
    overflow: hidden;

    /* This fixes an issue where the item would stick to bottom with long notes */
    flex: 1;
}
.transaction-item {
    padding-top: 4px;
    border-top: 2px solid transparent;
    margin-top: 4px;
    transition: border 0.15s ease-out;
}
.expanded .transaction-item {
    border-color: var(--color-border);
}

.column-amount.expense .item {
    color: var(--color-negative);
} .column-amount.expense .item::before {
    content: "-";
}

.column-amount.income .item {
    color: var(--color-positive);
} .column-amount.income .item::before {
    content: "+";
}

.column-amount.expense .item.discount {
    color: var(--color-positive) !important;
} .column-amount.expense .item.discount::before {
    content: "+";
}

/* The expanded stuff or the extra stuff like buttons*/
.transaction-buttons-cell {
    overflow: hidden;
    transition: height 0.2s ease-out;
    height: 0; /* Initial collapsed state */
}
.transaction-buttons-content {
    position: absolute;
}

/* Buttons */
.control-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 2fr;
    gap: var(--spacing-md);
    padding-inline: var(--spacing-md);
    padding-bottom: var(--spacing-sm);
    padding-top: var(--spacing-sm);
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
