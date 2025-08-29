<template>
    <div id="spendings-page">

        <div class="content-width-medium">
            <h1>Spendings page</h1>
            <p> Welcome to the transactions page! Here, you'll find a comprehensive table listing all your logged transactions. This page not only provides a clear overview of your spending activity but also serves as a powerful tool for managing your financial records. You can easily add new transactions, edit existing ones, duplicate entries for efficiency, or remove items no longer needed. </p>
        </div>

        <!-- The transactions table -->
        <div class="transactions-holder content-width-large">
            <div class="transaction-headers transaction-row">
                <div 
                    v-for="column in columns" 
                    :key="column.key" 
                    :class="[
                        column.class,
                        { 
                            active: apiFilters.sort_by === column.key,
                            inactive: apiFilters.sort_by !== column.key,
                            loading: waitingForResponse
                        }
                    ]" 
                    tabindex="0"
                    @click="sortBy(column.key)"
                    @keydown.enter="sortBy(column.key)"
                    @keydown.space.prevent="sortBy(column.key)"
                >
                    {{ column.label }}
                    <component
                        :is="getSortIcon(column.key)"
                        :style="{ fill: waitingForResponse ? 'var(--color-text-hidden)' : '' }"
                        size="20px"
                    />
                </div>
            </div>
            <div ref="placeForEntries">
                <SpendingsEntry
                    v-for="(transaction, index) in transactions"
                    :key="transaction.transactionID"
                    :transaction="transaction"
                    :is-expanded="expandedIndex === index"
                    @toggle="toggleEntry(index)"
                    @refreshTable="refreshTable"

                    @deleteTransaction="handleDeleteTransaction(transaction)"
                    @editTransaction="handleEditTransaction(transaction)"
                    @showTransaction="handleShowTransaction(transaction)"
                />
                <!-- <div v-if="true"> -->
                <div v-if="waitingForResponse && apiFilters.offset === 0">
                    <div class="transaction-row" v-for="i in 25" :key="i">
                        <div class="transaction-cell column-date"><div class="loading-placeholder"></div></div>
                        <div class="transaction-cell column-counterparty"><div class="loading-placeholder"></div></div>
                        <div class="transaction-cell column-category"><div class="loading-placeholder"></div></div>
                        <div class="transaction-cell column-amount"><div class="loading-placeholder"></div></div>
                        <div class="transaction-cell column-notes"><div class="loading-placeholder"></div></div>
                    </div>
                </div>
                <div v-else-if="transactions.length == 0">
                    <div class="no-transactions-found content-not-found">
                        You either have no transactions or your filters excluded them.
                    </div>
                </div>
            </div>
        </div>
    
        <div class="content-width-large count-row">
            <div>
                Shown
                <span v-if="returnedCount === totalCount">
                    all
                </span>
                <span class="tag"> 
                    {{ returnedCount || 0 }} of {{ totalCount || 0 }} 
                </span> 
                transactions
            </div>
        </div>

        <!-- Button to load more entries -->
        <div class="content-width-large">
            <button 
                class="center load-more" 
                @click="loadMore"
                :disabled="waitingForResponse"
                :class="{loading: waitingForResponse}"
                v-if="loadMoreButtonVisible"
            >
                Load more
            </button>
        </div>

        <!-- Buttons in the bottom right corner -->
        <button 
            class="button-primary sticky-corner-button" 
            @click="this.showFilters = !this.showFilters;" 
            style="margin-bottom: calc(var(--spacing-lg) * 1.5 + 52px);"
        >
            <IconFilter size="28px"/> 
        </button>

        <router-link to="/spendings/new_entry" tabindex="-1">
            <button class="button-primary sticky-corner-button"> 
                <IconAdd size="28px"/> 
            </button>
        </router-link>


        <!-- Fullscreen filter menu hidden by default -->
        <FilterSettings
            v-if="showFilters" 
            @close="showFilters = false" 
            @apply="applyFilters"
            fullscreen-mode="true"
            :filterData="filterData"
            :filterOptions="filterOptions"
        />

        <!-- Need to figure out a way to have a single one of these and not inside each spendings entry -->
        <ModalConfirmation 
            ref="deleteTransactionMC"
            header="Delete transaction"
            text="Are you sure you want to delete the transaction? This cannot be undone"
            affirmative-option="Delete transaction"
        />

        <!-- For editing the transaction, and maybe for future duplication? -->
        <ModalTransaction ref="editTransactionMT"/>

        <!-- Transaction details -->
        <ModalGeneric ref="showTransactionMG" header="Title details">
            <div class="details-modal-content">
                <div style="grid-area: a; max-width: 25ch;">
                    <h4>ID</h4>
                    <span>{{ transactionToShow.transaction_id }}</span>
                    <h4>Direction</h4>
                    <span>{{ transactionToShow.direction }}</span>
                    <h4>Date</h4> 
                    <span>{{ convertToFiDate(transactionToShow.date, "fullWithWeek") }}</span>
                </div>
                <div style="grid-area: b; max-width: 25ch;">
                    <h4>Counterparty</h4> 
                    <span>{{ transactionToShow.counterparty }}</span>
                    <h4>Amount breakdown</h4>
                    <ul>
                        <li v-for="(category, index) in transactionToShow.categories" :key="index">
                            {{ category.category }}: {{ convertToEur(category.amount) }}
                        </li>
                    </ul>
                    <span>
                        Total amount: 
                        <b>{{ convertToEur(transactionToShow.categories.reduce((sum, category) => sum + category.amount, 0)) }}</b> 
                    </span>
                </div>
                <div style="grid-area: c; max-width: 50ch;">
                    <h4>Notes</h4> 
                    <span :style="transactionToShow.notes ? '' : 'color: var(--color-text-hidden);'">{{ transactionToShow.notes || "(This entry doesn't have notes)" }}</span>
                </div>
            </div>
        </ModalGeneric>
    </div>
</template>


<script>
import fastApi from '@/utils/fastApi';
import SpendingsEntry from '@/components/Spendings/SpendingsEntry.vue';
import FilterSettings from '@/components/Spendings/FilterSettings.vue';
import ModalConfirmation from '@/components/common/ModalConfirmation.vue';
import ModalTransaction from '@/components/Spendings/ModalTransaction.vue';
import ModalGeneric from '@/components/common/ModalGeneric.vue';
import { convert } from '@/utils/utils';
import { standAloneBuild } from '@/utils/config';

import IconFilter from '@/components/icons/IconFilter.vue';
import IconSortBoth from '@/components/icons/IconSortBoth.vue';
import IconSortDown from '@/components/icons/IconSortDown.vue';
import IconSortUp from '@/components/icons/IconSortUp.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
import { notify } from '@/utils/notification';

export default {
    name: 'SpendingsPage',
    components: {
        SpendingsEntry,
        FilterSettings,
        ModalConfirmation,
        ModalTransaction,
        ModalGeneric,
        IconSortBoth,
        IconSortDown,
        IconSortUp,
        IconFilter,
        IconAdd,
    },
    data() {
        return {
            // Need to set seperately, leave this empty []
            columns: [
                { key: 'date', label: 'Date', class: 'column-date' },
                { key: 'counterparty', label: 'Counterparty', class: 'column-counterparty' },
                { key: 'category', label: 'Category', class: 'column-category' },
                { key: 'amount', label: 'Amount', class: 'column-amount' },
                { key: 'notes', label: 'Notes', class: 'column-notes' },
            ],
            transactions: [],
            showFilters: false,
            expandedIndex: null, // Track which transaction is expanded
            apiFilters: {
                sort_by: 'date',
                sort_order: 'desc',
                offset: 0,
                // Filter values
                start_date: 946684800000,
                end_date: 2208988800000,
                min_amount: -999999,
                max_amount: 999999,
                counterparties: [],
                counterparty_inclusion_mode: true,
                categories: [],
                category_inclusion_mode: true,
            },
            filterData: {
                amount: {
                    lowerLimit: -999999,
                    upperLimit: 999999,
                },
                date: {
                    lowerLimit: 946684800000,
                    upperLimit: 2208988800000,
                },
                counterparty: {
                    mode: 'include',
                    selected: [],  // Track selected counterparties
                },
                category: {
                    mode: 'include',
                    selected: [],  // Track selected categories
                }
            },
            filterOptions: {
                amount: {},
                date: {},
                counterparty: {},
                category: {}
            },
            waitingForResponse: true,
            returnedCount: 0,
            totalCount: 0,
            loadMoreButtonVisible: false,
            transactionToShow: null,
        };
    },
    computed: {
        getSortIcon() {
            return (column) => {
                if (this.apiFilters.sort_by === column) {
                    return this.apiFilters.sort_order === 'asc' ? IconSortUp : IconSortDown;
                }
                return IconSortBoth;
            };
        },
    },
    methods: {
        toggleEntry(index) {
            // Select or switch to a different transaction to be highlighted
            this.expandedIndex = this.expandedIndex === index ? null : index;
        },
        async handleDeleteTransaction(transaction) {
            // Confirm before proceeding
            if (await this.$refs.deleteTransactionMC.prompt()) { 
                // Send the delete request
                const response = await fastApi.spendings.transactions.delete(transaction.transaction_id);
                if (response) {
                    notify("Transaction deleted successfully!", "success");

                    // Close the transaction becuase otherwise the one below it would be expanded which doesn't make sense
                    this.expandedIndex = null;
                    // Have to add a small delay or the watch on the transaction below would be triggered to expand
                    setTimeout(() => {
                        // Remove the transaction from the list
                        this.transactions = this.transactions.filter(t => t.transaction_id != transaction.transaction_id);
                    }, 1)
                }
            }
        },
        async handleEditTransaction(transaction) {
            const modifiedTransaction = await this.$refs.editTransactionMT.prompt(transaction);
            console.log(modifiedTransaction);
            
            if (modifiedTransaction) {
                const response = await fastApi.spendings.transactions.update(modifiedTransaction.transaction_id, modifiedTransaction);
                if (response) {
                    notify("Transaction edited successfully!", "success");

                    // Close the modal
                    this.$refs.editTransactionMT.close();

                    // Find the transaction and update its values
                    const index = this.transactions.findIndex(t => t.transaction_id === modifiedTransaction.transaction_id);
                    if (index !== -1) {
                        this.transactions[index] = { ...this.transactions[index], ...modifiedTransaction };
                    }
                }
            }
        },
        handleShowTransaction(transaction) {
            this.transactionToShow = transaction;
            console.log(transaction);
            this.$refs.showTransactionMG.open();
        },
        async fetchTransactions() {
            this.waitingForResponse = true;

            // Use {standalone: true} as filter's when in a standalone build to avoid the query from
            // changing when the user plays with filters and not displaying anything.
            const response = await fastApi.spendings.transactions.list(standAloneBuild ? {} : this.apiFilters);
            if (response && response.transactions) {
                if (this.apiFilters.offset === 0) {
                    this.transactions = [...response.transactions];  // First page, reset
                } else {
                    this.transactions = [...this.transactions, ...response.transactions]; // Append new data
                }

                this.totalCount = response.total_count;
                this.returnedCount = response.returned_count;

                // If there are more entries, keep showing "Load More" button
                this.loadMoreButtonVisible = response.has_more;
            } else {
                console.error("[SpendingsPage] Failed to retrieve transactions.");
            }
            this.waitingForResponse = false;
        },
        async fetchFilters() {
            // Get filters and pass them to the FilterSettings component
            const filterResponse = await fastApi.spendings.transactions.filters_options();
            if (filterResponse && filterResponse.counterparty && filterResponse.category && filterResponse.amount && filterResponse.date) {
                this.filterOptions = filterResponse;
            } else {
                // notify("Failed to retrieve filters.", "error");
                console.error("[SpendingsPage] filters failed", filterResponse);
            }
        },  
        sortBy(column) {
            if (!this.waitingForResponse) {
                this.expandedIndex = null;
                if (this.apiFilters.sort_by === column) {
                    this.apiFilters.sort_order = this.apiFilters.sort_order === 'asc' ? 'desc' : 'asc';
                } else {
                    this.apiFilters.sort_by = column;
                    this.apiFilters.sort_order = 'desc';
                }
                this.apiFilters.offset = 0;
                this.transactions = [];
                this.fetchTransactions();
            }
        },
        loadMore() {
            if (!this.waitingForResponse) {
                this.apiFilters.offset += 1;  // Increment by 1 instead of by `limit`
                this.fetchTransactions();
            }
        },
        applyFilters(newFilterData) {
            this.expandedIndex = null;
            this.filterData = newFilterData;
            this.apiFilters.offset = 0;
            this.transactions = [];

            console.debug("[applyFilters] filterdata before going to api", this.filterData);

            // Set the filters values to the API filters
            // Sliders
            this.apiFilters.start_date = this.filterData.date.lowerLimit;
            this.apiFilters.end_date = this.filterData.date.upperLimit;
            this.apiFilters.min_amount = this.filterData.amount.lowerLimit;
            this.apiFilters.max_amount = this.filterData.amount.upperLimit;
            // Checkboxes
            this.apiFilters.counterparties = this.filterData.counterparty.selected;
            this.apiFilters.counterparty_inclusion_mode = this.filterData.counterparty.mode === 'include';
            this.apiFilters.categories = this.filterData.category.selected;
            this.apiFilters.category_inclusion_mode = this.filterData.category.mode === 'include';

            console.debug("[applyFilters] individual values", this.apiFilters.start_date, this.apiFilters.end_date, this.apiFilters.min_amount, this.apiFilters.max_amount);
            
            this.fetchTransactions();
        },
        refreshTable() {
            this.expandedIndex = null;
            this.apiFilters.offset = 0;
            this.transactions = [];
            this.fetchTransactions();
            this.fetchFilters();
        },
        convertToEur(amount) {
            return convert.toEur(amount);
        },
        convertToFiDate(date, format) {
            return convert.toFiDate(date, format);
        }
    },
    async mounted() {
        const loadingLimit = localStorage.getItem("transactions_load_limit");
        if (loadingLimit) {
            this.apiFilters.limit = Number(loadingLimit);
        }
        this.refreshTable();
    },
};
</script>

  
<style>
/* .transactions-holder { */
    /* Replaced the "table" element */
/* } */

.count-row {
    display: flex;
    align-items: center;
    justify-content: end;
    color: var(--color-text-lighter);
    margin: var(--spacing-sm) 0;
}

.transaction-row {
    display: flex;
}

.transaction-cell  {
    white-space: nowrap;
    padding: var(--spacing-sm) var(--spacing-sm);
    vertical-align: top;
    color: var(--color-text-light);
}

/* - - - - Different columns - - - - - */
.transaction-row .column-date {
    /* width: 150px; */
    max-width: 80px;
    min-width: 80px;
    flex: 1;
    justify-content: end;
    text-align: end;
}
.transaction-row .column-counterparty {
    /* width: 250px; */
    min-width: 145px;   /* Min width so that the header doesn't get squished */
    flex: 3;
    overflow: hidden;
    text-align: start;
    color: var(--color-text);
}
.transaction-row .column-category {
    /* width: 275px; */
    min-width: 115px;   /* Min width so that the header doesn't get squished */
    flex: 3;
    overflow: hidden;
    text-align: start;
    padding-right: 0;
}
.transaction-row .column-amount {
    /* width: 150px; */
    min-width: 100px;   /* Min width so that the header doesn't get squished */
    max-width: 100px;
    flex: 1;
    overflow: hidden;
    text-align: end;
    justify-content: end;
    font-weight: 500;
    padding-left: 0;
}
.transaction-row .column-notes {
    /* width: 200px; */
    flex: 7;
    overflow: hidden;
}

@media (max-width: 777px) {
    .transaction-row .column-notes {
        display: none;
    }
}
@media (max-width: 555px) {
    .transaction-row .column-category {
        display: none;
    }
    .transaction-row .column-amount {
        padding-left: var(--spacing-sm);
    }

}


.transaction-headers > div {
    /* padding: 6px var(--spacing-sm); */
    color: var(--color-text);
    user-select: none;
    font-weight: 700 !important;
    /* background-color: var(--color-background-th-row); */
}
.transaction-headers > div {
    cursor: pointer;
    display: flex;
    align-items: center; /* Aligns items vertically */
    justify-content: left; /* Optional: Center horizontally */
    gap: 0.5rem; /* Adds spacing between text and icon */
    padding: 8px var(--spacing-sm);
    border-radius: var(--border-radius-small);
    z-index: 1;
}
.transaction-headers > div svg {
    fill: var(--color-text-lighter)
} .pointer-device .transaction-headers > div:hover svg {
    fill: var(--color-text)
} .pointer-device .transaction-headers > div:active svg {
    fill: var(--color-text-bold)
} .transaction-headers > div.active svg {
    fill: var(--color-primary)
} .pointer-device .transaction-headers > div.active:hover svg {
    fill: var(--color-primary-hover)
} .pointer-device .transaction-headers > div.active:active svg {
    fill: var(--color-primary-active)
}

.loading-placeholder {
    height: 27px;
    border-radius: var(--border-radius-small);
}
.column-category .loading-placeholder {
    margin-right: var(--spacing-md) !important;
}
@keyframes loading-wave {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

.no-transactions-found {
    /* min-height: 200px; */
    padding-top: var(--spacing-xl);
    padding-bottom: var(--spacing-xl);
    margin-top: var(--spacing-sm);
    background-color: var(--color-background-card);
    border-radius: var(--border-radius-medium);
}


/* TEMPORARY REMAKE THESE ONE DAY */
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

.load-more {
    margin-top: var(--spacing-md);
    width: 50%;
}

</style>
