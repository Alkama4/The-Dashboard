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
            <SpendingsEntry :id="1" :isIncome="false" :date="new Date('2023-12-24')" counterparty="Cotton Club" type="Opiskelija lounas" :amount="2.95" notes="Hernekeittoa"/>
            <SpendingsEntry :id="2" :isIncome="true" :date="new Date('2023-12-24')" counterparty="Kela" type="Asumistuki" :amount="99.99"/>
            <SpendingsEntry :id="3" :isIncome="false" :date="new Date('2023-12-25')" counterparty="K-Citymarket" type="Yleinen eläminen" :amount="8.75" notes="Jotaki mikä nyt voitas luokitella yleisen elämisen luokkaan"/>
            <SpendingsEntry :id="4" :isIncome="false" :date="new Date('2023-12-26')" counterparty="Minimani" type="Ruokaostokset" :amount="20.24" notes="safkaa"/>
            <SpendingsEntry :id="5" :isIncome="false" :date="new Date('2023-12-29')" counterparty="Cotton Club" type="Kulutustavara" :amount="12.46" notes="Hyvää ruokaa"/>
            <SpendingsEntry :id="6" :isIncome="false" :date="new Date('2023-12-31')" counterparty="S-Market" type="Herkut" :amount="1.99" notes="Mässy pussi"/>
            <SpendingsEntry :id="7" :isIncome="false" :date="new Date('2024-1-1')" counterparty="Minimani" type="Ruokaostokset" :amount="15.96" notes="Ruokaa ja palaa"/>
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
        overflow: visible;
    }
    @media (max-width: 666px) {
        table th:nth-child(5) {
            display: none;
        }
    }
    @media (max-width: 500px) {
        table th:nth-child(3) {
            display: none;
        }
    }
</style>
  