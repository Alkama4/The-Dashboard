<template>
    <div class="content-width-small">
        <h1>New transaction</h1>
        <p>Welcome to the new transaction page! Use this form to quickly add a new transaction to your records. Simply fill out the required details, and your entry will be saved, helping you keep your finances up to date with ease.</p>
        <div class="card">
            <h2>Transaction details</h2>
            <TransactionForm @submit="handleFormSubmit"/>
        </div>
    </div>
</template>

  
<script>
import TransactionForm from '@/components/FormTransaction.vue';
import fastApi from '@/utils/fastApi';
import { notify } from '@/utils/notification';

export default {
    name: 'SettingsPage',
    components: {
        TransactionForm,
    },
    methods: {
        handleFormSubmit(formData) {
            const response = fastApi.spendings.transactions.create(formData);
            if (response) {
                notify("Transaction created successfully!", "success");
            }
        }
    }
};
</script>

  
<style scoped>

</style>
  