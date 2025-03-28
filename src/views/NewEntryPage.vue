<template>
    <div class="content-width-small">
        <h1>New Entry</h1>
        <p>Welcome to the new entry page! Use this form to quickly add a new transaction to your records. Simply fill out the required details, and your entry will be saved, helping you keep your finances up to date with ease.</p>
        <EntryForm @submit="handleFormSubmit" form-type="new"/>
    </div>
</template>

  
<script>
import EntryForm from '@/components/TransactionForm.vue';
import api from '@/utils/dataQuery';

export default {
    name: 'SettingsPage',
    components: {
        EntryForm,
    },
    methods: {
        handleFormSubmit(formData) {
            const response = api.newTransaction(formData);
            console.log("[NewEntry] Response from API:", response);
        }
    }
};
</script>

  
<style scoped>
    /* Future styling */
</style>
  