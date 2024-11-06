<template>
	<div>
		<h1>Home page</h1>
		<p>This is the home page for the site</p>
		<InfoCard>
			<p>Wow! It actually works?</p>
		</InfoCard>
	</div>
</template>

<script>
	import InfoCard from '@/components/InfoCard.vue';

	export default {
		name: 'AboutPage',
		components: {
			InfoCard,
		}
	}
</script>

<style scoped>
	/* Add your styles here */
</style>
