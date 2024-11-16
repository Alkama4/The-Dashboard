<template>
    <div>
        <h1> About page </h1>
        <p> This is the page that has general info about the page </p>
        <div class="cardHolder">
            <InfoCard><h3>Ala otsikko</h3><LoremIpsum :seed="764"/></InfoCard>
            <InfoCard><LoremIpsum :seed="123"/></InfoCard>
            <InfoCard><h3>Hieno kuva</h3><img src="../assets/test.png" alt="test image"></InfoCard>
            <InfoCard><h3>Kiinnostavaa eikö!</h3> <LoremIpsum :seed="735"/></InfoCard>
            <InfoCard><h3>Joku otsikko hommeli</h3><LoremIpsum :seed="76234"/></InfoCard>
            <InfoCard><LoremIpsum :seed="12123"/></InfoCard>
            <InfoCard><h3>Toinen kuva</h3><img src="../assets/logo.png" alt="test image"></InfoCard>
            <InfoCard><h3>Kiinnostavaa eikö!</h3> <LoremIpsum :seed="73235"/></InfoCard>
        </div>
    </div>
</template>
  
<script>
	import InfoCard from '@/components/InfoCard.vue';
	import LoremIpsum from '@/components/LoremIpsum.vue';

    export default {
        name: 'AboutPage',
        components: {
			InfoCard,
			LoremIpsum,
		}
    }
</script>
  
<style scoped>
    .cardHolder {
		display: flex;
        flex-direction: row;
        flex-wrap: wrap;
		gap: 10px;
        align-content: center;
	}
    .cardHolder div {
        max-width: 360px;
        margin-inline: auto;
    }
</style>
  