<template>
    <div class="form-transaction">
        <input type="text" v-model="formValues.name" />
        <input type="number" v-model="formValues.amount" />
        <CustomSearchSelect v-model="selectedClass" :options="['teST','test1','test2']"/>
        <button type="submit">Submit</button>
    </div>
</template>

<script>
import CustomSearchSelect from './CustomSearchSelect.vue';

export default {
    name: "FormTransaction",
    data() {
        return {
            formValues: {
                name: "",
                amount: 0,
                selectedClass: 'test',
                selectedCounterparty: 'test',
            },
        };
    },
    components: {
        CustomSearchSelect,
    },
    methods: {
        handleSubmit() {
            console.log("Form submitted:", this.formValues);
            // Add your form submission logic here
        },
    },
};
</script>

<style scoped>

</style>