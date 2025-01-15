<template>
    <form @submit.prevent="handleSubmit">
        <div class="grid-direction">
            <label for="direction">Direction</label><br>
            <slider-toggle 
                v-model="formData.direction" 
                :options="['expense', 'income']"
            />
        </div>
        <div class="grid-date">
            <label for="date">Date</label><br>
            <input v-model="formData.date" id="date" type="date" required />
        </div>
        <div class="grid-counterparty">
            <label for="counterparty">Counterparty</label><br>
            <v-select v-model="formData.counterparty" label="counterparty" :options="counterpartyOptions" placeholder="Select or type..." taggable></v-select>
        </div>

        <div class="grid-categories-labels category-aligner">
            <label :for="'amount-' + index">Amount</label>
            <label :for="'category-' + index">Category</label>
        </div>
        <div class="grid-categories">
            <div v-for="(entry, index) in formData.categories" :key="index" class="category-aligner" :class="{'remove-category-button-hidden': !this.formData.categories[1]}">
                <div class="grid-amount">
                    <input v-model="entry.amount" :id="'amount-' + index" type="number" step="0.01" placeholder="Number..." required />
                </div>
                <div class="grid-category">
                    <v-select v-model="entry.category" :id="'category-' + index" label="category" :options="categoryOptions" placeholder="Select or type..." taggable></v-select>
                </div>
                <button v-if="formData.categories.length > 1" @click="removeEntry(index)" class="remove-category-button button-simple">
                    <IconCross size="30"/>
                </button>
            </div>
            <div class="categories-last-row category-aligner">
                <div>
                    <!-- <label>Subtotal</label> -->
                    <div class="subtotal-value"><span>Total:</span> <div>{{ subtotal }}</div></div>
                </div>
                <div>
                    <!-- <label></label> -->
                    <button type="button" @click="addEntry" class="add-category-button">Add a category</button>
                </div>
            </div>
        </div>

        <div class="grid-notes">
            <label for="notes">Notes</label><br>
            <textarea v-model="formData.notes" id="notes" placeholder="Add any additional notes or details about this transaction (optional)"></textarea>
        </div>
        <button type="submit" class="color-primary center grid-submit submit-button">Submit</button>
    </form>
</template>

<script>
import api from '@/utils/dataQuery';
import IconCross from './icons/IconCross.vue';
import SliderToggle from './SliderToggle.vue';
import { notify } from '@/utils/notification';

export default {
    components: {
        SliderToggle,
        IconCross,
    },
    props: {
        initialData: {
            category: Object,
            default: () => ({
                entryId: '',
                direction: 'expense',
                date: '',
                counterparty: '',
                notes: '',
                categories: [{ category: '', amount: '' }]
            })
        }
    },
    emits: ['submit'],
    data() {
        return {
            // Stringify and parse so that the data isn't linked causing problems
            formData: JSON.parse(JSON.stringify(this.initialData)),
            counterpartyOptions: [],
            categoryOptions: [],
            allOptions: {}
        };
    },
    methods: {
        addEntry() {
            this.formData.categories.push({ category: '', amount: '' });
        },
        removeEntry(index) {
            if (this.formData.categories.length > 1) {
                this.formData.categories.splice(index, 1);
            } else {
                alert('At least one entry is required!');
            }
        },
        handleSubmit() {
            const invalidEntry = this.formData.categories.some(entry => !entry.category || !entry.amount);
            if (invalidEntry) {
                notify('All entries must have a category and an amount!!')
                return;
            }

            if (!this.formData.counterparty) {
                notify('Counterparty is required!')
                return;
            }

            this.$emit('submit', {
                ...this.formData,
                categories: [...this.formData.categories]
            });
        },
        filterOptionsByDirection() {
            // Filter counterparty options based on the direction
            try {
                if (this.formData.direction === 'expense') {
                    this.counterpartyOptions = this.allOptions.counterparty.expense;
                    this.categoryOptions = this.allOptions.category.expense;
                } else {
                    this.counterpartyOptions = this.allOptions.counterparty.income;
                    this.categoryOptions = this.allOptions.category.income;
                }
            } catch {
                // If the response was null catch that and don't sort anything since there is nothing to sort
            }
        }
    },
    computed: {
        subtotal() {
            let sum = 0;

            for (let i = 0; i < this.formData.categories.length; i++) {
                const amount = parseFloat(this.formData.categories[i].amount) || 0; // Ensure amount is a valid number or default to 0
                sum += amount;
            }

            return sum.toLocaleString('fi-FI', { style: 'currency', currency: 'EUR' });
        }
    },
    watch: {
        'formData.direction': function() {
            this.filterOptionsByDirection();
        }
    },
    async mounted() {
        // Fix date handling
        const formattedDate = this.formData.date ? new Date(this.formData.date) : new Date();
        this.formData.date = formattedDate.toISOString().split('T')[0]; // Correctly format the date

        // Fetch the options
        const optionsResponse = await api.getOptions();
        if (optionsResponse && optionsResponse.counterparty && optionsResponse.category) {
            this.allOptions = optionsResponse;
        }

        // Filter the options by direction once they are fetched
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
        "categories-labels categories-labels"
        "categories categories"
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

.grid-categories {
    grid-area: categories;
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
    margin: 0;
}
.grid-categories-labels {
    grid-area: categories-labels;
    gap: var(--spacing-md);
}
.category-aligner {
    grid-template-columns: 204px 1fr auto;
    display: grid;
    align-items: center;
    gap: var(--spacing-md);
}
.categories-last-row {  /* Make it just two columns on the last row */
    grid-template-columns: 204px auto;
}

.remove-category-button {
    color: white;
    border: none;
    padding: 0.5em;
    cursor: pointer;
    margin: 0;
}
.remove-category-button-hidden {
    grid-template-columns: 204px 1fr;
}
.add-category-button {
    margin: 0;
    width: 100%;
    margin-inline: auto;
    height: 35.666px;
}

.grid-notes {
    grid-area: notes;
}
.grid-submit {
    grid-area: submit;
}


.subtotal-value {
    background-color: var(--color-background-card);
    /* border: 1px solid var(--color-border); */
    border-radius: var(--border-radius-small);
    height: 34.2px;
    align-items: center;
    justify-content: space-between;
    display: flex;
    padding-inline: 8px;
    width: calc(100% - 8px * 2 - 2px);
    font-weight: 500;
    overflow: hidden;
}
.subtotal-value span {
    color: var(--color-text-light);
    padding-right: 8px;
}
.subtotal-value div {
    padding-left: 8px;
    font-weight: 600;
}

.submit-button {
    margin-top: var(--spacing-md);
}

@media (max-width: 666px) {
    form {
        grid-template-columns: 1fr;
        grid-template-areas:
            "direction"
            "date"
            "counterparty"
            "categories-labels"
            "categories"
            "notes"
            "submit";
    }
    .category-aligner {
        grid-template-columns: 110px 1fr auto;
        gap: var(--spacing-xs);
    }
    .remove-category-button-hidden {
        grid-template-columns: 110x 1fr;
    }
    .subtotal-value {
        justify-content: end;
    }
    .subtotal-value span {
        display: none;
    }
}

</style>