<template>
    <div class="drive-card card">
        <div class="name">
            <IconHDD colorHover="var(--color-text)"/>
            <span :class="{'text-loading-placeholder': loadingVersion}">
                {{ driveProperties?.name }}
            </span>
        </div>
        
        <div class="text">
            <div class="label">Used space</div>
            <div class="value" :class="{'text-loading-placeholder': loadingVersion}">
                {{ formatToBytes(driveProperties?.used || 0) }}
            </div>
            <div class="label">Available space</div>
            <div class="value" :class="{'text-loading-placeholder': loadingVersion}">
                {{ formatToBytes(driveProperties?.free || 0) }}
            </div>
            <div class="label">Disk size</div>
            <div class="value" :class="{'text-loading-placeholder': loadingVersion}">
                {{ formatToBytes(driveProperties?.total || 0) }}
            </div>
        </div>
        
        <div>
            <div class="capacityIndicator" :class="{'loading-placeholder': loadingVersion}">
                <div 
                    class="bar" 
                    :class="(driveProperties?.used / driveProperties?.total) < 0.9 ? 'positiveBackground' : 'negativeBackground'"
                    :style="{ width: (driveProperties?.used / driveProperties?.total * 100) + '%' }"
                ></div>
                <div class="text">
                    {{ (driveProperties?.used / driveProperties?.total * 100).toFixed(2) + '%' }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconHDD from '@/components/icons/IconHDD.vue';
import { convert } from '@/utils/utils';

export default {
    name: "DriveCard",
    components: {
        IconHDD,
    },
    methods: {
        formatToBytes(value) {
			return convert.toBytes(value);
		},
    },
    props: {
        driveProperties: {
            type: Object,
            default: null,
        },
        loadingVersion: {
            type: Boolean,
            default: false,
        }
    }
}
</script>

<style scoped>
.drive-card {
	width: 250px;
    max-width: 300px;
	/* animation: fadeIn 0.5s ease-out; */
}
.drive-card .name {
	font-weight: 700;
	font-size: var(--font-size-lg);
	display: flex;
	flex-direction: row;
	gap: var(--spacing-sm);
	margin-bottom: var(--spacing-sm);
    align-items: center;
    white-space: nowrap;
}
.drive-card .name .text-loading-placeholder {
    height: 25px;
    margin: 2px 0;
}
.drive-card .text {
	margin: 12px 0;
	display: grid;
	grid-template-columns: auto auto;
}
.drive-card .text .label {
	color: var(--color-text-light);
	margin-right: var(--spacing-md);
    white-space: nowrap;
}
.drive-card .text .value {
	font-weight: 500;
	text-align: end;
    white-space: nowrap;
}
.drive-card .text .value.text-loading-placeholder {
    margin-left: auto;
    height: 20px;
    width: 80%;
}

.capacityIndicator {
	width: 100%;
	height: 32px;
	background-color: var(--color-background-card-section);
	/* border: 1px solid var(--color-border); */
	border-radius: var(--border-radius-small);
	position: relative;
}
.capacityIndicator.loading-placeholder > * {
    opacity: 0;
}
.capacityIndicator .bar {
	height: 100%;
	border-radius: var(--border-radius-small);
}
.capacityIndicator .bar.positiveBackground {
	background-color: var(--color-positive);
}
.capacityIndicator .bar.negativeBackground {
	background-color: var(--color-negative);
}
.capacityIndicator .text {
	display: flex;
	position: absolute;
	justify-content: center;
	flex-direction: column;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	padding-left: 12px;
	font-weight: 500;
}

</style>