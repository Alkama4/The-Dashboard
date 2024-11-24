<template>
    <form @submit.prevent="handleSubmit">
        <div class="form-wide">
            <label for="direction">Direction:</label><br>
            <input 
                type="radio" 
                id="radioExpense" 
                name="direction" 
                value="expense" 
                v-model="formData.direction" 
            />
            <label for="radioExpense" class="label-normal-text">Expense</label>
            
            <input 
                type="radio" 
                id="radioIncome" 
                name="direction" 
                value="income" 
                v-model="formData.direction" 
            />
            <label for="radioIncome" class="label-normal-text">Income</label>
        </div>
        <div>
            <label for="date">Date:</label><br>
            <input v-model="formattedDate" id="date" type="date" required/>
        </div>
        <div>
            <label for="amount">Amount:</label><br>
            <input v-model="formData.amount" id="amount" type="number" step="0.01" placeholder="Type value here..." required/>
        </div>
        <div>
            <label for="type">Type:</label><br>
            <v-select v-model="formData.type" label="type" :options="spendingsData.typeOptions" taggable></v-select>
        </div>
        <div>
            <label for="counterparty">Counterparty:</label><br>
            <v-select v-model="formData.counterparty" label="counterparty" :options="spendingsData.counterpartyOptions" taggable></v-select>
        </div>
        <div class="form-wide">
            <label for="notes">Notes:</label><br>
            <textarea v-model="formData.notes" id="notes" placeholder="Add notes/description here..."/>
        </div>
        <button type="submit" class="color-primary center form-wide">Submit</button>
    </form>
</template>


<script>
export default {
    props: {
        initialData: {
            type: Object,
            default: () => ({ entryId: '', direction: 'expense', date: '', amount: '', type: '', counterparty: '', notes: '' })
        }
    },
    emits: ['submit'],
    data() {
        return {
            formData: { ...this.initialData }, // Automatically populate with initialData
        };
    },
    methods: {
        handleSubmit() {
            if (!this.formData.type) {
                alert('Type is required!');
                return;
            }

            if (!this.formData.counterparty) {
                alert('Counterparty is required!');
                return;
            }

            this.$emit('submit', this.formData); // Send the populated formData to parent
        },
    },
    computed: {
        formattedDate() {
            // Check if formData.date is a valid date object
            const returnDate = this.formData.date ? this.formData.date : new Date();
            return returnDate.toISOString().split('T')[0];
        },
        spendingsData() {
            // Update to get the data
            const data = [
                { id: 1, direction: false, date: new Date('2023-12-24'), counterparty: "Cotton Club", type: "Opiskelija lounas", amount: 2.9, notes: "Hernekeittoa" },
                { id: 2, direction: true, date: new Date('2023-12-24'), counterparty: "Kela", type: "Asumistuki", amount: 99.99, notes: "" },
                { id: 3, direction: false, date: new Date('2023-12-25'), counterparty: "K-Citymarket", type: "Yleinen eläminen", amount: 8.75, notes: "Jotaki mikä nyt voitas luokitella yleisen elämisen luokkaan" },
                { id: 4, direction: false, date: new Date('2023-12-28'), counterparty: "Minimani", type: "Ruokaostokset", amount: 20.24, notes: "safkaa" },
                { id: 69, direction: false, date: new Date('2023-12-26'), counterparty: "Supermarket", type: "Sekalainen", amount: 42, notes: "Vähään kaikkea kulutustavarasta ruoasta herkkuihin." },
                { id: 5, direction: false, date: new Date('2023-12-29'), counterparty: "Cotton Club", type: "Kulutustavara", amount: 12.46, notes: "Hyvää ruokaa" },
                { id: 6, direction: false, date: new Date('2023-12-31'), counterparty: "S-Market", type: "Herkut", amount: 1.99, notes: "Mässy pussi" },
                { id: 7, direction: false, date: new Date('2024-1-1'), counterparty: "Minimani", type: "Ruokaostokset", amount: 15.96, notes: "Ruokaa ja palaa" },
                { id: 689, direction: false, date: new Date('2024-2-3'), counterparty: "Seppälän valokuvaamo", type: "Yleinen eläminen", amount: 2345.67, notes: "Mahollisimman pitkä entry jotta voidaan testatat rajoja, sekä nähään miltä näyttää kun joku unohtuu kertomaan elämän tarinaansa." },
            ];

            // Helper function to count frequency of items
            const countFrequency = (arr, key) => {
                return arr.reduce((acc, item) => {
                    const value = item[key];
                    acc[value] = acc[value] ? acc[value] + 1 : 1;
                    return acc;
                }, {});
            };

            // Count frequency of 'type' and 'counterparty'
            const typeFrequency = countFrequency(data, 'type');
            const counterpartyFrequency = countFrequency(data, 'counterparty');

            // Function to sort by frequency
            const sortByFrequency = (obj) => {
                return Object.entries(obj)
                    .sort(([, a], [, b]) => b - a)  // Sort by frequency, descending
                    .map(([key]) => key);           // Get sorted keys
            };

            // Sort the 'type' and 'counterparty' options by frequency
            const sortedTypes = sortByFrequency(typeFrequency);
            const sortedCounterparties = sortByFrequency(counterpartyFrequency);

            // Return the sorted options for the select
            return {
                typeOptions: sortedTypes,
                counterpartyOptions: sortedCounterparties
            };
        }
    }
};
</script>


<style>
form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-inline: 2px;
    gap: var(--spacing-md) var(--spacing-md);
}
.form-wide {
    grid-column: 1 / span 2;
}
@media (max-width: 666px) {
    form {
        grid-template-columns: 1fr !important;
    }
    .form-wide {
        grid-column: 1;
    }
}

label {
    font-weight: 600;
    color: var(--color-text);
}
.label-normal-text {
    color: var(--color-text-light);
    font-weight: 400;
}

/* v-select */
.vs__dropdown-toggle {
    background-color: var(--color-background-input);
    border-width: 1px;
    border-style: solid;
    border-radius: var(--border-radius-small);
    border-color: var(--color-border);
    color: var(--color-text-light);
}
.v-select .vs__placeholder {  /* Doesn't work */
    color: var(--color-text-lighter)
}
.vs__selected {
    color: var(--color-text-light);
}
.vs__dropdown-menu {
    color: var(--color-text-light);
    background-color: var(--color-background-input);
    border-width: 1px;
    border-style: solid;
    border-bottom-left-radius: var(--border-radius-small);
    border-bottom-right-radius: var(--border-radius-small);
    border-color: var(--color-border);
}
.vs__actions {
    padding-right: 10px;
}
.vs__clear, .vs__open-indicator{
    fill: var(--color-text-lighter);
}
.vs__dropdown-option--highlight {
    background-color: var(--color-primary-hover);
    color: var(--color-text-white-hover);
}

</style>