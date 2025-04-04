<template>
    <form @submit.prevent="handleSubmit" class="form-transaction">
        <CustomGenericInput type="text" v-model="formValues.name" ref="textRef"/>
        <CustomGenericInput type="number" v-model="formValues.amount" ref="numberRef"/>
        <CustomSearchSelect v-model="selectedClass" :options="['teST','test1','test2']" ref="searchRef"/>
        <button type="submit">Submit</button>
    </form>
</template>

<script>
import CustomGenericInput from './CustomGenericInput.vue';
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
        CustomGenericInput,
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

</style>