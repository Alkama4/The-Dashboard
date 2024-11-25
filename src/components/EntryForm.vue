<template>
    <form @submit.prevent="handleSubmit">
        <div class="grid-direction">
            <label for="direction">Direction:</label><br>
            <SliderToggle v-model="formData.direction" />
        </div>
        <div class="grid-date">
            <label for="date">Date:</label><br>
            <input v-model="formattedDate" id="date" type="date" required/>
        </div>
        <div class="grid-counterparty">
            <label for="counterparty">Counterparty:</label><br>
            <v-select v-model="formData.counterparty" label="counterparty" :options="spendingsData.counterpartyOptions" placeholder="Select counterparty..." taggable></v-select>
        </div>
        <div class="grid-amount">
            <label for="amount">Amount:</label><br>
            <input v-model="formData.amount" id="amount" type="number" step="0.01" placeholder="Type value..." required/>
        </div>
        <div class="grid-type">
            <label for="type">Type:</label><br>
            <v-select v-model="formData.type" label="type" :options="spendingsData.typeOptions" placeholder="Select type..." taggable></v-select>
        </div>
        <div class="grid-notes">
            <label for="notes">Notes:</label><br>
            <textarea v-model="formData.notes" id="notes" placeholder="Type notes/description..."/>
        </div>
        <button type="submit" class="color-primary center grid-submit">Submit</button>
    </form>
</template>


<script>
import SliderToggle from './SliderToggle.vue';  // Adjust path if necessary

export default {
    components: {
        SliderToggle
    },
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
            // Update to get the data (All we need is conterparty and type, maybe id to differentiate. Don't query all!)
            const data = [
                { entryId: 1, direction: "expense", date: new Date('2023-12-24'), counterparty: "Cotton Club", type: "Opiskelija lounas", amount: 2.9, notes: "Hernekeittoa" },
                { entryId: 2, direction: "income", date: new Date('2023-12-28'), counterparty: "Kela", type: "Asumistuki", amount: 99.99, notes: "" },
                { entryId: 3, direction: "expense", date: new Date('2023-12-25'), counterparty: "K-Citymarket", type: "Yleinen eläminen", amount: 8.75, notes: "Jotaki mikä nyt voitas luokitella yleisen elämisen luokkaan" },
                { entryId: 4, direction: "expense", date: new Date('2023-12-28'), counterparty: "Minimani", type: "Ruokaostokset", amount: 20.24, notes: "safkaa" },
                { entryId: 8, direction: "expense", date: new Date('2023-12-26'), counterparty: "Supermarket", type: "Sekalainen", amount: 42, notes: "Vähään kaikkea kulutustavarasta ruoasta herkkuihin." },
                { entryId: 5, direction: "expense", date: new Date('2023-12-29'), counterparty: "Cotton Club", type: "Kulutustavara", amount: 12.46, notes: "Hyvää ruokaa" },
                { entryId: 6, direction: "expense", date: new Date('2023-12-31'), counterparty: "S-Market", type: "Herkut", amount: 1.99, notes: "Mässy pussi" },
                { entryId: 7, direction: "expense", date: new Date('2024-1-1'), counterparty: "Minimani", type: "Ruokaostokset", amount: 15.96, notes: "Ruokaa ja palaa" },
                { entryId: 9, direction: "expense", date: new Date('2024-1-3'), counterparty: "K-Citymarket", type: "Ruokaostokset", amount: 4.84, notes: "Jotaki safkaa" },
                { entryId: 1234, direction: "expense", date: new Date('2024-2-3'), counterparty: "Seppälän valokuvaamo", type: "Yleinen eläminen", amount: 2345.67, notes: "Mahollisimman pitkä entry jotta voidaan testatat rajoja, sekä nähään miltä näyttää kun joku unohtuu kertomaan elämän tarinaansa." },
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
    grid-template-columns: 202px 2fr;
    grid-template-areas:
        "direction direction"
        "date counterparty"
        "amount type"
        "notes notes"
        "submit submit";
    gap: var(--spacing-md) var(--spacing-md);
    margin-inline: auto;
    max-width: 60ch;
}

.grid-direction {
    grid-area: direction;
}
.grid-date {
    grid-area: date;
}
.grid-counterparty {
    grid-area: counterparty;
}
.grid-amount {
    grid-area: amount;
}
.grid-type {
    grid-area: type;
}
.grid-notes {
    grid-area: notes;
}
.grid-submit {
    grid-area: submit;
}

@media (max-width: 666px) {
    form {
        grid-template-columns: 1fr !important;
        grid-template-areas:
        "direction"
        "date"
        "amount"
        "counterparty"
        "type"
        "notes"
        "submit";
    }
}

/* v-select */
.vs__dropdown-toggle {
    background-color: var(--color-background-input);
    border-width: 1px;
    border-style: solid;
    border-radius: var(--border-radius-small);
    border-color: var(--color-border);
    transition: border-color 0.1s ease-out;
    color: var(--color-text-light);
    height: 37px;
    min-width: 275px;
}
.vs__dropdown-toggle:hover {
    border-color: var(--color-border-hover);
}
.v-select .vs__placeholder {  /* Doesn't work */
    color: var(--color-text-lighter)
}
.vs__selected {
    color: var(--color-text-light);
}
.v-select input {
    border: 0px transparent solid !important;
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
.vs__search {
    color: var(--color-text-placeholder);
}
.vs__search:focus {
    color: var(--color-text-placeholder);
}

</style>