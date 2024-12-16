<template>
    <div id="spendings-page">
        <!-- Holder for temp icons so that vue doesn't complain -->
        <div style="display: none;">
            <IconSortDown/>
            <IconSortUp/>
        </div>

        <h1>Spendings page</h1>
        <p> Descriptive text about the spendings page that will be longer 
            and more detailed in the future possibly but that is uncertain 
            so don't quote me on that or anything else I have written in 
            this or anywhere else on the website. One liners babyyyy...
        </p>

        <FilterSettings v-if="showFilters" @close="showFilters = false" fullscreen-mode="true"/>

        <button class="color-primary filter-button" @click="this.showFilters = !this.showFilters;"> 
            <IconFilter size="20px" color="var(--color-text-white)" colorHover="var(--color-text-white-hover)"/> 
            Filter
        </button>

        <table>
            <thead>
                <tr>
                    <th @click="sortEntries('date')" class="column-date">
                        <div class="header-content">
                            Date
                            <component
                                :is="sortIcons.date"
                                :color="sortColumn === 'date' ? activeColor : inactiveColor"
                                :colorHover="sortColumn === 'date' ? activeHoverColor : inactiveHoverColor"
                                size="20px"
                            />
                        </div>
                    </th>
                    <th @click="sortEntries('counterparty')" class="column-counterparty">
                        <div class="header-content">
                            Counterparty
                            <component
                                :is="sortIcons.counterparty"
                                :color="sortColumn === 'counterparty' ? activeColor : inactiveColor"
                                :colorHover="sortColumn === 'counterparty' ? activeHoverColor : inactiveHoverColor"
                                size="20px"
                            />
                        </div>
                    </th>
                    <th @click="sortEntries('category')" class="column-category">
                        <div class="header-content">
                            Category
                            <component
                                :is="sortIcons.category"
                                :color="sortColumn === 'category' ? activeColor : inactiveColor"
                                :colorHover="sortColumn === 'category' ? activeHoverColor : inactiveHoverColor"
                                size="20px"
                            />
                        </div>
                    </th>
                    <th @click="sortEntries('amount')" class="column-amount">
                        <div class="header-content">
                            Amount
                            <component
                                :is="sortIcons.amount"
                                :color="sortColumn === 'amount' ? activeColor : inactiveColor"
                                :colorHover="sortColumn === 'amount' ? activeHoverColor : inactiveHoverColor"
                                size="20px"
                            />
                        </div>
                    </th>
                    <th @click="sortEntries('notes')" class="column-notes">
                        <div class="header-content">
                            Notes
                            <component
                                :is="sortIcons.notes"
                                :color="sortColumn === 'notes' ? activeColor : inactiveColor"
                                :colorHover="sortColumn === 'notes' ? activeHoverColor : inactiveHoverColor"
                                size="20px"
                            />
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody ref="placeForEntries">
                <SpendingsEntry
                    v-for="(entry, index) in entries"
                    :key="entry.entryId"
                    :data="entry"
                    :is-expanded="expandedIndex === index"
                    @toggle="toggleEntry(index)"
                />
            </tbody>
        </table>
    
        <!-- Button to load more entries -->
        <button class="center">Load more</button>
    </div>
</template>


<script>
    import IconFilter from '@/components/icons/IconFilter.vue';
    import SpendingsEntry from '../components/SpendingsEntry.vue';
    import IconSortBoth from '../components/icons/IconSortBoth.vue';
    import IconSortDown from '../components/icons/IconSortDown.vue';
    import IconSortUp from '../components/icons/IconSortUp.vue';
    import { getData } from '../utils/dataQuery';
    import FilterSettings from '@/components/FilterSettings.vue';
    
    export default {
        name: 'SpendingsPage',
        components: {
            SpendingsEntry,
            FilterSettings,
            IconSortBoth,
            IconSortDown,
            IconSortUp,
            IconFilter,
        },
        data() {
            return {
                entries: getData(),
                showFilters: false,
                sortColumn: 'date',     // Default to date 
                sortDirection: 'desc',  // Default to descending
                inactiveColor: 'var(--color-text-lighter)',
                inactiveHoverColor: 'var(--color-text-bold)',
                activeColor: 'var(--color-primary)',
                activeHoverColor: 'var(--color-primary-hover)',
                sortIcons: {
                    date: IconSortDown, // Default to date 
                    counterparty: IconSortBoth,
                    category: IconSortBoth,
                    amount: IconSortBoth,
                    notes: IconSortBoth,
                },
                expandedIndex: null, // Track which entry is expanded
            };
        },
        methods: {
            toggleEntry(index) {
                // Toggle the expanded state of the clicked entry
                this.expandedIndex = this.expandedIndex === index ? null : index;
            },

            sortEntries(column) {
                // Close entries when sorting
                this.toggleEntry(-1);

                // If no column is given, use the previous column and direction
                if (!column) {
                    column = this.sortColumn;
                } else {
                    if (this.sortColumn === column) {
                        // Toggle direction if the same column is clicked
                        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
                    } else {
                        // Change column and default to 'desc' when switching
                        this.sortColumn = column;
                        this.sortDirection = 'desc';
                    }
                }

                // Update icons
                Object.keys(this.sortIcons).forEach((key) => {
                    if (key === column) {
                        this.sortIcons[key] =
                            this.sortDirection === 'asc' ? IconSortUp : IconSortDown;
                    } else {
                        this.sortIcons[key] = IconSortBoth;
                    }
                });

                // Sort the entries based on the selected column and direction
                this.entries.sort((a, b) => {
                    let valueA = a[column];
                    let valueB = b[column];

                    // Handle date comparison
                    if (valueA instanceof Date && valueB instanceof Date) {
                        return this.sortDirection === 'asc'
                            ? valueA - valueB
                            : valueB - valueA;
                    }

                    // Handle sorting by 'amount' (where categories are arrays of objects)
                    if (column === 'amount') {
                        // Map direction to numerical values for sorting
                        const getDirectionMultiplier = (direction) => direction === 'income' ? 1 : -1;

                        // Assuming we need the first category's amount for sorting
                        const amountA = a.categories[0]?.amount || 0; // Fallback to 0 if no amount
                        const amountB = b.categories[0]?.amount || 0;

                        return this.sortDirection === 'asc'
                            ? (amountA * getDirectionMultiplier(a.direction)) - (amountB * getDirectionMultiplier(b.direction))
                            : (amountB * getDirectionMultiplier(b.direction)) - (amountA * getDirectionMultiplier(a.direction));
                    }

                    // Handle sorting by 'category' (the first category in the array for comparison)
                    if (column === 'category') {
                        const categoryA = a.categories[0]?.category || '';
                        const categoryB = b.categories[0]?.category || '';

                        return this.sortDirection === 'asc'
                            ? categoryA.localeCompare(categoryB)
                            : categoryB.localeCompare(categoryA);
                    }

                    // Handle numerical comparison (e.g. amount in other columns)
                    if (typeof valueA === 'number' && typeof valueB === 'number') {
                        return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
                    }

                    // Handle string comparison (counterparty, category, notes)
                    if (typeof valueA === 'string' && typeof valueB === 'string') {
                        return this.sortDirection === 'asc'
                            ? valueA.localeCompare(valueB)
                            : valueB.localeCompare(valueA);
                    }

                    return 0; // If categories don't match or are uncomparable, leave unchanged
                });
            }
        },
        mounted() {
            this.sortEntries();
        }
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

.filter-button {
    margin-right: 0;
    margin-left: auto;
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
  