<template>
	<div class="home-page">
		<div class="content-width-large">
			<div class="greeting-area ">
				<div class="greeting">
					<h1>{{ greeting[0] }}</h1>
					<span class="header-sub-text">{{ greeting[1] }}</span>
				</div>
			</div>
		</div>
        
		<div class="content-width-large">
			<h2 class="service-links-header">
				Service links 
				<DropdownMenu
					:options="[
						{ label: 'Add service link', icon: 'bx-plus', action: () => handleServiceLinksCreateOrEdit() },
					]"
				/>
			</h2>
			<div class="service-links">
                <div
                    v-for="(service, index) in serviceUrls"
                    :key="index"
                    class="link-button-wrapper"
                >
                    <a 
                        :href="service.link"
                        rel="noreferrer"
                        class="link-button hover-decoration"
                    >
                        <div class="image-wrapper">
                            <img 
                                v-if="service.image_path"
                                :src="`${this.apiUrl}/media/image${service.image_path}`" 
                                @load="(event) => event.target.classList.add('loaded')"
                            >
                            <MissingImage v-else/>
                        </div>
                        <div class="service-text">
                            <div class="icon-align service-name">
								<div class="status-indicator" :class="{'available': service.status === true, 'unavailable': service.status === false}"></div>
                                <span>{{ service.name }}</span>
                                <IconLinkExternal left="4px" size="16px"/>
                            </div>
                            <div class="service-description">
                                {{ service.description }}
                            </div>
                        </div>
                    </a>
                    <DropdownMenu
                        :options="[
                            { label: 'Edit', icon: 'bxs-edit-alt', action: () => handleServiceLinksCreateOrEdit(service) },
                            { label: 'Delete', icon: 'bxs-trash', action: () => handleServiceLinkDelete(service.id) },
                        ]"
                    />
                </div>
			</div>
		</div>
		
		<ServiceLinkModal
			ref="serviceLinkModal"
		/>

        <ModalConfirmation
            ref="serviceLinkDeleteCM"
            header="Delete External Service Link"
            text="Are you sure you wish to delete this external service link? This action cannot be undone!"
            affirmative-option="Delete"
            negative-option="Cancel"
        />
	</div>
</template>

<script>
// Icons
import IconLinkExternal from '@/components/icons/IconLinkExternal.vue';

// Other
import fastApi from '@/utils/fastApi';
import { notify } from '@/utils/notification';
import { apiUrl } from '@/utils/config';
import { setTimeout } from 'core-js';
import ServiceLinkModal from '@/components/Dashboard/ServiceLinkModal.vue';
import DropdownMenu from '@/components/common/DropdownMenu.vue';
import MissingImage from '@/components/common/MissingImage.vue';
import ModalConfirmation from '@/components/common/ModalConfirmation.vue';

export default {
	name: 'HomePage',
	components: {
		ServiceLinkModal,
        MissingImage,
		DropdownMenu,
        ModalConfirmation,
        IconLinkExternal,
	},
	data() {
		return {
			greeting: this.getGreeting(),
			apiUrl: apiUrl,
			serviceUrls: [],
		};
	},
	methods: {
        openServerUsageChart(ref) {
            this.$refs[ref + "GM"].open();
            setTimeout(() => {
                this.$refs[ref + "Chart"].initializeChart();
            }, 1)
        },
		getGreeting() {
			const hour = new Date().getHours();
			if (hour < 5) {
				return ["Good night", "Hopefully you're actually getting some sleep and not scrolling through your phone."];
			} else if (hour < 12) {
				return ["Good morning", "Let's pretend you're already awake and fully functional."];
			} else if (hour < 18) {
				return ["Good afternoon", "Still pretending to be productive, I see."];
			} else {
				return ["Good evening", "Survived the day, huh? That's something."];
			}
		},
		async checkUrl(url) {
			try {
				const resp = await fetch(url, { method: 'HEAD' });
				return resp.ok;
			} catch (e) {
				console.error(e)
				return false;
			}
		},
		async getServiceLinks() {
			const response = await fastApi.account.get_external_service_links();
			if (response) {
				console.log(response);
				this.serviceUrls = response.links;
				for (const service of this.serviceUrls) {
					service.status = await this.checkUrl(service.link);
				}
			}
		},
        async handleServiceLinksCreateOrEdit(serviceData) {
            const response = await this.$refs.serviceLinkModal.prompt(serviceData);
            if (!response) return;
            
            this.getServiceLinks();
        },
        async handleServiceLinkDelete(linkId) {
            if (!await this.$refs.serviceLinkDeleteCM.prompt()) { return }
            
            const response = await fastApi.account.delete_external_service_links(linkId);
            if (response) {
                notify(response.message, "success");
                this.getServiceLinks();
            }
        },
	},
	watch: {
        serverLogsTimespan: {
            deep: true,
            async handler() {
                await this.fetchServerLogs(true);
            }
        }
    },
    async mounted() {
		// Get services from env
		this.getServiceLinks();
	}
};
</script>

<style scoped>

/* - - - - Greeting area - - - - */
.greeting-area {
	/* height: var(--greeting-area-height); */
	display: flex;
	position: relative;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
    box-sizing: border-box;
    margin-top: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.greeting-area .greeting {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.greeting-area .greeting h1 {
	margin: 0;
	/* Row gap? to large */
	line-height: 48px;
	font-size: 48px;
}
.greeting-area .greeting .header-sub-text {
	display: inline-block;
	color: var(--color-text-light);
	margin-top: var(--spacing-xs);
	/* margin-bottom: calc(var(--spacing-md) + var(--spacing-sm)); */
}

.greeting-area .info {
    display: flex;
    flex-direction: column;
    text-align: end;
}
.greeting-area .info .label {
    font-size: var(--font-size-xs);
    color: var(--color-text-light);
    /* font-weight: 500; */
}
.greeting-area .info .value {
    font-size: var(--font-size-lg);
    font-weight: 600;
}

@media (max-width: 600px) {
    .greeting-area {
        flex-direction: column;
		justify-content: left;
		align-items: start;
		gap: var(--spacing-md);
    }
	.greeting-area .info {
		text-align: start;
	}
}


/* - - - - Service links - - - - */
.service-links-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.service-links-header .dropdown-menu {
	position: relative;
	z-index: 1000;
}

.service-links {
	display: grid;
    grid-template-columns: 1fr 1fr 1fr;
	gap: var(--spacing-md);
}
.service-links .dropdown-menu {
    top: 12px;
    right: 8px;
    opacity: 0;
    transition: opacity 0.1s ease-out;
}
.pointer-device .service-links .link-button-wrapper:hover .dropdown-menu {
    opacity: 1;
}
.touch-device .service-links .dropdown-menu {
    opacity: 1;
}

.service-links .link-button-wrapper {
    position: relative;
}
.service-links .link-button {
    display: flex;
    justify-content: start;
    padding: var(--spacing-md);
    gap: var(--spacing-md);
}
.service-links .link-button:hover .service-name {
	text-decoration: underline;
}

.service-links .image-wrapper {
    min-width: 70px;
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
}
.service-links .image-wrapper img {
    max-height: 100%;
    max-width: 100%;
}

.service-links .status-indicator {
	height: 1rem;
	width: 1rem;
	margin-right: 0.33rem;
	background-color: var(--color-warning);
	border-radius: 100px;
}
.service-links .status-indicator.available {
	background-color: var(--color-positive);
}
.service-links .status-indicator.unavailable {
	background-color: var(--color-negative);
}

.service-links .service-description {
    color: var(--color-text-light);
    font-weight: 400;
    font-size: var(--font-size-xs);
}

@media (max-width: 1200px) {
    .service-links {
        grid-template-columns: 1fr 1fr;
    }
}
@media (max-width: 750px) {
    .service-links {
        grid-template-columns: 1fr;
    }
    .service-links .image-wrapper {
        min-width: 50px;
        width: 50px;
        height: 50px;
    }
}


/* - - - - Server resources - - - - */
.server-resource-usage .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}
.server-resource-usage .header .selector {
    width: 150px;
    column-gap: var(--spacing-sm);
}
.server-resource-usage .header .custom-select {
    flex: 1;
}
.server-resource-chart {
    min-height: 350px;
}
.server-resource-chart.cpu-temp,
.server-resource-chart.network {
    height: 350px;
}

.server-resource-usage .data {
    max-width: 100%;
	display: grid;
    grid-template-columns: 3fr 4fr;
    grid-template-areas: 
		"widgets cpu-usage"
		"network cpu-temp"
		"drives drives";
    gap: var(--spacing-md);
}
.server-resource-usage .data .widgets {
    grid-area: widgets;
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex-wrap: wrap;
    flex-direction: row;
    gap: var(--spacing-md);
}
.server-resource-usage .data .drives {
	grid-area: drives;
	display: flex;
	flex-wrap: wrap;
	gap: var(--spacing-md);
}
.server-resource-usage .data .drives .drive-card {
	flex: 1;
}

@media (max-width: 1000px) {
    .server-resource-usage .data {
        grid-template-columns: 1fr 1fr;
        grid-template-areas: 
			"widgets widgets"
			"cpu-usage cpu-temp"
			"network network"
			"drives drives";
    }
    .server-resource-usage .data .widgets {
        grid-template-columns: 1fr 1fr 1fr;
    }
}

@media (max-width: 600px) {
    .server-resource-usage .data {
        grid-template-columns: 1fr;
        grid-template-areas: "widgets"
                            "cpu-usage"
                            "cpu-temp"
                            "network"
							"drives";
    }
    .server-resource-usage .data .widgets {
        grid-template-columns: 1fr 1fr;
    }
	.server-resource-usage .data .drives .drive-card {
		max-width: unset;
	}
}

.info-tile {
    background-color: var(--color-background-card);
    padding: var(--spacing-md);
    padding-right: calc(var(--spacing-sm) + 20px + var(--spacing-md));
    border-radius: var(--border-radius-sm);
    position: relative;
    overflow: hidden;
}
.info-tile .label {
    font-size: var(--font-size-xs);
    color: var(--color-text-lighter);
    margin-bottom: var(--spacing-sm);
}
.info-tile .current {
    font-size: var(--font-size-xl);
    font-weight: 600;
}
.info-tile .max {
    color: var(--color-text-light);
    /* font-size: var(--font-size-lg); */
}
.info-tile .indicator-holder {
    position: absolute;
    width: 20px;
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
}

.containers {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
	justify-items: auto;
    gap: var(--spacing-md);
}
.containers > * {
	flex: 1;
}

.server-resource-usage .data .cpu-usage {
    grid-area: cpu-usage;
}
.server-resource-usage .data .cpu-temp {
    grid-area: cpu-temp;
}
.server-resource-usage .data .network {
    grid-area: network;
}

/* - - - - - Fastapi analysis - - - - */
.fastapi-analysis {
    gap: var(--spacing-md);
    display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-areas: 
		"single-values single-values single-values"
		"over-time over-time response-time"
		"client-ip status-code request-method"
		"requests requests error-codes";
}

.fastapi-analysis .single-values {
	display: flex;
	flex-direction: row;
	gap: var(--spacing-md);
	grid-area: single-values;
}

.fastapi-over-time {
	grid-area: over-time;
}
.fastapi-response-time {
	grid-area: response-time;
}
.fastapi-client-ip {
	grid-area: client-ip;
}
.fastapi-status-code {
	grid-area: status-code;
}
.fastapi-request-method {
	grid-area: request-method;
}
.fastapi-requests-by-endpoint {
	grid-area: requests;
	height: 500px;
	box-sizing: border-box;
	overflow: hidden;
}
.fastapi-error-codes {
	grid-area: error-codes;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}
.fastapi-error-codes .content-not-found {
	flex: 1;
	margin-bottom: 10%;
}

.server-info-row {
	display: grid;
	grid-template-columns: auto 80px 120px;
	gap: 0;
}

.server-info-row .endpoint-name {
	text-align: start;
	color: var(--color-text-light);
	white-space: nowrap;
	overflow: hidden;
	mask-image: linear-gradient(to right, var(--color-text) 80%, rgba(255, 255, 255, 0) 100%);
}
.server-info-row .endpoint-value {
	text-align: end;
	color: var(--color-text);
	font-weight: 500;
}
.server-info-row .endpoint-label {
	/* Overwrite the properties for the labels */
	font-weight: 600;
	color: var(--color-text);
}

.server-info-scroll {
	overflow: scroll;
	max-height: 100%;
}

.fastapi-chart {
	height: 500px;
}
.fastapi-piechart {
	height: 300px;
}

@media (max-width: 600px) {
	.fastapi-analysis {
		grid-template-columns: 1fr;
		grid-template-areas: 
			"single-values"
			"over-time"
			"response-time"
			"client-ip"
			"status-code"
			"request-method"
			"error-codes"
			"requests ";
	}
	.fastapi-chart {
		height: 350px;
	}
	.fastapi-piechart {
		height: 250px;
	}
}


/* - - - - Backup cards - - - - */
.backups {
    width: 100%;
    gap: 20px; /* Replace the margin of the default card with this to prevent extra spaces */
	display: flex;
	flex-direction: column;
}

.backup-card {
    width: 100%;
    box-sizing: border-box; /* Ensures padding does not affect the width */
	padding-bottom: 0; /* Get rid of the extra padding at the bottom since the lastbackup has the padding already*/
	margin: 0;
}

.backup-card .header {
	font-weight: 700;
	font-size: 18px;
	margin-bottom: var(--spacing-md);
	gap: var(--spacing-sm);
	align-items: center;
}

.backup-row {
	border-top: 2px solid var(--color-border);
	width: 100%;
	padding: var(--spacing-md) 0;
	display: flex;
	flex-direction: column;
	gap: var(--spacing-sm);
	align-items: start;
	font-weight: 500;
}

.backup-row .name {
	color: var(--color-text);
	font-weight: 800;
	padding-left: var(--spacing-sm);
}

.backup-row .content {
    display: grid;
    grid-template-columns: 220px 1fr;
    column-gap: var(--spacing-lg);
	row-gap: var(--spacing-sm);
    width: 100%;
}

.backup-row .schedule {
	color: var(--color-text-light);
	font-weight: 400;
}
.backup-row .label-text {
	color: var(--color-text-light);
	/* padding-right: var(--spacing-md); */
	width: 100px;
	min-width: 100px;
	font-weight: 400;
	white-space: nowrap;
}
.backup-row .path-column {
	display: flex;
	flex-direction: row;
	align-items: start;
	overflow: hidden;
	mask-image: linear-gradient(to right, var(--color-text) 80%, rgba(255, 255, 255, 0) 100%);
}
.backup-row .path {
	white-space: nowrap;
	cursor: pointer;
}
@media(max-width: 575px) {
	.backup-row .content {
		grid-template-columns: auto;
	}
}

.bad {
	color: var(--color-negative);
}
.warning {
	color: var(--color-warning);
}
.good {
	color: var(--color-positive);
}


</style>
