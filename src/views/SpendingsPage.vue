<template>
    <div id="spendings-page">
        <h1>Spendings page</h1>
        <p> Descriptive text about the spendings page that will be longer 
            and more detailed in the future possibly but that is uncertain 
            so don't quote me on that or anything else I have written in 
            this or anywhere else on the website. One liners babyyyy...</p>
        <table>
            <thead>
                <tr>
                    <th class="column-date">Date</th>
                    <th class="column-counterparty">Counterparty</th>
                    <th class="column-type">Type</th>
                    <th class="column-amount">Amount</th>
                    <th class="column-notes">Notes</th>
                </tr>
            </thead>
            <tbody ref="placeForEntries">
                <!-- Dynamically rendering SpendingsEntry components -->
                <SpendingsEntry
                    v-for="entry in entries"
                    :key="entry.id"
                    :id="entry.id"
                    :isIncome="entry.isIncome"
                    :date="entry.date"
                    :counterparty="entry.counterparty"
                    :type="entry.type"
                    :amount="entry.amount"
                    :notes="entry.notes"
                />
            </tbody>
        </table>
    
        <!-- Button to load more entries -->
        <button @click="loadMoreEntries()" class="center">Load more</button>
    </div>
</template>
  
<script>
    import SpendingsEntry from '../components/SpendingsEntry.vue';
    
    export default {
        name: 'SpendingsPage',
        components: {
            SpendingsEntry,
        },
        data() {
            return {
                // Initial entries to display, wipe when we get to that point
                entries: [
                { id: 1, isIncome: false, date: new Date('2023-12-24'), counterparty: "Cotton Club", type: "Opiskelija lounas", amount: 2.9, notes: "Hernekeittoa" },
                    { id: 2, isIncome: true, date: new Date('2023-12-24'), counterparty: "Kela", type: "Asumistuki", amount: 99.99, notes: "" },
                    { id: 3, isIncome: false, date: new Date('2023-12-25'), counterparty: "K-Citymarket", type: "Yleinen eläminen", amount: 8.75, notes: "Jotaki mikä nyt voitas luokitella yleisen elämisen luokkaan" },
                    { id: 4, isIncome: false, date: new Date('2023-12-28'), counterparty: "Minimani", type: "Ruokaostokset", amount: 20.24, notes: "safkaa" },
                    { id: 69, isIncome: false, date: new Date('2023-12-26'), counterparty: "Supermarket", type: "Sekalainen", amount: 42, notes: "Vähään kaikkea kulutustavarasta ruoasta herkkuihin." },
                    { id: 5, isIncome: false, date: new Date('2023-12-29'), counterparty: "Cotton Club", type: "Kulutustavara", amount: 12.46, notes: "Hyvää ruokaa" },
                    { id: 6, isIncome: false, date: new Date('2023-12-31'), counterparty: "S-Market", type: "Herkut", amount: 1.99, notes: "Mässy pussi" },
                    { id: 7, isIncome: false, date: new Date('2024-1-1'), counterparty: "Minimani", type: "Ruokaostokset", amount: 15.96, notes: "Ruokaa ja palaa" },
                    { id: 689, isIncome: false, date: new Date('2024-2-3'), counterparty: "Seppälän valokuvaamo", type: "Yleinen eläminen", amount: 2345.67, notes: "Mahollisimman pitkä entry jotta voidaan testatat rajoja, sekä nähään miltä näyttää kun joku unohtuu kertomaan elämän tarinaansa." },
                ],
            };
        },
        methods: {
            // Update this to fethc the data later
            loadMoreEntries() {
                const newEntries = [
                    {
                        id: 70,
                        isIncome: false,
                        date: new Date('2000-1-1'),
                        counterparty: "Kauppa",
                        type: "Ostos",
                        amount: 10,
                        notes: "Kuvaus"
                    },
                ];
        
                // Add the new entries to the existing list
                this.entries.push(...newEntries);
            }
        }
    };
</script>
  
<style>

    /* Design overhaul please */
    /* Design overhaul please */
    /* Design overhaul please */
    /* Design overhaul please */
    /* Design overhaul please */
    /* Design overhaul please */
    table {
        margin-inline: auto;
        border-collapse: collapse;
        overflow: scroll;
        max-width: 100%;
    }

    #spendings-page .spendings-summary td, #spendings-page th {
        white-space: nowrap;
        padding-top: var(--spacing-xs);
        padding-bottom: var(--spacing-xs);
        padding-inline: var(--spacing-sm);
        vertical-align: top;
    }
    #spendings-page .spendings-summary td {
        font-weight: 300;
    }

    /* Individual columns */
    #spendings-page .spendings-summary .column-date {
        text-align: end;
        width: fit-content;
    }
    #spendings-page .spendings-summary .column-counterparty {
        text-align: start;
        max-width: 140px;
        overflow: hidden;
    }    
    #spendings-page .spendings-summary .column-type {
        text-align: start;
        width: fit-content;
    }
    #spendings-page .spendings-summary .column-amount {
        text-align: end;
        width: fit-content;
        font-weight: 500;
    }
    #spendings-page .spendings-summary .column-notes {
        overflow: hidden;
    } #spendings-page .spendings-summary .column-notes div {
        transition: height 0.2s ease-out;
    } #spendings-page .spendings-summary .column-notes div div {
        white-space: normal;
        word-break: break-word;
        word-wrap: break-word;
        text-align: justify;
    }
    
    .column-with-overflow {
        color: var(--color-text);
        mask-image: linear-gradient(to right, var(--color-text) 80%, rgba(255, 255, 255, 0) 100%);
        mask-size: 100%;
        transition: mask-size 0.2s ease;
    }

    .column-with-overflow.hide-mask {
        mask-size: 125%;
    }

    @media (max-width: 777px) {
        table th:nth-child(5) {
            display: none;
        }
    }
    @media (max-width: 600px) {
        table th:nth-child(3) {
            display: none;
        }
    }
</style>
  