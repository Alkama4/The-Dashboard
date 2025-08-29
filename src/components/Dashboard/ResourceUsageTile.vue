<template>
    <div>
        <div class="info-tile card" @click="openChart">
            <div class="card-label" :class="{'text-loading-placeholder': label == undefined}">
                {{ label }}
            </div>
            <div class="card-value" :class="{'text-loading-placeholder': currentFormatted == undefined}">
                {{ currentFormatted || '0' }}
            </div>
            <div class="max" :class="{'text-loading-placeholder': maxFormatted == undefined}">
                /{{ maxFormatted || '0' }}
            </div>
            <div class="indicator-holder">
                <div
                    class="indicator"
                    :style="{
                        height: (current / max) * 100 + '%',
                        backgroundColor: indicatorColor
                    }"
                ></div>
            </div>
        </div>
        <ModalGeneric ref="modalRef" :showDefaultcontent="false">
            <ChartComponent
                :chartOptionsGenerator="chartOptionsGenerator"
                ref="chartRef"
                class="modal-chart"
                @fullscreen-toggle="$refs.modalRef.setOffcenter"
            />
        </ModalGeneric>
    </div>
</template>

<script>
import ChartComponent from '@/components/common/ChartComponent.vue';
import ModalGeneric from '@/components/common/ModalGeneric.vue';

export default {
    name: 'ResourceUsageTile',
    props: {
        label: String,
        current: Number,
        max: Number,
        currentFormatted: String,
        maxFormatted: String,
        indicatorColor: String,
        chartOptionsGenerator: Function
    },
    components: {
        ModalGeneric,
        ChartComponent,
    },
    methods: {
        openChart() {
            this.$refs.modalRef.open();
            setTimeout(() => {
                this.$refs.chartRef.initializeChart();
            }, 100);
        }
    }
}
</script>


<style scoped>
.info-tile {
    --indicator-width: 16px;
    background-color: var(--color-background-card);
    padding: var(--spacing-md);
    padding-right: calc(var(--spacing-sm) + var(--indicator-width) + var(--spacing-md));
    border-radius: var(--border-radius-large);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: background-color 0.1s ease-out;
    border: 1px solid var(--color-border);
}
.pointer-device .info-tile:hover {
    background-color: var(--color-background-card-hover);
}
.info-tile .card-label {
    margin-bottom: var(--spacing-sm);
}
.info-tile .max {
    color: var(--color-text-light);
    font-weight: 600;
}
.info-tile .max.text-loading-placeholder {
    color: transparent;
    height: 25px;
    max-width: 100px;
    margin-top: 4px;
}
.info-tile .indicator-holder {
    position: absolute;
    width: var(--indicator-width);
    height: 100%;
    right: 0;
    top: 0;
    background-color: var(--color-border);
}
.info-tile .indicator {
    position: absolute;
    width: 100%;
    height: 0%;
    right: 0;
    bottom: 0;
    background-color: var(--color-primary);
    transition: height 2s var(--cubic-1);
}

.modal-chart {
    width: 66vw;
    height: 50vh;
}

</style>
