<template>
    <div class="debug-page">
        <h1>Debug Page</h1>
        <p>Congralutions just you found an easter egg! Unfortunately though this is just a basic debug page and not something more exciting. This page can be used for everything debugging and testing related.</p>

        <p>In the future this could be turned to a about page, that would for example have the github link, stuff about the project and general info like the stuff in README.md.</p>

        <h2>GitHub</h2>
        <p>Here's the link to the <a href="https://github.com/Alkama4/The-Dashboard">GitHub repo</a>.</p>


		<h2>Notification buttons</h2>
        <div class="flex-row" style="gap: 0">
            <button style="margin: var(--spacing-xs) var(--spacing-sm)" @click="notificationInfo">Info</button>
            <button style="margin: var(--spacing-xs) var(--spacing-sm)" @click="notificationSuccess">Success</button>
            <button style="margin: var(--spacing-xs) var(--spacing-sm)" @click="notificationError">Error</button>
            <button style="margin: var(--spacing-xs) var(--spacing-sm)" @click="notificationWarning">Warning</button>
        </div>

        <div class="color-palette">
            <div style="background-color: var(--color-primary);"></div>
            <div style="background-color: var(--color-secondary);"></div>
            <div style="background-color: var(--color-tertiary);"></div>
            <div style="background-color: var(--color-quaternary);"></div>
            <div style="background-color: var(--color-quinary);"></div>
            <div style="background-color: var(--color-jokumikalie);"></div>
            <div style="background-color: var(--color-senary);"></div>
            <div style="background-color: var(--color-septenary);"></div>
            <div style="background-color: var(--color-octonary);"></div>
            <div style="background-color: var(--color-nonary);"></div>
            <div style="background-color: var(--color-denary);"></div>
            <div style="background-color: var(--color-undecenary);"></div>
        </div>

        <div class="flex-row">
            <div 
                class="tile" 
                v-for="n in 10" 
                :key="n"
                :style="{'background-color': dynamicBgColor(n)}"
            >
                Div {{ n }}
            </div>
        </div>
    </div>
</template>

<script>
// import api from '@/utils/dataQuery';
import { notify } from '@/utils/notification';
import { interpolateBetweenColors, getCssVar } from '@/utils/mytools'

export default {
    name: 'DebugPage',
    components: {},
    methods: {
        notificationInfo() {
            notify("This is a generic info notification that I can place tips or tricks into.", "info");
        },
        notificationSuccess() {
            notify("The action has been completed successfully!", "success");
        },
        notificationError() {
            notify("An error occurred... I guess?", "error");
        },
		notificationWarning() {
            notify("Somethings not right...", "warning");
        },
        dynamicBgColor(rating) {
            const baseColor = getCssVar("color-background-card");
            const ratingColor = getCssVar("color-primary");
            const position = Math.pow(rating / 10, 2);
            return interpolateBetweenColors(baseColor, ratingColor, position)
        }
    },
    // async mounted() {
    //     // Fetch the transactions
    //     const response = await api.getTransactions();
    //     if (response && response.transactions) {
    //         // Log the values from the transactions API
    //         console.log("[Transaction] Transaction values:", response.transactions);
    //     }

    //     // Fetch the options
    //     const optionsResponse = await api.getOptions();
    //     if (optionsResponse && optionsResponse.counterparty && optionsResponse.category) {
    //         // Log the categories data
    //         console.log("[Options] All:", optionsResponse);

    //         // Log individual things
    //         console.log("[Options] Counterparty:", optionsResponse.counterparty);
    //         console.log("[Options] Category:", optionsResponse.category);
    //     }

    //     // Fetch the options
    //     const filtersResponse = await api.getFilters();
    //     if (filtersResponse && filtersResponse.counterparty 
    //                         && filtersResponse.category 
    //                         && filtersResponse.amount 
    //                         && filtersResponse.date) {
    //         // Log the categories data
    //         console.log("[Filters] All:", filtersResponse);

    //         // Log individual things
    //         console.log("[Filters] Counterparty:", filtersResponse.counterparty);
    //         console.log("[Filters] Category:", filtersResponse.category);
    //         console.log("[Filters] Amount:", filtersResponse.amount);
    //         console.log("[Filters] Date:", filtersResponse.date);
    //     }
    // }
}
</script>

<style scoped>

.parent {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    gap: 12px;
}
.image {
    background-color: red;
    height: 100%;
    aspect-ratio: 2/3; /* Or set based on your desired shape */
}
.image img {
    height: 100%;
    width: auto;
    object-fit: cover;
}
.child {
    height: fit-content;
}


.tile {
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius-small);
    margin: 0;
}

.debug-page {
    padding: 20px;
}
.color-palette {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    /* gap: 4px; */
    width: 100%;
    margin-top: 10px;
    margin: var(--spacing-lg) 0;
}

.color-palette div {
    height: 200px;
}
</style>