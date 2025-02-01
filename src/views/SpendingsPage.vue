<template>
    <div id="spendings-page">

        <div class="content-width-medium">
            <h1>Spendings page</h1>
            <p> Welcome to the transactions page! Here, you'll find a comprehensive table listing all your logged transactions. This page not only provides a clear overview of your spending activity but also serves as a powerful tool for managing your financial records. You can easily add new transactions, edit existing ones, duplicate entries for efficiency, or remove items no longer needed. </p>
                
            <!-- <p>To streamline your search, the page also includes robust filtering options, allowing you to quickly locate specific transactions based on your criteria. Whether you're organizing your finances or diving into details, this page is designed to make managing your transactions simple and efficient.</p> -->
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

        <!-- Buttons in the bottom right corner -->
        <button class="color-primary sticky-corner-button" @click="this.showFilters = !this.showFilters;" style="margin-bottom: calc(var(--spacing-lg) * 1.5 + 52px);"> 
            <IconFilter size="28px"/> 
        </button>
        <router-link to="/spendings/newEntry">
            <button class="color-primary sticky-corner-button"> 
                <IconAdd size="28px"/> 
            </button>
        </router-link>

        <!-- The transactions table -->
        <div class="transactions-holder content-width-large">
            <div class="transaction-headers transaction-row">
                <div 
                    v-for="column in columns" 
                    :key="column.key" 
                    :class="[column.class, { active: apiFilters.sort_by === column.key, inactive: apiFilters.sort_by !== column.key }]" 
                    :style="{ cursor: waitingForResponse ? 'wait' : 'pointer' }"
                    @click="sortBy(column.key)"
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
                    <div class="transaction-row" v-for="i in Math.min(Number(this.apiFilters.limit), 15)" :key="i">
                        <div class="loading-placeholder transaction-cell column-date"></div>
                        <div class="loading-placeholder transaction-cell column-counterparty"></div>
                        <div class="loading-placeholder transaction-cell column-category"></div>
                        <div class="loading-placeholder transaction-cell column-amount"></div>
                        <div class="loading-placeholder transaction-cell column-notes"></div>
                    </div>
                </div>
            </div>
        </div>
    
        <!-- Button to load more entries -->
        <button 
            class="center" 
            @click="loadMore"
            :disabled="waitingForResponse"
            :style="{ cursor: waitingForResponse ? 'wait' : 'default' }"
            v-if="loadMoreButtonVisible"
        >
            Load more
        </button>
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
    // import { notify } from '@/utils/notification';
    
    export default {
        name: 'SpendingsPage',
        components: {
            SpendingsEntry,
            FilterSettings,
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
                    limit: 25,   // Fall back value if not set in localstorage
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
                waitingForResponse: false,
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
                // Disable buttons
                this.waitingForResponse = true;

                // Make the query
                const response = await api.getTransactions(this.apiFilters);
                if (response && response.transactions) {
                    // Detect if the user managed to send an another request before we got an answer from the first
                    // If they did just replace with the new data
                    if (response.offset == 0) {
                        this.transactions = [...response.transactions];
                    } else {    // If not add to it
                        this.transactions = [...this.transactions, ...response.transactions];
                    }
                    
                    // Make the loading button active since we got an answer
                    this.waitingForResponse = false;

                    // If there are more entries show load more button
                    this.loadMoreButtonVisible = response.hasMore;

                } else {
                    //i notify("Failed to retrieve transactions.", "error");
                    console.error("[SpendingsPage] response && response.Values failed");
                }
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
                    this.apiFilters.offset += this.apiFilters.limit;
                    this.fetchTransactions();
                }
            },
            applyFilters(newFilterData) {
                this.expandedIndex = null;
                this.filterData = newFilterData;
                this.apiFilters.offset = 0;
                this.transactions = [];

                console.log("[SpendingsPage] filterdata before to api", this.filterData);

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

                console.log("[SpendingsPage] individual values", this.apiFilters.start_date, this.apiFilters.end_date, this.apiFilters.min_amount, this.apiFilters.max_amount);
                
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
            const loadingLimit = localStorage.getItem("transactionsLoadedAtOnce");
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
    /* display: flex;
    flex-direction: row; */
    display: flex;
}
.transaction-row > div {
    height: 25px;
    transition: height 0.2s ease-out,
                mask-size 0.2s ease-out;
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


.transaction-headers {
    /* padding: 6px var(--spacing-sm); */
    color: var(--color-text);
    user-select: none;
    font-weight: 700;
    /* background-color: var(--color-background-th-row); */
}
.transaction-headers > div {
    cursor: pointer;
    display: flex;
    align-items: center; /* Aligns items vertically */
    justify-content: left; /* Optional: Center horizontally */
    gap: 0.5rem; /* Adds spacing between text and icon */
    padding: 8px var(--spacing-sm);
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
    background: linear-gradient(
        90deg,
        var(--color-background-tr-active) 20%,
        var(--color-background-tr-hover) 50%,
        var(--color-background-tr-active) 80%
    );
    background-size: 200% 100%;
    animation: highlight-wave 2s infinite linear;
    border-radius: var(--border-radius-small);
    margin: calc(var(--spacing-sm) + 1px);  /* 2px for border */
}
@keyframes highlight-wave {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}


</style>
