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
            this or anywhere else on the website. One liners babyyyy...</p>
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
                    <th @click="sortEntries('type')" class="column-type">
                        <div class="header-content">
                            Type
                            <component
                                :is="sortIcons.type"
                                :color="sortColumn === 'type' ? activeColor : inactiveColor"
                                :colorHover="sortColumn === 'type' ? activeHoverColor : inactiveHoverColor"
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
        <button @click="loadMultipleEntries(5)" class="center">Load more</button>
    </div>
</template>


<script>
    import SpendingsEntry from '../components/SpendingsEntry.vue';
    import IconSortBoth from '../components/icons/IconSortBoth.vue';
    import IconSortDown from '../components/icons/IconSortDown.vue';
    import IconSortUp from '../components/icons/IconSortUp.vue';
    import { getData } from '../utils/dataQuery';
    
    export default {
        name: 'SpendingsPage',
        components: {
            SpendingsEntry,
            IconSortBoth,
            IconSortDown,
            IconSortUp,
        },
        data() {
            return {
                entries: getData(),
                sortColumn: 'date',     // Default to date 
                sortDirection: 'desc',  // Default to descending
                inactiveColor: 'var(--color-text-hidden)',
                inactiveHoverColor: 'var(--color-text-light)',
                activeColor: 'var(--color-primary)',
                activeHoverColor: 'var(--color-primary-hover)',
                sortIcons: {
                    date: IconSortDown, // Default to date 
                    counterparty: IconSortBoth,
                    type: IconSortBoth,
                    amount: IconSortBoth,
                    notes: IconSortBoth,
                },
                expandedIndex: null, // Track which entry is expanded
            };
        },
        methods: {
            validateID(id) {
                // Ensure the ID is unique
                while (this.entries.some(entry => entry.id === id)) {
                    id++;  // Increment the ID until it's unique
                }
                return id;
            },

            loadEntry() {
                const randomString = (length) => Math.random().toString(36).substring(2, 2 + length);
                const newEntry = {
                    entryId: this.validateID(this.entries.length + 1), // Incremental ID that is validated
                    direction: (Math.random() < 0.5 ? "expense" : "income"),
                    date: new Date(
                        2000 + Math.floor(Math.random() * 23), // Random year between 2000 and 2023
                        Math.floor(Math.random() * 12),       // Random month
                        Math.floor(Math.random() * 28) + 1    // Random day
                    ),
                    counterparty: randomString(6), // Random string of 6 characters
                    type: randomString(5),         // Random string of 5 characters
                    amount: Math.floor(Math.random() * 1000), // Random amount between 0 and 999
                    notes: randomString(15),       // Random string of 15 characters
                };

                // Add the new entry to the existing list
                this.entries.push(newEntry);
            },

            loadMultipleEntries(count) {
                for (let i = 0; i < count; i++) {
                    this.loadEntry();  // Generate one random entry at a time
                }
                this.sortEntries();
            },

            toggleEntry(index) {
                // Toggle the expanded state of the clicked entry
                this.expandedIndex = this.expandedIndex === index ? null : index;
            },

            sortEntries(column) {
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

                    // Handle sorting by 'amount' (where types are arrays of objects)
                    if (column === 'amount') {
                        // Map direction to numerical values for sorting
                        const getDirectionMultiplier = (direction) => direction === 'income' ? 1 : -1;

                        // Assuming we need the first type's amount for sorting
                        const amountA = a.types[0]?.amount || 0; // Fallback to 0 if no amount
                        const amountB = b.types[0]?.amount || 0;

                        return this.sortDirection === 'asc'
                            ? (amountA * getDirectionMultiplier(a.direction)) - (amountB * getDirectionMultiplier(b.direction))
                            : (amountB * getDirectionMultiplier(b.direction)) - (amountA * getDirectionMultiplier(a.direction));
                    }

                    // Handle sorting by 'type' (the first type in the array for comparison)
                    if (column === 'type') {
                        const typeA = a.types[0]?.type || ''; // Get the first type
                        const typeB = b.types[0]?.type || '';

                        return this.sortDirection === 'asc'
                            ? typeA.localeCompare(typeB)
                            : typeB.localeCompare(typeA);
                    }

                    // Handle numerical comparison (e.g. amount in other columns)
                    if (typeof valueA === 'number' && typeof valueB === 'number') {
                        return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
                    }

                    // Handle string comparison (counterparty, type, notes)
                    if (typeof valueA === 'string' && typeof valueB === 'string') {
                        return this.sortDirection === 'asc'
                            ? valueA.localeCompare(valueB)
                            : valueB.localeCompare(valueA);
                    }

                    return 0; // If types don't match or are uncomparable, leave unchanged
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
    padding: var(--spacing-xs) var(--spacing-sm);
    text-align: start;
    color: var(--color-text);
    /* font-weight: 900; */
    user-select: none;
    vertical-align: middle; /* Ensures proper alignment in table layout */
}
th .header-content {
    display: flex;
    align-items: center; /* Aligns items vertically */
    justify-content: left; /* Optional: Center horizontally */
    gap: 0.5rem; /* Adds spacing between text and icon */
}
th.column-date {
    text-align: center;
}
th.column-amount {
    text-align: end;
}
@media (max-width: 777px) {
    table th:nth-child(5) {    /* Notes */
        display: none;
    }
}
@media (max-width: 600px) {
    table th:nth-child(3) {     /* Type */
        display: none;
    }
}

</style>
  