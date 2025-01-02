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

        <div class="grid-categories-labels category-aligner">
            <label :for="'amount-' + index">Amount:</label>
            <label :for="'category-' + index">Category:</label>
        </div>
        <div class="grid-categories">
            <div v-for="(entry, index) in formData.categories" :key="index" class="category-aligner" :class="{'remove-category-button-hidden': !this.formData.categories[1]}">
                <div class="grid-amount">
                    <input v-model="entry.amount" :id="'amount-' + index" type="number" step="0.01" placeholder="Value..." required />
                </div>
                <div class="grid-category">
                    <v-select v-model="entry.category" :id="'category-' + index" label="category" :options="categoryOptions" placeholder="Select category..." taggable></v-select>
                </div>
                <button v-if="formData.categories.length > 1" @click="removeEntry(index)" class="remove-category-button button-simple">
                    <IconCross size="30"/>
                </button>
            </div>
            <button type="button" @click="addEntry" class="add-category-button">More categories</button>
        </div>

        <div class="grid-notes">
            <label for="notes">Notes:</label><br>
            <textarea v-model="formData.notes" id="notes" placeholder="Category notes/description..."></textarea>
        </div>
        <button type="submit" class="color-primary center grid-submit">Submit</button>
    </form>
</template>

<script>
import api from '@/utils/dataQuery';
import IconCross from './icons/IconCross.vue';
import SliderToggle from './SliderToggle.vue';

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
            formData: { 
                ...this.initialData,
            },
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
                alert('All entries must have a category and an amount!');
                return;
            }

            if (!this.formData.counterparty) {
                alert('Counterparty is required!');
                return;
            }

            this.formData.date = new Date(this.formattedDate).toISOString().split('T')[0];

            this.$emit('submit', {
                ...this.formData,
                categories: [...this.formData.categories]
            });
        },
        filterOptionsByDirection() {
                // Filter counterparty options based on the direction
                if (this.formData.direction === 'expense') {
                    this.counterpartyOptions = this.allOptions.counterparty.expense;
                    this.categoryOptions = this.allOptions.category.expense;
                } else {
                    this.counterpartyOptions = this.allOptions.counterparty.income;
                    this.categoryOptions = this.allOptions.category.income;
                }

        }
    },
    computed: {
        formattedDate() {
            const returnDate = this.formData.date ? new Date(this.formData.date) : new Date();
            return returnDate.toISOString().split('T')[0];
        }
    },
    watch: {
        'formData.direction': function() {
            this.filterOptionsByDirection();
        }
    },
    created() {

    },
    async mounted() {
        // Fetch the options
        const optionsResponse = await api.getOptions();
        if (optionsResponse && optionsResponse.counterparty && optionsResponse.category) {
            // Log the categories data
            // console.log("[Options] All:", optionsResponse);

            // Log individual things
            // console.log("[Options] Counterparty:", optionsResponse.counterparty);
            // console.log("[Options] Category:", optionsResponse.category);

            // Set all the options to be used in the sorting
            this.allOptions = optionsResponse;
        }

        // filter the options by direction once they are fetched
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
;}

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
}

</style>