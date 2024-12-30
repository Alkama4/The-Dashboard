<template>
    <div id="spendings-page">
        <!-- Holder for temp icons so that vue doesn't complain -->
        <div style="display: none;">
            <IconSortDown/>
            <IconSortUp/>
        </div>

        <h1>Spendings page</h1>
        <p> Descriptive text about the spendings page that will be longer 
            and more detailed in the future, possibly, but that is uncertain 
            so don't quote me on that or anything else I have written in 
            this or anywhere else on the website. One liners babyyyy...
        </p>

        <FilterSettings 
            v-if="showFilters" 
            @close="showFilters = false" 
            @apply="applyFilters"
            fullscreen-mode="true"
            :filterData="filterData"
            :filterOptions="filterOptions"
        />

        <button class="color-primary sticky-corner-button" @click="this.showFilters = !this.showFilters;" style="margin-bottom: calc(var(--spacing-lg) * 1.5 + 52px);"> 
            <IconFilter size="20px" color="var(--color-text-white)" colorHover="var(--color-text-white-hover)"/> 
        </button>
        <router-link to="/newentry">
            <button class="color-primary sticky-corner-button" @click="this.showFilters = !this.showFilters;"> 
                <IconAdd size="20px" color="var(--color-text-white)" colorHover="var(--color-text-white-hover)"/> 
            </button>
        </router-link>

        <table>
            <thead>
                <tr>
                    <th class="column-date" @click="sort('date')">
                        <div class="header-content">
                            Date
                            <component
                                :is="getSortIcon('date')"
                                :color="apiFilters.sort_by === 'date' ? activeColor : inactiveColor"
                                :colorHover="apiFilters.sort_by === 'date' ? activeHoverColor : inactiveHoverColor"
                                size="20px"
                            />
                        </div>
                    </th>
                    <th class="column-counterparty" @click="sort('counterparty')">
                        <div class="header-content">
                            Counterparty
                            <component
                                :is="getSortIcon('counterparty')"
                                :color="apiFilters.sort_by === 'counterparty' ? activeColor : inactiveColor"
                                :colorHover="apiFilters.sort_by === 'counterparty' ? activeHoverColor : inactiveHoverColor"
                                size="20px"
                            />
                        </div>
                    </th>
                    <th class="column-category" @click="sort('category')">
                        <div class="header-content">
                            Category
                            <component
                                :is="getSortIcon('category')"
                                :color="apiFilters.sort_by === 'category' ? activeColor : inactiveColor"
                                :colorHover="apiFilters.sort_by === 'category' ? activeHoverColor : inactiveHoverColor"
                                size="20px"
                            />
                        </div>
                    </th>
                    <th class="column-amount" @click="sort('amount')">
                        <div class="header-content">
                            Amount
                            <component
                                :is="getSortIcon('amount')"
                                :color="apiFilters.sort_by === 'amount' ? activeColor : inactiveColor"
                                :colorHover="apiFilters.sort_by === 'amount' ? activeHoverColor : inactiveHoverColor"
                                size="20px"
                            />
                        </div>
                    </th>
                    <th class="column-notes" @click="sort('notes')">
                        <div class="header-content">
                            Notes
                            <component
                                :is="getSortIcon('notes')"
                                :color="apiFilters.sort_by === 'notes' ? activeColor : inactiveColor"
                                :colorHover="apiFilters.sort_by === 'notes' ? activeHoverColor : inactiveHoverColor"
                                size="20px"
                            />
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody ref="placeForEntries">
                <SpendingsEntry
                    v-for="(transaction, index) in transactions"
                    :key="transaction.transactionID"
                    :transaction="transaction"
                    :is-expanded="expandedIndex === index"
                    @toggle="toggleEntry(index)"
                />
            </tbody>
        </table>
    
        <!-- Button to load more entries -->
        <button class="center" @click="loadMore">Load more</button>
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
    import { notify } from '@/utils/notification';
    
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
                    limit: 50,
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
                }
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
                // Toggle the expanded state of the clicked entry
                this.expandedIndex = this.expandedIndex === index ? null : index;
            },
            async fetchTransactions() {
                const response = await api.getTransactions(this.apiFilters);
                if (response && response.transactions) {
                    this.transactions = [...this.transactions, ...response.transactions];
                } else {
                    notify("Failed to retrieve transactions.", "error");
                    console.error("[SpendingsPage] response && response.Values failed");
                }
            },
            sort(column) {
                if (this.apiFilters.sort_by === column) {
                    this.apiFilters.sort_order = this.apiFilters.sort_order === 'asc' ? 'desc' : 'asc';
                } else {
                    this.apiFilters.sort_by = column;
                    this.apiFilters.sort_order = 'desc';
                }
                this.apiFilters.offset = 0;
                this.transactions = [];
                this.fetchTransactions();
            },
            loadMore() {
                this.apiFilters.offset += this.apiFilters.limit;
                this.fetchTransactions();
            },
            applyFilters(newFilterData) {
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
        },
        async mounted() {
            this.fetchTransactions();

            // Get filters and pass them to the FilterSettings component
            const filterResponse = await api.getFilters();
            if (filterResponse && filterResponse.counterparty && filterResponse.category && filterResponse.amount && filterResponse.date) {

                // Log the categories data
                console.log("[Filters] All:", filterResponse);
                
                // Log individual things
                console.log("[Filters] Counterparty:", filterResponse.counterparty);
                console.log("[Filters] Category:", filterResponse.category);
                console.log("[Filters] Amount:", filterResponse.amount);
                console.log("[Filters] Date:", filterResponse.date);

                this.filterOptions = filterResponse;
            } else {
                notify("Failed to retrieve filters.", "error");
                console.error("[SpendingsPage] filters failed");
            }
        },
    };
</script>

  
<style scoped>
table {
    margin-inline: auto;
    border-collapse: collapse;
}
th {
    cursor: pointer;
    padding: 6px var(--spacing-sm);
    text-align: start;
    color: var(--color-text);
    /* font-weight: 900; */
    user-select: none;
    border: 0px;
    /* background-color: var(--color-background-th-row); */
}
th .header-content {
    display: flex;
    align-items: center; /* Aligns items vertically */
    justify-content: left; /* Optional: Center horizontally */
    gap: 0.5rem; /* Adds spacing between text and icon */
}
th.column-date {
    justify-content: center;
    display: flex;
}
th.column-amount {
    text-align: end;
}

/* Round corners for th row */
/* th:first-child {
    border-top-left-radius: var(--border-radius-small); 
    border-bottom-left-radius: var(--border-radius-small);
}
th:last-child {
    border-bottom-right-radius: var(--border-radius-small); 
    border-top-right-radius: var(--border-radius-small); 
} */

@media (max-width: 777px) {
    table th:nth-child(5) {    /* Notes */
        display: none;
    }
    /* th:nth-child(4) {
        border-bottom-right-radius: var(--border-radius-small); 
        border-top-right-radius: var(--border-radius-small); 
    } */
}
@media (max-width: 600px) {
    table th:nth-child(3) {     /* categories */
        display: none;
    }
}


</style>
