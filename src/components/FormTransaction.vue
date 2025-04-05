<template>
    <form @submit.prevent="handleSubmit" class="form-transaction">
        <div class="form-row">
            <div class="label-wrapper">
                <label>Direction</label>
                <SliderToggle v-model="formValues.direction" :options="['Expense', 'Income']" label="Direction"/>
            </div>
            <div class="label-wrapper">
                <label>Date</label>
                <CustomGenericInput type="date" v-model="formValues.name" ref="textRef"/>
            </div>
        </div>
        <div class="form-row">
            <div class="label-wrapper">
                <label>Counterparty</label>
                <CustomSearchSelect 
                    v-model="selectedCounterparty" 
                    :options="options.counterparties" 
                    ref="counterpartyRef"
                />
            </div>
        </div>
        <div class="form-row">
            <div class="label-wrapper">
                <label>Amount</label>
                <CustomGenericInput 
                    v-for="(category, index) in formValues.categories" 
                    :key="index" 
                    type="number" 
                    v-model="category.amount" 
                    :ref="`amount${index}`"
                />
            </div>
            <div class="label-wrapper">
                <label>Category</label>
                <CustomSearchSelect 
                    v-for="(category, index) in formValues.categories"
                    :key="index" 
                    v-model="category.name" 
                    :options="options.categories" 
                    :ref="`categorySelect${index}`"
                />
            </div>
        </div>
        <button class="button-primary" type="submit">{{ submitText }}</button>
    </form>
</template>

<script>
import CustomGenericInput from './CustomGenericInput.vue';
import CustomSearchSelect from './CustomSearchSelect.vue';
import SliderToggle from './SliderToggle.vue';

export default {
    name: "FormTransaction",
    data() {
        return {
            formValues: {
                direction: 'Expense',
                name: "",
                categories: [
                    { name: '', amount: 0 }
                ],
            },
            options: {
                categories: ["category 1", "category 2", "category 3"],
                counterparties: ["counterparty 1", "counterparty 2", "counterparty 3"]
            },
            selectedCounterparty: ''
        };
    },
    components: {
        CustomSearchSelect,
        CustomGenericInput,
        SliderToggle,
    },
    props: {
        submitText: {
            type: String,
            default: "Submit"
        }
    },
    methods: {
        handleSubmit() {
            this.$refs.textRef.markInvalid();
            this.$refs.numberRef.markInvalid();
            this.$refs.searchRef.markInvalid();
            // Add your form submission logic here
        },
    },
};
</script>

<style scoped>
form {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas: none;
    row-gap: var(--spacing-md);
}

form .form-row {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-md);
}

.form-row .label-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.slider-toggle {
    width: 100%;
}
</style>