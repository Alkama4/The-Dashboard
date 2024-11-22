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
            </thead>
            <tbody ref="placeForEntries">
                <!-- Dynamically rendering SpendingsEntry components -->
                <SpendingsEntry
                    v-for="entry in entries"
                    :key="entry.id"
                    :id="entry.id"
                    :direction="entry.direction"
                    :date="entry.date"
                    :counterparty="entry.counterparty"
                    :type="entry.type"
                    :amount="entry.amount"
                    :notes="entry.notes"
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
                // Initial entries to display, wipe when we get to that point
                entries: [
                    { id: 1, direction: false, date: new Date('2023-12-24'), counterparty: "Cotton Club", type: "Opiskelija lounas", amount: 2.9, notes: "Hernekeittoa" },
                    { id: 2, direction: true, date: new Date('2023-12-24'), counterparty: "Kela", type: "Asumistuki", amount: 99.99, notes: "" },
                    { id: 3, direction: false, date: new Date('2023-12-25'), counterparty: "K-Citymarket", type: "Yleinen eläminen", amount: 8.75, notes: "Jotaki mikä nyt voitas luokitella yleisen elämisen luokkaan" },
                    { id: 4, direction: false, date: new Date('2023-12-28'), counterparty: "Minimani", type: "Ruokaostokset", amount: 20.24, notes: "safkaa" },
                    { id: 69, direction: false, date: new Date('2023-12-26'), counterparty: "Supermarket", type: "Sekalainen", amount: 42, notes: "Vähään kaikkea kulutustavarasta ruoasta herkkuihin." },
                    { id: 5, direction: false, date: new Date('2023-12-29'), counterparty: "Cotton Club", type: "Kulutustavara", amount: 12.46, notes: "Hyvää ruokaa" },
                    { id: 6, direction: false, date: new Date('2023-12-31'), counterparty: "S-Market", type: "Herkut", amount: 1.99, notes: "Mässy pussi" },
                    { id: 7, direction: false, date: new Date('2024-1-1'), counterparty: "Minimani", type: "Ruokaostokset", amount: 15.96, notes: "Ruokaa ja palaa" },
                    { id: 689, direction: false, date: new Date('2024-2-3'), counterparty: "Seppälän valokuvaamo", type: "Yleinen eläminen", amount: 2345.67, notes: "Mahollisimman pitkä entry jotta voidaan testatat rajoja, sekä nähään miltä näyttää kun joku unohtuu kertomaan elämän tarinaansa." },
                ],
                sortColumn: 'date',     // Default to date 
                sortDirection: 'desc',  // Default to descending
                inactiveColor: '#555',
                inactiveHoverColor: '#bbb',
                activeColor: 'var(--color-secondary)',
                activeHoverColor: 'color-mix(in srgb, var(--color-secondary) 50%, #fff 50%)',
                sortIcons: {
                    date: IconSortDown, // Default to date 
                    counterparty: IconSortBoth,
                    type: IconSortBoth,
                    amount: IconSortBoth,
                    notes: IconSortBoth,
                },
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

            // Update this to fetch the data later
            loadEntry() {
                const randomString = (length) => Math.random().toString(36).substring(2, 2 + length);
                const newEntry = {
                    id: this.validateID(this.entries.length + 1), // Incremental ID that is validated
                    direction: Math.random() < 0.5,
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

                    // Handle numerical comparison (amount)
                    if (column === 'amount') {
                        // Ensure sorting based on the amount and direction (income/expense)
                        return this.sortDirection === 'asc'
                            ? (a.amount * (a.direction ? 1 : -1)) - (b.amount * (b.direction ? 1 : -1))
                            : (b.amount * (b.direction ? 1 : -1)) - (a.amount * (a.direction ? 1 : -1));
                    }

                    // Handle numerical comparison (e.g. amount)
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
            },
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
    font-weight: 900;
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
  