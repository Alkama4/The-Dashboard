<template>
	<div>
		<div class="greeting-area content-width-medium">
			<div class="text-area">
				<h1>{{ greeting[0] }}</h1>
				<span class="header-sub-text">{{ greeting[1] }}</span>
				<router-link class="no-decoration" to="/spendings/new_entry" tabindex="-1">
					<button class="button-primary">Start logging</button>
				</router-link>
			</div>
			<div class="action-area">
				<div class="color-blob one"></div>
				<div class="color-blob two"></div>
				<div class="color-blob three"></div>
			</div>
		</div>

		<div class="flex-column">
			<h2>Service links</h2>
			<div class="tile-container">
				<a 
					v-for="(service, index) in serviceUrls"
					:href="service.url"
					class="tile-button link-button"
					:key="index"
					rel="noreferrer"
				>
					<img 
						:src="service.iconUrl" 
						@load="(event) => event.target.classList.add('loaded')"
					>
					<span>{{ service.name }}</span>
				</a>
			</div>
		</div>

		<div class="flex-column content-width-medium">
			<h2>Backups <span class="text-lighter">(Under construction)</span></h2>
			<div class="backups">
				<div v-for="(backupCategory, categoryName) in backups" :key="categoryName" class="card backup-card">
					<div class="flex header">
						<span>{{ categoryName }}</span>
					</div>
					<div v-for="(backup, index) in backupCategory" :key="index" class="backup-row">
						<div class="flex">
							<IconBackup v-if="backup.backup_direction == 'up'" size="25px"/>
							<IconBackupDown v-else size="25px"/>
							<span class="name">
								{{ backup.backup_name }}
							</span>
						</div>
						<div class="content">
							<div class="flex">
								<div class="label-text">
									<div>Last run</div>
									<div>Next in</div>
									<div>Schedule</div>
								</div>
								<div>
									<div :class="backup.status">{{ backup.last_success_time_since }}</div>
									<div>{{ backup.time_until_next }}</div>
									<div>{{ backup.schedule }}</div>
								</div>
							</div>
							<div class="path-column">
								<div class="label-text">
									<div>Device</div>
									<div>Source</div>
									<div>Destination</div>
								</div>
								<div>
									<div>{{ backup.peer_device }}</div>
									<div class="path hover-decoration" title="Copy to clipboard" @click="copyToClipboard(backup.source_path, 'Path')">{{ backup.source_path }}</div>
									<div class="path hover-decoration" title="Copy to clipboard" @click="copyToClipboard(backup.destination_path, 'Path')">{{ backup.destination_path }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="content-width-large">
			<h2>Fastapi logs analysis <span class="text-lighter">(Under construction)</span></h2>	
			<p>The logs do not include the automated loggin reqests since they make the data unreadable.</p>
			<div class="flex-column">
				<div style="margin: var(--spacing-xs);" class="card flex-column">
					<label for="avg_backend_time">Average server processing time</label>
					<span id="avg_backend_time">{{ new Number(serverStats.fastapiData.avg_backend_time).toFixed(0) }} ms</span>
				</div>

				<div style="margin: var(--spacing-xs);" class="card flex-column">
					<label for="total_requests">Total request in the timespan</label>
					<span id="total_requests">{{ serverStats.fastapiData.total_requests }} kpl</span>
				</div>


				<!-- REQUEST SUCCESS RATE -->


				<div style="margin: var(--spacing-xs);" class="card flex-column">
					<label>Requests by endpoint</label>
					
					<div class="server-info-row">
						<span class="endpoint-name endpoint-label">Endpoint name</span>
						<span class="endpoint-value endpoint-label">Requests</span>
						<span class="endpoint-value endpoint-label">
							Avg. time 
							<InfoTooltip text="The average time that the backend takes to process the request." position="left"/>
						</span>
					</div>
					<div class="server-info-scroll">
						<div v-for="(item, index) in serverStats.fastapiData.endpoint_count" :key="index" class="server-info-row">
							<span class="endpoint-name">{{ item.endpoint }}</span>
							<span class="endpoint-value">{{ item.count }} kpl</span>
							<span class="endpoint-value">{{ item.avg_response_time_ms }} ms</span>
						</div>
					</div>
				</div>

				<div class="card server-resources">
					<!-- Chart 7 - FASTAPI -->
					<ChartComponent :chartOptionsGenerator="chartValueGenerators.chart7"/>

					<!-- Chart 8 - FASTAPI -->
					<ChartComponent :chartOptionsGenerator="chartValueGenerators.chart8"/>

					<!-- Chart 9 - FASTAPI -->
					<ChartComponent :chartOptionsGenerator="chartValueGenerators.chart9"/>

					<!-- Chart 10 - FASTAPI -->
					<ChartComponent :chartOptionsGenerator="chartValueGenerators.chart10"/>

					<!-- Chart 11 - Fastapi requesttime histogram -->
					<ChartComponent :chartOptionsGenerator="chartValueGenerators.chart11"/>

					<!-- Chart 12 - Fastapi endpoints and error codes -->
					<!-- THIS SHOULD ACTUALLY BE A SCROLL CONTAINER JUST LIKE THE REQUESTS BY ENDPOINT -->
					<!-- THIS SHOULD ACTUALLY BE A SCROLL CONTAINER JUST LIKE THE REQUESTS BY ENDPOINT -->
					<!-- THIS SHOULD ACTUALLY BE A SCROLL CONTAINER JUST LIKE THE REQUESTS BY ENDPOINT -->
					<ChartComponent :chartOptionsGenerator="chartValueGenerators.chart12"/>
				</div>

			</div>
		</div>

		<div class="content-width-large">
			<h2>Server resource usages <span class="text-lighter">(Under construction)</span></h2>
			<div class="card server-resources content-width-large">
				<div style="width: 100%; margin-bottom: var(--spacing-md); gap: 8px;" class="icon-align">
					<CustomSelect 
						v-model="serverLogsTimespan" 
						:options="serverLogsTimespans"
						:disabled="waitingFor.length != 0"
						:class="{loading: waitingFor.length != 0}"
						style="flex: 1; "
					/>
					<IconRefresh size="28px" @click="fetchServerLogs(true)" class="icon-button"/>
				</div>
				<!-- Chart 1 - CPU temp -->
				<ChartComponent :chartOptionsGenerator="chartValueGenerators.chart1"/>

				<!-- Chart 2 - RAM Usage -->
				<ChartComponent :chartOptionsGenerator="chartValueGenerators.chart2"/>

				<!-- Chart 3 - CPU Usage -->
				<ChartComponent :chartOptionsGenerator="chartValueGenerators.chart3"/>

				<!-- Chart 5 - System load -->
				<ChartComponent :chartOptionsGenerator="chartValueGenerators.chart5"/>

				<!-- Chart 6 - Network up/down -->
				<ChartComponent :chartOptionsGenerator="chartValueGenerators.chart6"/>

				<div>
					<h2>Uptime</h2>
					{{ serverStats.formattedUptime }}
				</div>
			</div>
		</div>

		<div class="flex-column">
			<h2>Server Drives</h2>
			<div class="flex-row">
				<div v-for="(drive, index) in serverStats.storage" :key="index" class="drive-card card">
					<div class="name">
						<IconHDD colorHover="var(--color-text)"/>
						{{ drive.name }}
					</div>
					
					<div class="text">
						<div class="label">Used space</div>
						<div class="value">{{ formatBytes(drive.used) }}</div>
						<div class="label">Available space</div>
						<div class="value">{{ formatBytes(drive.free) }}</div>
						<div class="label">Disk size</div>
						<div class="value">{{ formatBytes(drive.total) }}</div>
					</div>
					
					<div>
						<div class="capacityIndicator">
							<div 
								class="bar" 
								:class="(drive.used / drive.total) < 0.9 ? 'positiveBackground' : 'negativeBackground'"
								:style="{ width: (drive.used / drive.total * 100) + '%' }"
							></div>
							<div class="text">
								{{ (drive.used / drive.total * 100).toFixed(2) + '%' }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// Icons
import IconHDD from '@/components/icons/IconHDD.vue';
import IconBackup from '@/components/icons/IconBackup.vue';
import IconBackupDown from '@/components/icons/IconBackupDown.vue';
import InfoTooltip from '@/components/InfoTooltip.vue';
import IconRefresh from '@/components/icons/IconRefresh.vue';

// Other
import fastApi from '@/utils/fastApi';
import { convert, getCssVar } from '@/utils/utils'
import { notify } from '@/utils/notification';
import { 
    generateTooltipMultiValue, 
	generateTooltipSingleValue,
	commonChartValues,
	initialEchartSetup,
} from '@/utils/chartUtils'
import ChartComponent from '@/components/ChartComponent.vue';
import CustomSelect from '@/components/CustomSelect.vue';
import { standAloneBuild } from '@/utils/config';

export default {
	name: 'HomePage',
	components: {
		InfoTooltip,
		ChartComponent,
		CustomSelect,
		IconHDD,
		IconBackup,
		IconBackupDown,
		IconRefresh,
	},
	data() {
		return {
			greeting: this.getGreeting(),
            isLoaded: {},
			chartValueGenerators: {},
			waitingFor: [],
			// Data on site
			serviceUrls: [],
			backups: [],
			serverStats: {
				storage: [],
				fastapiData: {},
				formattedUptime: 0,
			},
			serverLogsTimespan: "1h",
			serverLogsTimespans: [
				{label: "15m", value: "15m"},
				{label: "30m", value: "30m"},
				{label: "1h", value: "1h"},
				{label: "3h", value: "3h"},
				{label: "6h", value: "6h"},
				{label: "12h", value: "12h"},
				{label: "24h", value: "24h"},
			],
		};
	},
	methods: {
		getGreeting() {
			const hour = new Date().getHours();
			if (hour < 5) {
				return ["Good night", "Hopefully you're actually getting some sleep and not scrolling through your phone."];
			} else if (hour < 12) {
				return ["Good morning", "Let’s pretend you’re already awake and fully functional."];
			} else if (hour < 18) {
				return ["Good afternoon", "Still pretending to be productive, I see."];
			} else {
				return ["Good evening", "Survived the day, huh? That's something."];
			}
		},
		formatBytes(value) {
			return convert.toBytes(value)
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
		getServiceUrls() {
			if (!standAloneBuild) {
				const serviceUrls = [];
				// Check if the current hostname is an IPv4 so that we later try the correct one first
				const isIpv4 = /^(\d{1,3}\.){3}\d{1,3}(:\d+)?$/.test(location.hostname);
				let i = 1;

				// Loop through envs until at least one is missing
				while (
					process.env[`VUE_APP_OTHER_SERVICE_${i}_NAME`]
					&& process.env[`VUE_APP_OTHER_SERVICE_${i}_ICON_URL`]
					&& (process.env[`VUE_APP_OTHER_SERVICE_${i}_URL_IP`]
					|| process.env[`VUE_APP_OTHER_SERVICE_${i}_URL_HOSTNAME`])
				) {
					const urlIp = process.env[`VUE_APP_OTHER_SERVICE_${i}_URL_IP`];
					const urlHostname = process.env[`VUE_APP_OTHER_SERVICE_${i}_URL_HOSTNAME`];
					serviceUrls.push({
						name: process.env[`VUE_APP_OTHER_SERVICE_${i}_NAME`],
						iconUrl: process.env[`VUE_APP_OTHER_SERVICE_${i}_ICON_URL`],
						url: isIpv4 ? (urlIp || urlHostname) : (urlHostname || urlIp) // Choose IP or hostname based on IPv4 check
					});
					
					i++;
				}

				this.serviceUrls = serviceUrls;
			} else {
				this.serviceUrls = [{
					name: "GitHub repo",
					url: "https://github.com/Alkama4/The-Dashboard",
					iconUrl: localStorage.getItem("darkMode") === "true" ? 
					"https://github.githubassets.com/favicons/favicon-dark.svg" :
					"https://github.githubassets.com/favicons/favicon.svg"
				}];

				// Add a listener that changes the icon if dark mode is changed
				window.addEventListener("darkModeChange", (event) => {
					const darkModeEnabled = event.detail.darkModeEnabled;
					this.serviceUrls = [{
						name: "GitHub repo",
						url: "https://github.com/Alkama4/The-Dashboard",
						iconUrl: darkModeEnabled ? 
						"https://github.githubassets.com/favicons/favicon-dark.svg" :
						"https://github.githubassets.com/favicons/favicon.svg"
					}];
				});
			}
		},
		removeItemFromWaitingArray(item) {
            this.waitingFor = this.waitingFor.filter(i => i !== item);
        },
		async fetchServerLogs(refresh = false) {
			this.waitingFor.push("fetchServerLogs");

			const resourceLogsResponse = await fastApi.server.logs.system_resources(this.serverLogsTimespan);
			// console.log("resourceLogsResponse", resourceLogsResponse);
			if (resourceLogsResponse && resourceLogsResponse.data) {
				this.serverStats.formattedUptime = convert.toTime(resourceLogsResponse.uptime_seconds, -1);
				const resourceLogsTimeStamps = resourceLogsResponse.data.map(log => log.timestamp);
				const chart1YaxisValues = resourceLogsResponse.data.map(log => log.cpu_temperature);
				const chart2YaxisValues = resourceLogsResponse.data.map(log => log.ram_usage);
				const chart3YaxisValues = resourceLogsResponse.data.map(log => log.cpu_usage);
				const chart5YaxisValues = resourceLogsResponse.data.map(log => log.cpu_clock_mhz / 1000);
				const chartNetRecv = resourceLogsResponse.data.map((log, index, array) => {
					if (index === 0) return 0;	// The first one can't have a differnce
					const difference = (log.network_recv_bytes - array[index - 1].network_recv_bytes) / 10;		// Calculate
					return difference > 0 ? difference : 0;	// If negative the server propably reset the count so set to 0
				});
				const chartNetSent = resourceLogsResponse.data.map((log, index, array) => {
					if (index === 0) return 0;	// The first one can't have a differnce
					const difference = (-log.network_sent_bytes + array[index - 1].network_sent_bytes) / 10;	// Calculate
					return difference < 0 ? difference : 0;	// If negative the server propably reset the count so set to 0
				});

				// Chart 1 - CPU temperature
				const chart1Options = () => ({
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
						}
					},
					yAxis: { 
						type: 'value',      
						name: 'Temp (°C)',  // Y-akselin nimi
						axisLabel: {        // Y-akselin arvojen muotoilu
							formatter: value => convert.toFiNumber(value)
						}
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
							data: chart1YaxisValues,
							smooth: true,
						},
					],
				});
				// Set the value generator for the chart
				this.chartValueGenerators.chart1 = chart1Options;

				// Chart 2 - RAM Usage
				const chart2Options = () => ({
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
						}
					},
					series: [
						{
							name: 'RAM Usage',    // Tooltipissa näkyvä nimi
							type: 'line',
							areaStyle: {},
							data: chart2YaxisValues,
							smooth: true,
						},
					],
				});
				// Set the value generator for the chart
				this.chartValueGenerators.chart2 = chart2Options;

				// Chart 3 - CPU Usage
				const chart3Options = () => ({
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
						}
					},
					series: [
						{
							name: 'CPU Usage',    // Tooltipissa näkyvä nimi
							type: 'line',
							areaStyle: {},
							data: chart3YaxisValues,
							smooth: true,
						},
					],
				});
				// Set the value generator for the chart
				this.chartValueGenerators.chart3 = chart3Options;

				// Chart 5 - System load
				const chart5Options = () => ({
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
						}
					},
					series: [
						{
							name: 'CPU Frequenzy',    // Tooltipissa näkyvä nimi
							type: 'line',
							areaStyle: {},
							data: chart5YaxisValues,
							smooth: true,
						},
					],
				});
				// Set the value generator for the chart
				this.chartValueGenerators.chart5 = chart5Options;

				// Chart 6 - Network up/down
				const chart6Options = () => ({
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
						}
					},
					series: [
						{
							name: 'Data received',    // Tooltipissa näkyvä nimi
							type: 'line',
							areaStyle: {},
							data: chartNetRecv,
							smooth: true,
						},
						{
							name: 'Data sent',    // Tooltipissa näkyvä nimi
							type: 'line',
							areaStyle: {},
							data: chartNetSent,
							smooth: true,
						},
					],
				});
				// Set the value generator for the chart
				this.chartValueGenerators.chart6 = chart6Options;
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

				// Loop through each endpoint's error summary
				fastapiLogDataResponse.data.endpoint_error_summary.forEach(endpoint => {
					// Skip endpoints starting with "/image" if there is a 404 error with count <= 1
					if (
						endpoint.endpoint.startsWith("/image") && 
						endpoint.errors.some(error => error.status_code === 404 && error.count <= 1)
					) return;

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
							name: 'Monthly Average Spending',
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
							name: 'Monthly Average Spending',
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
							name: 'Monthly Average Spending',
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
						}
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
						}
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
						}
					},
					series: errorSeries
				});
				// Set the value generator for the chart
				this.chartValueGenerators.chart12 = chart12Options;
			}
		}
	},
	watch: {
        serverLogsTimespan: {
            deep: true,
            async handler() {
			// async handler(value) {
                // let sortByTranslated;

                // switch (value.sortBy) {
                //     case 'TMDB rating':
                //         sortByTranslated = 'vote_average';
                //         break;
                //     case 'Release date':
                //         sortByTranslated = 'release_date';
                //         break;
                //     case 'Modified':
                //         sortByTranslated = 'latest_updated'
                //         break;
                //     // case 'Name':
                //     //     sortByTranslated = 'name'
                //     //     break;

                //     // This could be the sum of minutes of all episodes. That way it would be logical?
                //     // case 'Length/Episode count': HOW TO HANDLE TV AND MOVIE DIFFERENCE?
                //     //     sortByTranslated = 'length'
                //     //     break;
                //     default:
                //         return;
                // }

                // console.debug("New sorting values detected:", sortByTranslated, value.direction);
                // this.allTitlesListOffset = 0;
                await this.fetchServerLogs(true);
            }
        }
    },
	async mounted() {
		// Get services from env
		this.getServiceUrls();

		// Everything that needs to be done before echarts in one method
		initialEchartSetup();

		const backupResponse = await fastApi.server.backups();
		if (backupResponse) {
			this.backups = backupResponse.backups;
		}
		// console.log(this.backups);
		
		// Server drives
		const drivesResponse = await fastApi.server.drives();
		if (drivesResponse) {
			for (const drive of Object.entries(drivesResponse)) {
				this.serverStats.storage.push(drive[1]);
			}
		}
		// console.log(this.serverStats.storage);

		await this.fetchServerLogs();
		await this.fetchFastapiLogs();

	}
};
</script>

<style scoped>

.server-resources {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.ChartComponent {
	width: 50%;
	height: 300px;
}
@media (max-width: 900px) {
	.ChartComponent {
		width: 100%;
	}
}

.greeting-area {
	--greeting-area-height: min(60vh, 800px);
	height: var(--greeting-area-height);
	display: flex;
	position: relative;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	/* background-color: red; */
}

.greeting-area .text-area {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-top: min(15vh, calc(800px / 60 * 15));
}

.greeting-area .text-area h1 {
	margin: 0;
	/* Row gap? to large */
	line-height: 48px;
	font-size: 48px;
}
.greeting-area .text-area .header-sub-text {
	display: inline-block;
	color: var(--color-text-light);
	margin-top: var(--spacing-sm);
	margin-bottom: calc(var(--spacing-md) + var(--spacing-sm));
}
.greeting-area .text-area button {
	margin-top: var(--spacing-md);
	margin-inline: 0;
}

/* Color blobs */
.greeting-area .color-blob {
    border-radius: 50%;
    position: absolute;
    animation: moveBlobs 5s infinite cubic-bezier(0.5, 0, 0.5, 1);
    filter: blur(50px);
	--x-offset: calc(-250px + 50%);
	--y-offset: calc(-200px + var(--greeting-area-height) * 0.5)
}

.greeting-area .color-blob.one {
    background-color: var(--color-primary-active);
	opacity: 0.5;
    height: 300px;
    width: 300px;
    right: calc(var(--x-offset) - 0px);
    top: calc(var(--y-offset) - 50px);
    z-index: -101;
    animation-delay: 0s;
}
.dark-mode .greeting-area .color-blob.one {
	opacity: 1;
    background-color: var(--color-primary);
}
.greeting-area .color-blob.two {
    background-color: var(--color-secondary-active);
    height: 225px;
    width: 225px;
    right: calc(var(--x-offset) - 80px);
    top: calc(var(--y-offset) + 100px);
    z-index: -100;
    animation-delay: 0.75s;
}
.dark-mode .greeting-area .color-blob.two {
    background-color: var(--color-secondary);
}
.greeting-area .color-blob.three {
    background-color: var(--color-tertiary-active);
    height: 150px;
    width: 150px;
    right: calc(var(--x-offset) - 200px);
    top: calc(var(--y-offset) + 60px);
    z-index: -99;
    animation-delay: 1s;
}
.dark-mode .greeting-area .color-blob.three {
    background-color: var(--color-tertiary);
}

@keyframes moveBlobs {
    0% {
        transform: translate(0, 0);
    }
	50% {
        transform: translate(0px, 50px);
	}
    100% {
        transform: translate(0, 0);
    }
}

/* - - - - Other services - - - - */
.tile-container {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	gap: var(--spacing-md);
}
.tile-button {
	position: relative;
	display: flex;
	flex-direction: column;
	aspect-ratio: 1;
	width: 150px;
	border-radius: var(--border-radius-medium);
	box-sizing: border-box;
	padding-inline: var(--spacing-sm);
	margin: 0;
}
.tile-button img, .tile-button svg {
	position: absolute;
	top: var(--spacing-md);
	width: 80px;
	height: 80px;
	object-fit: contain;
	aspect-ratio: 1;
	color: var(--color-text-light);
}
.tile-button span {
	position: absolute;
	bottom: var(--spacing-md);
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

/* @media (max-width: 500px) {
	.backup-card {
		width: 300px;
	}
	.backup-card .fromTo .arrow {
		transform: rotate(0);
		margin-inline: auto;
	}
	.backup-card .fromTo {
		grid-template-columns: auto;
	}
} */

/* - - - - - Fastapi info - - - - */
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
	max-height: 200px;
	overflow: scroll;
}

/* - - - - Server drives - - - - */
.drive-card {
	width: 250px;
	margin: 0;
	animation: fadeIn 0.5s ease-out;
}
.drive-card .name {
	font-weight: 700;
	font-size: 18px;
	display: flex;
	flex-direction: row;
	gap: var(--spacing-sm);
	margin-bottom: var(--spacing-sm);
}
.drive-card .text {
	margin: 12px 0;
	display: grid;
	grid-template-columns: auto auto;
}
.drive-card .text .label {
	color: var(--color-text-light);
	margin-right: var(--spacing-md);
}
.drive-card .text .value {
	font-weight: 500;
	text-align: end;
}

.capacityIndicator {
	width: 100%;
	height: 32px;
	background-color: var(--color-background-card-section);
	/* border: 1px solid var(--color-border); */
	border-radius: var(--border-radius-small);
	position: relative;
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
