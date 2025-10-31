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
            <h2>
				Service links 
				<IconAdd
					class="icon-button"
					@click="handleServiceLinksCreateOrEdit()"
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
                        class="link-button no-decoration hover-decoration"
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
                                {{ service.name }}
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
import { convert, getCssVar } from '@/utils/utils'
import { notify } from '@/utils/notification';
import { 
    generateTooltipMultiValue, 
	generateTooltipSingleValue,
	generateTooltipCustomValues,
	commonChartValues,
} from '@/utils/chartUtils'
import { apiUrl, portainerUrl } from '@/utils/config';
import { setTimeout } from 'core-js';
import ServiceLinkModal from '@/components/Dashboard/ServiceLinkModal.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
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
		IconAdd,
	},
	data() {
		return {
			greeting: this.getGreeting(),
			apiUrl: apiUrl,
            isLoaded: {},
			chartValueGenerators: {},
			waitingFor: [],
			// Data on site
			serviceUrls: [],
			backups: [],
			serverStats: {
				storage: [],
				fastapiData: {
					noErrorCodesFound: false,
				},
                uptimeSeconds: 0,
			},
            secondsPassed: 0,
			serverLogsTimespan: "15m",
			serverLogsTimespans: [
				{label: "15 min", value: "15m"},
				{label: "30 min", value: "30m"},
				{label: "1 hour", value: "1h"},
				{label: "3 hours", value: "3h"},
				{label: "6 hours", value: "6h"},
				{label: "12 hours", value: "12h"},
				{label: "24 hours", value: "24h"},
			],
            current: {},
            portainerUrl: portainerUrl,
			containerInfo: {},
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
		formatToBytes(value) {
			return convert.toBytes(value);
		},
		formatToPercentage(value) {
			return convert.toPercentage(value);
		},
		formatToMs(value) {
			return convert.toFiNumber(value, 0) + " ms";
		},
        formattedUptime() {
            const uptime = Math.floor(this.serverStats.uptimeSeconds);
            return convert.toTime(uptime + this.secondsPassed, -1);
        },
		copyToClipboard(textToCopy, what) {
			try {
				if (navigator.clipboard && navigator.clipboard.writeText) {
					navigator.clipboard.writeText(textToCopy)
						.then(() => notify(`${what} copied!`, "info", 2000))
						.catch(err => {
							notify("Cannot copy text to clipboard.", "error");
							console.error("[copyToClipboard]", err);
						});
				} else {
					const textarea = document.createElement("textarea");
					textarea.value = textToCopy;
					textarea.style.position = "fixed"; // Avoid scrolling to the bottom
					document.body.appendChild(textarea);
					textarea.focus();
					textarea.select();
					try {
						document.execCommand("copy");
						notify(`${what} copied!`, "info", 2000);
					} catch (err) {
						notify("Cannot copy text to clipboard.", "error");
						console.error("[copyToClipboard fallback]", err);
					}
					document.body.removeChild(textarea);
				}
			} catch (error) {
				notify("Cannot copy text to clipboard.", "error");
				console.error("[copyToClipboard]", error);
			}
		},
		async getServiceLinks() {
			const response = await fastApi.account.get_external_service_links();
			if (response) {
				console.log(response);
				this.serviceUrls = response.links;
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
		removeItemFromWaitingArray(item) {
            this.waitingFor = this.waitingFor.filter(i => i !== item);
        },
        async fetchContainerInfo() {
            this.containerInfo = await fastApi.server.containers();
        },
		async fetchServerLogs(refresh = false) {
			this.waitingFor.push("fetchServerLogs");

			const resourceLogsResponse = await fastApi.server.logs.system_resources(this.serverLogsTimespan);
			// console.log("resourceLogsResponse", resourceLogsResponse);
			if (resourceLogsResponse && resourceLogsResponse.data) {
				this.serverStats.uptimeSeconds = resourceLogsResponse.uptime_seconds;

                // Timestamps for all charts
				const resourceLogsTimeStamps = resourceLogsResponse.data.map(log => log.timestamp);
                
				const chartCpuUsageYaxisValues = resourceLogsResponse.data.map(log => log.cpu_usage);
                this.current.cpuUsage = chartCpuUsageYaxisValues[chartCpuUsageYaxisValues.length - 1];
                this.current.cpuUsageMax = 100;
                this.current.cpuUsageFormatted = convert.toPercentage(this.current.cpuUsage);
                this.current.cpuUsageMaxFormatted = convert.toPercentage(this.current.cpuUsageMax);

				const chartCpuTempYaxisValues = resourceLogsResponse.data.map(log => log.cpu_temperature);
                this.current.cpuTemp = chartCpuTempYaxisValues[chartCpuTempYaxisValues.length - 1];
                this.current.cpuTempMax = 80;
                this.current.cpuTempFormatted = convert.toCelcius(this.current.cpuTemp);
                this.current.cpuTempMaxFormatted = convert.toCelcius(this.current.cpuTempMax);

				const chartRamUsageYaxisValues = resourceLogsResponse.data.map(log => log.ram_usage_bytes);
				const chartRamUsageMaxValue = resourceLogsResponse.max_ram_bytes;
                this.current.ramUsage = chartRamUsageYaxisValues[chartRamUsageYaxisValues.length - 1];
                this.current.ramUsageMax = chartRamUsageMaxValue;
                this.current.ramUsageFormatted = convert.toBytes(this.current.ramUsage);
                this.current.ramUsageMaxFormatted = convert.toBytes(this.current.ramUsageMax);

				const chartSwapUsageYaxisValues = resourceLogsResponse.data.map(log => log.swap_usage_bytes);
				const chartSwapUsageMaxValue = resourceLogsResponse.max_swap_bytes;
                this.current.swapUsage = chartSwapUsageYaxisValues[chartSwapUsageYaxisValues.length - 1];
                this.current.swapUsageMax = chartSwapUsageMaxValue;
                this.current.swapUsageFormatted = convert.toBytes(this.current.swapUsage);
                this.current.swapUsageMaxFormatted = convert.toBytes(this.current.swapUsageMax);

				const chartCpuFreqYaxisValues = resourceLogsResponse.data.map(log => log.cpu_clock_mhz / 1000);
                this.current.cpuFreq = chartCpuFreqYaxisValues[chartCpuFreqYaxisValues.length - 1];
                this.current.cpuFreqMax = 1.8;
                this.current.cpuFreqFormatted = convert.toFrequency(this.current.cpuFreq);
                this.current.cpuFreqMaxFormatted = convert.toFrequency(this.current.cpuFreqMax);

				const chartNetRecvYaxisValues = resourceLogsResponse.data.map((log, index, array) => {
					if (index === 0) return 0;	// The first one can't have a differnce
					const difference = (log.network_recv_bytes - array[index - 1].network_recv_bytes) / 10;		// Calculate
					return difference > 0 ? difference : 0;	// If negative the server propably reset the count so set to 0
				});
                this.current.netRecv = chartNetRecvYaxisValues[chartNetRecvYaxisValues.length - 1];
                this.current.netRecvMax = 1E9 / 8;
                this.current.netRecvFormatted = convert.toBytesPerSecond(this.current.netRecv);
                this.current.netRecvMaxFormatted = convert.toBytesPerSecond(this.current.netRecvMax);
                
				const chartNetSentYaxisValues = resourceLogsResponse.data.map((log, index, array) => {
					if (index === 0) return 0;	// The first one can't have a differnce
					const difference = (-log.network_sent_bytes + array[index - 1].network_sent_bytes) / 10;	// Calculate
					return difference < 0 ? difference : 0;	// If negative the server propably reset the count so set to 0
				});
                this.current.netSent = -chartNetSentYaxisValues[chartNetSentYaxisValues.length - 1];
                this.current.netSentMax = 1E9 / 8;
                this.current.netSentFormatted = convert.toBytesPerSecond(this.current.netSent);
                this.current.netSentMaxFormatted = convert.toBytesPerSecond(this.current.netSentMax);


				// Chart CPU temperature
				const chartCpuTempOptions = () => ({
					textStyle: commonChartValues().textStyle,
					title: {
						text: 'CPU temperature',
						textStyle: {
							color: getCssVar('color-text'),
							fontSize: 24,
						}
					},
					color: [getCssVar('color-secondary')],
					tooltip: { 
						trigger: 'axis',
						backgroundColor: getCssVar('color-background-card'),
						borderWidth: 1,
						borderColor: getCssVar("color-border"),
						formatter: params => generateTooltipMultiValue(params, 'timeInSeconds', convert.toCelcius, false)
					},
					grid: {
						left: 56,
						right: 8,
						top: 80,
						bottom: 64,
					},
					xAxis: {
						type: 'category',
						data: resourceLogsTimeStamps,
						axisLabel: {
							rotate: 45,
							formatter: value => convert.toFiDate(value, 'timeInSeconds'),
						},
						axisTick: {
							alignWithLabel: true
						},
					},
					yAxis: { 
						type: 'value',      
						name: 'Temp (°C)',  // Y-akselin nimi
						axisLabel: {        // Y-akselin arvojen muotoilu
							formatter: value => convert.toFiNumber(value)
						},
						splitLine: commonChartValues().splitLine,
					},
					series: [
						{
							name: 'Temperature',    // Tooltipissa näkyvä nimi
							type: 'line',
							areaStyle: {
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0, color: getCssVar("color-secondary")
									}, {
										offset: 1, color: 'rgba(0,0,0,0)'
									}]
								}
							},
							data: chartCpuTempYaxisValues,
							smooth: true,
						},
					],
				});
				// Set the value generator for the chart
				this.chartValueGenerators.chartCpuTemp = chartCpuTempOptions;

				// Chart RAM Usage
				const chartRamUsageOptions = () => ({
					textStyle: commonChartValues().textStyle,
					title: {
						text: 'RAM Usage',
						textStyle: {
							color: getCssVar('color-text'),
							fontSize: 24,
						}
					},
					color: [getCssVar('color-tertiary')],
					tooltip: { 
						trigger: 'axis',
						backgroundColor: getCssVar('color-background-card'),
						borderWidth: 1,
						borderColor: getCssVar("color-border"),
						formatter: params => generateTooltipMultiValue(params, 'timeInSeconds', convert.toBytes, false)
					},
					grid: {
						left: 56,
						right: 8,
						top: 80,
						bottom: 64,
					},
					xAxis: {
						type: 'category',
						data: resourceLogsTimeStamps,
						axisLabel: {
							rotate: 45,
							formatter: value => convert.toFiDate(value, 'timeInSeconds'),
						},
						axisTick: {
							alignWithLabel: true
						},
					},
					yAxis: { 
						type: 'value',      
						name: 'Usage (bytes)',  // Y-akselin nimi
						max: chartRamUsageMaxValue,
						min: 0,
						axisLabel: {        // Y-akselin arvojen muotoilu
							formatter: value => convert.toBytes(value)
						},
						splitLine: commonChartValues().splitLine,
					},
					series: [
						{
							name: 'RAM Usage',    // Tooltipissa näkyvä nimi
							type: 'line',
							areaStyle: {},
							data: chartRamUsageYaxisValues,
							smooth: true,
						},
					],
				});
				// Set the value generator for the chart
				this.chartValueGenerators.chartRamUsage = chartRamUsageOptions;

				// Chart 3 - CPU Usage
				const chartCpuUsageOptions = () => ({
					textStyle: commonChartValues().textStyle,
					title: {
						text: 'CPU Usage',
						textStyle: {
							color: getCssVar('color-text'),
							fontSize: 24,
						}
					},
					color: [getCssVar('color-primary')],
					tooltip: { 
						trigger: 'axis',
						backgroundColor: getCssVar('color-background-card'),
						borderWidth: 1,
						borderColor: getCssVar("color-border"),
						formatter: params => generateTooltipMultiValue(params, 'timeInSeconds', convert.toPercentage, false)
					},
					grid: {
						left: 56,
						right: 8,
						top: 80,
						bottom: 64,
					},
					xAxis: {
						type: 'category',
						data: resourceLogsTimeStamps,
						axisLabel: {
							rotate: 45,
							formatter: value => convert.toFiDate(value, 'timeInSeconds'),
						},
						axisTick: {
							alignWithLabel: true
						},
					},
					yAxis: { 
						type: 'value',      
						name: 'Usage (%)',  // Y-akselin nimi
						max: 100,
						min: 0,
						axisLabel: {        // Y-akselin arvojen muotoilu
							formatter: value => convert.toFiNumber(value)
						},
						splitLine: commonChartValues().splitLine,
					},
					series: [
						{
							name: 'CPU Usage',    // Tooltipissa näkyvä nimi
							type: 'line',
							areaStyle: {},
							data: chartCpuUsageYaxisValues,
							smooth: true,
						},
					],
				});
				// Set the value generator for the chart
				this.chartValueGenerators.chartCpuUsage = chartCpuUsageOptions;

				// Chart 4 - Swap Usage
				const chartSwapUsageOptions = () => ({
					textStyle: commonChartValues().textStyle,
					title: {
						text: 'Swap Usage',
						textStyle: {
							color: getCssVar('color-text'),
							fontSize: 24,
						}
					},
					color: [getCssVar('color-septenary')],
					tooltip: { 
						trigger: 'axis',
						backgroundColor: getCssVar('color-background-card'),
						borderWidth: 1,
						borderColor: getCssVar("color-border"),
						formatter: params => generateTooltipMultiValue(params, 'timeInSeconds', convert.toBytes, false)
					},
					grid: {
						left: 56,
						right: 8,
						top: 80,
						bottom: 64,
					},
					xAxis: {
						type: 'category',
						data: resourceLogsTimeStamps,
						axisLabel: {
							rotate: 45,
							formatter: value => convert.toFiDate(value, 'timeInSeconds'),
						},
						axisTick: {
							alignWithLabel: true
						},
					},
					yAxis: { 
						type: 'value',      
						name: 'Usage (bytes)',  // Y-akselin nimi
						max: chartSwapUsageMaxValue,
						min: 0,
						axisLabel: {        // Y-akselin arvojen muotoilu
							formatter: value => convert.toBytes(value)
						},
						splitLine: commonChartValues().splitLine,
					},
					series: [
						{
							name: 'Swap Usage',    // Tooltipissa näkyvä nimi
							type: 'line',
							areaStyle: {},
							data: chartSwapUsageYaxisValues,
							smooth: true,
						},
					],
				});
				// Set the value generator for the chart
				this.chartValueGenerators.chartSwapUsage = chartSwapUsageOptions;

				// Chart Cpu Frequenzy
				const chartCpuFreqOptions = () => ({
					textStyle: commonChartValues().textStyle,
					title: {
						text: 'CPU Frequenzy',
						textStyle: {
							color: getCssVar('color-text'),
							fontSize: 24,
						}
					},
					color: [getCssVar('color-quinary')],
					tooltip: { 
						trigger: 'axis',
						backgroundColor: getCssVar('color-background-card'),
						borderWidth: 1,
						borderColor: getCssVar("color-border"),
						formatter: params => generateTooltipMultiValue(params, 'timeInSeconds', convert.toFrequency, false)
					},
					grid: {
						left: 56,
						right: 8,
						top: 80,
						bottom: 64,
					},
					xAxis: {
						type: 'category',
						data: resourceLogsTimeStamps,
						axisLabel: {
							rotate: 45,
							formatter: value => convert.toFiDate(value, 'timeInSeconds'),
						},
						axisTick: {
							alignWithLabel: true
						},
					},
					yAxis: { 
						type: 'value',      
						name: 'Frequency (GHz)',  // Y-akselin nimi
						min: 0,
						axisLabel: {        // Y-akselin arvojen muotoilu
							formatter: value => convert.toFiNumber(value)
						},
						splitLine: commonChartValues().splitLine,
					},
					series: [
						{
							name: 'CPU Frequenzy',    // Tooltipissa näkyvä nimi
							type: 'line',
							areaStyle: {},
							data: chartCpuFreqYaxisValues,
							smooth: true,
						},
					],
				});
				// Set the value generator for the chart
				this.chartValueGenerators.chartCpuFreq = chartCpuFreqOptions;

				// Chart 6 - Network up/down
				const chartNetUsageOptions = () => ({
					textStyle: commonChartValues().textStyle,
					title: {
						text: 'Network up/down',
						textStyle: {
							color: getCssVar('color-text'),
							fontSize: 24,
						}
					},
					color: [getCssVar('color-jokumikalie'), getCssVar('color-senary')],
					tooltip: { 
						trigger: 'axis',
						backgroundColor: getCssVar('color-background-card'),
						borderWidth: 1,
						borderColor: getCssVar("color-border"),
						formatter: params => generateTooltipMultiValue(params, 'timeInSeconds', convert.toBytesPerSecond, false)
					},
					grid: {
						left: 56,
						right: 8,
						top: 80,
						bottom: 64,
					},
					xAxis: {
						type: 'category',
						data: resourceLogsTimeStamps,
						axisLabel: {
							rotate: 45,
							formatter: value => convert.toFiDate(value, 'timeInSeconds'),
						},
						axisTick: {
							alignWithLabel: true
						},
					},
					yAxis: { 
						type: 'value',      
						name: 'Data (Mt/s)',  // Y-akselin nimi
						axisLabel: {        // Y-akselin arvojen muotoilu
							formatter: value => convert.toFiNumber(value / 1_000_000)
						},
						splitLine: commonChartValues().splitLine,
					},
					series: [
						{
							name: 'Data received',    // Tooltipissa näkyvä nimi
							type: 'line',
							areaStyle: {},
							data: chartNetRecvYaxisValues,
							smooth: true,
						},
						{
							name: 'Data sent',    // Tooltipissa näkyvä nimi
							type: 'line',
							areaStyle: {},
							data: chartNetSentYaxisValues,
							smooth: true,
						},
					],
				});
				// Set the value generator for the chart
				this.chartValueGenerators.chartNetUsage = chartNetUsageOptions;
			}

			if (refresh) {
				// HERE IMPLEMENT A PROPER PER CHART REFHRESH EVENTS INSTEAD OF A GLOBAL ONE

				// Tiny delay to let the data to update first
				setTimeout(() => {
					console.log("Refreshing");
					const event = new CustomEvent("darkModeChange", { detail: true });
					window.dispatchEvent(event);
				}, 1);
			}

			this.removeItemFromWaitingArray("fetchServerLogs");
		},
		async fetchFastapiLogs() {
			// Fastapi logs data
			const fastapiLogDataResponse = await fastApi.server.logs.fastapi("24h");
			if (fastapiLogDataResponse && fastapiLogDataResponse.data) {
				this.serverStats.fastapiData = fastapiLogDataResponse.data;
				// console.log("Fastapi data: ", this.serverStats.fastapiData);

				const chart7Values = fastapiLogDataResponse.data.client_ip_count.map(item => ({
					name: item.client_ip,
					value: item.count,
				}));
				const chart8Values = fastapiLogDataResponse.data.status_code.map(item => ({
					name: item.status_code,
					value: item.count,
				}));
				const chart9Values = fastapiLogDataResponse.data.method_count.map(item => ({
					name: item.method,
					value: item.count,
				}));

				// Need to multiply by 60 (for s in min) * 1000 (for ms in s)
				const chart10Timestamps = fastapiLogDataResponse.data.requests_over_time.map(log => new Date(new Number(log.minute_bucket * 60000)));	
				const chart10Values = fastapiLogDataResponse.data.requests_over_time.map(log => log.count);

				const chart11Timestamps = fastapiLogDataResponse.data.backend_time_histogram.map(item => item.time_range);
				const chart11Values = fastapiLogDataResponse.data.backend_time_histogram.map(item => item.count);


				// - - - - - Chart 12 values - - - - -
				const errorSeries = [];
				const endpointNames = [];
				const errorCodeMap = {};

				if (fastapiLogDataResponse.data.endpoint_error_summary.length == 0) {
					this.serverStats.fastapiData.noErrorCodesFound = true;
				} else {
					// Loop through each endpoint's error summary
					fastapiLogDataResponse.data.endpoint_error_summary.forEach(endpoint => {
						endpointNames.push(endpoint.endpoint);
	
						// Loop through the errors of each endpoint
						endpoint.errors.forEach(error => {
							const { status_code: errorCode, count: errorCount } = error;
	
							// Initialize the series for this error code if not already initialized
							if (!errorCodeMap[errorCode]) {
								errorCodeMap[errorCode] = {
									name: `Error ${errorCode} count`,
									type: 'bar',
									stack: true,
									data: Array(fastapiLogDataResponse.data.endpoint_error_summary.length).fill(0)
								};
							}
	
							const endpointIndex = endpointNames.length - 1;
							errorCodeMap[errorCode].data[endpointIndex] = errorCount;
						});
					});
	
					// Convert errorCodeMap to an array
					for (const errorCode in errorCodeMap) {
						errorSeries.push(errorCodeMap[errorCode]);
					}
				}

				// Chart 7 - FASTAPI
				const chart7Options = () => ({
					textStyle: commonChartValues().textStyle,
					title: {
						text: 'Fastapi requests by client IP',
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
						formatter: params => generateTooltipSingleValue(params, 'count'),
					},
					series: [
						{
							name: 'Client IP',
							type: 'pie',
							label: {
								color: getCssVar('color-text'),
							},
							data: chart7Values,
						},
					],
				});
				// Set the value generator for the chart
				this.chartValueGenerators.chart7 = chart7Options;

				// Chart 8 - FASTAPI
				const chart8Options = () => ({
					textStyle: commonChartValues().textStyle,
					title: {
						text: 'Fastapi requests by status code',
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
						formatter: params => generateTooltipSingleValue(params, 'count'),
					},
					series: [
						{
							name: 'Status Code',
							type: 'pie',
							label: {
								color: getCssVar('color-text'),
							},
							data: chart8Values,
						},
					],
				});
				// Set the value generator for the chart
				this.chartValueGenerators.chart8 = chart8Options;

				// Chart 9 - FASTAPI
				const chart9Options = () => ({
					textStyle: commonChartValues().textStyle,
					title: {
						text: 'Fastapi requests by method',
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
						formatter: params => generateTooltipSingleValue(params, 'count'),
					},
					series: [
						{
							name: 'Request Method',
							type: 'pie',
							label: {
								color: getCssVar('color-text'),
							},
							data: chart9Values,
						},
					],
				});
				// Set the value generator for the chart
				this.chartValueGenerators.chart9 = chart9Options;

				// Chart 10 - FASTAPI
				const chart10Options = () => ({
					textStyle: commonChartValues().textStyle,
					title: {
						text: 'Fastapi requests over time',
						textStyle: {
							color: getCssVar('color-text'),
							fontSize: 24,
						}
					},
					color: [getCssVar('color-septenary')],
					tooltip: { 
						trigger: 'axis',
						backgroundColor: getCssVar('color-background-card'),
						borderWidth: 1,
						borderColor: getCssVar("color-border"),
						formatter: params => generateTooltipMultiValue(params, 'timetimeInMinutes', convert.toFiCount, false)
					},
					grid: {
						left: 48,
						right: 8,
						top: 80,
						bottom: 64,
					},
					xAxis: {
						type: 'category',
						data: chart10Timestamps,
						axisLabel: {
							rotate: 45,
							formatter: value => convert.toFiDate(value, "timetimeInMinutes"),
						},
						axisTick: {
							alignWithLabel: true
						},
					},
					yAxis: { 
						type: 'value',      
						name: 'Requests (kpl)',  // Y-akselin nimi
						axisLabel: {        // Y-akselin arvojen muotoilu
							formatter: value => convert.toFiCount(value)
						},
						splitLine: commonChartValues().splitLine,
					},
					series: [
						{
							name: 'Reqests/min',    // Tooltipissa näkyvä nimi
							type: 'line',
							areaStyle: {},
							data: chart10Values,
							smooth: true,
						},
					],
				});
				// Set the value generator for the chart
				this.chartValueGenerators.chart10 = chart10Options;

				// Chart 11 - FASTAPI
				const chart11Options = () => ({
					textStyle: commonChartValues().textStyle,
					title: {
						text: 'Fastapi response times',
						textStyle: {
							color: getCssVar('color-text'),
							fontSize: 24,
						}
					},
					color: [getCssVar('color-octonary')],
					tooltip: { 
						trigger: 'axis',
						backgroundColor: getCssVar('color-background-card'),
						borderWidth: 1,
						borderColor: getCssVar("color-border"),
						formatter: params => generateTooltipMultiValue(params, 'none', convert.toFiCount, false),
						axisPointer: {
							type: 'shadow',  // Ensure axisPointer is also here
							shadowStyle: {
								color: getCssVar('color-border'),
								opacity: 1,
							},
						}
					},
					grid: {
						left: 64,
						right: 8,
						top: 80,
						bottom: 80,
					},
					xAxis: {
						type: 'category',
						data: chart11Timestamps,
						axisLabel: {
							rotate: 45,
							// formatter: value => convert.toFiDate(value, "time"),
						},
						axisTick: {
							alignWithLabel: true
						},
					},
					yAxis: { 
						type: 'value',      
						name: 'Backend time (ms)',  // Y-akselin nimi
						axisLabel: {        // Y-akselin arvojen muotoilu
							formatter: value => convert.toFiCount(value)
						},
						splitLine: commonChartValues().splitLine,
					},
					series: [
						{
							name: 'Reqests',    // Tooltipissa näkyvä nimi
							type: 'bar',
							data: chart11Values,
							barWidth: '100%',
						},
					],
				});
				// Set the value generator for the chart
				this.chartValueGenerators.chart11 = chart11Options;

				// Chart 12 - FASTAPI
				const chart12Options = () => ({
					textStyle: commonChartValues().textStyle,
					title: {
						text: 'Error codes by endpoint',
						textStyle: {
							color: getCssVar('color-text'),
							fontSize: 24,
						}
					},
					color: commonChartValues().color,
					tooltip: { 
						trigger: 'axis',
						backgroundColor: getCssVar('color-background-card'),
						borderWidth: 1,
						borderColor: getCssVar("color-border"),
						formatter: params => generateTooltipMultiValue(params, 'none', convert.toFiCount, false),
						axisPointer: {
							type: 'shadow',  // Ensure axisPointer is also here
							shadowStyle: {
								color: getCssVar('color-border'),
								opacity: 1,
							},
						}
					},
					grid: {
						left: 64,
						right: 8,
						top: 80,
						bottom: 64,
					},
					xAxis: {
						type: 'category',
						data: endpointNames,
						axisLabel: {
							rotate: 45,
							// formatter: value => convert.toFiDate(value, "time"),
						},
						axisTick: {
							alignWithLabel: true
						},
					},
					yAxis: { 
						type: 'value',      
						name: 'Error count (kpl)',  // Y-akselin nimi
						axisLabel: {        // Y-akselin arvojen muotoilu
							formatter: value => convert.toFiCount(value)
						},
						splitLine: commonChartValues().splitLine,
					},
					series: errorSeries
				});
				// Set the value generator for the chart
				this.chartValueGenerators.chart12 = chart12Options;

				// Chart requests by endpoint
				const chartRequestsByEndpointValues = this.serverStats.fastapiData.endpoint_count.map(item => ({
					name: item.endpoint,
					value: [
						item.count,                // x: request count (numeric)
						item.avg_response_time_ms, // y: average response time
						item.count                 // used for bubble size
					]
				}));

				const chartRequestsByEndpointOptions = () => ({
					textStyle: commonChartValues().textStyle,
					title: {
						text: 'Requests by Endpoint',
						textStyle: {
							color: getCssVar('color-text'),
							fontSize: 24,
						}
					},
					tooltip: {
						trigger: 'item',
						backgroundColor: getCssVar('color-background-card'),
						borderWidth: 1,
						borderColor: getCssVar("color-border"),
						formatter: (params) => generateTooltipCustomValues(
							params.data.name, // endpoint name
							[
								{ label: 'Avg Response time', value: params.data.value[1] + ' ms' },
								{ label: 'Request Count', value: convert.toFiCount(params.data.value[2]) }
							]
						),
					},
					xAxis: {
						name: 'Request Count',
						type: 'value', // now numeric
						axisLabel: {
							formatter: value => convert.toFiCount(value)
						},
						splitLine: commonChartValues().splitLine,

					},
					yAxis: {
						name: 'Avg Response Time (ms)',
						type: 'value',
						scale: true,
						axisLabel: {
							formatter: value => convert.toFiNumber(value)
						},
						splitLine: commonChartValues().splitLine,
					},

					grid: {
						left: 80,
						right: 32,
						top: 80,
						bottom: 32,
					},
					visualMap: {
						show: false,
						min: Math.min(...this.serverStats.fastapiData.endpoint_count.map(item => item.avg_response_time_ms)),
						max: Math.max(...this.serverStats.fastapiData.endpoint_count.map(item => item.avg_response_time_ms)),
						inRange: {
							color: [getCssVar('color-text'), getCssVar('color-negative')],
						},
						calculable: true,
						orient: 'horizontal',
						left: 'center',
						bottom: 10,
						dimension: 1, // still map color to response time
					},
					series: [
						{
							type: 'scatter',
							data: chartRequestsByEndpointValues,
							symbolSize: data => Math.sqrt(data[2] * 10 / Math.PI) * 2,
							encode: {
								x: 0, // request count
								y: 1, // response time
								tooltip: [0, 1, 2],
							},
							emphasis: {
								focus: 'self',
							},
						}
					]
				});


				// Set the value generator for the chart
				this.chartValueGenerators.chartRequestsByEndpoint = chartRequestsByEndpointOptions;
			}
		}
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
    font-size: var(--font-size-sm);
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

.service-links .service-description {
    color: var(--color-text-light);
    font-weight: 400;
    font-size: var(--font-size-sm);
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
    border-radius: var(--border-radius-medium);
    position: relative;
    overflow: hidden;
}
.info-tile .label {
    font-size: var(--font-size-sm);
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
