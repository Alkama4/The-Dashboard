<template>
    <div class="content-width-small">
        <h1>New Entry</h1>
        <p>With the form below you can create a new entry that will be saved to the database.</p>
        <EntryForm @submit="handleFormSubmit" form-type="new"/>
    </div>
</template>

  
<script>
import EntryForm from '@/components/EntryForm.vue';
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
  