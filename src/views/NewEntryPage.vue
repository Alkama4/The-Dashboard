<template>
    <div>
        <h1>New Entry</h1>
        <p>With the form below you can create a new entry that will be saved to the database.</p>
        <EntryForm @submit="handleFormSubmit" form-type="new"/>
    </div>
</template>

  
<script>
import EntryForm from '@/components/EntryForm.vue';

export default {
    name: 'SettingsPage',
    components: {
        EntryForm,
    },
    methods: {
        handleFormSubmit(formData) {
            alert("Works");
            console.log('Submitting new entry:', formData);
            // Add logic to save `formData` to the database
        }
    }
};
</script>

  
<style scoped>
    /* Future styling */
</style>
  