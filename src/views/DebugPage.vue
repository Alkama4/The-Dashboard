<template>
    <div class="debug-page">
        <h1>Debug Page</h1>
        <p>This is a basic debug page. For everything debugging and testing related.</p>
		<h2>Notification buttons</h2>
		<button @click="notificationInfo">Info</button>
		<button @click="notificationSuccess">Success</button>
		<button @click="notificationError">Error</button>
		<button @click="notificationWarning">Warning</button>
    </div>
</template>

<script>
import api from '@/utils/dataQuery';

export default {
    name: 'DebugPage',
    methods: {
        notificationInfo() {
            this.$root.notify("This is a generic info notification that I can place tips or tricks into.", "info");
        },
        notificationSuccess() {
            this.$root.notify("The action has been completed successfully!", "success");
        },
        notificationError() {
            this.$root.notify("An error occurred... I guess?", "error");
        },
		notificationWarning() {
            this.$root.notify("Somethings not right...", "warning");
        }
    },
    async mounted() {
			// Fetch the transactions
			const response = await api.getTransactions();
			if (response && response.transactions) {
				// Log the values from the transactions API
				console.log("[Transaction] Transaction values:", response.transactions);
			}

			// Fetch the options
			const optionsResponse = await api.getOptions();
			if (optionsResponse && optionsResponse.counterparty && optionsResponse.category) {
				// Log the categories data
				console.log("[Options] All:", optionsResponse);

				// Log individual things
				console.log("[Options] Counterparty:", optionsResponse.counterparty);
				console.log("[Options] Category:", optionsResponse.category);
			}

			// Fetch the options
			const filtersResponse = await api.getFilters();
			if (filtersResponse && filtersResponse.counterparty 
								&& filtersResponse.category 
								&& filtersResponse.amount 
								&& filtersResponse.date) {
				// Log the categories data
				console.log("[Filters] All:", filtersResponse);

				// Log individual things
				console.log("[Filters] Counterparty:", filtersResponse.counterparty);
				console.log("[Filters] Category:", filtersResponse.category);
				console.log("[Filters] Amount:", filtersResponse.amount);
				console.log("[Filters] Date:", filtersResponse.date);
			}
		}
}
</script>

<style scoped>
.debug-page {
    padding: 20px;
}
</style>