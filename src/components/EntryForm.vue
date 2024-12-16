<template>
    <form @submit.prevent="handleSubmit">
        <div class="grid-direction">
            <label for="direction">Direction:</label><br>
            <slider-toggle 
                v-model="formData.direction" 
                :options="['expense', 'income']"
            />
        </div>
        <div class="grid-date">
            <label for="date">Date:</label><br>
            <input v-model="formattedDate" id="date" type="date" required />
        </div>
        <div class="grid-counterparty">
            <label for="counterparty">Counterparty:</label><br>
            <v-select v-model="formData.counterparty" label="counterparty" :options="counterpartyOptions" placeholder="Select counterparty..." taggable></v-select>
        </div>

        <div class="grid-types-labels type-aligner">
            <label :for="'amount-' + index">Amount:</label>
            <label :for="'type-' + index">Type:</label>
        </div>
        <div class="grid-types">
            <div v-for="(entry, index) in formData.types" :key="index" class="type-aligner" :class="{'remove-type-button-hidden': !this.formData.types[1]}">
                <div class="grid-amount">
                    <input v-model="entry.amount" :id="'amount-' + index" type="number" step="0.01" placeholder="Value..." required />
                </div>
                <div class="grid-type">
                    <v-select v-model="entry.type" :id="'type-' + index" label="type" :options="typeOptions" placeholder="Select type..." taggable></v-select>
                </div>
                <button v-if="formData.types.length > 1" @click="removeEntry(index)" class="remove-type-button button-simple">
                    <IconCross size="30"/>
                </button>
            </div>
            <button type="button" @click="addEntry" class="add-type-button">More types</button>
        </div>

        <div class="grid-notes">
            <label for="notes">Notes:</label><br>
            <textarea v-model="formData.notes" id="notes" placeholder="Type notes/description..."></textarea>
        </div>
        <button type="submit" class="color-primary center grid-submit">Submit</button>
    </form>
</template>

<script>
import { getOptions } from '@/utils/dataQuery';
import IconCross from './icons/IconCross.vue';
import SliderToggle from './SliderToggle.vue';

export default {
    components: {
        SliderToggle,
        IconCross,
    },
    props: {
        initialData: {
            type: Object,
            default: () => ({
                entryId: '',
                direction: 'expense',
                date: '',
                counterparty: '',
                notes: '',
                types: [{ type: '', amount: '' }]
            })
        }
    },
    emits: ['submit'],
    data() {
        return {
            formData: { 
                ...this.initialData,
            },
            counterpartyOptions: [],
            typeOptions: [],
        };
    },
    methods: {
        addEntry() {
            this.formData.types.push({ type: '', amount: '' });
        },
        removeEntry(index) {
            if (this.formData.types.length > 1) {
                this.formData.types.splice(index, 1);
            } else {
                alert('At least one entry is required!');
            }
        },
        handleSubmit() {
            const invalidEntry = this.formData.types.some(entry => !entry.type || !entry.amount);
            if (invalidEntry) {
                alert('All entries must have a type and an amount!');
                return;
            }

            if (!this.formData.counterparty) {
                alert('Counterparty is required!');
                return;
            }

            this.$emit('submit', {
                ...this.formData,
                types: [...this.formData.types]
            });
        },
        filterOptionsByDirection() {
            const options = getOptions();

            // Filter counterparty options based on the direction
            if (this.formData.direction === 'expense') {
                this.counterpartyOptions = options.sortedCounterparties.filter(counterparty => counterparty !== 'Kela'); // Example: filter out income counterparties
                this.typeOptions = options.sortedTypes.filter(type => type !== 'Asumistuki'); // Example: filter out income types
            } else {
                this.counterpartyOptions = options.sortedCounterparties.filter(counterparty => counterparty === 'Kela'); // Example: filter in income counterparties
                this.typeOptions = options.sortedTypes.filter(type => type === 'Asumistuki'); // Example: filter in income types
            }
        }
    },
    computed: {
        formattedDate() {
            const returnDate = this.formData.date ? this.formData.date : new Date();
            return returnDate.toISOString().split('T')[0];
        }
    },
    watch: {
        'formData.direction': function() {
            this.filterOptionsByDirection();
        }
    },
    created() {
        // Initially fetch the options based on the default direction (expense or income)
        this.filterOptionsByDirection();
    }
};
</script>


<style>
form {
    display: grid;
    grid-template-columns: 204px 1fr;
    grid-template-areas:
        "direction date"
        "counterparty counterparty"
        "types-labels types-labels"
        "types types"
        "notes notes"
        "submit submit";
    gap: 0 var(--spacing-md);
    margin-inline: auto;
    max-width: 60ch;
}

form > * {
    margin-top: var(--spacing-md);
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

.grid-types {
    grid-area: types;
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
    margin: 0;
}
.grid-types-labels {
    grid-area: types-labels;
    gap: var(--spacing-md);
}
.type-aligner {
    grid-template-columns: 204px 1fr auto;
    display: grid;
    align-items: center;
    gap: var(--spacing-md);
;}

.remove-type-button {
    color: white;
    border: none;
    padding: 0.5em;
    cursor: pointer;
    margin: 0;
}
.remove-type-button-hidden {
    grid-template-columns: 204px 1fr;
}
.add-type-button {
    margin: 0 var(--spacing-sm);
}
.grid-notes {
    grid-area: notes;
}
.grid-submit {
    grid-area: submit;
}


@media (max-width: 666px) {
    form {
        grid-template-columns: 1fr;
        grid-template-areas:
            "direction"
            "date"
            "counterparty"
            "types-labels"
            "types"
            "notes"
            "submit";
    }
    .type-aligner {
        grid-template-columns: 110px 1fr auto;
        gap: var(--spacing-xs);
    }
    .remove-type-button-hidden {
    grid-template-columns: 110x 1fr;
}
}

</style>