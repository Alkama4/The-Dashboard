<template>
    <div id="spendings-page">

        <div class="content-width-medium">
            <h1>Spendings page</h1>
            <p> Welcome to the transactions page! Here, you'll find a comprehensive table listing all your logged transactions. This page not only provides a clear overview of your spending activity but also serves as a powerful tool for managing your financial records. You can easily add new transactions, edit existing ones, duplicate entries for efficiency, or remove items no longer needed. </p>
        </div>
            
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
        <ConfirmationModal 
            ref="deleteTransactionCM"
            header="Delete transaction"
            text="Are you sure you want to delete the transaction? This cannot be undone"
            affirmative-option="Delete transaction"
        />

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
                />
                <div v-if="waitingForResponse && apiFilters.offset === 0">
                    <div class="transaction-row" v-for="i in 15" :key="i">
                        <div class="transaction-cell column-date"><div class="loading-placeholder"></div></div>
                        <div class="transaction-cell column-counterparty"><div class="loading-placeholder"></div></div>
                        <div class="transaction-cell column-category"><div class="loading-placeholder"></div></div>
                        <div class="transaction-cell column-amount"><div class="loading-placeholder"></div></div>
                        <div class="transaction-cell column-notes"><div class="loading-placeholder"></div></div>
                    </div>
                </div>
                <div v-else-if="transactions.length == 0">
                    <div class="no-transactions-found content-not-found">
                        Looks like there's nothing here<br>
                        <span class="text-hidden">You either have no transactions or your filters excluded them.</span>
                    </div>
                </div>
            </div>
        </div>
    
        <!-- Button to load more entries -->
        <button 
            class="center" 
            @click="loadMore"
            :disabled="waitingForResponse"
            :class="{loading: waitingForResponse}"
            v-if="loadMoreButtonVisible"
        >
            Load more
        </button>

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


    </div>
</template>


<script>
import IconFilter from '@/components/icons/IconFilter.vue';
import SpendingsEntry from '../components/SpendingsEntry.vue';
import IconSortBoth from '../components/icons/IconSortBoth.vue';
import IconSortDown from '../components/icons/IconSortDown.vue';
import IconSortUp from '../components/icons/IconSortUp.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
import api from '@/utils/dataQuery';
import FilterSettings from '@/components/FilterSettings.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
// import { notify } from '@/utils/notification';

export default {
    name: 'SpendingsPage',
    components: {
        SpendingsEntry,
        FilterSettings,
        ConfirmationModal,
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
            inactiveColor: 'var(--color-text-lighter)',
            inactiveHoverColor: 'var(--color-text-bold)',
            activeColor: 'var(--color-primary)',
            activeHoverColor: 'var(--color-primary-hover)',
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
            loadMoreButtonVisible: false,
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
        async fetchTransactions() {
            this.waitingForResponse = true;

            // Use {standalone: true} as filter's when in a standalone build to avoid the query from
            // changing when the user plays with filters and not displaying anything.
            const standalone = process.env.VUE_APP_STANDALONE_BUILD == "true";
            const response = await api.getTransactions(standalone ? {} : this.apiFilters);
            if (response && response.transactions) {
                if (this.apiFilters.offset === 0) {
                    this.transactions = [...response.transactions];  // First page, reset
                } else {
                    this.transactions = [...this.transactions, ...response.transactions]; // Append new data
                }

                // If there are more entries, keep showing "Load More" button
                this.loadMoreButtonVisible = response.hasMore;
            } else {
                console.error("[SpendingsPage] Failed to retrieve transactions.");
            }
            this.waitingForResponse = false;
        },
        async fetchFilters() {
            // Get filters and pass them to the FilterSettings component
            const filterResponse = await api.getFilters();
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

            console.debug("[applyFilters] filterdata before to api", this.filterData);

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

            console.log("[applyFilters] individual values", this.apiFilters.start_date, this.apiFilters.end_date, this.apiFilters.min_amount, this.apiFilters.max_amount);
            
            this.fetchTransactions();
        },
        refreshTable() {
            this.expandedIndex = null;
            this.apiFilters.offset = 0;
            this.transactions = [];
            this.fetchTransactions();
            this.fetchFilters();
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

.transaction-row {
    display: flex;
}

.transaction-cell  {
    white-space: nowrap;
    padding: 8px var(--spacing-sm);
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
} .transaction-headers > div:hover svg {
    fill: var(--color-text)
} .transaction-headers > div:active svg {
    fill: var(--color-text-bold)
} .transaction-headers > div.active svg {
    fill: var(--color-primary)
} .transaction-headers > div.active:hover svg {
    fill: var(--color-primary-hover)
} .transaction-headers > div.active:active svg {
    fill: var(--color-primary-active)
}

.loading-placeholder {
    height: 25px;
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
    padding-top: var(--spacing-hg);
    padding-bottom: var(--spacing-hg);
    margin-top: var(--spacing-sm);
    background-color: var(--color-background-card);
    border-radius: var(--border-radius-medium);
}

</style>
