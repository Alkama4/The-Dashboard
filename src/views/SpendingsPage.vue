<template>
    <div id="spendings-page">
        <h1>Spendings page</h1>
        <p>Descriptive text about the spendings page that will be longer and more detailed in the future
            possibly but that is uncertain so don't quote me on that or anything else I have written in this
            or anywhere else on the website. One liners babyyyy...</p>
        <table>
            <thead>
                <tr>
                    <th class="column-date">Date</th>
                    <th class="column-counterparty">Counterparty</th>
                    <th class="column-type">Type</th>
                    <th class="column-amount">Amount</th>
                    <th class="column-notes">Notes</th>
                </tr>
            </thead>
            <tbody>
                <SpendingsEntry :id="1" :isIncome="false" :date="new Date('2023-12-24')" counterparty="Cotton Club" type="Opiskelija lounas" :amount="2.95" notes="Hernekeittoa"/>
                <SpendingsEntry :id="2" :isIncome="true" :date="new Date('2023-12-24')" counterparty="Kela" type="Asumistuki" :amount="99.99"/>
                <SpendingsEntry :id="3" :isIncome="false" :date="new Date('2023-12-25')" counterparty="K-Citymarket" type="Yleinen eläminen" :amount="8.75" notes="Jotaki mikä nyt voitas luokitella yleisen elämisen luokkaan"/>
                <SpendingsEntry :id="4" :isIncome="false" :date="new Date('2023-12-26')" counterparty="Minimani" type="Ruokaostokset" :amount="20.24" notes="safkaa"/>
                <SpendingsEntry :id="5" :isIncome="false" :date="new Date('2023-12-29')" counterparty="Cotton Club" type="Kulutustavara" :amount="12.46" notes="Hyvää ruokaa"/>
                <SpendingsEntry :id="6" :isIncome="false" :date="new Date('2023-12-31')" counterparty="S-Market" type="Herkut" :amount="1.99" notes="Mässy pussi"/>
                <SpendingsEntry :id="7" :isIncome="false" :date="new Date('2024-1-1')" counterparty="Minimani" type="Ruokaostokset" :amount="15.96" notes="Ruokaa ja palaa"/>
                <SpendingsEntry :id="689" :isIncome="false" :date="new Date('2024-2-3')" counterparty="Seppälän valokuvaamo" type="Yleinen eläminen" :amount="2345.67" notes="Mahollisimman pitkä entry jotta voidaan testatat rajoja, sekä nähään miltä näyttää kun joku unohtuu kertomaan elämän tarinaansa. "/>
                <SpendingsEntry :id="1" :isIncome="false" :date="new Date('2023-12-24')" counterparty="Cotton Club" type="Opiskelija lounas" :amount="2.95" notes="Hernekeittoa"/>
                <SpendingsEntry :id="2" :isIncome="true" :date="new Date('2023-12-24')" counterparty="Kela" type="Asumistuki" :amount="99.99"/>
                <SpendingsEntry :id="3" :isIncome="false" :date="new Date('2023-12-25')" counterparty="K-Citymarket" type="Yleinen eläminen" :amount="8.75" notes="Jotaki mikä nyt voitas luokitella yleisen elämisen luokkaan"/>
                <SpendingsEntry :id="4" :isIncome="false" :date="new Date('2023-12-26')" counterparty="Minimani" type="Ruokaostokset" :amount="20.24" notes="safkaa"/>
                <SpendingsEntry :id="5" :isIncome="false" :date="new Date('2023-12-29')" counterparty="Cotton Club" type="Kulutustavara" :amount="12.46" notes="Hyvää ruokaa"/>
                <SpendingsEntry :id="6" :isIncome="false" :date="new Date('2023-12-31')" counterparty="S-Market" type="Herkut" :amount="1.99" notes="Mässy pussi"/>
                <SpendingsEntry :id="7" :isIncome="false" :date="new Date('2024-1-1')" counterparty="Minimani" type="Ruokaostokset" :amount="15.96" notes="Ruokaa ja palaa"/>
                <SpendingsEntry :id="689" :isIncome="false" :date="new Date('2024-2-3')" counterparty="Seppälän valokuvaamo" type="Yleinen eläminen" :amount="2345.67" notes="Mahollisimman pitkä entry jotta voidaan testatat rajoja, sekä nähään miltä näyttää kun joku unohtuu kertomaan elämän tarinaansa. "/>
                <SpendingsEntry :id="1" :isIncome="false" :date="new Date('2023-12-24')" counterparty="Cotton Club" type="Opiskelija lounas" :amount="2.95" notes="Hernekeittoa"/>
                <SpendingsEntry :id="2" :isIncome="true" :date="new Date('2023-12-24')" counterparty="Kela" type="Asumistuki" :amount="99.99"/>
                <SpendingsEntry :id="3" :isIncome="false" :date="new Date('2023-12-25')" counterparty="K-Citymarket" type="Yleinen eläminen" :amount="8.75" notes="Jotaki mikä nyt voitas luokitella yleisen elämisen luokkaan"/>
                <SpendingsEntry :id="4" :isIncome="false" :date="new Date('2023-12-26')" counterparty="Minimani" type="Ruokaostokset" :amount="20.24" notes="safkaa"/>
                <SpendingsEntry :id="5" :isIncome="false" :date="new Date('2023-12-29')" counterparty="Cotton Club" type="Kulutustavara" :amount="12.46" notes="Hyvää ruokaa"/>
                <SpendingsEntry :id="6" :isIncome="false" :date="new Date('2023-12-31')" counterparty="S-Market" type="Herkut" :amount="1.99" notes="Mässy pussi"/>
                <SpendingsEntry :id="7" :isIncome="false" :date="new Date('2024-1-1')" counterparty="Minimani" type="Ruokaostokset" :amount="15.96" notes="Ruokaa ja palaa"/>
                <SpendingsEntry :id="689" :isIncome="false" :date="new Date('2024-2-3')" counterparty="Seppälän valokuvaamo" type="Yleinen eläminen" :amount="2345.67" notes="Mahollisimman pitkä entry jotta voidaan testatat rajoja, sekä nähään miltä näyttää kun joku unohtuu kertomaan elämän tarinaansa. "/>
                <SpendingsEntry :id="1" :isIncome="false" :date="new Date('2023-12-24')" counterparty="Cotton Club" type="Opiskelija lounas" :amount="2.95" notes="Hernekeittoa"/>
                <SpendingsEntry :id="2" :isIncome="true" :date="new Date('2023-12-24')" counterparty="Kela" type="Asumistuki" :amount="99.99"/>
                <SpendingsEntry :id="3" :isIncome="false" :date="new Date('2023-12-25')" counterparty="K-Citymarket" type="Yleinen eläminen" :amount="8.75" notes="Jotaki mikä nyt voitas luokitella yleisen elämisen luokkaan"/>
                <SpendingsEntry :id="4" :isIncome="false" :date="new Date('2023-12-26')" counterparty="Minimani" type="Ruokaostokset" :amount="20.24" notes="safkaa"/>
                <SpendingsEntry :id="5" :isIncome="false" :date="new Date('2023-12-29')" counterparty="Cotton Club" type="Kulutustavara" :amount="12.46" notes="Hyvää ruokaa"/>
                <SpendingsEntry :id="6" :isIncome="false" :date="new Date('2023-12-31')" counterparty="S-Market" type="Herkut" :amount="1.99" notes="Mässy pussi"/>
                <SpendingsEntry :id="7" :isIncome="false" :date="new Date('2024-1-1')" counterparty="Minimani" type="Ruokaostokset" :amount="15.96" notes="Ruokaa ja palaa"/>
                <SpendingsEntry :id="689" :isIncome="false" :date="new Date('2024-2-3')" counterparty="Seppälän valokuvaamo" type="Yleinen eläminen" :amount="2345.67" notes="Mahollisimman pitkä entry jotta voidaan testatat rajoja, sekä nähään miltä näyttää kun joku unohtuu kertomaan elämän tarinaansa. "/>
                <SpendingsEntry :id="1" :isIncome="false" :date="new Date('2023-12-24')" counterparty="Cotton Club" type="Opiskelija lounas" :amount="2.95" notes="Hernekeittoa"/>
                <SpendingsEntry :id="2" :isIncome="true" :date="new Date('2023-12-24')" counterparty="Kela" type="Asumistuki" :amount="99.99"/>
                <SpendingsEntry :id="3" :isIncome="false" :date="new Date('2023-12-25')" counterparty="K-Citymarket" type="Yleinen eläminen" :amount="8.75" notes="Jotaki mikä nyt voitas luokitella yleisen elämisen luokkaan"/>
                <SpendingsEntry :id="4" :isIncome="false" :date="new Date('2023-12-26')" counterparty="Minimani" type="Ruokaostokset" :amount="20.24" notes="safkaa"/>
                <SpendingsEntry :id="5" :isIncome="false" :date="new Date('2023-12-29')" counterparty="Cotton Club" type="Kulutustavara" :amount="12.46" notes="Hyvää ruokaa"/>
                <SpendingsEntry :id="6" :isIncome="false" :date="new Date('2023-12-31')" counterparty="S-Market" type="Herkut" :amount="1.99" notes="Mässy pussi"/>
                <SpendingsEntry :id="7" :isIncome="false" :date="new Date('2024-1-1')" counterparty="Minimani" type="Ruokaostokset" :amount="15.96" notes="Ruokaa ja palaa"/>
                <SpendingsEntry :id="689" :isIncome="false" :date="new Date('2024-2-3')" counterparty="Seppälän valokuvaamo" type="Yleinen eläminen" :amount="2345.67" notes="Mahollisimman pitkä entry jotta voidaan testatat rajoja, sekä nähään miltä näyttää kun joku unohtuu kertomaan elämän tarinaansa. "/>
                <SpendingsEntry :id="1" :isIncome="false" :date="new Date('2023-12-24')" counterparty="Cotton Club" type="Opiskelija lounas" :amount="2.95" notes="Hernekeittoa"/>
                <SpendingsEntry :id="2" :isIncome="true" :date="new Date('2023-12-24')" counterparty="Kela" type="Asumistuki" :amount="99.99"/>
                <SpendingsEntry :id="3" :isIncome="false" :date="new Date('2023-12-25')" counterparty="K-Citymarket" type="Yleinen eläminen" :amount="8.75" notes="Jotaki mikä nyt voitas luokitella yleisen elämisen luokkaan"/>
                <SpendingsEntry :id="4" :isIncome="false" :date="new Date('2023-12-26')" counterparty="Minimani" type="Ruokaostokset" :amount="20.24" notes="safkaa"/>
                <SpendingsEntry :id="5" :isIncome="false" :date="new Date('2023-12-29')" counterparty="Cotton Club" type="Kulutustavara" :amount="12.46" notes="Hyvää ruokaa"/>
                <SpendingsEntry :id="6" :isIncome="false" :date="new Date('2023-12-31')" counterparty="S-Market" type="Herkut" :amount="1.99" notes="Mässy pussi"/>
                <SpendingsEntry :id="7" :isIncome="false" :date="new Date('2024-1-1')" counterparty="Minimani" type="Ruokaostokset" :amount="15.96" notes="Ruokaa ja palaa"/>
                <SpendingsEntry :id="689" :isIncome="false" :date="new Date('2024-2-3')" counterparty="Seppälän valokuvaamo" type="Yleinen eläminen" :amount="2345.67" notes="Mahollisimman pitkä entry jotta voidaan testatat rajoja, sekä nähään miltä näyttää kun joku unohtuu kertomaan elämän tarinaansa. "/>
                <SpendingsEntry :id="1" :isIncome="false" :date="new Date('2023-12-24')" counterparty="Cotton Club" type="Opiskelija lounas" :amount="2.95" notes="Hernekeittoa"/>
                <SpendingsEntry :id="2" :isIncome="true" :date="new Date('2023-12-24')" counterparty="Kela" type="Asumistuki" :amount="99.99"/>
            </tbody>
        </table>
            <button class="center">Load more</button>
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
  
<style>
    table {
        margin-inline: auto;
        border-collapse: collapse;
        overflow: scroll;
        max-width: 100%;
    }

    #spendings-page .spendings-summary td, #spendings-page th {
        white-space: nowrap;
        padding-top: var(--spacing-xs);
        padding-bottom: var(--spacing-xs);
        padding-inline: var(--spacing-sm);
    }

    /* Individual columns */
    .column-date {
        text-align: end;
        width: fit-content;
    }
    .column-counterparty {
        text-align: start;
        max-width: 140px;
        overflow: hidden;
    }    
    .column-type {
        text-align: start;
        width: fit-content;
    }
    .column-amount {
        text-align: end;
        width: fit-content;
    }
    .column-notes {
        text-align: start;
        max-width: 200px;
        overflow: hidden;
    }

    .column-with-overflow {
        background: linear-gradient(to right, var(--color-text) 80%, rgba(255, 255, 255, 0) 100%);
        background-clip: text;
        color: transparent;
    }

    @media (max-width: 777px) {
        table th:nth-child(5) {
            display: none;
        }
    }
    @media (max-width: 600px) {
        table th:nth-child(3) {
            display: none;
        }
    }
</style>
  