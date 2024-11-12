<template>
    <div>
        <h1>Spendings page</h1>
        <p>Descriptive text about the spendings page that will be longer and more detailed in the future
            possibly but that is uncertain so don't quote me on that or anything else I have written in this
            or anywhere else on the website. One liners babyyyy...</p>
        <table>
            <tr>
                <th>Date</th>
                <th>Counterparty</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Notes</th>
            </tr>
            <SpendingsEntry :id="1" :isIncome="false" :date="new Date('2024-10-12')" counterparty="Cotton Club" type="Opiskelija lounas" :amount="2.95" notes="Hernekeittoa"/>
            <SpendingsEntry :id="2" :isIncome="true" :date="new Date('2024-10-12')" counterparty="Kela" type="Asumistuki" :amount="99.99"/>
            <SpendingsEntry :id="3" :isIncome="false" :date="new Date('2024-10-13')" counterparty="Minimani" type="Ruokaostokset" :amount="8.75" notes="Ruokaa ja palaa"/>
        </table>
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
    table {
        margin-inline: auto;
        border-collapse: collapse;
    }
</style>
  