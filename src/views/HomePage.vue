<template>
	<div>
		<h1>Home page</h1>
		<div class="cardHolder">
			<InfoCard><h3>Hieno kuva</h3><img src="../assets/reference.png" width="400px" alt="reference image"></InfoCard>
			<InfoCard><LoremIpsum seed="123"/></InfoCard>
			<InfoCard><h3>Ala otsikko</h3><LoremIpsum seed="764"/></InfoCard>
			<InfoCard><p>Wow! It actually works?</p></InfoCard>
			<InfoCard><h3>Kiinnostavaa eikö!</h3> <LoremIpsum seed="735"/></InfoCard>
			<InfoCard><LoremIpsum seed="237"/></InfoCard>
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
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(calc(400px + 2 * 16px), 1fr)); /* Flexible columns */
		gap: 10px; /* Space between grid items */
	}
</style>
