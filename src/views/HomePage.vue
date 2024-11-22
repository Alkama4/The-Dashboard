<template>
	<div>
		<h1>Home page</h1>
		<q>{{ greeting }}</q>
	</div>
</template>

<script>
	export default {
		name: 'HomePage',
		data() {
			return {
				greeting: this.getGreeting(),
			};
		},
		methods: {
			getGreeting() {
				const hour = new Date().getHours();
				if (hour < 5) {
					return "Just go to sleep already..."
				} else if (hour < 12) {
				return 'Good morning!';
				} else if (hour < 18) {
				return 'Good afternoon!';
				} else {
				return 'Good evening!';
				}
			},
		},
	};
</script>

<style scoped>
	
</style>
