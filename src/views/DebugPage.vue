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

        <div class="flex-row">
            <ConfirmationModal ref="testConfirmationModalRef"/>
            <button @click="testConfirmationModal">Confirmation modal</button>
    
            <GenericModal ref="testModalRef">
                Some example text to describe something and fill this up so that I can test different test cases.
                <h3>A sub header</h3>
                Some example text to describe something and fill this up so that I can test different test cases.
                Some example text to describe something and fill this up so that I can test different test cases.
                Some example text to describe something and fill this up so that I can test different test cases.
                Some example text to describe something and fill this up so that I can test different test cases.
                <h4>A sub sub header</h4>
                Some example text to describe something and fill this up so that I can test different test cases.
                Some example text to describe something and fill this up so that I can test different test cases.
                Some example text to describe something and fill this up so that I can test different test cases.
            </GenericModal>
            <button @click="openTestModal">Generic test modal</button>
        </div>

        <div class="card content-width-small">
            <ChartComponent 
                :chartOptionsGenerator="exampleChartOptions"
                alternateOption="Maybe..."
            />
        </div>

        <div class="card fit-content">
            <h2>Example form</h2>
            <FormTransaction :initialFormValues="{date: '2022-01-01', categories: [{category: 'Example', amount: '987.65'}, {category: 'Example 2', amount: '123'}]}"/>
        </div>

        <div v-for="(item, index) in items" :key="item.id">
            <div
                class="drop-zone"
                :class="{ active: hoveredDropZone === index }"
            >
                <div
                    v-show="draggedIndex != null"
                    class="drop-zone-area"
                    @dragover.prevent="hoveredDropZone = index"
                    @dragleave="hoveredDropZone = null"
                    @drop="drop(index)"
                ></div>
            </div>

            <div class="draggable-item">
                <span
                    class="drag-handle"
                    draggable="true"
                    @dragstart="draggedIndex = index;"
                >
                    ⠿
                </span>
                {{ item.name }}
            </div>
        </div>
        <div
            class="drop-zone"
            :class="{ active: hoveredDropZone === items.length }"
        >
            <div
                v-show="draggedIndex != null"
                class="drop-zone-area"
                @dragover.prevent="hoveredDropZone = items.length"
                @dragleave="hoveredDropZone = null"
                @drop="drop(items.length)"
            ></div>
        </div>

    </div>
</template>

<script>
// import fastApi from '@/utils/dataQuery';
import { notify } from '@/utils/notification';
import { interpolateBetweenColors, getCssVar } from '@/utils/utils'
import { initialEchartSetup, commonChartValues, generateTooltipSingleValue } from '@/utils/chartUtils';
import fastApi from '@/utils/fastApi';
import ChartComponent from '@/components/ChartComponent.vue';
import ConfirmationModal from '@/components/ModalConfirmation.vue';
import GenericModal from '@/components/ModalGeneric.vue';
import FormTransaction from '@/components/FormTransaction.vue';

export default {
    name: 'DebugPage',
    components: {
        ChartComponent,
        ConfirmationModal,
        GenericModal,
        FormTransaction,
    },  
    data() {
        return {
            items: [
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' },
                { id: 3, name: 'Item 3' },
                { id: 4, name: 'Item 4' },
            ],
            exampleChartOptions: null,
            draggedIndex: null,
            hoveredDropZone: null
        }
    },
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
        },
        async testConfirmationModal() {
            notify(await this.$refs.testConfirmationModalRef.prompt());
        },
        openTestModal() {
            this.$refs.testModalRef.open()
        },
        // DRAGGING
        drop(dropIndex) {
            const draggedItem = this.items[this.draggedIndex];
            this.items.splice(this.draggedIndex, 1);
            this.items.splice(dropIndex > this.draggedIndex ? dropIndex - 1 : dropIndex, 0, draggedItem);
            this.hoveredDropZone = null;
            this.draggedIndex = null;
        }
    },
    async mounted() {
        initialEchartSetup();

        const lastMonthResponse = await fastApi.spendings.analytics.stats.timespan("month");
        if (lastMonthResponse && lastMonthResponse.stats) {
            // this.pageValues.lastMonth = { ...lastMonthResponse.stats };

            const pieData1 = lastMonthResponse.stats.topMostExpensiveCategories.map(item => ({
                name: item.category,
                value: item.totalAmount,
            }));

            const pie1Options = () => ({
                textStyle: commonChartValues().textStyle,
                title: {
                    text: 'Spendings This Month by Category',
                    textStyle: {
                        color: getCssVar('color-text-lighter'),
                        fontSize: 16,
                        fontWeight: 500,
                    },
                    x: 'center',
                },
                legend: commonChartValues().legend,
                color: commonChartValues().color,
                tooltip: { 
                    trigger: 'item',
                    backgroundColor: getCssVar('color-background-card'),
                    borderWidth: 1,
                    borderColor: getCssVar("color-border"),
                    formatter: params => generateTooltipSingleValue(params, 'eur'),
                },
                series: [
                    {
                        name: 'Monthly Average Spending',
                        type: 'pie',
                        label: {
                            color: getCssVar('color-text'),
                        },
                        data: pieData1,
                    },
                ],
            });

            this.exampleChartOptions = pie1Options;
        }
    }
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
    color: var(--color-text-white);
    margin: 0;
}

/* .debug-page {
    padding: 20px;
} */
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

.fit-content {
    width: fit-content;
    box-sizing: border-box;
    max-width: 100%;
    margin-inline: auto;
}

/* DRAG TEST */
.drop-zone {
    height: 10px;
    background: transparent;

    position: relative;
    height: 2px;
    background: transparent;
    transition: background 0.2s;
}
.drop-zone.active {
    background: var(--color-primary); /* highlight color */
}

.draggable-item {
    /* padding: 10px; */
    height: 40px;
    background: var(--color-background-card);
}

.drag-handle {
    cursor: grab;
    user-select: none;
}

.drop-zone-area {
    height: 42px; /* invisible but still gets mouse events */
    position: absolute;
    width: 100%;
    transform: translateY(-21px); /* Height / 2  */
}

</style>