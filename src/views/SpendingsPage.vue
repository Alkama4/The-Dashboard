<template>
    <div>
        <h1>Spendings page</h1>
        <p>Descriptive text about the spendings page that will be longer and more detailed.</p>
        <SpendingsEntry :id="1" :isIncome="false" :date="new Date('2024-10-12')" counterparty="Cotton Club" type="Opiskelija lounas" :amount="2.95" notes="Hernekeittoa"/>
        <SpendingsEntry :id="2" :isIncome="true" :date="new Date('2024-10-12')" counterparty="Kela" type="Asumistuki" :amount="99.99"/>
        <SpendingsEntry :id="3" :isIncome="false" :date="new Date('2024-10-13')" counterparty="Minimani" type="Ruokaostokset" :amount="8.75" notes="Ruokaa ja palaa"/>
    </div>
</template>
  
<script>
    import SpendingsEntry from '@/components/SpendingsEntry.vue';

    export default {
        name: 'SpendingsPage',
        components: {
            SpendingsEntry,
        },
    }
</script>
  
<style scoped>
    /* Add your styles here */
</style>
  